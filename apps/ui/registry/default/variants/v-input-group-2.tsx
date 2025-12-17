import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

export default function Particle() {
  return (
    <div className="space-y-4">
      <div className="space-y-2 [&_p]:text-xs">
        <p>With Start Text</p>
        <InputGroup>
          <InputGroupInput
            aria-label="Set your URL"
            className="*:[input]:ps-0!"
            placeholder="cnippet"
            type="search"
          />
          <InputGroupAddon>
            <InputGroupText>i.cnippet.dev/</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="space-y-2 [&_p]:text-xs">
        <p>With End Text</p>
        <InputGroup>
          <InputGroupInput
            aria-label="Choose a username"
            placeholder="Choose a username"
            type="text"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupText>@cnipept.dev</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="space-y-2 [&_p]:text-xs">
        <p>With Start and End Text</p>
        <InputGroup>
          <InputGroupInput
            aria-label="Enter your domain"
            className="*:[input]:px-0!"
            placeholder="cnippet"
            type="text"
          />
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupText>.dev</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
