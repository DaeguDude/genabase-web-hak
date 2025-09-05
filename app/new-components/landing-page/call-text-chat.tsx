"use client";
import Image from "next/image";
import PersonOnThePhone from "@/public/phone.png";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

export function LandingPageCallTextChat() {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const leftSectionRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function syncHeight() {
      const leftSectionElem = leftSectionRef.current;
      const rightSectionElem = rightSectionRef.current;
      if (!leftSectionElem || !rightSectionElem) {
        return;
      }

      // 왼쪽 섹션의 실제 높이를 픽셀 단위로 가져오기
      // offsetHeight는 요소의 가시적인 높이(테두리 포함)를 반환
      const leftHeight = leftSectionElem.offsetHeight;

      rightSectionElem.style.height = `${leftHeight * 1.3}px`;
    }

    if (isDesktop) {
      syncHeight();
      window.addEventListener("resize", syncHeight);
    }

    return () => {
      window.removeEventListener("resize", syncHeight);
    };
  }, [isDesktop]);

  return (
    <>
      <div className="hidden md:grid md:grid-cols-[40%_60%] bg-[#2A1F1E] py-[131px] px-[141px]  gap-8">
        <div
          className="flex flex-col gap-[32px] self-start"
          ref={leftSectionRef}
        >
          <div className="text-white text-[48px] leading-[100%]">
            <span className="text-[#ff763b]">Call, text</span> and{" "}
            <span className="text-[#ff763b]">chat</span> with your database
          </div>
          <div className="text-[22px] text-[#dddddc]">
            No more SQL. Interact with your database via APIs and mobile access.
            Gena, your personal database assistant, will monitor your data, send
            you alerts, and share up-to-date business insights.
          </div>

          <button className="px-8 py-4 rounded-[8px] bg-[#8c2b02] text-[20px] font-medium text-[#FFFFFF] self-start cursor-pointer">
            ANOTHER CTA
          </button>
        </div>

        <div className="relative overflow-hidden" ref={rightSectionRef}>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: "url('person-on-the-phone.png')",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="absolute bottom-0 right-[10%] h-[90%]">
            <Image
              src={PersonOnThePhone}
              alt="chat"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12 md:hidden bg-[#2A1F1E] py-15 px-8">
        <div className="flex flex-col gap-8">
          <div className="text-white text-[48px] leading-[110%] font-medium">
            <span className="text-[#ff763b]">Call, text</span> and{" "}
            <span className="text-[#ff763b]">chat</span> with your database
          </div>

          <button className="px-8 py-4 rounded-[8px] bg-[#8c2b02] text-[20px] font-medium text-[#FFFFFF] self-start cursor-pointer">
            ANOTHER CTA
          </button>
        </div>
        <div className="w-full h-auto aspect-[10/12]">
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: "url('mobile-person-on-the-phone.png')",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
