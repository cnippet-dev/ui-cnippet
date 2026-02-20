export const codeSnippets: Record<string, string> = {
  cli: `# Install all UI components with optimized colors
npx cnippet@latest add ui @cnippet/colors-zinc

# Or add individual components
npx cnippet@latest add button
npx cnippet@latest add dialog
npx cnippet@latest add tabs`,
  manual: `// 1. Copy the component source into your project
//    e.g. components/ui/button.tsx

// 2. Install the peer dependency
npm install @base-ui-components/react

// 3. Import and use
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button variant="outline">Click me</Button>;
}`,
  usage: `import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmDialog() {
  return (
    <Dialog>
      <Dialog.Trigger render={<Button />}>
        Open Dialog
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <DialogContent>
          <DialogTitle>Are you sure?</DialogTitle>
          <p>This action cannot be undone.</p>
        </DialogContent>
      </Dialog.Portal>
    </Dialog>
  );
}`,
};

export const snippetLanguages: Record<string, string> = {
  cli: "bash",
  manual: "tsx",
  usage: "tsx",
};
