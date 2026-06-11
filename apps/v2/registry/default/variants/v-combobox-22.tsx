"use client";

import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/default/ui/combobox";

interface Currency {
  code: string;
  label: string;
  symbol: string;
  value: string;
}

const currencies: Currency[] = [
  { code: "USD", label: "US Dollar", symbol: "$", value: "usd" },
  { code: "EUR", label: "Euro", symbol: "€", value: "eur" },
  { code: "GBP", label: "British Pound", symbol: "£", value: "gbp" },
  { code: "JPY", label: "Japanese Yen", symbol: "¥", value: "jpy" },
  { code: "CAD", label: "Canadian Dollar", symbol: "$", value: "cad" },
  { code: "AUD", label: "Australian Dollar", symbol: "$", value: "aud" },
  { code: "CHF", label: "Swiss Franc", symbol: "Fr", value: "chf" },
  { code: "INR", label: "Indian Rupee", symbol: "₹", value: "inr" },
  { code: "SGD", label: "Singapore Dollar", symbol: "$", value: "sgd" },
  { code: "BRL", label: "Brazilian Real", symbol: "R$", value: "brl" },
];

export default function Particle() {
  const [value, setValue] = useState<Currency | null>(currencies[0] ?? null);

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Combobox
        items={currencies}
        onValueChange={(v) => setValue(v as Currency | null)}
        value={value}
      >
        <ComboboxTrigger
          render={
            <Button
              className="w-full justify-between font-normal"
              variant="outline"
            />
          }
        >
          {value ? (
            <span className="flex items-center gap-2 text-sm">
              <span className="flex size-6 items-center justify-center rounded bg-muted font-mono font-semibold text-xs">
                {value.symbol}
              </span>
              <ComboboxValue />
            </span>
          ) : (
            <ComboboxValue placeholder="Select currency..." />
          )}
          <ChevronsUpDownIcon className="-me-1!" />
        </ComboboxTrigger>
        <ComboboxPopup>
          <ComboboxInput placeholder="Search currency..." showTrigger={false} />
          <ComboboxEmpty>No currencies found.</ComboboxEmpty>
          <ComboboxList>
            {(cur: Currency) => (
              <ComboboxItem
                className="**:data-check:ms-auto"
                key={cur.value}
                value={cur}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded bg-muted font-mono font-semibold text-xs">
                  {cur.symbol}
                </span>
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-sm">{cur.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {cur.code}
                  </span>
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
      {value && (
        <div className="rounded-lg border px-4 py-2 text-sm">
          <span className="text-muted-foreground">Displaying prices in </span>
          <span className="font-medium">{value.label}</span>
          <span className="text-muted-foreground"> ({value.code})</span>
        </div>
      )}
    </div>
  );
}
