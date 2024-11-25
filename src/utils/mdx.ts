import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/post";
import rehypePrettyCode from "rehype-pretty-code";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

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
      content,
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

export const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
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
