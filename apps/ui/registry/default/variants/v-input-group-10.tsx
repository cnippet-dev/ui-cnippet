import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function Particle() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Small</p>
        <InputGroup>
          <InputGroupInput
            aria-label="Search"
            placeholder="Search"
            size="sm"
            type="search"
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex items-center justify-between gap-10 [&_p]:text-xs">
        <p>Large</p>
        <InputGroup>
          <InputGroupInput
            aria-label="Search"
            placeholder="Search"
            size="lg"
            type="search"
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
