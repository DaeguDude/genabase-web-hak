"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Page,
  Card,
  Text,
  Button,
  Spinner,
  InlineStack,
  Toast,
  Box,
  BlockStack,
  InlineGrid,
  ButtonGroup,
  Banner,
  Frame,
} from "@shopify/polaris";
import { updatePhoneNumber, deletePhoneNumber } from "../api/new-api";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import { CopyButton } from "../components";
import { ADMIN_NUMBER } from "../constants";
import { getShopInfo } from "../api/new-api";
import { useSessionStorage } from "../hooks/use-session-storage";
import { TShop } from "../type";
import "../globals.css";

export default function SettingsPage() {
  // TODO: replace with useQuery
  const [shopInfo, setShopInfo] = useState<TShop | null>(null);
  const [session_id] = useSessionStorage("session_id", "");

  const [phone, setPhone] = useState<string | undefined>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toastActive, setToastActive] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const fetchShopInfo = useCallback(async () => {
    setLoading(true);
    try {
      if (!session_id) return;

      const info = await getShopInfo(session_id);
      setShopInfo(info);
      setPhone(info?.phone_number || "");
      setLoading(false);
    } catch {
      setError("Failed to fetch shop info.");
      setLoading(false);
    }
  }, [session_id]);

  useEffect(() => {
    fetchShopInfo();
  }, [fetchShopInfo]);

  const handleSave = async () => {
    if (!phone || !isValidPhoneNumber(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (!session_id) return;

      await updatePhoneNumber(phone, session_id);
      setToastMsg(
        "Phone number updated. You can now call or text your personal agent."
      );
      setToastActive(true);
      await fetchShopInfo();
      setIsEditingPhone(false);
    } catch {
      setError("Failed to update phone number.");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    setSaving(true);
    setError("");
    try {
      if (!session_id) return;
      await deletePhoneNumber(session_id);
      setPhone("");
      setToastMsg("Phone number deleted");
      setToastActive(true);
      await fetchShopInfo();
      setIsEditingPhone(false);
    } catch {
      setError("Failed to delete phone number.");
    }
    setSaving(false);
  };

  const handleToastDismiss = useCallback(() => setToastActive(false), []);

  const handleCancelPhoneEdit = () => {
    setPhone(shopInfo?.phone_number || "");
    setIsEditingPhone(false);
    setError("");
  };

  return (
    <Frame>
      <Page title="Settings">
        <BlockStack gap="200">
          <Card>
            <Text variant="headingMd" as="h2">
              App Settings
            </Text>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Spinner size="large" />
              </div>
            ) : (
              <Box paddingBlockStart="400">
                <BlockStack gap="400">
                  <BlockStack gap="200">
                    <Text as="h2" variant="headingSm">
                      Your Email
                    </Text>
                    <Text as="p" variant="bodyMd">
                      {shopInfo?.email || ""}
                    </Text>
                  </BlockStack>

                  <BlockStack gap="200">
                    <InlineGrid columns="1fr auto">
                      <Text as="h2" variant="headingSm">
                        Your Phone Number
                      </Text>
                      {!isEditingPhone && (
                        <ButtonGroup>
                          {phone && (
                            <Button
                              icon={DeleteIcon}
                              variant="tertiary"
                              tone="critical"
                              loading={saving}
                              disabled={saving}
                              onClick={handleDelete}
                              accessibilityLabel="Delete"
                            />
                          )}

                          <Button
                            icon={EditIcon}
                            variant="tertiary"
                            onClick={() => setIsEditingPhone(true)}
                            accessibilityLabel="Edit"
                          />
                        </ButtonGroup>
                      )}
                    </InlineGrid>
                    {isEditingPhone ? (
                      <InlineGrid columns="1fr auto">
                        <InlineStack>
                          <PhoneInput
                            international
                            defaultCountry="US"
                            value={phone}
                            onChange={setPhone}
                            disabled={saving}
                            className="Polaris-TextField__Input"
                            placeholder={shopInfo?.phone_number || ""}
                          />
                        </InlineStack>
                        <InlineStack gap="200">
                          <Button
                            onClick={handleSave}
                            loading={saving}
                            disabled={
                              saving || phone === (shopInfo?.phone_number || "")
                            }
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleCancelPhoneEdit}
                            disabled={saving}
                          >
                            Cancel
                          </Button>
                        </InlineStack>
                      </InlineGrid>
                    ) : (
                      <BlockStack gap="400">
                        {shopInfo?.phone_number ? (
                          <>
                            <Text as="p" variant="bodyMd">
                              {shopInfo?.phone_number}
                            </Text>
                            <Banner
                              title="Call or Text Your Personal Agent"
                              tone="success"
                            >
                              Your dedicated agent is ready to help. Call or
                              Text your agent now to get real-time information
                              and insights about your shop.
                            </Banner>
                          </>
                        ) : (
                          <>
                            <Text as="p" variant="bodyMd">
                              No phone number set
                            </Text>
                            <Banner
                              title="Phone Number Required"
                              tone="warning"
                            >
                              To access our personalized phone service, please
                              register your phone number. You will receive a
                              dedicated agent number for all your inquiries.
                            </Banner>
                          </>
                        )}
                      </BlockStack>
                    )}
                  </BlockStack>

                  {error && (
                    <Text as="p" tone="critical">
                      {error}
                    </Text>
                  )}
                </BlockStack>
              </Box>
            )}
          </Card>
          <Card>
            <BlockStack gap="200">
              <Text variant="headingMd" as="h2">
                Personal AI Agent
              </Text>
              {shopInfo?.phone_number ? (
                <>
                  <Text as="p">
                    You can call or text your personal AI agent with this
                    number:
                  </Text>
                  <InlineStack gap="200" blockAlign="center">
                    <Text as="p" variant="bodyMd" alignment="center">
                      {ADMIN_NUMBER}
                    </Text>

                    <CopyButton toCopy={ADMIN_NUMBER} />
                  </InlineStack>
                </>
              ) : (
                <Text as="p" tone="critical">
                  please enter your phone number to call or text your personal
                  AI agent.
                </Text>
              )}
            </BlockStack>
          </Card>
        </BlockStack>

        {/* <Card >
          <Text variant="headingMd" as="h2">Customer Service Agent</Text>
          {shopInfo?.cs_agent ? (
            <>
              <Text as="p">Your customer service agent details:</Text>
              <InlineStack gap="400" direction="column" align="start">
                <InlineStack gap="400" direction="column" align="start">
                  <Text as="p" variant="headingSm">Name:</Text>
                  {isEditingAgentName ? (
                    <InlineStack gap="400" align="start">
                      <div style={{ minWidth: 250 }}>
                        <TextField
                          label=""
                          value={csAgentName}
                          onChange={setCsAgentName}
                          disabled={csAgentNameSaving}
                          autoComplete="off"
                          placeholder="Enter agent name"
                        />
                      </div>
                      <Button onClick={handleSaveCSAgentName} loading={csAgentNameSaving} primary disabled={csAgentNameSaving || csAgentName === (shopInfo?.cs_agent?.name || "")}>Save</Button>
                      <Button onClick={handleCancelEdit} disabled={csAgentNameSaving}>Cancel</Button>
                    </InlineStack>
                  ) : (
                    <InlineStack gap="400" align="center">
                      <Text as="p" variant="headingLg" fontWeight="bold">{shopInfo.cs_agent.name || "No name set"}</Text>
                      <Button onClick={() => setIsEditingAgentName(true)}>Edit</Button>
                    </InlineStack>
                  )}
                </InlineStack>
                <InlineStack gap="400" align="center">
                  <Text as="p" variant="headingSm">Phone:</Text>
                  <Text as="p" variant="headingLg" fontWeight="bold">{shopInfo.cs_agent.phone_number}</Text>
                  <CopyButton toCopy={shopInfo.cs_agent.phone_number} />
                </InlineStack>
              </InlineStack>
            </>
          ) : (
            <Text as="p" color="critical">No customer service agent information available</Text>
          )}
        </Card>
        
        <Card >
          <Text variant="headingMd" as="h2">AI Redirect Contact Information</Text>
          <Text as="p" variant="bodyMd" color="subdued">
            Configure how the AI can redirect customers to you when it can't answer their questions.
          </Text>
          {shopInfo?.cs_agent ? (
            <>
              {isEditingContactInfo ? (
                <InlineStack gap="400" direction="column" align="start">
                  <div style={{ minWidth: 300 }}>
                    <Text as="p" variant="headingSm">Contact Phone Number:</Text>
                    <PhoneInput
                      international
                      defaultCountry="US"
                      value={csAgentContactPhone}
                      onChange={setCsAgentContactPhone}
                      disabled={csAgentContactSaving}
                      className="Polaris-TextField__Input"
                      placeholder="Enter contact phone number"
                    />
                  </div>
                  <div style={{ minWidth: 300 }}>
                    <Text as="p" variant="headingSm">Contact Email:</Text>
                    <TextField
                      label=""
                      value={csAgentContactEmail}
                      onChange={setCsAgentContactEmail}
                      disabled={csAgentContactSaving}
                      autoComplete="off"
                      placeholder="Enter contact email"
                      type="email"
                    />
                  </div>
                  <div style={{ minWidth: 300 }}>
                    <Text as="p" variant="headingSm">Contact Preference:</Text>
                    <Select
                      label="Contact Preference"
                      options={[
                        { label: "Phone", value: "phone" },
                        { label: "Email", value: "email" },
                        { label: "Both", value: "both" },
                        { label: "None", value: "none" },
                      ]}
                      value={csAgentContactPreference}
                      onChange={setCsAgentContactPreference}
                      disabled={csAgentContactSaving}
                    />
                  </div>
                  <InlineStack gap="400" align="start">
                    <Button onClick={handleSaveContactInfo} loading={csAgentContactSaving} primary disabled={csAgentContactSaving}>Save</Button>
                    <Button onClick={handleCancelContactEdit} disabled={csAgentContactSaving}>Cancel</Button>
                  </InlineStack>
                </InlineStack>
              ) : (
                <InlineStack gap="400" direction="column" align="start">
                  <InlineStack gap="400" align="center">
                    <Text as="p" variant="headingSm">Contact Phone:</Text>
                    <Text as="p" variant="headingLg" fontWeight="bold">{shopInfo.cs_agent.contact_phone_number || "Not set"}</Text>
                    {shopInfo.cs_agent.contact_phone_number && <CopyButton toCopy={shopInfo.cs_agent.contact_phone_number} />}
                  </InlineStack>
                  <InlineStack gap="400" align="center">
                    <Text as="p" variant="headingSm">Contact Email:</Text>
                    <Text as="p" variant="headingLg" fontWeight="bold">{shopInfo.cs_agent.contact_email || "Not set"}</Text>
                    {shopInfo.cs_agent.contact_email && <CopyButton toCopy={shopInfo.cs_agent.contact_email} />}
                  </InlineStack>
                  <InlineStack gap="400" align="center">
                    <Text as="p" variant="headingSm">Contact Preference:</Text>
                    <Text as="p" variant="headingLg" fontWeight="bold">
                      {csAgentContactPreference === "phone" ? "Phone" :
                       csAgentContactPreference === "email" ? "Email" :
                       csAgentContactPreference === "both" ? "Both" :
                       csAgentContactPreference === "none" ? "None" :
                       "Not set"}
                    </Text>
                  </InlineStack>
                  <Button onClick={() => setIsEditingContactInfo(true)}>Edit Contact Information</Button>
                </InlineStack>
              )}
            </>
          ) : (
            <Text as="p" color="critical">No customer service agent information available</Text>
          )}
        </Card> */}

        {toastActive && (
          <Toast content={toastMsg} onDismiss={handleToastDismiss} />
        )}
      </Page>
    </Frame>
  );
}
