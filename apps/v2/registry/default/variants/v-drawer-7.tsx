import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/default/ui/drawer";

const cartItems = [
  { id: 1, name: "Wireless Headphones", price: 79.99, qty: 1 },
  { id: 2, name: "Mechanical Keyboard", price: 129.0, qty: 1 },
  { id: 3, name: "USB-C Hub", price: 49.99, qty: 2 },
];

export default function Component() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  return (
    <Drawer position="right">
      <DrawerTrigger render={<Button variant="outline" />}>
        <ShoppingCartIcon className="size-4" />
        Cart ({cartItems.length})
      </DrawerTrigger>
      <DrawerPopup showCloseButton variant="straight">
        <DrawerHeader>
          <DrawerTitle>Your cart</DrawerTitle>
        </DrawerHeader>
        <DrawerPanel>
          <ul className="divide-y divide-border">
            {cartItems.map((item) => (
              <li className="flex items-center gap-3 py-3" key={item.id}>
                <div className="size-12 shrink-0 rounded-lg bg-muted" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sm">{item.name}</p>
                  <p className="text-muted-foreground text-sm">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button className="size-6" size="icon" variant="outline">
                    <MinusIcon className="size-3" />
                  </Button>
                  <span className="w-6 text-center text-sm tabular-nums">
                    {item.qty}
                  </span>
                  <Button className="size-6" size="icon" variant="outline">
                    <PlusIcon className="size-3" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </DrawerPanel>
        <DrawerFooter className="flex md:flex-col">
          <div className="mb-1 flex w-full items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <DrawerClose render={<Button className="w-full" />}>
            Checkout
          </DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
