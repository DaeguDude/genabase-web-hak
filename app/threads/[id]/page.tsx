import { auth0 } from "@/lib/auth0";
import { Thread } from "./thread";
import { notFound } from "next/navigation";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await fetch(`${process.env.APP_BASE_URL}/api/get-token`);
  const session = await auth0.getSession();
  const accessToken = session?.tokenSet.accessToken;
  if (!accessToken) {
    return notFound();
  }

  return <Thread id={id} accessToken={accessToken} />;
}
