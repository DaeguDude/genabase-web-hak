"use client";
import React, { useState } from "react";

import { BlockStack, InlineStack, Text } from "@shopify/polaris";

import { SQLQueryTable, DataVisualization } from ".";

interface Props {
  response: {
    job_id?: string;
    question: string;
    prediction?: string;
    created_at?: string;
    data?: Record<string, string>[];
    visualizationPreference?: string;
  };
  pinned?: boolean;
  pinAction: (responseId: string) => void;
}

function getTypeStyles() {
  return "border-gray-200 text-gray-900";
}

function ToolResponseBoxComponent({ response }: Props) {
  const [visualizationPreference] = useState<"table" | "chart">("table");

  // const createdAtDate = response.created_at
  //   ? new Date(response.created_at)
  //   : null;

  // const fullTimestampFormatted = createdAtDate
  //   ? createdAtDate.toLocaleString(undefined, {
  //       weekday: "long",
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //       hour: "numeric",
  //       minute: "2-digit",
  //     })
  //   : "";

  // const timeOnlyTimestamp = createdAtDate
  //   ? createdAtDate.toLocaleString(undefined, {
  //       hour: "numeric",
  //       minute: "2-digit",
  //     })
  //   : "";

  // const canVisualizeAsChart = (
  //   data: Record<string, string>[] = []
  // ): boolean => {
  //   if (!data || data.length === 0) return false;
  //   const columns = Object.keys(data[0]);
  //   const nonChartableColumnPatterns = [
  //     /id/i,
  //     /phone/i,
  //     /email/i,
  //     /date/i,
  //     /created at/i,
  //     /updated at/i,
  //   ];
  //   for (const column of columns) {
  //     if (nonChartableColumnPatterns.some((pattern) => pattern.test(column))) {
  //       continue;
  //     }
  //     const hasNumericalValues = data.every((row) => {
  //       const value = row[column];
  //       return (
  //         !isNaN(Number(value)) &&
  //         (typeof value === "string" ? value.trim() !== "" : true)
  //       );
  //     });
  //     if (hasNumericalValues) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  const typeStyles = getTypeStyles();

  return (
    <div className={`w-full max-w-4xl flex flex-col gap-4 ${typeStyles}`}>
      <BlockStack gap="400">
        <BlockStack gap="200">
          <InlineStack align="space-between">
            <div className="break-words whitespace-pre-line">
              <Text variant="headingMd" as="h2">
                {response.question}
              </Text>
            </div>
          </InlineStack>
        </BlockStack>
      </BlockStack>
      {visualizationPreference === "table" && (
        <SQLQueryTable data={response.data || []} />
      )}
      {visualizationPreference === "chart" && (
        <DataVisualization data={response.data || []} />
      )}
    </div>
  );
}

export const ToolResponseBox = React.memo(ToolResponseBoxComponent);
