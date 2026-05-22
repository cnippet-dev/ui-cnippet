import { cn } from "@workspace/ui/lib/utils";
import {
  ProgressIndicator as ProgressIndicatorPrimitive,
  ProgressLabel as ProgressLabelPrimitive,
  type ProgressLabelProps as ProgressLabelPrimitiveProps,
  Progress as ProgressPrimitive,
  type ProgressProps as ProgressPrimitiveProps,
  ProgressTrack as ProgressTrackPrimitive,
  type ProgressTrackProps as ProgressTrackPrimitiveProps,
  ProgressValue as ProgressValuePrimitive,
  type ProgressValueProps as ProgressValuePrimitiveProps,
} from "@/registry/primitives/base/progress";

type ProgressProps = ProgressPrimitiveProps;

function Progress(props: ProgressProps) {
  return <ProgressPrimitive {...props} />;
}

type ProgressTrackProps = ProgressTrackPrimitiveProps;

function ProgressTrack({ className, ...props }: ProgressTrackProps) {
  return (
    <ProgressTrackPrimitive
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        className,
      )}
      {...props}
    >
      <ProgressIndicatorPrimitive className="h-full w-full flex-1 rounded-full bg-primary" />
    </ProgressTrackPrimitive>
  );
}

type ProgressLabelProps = ProgressLabelPrimitiveProps;

function ProgressLabel(props: ProgressLabelProps) {
  return <ProgressLabelPrimitive className="font-medium text-sm" {...props} />;
}

type ProgressValueProps = ProgressValuePrimitiveProps;

function ProgressValue(props: ProgressValueProps) {
  return <ProgressValuePrimitive className="text-sm" {...props} />;
}

export {
  Progress,
  ProgressLabel,
  type ProgressLabelProps,
  type ProgressProps,
  ProgressTrack,
  type ProgressTrackProps,
  ProgressValue,
  type ProgressValueProps,
};
