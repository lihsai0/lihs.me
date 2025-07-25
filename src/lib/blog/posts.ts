import path from "node:path";
import fs from "node:fs/promises";

import matter from "gray-matter";

import type { Metadata, Post } from "./types";

const PROJECT_PATH = process.cwd();

async function getAllPostIDs(base: string): Promise<string[]> {
  const postsPath = path.resolve(PROJECT_PATH, base);
  return await fs.readdir(postsPath);
}

const POSTS_CACHE = new Map<string, Post>();

export async function getPostByID(
  id: string,
  options: { base?: string; preferCache?: boolean } = {},
): Promise<Post> {
  const { base, preferCache = true } = options;

  let cache;
  if (preferCache && (cache = POSTS_CACHE.get(id))) {
    return cache;
  }

  const filepathSeps = [PROJECT_PATH];

  if (base) {
    filepathSeps.push(base);
  }

  filepathSeps.push(`${id}.md`);

  let filepath = path.resolve(...filepathSeps);

  try {
    await fs.access(filepath, fs.constants.F_OK);
  } catch {
    filepathSeps.splice(filepathSeps.length - 1, 1, id, "text.md");
    filepath = path.resolve(...filepathSeps);
  }

  const fileContent = await fs.readFile(filepath, "utf8");
  const { data, content } = matter(fileContent);
  const metadata = data as Metadata;
  const result = {
    id,
    metadata,
    gendata: {
      description: metadata.description ? "" : content.slice(20),
    },
    content,
  };

  POSTS_CACHE.set(id, result);

  return result;
}

export async function getAllPosts({
  base,
  desc = true,
}: {
  base: string;
  desc?: boolean;
}): Promise<Post[]> {
  const dirpaths = await getAllPostIDs(base);

  const posts = await Promise.all(
    dirpaths.map((dirpath) =>
      getPostByID(dirpath, { base, preferCache: false }),
    ),
  );
  posts.sort((a, b) => {
    const result =
      a.metadata.create_time.getTime() - b.metadata.create_time.getTime();
    if (desc) {
      return -result;
    }
    return result;
  });

  return posts;
}

export async function getLatestPosts({
  base,
  limit = 10,
}: {
  base: string;
  limit?: number;
}) {
  const posts = await getAllPosts({ base });
  return posts.slice(0, limit);
}
