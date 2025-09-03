import { Menu } from "lucide-react";
import { LandingPageContainer } from "./container";
import { useUser } from "@auth0/nextjs-auth0";

export function LandingPageHeader() {
  const { user } = useUser();

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:block min-h-[128px] h-[128px] pt-[65px] pb-[24px]">
        <LandingPageContainer>
          <div className="flex justify-between">
            <div className="text-[#f14800] font-bold text-[20px]">GENABASE</div>

            {user ? (
              <div className="flex items-center">
                <a href="/auth/logout">
                  <div className="text-[#302b2b] font-medium text-[16px] leading-[133%] cursor-pointer">
                    Log out
                  </div>
                </a>
              </div>
            ) : (
              <div className="w-[225px] flex justify-between items-center ">
                <a href="/auth/login">
                  <div className="text-[#302b2b] font-medium text-[16px] leading-[133%] cursor-pointer">
                    Log In
                  </div>
                </a>
                <div className="font-medium text-[16px] leading-[133%] py-3 px-6 rounded-[100px] bg-[#f14800] text-white cursor-pointer">
                  Join Today
                </div>
              </div>
            )}
          </div>
        </LandingPageContainer>
      </div>

      {/* MOBILE */}
      {/* TODO: drawer for mobile */}
      <div className="flex md:hidden py-12 px-8  justify-between items-center">
        <div className="text-[#f14800] font-bold text-[20px]">GENABASE</div>
        <div>
          <Menu className="w-8 h-8 stroke-1 text-[#84302E]" />
        </div>
      </div>
    </>
  );
}
