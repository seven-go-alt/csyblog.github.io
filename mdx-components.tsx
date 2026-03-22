import type { MDXComponents } from 'mdx/types';
import { codeToHtml } from 'shiki';
import { Callout } from '@/components/mdx/Callout';
import { CopyButton } from '@/components/mdx/CopyButton';

const slugify = (text: string) => {
  if (!text) return Math.random().toString(36).substring(2, 9);
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
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

          // Render the Shiki HTML but inject the CopyButton into the wrapper.
          return (
            <div className="relative group not-prose my-6 font-mono text-sm leading-relaxed rounded-xl overflow-hidden shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
              <CopyButton text={code as string} />
              <div 
                dangerouslySetInnerHTML={{ __html: html }} 
                className="[&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:!bg-[#0d1117]"
              />
            </div>
          );
        }
      } catch (e) {
        // process fallback
      }
      return <pre {...props} className="p-4 rounded-xl bg-[#0d1117] text-white overflow-x-auto my-6 shadow-sm ring-1 ring-gray-800">{children}</pre>;
    },
  };
}
