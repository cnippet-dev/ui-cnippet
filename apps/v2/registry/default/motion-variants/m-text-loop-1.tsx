import { TextLoop } from "@/registry/default/motion/text-loop";

export default function TextLoopHeading() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <h1 className="text-center font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
        Components that are{" "}
        <TextLoop
          className="text-primary"
          interval={2.5}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <span>beautiful</span>
          <span>accessible</span>
          <span>composable</span>
          <span>fast</span>
        </TextLoop>
      </h1>
    </div>
  );
}
