import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import { remarkPlugins, rehypePlugins } from "./plugins";

export const mdToHTML = (() => {
  let processor = unified()
    .use(remarkParse)
    // use default plugins
    .use(remarkPlugins)
    // convert to html processor
    .use(remarkRehype)
    // use default plugins
    .use(rehypePlugins)
    // toString
    .use(rehypeStringify);
  return async (markdown: string): Promise<string> => {
    return new Promise((resolve, reject) =>
      processor.process(markdown, (err, file) => {
        if (err) {
          reject(err);
          return;
        }
        if (!file) {
          reject(new Error("remark process result is `undefined`"));
          return;
        }
        resolve(file.toString());
      }),
    );
  };
})();
