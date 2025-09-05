import Image from "next/image";
import { LandingPageContainer } from "./container";
import SchemaUrl from "./schema.png";
import MobileGenaAI from "@/public/mobile-hero-gena-ai.gif";
import GenaAI from "@/public/gena-ai.gif";

export function LandingPageHero() {
  return (
    <>
      <div className="hidden md:block relative overflow-hidden">
        <LandingPageContainer>
          <div className="pb-[80px]">
            <div className="relative z-1 grid grid-cols-2 gap-[44px] px-[19.5px] py-[27.5px] bg-[#fffcf4]">
              {/* NOTE: MAX WIDTH TEMPORARY */}
              <div className="flex flex-col justify-center gap-[32px] py-2 px-4 grow">
                <div className="flex flex-col gap-[24px]">
                  <div className="text-center font-medium text-[60px] leading-[95%] text-[#f14800]">
                    <span className="text-[#731212]">Your </span>
                    AI-powered eCommerce Database
                  </div>

                  <div className="text-[20px] leading-[150%] font-medium text-center text-[#3a3a3a]">
                    Try out Lovable + Gena to launch your
                    <br />
                    e-commerce business in 3 hours
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="bg-[#f14800] hover:bg-[#ff763b] text-white px-[28px] py-[16px] text-[20px] leading-[150%] font-medium rounded-[8px] cursor-pointer">
                    Use our example on Github
                  </button>
                </div>
              </div>
              <div className="w-full h-auto aspect-[4/3]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('hero-image.png')",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="py-8 px-8 rounded-lg">
                    <Image src={GenaAI} alt="Mobile Gena AI" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LandingPageContainer>
        <div className="absolute top-[-8px] left-[19px] w-full h-full pointer-events-none">
          <Image src={SchemaUrl} alt="Schema Background" />
        </div>
      </div>

      <div className="block md:hidden px-8 pb-2.5">
        <div className="flex flex-col gap-8 py-9">
          <div className="flex flex-col gap-6">
            <div className="font-medium text-[48px] leading-[95%] text-[#731212]">
              Your AI-powered eCommerce Database
            </div>

            <div className="text-[20px] leading-[150%] font-medium  text-[#3a3a3a]">
              Try out Lovable + Gena to launch your e-commerce business in 3
              hours
            </div>
          </div>

          <div className="flex">
            <button className="bg-[#f14800] hover:bg-[#ff763b] text-white px-[28px] py-[16px] text-[20px] leading-[150%] font-medium rounded-[8px] cursor-pointer">
              Use our example on Github
            </button>
          </div>
        </div>
      </div>

      <div className="block md:hidden w-full">
        <div
          className="w-full h-auto bg-cover bg-no-repeat aspect-[4/3]"
          style={{
            backgroundImage: "url('mobile-hero-image.png')",
          }}
        >
          <div className="py-8 px-8 rounded-lg">
            <Image src={MobileGenaAI} alt="Mobile Gena AI" />
          </div>
        </div>
      </div>
    </>
  );
}
