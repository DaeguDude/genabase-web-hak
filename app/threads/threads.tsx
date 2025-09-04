"use client";

import { useRouter } from "next/navigation";
import { Container } from "../new-components";
import { useState, useRef } from "react";
import { MessageInput } from "../components";
import { Suggestions } from "../new-components";
import { useStream } from "@langchain/langgraph-sdk/react";
import { createThread } from "../api/new-api";
import { useQueryClient } from "@tanstack/react-query";
import { useSessionStorage } from "../hooks/use-session-storage";

export function Threads({ accessToken }: { accessToken: string }) {
  const [message, setMessage] = useState("");
  const [session_id] = useSessionStorage("session_id", "");
  const router = useRouter();
  const [showSuggestions, setShowSuggestions] = useState(true);
  const inputAreaRef = useRef(null);
  const queryClient = useQueryClient();

  const thread = useStream({
    apiUrl:
      "https://shopify-assistant-staging-ac00c03774345f558e50ae2afdb63b89.us.langgraph.app",
    assistantId: "shopify",
    messagesKey: "messages",
    apiKey: "none",
    defaultHeaders: {
      "session-id": session_id,
      "genabase-id": accessToken,
      environment: "staging",
    },
    reconnectOnMount: true,
    onCreated: (run) => {
      window.sessionStorage.setItem(`resume:${run.thread_id}`, run.run_id);
    },
    onFinish: (_, run) => {
      window.sessionStorage.removeItem(`resume:${run?.thread_id}`);
    },
    onThreadId: async (threadId) => {
      const title = message;
      if (session_id) {
        await createThread(threadId, title, session_id);
      }
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      router.push(`/threads/${threadId}`);
    },
  });

  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center">
        <Container>
          <div className="flex flex-col gap-8">
            <div className="flex justify-center">
              <p style={{ fontSize: "30px", fontWeight: "600" }}>
                Ask me anything about your store
              </p>
            </div>
            <div className="w-full flex flex-col">
              <MessageInput
                ref={inputAreaRef}
                isLoading={thread.isLoading}
                stop={() => thread.stop()}
                message={message}
                onMessageChange={setMessage}
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  if (form instanceof HTMLFormElement) {
                    form.reset();
                  }
                  thread.submit(
                    { messages: [{ type: "human", content: message }] },
                    { streamResumable: true }
                  );
                }}
              />
              {showSuggestions && (
                <div className="w-full relative">
                  <Suggestions
                    inputAreaRef={inputAreaRef}
                    onClickSuggestion={(suggestion) => {
                      setShowSuggestions(false);
                      setMessage(suggestion);
                      thread.submit(
                        { messages: [{ type: "human", content: suggestion }] },
                        { streamResumable: true }
                      );
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
