function Badge({
  badgeText,
  badgeLink,
  badgeLinkText,
  position,
}: {
  badgeText: string;
  badgeLink?: string;
  badgeLinkText?: string;
  position?: "center" | "left" | "right";
}) {
  return (
    <div
      className={`relative mr-auto w-fit bg-foreground/5 p-1 ${position === "center" ? "mx-auto" : position === "left" ? "mr-auto" : "ml-auto"} `}
    >
      <div
        aria-hidden="true"
        className="absolute top-1 left-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute top-1 right-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1 left-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute right-1 bottom-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div className="relative flex h-fit items-center gap-2 px-3">
        <span className="text-sm text-title">{badgeText}</span>
        {badgeLink && (
          <>
            <span className="block h-3 w-px bg-foreground/5" />
            <a className="text-primary text-sm" href={badgeLink}>
              {badgeLinkText}
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section>
      <div className="relative px-4 pt-1.5 md:px-0">
        <div className="mx-auto max-w-6xl border-x px-2 md:px-0">
          <div className="mx-auto max-w-3xl py-32 text-center">
            <div className="mb-4">
              <Badge
                badgeLink="#"
                badgeLinkText="Learn more"
                badgeText="Now available for Enterprise"
              />
            </div>

            <h1 className="text-balance font-medium text-4xl text-foreground sm:text-5xl lg:text-6xl">
              Ship stunning interfaces faster with Cnippet UI.
            </h1>
            <p className="mx-auto mt-4 mb-8 max-w-xl text-balance text-lg text-muted-foreground">
              One platform for your entire team to plan, build, and iterate.
              From ideation to deployment, Ruixen keeps everything in sync.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-none border-[0.5px] border-white/10 bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow-black/15 shadow-md transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href={"#"}
              >
                Get Started Free
              </a>
              <a
                className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-none border border-transparent bg-card px-4 py-2 font-medium text-sm shadow-black/15 shadow-sm ring-1 ring-foreground/10 transition-colors duration-200 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:ring-foreground/15 dark:hover:bg-muted/50"
                href={"#"}
              >
                Request a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
