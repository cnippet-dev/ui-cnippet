import { Logos } from "@/components/ui/logos";
import { MovingUsersFacehashes } from "./moving-users-facehashes";

function CnippetIs() {
  return (
    <section className="flex flex-col gap-6 px-4 py-40">
      <h2 className="mx-auto max-w-2xl text-pretty text-center font-f37-stout text-2xl text-primary/70 leading-relaxed md:text-left md:text-[34px]">
        <span className="text-primary">Cnippet UI started as a question: </span>
        why are the component libraries developers use so rarely both accessible
        and beautiful?{" "}
        <span className="text-primary">
          We couldn&apos;t answer that — so we decided to be the answer.{" "}
          <MovingUsersFacehashes />
        </span>
        <br />
        <br />
        Cnippet UI is a collection of accessible, composable React components
        built with Base UI and Tailwind CSS.{" "}
        <span className="text-primary">Copy the code. Own it completely.</span>
        <br />
        <br />
        No npm package to fight. No lock-in. Components that live in your
        codebase.{" "}
        <span className="text-primary">
          Built for teams that ship production products and care about
          accessibility from day one.
        </span>
        <br />
        <br />
        <span className="text-primary">
          Built on React{" "}
          <span className="inline-flex items-center justify-center rounded-md border border-border border-dashed p-1 align-middle">
            <Logos.react className="size-5" />
          </span>{" "}
          and Next.js{" "}
          <span className="inline-flex items-center justify-center rounded-md border border-border border-dashed p-1 align-middle">
            <Logos.nextjs className="size-5" />
          </span>
        </span>
        . Used by developers worldwide.
      </h2>
    </section>
  );
}

export default CnippetIs;
