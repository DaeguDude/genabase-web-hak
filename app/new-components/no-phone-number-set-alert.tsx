"use client";

import { cn } from "@heroui/react";
import { Icon, Spinner, Text } from "@shopify/polaris";
import { AlertTriangleIcon, ArrowRightIcon } from "@shopify/polaris-icons";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function NoPhoneNumberSetAlert() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div
      className={cn(
        "min-h-[fit-content] h-[fit-content] bg-[rgba(255,184,0,1)] hover:bg-[rgba(255,184,0,0.8)]",
        "relative",
        "cursor-pointer"
      )}
      onClick={() => {
        startTransition(() => {
          router.push(`/settings`);
        });
      }}
    >
      <div className="w-full flex justify-center gap-2 p-2">
        <div>
          <Icon source={AlertTriangleIcon} />
        </div>
        <Text variant="bodyMd" as="p" fontWeight="semibold">
          Call or Text Gena Set-Up Required
        </Text>
        <div>
          {isPending ? (
            <Spinner size="small" />
          ) : (
            <Icon source={ArrowRightIcon} />
          )}
        </div>
      </div>
    </div>
  );
}
