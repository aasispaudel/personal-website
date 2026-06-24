import { useState, type MouseEventHandler } from "react";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleItems = isExpanded ? items : items.slice(0, 2);

  return (
    <section id="projects" className="px-1 sm:px-2">
      <SectionHeader kicker="Ideas I Helped Ship" />

      <div className="mt-3 divide-y divide-[var(--line-soft)]">
        {visibleItems.map((item) => (
          <PortfolioListItem
            key={item.id}
            item={item}
            onClick={() => onSelectItem(item)}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
          />
        ))}
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
