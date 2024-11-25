import { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 포스트 목록",
  description: "모든 블로그 포스트를 확인할 수 있습니다.",
};

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

async function getAllPosts(): Promise<Post[]> {
  // 임시 데이터
  return [
    {
      slug: "first-post",
      title: "첫 번째 블로그 포스트",
      date: "2023-12-20",
      excerpt: "블로그를 시작하며 작성하는 첫 번째 포스트입니다.",
    },
  ];
}

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">모든 포스트</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post.slug} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">
              <a href={`/posts/${post.slug}`} className="hover:text-blue-600">
                {post.title}
              </a>
            </h2>
            <p className="text-gray-600 mb-2">{post.excerpt}</p>
            <time className="text-sm text-gray-500">{post.date}</time>
          </article>
        ))}
      </div>
    </div>
  );
}
