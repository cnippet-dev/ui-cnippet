import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

type Currency = {
  code: string;
  label: string;
  symbol: string;
  value: string;
};

const currencies: Currency[] = [
  { code: "USD", label: "US Dollar", symbol: "$", value: "usd" },
  { code: "EUR", label: "Euro", symbol: "€", value: "eur" },
  { code: "GBP", label: "British Pound", symbol: "£", value: "gbp" },
  { code: "JPY", label: "Japanese Yen", symbol: "¥", value: "jpy" },
  { code: "CAD", label: "Canadian Dollar", symbol: "$", value: "cad" },
  { code: "AUD", label: "Australian Dollar", symbol: "$", value: "aud" },
  { code: "INR", label: "Indian Rupee", symbol: "₹", value: "inr" },
  { code: "CHF", label: "Swiss Franc", symbol: "₣", value: "chf" },
];

const placeholder = {
  code: "",
  label: "Select currency",
  symbol: "",
  value: null,
};
const allItems = [placeholder, ...currencies];

export default function Component() {
  return (
    <Select defaultValue={currencies[0]} items={allItems}>
      <SelectTrigger className="w-60">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {currencies.map((item) => (
          <SelectItem key={item.value} value={item}>
            <span className="flex items-center gap-2">
              <span className="w-6 text-center font-mono text-muted-foreground text-sm">
                {item.symbol}
              </span>
              <span>{item.label}</span>
              <span className="ms-auto text-muted-foreground text-xs">
                {item.code}
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}
