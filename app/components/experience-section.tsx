import { useState, type MouseEventHandler } from "react";

import type { PortfolioItem } from "~/data/portfolio";

import { PortfolioListItem, SectionHeader } from "./portfolio-ui";

export function ExperienceSection({
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
    <section id="experience" className="px-1 py-2 sm:px-2 mt-2">
      <SectionHeader kicker="Work Experience" />

      <div className="divide-y divide-[var(--line-soft)] mt-2">
        {visibleItems.map((item, index) => (
          <PortfolioListItem
            key={`${item.id}-${index}`}
            item={item}
            onClick={() => onSelectItem(item)}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
          />
        ))}
      </div>

      {items.length > 2 ? (
        <div className="mt-1 mb-2 flex justify-start">
          <button
            type="button"
            className="text-sm font-medium text-[var(--text-kicker)] transition-opacity hover:opacity-75"
            onClick={() => setIsExpanded((current) => !current)}
          >
            {isExpanded ? "See less" : `See more (${items.length - 2})`}
          </button>
        </div>
      ) : null}
    </section>
  );
}
