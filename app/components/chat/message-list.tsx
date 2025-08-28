import { Card, BlockStack, Text } from "@shopify/polaris";
import Markdown from "react-markdown";
import type { Message } from "@langchain/langgraph-sdk";
import { ToolResponseBox } from "../tool-response-box";
import { TJobResult } from "@/app/type";

interface MessageListProps {
  messages: Message[];
  jobResults: Record<string, TJobResult>;
  isLoading?: boolean;
}

function parseMessageContent(message: Message) {
  if (message.type === "tool" && typeof message.content === "string") {
    const result = {
      job_id: "",
      question: "",
      sql: "",
      total_rows: "",
      full_results: "",
      ai_answer: "",
    };

    const jobIdMatch = message.content.match(/job_id:\s*([^\n]+)/);
    if (jobIdMatch) {
      result.job_id = jobIdMatch[1].trim();
    }

    const questionMatch = message.content.match(/Question:\s*([^\n]+)/);
    if (questionMatch) {
      result.question = questionMatch[1].trim();
    }

    const sqlMatch = message.content.match(/SQL:\s*```sql\n([\s\S]*?)```/);
    if (sqlMatch) {
      result.sql = sqlMatch[1].trim();
    }

    const totalRowsMatch = message.content.match(/Total rows:\s*(\d+)/);
    if (totalRowsMatch) {
      result.total_rows = totalRowsMatch[1].trim();
    }

    const fullResultsMatch = message.content.match(
      /Full Results:\s*```\n([\s\S]*?)```/
    );
    if (fullResultsMatch) {
      result.full_results = fullResultsMatch[1].trim();
    }

    return result;
  }

  return {
    ai_answer: message.content,
    is_regular_message: true,
  };
}

export function MessageList({
  messages,
  jobResults,
  isLoading,
}: MessageListProps) {
  const hasMessages = messages.filter((m) => m && m.content).length > 0;

  if (isLoading && !hasMessages) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full pb-32">
        <span className="text-gray-400 text-lg animate-pulse">
          Loading conversation…
        </span>
      </div>
    );
  }

  return (
    <BlockStack gap="400">
      {messages
        .filter((m) => m && m.content)
        .map((message, index) => {
          const parsedContent = parseMessageContent(message);
          if (
            "is_regular_message" in parsedContent &&
            parsedContent.is_regular_message
          ) {
            const type = message.type === "human" ? "human" : "ai";
            if (type === "human") {
              return (
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  key={`${index}-${message.id}`}
                >
                  <div className="w-full max-w-4xl flex justify-end">
                    <div className="bg-gray-200 text-gray-900 rounded-xl px-4 py-2 text-base max-w-[80%] w-fit">
                      {typeof message.content === "string"
                        ? message.content
                        : JSON.stringify(message.content)}
                    </div>
                  </div>
                </div>
              );
            } else if (type === "ai") {
              return (
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  key={message.id}
                >
                  <div className="w-full max-w-4xl">
                    <div className=" text-gray-900 rounded-xl px-4 py-2 text-base">
                      <Markdown>
                        {typeof parsedContent.ai_answer === "string"
                          ? parsedContent.ai_answer
                          : JSON.stringify(parsedContent.ai_answer)}
                      </Markdown>
                    </div>
                  </div>
                </div>
              );
            }
          }

          const jobIdMatch =
            typeof message.content === "string"
              ? message.content.match(/job_id:\s*([^\n]+)/)
              : false;
          const job_id = jobIdMatch ? jobIdMatch[1].trim() : null;
          const response =
            job_id && jobResults[job_id] ? jobResults[job_id] : null;

          if (response && message.type === "tool") {
            return (
              <div
                style={{ display: "flex", justifyContent: "center" }}
                key={message.id}
              >
                <div className="w-full max-w-4xl">
                  <ToolResponseBox response={response} pinAction={() => {}} />
                </div>
              </div>
            );
          }

          return (
            <div
              style={{ display: "flex", justifyContent: "flex-end" }}
              key={message.id}
            >
              <Card>
                <BlockStack gap="200">
                  <Text variant="bodyMd" as="span">
                    Loading results for job {job_id}...
                  </Text>
                </BlockStack>
              </Card>
            </div>
          );
        })}
      {isLoading && hasMessages && (
        <div className="flex justify-center py-2">
          <span className="text-gray-400 text-sm animate-pulse">
            AI is thinking…
          </span>
        </div>
      )}
    </BlockStack>
  );
}
