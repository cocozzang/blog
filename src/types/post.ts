export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
}

export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
}
