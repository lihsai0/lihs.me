import { Metadata } from "next";

import { getLatestPosts } from "@lib/blog";
import ArticleItem from "@ui/post/article_item";

export const metadata: Metadata = {
  title: "博客",
  description: "最近的文章",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) {
  const posts = await getLatestPosts({ base: "contents/posts" });
  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="default-heading">最近的文章</h1>
      <ul className="mt-16 space-y-10">
        {posts.map((post) => (
          <li key={post.id}>
            <ArticleItem
              href={`/blog/post/${post.metadata.link_title}`}
              title={post.metadata.title}
              description={
                post.metadata.description || post.gendata.description
              }
              createTime={post.metadata.create_time}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
