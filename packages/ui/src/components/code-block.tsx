import { CopyButton } from "@coss/ui/components/copy-button";
import { getIconForLanguageExtension } from "@coss/ui/components/icons";
import { highlightCode } from "@coss/ui/lib/highlight-code";

export async function CodeBlock({
  code,
  language,
  title,
  copyButton = true,
  showLineNumbers = true,
}: {
  code: string;
  language: string;
  title?: string | undefined;
  copyButton?: boolean;
  showLineNumbers?: boolean;
}) {
  const highlightedCode = await highlightCode(code, language, {
    showLineNumbers,
  });

  return (
    <figure data-rehype-pretty-code-figure="">
      {title && (
        <figcaption
          className="flex items-center gap-2 text-code-foreground [&_svg]:size-5 [&_svg]:text-code-foreground sm:[&_svg]:size-4"
          data-language={language}
          data-rehype-pretty-code-title=""
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      )}
      {copyButton && <CopyButton value={code} />}
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </figure>
  );
}
