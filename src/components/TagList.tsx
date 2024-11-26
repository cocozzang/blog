"use client";

import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

interface TagListProps {
  tags: { name: string; count: number }[];
}

export default function TagList({ tags }: TagListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTags = searchParams.get("tags")?.split(",") || [];

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    if (newTags.length > 0) {
      params.set("tags", newTags.join(","));
    } else {
      params.delete("tags");
    }
    router.push(`/posts?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">태그</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map(({ name, count }) => (
          <button
            key={name}
            onClick={() => handleTagClick(name)}
            className={clsx(
              "px-3 py-1 rounded-full text-sm text-black",
              currentTags.includes(name)
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200",
            )}
          >
            #{name} ({count})
          </button>
        ))}
      </div>
    </div>
  );
}
