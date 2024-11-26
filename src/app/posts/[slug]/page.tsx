import { getPostBySlug, getAllPosts, mdxOptions } from "@/utils/mdx";
import { formatDate } from "@/utils/date";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import components from "@/components/MDXComponents";
import Link from "next/link";
import { Calendar, Folder } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// 정적 경로 생성
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
          <time className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formatDate(post.date)}
          </time>
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4" />
            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
              {post.category}
            </span>
          </div>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <p className="text-gray-600 dark:text-gray-400 mt-4">{post.excerpt}</p>
      </div>

      <hr className="my-8 border-gray-200 dark:border-gray-800" />

      <div className="prose prose-lg dark:prose-invert max-w-none prose-pre:p-0">
        <MDXRemote
          source={post.content.toString()}
          components={components}
          options={mdxOptions}
        />
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-between">
          <Link
            href="/posts"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>←</span> 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </article>
  );
}
