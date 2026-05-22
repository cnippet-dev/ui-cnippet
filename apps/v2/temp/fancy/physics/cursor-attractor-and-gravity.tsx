"use client";

import { debounce } from "lodash";
import type Matter from "matter-js";
import {
  Bodies,
  Body,
  Common,
  Engine,
  Events,
  Render,
  Runner,
  World,
} from "matter-js";
import {
  createContext,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref";
import { cn } from "@/lib/utils";
import { calculatePosition } from "@/utils/calculate-position";
import { parsePathToVertices } from "@/utils/svg-path-to-vertices";

type GravityProps = {
  children: ReactNode;
  debug?: boolean;
  attractorPoint?: { x: number | string; y: number | string };
  attractorStrength?: number;
  cursorStrength?: number;
  cursorFieldRadius?: number;
  resetOnResize?: boolean;
  addTopWall?: boolean;
  autoStart?: boolean;
  className?: string;
};

type PhysicsBody = {
  element: HTMLElement;
  body: Matter.Body;
  props: MatterBodyProps;
};

type MatterBodyProps = {
  children: ReactNode;
  matterBodyOptions?: Matter.IBodyDefinition;
  isDraggable?: boolean;
  bodyType?: "rectangle" | "circle" | "svg";
  sampleLength?: number;
  x?: number | string;
  y?: number | string;
  angle?: number;
  className?: string;
};

export type GravityRef = {
  start: () => void;
  stop: () => void;
  reset: () => void;
};

const GravityContext = createContext<{
  registerElement: (
    id: string,
    element: HTMLElement,
    props: MatterBodyProps,
  ) => void;
  unregisterElement: (id: string) => void;
} | null>(null);

export const MatterBody = ({
  children,
  className,
  matterBodyOptions = {
    density: 0.001,
    friction: 0.1,
    isStatic: false,
    restitution: 0.1,
  },
  bodyType = "rectangle",
  isDraggable = true,
  sampleLength = 15,
  x = 0,
  y = 0,
  angle = 0,
  ...props
}: MatterBodyProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substring(7));
  const context = useContext(GravityContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;
    context.registerElement(idRef.current, elementRef.current, {
      angle,
      bodyType,
      children,
      isDraggable,
      matterBodyOptions,
      sampleLength,
      x,
      y,
      ...props,
    });

    return () => context.unregisterElement(idRef.current);
  }, [
    props,
    children,
    matterBodyOptions,
    isDraggable,
    context,
    x,
    y,
    angle,
    sampleLength,
    bodyType,
  ]);

  return (
    <div className={cn("absolute", className)} ref={elementRef}>
      {children}
    </div>
  );
};

const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      debug = false,
      attractorPoint = { x: 0.5, y: 0.5 },
      attractorStrength = 0.001,
      cursorStrength = 0.0005,
      cursorFieldRadius = 100,
      resetOnResize = true,
      addTopWall = true,
      autoStart = true,
      className,
      ...props
    },
    ref,
  ) => {
    const canvas = useRef<HTMLDivElement>(null);
    const engine = useRef(Engine.create());
    const render = useRef<Render>(undefined);
    const runner = useRef<Runner>(undefined);
    const bodiesMap = useRef(new Map<string, PhysicsBody>());
    const frameId = useRef<number>(undefined);
    const [canvasSize, setCanvasSize] = useState({ height: 0, width: 0 });
    const mouseRef = useMousePositionRef(canvas);

    const isRunning = useRef(false);

    // Register Matter.js body in the physics world
    const registerElement = useCallback(
      (id: string, element: HTMLElement, props: MatterBodyProps) => {
        if (!canvas.current) return;
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const canvasRect = canvas.current?.getBoundingClientRect();

        const angle = (props.angle || 0) * (Math.PI / 180);

        const x = calculatePosition(props.x, canvasRect.width, width);
        const y = calculatePosition(props.y, canvasRect.height, height);

        let body;
        if (props.bodyType === "circle") {
          const radius = Math.max(width, height) / 2;
          body = Bodies.circle(x, y, radius, {
            ...props.matterBodyOptions,
            angle: angle,
            render: {
              fillStyle: debug ? "#888888" : "#00000000",
              lineWidth: debug ? 3 : 0,
              strokeStyle: debug ? "#333333" : "#00000000",
            },
          });
        } else if (props.bodyType === "svg") {
          const paths = element.querySelectorAll("path");
          const vertexSets: Matter.Vector[][] = [];

          paths.forEach((path) => {
            const d = path.getAttribute("d");
            const p = parsePathToVertices(d!, props.sampleLength);
            vertexSets.push(p);
          });

          body = Bodies.fromVertices(x, y, vertexSets, {
            ...props.matterBodyOptions,
            angle: angle,
            render: {
              fillStyle: debug ? "#888888" : "#00000000",
              lineWidth: debug ? 3 : 0,
              strokeStyle: debug ? "#333333" : "#00000000",
            },
          });
        } else {
          body = Bodies.rectangle(x, y, width, height, {
            ...props.matterBodyOptions,
            angle: angle,
            render: {
              fillStyle: debug ? "#888888" : "#00000000",
              lineWidth: debug ? 3 : 0,
              strokeStyle: debug ? "#333333" : "#00000000",
            },
          });
        }

        if (body) {
          World.add(engine.current.world, [body]);
          bodiesMap.current.set(id, { body, element, props });
        }
      },
      [debug],
    );

    // Unregister Matter.js body from the physics world
    const unregisterElement = useCallback((id: string) => {
      const body = bodiesMap.current.get(id);
      if (body) {
        World.remove(engine.current.world, body.body);
        bodiesMap.current.delete(id);
      }
    }, []);

    // Keep react elements in sync with the physics world
    const updateElements = useCallback(() => {
      bodiesMap.current.forEach(({ element, body }) => {
        const { x, y } = body.position;
        const rotation = body.angle * (180 / Math.PI);

        element.style.transform = `translate(${
          x - element.offsetWidth / 2
        }px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`;
      });

      frameId.current = requestAnimationFrame(updateElements);
    }, []);

    const initializeRenderer = useCallback(() => {
      if (!canvas.current) return;

      const height = canvas.current.offsetHeight;
      const width = canvas.current.offsetWidth;

      Common.setDecomp(require("poly-decomp"));

      // Remove default gravity
      engine.current.gravity.x = 0;
      engine.current.gravity.y = 0;

      render.current = Render.create({
        element: canvas.current,
        engine: engine.current,
        options: {
          background: "#00000000",
          height,
          width,
          wireframes: false,
        },
      });

      // Add walls
      const walls = [
        // Floor
        Bodies.rectangle(width / 2, height + 10, width, 20, {
          friction: 1,
          isStatic: true,
          render: {
            visible: debug,
          },
        }),

        // Right wall
        Bodies.rectangle(width + 10, height / 2, 20, height, {
          friction: 1,
          isStatic: true,
          render: {
            visible: debug,
          },
        }),

        // Left wall
        Bodies.rectangle(-10, height / 2, 20, height, {
          friction: 1,
          isStatic: true,
          render: {
            visible: debug,
          },
        }),
      ];

      const topWall = addTopWall
        ? Bodies.rectangle(width / 2, -10, width, 20, {
            friction: 1,
            isStatic: true,
            render: {
              visible: debug,
            },
          })
        : null;

      if (topWall) {
        walls.push(topWall);
      }

      World.add(engine.current.world, [...walls]);

      runner.current = Runner.create();
      Render.run(render.current);
      updateElements();
      runner.current.enabled = false;

      if (autoStart) {
        runner.current.enabled = true;
        startEngine();
      }

      // Add force application before update
      Events.on(engine.current, "beforeUpdate", () => {
        const bodies = engine.current.world.bodies.filter(
          (body) => !body.isStatic,
        );

        // Calculate attractor position in pixels
        const attractorX =
          typeof attractorPoint.x === "string"
            ? (width * Number.parseFloat(attractorPoint.x)) / 100
            : width * attractorPoint.x;
        const attractorY =
          typeof attractorPoint.y === "string"
            ? (height * Number.parseFloat(attractorPoint.y)) / 100
            : height * attractorPoint.y;

        bodies.forEach((body) => {
          // Apply attractor force
          const dx = attractorX - body.position.x;
          const dy = attractorY - body.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0) {
            const force = {
              x: (dx / distance) * attractorStrength * body.mass,
              y: (dy / distance) * attractorStrength * body.mass,
            };
            Body.applyForce(body, body.position, force);
          }

          // Apply cursor force if mouse is present
          if (
            mouseRef.current?.x &&
            mouseRef.current?.y &&
            mouseRef.current.x > 0 &&
            mouseRef.current.y > 0
          ) {
            const mdx = mouseRef.current.x - body.position.x;
            const mdy = mouseRef.current.y - body.position.y;
            const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

            if (mouseDistance > 0 && mouseDistance < cursorFieldRadius) {
              const mouseForce = {
                x: (mdx / mouseDistance) * cursorStrength * body.mass,
                y: (mdy / mouseDistance) * cursorStrength * body.mass,
              };
              Body.applyForce(body, body.position, mouseForce);
            }
          }
        });
      });
    }, [
      updateElements,
      debug,
      autoStart,
      attractorPoint,
      attractorStrength,
      cursorStrength,
      mouseRef.current.x,
      cursorFieldRadius,
      startEngine,
      mouseRef.current.y,
      addTopWall,
    ]);

    // Clear the Matter.js world
    const clearRenderer = useCallback(() => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }

      if (render.current) {
        Render.stop(render.current);
        render.current.canvas.remove();
      }

      if (runner.current) {
        Runner.stop(runner.current);
      }

      if (engine.current) {
        World.clear(engine.current.world, false);
        Engine.clear(engine.current);
      }

      bodiesMap.current.clear();
    }, []);

    const handleResize = useCallback(() => {
      if (!canvas.current || !resetOnResize) return;

      const newWidth = canvas.current.offsetWidth;
      const newHeight = canvas.current.offsetHeight;

      setCanvasSize({ height: newHeight, width: newWidth });

      // Clear and reinitialize
      clearRenderer();
      initializeRenderer();
    }, [clearRenderer, initializeRenderer, resetOnResize]);

    const startEngine = useCallback(() => {
      if (runner.current) {
        runner.current.enabled = true;

        Runner.run(runner.current, engine.current);
      }
      if (render.current) {
        Render.run(render.current);
      }
      frameId.current = requestAnimationFrame(updateElements);
      isRunning.current = true;
    }, [updateElements]);

    const stopEngine = useCallback(() => {
      if (!isRunning.current) return;

      if (runner.current) {
        Runner.stop(runner.current);
      }
      if (render.current) {
        Render.stop(render.current);
      }
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      isRunning.current = false;
    }, []);

    const reset = useCallback(() => {
      stopEngine();
      bodiesMap.current.forEach(({ element, body, props }) => {
        body.angle = props.angle || 0;

        const x = calculatePosition(
          props.x,
          canvasSize.width,
          element.offsetWidth,
        );
        const y = calculatePosition(
          props.y,
          canvasSize.height,
          element.offsetHeight,
        );
        body.position.x = x;
        body.position.y = y;
      });
      updateElements();
      handleResize();
    }, [
      updateElements,
      canvasSize.width,
      stopEngine,
      handleResize,
      canvasSize.height,
    ]);

    useImperativeHandle(
      ref,
      () => ({
        reset,
        start: startEngine,
        stop: stopEngine,
      }),
      [startEngine, stopEngine, reset],
    );

    useEffect(() => {
      if (!resetOnResize) return;

      const debouncedResize = debounce(handleResize, 500);
      window.addEventListener("resize", debouncedResize);

      return () => {
        window.removeEventListener("resize", debouncedResize);
        debouncedResize.cancel();
      };
    }, [handleResize, resetOnResize]);

    useEffect(() => {
      initializeRenderer();
      return clearRenderer;
    }, [initializeRenderer, clearRenderer]);

    return (
      <GravityContext.Provider value={{ registerElement, unregisterElement }}>
        <div
          className={cn(className, "absolute top-0 left-0 h-full w-full")}
          ref={canvas}
          {...props}
        >
          {children}
        </div>
      </GravityContext.Provider>
    );
  },
);

Gravity.displayName = "Gravity";
export default Gravity;
