import type { MouseEventHandler } from "react";

import type { PortfolioItem } from "~/data/portfolio";

import { SectionHeader } from "./portfolio-ui";

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
          <button
            key={item.id}
            type="button"
            className="group w-full rounded-xl border border-transparent bg-transparent px-3 py-3 text-left transition hover:border-[var(--line-soft)] hover:bg-[var(--badge-bg)]"
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
            {item.summary ? (
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                {item.summary}
              </p>
            ) : null}
          </button>
        ))}
      </div>
    </section>
  );
}
