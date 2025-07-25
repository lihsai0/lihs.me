import { Markdown, mdToHTML } from "@lib/mdtoy";

const testContent = `
## Test Content

1. Item 1
2. Item 2
    1. Item 2.1
3. Item 3

这里划重点，:mark[快捷键可以极大提高效率]。

例如，使用 :kbd[⌘] :kbd[R] 可以刷新页面，远比鼠标点击刷新按钮快。

:mark[hhhhh]{class="foo markdown-alert"}

:mark[Normal]

:mark[Test XSS]{class="" onclick="alert('XSS')"}

:::details
::summary[Windows/Linux]
使用 :kbd[⌃] :kbd[R] 刷新页面。
:::
`;

export default function PostPage() {
  return (
    <div className="prose">
      <h1>Post Title</h1>
      <pre>{mdToHTML(testContent)}</pre>
      <Markdown>{testContent}</Markdown>
    </div>
  );
}
