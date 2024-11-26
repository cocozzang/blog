"use client";

import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import Link from "next/link";
import { formatDate } from "@/utils/date";
import { useSearchParams } from "next/navigation";

interface PostListProps {
  initialPosts: Post[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q")?.toLowerCase();
    const category = searchParams.get("category");
    const tags = searchParams.get("tags")?.split(",") || [];

    let filtered = [...posts];

    // 카테고리 필터링
    if (category) {
      filtered = filtered.filter((post) => post.category === category);
    }

    // 태그 필터링
    if (tags.length > 0) {
      filtered = filtered.filter((post) =>
        tags.every((tag) => post.tags.includes(tag)),
      );
    }

    // 검색어 필터링
    if (q) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q),
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchParams]);

  return (
    <>
      {searchParams.get("q") && (
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
            <div className="flex items-center gap-4">
              <time className="text-sm text-gray-500">
                {formatDate(post.date)}
              </time>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                {post.category}
              </span>
              <div className="flex gap-1">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-sm text-blue-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}
