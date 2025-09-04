import { auth0 } from "@/lib/auth0";
import { Thread } from "./thread";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const accessToken = await auth0.getAccessToken({
    refresh: true,
  });
  return <Thread id={id} accessToken={accessToken.token} />;
}
