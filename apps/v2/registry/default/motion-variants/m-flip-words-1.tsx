import { FlipWords } from "@/registry/default/motion/flip-words";

const adjectives = ["beautiful", "accessible", "composable", "performant"];

export default function FlipWordsHero() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <h1 className="text-center font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
        Build{" "}
        <FlipWords
          className="text-primary"
          duration={2500}
          words={adjectives}
        />
        <br />
        interfaces with ease
      </h1>
    </div>
  );
}
