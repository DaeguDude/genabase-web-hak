import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (user) {
    return redirect("/threads");
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">Welcome</h1>
        <p className="text-muted-foreground text-lg">
          Get started by signing in to your account
        </p>
        <a
          href="/auth/login"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-black/90 transition-colors"
        >
          Log in
        </a>
      </div>
    </main>
  );
}
