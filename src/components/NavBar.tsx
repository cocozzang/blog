import Link from "next/link";

export const NavBar = () => {
  return (
    <header className="border-b">
      <div className="max-w-4xl mx-auto p-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Coco&apos;s Blog
          </Link>
          <div className="space-x-4">
            <Link href="/posts" className="hover:text-gray-600">
              Posts
            </Link>
            <Link href="/about" className="hover:text-gray-600">
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
