import { CompileOptions } from "@mdx-js/mdx";

export interface SerializeOptions {
  /**
   * Pass-through variables for use in the MDX content
   */
  scope?: Record<string, unknown>;
  /**
   * These options are passed to the MDX compiler.
   * See [the MDX docs.](https://github.com/mdx-js/mdx/blob/master/packages/mdx/index.js).
   */
  mdxOptions?: Omit<CompileOptions, "outputFormat" | "providerImportSource"> & {
    useDynamicImport?: boolean;
  };
  /**
   * Indicate whether or not frontmatter should be parsed out of the MDX. Defaults to false
   */
  parseFrontmatter?: boolean;
}
