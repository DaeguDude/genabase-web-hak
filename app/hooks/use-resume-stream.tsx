"use client";
import type { UseStream } from "@langchain/langgraph-sdk/react";
import { useEffect, useRef } from "react";

/**
 * We do have 2 pages where we use useStream hook.
 * 1. app._index.jsx
 * 2. app.threads.$threadId.tsx
 * From the index page when user submits the thread, new thread is created and they will be redirected
 * to the thread page. However from there, they need to resume the thread again so they don't lose the
 * conversation between redirection. Here's the guide
 * NOTE: Resume a stream after page refresh(250821, sh)
 * https://docs.langchain.com/langgraph-platform/use-stream-react#resume-a-stream-after-page-refresh
 */
export function useResumeStream(threadId: string, thread: UseStream) {
  // Ensure that we only join the stream once per thread.
  const joinedThreadId = useRef<string | null>(null);
  useEffect(() => {
    if (!threadId) return;

    const resume = window.sessionStorage.getItem(`resume:${threadId}`);
    if (resume && joinedThreadId.current !== threadId) {
      thread.joinStream(resume);
      joinedThreadId.current = threadId;
    }
  }, [thread, threadId]);
}
