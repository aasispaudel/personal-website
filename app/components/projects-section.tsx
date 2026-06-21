import type { MouseEventHandler } from "react";

import type { PortfolioItem } from "~/data/portfolio";

import { PortfolioListItem, SectionHeader } from "./portfolio-ui";

export function ProjectsSection({
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
    <section id="projects" className="px-1 sm:px-2">
      <SectionHeader kicker="Ideas I Helped Ship" />

      <div className="mt-3 divide-y divide-[var(--line-soft)]">
        {items.map((item) => (
          <PortfolioListItem
            key={item.id}
            item={item}
            onClick={() => onSelectItem(item)}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
          />
        ))}
      </div>
    </section>
  );
}
