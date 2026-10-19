// title: Average rating with star breakdown bars
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/registry/default/ui/progress";
import { RatingDisplay } from "@/registry/default/ui/rating";

const COUNTS = [
  { count: 812, stars: 5 },
  { count: 264, stars: 4 },
  { count: 71, stars: 3 },
  { count: 22, stars: 2 },
  { count: 31, stars: 1 },
];
const TOTAL = COUNTS.reduce((sum, row) => sum + row.count, 0);
const AVERAGE =
  COUNTS.reduce((sum, row) => sum + row.stars * row.count, 0) / TOTAL;

export default function Particle() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border p-5">
      <div className="flex items-end gap-3">
        <span className="font-semibold text-4xl tabular-nums leading-none">
          {AVERAGE.toFixed(1)}
        </span>
        <div className="flex flex-col gap-1">
          <RatingDisplay value={Math.round(AVERAGE * 10) / 10} />
          <span className="text-muted-foreground text-xs">
            {TOTAL.toLocaleString("en-US")} reviews
          </span>
        </div>
      </div>
      <ul className="flex flex-col gap-1.5">
        {COUNTS.map((row) => (
          <li
            className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-2 text-xs"
            key={row.stars}
          >
            <span className="text-muted-foreground">{row.stars} star</span>
            <Progress
              aria-label={`${row.stars} star reviews`}
              value={(row.count / TOTAL) * 100}
            >
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <span className="text-end text-muted-foreground tabular-nums">
              {Math.round((row.count / TOTAL) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
