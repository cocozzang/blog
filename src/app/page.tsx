import { getAllPosts } from "@/utils/mdx";
import { Post } from "@/types/post";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "coco's Blog",
  description: "개발과 일상의 이야기를 담아내는 공간입니다.",
  openGraph: {
    title: "coco's Blog",
    description: "개발과 일상의 이야기를 담아내는 공간입니다.",
    type: "website",
  },
};

export default async function Home() {
  const posts = await getAllPosts();
  const recentPosts = posts.length > 3 ? posts.slice(0, 3) : posts;

  return (
    <div className="space-y-8">
      <section className="text-center py-20 space-y-4">
        <h1 className="text-4xl font-bold overflow-hidden whitespace-nowrap">
          Welcome to coco&apos;s Blog
        </h1>
        <p
          className="text-xl text-gray-600 overflow-hidden whitespace-nowrap"
          style={{ animationDelay: "1s" }}
        >
          개발과 일상의 이야기를 담아내는 공간입니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">최근 포스트</h2>
        <div className="grid gap-6">
          {recentPosts.map((post: Post) => (
            <article
              key={post.slug}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:text-blue-600"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-2">{post.excerpt}</p>
              <time className="text-sm text-gray-500">
                {formatDate(post.date)}
              </time>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
