import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@cnippet/components/page-header";
import { RiArrowLeftLine } from "@remixicon/react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/registry/default/ui/button";

export const metadata: Metadata = {
  description:
    "The page you're looking for doesn't exist or may have been moved.",
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="container w-full">
      <PageHeader>
        <PageHeaderHeading>Page Not Found</PageHeaderHeading>
        <PageHeaderDescription>
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </PageHeaderDescription>
        <div className="mt-4">
          <Button
            className="group"
            render={
              <Link href="/">
                <RiArrowLeftLine
                  aria-hidden="true"
                  className="-ms-1 group-hover:-translate-x-0.5 opacity-60 transition-transform"
                />
                Back to Home
              </Link>
            }
            size="lg"
          />
        </div>
      </PageHeader>
    </div>
  );
}
