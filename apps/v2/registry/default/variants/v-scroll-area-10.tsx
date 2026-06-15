import { ScrollArea } from "@/registry/default/ui/scroll-area";

const code = `import { useState, useEffect, useCallback } from "react";

type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    status: "idle",
  });

  const fetch_ = useCallback(async () => {
    setState({ status: "loading" });
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
      }
      const data: T = await res.json();
      setState({ status: "success", data });
    } catch (err) {
      setState({
        error: err instanceof Error ? err : new Error(String(err)),
        status: "error",
      });
    }
  }, [url]);

  useEffect(() => {
    fetch_();
  }, [fetch_]);

  return state;
}`;

export default function Particle() {
  return (
    <ScrollArea className="h-64 max-w-sm rounded-lg border bg-muted/30">
      <pre className="p-4 font-mono text-foreground text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </ScrollArea>
  );
}
