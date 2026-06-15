"use client";

import { useState } from "react";
import { Input } from "@/registry/default/ui/input";
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";

function getStrength(password: string): {
  color: string;
  label: string;
  value: number;
} {
  if (password.length === 0) return { color: "", label: "", value: 0 };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { color: "bg-destructive", label: "Weak", value: 20 };
  if (score === 2) return { color: "bg-orange-500", label: "Fair", value: 40 };
  if (score === 3) return { color: "bg-yellow-500", label: "Good", value: 60 };
  if (score === 4) return { color: "bg-blue-500", label: "Strong", value: 80 };
  return { color: "bg-green-500", label: "Very strong", value: 100 };
}

export default function Particle() {
  const [password, setPassword] = useState("");
  const strength = getStrength(password);

  return (
    <div className="w-full max-w-sm space-y-3">
      <Input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter a password"
        type="password"
        value={password}
      />
      <Meter value={strength.value}>
        <div className="flex items-center justify-between gap-2">
          <MeterLabel>Password strength</MeterLabel>
          {strength.label && <MeterValue>{() => strength.label}</MeterValue>}
        </div>
        <MeterTrack>
          <MeterIndicator className={strength.color} />
        </MeterTrack>
      </Meter>
    </div>
  );
}
