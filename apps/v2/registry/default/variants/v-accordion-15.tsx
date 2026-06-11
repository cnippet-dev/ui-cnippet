import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";
import { Badge } from "@/registry/default/ui/badge";

const specs = [
  {
    category: "Display",
    rows: [
      ["Screen Size", "14.2-inch Liquid Retina XDR"],
      ["Resolution", "3024 × 1964 at 254 ppi"],
      ["Brightness", "1000 nits sustained (full-screen)"],
      ["Refresh Rate", "ProMotion adaptive 24Hz to 120Hz"],
    ],
    value: "display",
  },
  {
    category: "Performance",
    rows: [
      ["Chip", "Apple M4 Pro"],
      ["CPU Cores", "14-core (10 performance, 4 efficiency)"],
      ["GPU Cores", "20-core"],
      ["Memory", "24 GB unified memory"],
      ["Storage", "512 GB SSD"],
    ],
    value: "performance",
  },
  {
    category: "Battery & Power",
    rows: [
      ["Battery Life", "Up to 22 hours video playback"],
      ["Battery Capacity", "72.4-watt-hour lithium-polymer"],
      ["Fast Charge", "0–50% in ~30 min with 96W+ adapter"],
      ["Charger", "96W USB-C Power Adapter (included)"],
    ],
    value: "battery",
  },
  {
    category: "Connectivity",
    rows: [
      ["Wi-Fi", "Wi-Fi 6E (802.11ax)"],
      ["Bluetooth", "5.3"],
      ["Ports", "3× Thunderbolt 4, HDMI, SD card, MagSafe 3"],
    ],
    value: "connectivity",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="font-semibold text-base">Technical Specifications</h2>
        <Badge size="sm" variant="secondary">
          MacBook Pro 14&Prime;
        </Badge>
      </div>
      <Accordion className="w-full" defaultValue={["display"]} multiple>
        {specs.map((spec) => (
          <AccordionItem key={spec.value} value={spec.value}>
            <AccordionTrigger className="font-medium">
              {spec.category}
            </AccordionTrigger>
            <AccordionContent>
              <dl className="divide-y text-sm">
                {spec.rows.map(([label, value]) => (
                  <div className="flex items-baseline gap-4 py-2.5" key={label}>
                    <dt className="w-36 shrink-0 text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
