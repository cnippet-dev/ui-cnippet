import type { MotionValue } from "motion/react";
import * as React from "react";

function useMotionValueState(motionValue: MotionValue): number {
  return React.useSyncExternalStore(
    (callback) => {
      const unsub = motionValue.on("change", callback);
      return unsub;
    },
    () => motionValue.get(),
    () => motionValue.get(),
  );
}

export { useMotionValueState };
