"use client";

import * as React from "react";
import { getStrictContext } from "@/registry/lib/get-strict-context";
import {
  PreviewCardArrow as PreviewCardArrowPrimitive,
  type PreviewCardArrowProps as PreviewCardArrowPropsPrimitive,
  PreviewCardBackdrop as PreviewCardBackdropPrimitive,
  type PreviewCardBackdropProps as PreviewCardBackdropPropsPrimitive,
  PreviewCardPopup as PreviewCardPopupPrimitive,
  type PreviewCardPopupProps as PreviewCardPopupPropsPrimitive,
  PreviewCardPortal as PreviewCardPortalPrimitive,
  type PreviewCardPortalProps as PreviewCardPortalPropsPrimitive,
  PreviewCardPositioner as PreviewCardPositionerPrimitive,
  type PreviewCardPositionerProps as PreviewCardPositionerPropsPrimitive,
  PreviewCard as PreviewCardPrimitive,
  type PreviewCardProps as PreviewCardPropsPrimitive,
  PreviewCardTrigger as PreviewCardTriggerPrimitive,
  type PreviewCardTriggerProps as PreviewCardTriggerPropsPrimitive,
} from "@/registry/primitives/base/preview-card";

type PreviewLinkCardContextType = {
  href: string;
  src?: string;
  width?: number;
  height?: number;
};

const [PreviewLinkCardProvider, usePreviewLinkCard] =
  getStrictContext<PreviewLinkCardContextType>("PreviewLinkCardContext");

type PreviewLinkCardProps = PreviewCardPropsPrimitive & {
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
      <PreviewCardPrimitive data-slot="preview-link-card" {...props} />
    </PreviewLinkCardProvider>
  );
}

type PreviewLinkCardTriggerProps = PreviewCardTriggerPropsPrimitive &
  React.ComponentProps<"a">;

function PreviewLinkCardTrigger({
  children,
  href: hrefProp,
  render,
  ...props
}: PreviewLinkCardTriggerProps) {
  const { href } = usePreviewLinkCard();

  return (
    <PreviewCardTriggerPrimitive
      data-slot="preview-link-card-trigger"
      render={render ?? <a href={hrefProp ?? href}>{children}</a>}
      {...props}
    />
  );
}

type PreviewLinkCardPortalProps = PreviewCardPortalPropsPrimitive;

function PreviewLinkCardPortal(props: PreviewLinkCardPortalProps) {
  return (
    <PreviewCardPortalPrimitive
      data-slot="preview-link-card-portal"
      {...props}
    />
  );
}

type PreviewLinkCardPositionerProps = PreviewCardPositionerPropsPrimitive;

function PreviewLinkCardPositioner({
  side = "top",
  sideOffset = 10,
  align = "center",
  ...props
}: PreviewLinkCardPositionerProps) {
  return (
    <PreviewCardPositionerPrimitive
      align={align}
      data-slot="preview-link-card-positioner"
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
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

type PreviewLinkCardPopupProps = PreviewCardPopupPropsPrimitive &
  React.ComponentProps<"a">;

function PreviewLinkCardPopup({
  transition = { damping: 25, stiffness: 300, type: "spring" },
  href: hrefProp,
  style,
  children,
  ...props
}: PreviewLinkCardPopupProps) {
  const { href } = usePreviewLinkCard();

  return (
    <PreviewCardPopupPrimitive
      data-slot="preview-link-card-popup"
      transition={transition}
    >
      <a
        data-slot="preview-link-card-popup-link"
        href={hrefProp ?? href}
        style={{
          display: "block",
          ...style,
        }}
        {...props}
      >
        {children}
      </a>
    </PreviewCardPopupPrimitive>
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

type PreviewLinkCardBackdropProps = PreviewCardBackdropPropsPrimitive;

function PreviewLinkCardBackdrop(props: PreviewLinkCardBackdropProps) {
  return (
    <PreviewCardBackdropPrimitive
      data-slot="preview-link-card-backdrop"
      {...props}
    />
  );
}

type PreviewLinkCardArrowProps = PreviewCardArrowPropsPrimitive;

function PreviewLinkCardArrow(props: PreviewLinkCardArrowProps) {
  return (
    <PreviewCardArrowPrimitive data-slot="preview-link-card-arrow" {...props} />
  );
}

export {
  PreviewLinkCard,
  PreviewLinkCardArrow,
  type PreviewLinkCardArrowProps,
  PreviewLinkCardBackdrop,
  type PreviewLinkCardBackdropProps,
  type PreviewLinkCardContextType,
  PreviewLinkCardImage,
  type PreviewLinkCardImageProps,
  PreviewLinkCardPopup,
  type PreviewLinkCardPopupProps,
  PreviewLinkCardPortal,
  type PreviewLinkCardPortalProps,
  PreviewLinkCardPositioner,
  type PreviewLinkCardPositionerProps,
  type PreviewLinkCardProps,
  PreviewLinkCardTrigger,
  type PreviewLinkCardTriggerProps,
  usePreviewLinkCard,
};
