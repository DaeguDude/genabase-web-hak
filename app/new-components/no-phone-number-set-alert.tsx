"use client";

import { cn } from "@heroui/react";
import { Icon, Spinner, Text } from "@shopify/polaris";
import { AlertTriangleIcon, ArrowRightIcon } from "@shopify/polaris-icons";
import { useRouter, useSearchParams } from "next/navigation";

export function NoPhoneNumberSetAlert() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  // TODO: In Remix when there's navigation we set it to true
  const isMovingToSettings = false;

  return (
    <div
      className={cn(
        "min-h-[fit-content] h-[fit-content] bg-[rgba(255,184,0,1)] hover:bg-[rgba(255,184,0,0.8)]",
        "relative",
        "cursor-pointer"
      )}
      onClick={() => router.push(`/threads/settings`)}
    >
      <div className="w-full flex justify-center gap-2 p-2">
        <div>
          <Icon source={AlertTriangleIcon} />
        </div>
        <Text variant="bodyMd" as="p" fontWeight="semibold">
          Call or Text Gena Set-Up Required
        </Text>
        <div>
          {isMovingToSettings ? (
            <Spinner size="small" />
          ) : (
            <Icon source={ArrowRightIcon} />
          )}
        </div>
      </div>
    </div>
  );
}
