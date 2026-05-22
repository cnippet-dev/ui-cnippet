"use client";

import {
  type AnimationSequence,
  delay,
  LayoutGroup,
  motion,
  type Transition,
  useAnimate,
} from "motion/react";
import * as React from "react";

interface ComponentProps {
  orbitItems: OrbitItem[];
  stageSize?: number;
  imageSize?: number;
}

type OrbitItem = {
  id: number;
  name: string;
  src: string;
};

const transition: Transition = {
  damping: 35,
  delay: 0,
  restDelta: 0.01,
  restSpeed: 0.01,
  stiffness: 300,
  type: "spring",
};

const spinConfig = {
  duration: 30,
  ease: "linear" as const,
  repeat: Number.POSITIVE_INFINITY,
};

const qsa = (root: Element, sel: string) =>
  Array.from(root.querySelectorAll(sel));

const angleOf = (el: Element) => Number((el as HTMLElement).dataset.angle || 0);

const armOfImg = (img: Element) =>
  (img as HTMLElement).closest("[data-arm]") as HTMLElement | null;

function RadialIntro({
  orbitItems,
  stageSize = 320,
  imageSize = 60,
}: ComponentProps) {
  const step = 360 / orbitItems.length;
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    const root = scope.current;
    if (!root) return;

    // get arm and image elements
    const arms = qsa(root, "[data-arm]");
    const imgs = qsa(root, "[data-arm-image]");
    const stops: Array<() => void> = [];

    // image lift-in
    delay(() => animate(imgs, { top: 0 }, transition), 250);

    // build sequence for orbit placement
    const orbitPlacementSequence: AnimationSequence = [
      ...arms.map((el): [Element, Record<string, any>, any] => [
        el,
        { rotate: angleOf(el) },
        { ...transition, at: 0 },
      ]),
      ...imgs.map((img): [Element, Record<string, any>, any] => [
        img,
        { opacity: 1, rotate: -angleOf(armOfImg(img)!) },
        { ...transition, at: 0 },
      ]),
    ];

    // play placement sequence
    delay(() => animate(orbitPlacementSequence), 700);

    // start continuous spin for arms and images
    delay(() => {
      // arms spin clockwise
      arms.forEach((el) => {
        const angle = angleOf(el);
        const ctrl = animate(el, { rotate: [angle, angle + 360] }, spinConfig);
        stops.push(() => ctrl.cancel());
      });

      // images counter-spin to stay upright
      imgs.forEach((img) => {
        const arm = armOfImg(img);
        const angle = arm ? angleOf(arm) : 0;
        const ctrl = animate(
          img,
          { rotate: [-angle, -angle - 360] },
          spinConfig,
        );
        stops.push(() => ctrl.cancel());
      });
    }, 1300);

    return () => stops.forEach((stop) => stop());
  }, [scope.current, animate]);

  return (
    <LayoutGroup>
      <motion.div
        className="relative overflow-visible"
        initial={false}
        ref={scope}
        style={{ height: stageSize, width: stageSize }}
      >
        {orbitItems.map((item, i) => (
          <motion.div
            className="absolute inset-0 will-change-transform"
            data-angle={i * step}
            data-arm
            key={item.id}
            layoutId={`arm-${item.id}`}
            style={{ zIndex: orbitItems.length - i }}
          >
            <motion.img
              alt={item.name}
              className="translate absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 rounded-full object-fill"
              data-arm-image
              draggable={false}
              layoutId={`arm-img-${item.id}`}
              src={item.src}
              style={{
                height: imageSize,
                opacity: i === 0 ? 1 : 0,
                width: imageSize,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </LayoutGroup>
  );
}

export { RadialIntro };
