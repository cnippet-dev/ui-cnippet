// title: Showcase: single, range and disabled
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Slider, SliderValue } from "@/registry/default/ui/slider";

export default function Particle() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Field>
        <Slider defaultValue={64}>
          <div className="mb-2 flex items-center justify-between gap-1">
            <FieldLabel className="font-medium text-sm">Volume</FieldLabel>
            <SliderValue />
          </div>
        </Slider>
      </Field>
      <Field>
        <Slider defaultValue={[20, 80]}>
          <div className="mb-2 flex items-center justify-between gap-1">
            <FieldLabel className="font-medium text-sm">Price range</FieldLabel>
            <SliderValue />
          </div>
        </Slider>
      </Field>
      <Field>
        <Slider defaultValue={40} disabled>
          <div className="mb-2 flex items-center justify-between gap-1">
            <FieldLabel className="font-medium text-sm">Disabled</FieldLabel>
            <SliderValue />
          </div>
        </Slider>
      </Field>
    </div>
  );
}
