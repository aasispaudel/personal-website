import { useState, type MouseEventHandler } from "react";

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
  onHover: MouseEventHandler<HTMLElement>;
  onLeave: MouseEventHandler<HTMLElement>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleItems = isExpanded ? items : items.slice(0, 2);

  return (
    <section id="personal-projects" className="px-1 sm:px-2">
      <SectionHeader kicker="Personal Projects" />

      <div className="mt-3 grid gap-2 border-l border-[var(--line-soft)] pl-4">
        {visibleItems.map((item) => {
          const cardContent = (
            <>
              <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
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

                {item.externalUrl ? (
                  <span
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-kicker)] transition group-hover:-translate-y-px group-hover:text-[var(--text-primary)]"
                    aria-hidden="true"
                  >
                    {item.externalLabel ?? "View project"}
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4 fill-none stroke-current transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="M7 5h8v8M15 5 6 14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                ) : null}
              </div>

              {item.summary ? (
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
                  {item.summary}
                </p>
              ) : null}

              {item.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className={tagClass}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </>
          );

          return (
            <article
              key={item.id}
              className="group w-full rounded-2xl border border-[var(--line-soft)] bg-[var(--card-sheen)] text-left shadow-[var(--shadow-card)] transition hover:border-[var(--line-strong)] sm:px-0"
            >
              {item.externalUrl ? (
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block cursor-pointer px-4 py-4 sm:px-5"
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                >
                  {cardContent}
                </a>
              ) : (
                <button
                  type="button"
                  className="block w-full cursor-pointer px-4 py-4 text-left sm:px-5"
                  onClick={() => onSelectItem(item)}
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                >
                  {cardContent}
                </button>
              )}
            </article>
          );
        })}
      </div>

      {items.length > 2 ? (
        <div className="mb-2 mt-1 flex justify-start">
          <button
            type="button"
            className="cursor-pointer text-sm font-medium text-[var(--text-kicker)] transition-opacity hover:opacity-75"
            onClick={() => setIsExpanded((current) => !current)}
          >
            {isExpanded ? "See less" : `See more (${items.length - 2})`}
          </button>
        </div>
      ) : null}
    </section>
  );
}
