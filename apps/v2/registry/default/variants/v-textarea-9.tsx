"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";
import { Textarea } from "@/registry/default/ui/textarea";

const INITIAL = `## What's new in v2.4

This release ships the **new dashboard** layout and several performance improvements.

### Changes
- Redesigned sidebar navigation
- Improved data table with column sorting
- Fixed auth token refresh on mobile
`;

export function Pattern() {
  const [content, setContent] = useState(INITIAL);

  return (
    <div className="w-full max-w-sm">
      <Tabs defaultValue="write">
        <TabsList className="mb-2" variant="underline">
          <TabsTab value="write">Write</TabsTab>
          <TabsTab value="preview">Preview</TabsTab>
        </TabsList>

        <TabsPanel value="write">
          <Textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write markdown here…"
            style={{ minHeight: "10rem" }}
            value={content}
          />
        </TabsPanel>

        <TabsPanel value="preview">
          <div className="min-h-40 rounded-lg border border-input bg-background p-3">
            {content ? (
              <p className="whitespace-pre-wrap text-foreground/80 text-xs leading-relaxed">
                {content}
              </p>
            ) : (
              <p className="text-muted-foreground text-xs">
                Nothing to preview.
              </p>
            )}
          </div>
        </TabsPanel>
      </Tabs>
    </div>
  );
}
