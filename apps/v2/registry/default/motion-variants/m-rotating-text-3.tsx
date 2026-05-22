"use client";

import { RotatingText } from "@/registry/default/motion/rotating-text";

const roles = ["engineers", "designers", "founders", "startups", "agencies"];

export default function RotatingTextTestimonial() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
          Trusted by{" "}
          <RotatingText
            className="text-primary"
            direction="down"
            interval={2200}
            transition={{ damping: 22, stiffness: 140, type: "spring" }}
            words={roles}
          />
          <br />
          around the world.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          direction="down" — words enter from above
        </p>
      </div>
    </div>
  );
}
