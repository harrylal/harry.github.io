import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-serif text-4xl text-deep-navy md:text-5xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 font-serif text-2xl text-deep-navy">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-serif text-xl text-deep-navy">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mt-4 text-base leading-relaxed text-deep-navy/65">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-deep-navy/65">{children}</ul>
    ),
    li: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
    code: ({ children }) => (
      <code className="rounded bg-soft-ivory px-1.5 py-0.5 font-mono text-sm text-electric-blue">
        {children}
      </code>
    ),
    ...components,
  };
}
