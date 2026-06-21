import type { MouseEventHandler } from "react";

import type { PortfolioItem } from "~/data/portfolio";

import { SectionHeader, tagClass } from "./portfolio-ui";

export function PersonalProjectsSection({
  items,
  onSelectItem,
  onHover,
  onLeave,
}: {
  items: PortfolioItem[];
  onSelectItem: (item: PortfolioItem) => void;
  onHover: MouseEventHandler<HTMLButtonElement>;
  onLeave: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <section id="personal-projects" className="px-1 sm:px-2">
      <SectionHeader kicker="Personal Projects" />

      <div className="mt-3 grid gap-2 border-l border-[var(--line-soft)] pl-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="group w-full rounded-2xl border border-[var(--line-soft)] bg-[var(--card-sheen)] px-4 py-4 text-left shadow-[var(--shadow-card)] transition hover:border-[var(--line-strong)] sm:px-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
              <button
                type="button"
                className="text-left"
                onClick={() => onSelectItem(item)}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
              >
                <p className="text-[0.68rem] font-semibold tracking-[0.18em]">
                  <span className="uppercase text-[var(--text-primary)]">
                    {item.title}
                  </span>
                  {item.company ? (
                    <>
                      <span className="px-2 text-[0.82rem] text-[var(--text-secondary)]">
                        •
                      </span>
                      <span className="tracking-[0.06em] text-[var(--text-muted)]">
                        {item.company}
                      </span>
                    </>
                  ) : null}
                </p>
              </button>
              {item.externalUrl ? (
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-kicker)] hover:-translate-y-px hover:text-[var(--text-primary)]"
                >
                  {item.externalLabel ?? "View project"}
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 fill-none stroke-current"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M7 5h8v8M15 5 6 14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : null}
            </div>
            <button
              type="button"
              className="block w-full text-left"
              onClick={() => onSelectItem(item)}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              {item.summary ? (
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
                  {item.summary}
                </p>
              ) : null}
            </button>
            {item.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className={tagClass}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
