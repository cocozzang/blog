"use client";

import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(props.children?.toString() || "");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group">
      <pre className={`${props.className} relative overflow-x-auto m-2`}>
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200"
          aria-label="Copy code"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-gray-400" />
          )}
        </button>
        <code className={props.className}>{props.children}</code>
      </pre>
    </div>
  );
}
