"use client";
import React, { forwardRef, useRef } from "react";
import { cn } from "@heroui/react";
import { SendHorizonal } from "lucide-react";
import { usePathname } from "next/navigation";

interface MessageInputProps {
  message: string;
  onMessageChange?: (value: string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  stop: () => void;
}

const MessageInput = forwardRef<HTMLFormElement, MessageInputProps>(
  function MessageInput(
    { message, onMessageChange, onSubmit, isLoading, stop },
    ref
  ) {
    const pathname = usePathname();
    const isIndexPage = pathname === "/threads";

    // #0d0d0d0d
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <form onSubmit={onSubmit} className="w-full" ref={ref}>
        <div
          className={cn(
            "relative min-h-[96px] w-full mx-auto flex flex-col gap-2 p-6",
            "border-[#d6d6d6] border-1 rounded-3xl shadow-sm",
            "max-w-4xl"
          )}
        >
          <input
            ref={inputRef}
            type="text"
            name="message"
            value={message}
            onChange={(e) => onMessageChange?.(e.target.value)}
            autoComplete="off"
            placeholder="Type your message here..."
            className="w-full border-[#0d0d0d0d] text-gray-800 placeholder-gray-400 rounded-lg border-none focus:ring-0 focus:outline-none p-3 pr-8 text-base"
          />
          <div className="absolute top-[30px] right-[24px]">
            {isLoading && (
              <button
                onClick={stop}
                className="flex items-center justify-center bg-gray-100 rounded-full p-2 cursor-pointer"
              >
                <div className="w-3 h-3 bg-[rgba(48,48,48,1)] rounded-sm" />
              </button>
            )}
            {!isLoading && message.length > 0 ? (
              <button
                type="submit"
                className="flex items-center justify-center bg-gray-100 rounded-full p-2 cursor-pointer"
              >
                <SendHorizonal className="w-5 h-5" />
              </button>
            ) : null}
          </div>
        </div>
        {!isIndexPage && (
          <div className="text-gray-400 relative mt-auto flex min-h-8 w-full items-center justify-center p-2 text-center text-xs md:px-[60px]">
            <div>HeyGena can make mistakes. Check important info.</div>
          </div>
        )}
      </form>
    );
  }
);
export { MessageInput };
