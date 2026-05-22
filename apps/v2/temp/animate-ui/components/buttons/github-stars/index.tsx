import { cn } from "@workspace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { StarIcon } from "lucide-react";
import {
  GithubStars,
  GithubStarsIcon,
  GithubStarsLogo,
  GithubStarsNumber,
  GithubStarsParticles,
  type GithubStarsProps,
} from "@/registry/primitives/animate/github-stars";
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from "@/registry/primitives/buttons/button";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-[box-shadow,_color,_background-color,_border-color,_outline-color,_text-decoration-color,_fill,_stroke] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
      },
      variant: {
        accent: "bg-accent text-accent-foreground shadow-xs hover:bg-accent/90",
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
      },
    },
  },
);

const buttonStarVariants = cva("", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      accent:
        "fill-neutral-300 stroke-neutral-300 dark:fill-neutral-700 dark:stroke-neutral-700",
      default:
        "fill-neutral-700 stroke-neutral-700 dark:fill-neutral-300 dark:stroke-neutral-300",
      ghost:
        "fill-neutral-300 stroke-neutral-300 dark:fill-neutral-700 dark:stroke-neutral-700",
      outline:
        "fill-neutral-300 stroke-neutral-300 dark:fill-neutral-700 dark:stroke-neutral-700",
    },
  },
});

type GitHubStarsButtonProps = Omit<
  ButtonPrimitiveProps & GithubStarsProps,
  "asChild" | "children"
> &
  VariantProps<typeof buttonVariants>;

function GitHubStarsButton({
  className,
  username,
  repo,
  value,
  delay,
  inView,
  inViewMargin,
  inViewOnce,
  variant,
  size,
  ...props
}: GitHubStarsButtonProps) {
  return (
    <GithubStars
      asChild
      delay={delay}
      inView={inView}
      inViewMargin={inViewMargin}
      inViewOnce={inViewOnce}
      repo={repo}
      username={username}
      value={value}
    >
      <ButtonPrimitive
        className={cn(buttonVariants({ className, size, variant }))}
        {...props}
      >
        <GithubStarsLogo />
        <GithubStarsNumber />
        <GithubStarsParticles className="text-yellow-500">
          <GithubStarsIcon
            activeClassName="text-yellow-500"
            className={cn(buttonStarVariants({ variant }))}
            data-variant={variant}
            icon={StarIcon}
            size={18}
          />
        </GithubStarsParticles>
      </ButtonPrimitive>
    </GithubStars>
  );
}

export { GitHubStarsButton, type GitHubStarsButtonProps };
