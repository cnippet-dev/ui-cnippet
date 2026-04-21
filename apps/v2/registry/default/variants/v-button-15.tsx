import { CloudDownloadIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";

export function Pattern() {
  return (
    <Button>
      <CloudDownloadIcon aria-hidden="true" />
      Download
    </Button>
  );
}
