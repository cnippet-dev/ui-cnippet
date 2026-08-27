"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

/**
 * Next drops prefetched static payloads from its client cache after about five
 * minutes (`staleTimes.static`), so a link warmed before that is cold again.
 */
const STALE_AFTER_MS = 5 * 60 * 1000;

/**
 * Drop-in replacement for `next/link` that prefetches on intent instead of on
 * viewport entry.
 *
 * The default viewport prefetch pulls the full RSC payload for every link that
 * scrolls into view. On the docs pages the sidebar alone renders ~60 links, so
 * a single page view fanned out into ~20 payload fetches averaging 183 KB
 * (up to 953 KB) — all of them billed reads against the ISR cache, for pages
 * the visitor never opened.
 *
 * Prefetching is driven with `router.prefetch` rather than by flipping
 * `prefetch` back to `null` on hover: `<Link>` wires up its prefetch observer
 * on mount, so a link already sitting in the viewport never sees another
 * intersection event and the restored default never fires. Focus and touch
 * count as intent alongside hover, so keyboard and touch users get the same
 * instant navigation that mouse users do.
 */
export function PrefetchLink({
  href,
  onFocus,
  onMouseEnter,
  onTouchStart,
  ...props
}: React.ComponentProps<typeof Link>) {
  const router = useRouter();
  const warmedAt = useRef(0);

  const warm = useCallback(() => {
    // Only internal routes are prefetchable.
    if (typeof href !== "string" || !href.startsWith("/")) return;
    const now = Date.now();
    if (now - warmedAt.current < STALE_AFTER_MS) return;
    warmedAt.current = now;
    router.prefetch(href);
  }, [href, router]);

  return (
    <Link
      href={href}
      onFocus={(event) => {
        warm();
        onFocus?.(event);
      }}
      onMouseEnter={(event) => {
        warm();
        onMouseEnter?.(event);
      }}
      onTouchStart={(event) => {
        warm();
        onTouchStart?.(event);
      }}
      prefetch={false}
      {...props}
    />
  );
}
