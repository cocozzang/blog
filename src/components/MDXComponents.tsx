import { MDXComponents } from "mdx/types";
import CodeBlock from "./CodeBlock";

const components: MDXComponents = {
  pre: ({ children, ...props }) => (
    <pre {...props} className="relative group">
      {children}
    </pre>
  ),
  code: (props) => {
    const isCodeBlock =
      // pre 태그 내부의 code인지 확인
      props.className?.includes("language-") ||
      // 여러 줄 코드인지 확인
      props.children?.toString().includes("\n");

    if (isCodeBlock) {
      return <CodeBlock {...props} />;
    }

    // 인라인 코드
    return (
      <code
        {...props}
        className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-[0.9em] font-normal"
      />
    );
  },
};

export default components;
