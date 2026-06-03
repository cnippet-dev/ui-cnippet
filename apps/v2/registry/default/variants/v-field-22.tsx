"use client";

import { Field, FieldLabel, FieldValidity } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Field>
      <FieldLabel>
        New password <span className="text-destructive-foreground">*</span>
      </FieldLabel>
      <Input
        minLength={8}
        placeholder="Enter new password"
        required
        type="password"
      />
      <FieldValidity>
        {(validity) => {
          const value = validity.value as string | undefined;
          const len = value?.length ?? 0;
          const strength =
            len === 0 ? 0 : len < 6 ? 1 : len < 10 ? 2 : len < 14 ? 3 : 4;
          const labels = ["", "Weak", "Fair", "Good", "Strong"];
          const colors = [
            "",
            "bg-destructive",
            "bg-yellow-500",
            "bg-blue-500",
            "bg-green-500",
          ];
          return (
            <div className="flex flex-col gap-1.5">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      level <= strength ? colors[strength] : "bg-muted"
                    }`}
                    key={level}
                  />
                ))}
              </div>
              {strength > 0 && (
                <p className="text-muted-foreground text-xs">
                  {labels[strength]} password
                </p>
              )}
            </div>
          );
        }}
      </FieldValidity>
    </Field>
  );
}
