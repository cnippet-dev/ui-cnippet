"use client";

import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  color: string;
};

const initial: CartItem[] = [
  {
    color: "bg-slate-400",
    id: 1,
    name: "Wireless Headphones",
    price: 79,
    qty: 1,
  },
  {
    color: "bg-violet-400",
    id: 2,
    name: "Mechanical Keyboard",
    price: 129,
    qty: 1,
  },
  { color: "bg-rose-400", id: 3, name: "USB-C Hub", price: 49, qty: 2 },
];

export function Pattern() {
  const [items, setItems] = useState<CartItem[]>(initial);

  const update = (id: number, delta: number) =>
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="flex items-center justify-center">
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          <ShoppingCartIcon aria-hidden="true" />
          Cart
          {count > 0 && (
            <Badge className="ml-0.5 h-4 px-1 text-[10px]">{count}</Badge>
          )}
        </SheetTrigger>
        <SheetPopup>
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>
              {count} {count === 1 ? "item" : "items"} in your cart.
            </SheetDescription>
          </SheetHeader>
          <SheetPanel className="space-y-3">
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
                <ShoppingCartIcon className="size-8 opacity-40" />
                <p className="text-sm">Your cart is empty.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  className="flex items-center gap-3 rounded-lg border p-3"
                  key={item.id}
                >
                  <span
                    className={`size-10 shrink-0 rounded-md ${item.color}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm">{item.name}</p>
                    <p className="text-muted-foreground text-xs">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      aria-label="Decrease quantity"
                      className="size-6"
                      onClick={() => update(item.id, -1)}
                      size="icon"
                      variant="ghost"
                    >
                      {item.qty === 1 ? (
                        <TrashIcon className="size-3" />
                      ) : (
                        <MinusIcon className="size-3" />
                      )}
                    </Button>
                    <span className="w-5 text-center text-sm tabular-nums">
                      {item.qty}
                    </span>
                    <Button
                      aria-label="Increase quantity"
                      className="size-6"
                      onClick={() => update(item.id, 1)}
                      size="icon"
                      variant="ghost"
                    >
                      <PlusIcon className="size-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </SheetPanel>
          <SheetFooter className="flex-col gap-3 sm:flex-col">
            <div className="flex w-full items-center justify-between border-t pt-3 text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <SheetClose
                render={<Button className="flex-1" variant="ghost" />}
              >
                Continue shopping
              </SheetClose>
              <Button className="flex-1" disabled={items.length === 0}>
                Checkout
              </Button>
            </div>
          </SheetFooter>
        </SheetPopup>
      </Sheet>
    </div>
  );
}
