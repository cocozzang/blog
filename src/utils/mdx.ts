import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/post";
import rehypePrettyCode from "rehype-pretty-code";
import type {} from "next-mdx-remote";
import { SerializeOptions } from "@/types/mdx";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

/** @type {import('rehype-pretty-code').Options} */
export const mdxOptions: SerializeOptions = {
  parseFrontmatter: false,
  mdxOptions: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word"];
          },
        },
      ],
    ],
  },
};

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      category: data.category || "Uncategorized",
      tags: data.tags || [],
      content: content, // 원본 MDX 문자열을 저장
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const files = fs.readdirSync(postsDirectory);
    const posts = await Promise.all(
      files
        .filter((filename) => filename.endsWith(".mdx"))
        .map(async (filename) => {
          const slug = filename.replace(/\.mdx$/, "");
          const post = await getPostBySlug(slug);
          return post;
        }),
    );

    // Filter out any null posts and sort by date
    return posts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
}

export function getCategoriesWithCount(posts: Post[]) {
  const categories = posts.reduce(
    (acc, post) => {
      const category = post.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(categories)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getTagsWithCount(posts: Post[]) {
  const tags = posts.reduce(
    (acc, post) => {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(tags)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
