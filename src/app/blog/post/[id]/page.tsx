import type { Metadata } from "next";

import { getAllPosts, getPostByID } from "@lib/blog";
import Article from "@ui/post/article";

export async function generateStaticParams() {
  const posts = await getAllPosts({ base: "contents/posts" });
  return posts.map((post) => ({ id: post.id }));
}

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostByID(id, { base: "contents/posts" });
  return {
    title: post.metadata.title,
    description: post.metadata.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPostByID(id, { base: "contents/posts" });

  return <Article post={post} />;
}
