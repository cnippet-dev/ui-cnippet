// title: Time slot select
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

// 30-minute slots from 9:00 AM to 5:30 PM
const slots = Array.from({ length: 18 }, (_, i) => {
  const minutes = 9 * 60 + i * 30;
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const label = `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;
  return {
    label,
    value: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
  };
});

const items = [{ label: "Select a time", value: null }, ...slots];

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel>Meeting time</FieldLabel>
      <Select items={items}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {slots.map((slot) => (
            <SelectItem key={slot.value} value={slot.value}>
              {slot.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <FieldDescription>
        Times are shown in your local timezone.
      </FieldDescription>
    </Field>
  );
}
