import { cn } from "@heroui/react";

export function LandingPageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-[82.5px]", className)}>{children}</div>;
}
