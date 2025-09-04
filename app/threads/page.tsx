import { auth0 } from "@/lib/auth0";
import { Threads } from "./threads";

export default async function ThreadsPage() {
  const accessToken = await auth0.getAccessToken({
    refresh: true,
  });

  return <Threads accessToken={accessToken.token} />;
}
