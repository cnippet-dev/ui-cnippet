import { cn } from "@workspace/ui/lib/utils";
import {
  PreviewCardBackdrop as PreviewCardBackdropPrimitive,
  type PreviewCardBackdropProps as PreviewCardBackdropPrimitiveProps,
  PreviewCardPopup as PreviewCardPopupPrimitive,
  type PreviewCardPopupProps as PreviewCardPopupPrimitiveProps,
  PreviewCardPortal as PreviewCardPortalPrimitive,
  PreviewCardPositioner as PreviewCardPositionerPrimitive,
  type PreviewCardPositionerProps as PreviewCardPositionerPrimitiveProps,
  PreviewCard as PreviewCardPrimitive,
  type PreviewCardProps as PreviewCardPrimitiveProps,
  PreviewCardTrigger as PreviewCardTriggerPrimitive,
  type PreviewCardTriggerProps as PreviewCardTriggerPrimitiveProps,
} from "@/registry/primitives/base/preview-card";

type PreviewCardProps = PreviewCardPrimitiveProps;

function PreviewCard(props: PreviewCardProps) {
  return <PreviewCardPrimitive {...props} />;
}

type PreviewCardTriggerProps = PreviewCardTriggerPrimitiveProps;

function PreviewCardTrigger(props: PreviewCardTriggerProps) {
  return <PreviewCardTriggerPrimitive {...props} />;
}

type PreviewCardPanelProps = PreviewCardPositionerPrimitiveProps &
  PreviewCardPopupPrimitiveProps;

function PreviewCardPanel({
  className,
  align = "center",
  sideOffset = 4,
  style,
  children,
  ...props
}: PreviewCardPanelProps) {
  return (
    <PreviewCardPortalPrimitive>
      <PreviewCardPositionerPrimitive
        align={align}
        className="z-50"
        sideOffset={sideOffset}
        {...props}
      >
        <PreviewCardPopupPrimitive
          className={cn(
            "w-64 origin-(--transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden",
            className,
          )}
          style={style}
        >
          {children}
        </PreviewCardPopupPrimitive>
      </PreviewCardPositionerPrimitive>
    </PreviewCardPortalPrimitive>
  );
}

type PreviewCardBackdropProps = PreviewCardBackdropPrimitiveProps;

function PreviewCardBackdrop(props: PreviewCardBackdropProps) {
  return <PreviewCardBackdropPrimitive {...props} />;
}

export {
  PreviewCard,
  PreviewCardBackdrop,
  type PreviewCardBackdropProps,
  PreviewCardPanel,
  type PreviewCardPanelProps,
  type PreviewCardProps,
  PreviewCardTrigger,
  type PreviewCardTriggerProps,
};
