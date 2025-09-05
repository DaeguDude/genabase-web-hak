"use client";
import Image from "next/image";
import { LandingPageContainer } from "./container";

import Image17 from "@/public/company-logo-images/image-17.png";
import Image18 from "@/public/company-logo-images/image-18.png";
import Image19 from "@/public/company-logo-images/image-19.png";
import Image20 from "@/public/company-logo-images/image-20.png";
import Image21 from "@/public/company-logo-images/image-21.png";
import Image22 from "@/public/company-logo-images/image-22.png";
import Image23 from "@/public/company-logo-images/image-23.png";
import Image24 from "@/public/company-logo-images/image-24.png";
import Image25 from "@/public/company-logo-images/image-25.png";
import Image26 from "@/public/company-logo-images/image-26.png";
import Image27 from "@/public/company-logo-images/image-27.png";
import Image28 from "@/public/company-logo-images/image-28.png";
import { ScrollReveal } from "../scroll-reveal";

const images = [
  Image17,
  Image18,
  Image19,
  Image20,
  Image21,
  Image22,
  Image23,
  Image24,
  Image25,
  Image26,
  Image27,
  Image28,
];

export function LandingPageCompanies() {
  return (
    <div className="bg-[#232323]">
      <LandingPageContainer className="hidden md:block">
        <ScrollReveal>
          <div className="py-[72px]">
            <div className="flex flex-col gap-4">
              <div className="text-[20px] leading-[150%] font-medium text-center text-white">
                Trusted by over 100 merchants globally
              </div>
              <div className="flex justify-center items-center gap-[22px]">
                {images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Company logos ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </LandingPageContainer>

      <div className="flex flex-col md:hidden py-18 gap-4">
        <ScrollReveal>
          <div className="text-[18px] leading-[150%] font-medium text-center text-[#FFFCF4]">
            Trusted by over 100 merchants globally
          </div>
          {/* TODO: animate it. Reference webflow site */}
          <div className="flex justify-center items-center gap-[22px] overflow-hidden">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Company logos ${index + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
