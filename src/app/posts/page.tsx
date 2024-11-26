import {
  getAllPosts,
  getCategoriesWithCount,
  getTagsWithCount,
} from "@/utils/mdx";
import SearchBar from "@/components/SearchBar";
import CategoryList from "@/components/CategoryList";
import TagList from "@/components/TagList";
import PostList from "@/components/PostList";

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">블로그 포스트</h1>
      <div className="space-y-6 mb-8">
        <SearchBar />
        <CategoryList categories={getCategoriesWithCount(posts)} />
        <TagList tags={getTagsWithCount(posts)} />
      </div>

      <PostList initialPosts={posts} />
    </div>
  );
}
