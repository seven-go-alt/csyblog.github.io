import type { MDXComponents } from 'mdx/types';
import { codeToHtml } from 'shiki';

const slugify = (text: string) => {
  if (!text) return Math.random().toString(36).substring(2, 9);
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: ({ children, ...props }) => {
      const text = Array.isArray(children) ? children.join('') : children?.toString() || '';
      return <h2 id={slugify(text)} {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }) => {
      const text = Array.isArray(children) ? children.join('') : children?.toString() || '';
      return <h3 id={slugify(text)} {...props}>{children}</h3>;
    },
    pre: async ({ children, ...props }: any) => {
      try {
        const codeElement = children;
        if (codeElement?.type === 'code') {
          const code = codeElement.props.children;
          const language = codeElement.props.className?.replace('language-', '') || 'text';
          const html = await codeToHtml(code as string, {
            lang: language,
            theme: 'github-dark',
          });
          return <div dangerouslySetInnerHTML={{ __html: html }} />;
        }
      } catch (e) {
        // fallback
      }
      return <pre {...props}>{children}</pre>;
    },
  };
}
