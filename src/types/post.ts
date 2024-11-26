import { ReactElement, JSXElementConstructor } from "react";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string | ReactElement<any, string | JSXElementConstructor<any>>;
  category: string;
  tags: string[];
}
