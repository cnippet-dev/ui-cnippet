"use client";

import * as React from "react";
import { getStrictContext } from "@/registry/lib/get-strict-context";
import {
  HoverCardArrow as HoverCardArrowPrimitive,
  type HoverCardArrowProps as HoverCardArrowPropsPrimitive,
  HoverCardContent as HoverCardContentPrimitive,
  type HoverCardContentProps as HoverCardContentPropsPrimitive,
  HoverCardPortal as HoverCardPortalPrimitive,
  type HoverCardPortalProps as HoverCardPortalPropsPrimitive,
  HoverCard as HoverCardPrimitive,
  type HoverCardProps as HoverCardPropsPrimitive,
  HoverCardTrigger as HoverCardTriggerPrimitive,
  type HoverCardTriggerProps as HoverCardTriggerPropsPrimitive,
} from "@/registry/primitives/radix/hover-card";

type PreviewLinkCardContextType = {
  href: string;
  src?: string;
  width?: number;
  height?: number;
};

const [PreviewLinkCardProvider, usePreviewLinkCard] =
  getStrictContext<PreviewLinkCardContextType>("PreviewLinkCardContext");

type PreviewLinkCardProps = HoverCardPropsPrimitive & {
  href: string;
  src?: string;
  width?: number;
  height?: number;
  deviceScaleFactor?: number;
  colorScheme?: "light" | "dark";
};

function PreviewLinkCard({
  href,
  src,
  width = 240,
  height = 135,
  deviceScaleFactor = 1,
  colorScheme = "light",
  ...props
}: PreviewLinkCardProps) {
  const imageSrc =
    src ??
    `https://api.microlink.io/?${buildQueryString({
      colorScheme,
      embed: "screenshot.url",
      meta: false,
      screenshot: true,
      url: href,
      "viewport.deviceScaleFactor": deviceScaleFactor,
      "viewport.height": height * 3,
      "viewport.isMobile": true,
      "viewport.width": width * 3,
    })}`;

  React.useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = imageSrc;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [imageSrc]);

  return (
    <PreviewLinkCardProvider value={{ height, href, src: imageSrc, width }}>
      <HoverCardPrimitive data-slot="preview-link-card" {...props} />
    </PreviewLinkCardProvider>
  );
}

type PreviewLinkCardTriggerProps = HoverCardTriggerPropsPrimitive &
  React.ComponentProps<"a">;

function PreviewLinkCardTrigger({
  asChild,
  children,
  href: hrefProp,
  ...props
}: PreviewLinkCardTriggerProps) {
  const { href } = usePreviewLinkCard();

  return (
    <HoverCardTriggerPrimitive
      asChild
      data-slot="preview-link-card-trigger"
      {...props}
    >
      {asChild ? children : <a href={hrefProp ?? href}>{children}</a>}
    </HoverCardTriggerPrimitive>
  );
}

type PreviewLinkCardPortalProps = HoverCardPortalPropsPrimitive;

function PreviewLinkCardPortal(props: PreviewLinkCardPortalProps) {
  return (
    <HoverCardPortalPrimitive data-slot="preview-link-card-portal" {...props} />
  );
}

function buildQueryString(
  params: Record<string, string | number | boolean | undefined | null>,
) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    sp.append(k, String(v));
  }
  return sp.toString();
}

type PreviewLinkCardContentProps = HoverCardContentPropsPrimitive &
  React.ComponentProps<"a">;

function PreviewLinkCardContent({
  side = "top",
  sideOffset = 10,
  align = "center",
  alignOffset,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  arrowPadding,
  sticky,
  hideWhenDetached,
  transition = { damping: 25, stiffness: 300, type: "spring" },
  asChild,
  children,
  href: hrefProp,
  style,
  ...props
}: PreviewLinkCardContentProps) {
  const { href } = usePreviewLinkCard();

  return (
    <HoverCardContentPrimitive
      align={align}
      alignOffset={alignOffset}
      arrowPadding={arrowPadding}
      asChild={asChild}
      avoidCollisions={avoidCollisions}
      collisionBoundary={collisionBoundary}
      collisionPadding={collisionPadding}
      data-slot="preview-link-card-content"
      hideWhenDetached={hideWhenDetached}
      side={side}
      sideOffset={sideOffset}
      sticky={sticky}
      transition={transition}
      {...(asChild ? { style, ...props } : {})}
    >
      {asChild ? (
        children
      ) : (
        <a
          href={hrefProp ?? href}
          style={{
            display: "block",
            ...style,
          }}
          {...props}
        >
          {children}
        </a>
      )}
    </HoverCardContentPrimitive>
  );
}

type PreviewLinkCardImageProps = Omit<
  React.ComponentProps<"img">,
  "src" | "width" | "height"
>;

function PreviewLinkCardImage({
  alt = "preview image",
  ...props
}: PreviewLinkCardImageProps) {
  const { src, width, height } = usePreviewLinkCard();

  return <img alt={alt} height={height} src={src} width={width} {...props} />;
}

type PreviewLinkCardArrowProps = HoverCardArrowPropsPrimitive;

function PreviewLinkCardArrow(props: PreviewLinkCardArrowProps) {
  return (
    <HoverCardArrowPrimitive data-slot="preview-link-card-arrow" {...props} />
  );
}

export {
  PreviewLinkCard,
  PreviewLinkCardArrow,
  type PreviewLinkCardArrowProps,
  PreviewLinkCardContent,
  type PreviewLinkCardContentProps,
  type PreviewLinkCardContextType,
  PreviewLinkCardImage,
  type PreviewLinkCardImageProps,
  PreviewLinkCardPortal,
  type PreviewLinkCardPortalProps,
  type PreviewLinkCardProps,
  PreviewLinkCardTrigger,
  type PreviewLinkCardTriggerProps,
  usePreviewLinkCard,
};
