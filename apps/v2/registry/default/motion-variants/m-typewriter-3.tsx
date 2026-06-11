import { Typewriter } from "@/registry/default/motion/typewriter";

export default function TypewriterTerminal() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-xl border border-border bg-neutral-950 p-5 shadow-xl">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="font-mono text-green-400 text-sm">
          <p className="mb-1 text-neutral-500">~ cnippet</p>
          <div className="flex">
            <span className="mr-2 text-neutral-500">$</span>
            <Typewriter
              as="span"
              cursorChar="▋"
              cursorClassName="ml-0.5 text-green-400"
              initialDelay={400}
              loop={false}
              speed={45}
              text="npx cnippet@latest add text-reveal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
