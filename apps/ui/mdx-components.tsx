import { useMDXComponent } from "@content-collections/mdx/react";
import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/mdx/copy-button";

import { ComponentPreview } from "@/components/mdx/component-preview";
import { CollapsibleSource } from "./components/mdx/collapsible-source";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlockCommand } from "./components/mdx/code-block-command";
import { Button } from "@/components/ui/button";
interface MDXProps {
    code: string;
    className?: string;
}

const components = {
    ComponentPreview,
    CollapsibleSource,
    Button,
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className={cn(
                "font-heading font-ins mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0 dark:border-neutral-800",
                className,
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            className={cn(
                "font-heading font-ins mt-4 scroll-m-20 text-lg tracking-tight md:mt-8 md:text-2xl",
                className,
            )}
            {...props}
        />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4
            className={cn(
                "font-heading mt-4 scroll-m-20 text-lg font-semibold tracking-tight md:mt-8",
                className,
            )}
            {...props}
        />
    ),
    p: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className={cn("mt-3 leading-7 font-normal", className)} {...props} />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <li className={cn("mt-2", className)} {...props} />
    ),
    a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
        <a
            className={cn(
                "text-blue-600 underline-offset-2 hover:underline",
                className,
            )}
            {...props}
        />
    ),

    table: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="font-ins my-6 w-full overflow-y-auto text-sm font-medium">
            <table className={cn("w-full", className)} {...props} />
        </div>
    ),
    tr: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className={cn("m-0 border-t p-0", className)} {...props} />
    ),
    th: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            className={cn(
                "font-ins border px-4 py-2 text-left font-medium dark:border-neutral-600 [[align=center]]:text-center [[align=right]]:text-right",
                className,
            )}
            {...props}
        />
    ),
    td: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
            className={cn(
                "border px-4 py-2 text-left dark:border-neutral-600 [[align=center]]:text-center [[align=right]]:text-right",
                className,
            )}
            {...props}
        />
    ),

    strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <strong className={cn("font-ins font-medium", className)} {...props} />
    ),

    figure: ({
        className,
        __rawString__,
        __npmCommand__,
        __pnpmCommand__,
        __yarnCommand__,
        __bunCommand__,
        children,
        ...props
    }: React.HTMLAttributes<HTMLPreElement> & {
        __rawString__?: string;
        __npmCommand__?: string;
        __pnpmCommand__?: string;
        __yarnCommand__?: string;
        __bunCommand__?: string;
        children?: React.ReactNode;
    }) => {
        const isNpmCommand =
            __npmCommand__ &&
            __yarnCommand__ &&
            __pnpmCommand__ &&
            __bunCommand__;

        if (isNpmCommand) {
            return (
                <CodeBlockCommand
                    __npmCommand__={__npmCommand__}
                    __yarnCommand__={__yarnCommand__}
                    __pnpmCommand__={__pnpmCommand__}
                    __bunCommand__={__bunCommand__}
                />
            );
        }
        return (
            <figure {...props} className="relative mb-4 rounded-lg">
                {children}
                {__rawString__ && <CopyButton value={__rawString__} />}
            </figure>
        );
    },

    pre: ({
        className,
        __rawString__,
        __npmCommand__,
        __pnpmCommand__,
        __yarnCommand__,
        __bunCommand__,
        ...props
    }: React.HTMLAttributes<HTMLPreElement> & {
        __rawString__?: string;
        __npmCommand__?: string;
        __pnpmCommand__?: string;
        __yarnCommand__?: string;
        __bunCommand__?: string;
    }) => {
        const isNpmCommand =
            __npmCommand__ &&
            __yarnCommand__ &&
            __pnpmCommand__ &&
            __bunCommand__;

        if (isNpmCommand) {
            return (
                <CodeBlockCommand
                    __npmCommand__={__npmCommand__}
                    __yarnCommand__={__yarnCommand__}
                    __pnpmCommand__={__pnpmCommand__}
                    __bunCommand__={__bunCommand__}
                />
            );
        }

        return (
            <div className="">
                <pre
                    className={`overflow-x-auto rounded-b-lg bg-zinc-950! dark:bg-zinc-900! text-wrap dark:border-neutral-800 ${className}`}
                    {...props}
                />
                {__rawString__ && <CopyButton value={__rawString__} />}
            </div>
        );
    },

    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code
            className={cn(
                "px-4 py-5 font-mono text-xs font-normal md:text-sm",
                className,
            )}
            {...props}
        />
    ),

    Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
        <h3
            className={cn(
                "step font-geist text-base font-medium tracking-tight text-neutral-800 dark:text-white [&>p]:font-medium",
                className,
            )}
            {...props}
        />
    ),

    Steps: ({ ...props }) => (
        <div
            className="steps mb-16 ml-4 border-l border-neutral-200 pl-[2.1rem] [counter-reset:step] dark:border-neutral-600"
            {...props}
        />
    ),

    Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
        <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
    ),
    TabsList: ({
        className,
        ...props
    }: React.ComponentProps<typeof TabsList>) => (
        <TabsList
            className={cn(
                "w-full justify-start rounded-none bg-transparent p-0",
                className,
            )}
            {...props}
        />
    ),
    TabsTrigger: ({
        className,
        ...props
    }: React.ComponentProps<typeof TabsTrigger>) => (
        <TabsTrigger
            className={cn(
                "data-[state=active]:bg- font-ins text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-2 pt-2 pb-3 font-medium shadow-none transition-none data-[state=active]:shadow-none dark:font-normal",
                className,
            )}
            {...props}
        />
    ),
    TabsContent: ({
        className,
        ...props
    }: React.ComponentProps<typeof TabsContent>) => (
        <TabsContent
            className={cn(
                "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
                className,
            )}
            {...props}
        />
    ),
};

export function Mdx({ code, className }: MDXProps) {
    const Component = useMDXComponent(code);

    return (
        <article className={`z-50 mx-auto ${className}`}>
            <Component components={components} />
        </article>
    );
}

interface ExtendedPreProps extends HTMLAttributes<HTMLPreElement> {
    __rawString__?: string;
}
