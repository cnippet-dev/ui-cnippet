"use client";

import { AlertTriangleIcon, CircleCheckIcon, InfoIcon } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export function Pattern() {
  const id = useId();
  const [password, setPassword] = useState("");

  const getStrength = (pass: string) => {
    const requirements = [
      { met: pass.length >= 8, text: "8+ characters" },
      { met: /[0-9]/.test(pass), text: "a number" },
      { met: /[!@#$%^&*]/.test(pass), text: "a special character" },
    ];
    const metCount = requirements.filter((r) => r.met).length;
    return { metCount, requirements };
  };

  const { metCount } = getStrength(password);

  const getHint = () => {
    if (!password) {
      return "Use 8+ characters with a number and a special character.";
    }
    if (metCount === 3) {
      return "Strong password. You're all set!";
    }
    if (metCount === 2) {
      return "Almost there! Add the missing requirement.";
    }
    return "Weak password. Include 8+ characters, a number, and a special character.";
  };

  const getStatus = () => {
    if (!password)
      return {
        color: "text-muted-foreground",
        icon: <InfoIcon className="size-3.5 shrink-0" />,
      };
    if (metCount === 3)
      return {
        color: "text-emerald-500",
        icon: <CircleCheckIcon className="size-3.5 shrink-0" />,
      };
    if (metCount === 2)
      return {
        color: "text-amber-500",
        icon: <AlertTriangleIcon className="size-3.5 shrink-0" />,
      };
    return {
      color: "text-destructive",
      icon: <AlertTriangleIcon className="size-3.5 shrink-0" />,
    };
  };

  const { color, icon: StatusIcon } = getStatus();

  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor={id}>Password</FieldLabel>
      <Input
        id={id}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        type="password"
        value={password}
      />
      <div
        className={cn(
          "flex items-center gap-2 text-xs transition-colors duration-200",
          color,
        )}
      >
        {StatusIcon}
        <p>{getHint()}</p>
      </div>
    </Field>
  );
}
