// text-base my-auto mx-auto [--thread-content-margin:--spacing(4)] @[37rem]:[--thread-content-margin:--spacing(6)] @[72rem]:[--thread-content-margin:--spacing(16)] px-(--thread-content-margin)
// --thread-content-margin:--spacing(4) = 16px
// At 592px = --thread-content-margin:--spacing(6) = 24px
// At 1152px = --thread-content-margin:--spacing(16) = 64px
// px-(--thread-content-margin) =

import { cn } from "@heroui/react";

// [--thread-content-max-width:32rem] @[34rem]:[--thread-content-max-width:40rem] @[64rem]:[--thread-content-max-width:48rem] mx-auto max-w-(--thread-content-max-width) flex-1 group/turn-messages focus-visible:outline-hidden relative flex w-full min-w-0 flex-col agent-turn
// --thread-content-max-width:32rem = 512px

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full",
        "[--thread-content-margin:--spacing(4)] md:[--thread-content-margin:--spacing(6)] lg:[--thread-content-margin:--spacing(16)] px-(--thread-content-margin)",
        className,
      )}
    >
      {children}
    </div>
  );
}
