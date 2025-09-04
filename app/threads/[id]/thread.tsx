"use client";

import type { Message } from "@langchain/langgraph-sdk";
import { useCallback, useEffect, useState } from "react";
import type { TJobResult } from "@/app/type";
import { Container } from "@/app/new-components";
import { MessageInput } from "@/app/components";
import { MessageList } from "@/app/components/chat";
import { useResumeStream } from "@/app/hooks";
import { useStream } from "@langchain/langgraph-sdk/react";
import { getJobResult } from "@/app/api/new-api";
import { useSessionStorage } from "@/app/hooks/use-session-storage";
import { Database } from "lucide-react";

// Regex kept for potential future use when wiring real tool responses
const jobIdRegex = /job_id:\s*([^\n]+)/;

export function Thread({
  id: threadId,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) {
  const [message, setMessage] = useState("");
  const [session_id] = useSessionStorage("session_id", "");
  const [jobResults, setJobResults] = useState<Record<string, TJobResult>>({});

  const thread = useStream<{ messages: Message[] }>({
    apiUrl:
      "https://shopify-assistant-staging-ac00c03774345f558e50ae2afdb63b89.us.langgraph.app",
    assistantId: "shopify",
    messagesKey: "messages",
    apiKey: "none",
    threadId,
    reconnectOnMount: true,
    defaultHeaders: {
      "session-id": session_id,
      "genabase-id": accessToken,
      environment: "staging",
    },
  });
  useResumeStream(threadId || "", thread);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    // https://docs.langchain.com/langgraph-platform/use-stream-react#optimistic-updates
    const newMessage = { type: "human", content: message } satisfies Message;
    thread.submit(
      { messages: [newMessage] },
      {
        streamResumable: true,
        optimisticValues(prev) {
          const prevMessages = prev.messages ?? [];
          const newMessages = [...prevMessages, newMessage];
          return { ...prev, messages: newMessages };
        },
      }
    );
    setMessage("");
  };

  const fetchJobResult = useCallback(
    async (job_id: string) => {
      if (!job_id || jobResults[job_id]) return;
      try {
        const data = await getJobResult(job_id, session_id!);
        if (data) {
          setJobResults((prev) => ({ ...prev, [job_id]: data }));
        }
      } catch (err) {
        console.error("Failed to fetch job result:", err);
      }
    },
    [jobResults, session_id]
  );

  const displayedMessages: Message[] = thread.messages;

  useEffect(() => {
    thread.messages.forEach((message) => {
      if (message.type === "tool" && typeof message.content === "string") {
        const jobIdMatch = message.content.match(jobIdRegex);
        if (jobIdMatch) {
          const job_id = jobIdMatch[1].trim();
          if (job_id && !jobResults[job_id]) {
            fetchJobResult(job_id);
          }
        }
      }
    });
  }, [thread.messages, session_id, jobResults, fetchJobResult]);

  return (
    <>
      <div id="chat-area" className="flex-1 overflow-y-auto w-full">
        {thread.isThreadLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Database
              style={{
                animation: "spin 1.2s linear infinite, colorPulse 2s infinite",
                stroke: "#d0d0d0", // starting color
              }}
              className="w-10 h-10 animate-spin stroke-[#d0d0d0] stroke-1"
            />

            <style jsx>{`
              @keyframes colorPulse {
                0%,
                100% {
                  stroke: #d0d0d0;
                }
                50% {
                  stroke: #838383;
                }
              }

              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}</style>
          </div>
        ) : (
          <Container className="h-full">
            <div className="h-full py-4">
              <MessageList
                messages={displayedMessages}
                jobResults={jobResults}
                isLoading={thread.isLoading}
              />
            </div>
          </Container>
        )}
      </div>
      <Container className="">
        <MessageInput
          message={message}
          onMessageChange={setMessage}
          onSubmit={handleSubmit}
          isLoading={thread.isLoading}
          stop={() => thread.stop()}
        />
      </Container>
    </>
  );
}
