import {
  getAllPosts,
  getCategoriesWithCount,
  getTagsWithCount,
} from "@/utils/mdx";
import SearchBar from "@/components/SearchBar";
import CategoryList from "@/components/CategoryList";
import TagList from "@/components/TagList";
import PostList from "@/components/PostList";
import { Suspense } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post search",
  description: "포스트 검색",
  openGraph: {
    title: "Post search",
    description: "포스트 검색",
    type: "website",
  },
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="space-y-6 mb-8">
          <SearchBar />
          <CategoryList categories={getCategoriesWithCount(posts)} />
          <TagList tags={getTagsWithCount(posts)} />
        </div>

        <PostList initialPosts={posts} />
      </Suspense>
    </div>
  );
}
