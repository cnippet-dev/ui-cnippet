// title: Dismissible promo and maintenance banners above a page
"use client";

import { ArrowRightIcon, SparklesIcon, WrenchIcon } from "lucide-react";
import { useState } from "react";
import {
  Banner,
  BannerAction,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerTitle,
} from "@/registry/default/ui/banner";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  const [promo, setPromo] = useState(true);
  const [maintenance, setMaintenance] = useState(true);

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl border">
      {promo && (
        <Banner variant="primary">
          <SparklesIcon aria-hidden="true" />
          <BannerContent>
            <BannerTitle>Launch week: 30% off annual plans</BannerTitle>
            <BannerDescription className="max-sm:hidden">
              Ends Friday, Oct 23.
            </BannerDescription>
          </BannerContent>
          <BannerAction>
            <Button
              className="border-primary-foreground/24 bg-primary-foreground/12 text-primary-foreground hover:bg-primary-foreground/20"
              size="sm"
              variant="outline"
            >
              Upgrade <ArrowRightIcon aria-hidden="true" />
            </Button>
          </BannerAction>
          <BannerClose onClick={() => setPromo(false)} />
        </Banner>
      )}
      {maintenance && (
        <Banner variant="warning">
          <WrenchIcon aria-hidden="true" />
          <BannerContent>
            <BannerTitle>Scheduled maintenance</BannerTitle>
            <BannerDescription>
              Sun, Oct 25 · 02:00–03:00 UTC. Deploys will be paused.
            </BannerDescription>
          </BannerContent>
          <BannerClose onClick={() => setMaintenance(false)} />
        </Banner>
      )}
      <div className="flex min-h-40 flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="font-medium text-sm">Dashboard</p>
        <p className="text-muted-foreground text-sm">
          {promo || maintenance
            ? "Banners sit above the page and close for this visit."
            : "All banners dismissed."}
        </p>
        {!(promo && maintenance) && (
          <Button
            onClick={() => {
              setPromo(true);
              setMaintenance(true);
            }}
            size="sm"
            variant="outline"
          >
            Show banners again
          </Button>
        )}
      </div>
    </div>
  );
}
