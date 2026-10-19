// title: Product review form with star rating
"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Label } from "@/registry/default/ui/label";
import { Rating } from "@/registry/default/ui/rating";
import { Textarea } from "@/registry/default/ui/textarea";

const LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

export default function Particle() {
  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex w-full max-w-sm flex-col items-center gap-2 rounded-xl border p-6 text-center">
        <p className="font-medium text-sm">Thanks for your review</p>
        <p className="text-muted-foreground text-sm">
          You rated the Aero Wireless Headphones {rating} out of 5.
        </p>
        <Button
          className="mt-2"
          onClick={() => {
            setRating(0);
            setSent(false);
          }}
          size="sm"
          variant="outline"
        >
          Edit review
        </Button>
      </div>
    );
  }

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4 rounded-xl border p-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <p className="font-medium text-sm">Rate your purchase</p>
        <p className="text-muted-foreground text-xs">
          Aero Wireless Headphones · delivered Oct 14
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Rating
          aria-label="Your rating"
          onValueChange={setRating}
          size="lg"
          value={rating}
        />
        <span className="text-muted-foreground text-sm">
          {LABELS[rating] || "Tap a star"}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="review-body">Your review (optional)</Label>
        <Textarea
          id="review-body"
          placeholder="Battery life, comfort, sound…"
          rows={3}
        />
      </div>
      <Button disabled={!rating} type="submit">
        Post review
      </Button>
    </form>
  );
}
