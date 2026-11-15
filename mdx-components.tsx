import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import { codeToHtml } from 'shiki';
import { Callout } from '@/components/mdx/Callout';
import { CopyButton } from '@/components/mdx/CopyButton';

type CodeElement = ReactElement<{ children?: ReactNode; className?: string }>;

function extractCode(children: CodeElement['props']['children']): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map((child) => String(child ?? '')).join('');
  return String(children ?? '');
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
    pre: async ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => {
      const codeElement = children as CodeElement | undefined;

      if (codeElement?.type === 'code') {
        try {
          const code = extractCode(codeElement.props.children);
          const language = codeElement.props.className?.replace('language-', '') || 'text';

          const html = await codeToHtml(code, {
            lang: language,
            theme: 'github-dark',
          });

          // Render the Shiki HTML but inject the CopyButton into the wrapper.
          return (
            <div className="relative group not-prose my-6 font-mono text-sm leading-relaxed rounded-xl overflow-hidden shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
              <CopyButton text={code} />
              <div
                dangerouslySetInnerHTML={{ __html: html }}
                className="[&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:!bg-[#0d1117]"
              />
            </div>
          );
        } catch {
          // fall through to the plain <pre> below
        }
      }

      return <pre {...props} className="p-4 rounded-xl bg-[#0d1117] text-white overflow-x-auto my-6 shadow-sm ring-1 ring-gray-800">{children}</pre>;
    },
  };
}
