"use client";

import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

interface CategoryListProps {
  categories: { name: string; count: number }[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleCategoryClick = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`/posts?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">카테고리</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryClick(null)}
          className={clsx(
            "px-3 py-1 rounded-full text-sm text-black",
            !currentCategory
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200",
          )}
        >
          전체
        </button>
        {categories.map(({ name, count }) => (
          <button
            key={name}
            onClick={() => handleCategoryClick(name)}
            className={clsx(
              "px-3 py-1 rounded-full text-sm text-black",
              currentCategory === name
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200",
            )}
          >
            {name} ({count})
          </button>
        ))}
      </div>
    </div>
  );
}
