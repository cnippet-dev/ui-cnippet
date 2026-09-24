/**
 * Two hairlines running the full height of the canvas at the container's
 * outer edges. Every <Rule /> node sits exactly on one of them, so the page
 * reads as a ruled sheet. Hidden below xl, where the container meets the
 * canvas edge anyway.
 */
export function EdgeLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden xl:block"
    >
      <div className="mx-auto h-full max-w-(--container) border-x" />
    </div>
  );
}
