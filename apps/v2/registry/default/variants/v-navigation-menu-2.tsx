// title: Docs menu with sections and a plain link
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/registry/default/ui/navigation-menu";

const SECTIONS = {
  Components: [
    ["Button", "Actions, links and icon buttons."],
    ["Dialog", "Modal windows for focused tasks."],
    ["Stepper", "Progress through multi-step flows."],
    ["Tag Input", "Free-form tags with validation."],
    ["Sidebar", "Collapsible app navigation."],
    ["File Upload", "Drag-and-drop with previews."],
  ],
  "Getting started": [
    ["Introduction", "What Cnippet is and how it works."],
    ["Installation", "Add it to a Next.js or Vite app."],
    ["Theming", "Tokens, dark mode and custom colors."],
  ],
} as const;

export default function Particle() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {Object.entries(SECTIONS).map(([section, pages]) => (
          <NavigationMenuItem key={section}>
            <NavigationMenuTrigger>{section}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                className={
                  pages.length > 3
                    ? "grid gap-1 sm:w-[28rem] sm:grid-cols-2"
                    : "grid gap-1 sm:w-72"
                }
              >
                {pages.map(([title, description]) => (
                  <li key={title}>
                    <NavigationMenuLink
                      href={`#${title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <span className="font-medium">{title}</span>
                      <span className="text-muted-foreground text-xs">
                        {description}
                      </span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuLink href="#github" variant="trigger">
            GitHub
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
