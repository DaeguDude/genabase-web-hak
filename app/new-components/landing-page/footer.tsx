import Image from "next/image";
import GenaLogo from "@/public/gena-footer.svg";

export function LandingPageFooter() {
  return (
    <>
      <div className="hidden md:flex bg-[#232323] min-h-[221px] h-[221px] flex-col items-center justify-center">
        <div className="flex flex-col gap-[10px] items-center text-[28px] leading-[100%] text-[#c6c6c6]">
          <div className="flex items-center gap-3">
            Powered by <Image src={GenaLogo} alt="Gena" />
          </div>
          <div>We specialize in AI for data accessibility.</div>
        </div>
      </div>

      <div className="bg-[#232323] min-h-[352px] md:hidden text-[20px] leading-[100%] text-[#FFFCF4]">
        <div className="flex flex-col items-center pt-[86px] gap-[10px]">
          <div className="flex items-center gap-3">
            Powered by <Image src={GenaLogo} alt="Gena" />
          </div>
          <div>We specialize in AI for data accessibility.</div>
        </div>
      </div>
    </>
  );
}
