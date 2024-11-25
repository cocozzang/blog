import { getAllPosts } from "@/utils/mdx";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

interface SearchParams {
  q?: string;
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q } = await searchParams;
  const posts = await getAllPosts();
  const searchTerm = q?.toLowerCase();

  const filteredPosts = searchTerm
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm),
      )
    : posts;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">블로그 포스트</h1>
      <SearchBar />

      {searchTerm && (
        <p className="mb-4 text-gray-600">
          검색결과: {filteredPosts.length}개의 포스트를 찾았습니다.
        </p>
      )}

      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">
              <Link
                href={`/posts/${post.slug}`}
                className="hover:text-blue-600"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-2">{post.excerpt}</p>
            <time className="text-sm text-gray-500">
              {formatDate(post.date)}
            </time>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
