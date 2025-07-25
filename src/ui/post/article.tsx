"use client";
import { useEffect } from "react";
import Link from "next/link";
import { LucideTags, LucideClock } from "lucide-react";

import { Markdown, watchHashChange, unwatchHashChange } from "@lib/mdtoy";
import { Post } from "@lib/blog";

import Time from "./time";

export type ArticleProps = {
  post: Post;
};

const Article: React.FC<ArticleProps> = ({ post }) => {
  useEffect(() => {
    watchHashChange();
    return () => {
      unwatchHashChange();
    };
  }, []);

  const lastModified =
    post.metadata.publish_time_last ??
    post.metadata.publish_time_first ??
    post.metadata.create_time;

  const firstPublished =
    post.metadata.publish_time_first ?? post.metadata.create_time;

  const datetimes = [
    {
      label: "最后修改于：",
      value: lastModified,
    },
  ];

  if (firstPublished < lastModified) {
    datetimes.push({
      label: "最初发布于：",
      value: firstPublished,
    });
  }

  return (
    <article>
      <header className="max-w-[65ch] mx-auto">
        <h1 className="text-5xl font-bold mb-2">{post.metadata.title}</h1>
        <section className="mb-10 text-sm">
          <div className="flex items-center">
            <LucideClock className="icon-text me-0.5" aria-hidden="true" />
            <ul className="flex">
              {datetimes.map(({ label, value }) => (
                <li
                  key={label}
                  className="after:content-['·'] after:mx-1 last:after:content-none"
                >
                  {label}
                  <Time date={value} />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            <LucideTags className="icon-text me-0.5" />
            <ul className="flex flex-wrap space-x-0.5">
              {post.metadata.tags?.map((tag) => (
                <li key={tag}>
                  <Link className="link link-hover" href={`/blog/tag/${tag}`}>
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </header>
      <section className="prose mx-auto">
        <Markdown>{post.content}</Markdown>
      </section>
    </article>
  );
};

export default Article;
