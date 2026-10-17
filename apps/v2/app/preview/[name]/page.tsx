import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OverlayFrame } from "@/components/explore/overlay-frame";
import { OVERLAY_CATEGORIES } from "@/lib/overlay-preview";
import { variants } from "@/registry/registry-variants";

// Embedded by Explore cards only; never a page of its own.
export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: "Preview",
};

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const category = variants.find((v) => v.name === name)?.categories?.[0];
  const mode = category ? OVERLAY_CATEGORIES[category] : undefined;
  if (!mode) notFound();

  return <OverlayFrame mode={mode} name={name} />;
}
