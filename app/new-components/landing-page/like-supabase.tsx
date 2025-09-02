import { LandingPageContainer } from "./container";

export function LandingPageLikeSupabase() {
  return (
    <>
      <div className="hidden md:block">
        <LandingPageContainer>
          <div className="pt-[80px] pb-[140px]">
            <div className="px-[77.5px] pt-[48px] pb-[32px] grid grid-cols-2 gap-[36px]">
              <div className="flex flex-col justify-center">
                <div className="text-[48px] font-medium leading-[54px] text-[#731212]">
                  Like Supabase but
                </div>
                <div className="text-[48px] font-medium leading-[54px] text-[#f14800]">
                  eCommerce.
                </div>
              </div>
              <div className="flex flex-col gap-[24px]">
                <div className="text-[24px] font-normal leading-[100%] text-[#3a3a3a]">
                  Genabase launches a database for your business in minutes.
                  When you make a Genabase project, you get a database launched
                  and hosted on cloud along with your own database AI assistant,
                  Gena.
                </div>
                <div className="text-[24px] font-normal leading-[100%] text-[#3a3a3a]">
                  You {"don't"} have to worry about designing, launching,
                  maintaining, or monitoring your database. No need to log into
                  a messy server ever!
                </div>
              </div>
            </div>
          </div>
        </LandingPageContainer>
      </div>

      <div className="flex flex-col md:hidden py-12.5 px-8 gap-9">
        <div className="text-[40px] leading-[110%] font-medium text-[#731212]">
          Like Supabase but <span className="text-[#f14800]">eCommerce.</span>
        </div>
        <div className="flex flex-col gap-6 text-[20px] leading-[100%] text-[#3a3a3a]">
          <div>
            Genabase launches a database for your business in minutes. When you
            make a Genabase project, you get a database launched and hosted on
            cloud along with your own database AI assistant, Gena.
          </div>
          <div>
            You {"don't"} have to worry about designing, launching, maintaining,
            or monitoring your database. No need to log into a messy server
            ever!
          </div>
        </div>
      </div>
    </>
  );
}
