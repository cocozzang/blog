import { MDXComponents } from "mdx/types";
import CodeBlock from "./CodeBlock";

const components: MDXComponents = {
  pre: ({ children, ...props }) => (
    <pre {...props} className="relative">
      {children}
    </pre>
  ),
  code: (props) => {
    return <CodeBlock {...props} />;
  },
};

export default components;
