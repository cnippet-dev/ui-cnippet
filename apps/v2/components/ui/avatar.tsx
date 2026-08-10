"use client";

import {
  AvatarFallback as FacehashAvatarFallbackPrimitive,
  AvatarImage as FacehashAvatarImagePrimitive,
  Avatar as FacehashAvatarPrimitive,
  Facehash as FacehashComponent,
} from "facehash";
import type * as React from "react";
import { useEffect, useState } from "react";
import { TooltipOnHover } from "@/components/ui/tooltip";
import { formatTimeAgo } from "@/lib/date";
import { COSSISTANT_FACEHASH_COLOR_CLASSES } from "@/lib/facehash-palette";
import { cn } from "@/lib/utils";

export const PRESENCE_ONLINE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

export const PRESENCE_AWAY_WINDOW_MS = 30 * 60 * 1000; // 30 minutes

export const PRESENCE_PING_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes

function AvatarContainer({
  className,
  ...props
}: React.ComponentProps<typeof FacehashAvatarPrimitive>) {
  return (
    <FacehashAvatarPrimitive
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded",
        className,
      )}
      data-slot="avatar"
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof FacehashAvatarImagePrimitive>) {
  return (
    <FacehashAvatarImagePrimitive
      className={cn("aspect-square size-full", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

interface AvatarFallbackProps
  extends Omit<
    React.ComponentProps<typeof FacehashAvatarFallbackPrimitive>,
    "children" | "facehashProps" | "name"
  > {
  value?: string | null;
  children?: string;
}

function getNonEmptyString(value: string | null | undefined): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : null;
}

function Facehash({
  className,
  name,
  interactive = true,
  onRenderMouth,
}: {
  className?: string;
  name: string;
  interactive?: boolean;
  onRenderMouth?: () => React.ReactNode;
}) {
  return (
    <FacehashComponent
      className={cn(className)}
      colorClasses={COSSISTANT_FACEHASH_COLOR_CLASSES}
      enableBlink
      intensity3d="dramatic"
      interactive={interactive}
      name={name}
      onRenderMouth={onRenderMouth}
      size="100%"
      style={{
        color: "#000000",
      }}
    />
  );
}

function AvatarFallback({
  className,
  style,
  value,
  children,
  ...props
}: AvatarFallbackProps) {
  const facehashName =
    getNonEmptyString(value) ?? getNonEmptyString(children) ?? "avatar";

  return (
    <FacehashAvatarFallbackPrimitive
      className={cn(
        "flex size-full items-center justify-center text-black dark:text-black",
        className,
      )}
      data-slot="avatar-fallback"
      facehashProps={{
        colorClasses: COSSISTANT_FACEHASH_COLOR_CLASSES,
        enableBlink: true,
        intensity3d: "dramatic",
        interactive: false,
      }}
      name={facehashName}
      style={{
        color: "#000000",
        ...style,
      }}
      {...props}
    />
  );
}

type AvatarPresenceStatus = "online" | "away";

function resolveAvatarPresenceStatus({
  lastOnlineAt,
  nowMs,
  status,
}: {
  lastOnlineAt?: string | null;
  nowMs?: number;
  status?: AvatarPresenceStatus;
}): AvatarPresenceStatus | null {
  if (status === "online" || status === "away") {
    return status;
  }

  if (!lastOnlineAt || nowMs === undefined) {
    return null;
  }

  const lastOnlineTime = Date.parse(lastOnlineAt);
  if (Number.isNaN(lastOnlineTime)) {
    return null;
  }

  if (lastOnlineTime >= nowMs - PRESENCE_ONLINE_WINDOW_MS) {
    return "online";
  }

  if (lastOnlineTime >= nowMs - PRESENCE_AWAY_WINDOW_MS) {
    return "away";
  }

  return null;
}

function getDefaultTooltipContent({
  allowRelativeTime,
  fallbackName,
  lastOnlineDate,
  presenceStatus,
}: {
  allowRelativeTime: boolean;
  fallbackName: string;
  lastOnlineDate: Date | null;
  presenceStatus: AvatarPresenceStatus | null;
}): string | null {
  if (!lastOnlineDate) {
    return null;
  }

  const awayWindowMinutes = Math.round(PRESENCE_AWAY_WINDOW_MS / 60_000);

  if (presenceStatus === "online") {
    return `${fallbackName} is online`;
  }

  if (presenceStatus === "away") {
    return `${fallbackName} last seen less than ${awayWindowMinutes} minutes ago`;
  }

  if (!allowRelativeTime) {
    return null;
  }

  return `${fallbackName} last seen ${formatTimeAgo(lastOnlineDate)}`;
}

function Avatar({
  className,
  url,
  fallbackName,
  facehashSeed,
  lastOnlineAt,
  status,
  tooltipContent,
}: {
  className?: string;
  url: string | null | undefined;
  fallbackName: string;
  facehashSeed?: string;
  lastOnlineAt?: string | null;
  status?: "online" | "away";
  tooltipContent?: React.ReactNode | null;
}) {
  const [hasHydrated, setHasHydrated] = useState(false);
  const lastOnlineTime = lastOnlineAt ? Date.parse(lastOnlineAt) : Number.NaN;
  const lastOnlineDate = Number.isNaN(lastOnlineTime)
    ? null
    : new Date(lastOnlineTime);
  const hasExplicitStatus = status === "online" || status === "away";

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const computedStatus = resolveAvatarPresenceStatus({
    lastOnlineAt,
    nowMs: hasHydrated ? Date.now() : undefined,
    status,
  });
  const isOnline = computedStatus === "online";
  const isAway = computedStatus === "away";
  const defaultTooltipContent = getDefaultTooltipContent({
    allowRelativeTime: hasHydrated || hasExplicitStatus,
    fallbackName,
    lastOnlineDate,
    presenceStatus: computedStatus,
  });
  const resolvedTooltipContent =
    tooltipContent === undefined ? defaultTooltipContent : tooltipContent;

  return (
    <TooltipOnHover content={resolvedTooltipContent}>
      <div className="relative inline-flex w-fit" data-slot="avatar-wrapper">
        <AvatarContainer
          className={cn(
            "size-8 shrink-0 ring-1 ring-border ring-offset-1 ring-offset-background",
            className,
          )}
        >
          {url && <AvatarImage alt={fallbackName} src={url} />}
          <AvatarFallback
            className="pointer-events-none"
            value={facehashSeed ?? fallbackName}
          >
            {fallbackName}
          </AvatarFallback>
        </AvatarContainer>
        {(isOnline || isAway) && (
          <div
            className={cn(
              "absolute -right-1 bottom-0.5 hidden size-1.25 rounded-full ring-2 ring-background",
              {
                "block bg-cossistant-green": isOnline,
                "block bg-cossistant-orange": isAway,
              },
            )}
            data-slot="avatar-presence"
          />
        )}
      </div>
    </TooltipOnHover>
  );
}

export { Avatar, AvatarContainer, AvatarFallback, AvatarImage, Facehash };
