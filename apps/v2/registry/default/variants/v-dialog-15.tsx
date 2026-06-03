"use client";

import { StarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";
import { Textarea } from "@/registry/default/ui/textarea";

const ASPECTS = ["Ease of use", "Performance", "Design", "Support"];

export default function Particle() {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [hover, setHover] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const allRated = ASPECTS.every((a) => ratings[a]);

  if (submitted) {
    return (
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          <StarIcon className="size-4" />
          Leave feedback
        </DialogTrigger>
        <DialogPopup className="sm:max-w-sm">
          <DialogPanel className="space-y-3 py-8 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <StarIcon className="size-7 fill-amber-400 text-amber-400" />
            </div>
            <DialogTitle>Thank you!</DialogTitle>
            <DialogDescription>
              Your feedback helps us improve the product for everyone.
            </DialogDescription>
          </DialogPanel>
          <DialogFooter>
            <DialogClose render={<Button className="w-full" />}>
              Close
            </DialogClose>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        <StarIcon className="size-4" />
        Leave feedback
      </DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Rate your experience</DialogTitle>
          <DialogDescription>
            How are we doing? Rate each aspect and leave a comment.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="space-y-4">
          {ASPECTS.map((aspect) => (
            <div className="flex items-center justify-between" key={aspect}>
              <span className="text-sm">{aspect}</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    className="p-0.5"
                    key={star}
                    onClick={() =>
                      setRatings((p) => ({ ...p, [aspect]: star }))
                    }
                    onMouseEnter={() =>
                      setHover((p) => ({ ...p, [aspect]: star }))
                    }
                    onMouseLeave={() =>
                      setHover((p) => ({ ...p, [aspect]: 0 }))
                    }
                    type="button"
                  >
                    <StarIcon
                      className={`size-5 transition-colors ${
                        star <= (hover[aspect] ?? ratings[aspect] ?? 0)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
          <Textarea
            onChange={(e) => setComment(e.target.value)}
            placeholder="Any additional comments? (optional)"
            rows={3}
            value={comment}
          />
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Skip</DialogClose>
          <Button disabled={!allRated} onClick={() => setSubmitted(true)}>
            Submit feedback
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
