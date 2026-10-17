"use client";

import * as React from "react";
import {
  OVERLAY_TRIGGER_SELECTOR,
  type OverlayOpenMode,
} from "@/lib/overlay-preview";
import { Index } from "@/registry/__index__";

// How long to wait for the lazy variant to mount its trigger.
const TRIGGER_TIMEOUT_MS = 5000;

// An opened dialog moves focus into itself, which would pull focus out of the
// Explore page (e.g. mid-typing in search) every time a frame scrolls into
// view. While embedded, ignore programmatic focus until the visitor actually
// uses this frame. Runs at module load so it also covers `autoFocus`, which
// fires during hydration, before any effect.
if (typeof window !== "undefined" && window.self !== window.top) {
  const focus = HTMLElement.prototype.focus;
  HTMLElement.prototype.focus = () => {};
  const release = () => {
    HTMLElement.prototype.focus = focus;
    window.removeEventListener("pointerdown", release, true);
    window.removeEventListener("keydown", release, true);
  };
  window.addEventListener("pointerdown", release, true);
  window.addEventListener("keydown", release, true);
}

function findTrigger(root: HTMLElement, mode: OverlayOpenMode) {
  // Toast variants fire from a plain button rather than a trigger slot.
  const selector = mode === "toast" ? "button" : OVERLAY_TRIGGER_SELECTOR;
  return root.querySelector<HTMLElement>(selector);
}

function pointerInit(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return {
    bubbles: true,
    cancelable: true,
    clientX: rect.left + rect.width / 2,
    clientY: rect.top + rect.height / 2,
    isPrimary: true,
    pointerId: 1,
    pointerType: "mouse",
  };
}

// The trigger's slot decides the gesture, not the variant's category: a
// context menu can sit inside a dialog. Menus open on press and ignore a bare
// click(); dialogs open on click and treat a replayed press sequence as an
// outside press, so each gets its own.
function openOverlay(trigger: HTMLElement) {
  const init = pointerInit(trigger);
  const slot = trigger.dataset.slot;

  if (slot === "context-menu-trigger") {
    trigger.dispatchEvent(
      new MouseEvent("contextmenu", { ...init, button: 2 }),
    );
    return;
  }

  if (slot === "preview-card-trigger") {
    for (const type of ["pointerover", "pointerenter", "pointermove"]) {
      trigger.dispatchEvent(new PointerEvent(type, init));
    }
    for (const type of ["mouseover", "mouseenter", "mousemove"]) {
      trigger.dispatchEvent(new MouseEvent(type, init));
    }
    return;
  }

  if (slot !== "menu-trigger") {
    trigger.click();
    return;
  }

  const down = { ...init, button: 0, buttons: 1 };
  const up = { ...init, button: 0, buttons: 0 };
  trigger.dispatchEvent(new PointerEvent("pointerdown", down));
  trigger.dispatchEvent(new MouseEvent("mousedown", down));
  trigger.dispatchEvent(new PointerEvent("pointerup", up));
  trigger.dispatchEvent(new MouseEvent("mouseup", up));
  trigger.dispatchEvent(new MouseEvent("click", up));
}

// Rendered after the variant inside its Suspense boundary, so this effect only
// runs once the variant has hydrated and its trigger handlers are attached.
// The server-rendered trigger exists in the DOM well before that.
function OnHydrated({ onHydrated }: { onHydrated: () => void }) {
  React.useEffect(onHydrated, [onHydrated]);
  return null;
}

export function OverlayFrame({
  mode,
  name,
}: {
  mode: OverlayOpenMode;
  name: string;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  // Strict Mode runs effects twice in dev; a second click would toggle the
  // overlay closed again.
  const openedRef = React.useRef(false);
  const Component = Index[name]?.component ?? null;

  const handleHydrated = () => {
    const root = rootRef.current;
    if (!root || openedRef.current) return;
    openedRef.current = true;
    const started = Date.now();
    // Poll briefly for variants that mount their trigger after hydration;
    // inline variants never have one and the loop just gives up.
    const tick = () => {
      const trigger = findTrigger(root, mode);
      if (trigger) openOverlay(trigger);
      else if (Date.now() - started < TRIGGER_TIMEOUT_MS) setTimeout(tick, 100);
    };
    requestAnimationFrame(tick);
  };

  return (
    <main
      className="flex min-h-svh items-center justify-center bg-card p-6"
      ref={rootRef}
    >
      {Component ? (
        <React.Suspense fallback={null}>
          <Component />
          <OnHydrated onHydrated={handleHydrated} />
        </React.Suspense>
      ) : null}
    </main>
  );
}
