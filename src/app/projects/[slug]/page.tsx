import Link from "next/link";
import { projects } from "@/data/projects";
import { withBasePath } from "@/lib/paths";
import VisionBasedAeb from "@/content/projects/vision-based-aeb.mdx";
import MarkerFreeAgv from "@/content/projects/marker-free-agv.mdx";

const contentMap: Record<string, React.ComponentType> = {
  "vision-based-aeb": VisionBasedAeb,
  "marker-free-agv": MarkerFreeAgv,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const Content = contentMap[slug];

  if (!project) {
    return (
      <div className="site-container section-padding pt-32 text-center">
        <h1 className="font-serif text-3xl text-ink">Project not found</h1>
        <Link href="/#work" className="mt-4 inline-block text-copper">
          Back to work
        </Link>
      </div>
    );
  }

  return (
    <article className="site-container section-padding max-w-3xl pt-32 pb-20">
      <Link
        href="/#work"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-copper"
      >
        ← Back to work
      </Link>

      <span className="font-mono text-xs text-copper">
        {project.period} · {project.tagline}
      </span>
      <h1 className="mt-2 font-serif text-4xl text-ink md:text-5xl">
        {project.title}
      </h1>

      <div className="mt-8 overflow-hidden rounded-2xl border border-light-gray">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBasePath(project.image)}
          alt={project.title}
          className="w-full object-cover"
        />
      </div>

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-ink-muted transition-colors hover:border-copper hover:text-copper"
        >
          View source on GitHub ↗
        </a>
      )}

      {Content ? (
        <div className="mt-10">
          <Content />
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          <p className="text-lg leading-relaxed text-deep-navy/65">{project.description}</p>
        </div>
      )}
    </article>
  );
}
