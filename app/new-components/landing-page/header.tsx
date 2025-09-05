"use client";
import { LandingPageContainer } from "./container";
import Link from "next/link";

export function LandingPageHeader() {
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:block min-h-[128px] h-[128px] pt-[65px] pb-[24px]">
        <LandingPageContainer>
          <div className="flex justify-between">
            <div className="text-[#f14800] font-bold text-[20px]">GENABASE</div>

            <div className="w-[225px] flex justify-between items-center ">
              <Link href="/auth/login?returnTo=/threads">
                <div className="text-[#302b2b] font-medium text-[16px] leading-[133%] cursor-pointer">
                  Log In
                </div>
              </Link>
              <Link
                href="/auth/login?returnTo=/threads"
                className="font-medium text-[16px] leading-[133%] py-3 px-6 rounded-[100px] bg-[#f14800] hover:bg-[#ff763b] text-white cursor-pointer"
              >
                Join Today
              </Link>
            </div>
          </div>
        </LandingPageContainer>
      </div>

      {/* MOBILE */}
      <div className="flex md:hidden py-12 px-8 justify-between items-center">
        <div className="text-[#731212] font-bold text-[20px]">GENABASE</div>
        <div className="flex items-center gap-8">
          <Link
            href="/auth/login?returnTo=/threads"
            className="font-semibold text-[16px] leading-[133%] cursor-pointer"
          >
            Log In
          </Link>
          <Link
            href="/auth/login?returnTo=/threads"
            className="font-medium text-[16px] leading-[133%] py-3 px-6 rounded-[100px] bg-[#f14800] hover:bg-[#ff763b] text-white cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
