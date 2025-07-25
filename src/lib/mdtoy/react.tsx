import React from "react";
import ReactMarkdown from "react-markdown";

import { rehypePlugins, remarkPlugins } from "./plugins";

export const Markdown: React.FC<{ children: string | null | undefined }> = ({
  children,
}) => {
  return (
    <ReactMarkdown
      remarkRehypeOptions={{
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
