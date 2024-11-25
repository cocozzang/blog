import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">포스트를 찾을 수 없습니다</h2>
      <p className="text-gray-600 mb-4">
        요청하신 포스트가 존재하지 않거나 삭제되었을 수 있습니다.
      </p>
      <Link
        href="/posts"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        모든 포스트 보기
      </Link>
    </div>
  );
}
