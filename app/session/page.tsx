"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSessionStorage } from "../hooks/use-session-storage";

export default function Session() {
  const [session_id, setSessionId] = useState("");
  const [clientSessionId] = useSessionStorage("session_id", "");

  const [sessionStorageSessionId, setSessionStorageSessionId] = useState(
    clientSessionId ?? ""
  );
  const router = useRouter();

  const handleSave = async () => {
    const res = await fetch("/api/set-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: session_id }),
    });

    const data = await res.json();
    if (data.session_id) {
      sessionStorage.setItem("session_id", data.session_id);
      setSessionStorageSessionId(data.session_id);
    }
  };

  return (
    <div className="flex flex-col p-8 gap-8">
      <div className="flex gap-4">
        <h1 className="text-2xl font-bold">Set up the Session</h1>
        <button
          className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          Go Home
        </button>
      </div>
      <p className="text-sm text-gray-500">
        <span className="font-bold">Example Session ID:</span>{" "}
        3gaiTqWJHZc9_q1Id977B07NTJybex78CxupZa7_vQB
      </p>
      <input
        className="border border-gray-300 rounded-md p-2"
        placeholder="Session ID"
        value={session_id}
        onChange={(e) => setSessionId(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleSave}
      >
        Save
      </button>

      {/* separator */}
      <div className="h-px bg-gray-200 w-full" />

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">
          Session ID Set : {sessionStorageSessionId}
        </h2>
      </div>
    </div>
  );
}
