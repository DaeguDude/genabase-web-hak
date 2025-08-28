"use client";

import { cn } from "@heroui/react";
import { BlockStack, Box, Button, Icon, Popover, Text } from "@shopify/polaris";

import { useEffect, useState } from "react";
import { PhoneNumberSet } from "./phone-number-set";
import { ExternalRedirectAnchor } from "./external-redirect-anchor";
import { ExternalIcon } from "@shopify/polaris-icons";
import { NoPhoneNumberSetAlert } from "./no-phone-number-set-alert";
import { useShopInfo } from "../hooks";
import { useRouter } from "next/navigation";
import { useSessionStorage } from "../hooks/use-session-storage";
import { useIsScrolled } from "../hooks/use-is-scrolled";

// FIX: This isn't really a react way to handle it(250828, sh)
// And not exactly know why but it does not work time to time
function useDetectScrollOnChatArea() {
  const [chatAreaNode, setChatAreaNode] = useState<HTMLElement | null>(null);
  const scrolled = useIsScrolled(chatAreaNode);
  useEffect(() => {
    const chatArea = document.getElementById("chat-area");
    setChatAreaNode(chatArea);
  }, []);

  return scrolled;
}

// TODO: When scrolled down, border-bottom should be shown
export function Header() {
  const shopInfo = useShopInfo();
  const [sessionId] = useSessionStorage("session_id", "");
  const router = useRouter();
  const hasPhoneNumber = shopInfo?.phone_number;
  const [popoverActive, setPopoverActive] = useState(false);
  const scrolled = useDetectScrollOnChatArea();

  const togglePopoverActive = () => setPopoverActive(!popoverActive);

  const activator = (
    <Button onClick={togglePopoverActive} disclosure variant="tertiary">
      Gena
    </Button>
  );

  return (
    <>
      {!hasPhoneNumber && <NoPhoneNumberSetAlert />}
      <header
        className={cn(
          "min-h-[52px] h-[52px] p-2 flex justify-between bg-[#fffffff2]",
          "relative",
          scrolled && "border-b border-[rgba(13,13,13,0.05)]"
        )}
      >
        <div className="flex items-center">
          <Popover
            active={popoverActive}
            activator={activator}
            onClose={togglePopoverActive}
            preferredAlignment="left"
          >
            <Popover.Pane>
              <Box padding="200">
                <BlockStack gap="200">
                  <Box paddingInlineStart="100">
                    <Text variant="headingSm" as="h3">
                      Products
                    </Text>
                  </Box>
                  <ExternalRedirectAnchor
                    href="https://apps.shopify.com/heygena"
                    className="p-2 rounded-lg hover:bg-gray-100 flex gap-1"
                  >
                    <Icon source={ExternalIcon} />
                    <div className="grow">HeyGena</div>
                  </ExternalRedirectAnchor>
                  <ExternalRedirectAnchor
                    href="https://apps.shopify.com/heygena"
                    className="p-2 rounded-lg hover:bg-gray-100 flex gap-1"
                  >
                    <Icon source={ExternalIcon} />
                    <div className="grow">GenaBanana</div>
                  </ExternalRedirectAnchor>
                </BlockStack>
              </Box>
            </Popover.Pane>
          </Popover>
        </div>
        <div className="flex items-center">
          {/* TODO: hydration fails, fix(250828, sh) */}
          {sessionId ? (
            <div className="text-sm text-gray-500">session ✅</div>
          ) : (
            <div className="text-sm text-gray-500">session not set ❌</div>
          )}
          <button
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
            onClick={() => {
              router.push("/session");
            }}
          >
            Go to Session
          </button>
        </div>
        {hasPhoneNumber && (
          <div className="flex items-center">
            <PhoneNumberSet shopInfo={shopInfo} />
          </div>
        )}
      </header>
    </>
  );
}
