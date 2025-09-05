import { auth0 } from "@/lib/auth0";
import { Threads } from "./threads";
import { redirect } from "next/navigation";

export default async function ThreadsPage() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) {
    return redirect("/");
  }

  const accessToken = await auth0.getAccessToken({
    refresh: true,
  });

  return <Threads accessToken={accessToken.token} />;
}
