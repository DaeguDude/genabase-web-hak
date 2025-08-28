import React from "react";

import { CopyButton } from "./copy-button";

type SQLCodeProps = {
  code: string;
};

export function SQLCode({ code }: SQLCodeProps) {
  return (
    <div className="relative m-4 p-4 border-2 border-solid">
      <div className="absolute top-4 right-2 z-10">
        <CopyButton toCopy={code} />
      </div>
      <pre className="overflow-x-auto">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
