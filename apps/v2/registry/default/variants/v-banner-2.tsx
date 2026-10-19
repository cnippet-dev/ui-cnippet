// title: Banner tones: default, info, success, warning, error
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  MegaphoneIcon,
  TriangleAlertIcon,
} from "lucide-react";
import {
  Banner,
  BannerContent,
  BannerDescription,
  BannerTitle,
} from "@/registry/default/ui/banner";

export default function Particle() {
  return (
    <div className="flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border [&>*:last-child]:border-b-0">
      <Banner>
        <MegaphoneIcon aria-hidden="true" />
        <BannerContent>
          <BannerTitle>New in v4.2</BannerTitle>
          <BannerDescription>Saved views for every table.</BannerDescription>
        </BannerContent>
      </Banner>
      <Banner variant="info">
        <InfoIcon aria-hidden="true" />
        <BannerContent>
          <BannerTitle>You're viewing a shared workspace</BannerTitle>
          <BannerDescription>
            Changes are visible to 12 people.
          </BannerDescription>
        </BannerContent>
      </Banner>
      <Banner variant="success">
        <CircleCheckIcon aria-hidden="true" />
        <BannerContent>
          <BannerTitle>All systems operational</BannerTitle>
          <BannerDescription>Last incident 41 days ago.</BannerDescription>
        </BannerContent>
      </Banner>
      <Banner variant="warning">
        <TriangleAlertIcon aria-hidden="true" />
        <BannerContent>
          <BannerTitle>Your trial ends in 3 days</BannerTitle>
          <BannerDescription>
            Add a card to keep your projects.
          </BannerDescription>
        </BannerContent>
      </Banner>
      <Banner variant="error">
        <CircleAlertIcon aria-hidden="true" />
        <BannerContent>
          <BannerTitle>Payment failed</BannerTitle>
          <BannerDescription>We'll retry on Oct 21.</BannerDescription>
        </BannerContent>
      </Banner>
    </div>
  );
}
