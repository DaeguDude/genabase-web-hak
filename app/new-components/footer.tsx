"use client";
import { useCallback, useState } from "react";

export function Footer() {
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    []
  );

  // lh(lineheight)
  return (
    <div className="mx-auto w-[768px] max-w-[768px]">
      <div className="relative isolate z-10 min-h-[88px] h-[88px]">
        <input type="text" />
        <div className="text-token-text-secondary relative mt-auto flex min-h-8 w-full items-center justify-center p-2 text-center text-xs md:px-[60px]">
          <div>HeyGena can make mistakes. Check important info.</div>
        </div>
      </div>
    </div>
  );
}

// function AutoGrowTextArea() {
//   const [value, setValue] = useState("");

//   return (
//     <div className="min-h-14">
//       <textarea style={{ display: "none" }} />
//       <div contentEditable className="bg-amber-200 w-[100px] h-[100px]">
//         <p></p>
//       </div>
//     </div>
//   );
// }
