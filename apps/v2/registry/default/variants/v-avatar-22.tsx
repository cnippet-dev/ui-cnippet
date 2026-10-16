import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";

const photo = (id: string, size: number) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&dpr=2&q=80`;

const sarah = {
  id: "1519699047748-de8e457a634e",
  initials: "SC",
  name: "Sarah Chen",
};

const team = [
  sarah,
  { id: "1584308972272-9e4e7685e80f", initials: "MR", name: "Marco Rossi" },
  { id: "1485893086445-ed75865251e0", initials: "EW", name: "Emma Wilson" },
];

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[5rem_1fr] sm:items-center">
      <span className="text-muted-foreground text-xs">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function Particle() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Row label="Sizes">
        {[24, 32, 48, 64].map((size) => (
          <Avatar key={size} style={{ height: size, width: size }}>
            <AvatarImage alt={sarah.name} src={photo(sarah.id, size * 2)} />
            <AvatarFallback>{sarah.initials}</AvatarFallback>
          </Avatar>
        ))}
      </Row>
      <Row label="Radius">
        {["rounded-md", "rounded-xl", "rounded-full"].map((radius) => (
          <Avatar className={radius} key={radius}>
            <AvatarImage alt={sarah.name} src={photo(sarah.id, 96)} />
            <AvatarFallback>{sarah.initials}</AvatarFallback>
          </Avatar>
        ))}
      </Row>
      <Row label="Fallback">
        <Avatar>
          <AvatarFallback>MP</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
      </Row>
      <Row label="Group">
        <div className="flex -space-x-2.5">
          {team.map((person) => (
            <Avatar className="ring-2 ring-background" key={person.id}>
              <AvatarImage alt={person.name} src={photo(person.id, 96)} />
              <AvatarFallback>{person.initials}</AvatarFallback>
            </Avatar>
          ))}
          <Avatar className="ring-2 ring-background">
            <AvatarFallback>+3</AvatarFallback>
          </Avatar>
        </div>
      </Row>
    </div>
  );
}
