"use client";

import { RefreshCwIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";

const rows = [
  { amount: "$1,200", customer: "Acme Corp", id: "INV-001", status: "Paid" },
  { amount: "$840", customer: "Globex Inc", id: "INV-002", status: "Pending" },
  { amount: "$3,500", customer: "Initech", id: "INV-003", status: "Paid" },
];

export default function Particle() {
  const [loading, setLoading] = useState(false);

  function handleRefresh() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  }

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <p className="font-medium text-sm">Invoices</p>
        <Button onClick={handleRefresh} size="sm" variant="ghost">
          {loading ? (
            <Spinner aria-hidden="true" className="size-4" />
          ) : (
            <RefreshCwIcon aria-hidden="true" className="size-4" />
          )}
          Refresh
        </Button>
      </div>
      <div className="divide-y">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                className="flex items-center justify-between px-4 py-3"
                key={String(i)}
              >
                <div className="flex items-center gap-3">
                  <Spinner className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">
                    Loading…
                  </span>
                </div>
              </div>
            ))
          : rows.map((row) => (
              <div
                className="flex items-center justify-between px-4 py-3"
                key={row.id}
              >
                <div>
                  <p className="font-medium text-sm">{row.customer}</p>
                  <p className="text-muted-foreground text-xs">{row.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{row.amount}</p>
                  <p
                    className={`text-xs ${row.status === "Paid" ? "text-green-600" : "text-muted-foreground"}`}
                  >
                    {row.status}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
