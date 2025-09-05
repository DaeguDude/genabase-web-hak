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

// <main className="min-h-screen bg-background flex items-center justify-center">
//   <div className="text-center space-y-6">
//     <h1 className="text-4xl font-bold text-foreground">Welcome</h1>
//     <p className="text-muted-foreground text-lg">
//       Get started by signing in to your account
//     </p>
//     <a
//       href="/auth/login"
//       className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-black/90 transition-colors"
//     >
//       Log in
//     </a>
//   </div>
// </main>
