"use client";

import * as React from "react";

import { Calendar } from "@/registry/default/ui/calendar";

export default function Variant() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      captionLayout="label"
      className="rounded-md border shadow-sm"
      mode="single"
      onSelect={setDate}
      selected={date}
    />
  );
}
