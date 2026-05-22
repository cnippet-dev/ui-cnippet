import { Typewriter } from "@/registry/default/motion/typewriter";

export default function TypewriterLoop() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
        We help teams{" "}
        <span className="text-primary">
          <Typewriter
            deleteSpeed={25}
            loop
            speed={55}
            text={[
              "ship faster",
              "design better",
              "animate beautifully",
              "stay consistent",
            ]}
            waitTime={1800}
          />
        </span>
      </h2>
    </div>
  );
}
