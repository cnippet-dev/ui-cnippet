import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/motion/collapsible-cn";

export default function CollapsibleBasic() {
    return (
        <Collapsible className="w-[330px] rounded-md border border-zinc-200 px-3 dark:border-zinc-700">
            <CollapsibleTrigger>
                <button className="w-full py-2 text-left text-sm" type="button">
                    Show more
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="overflow-hidden pb-3">
                    <div className="font-mono pt-1 text-sm">
                        <p>
                            This example demonstrates how you can use{" "}
                            <strong className="font-bold">Collapsible</strong>{" "}
                            component.
                        </p>
                        <pre className="mt-2 rounded-md bg-zinc-100 p-2 text-xs dark:bg-zinc-950">
                            {`function CollapsibleBasic() {\n  return (\n    <Collapsible>\n      <CollapsibleTrigger>\n        <button type='button'>\n          Show more\n        </button>\n      </CollapsibleTrigger>\n      <CollapsibleContent>\n        <div>hey</div>\n      </CollapsibleContent>\n    </Collapsible>\n  );`}
                        </pre>
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
