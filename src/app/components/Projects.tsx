import MayaDealsPreview from "./MayaDealsPreview";
import ProjectRow from "./ProjectRow";
import { getSiteData } from "@/lib/content";

export default async function Projects() {
  const { projects, content } = await getSiteData();
  const featured = projects.find((project) =>
    /^https?:\/\/(?:www\.)?maya\.ph\/deals\/?(?:[?#].*)?$/i.test(project.href)
  );
  const others = projects.filter((project) => project !== featured);

  return (
    <section id="projects" aria-labelledby="work-title" className="border-y border-border bg-surface px-6 py-10 md:py-16">
      <div className="mx-auto max-w-[1240px]">
        <h2 id="work-title" className="mb-6 text-3xl font-semibold tracking-tight md:mb-8 md:text-5xl">
          Selected work
        </h2>
        {featured && (
          <article className="mb-8 overflow-hidden rounded-2xl border border-border-soft bg-bg lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="flex flex-col items-start justify-center p-6 sm:p-9 lg:p-11">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent-text">Case study</p>
              <h3 className="mt-4 text-4xl leading-[1.02] font-bold tracking-tight sm:text-5xl">
                {featured.title}
              </h3>
              <p className="mt-5 max-w-prose text-lg leading-relaxed text-text">{content["work.maya_outcome"]}</p>
              <details className="mt-5 max-w-prose text-muted">
                <summary className="w-fit cursor-pointer text-sm font-medium text-text underline decoration-border-strong underline-offset-4">
                  Implementation details
                </summary>
                <p className="mt-3 leading-relaxed">{featured.description}</p>
              </details>
              <p className="mt-6 font-mono text-xs text-dim">{featured.tags.join(" · ")}</p>
              <a href={featured.href} className="mt-5 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-ink">
                Visit Maya Deals
              </a>
            </div>
            <MayaDealsPreview />
          </article>
        )}
        <div className="divide-y divide-border border-y border-border">
          {others.map((project) => <ProjectRow key={project.href} project={project} />)}
        </div>
      </div>
    </section>
  );
}
