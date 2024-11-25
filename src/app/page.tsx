import { getAllPosts } from "@/utils/mdx";
import { Post } from "@/types/post";
import { formatDate } from "@/utils/date";
import Link from "next/link";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8">
      <section className="text-center py-20 space-y-4">
        <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
        <p className="text-xl text-gray-600">
          개발 여정을 기록하는 공간입니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">최근 포스트</h2>
        <div className="grid gap-6">
          {posts.map((post: Post) => (
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
