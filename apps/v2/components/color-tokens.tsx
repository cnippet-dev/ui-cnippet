import { CopyButton } from "@cnippet/ui/shared/copy-button";
import colors from "tailwindcss/colors";
import {
  Frame,
  FrameHeader,
  FrameMeta,
  FramePanel,
  FrameTitle,
} from "@/components/signal/frame";
import { styles } from "@/registry/registry-styles";

type Mode = "light" | "dark";
type Vars = Record<string, string>;

const style = styles.find((item) => item.name === "style");
const tokens: Record<Mode, Vars> = {
  dark: (style?.cssVars?.dark ?? {}) as Vars,
  light: (style?.cssVars?.light ?? {}) as Vars,
};

const GROUPS: { title: string; names: string[] }[] = [
  {
    names: [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
    ],
    title: "Surfaces",
  },
  {
    names: [
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "accent",
      "accent-foreground",
      "muted",
      "muted-foreground",
    ],
    title: "Actions",
  },
  {
    names: [
      "destructive",
      "destructive-foreground",
      "info",
      "info-foreground",
      "success",
      "success-foreground",
      "warning",
      "warning-foreground",
    ],
    title: "Status",
  },
  { names: ["border", "input", "ring"], title: "Lines" },
  {
    names: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
    title: "Charts",
  },
  {
    names: [
      "sidebar",
      "sidebar-foreground",
      "sidebar-primary",
      "sidebar-primary-foreground",
      "sidebar-accent",
      "sidebar-accent-foreground",
      "sidebar-border",
      "sidebar-ring",
    ],
    title: "Sidebar",
  },
  { names: ["code", "code-foreground", "code-highlight"], title: "Code" },
];

const palette = colors as unknown as Record<
  string,
  string | Record<string, string>
>;

function tailwindColor(name: string): string | undefined {
  const [hue = "", shade] = name.split(/-(?=\d+$)/);
  const entry = palette[hue];
  return typeof entry === "string" ? entry : shade ? entry?.[shade] : undefined;
}

/**
 * Turns a registry value into CSS a browser can paint without the Tailwind
 * build: `var(--color-*)` becomes the palette colour, `var(--token)` the
 * resolved token, and `--alpha()` a `color-mix()`.
 */
function resolve(value: string, mode: Mode, depth = 0): string {
  const withVars = value.replace(/var\(--([a-z0-9-]+)\)/g, (match, name) => {
    if (name.startsWith("color-")) {
      return tailwindColor(name.slice("color-".length)) ?? match;
    }
    const ref = tokens[mode][name];
    return ref && depth < 4 ? resolve(ref, mode, depth + 1) : match;
  });
  return withVars.replace(
    /--alpha\((.+?) \/ ([\d.]+%)\)/g,
    "color-mix(in oklab, $1 $2, transparent)",
  );
}

function Swatch({ name }: { name: string }) {
  return (
    <div
      aria-hidden
      className="grid size-10 shrink-0 grid-cols-2 overflow-hidden rounded-lg border"
    >
      {(["light", "dark"] as const).map((mode) => (
        <span
          key={mode}
          style={{ background: resolve("var(--background)", mode) }}
        >
          <span
            className="block size-full"
            style={{ background: resolve(tokens[mode][name] ?? "", mode) }}
          />
        </span>
      ))}
    </div>
  );
}

/** Every colour token in the `@cnippet/style` theme, light and dark. */
export function ColorTokens() {
  return (
    <div className="not-prose mt-6 flex flex-col gap-6">
      {GROUPS.map((group) => (
        <Frame key={group.title}>
          <FrameHeader>
            <FrameTitle>{group.title}</FrameTitle>
            <FrameMeta>{group.names.length} tokens</FrameMeta>
          </FrameHeader>
          <FramePanel>
            <ul className="divide-y">
              {group.names.map((name) => (
                <li className="flex items-start gap-3 px-3 py-3" key={name}>
                  <Swatch name={name} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium font-mono text-[13px] text-foreground">
                      --{name}
                    </p>
                    <dl className="mt-1 grid grid-cols-[3rem_1fr] gap-x-2 font-mono text-[11.5px] leading-5">
                      {(["light", "dark"] as const).map((mode) => (
                        <div className="contents" key={mode}>
                          <dt className="text-faint">{mode}</dt>
                          <dd className="break-all text-muted-foreground">
                            {tokens[mode][name]}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <CopyButton
                    aria-label={`Copy var(--${name})`}
                    className="static shrink-0 bg-transparent"
                    value={`var(--${name})`}
                  />
                </li>
              ))}
            </ul>
          </FramePanel>
        </Frame>
      ))}
    </div>
  );
}
