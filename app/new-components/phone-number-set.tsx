"use client";
import { Banner, BlockStack, Box, List, Popover, Text } from "@shopify/polaris";

import { type TShop } from "app/type";
import { Phone } from "lucide-react";

import { useState } from "react";

export function PhoneNumberSet({ shopInfo }: { shopInfo: TShop }) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = () => setPopoverActive(!popoverActive);

  const activator = (
    <div
      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-md"
      onClick={togglePopoverActive}
    >
      <Phone className="w-5 h-5 text-[rgba(1,75,64,1)]" />
      <p
        style={{
          fontSize: 14,
          fontWeight: 600,
        }}
        className="text-[rgba(1,75,64,1)]"
      >
        Call or Text: {shopInfo?.cs_agent.phone_number}
      </p>
    </div>
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
      preferredAlignment="left"
    >
      <Popover.Pane>
        <Box>
          <div>
            <Box padding="400">
              <HasPhoneNumberBanner />
            </Box>
          </div>
        </Box>
      </Popover.Pane>
    </Popover>
  );
}

function HasPhoneNumberBanner() {
  return (
    <BlockStack gap="400">
      <Text variant="headingMd" as="h2">
        Phone Number
      </Text>
      <Banner title="Call or Text Your Personal Agent" tone="success">
        <List>
          <List.Item>
            Your dedicated agent is ready to help. Call or Text your agent now
            to get real-time information and insights about your shop.
          </List.Item>
        </List>
      </Banner>
    </BlockStack>
  );
}
