import { Separator } from "@/registry/default/ui/separator";

const sections = [
  {
    description: "Manage your personal details and preferences.",
    title: "Profile",
  },
  {
    description: "Update password, 2FA, and login sessions.",
    title: "Security",
  },
  {
    description: "Choose what you get notified about.",
    title: "Notifications",
  },
];

export default function Particle() {
  return (
    <div className="w-64 overflow-hidden rounded-lg border">
      {sections.map(({ description, title }, i) => (
        <div key={title}>
          {i > 0 && <Separator />}
          <div className="p-4">
            <p className="font-medium text-sm">{title}</p>
            <p className="mt-0.5 text-muted-foreground text-xs">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
