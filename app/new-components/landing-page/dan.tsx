import Image from "next/image";
import { LandingPageContainer } from "./container";
import Dan from "@/public/dan.png";
import { Check } from "lucide-react";
export function LandingPageDan() {
  return (
    <div className="py-[77px] pb-[111px]">
      <LandingPageContainer>
        <div className="pl-[67px] grid grid-cols-2 gap-4 h-[500px]">
          <div className="flex flex-col justify-center gap-[56px]">
            <div className="flex flex-col gap-[24px]">
              <div className="text-[60px] font-medium leading-[95%] text-[#731212]">
                Meet <span className="text-[#F14800]">Dan</span>
              </div>
              <div className="text-[24px] font-medium leading-[120%] text-[#3a3a3a]">
                He got off Shopify and operates his own
                <br />
                e-commerce site he built with genabase.
              </div>
            </div>
            <div className="flex flex-col gap-[24px]">
              {/* TODO: replace icons with figma icons */}
              <div className="flex items-center gap-[16px]">
                <Check className="w-4 h-4 stroke-3" />
                <div className="text-[24px] font-medium leading-[100%] text-[#3a3a3a]">
                  You own your data
                </div>
              </div>
              <div className="flex items-center gap-[16px]">
                <Check className="w-4 h-4 stroke-3" />
                <div className="text-[24px] font-medium leading-[100%] text-[#3a3a3a]">
                  Build business logicistics however you want
                </div>
              </div>
              <div className="flex items-center gap-[16px]">
                <Check className="w-4 h-4 stroke-3" />
                <div className="text-[24px] font-medium leading-[100%] text-[#3a3a3a]">
                  No overhead fees. Just transactions.
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <Image
              src={Dan}
              alt="Dan"
              className="rounded-2xl w-full h-full object-cover"
            />
          </div>
        </div>
      </LandingPageContainer>
    </div>
  );
}
