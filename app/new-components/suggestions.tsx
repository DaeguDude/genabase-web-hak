"use client";

import { cn } from "@heroui/react";
import { questions, type TQuestionCategory } from "../constants";
import { useEffect, useRef, useState } from "react";

// ISSUE: chip 사라지고 질문들이 생길때 input창이 왔다갔다거리는것

// 세번째로는 로직을 구현해
// suggestion을 클릭하면.... 실행시켜야지. 그런데 그건 지금 안해도되기는 해.

export function Suggestions({
  inputAreaRef,
  onClickSuggestion,
}: {
  inputAreaRef: React.RefObject<HTMLFormElement | null>;
  onClickSuggestion?: (suggestion: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] =
    useState<TQuestionCategory | null>(null);
  const questionsOpen = !!selectedCategory;
  const displayQuestions = selectedCategory ? questions[selectedCategory] : [];
  const questionsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function mousedownHandler(e: MouseEvent) {
      const inputAreaNode = inputAreaRef.current;
      const questionsContainerNode = questionsContainerRef.current;
      if (!inputAreaNode || !questionsContainerNode) return;

      const clickedNode = e.target as Node;
      if (
        !inputAreaNode.contains(clickedNode) &&
        !questionsContainerNode.contains(clickedNode)
      ) {
        setSelectedCategory(null);
      }
    }

    if (questionsOpen) {
      document.addEventListener("mousedown", mousedownHandler);
    }

    return () => {
      document.removeEventListener("mousedown", mousedownHandler);
    };
  }, [questionsOpen, inputAreaRef]);

  const handleClickSuggestion = (suggestion: string) => {
    setSelectedCategory(null);
    onClickSuggestion?.(suggestion);
  };

  return (
    <div className="w-full absolute top-[24px] left-0 flex flex-col">
      <div className={cn("w-full mx-auto max-w-4xl flex flex-col")}>
        {!selectedCategory ? (
          <div className={cn("w-full flex justify-center gap-2 flex-wrap")}>
            {[
              "Business Intelligence & Analytics",
              "Performance Diagnostics",
              "Customer Intelligence",
              "Strategic Growth",
              "Profitability & Finance",
            ].map((label) => (
              <Chip
                key={label}
                label={label}
                onClick={() => {
                  setSelectedCategory(label as TQuestionCategory);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col" ref={questionsContainerRef}>
            {displayQuestions.map((question) => (
              <Question
                key={question}
                content={question}
                onClick={() => {
                  console.log("hey?");
                  handleClickSuggestion(question);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <div
      className="rounded-2xl border-1 border-gray-300 py-2 px-3 cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      {label}
    </div>
  );
}

function Question({
  content,
  onClick,
}: {
  content: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex border-b-1 border-[#d4d4d47a] hover:bg-gray-50 hover:rounded-lg hover:border-gray-50 p-4 cursor-pointer"
      )}
      onClick={onClick}
    >
      {content}
    </div>
  );
}
