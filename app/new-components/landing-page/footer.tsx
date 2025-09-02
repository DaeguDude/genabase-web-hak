export function LandingPageFooter() {
  return (
    <div className="bg-[#232323] min-h-[221px] h-[221px] flex flex-col items-center justify-center">
      <div className="hidden md:block text-[32px] font-normal leading-[100%] text-[#c6c6c6]">
        Powered by Gena. We specialize in AI for data accessibility.
      </div>

      <div className="md:hidden text-[24px] leading-[100%] text-[#c6c6c6]">
        <div className="text-center">
          <span className="text-[#EAE4D4]">Powered by </span>
          <span className="text-[#F14800]">Gena.</span>
        </div>
        <div className="text-center">
          We specialize in AI for data accessibility.
        </div>
      </div>
    </div>
  );
}
