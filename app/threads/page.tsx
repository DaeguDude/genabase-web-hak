import { auth0 } from "@/lib/auth0";
import { Threads } from "./threads";
import { redirect } from "next/navigation";

export default async function ThreadsPage() {
  const session = await auth0.getSession();
  const user = session?.user;
  const accessToken = session?.tokenSet.accessToken;

  if (!user || !accessToken) {
    return redirect("/");
  }

  return <Threads accessToken={accessToken} />;
}
