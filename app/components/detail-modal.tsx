import type { PortfolioItem } from "~/data/portfolio";

import { controlPillClass, tagClass } from "./portfolio-ui";

export function DetailModal({
  item,
  onClose,
  relatedCount,
}: {
  item: PortfolioItem;
  onClose: () => void;
  relatedCount: number;
}) {
  const snapshot = item.snapshot ?? {
    role: item.eyebrow,
    team: `${relatedCount} related items`,
    scope: item.tags ?? [item.type],
    languages: ["—"],
    technology: item.tags ?? ["—"],
  };

  const snapshotRows = [
    ["Role", snapshot.role],
    ["Team", snapshot.team],
    ["Scope", snapshot.scope.join(", ")],
    ["Languages", snapshot.languages.join(", ")],
    ["Technology", snapshot.technology.join(", ")],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay)] p-4 backdrop-blur-lg sm:p-6">
      <button
        type="button"
        aria-label="Close detail view"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <div className="relative flex h-[min(80vh,860px)] w-[min(80vw,1100px)] flex-col overflow-hidden rounded-[2.2rem] border border-[var(--line-strong)] bg-[var(--modal-bg)] shadow-[var(--shadow-modal)]">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line-soft)] px-5 py-5 sm:px-7">
          <div className="max-w-3xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-kicker)]">
              {item.type}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {item.summary ??
                "This detail view is designed to hold the long version of the story: richer writeups, screenshots, architectural choices, and all the context the homepage intentionally leaves out."}
            </p>
          </div>
          <button type="button" className={controlPillClass} onClick={onClose}>
            Close
          </button>
        </div>

        <div className="grid min-h-0 flex-1 gap-0 overflow-hidden lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="overlay-scrollbar min-h-0 overflow-y-auto px-5 py-5 sm:px-7">
            {item.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className={tagClass}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="mt-6 space-y-4">
              <ul className="max-w-3xl space-y-2">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="ml-5 list-disc text-sm leading-8 text-[var(--text-secondary)] sm:text-[0.98rem]"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="rounded-[1.6rem] border border-[var(--line-soft)] bg-[var(--card-sheen)] p-5 pt-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--text-kicker)]">
                  Case Study
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  This area is ready for long-form case studies, visual references,
                  architecture notes, metrics, and all the richer material that
                  would clutter the main page if shown inline.
                </p>
              </div>
            </div>
          </div>

          <aside className="border-t border-[var(--line-soft)] bg-[var(--sidebar-bg)] px-5 py-5 lg:border-l lg:border-t-0">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-kicker)]">
              Snapshot
            </p>
            <dl className="mt-4 space-y-4 text-sm text-[var(--text-secondary)]">
              {snapshotRows.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                    {label}
                  </dt>
                  <dd className="mt-1 font-medium leading-6 text-[var(--text-primary)]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}
