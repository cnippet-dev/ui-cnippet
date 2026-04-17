import Link from "next/link";

type ProductItem = {
  href: string;
  label: string;
  upcoming?: boolean;
};

export function ProductsDropdown({ items }: { items: ProductItem[] }) {
  return (
    <nav className="flex items-center gap-1">
      {items.map((item) => (
        <Link
          className="px-2 py-1 text-muted-foreground text-sm hover:text-foreground"
          href={item.href}
          key={item.label}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
