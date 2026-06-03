import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/default/ui/input-group";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const currencies = [
  { label: "USD", value: "usd" },
  { label: "EUR", value: "eur" },
  { label: "GBP", value: "gbp" },
];

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupAddon>
        <Select defaultValue="usd" items={currencies}>
          <SelectTrigger className="h-full rounded-none border-0 border-e bg-transparent shadow-none focus-visible:z-10">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {currencies.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Amount"
        inputMode="decimal"
        placeholder="0.00"
        type="text"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText>per unit</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
