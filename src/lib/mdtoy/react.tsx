import React from "react";
import ReactMarkdown from "react-markdown";

import { rehypePlugins, remarkPlugins } from "./plugins";

export const Markdown: React.FC<{ children: string | null | undefined }> = ({
  children,
}) => {
  return (
    <ReactMarkdown
      remarkRehypeOptions={{
        footnoteLabel: "脚注",
        footnoteBackLabel: (reIndex, rereIndex) => {
          return `返回内容 ${reIndex + 1}${rereIndex > 1 ? `-(${rereIndex})` : ""}`;
        },
        // this has been done by rehype-sanitize
        clobberPrefix: "",
      }}
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
    >
      {children}
    </ReactMarkdown>
  );
};
