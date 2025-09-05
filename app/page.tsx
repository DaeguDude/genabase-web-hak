import { LandingPageHeader } from "./new-components";
import { LandingPageHero } from "./new-components/landing-page/hero";
import { LandingPageCompanies } from "./new-components/landing-page/companies";
import { LandingPageCallTextChat } from "./new-components/landing-page/call-text-chat";
import { LandingPageLikeSupabase } from "./new-components/landing-page/like-supabase";
import { LandingPageFooter } from "./new-components/landing-page/footer";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (user) {
    return redirect("/threads");
  }

  return (
    <div className="bg-[#fffcf4]">
      <LandingPageHeader />
      <LandingPageHero />
      <LandingPageCompanies />
      <LandingPageLikeSupabase />
      <LandingPageCallTextChat />
      {/* <LandingPageDan /> */}
      <LandingPageFooter />
    </div>
  );
}
