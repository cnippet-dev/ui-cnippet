// title: Colour picker in a popover behind a swatch button
"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerHue,
  ColorPickerInput,
} from "@/registry/default/ui/color-picker";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

export default function Particle() {
  const [color, setColor] = useState("#14b8a6");

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-sm">Accent colour</p>
      <Popover>
        <PopoverTrigger
          render={<Button className="w-40 justify-start" variant="outline" />}
        >
          <span
            className="size-4 rounded-sm shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)]"
            style={{ backgroundColor: color }}
          />
          <span className="font-mono">{color}</span>
        </PopoverTrigger>
        <PopoverPopup className="w-64">
          <ColorPicker onValueChange={setColor} value={color}>
            <ColorPickerArea />
            <ColorPickerHue />
            <ColorPickerInput />
          </ColorPicker>
        </PopoverPopup>
      </Popover>
    </div>
  );
}
