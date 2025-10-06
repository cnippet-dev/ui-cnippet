"use client";

import { Calendar } from "@/components/ui/calendar";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useState } from "react";
import type { DateValue } from "react-aria-components";

export default function Component() {
    const [date, setDate] = useState<DateValue | null>(
        today(getLocalTimeZone()),
    );

    return (
        <div>
            <Calendar
                className="rounded-md border p-2"
                value={date}
                onChange={setDate}
            />
        </div>
    );
}
