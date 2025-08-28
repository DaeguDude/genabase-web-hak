"use client";
// https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/

import { useState } from "react";
import autoGrowTextAreaStylesUrl from "./auto-grow-text-area.css";
import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: autoGrowTextAreaStylesUrl as unknown as string },
];

export function AutoGrowTextArea() {
  const [value, setValue] = useState("");

  return (
    <div className="grow-wrap" data-replicated-value={value}>
      <textarea
        rows={1}
        name="text"
        id="text"
        onInput={(e) => setValue(e.currentTarget.value)}
        value={value}
      />
      {/* BUTTON */}
    </div>
  );
}
