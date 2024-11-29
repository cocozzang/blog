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
