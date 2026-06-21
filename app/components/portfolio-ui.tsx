import type { MouseEventHandler } from "react";

import type { PortfolioItem } from "~/data/portfolio";

export const navLinkClass =
  "px-[0.2rem] py-[0.35rem] text-[0.95rem] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]";

export const menuPillClass =
  "inline-flex items-center justify-center rounded-full border border-[var(--line-soft)] bg-[var(--badge-bg)] px-4 py-[0.7rem] text-[0.76rem] font-bold uppercase tracking-[0.14em] text-[var(--text-primary)] shadow-[var(--shadow-card)] hover:-translate-y-px hover:border-[var(--line-strong)]";

export const controlPillClass =
  "inline-flex items-center justify-center rounded-full border border-[var(--line-soft)] bg-[var(--badge-bg)] px-4 py-[0.7rem] text-[0.76rem] font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)] hover:-translate-y-px hover:border-[var(--line-strong)] hover:text-[var(--text-primary)]";

export const identityButtonClass =
  "rounded-[1.25rem] border border-[rgba(122,141,212,0.22)] bg-[linear-gradient(180deg,#fff9fb_0%,#ffe4ef_48%,#ffbdd7_100%)] px-[1.15rem] py-[0.9rem] text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#823252] shadow-[inset_0_2px_0_rgba(255,255,255,0.92),inset_0_-5px_0_rgba(235,106,155,0.42),0_14px_26px_rgba(255,128,180,0.24)] hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-[2px] dark:border-[rgba(122,141,212,0.26)] dark:bg-[linear-gradient(180deg,#33407c_0%,#273468_52%,#202957_100%)] dark:text-[#eff3ff] dark:shadow-[inset_0_2px_0_rgba(171,193,255,0.18),inset_0_-5px_0_rgba(13,17,34,0.45),0_14px_24px_rgba(0,0,0,0.28)]";

export const articleCardClass =
  "rounded-[1.7rem] border border-[var(--line-soft)] bg-[var(--card-sheen)] p-5 text-left shadow-[var(--shadow-card)] hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[0_24px_40px_rgba(101,123,194,0.18)]";

export const listItemClass =
  "w-full rounded-[1.15rem] border border-transparent bg-transparent px-[0.9rem] py-[1.35rem] text-left shadow-none hover:-translate-y-px hover:border-[color-mix(in_srgb,var(--line-soft)_82%,transparent)] hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.32),rgba(242,246,255,0.16))] dark:hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(140,161,255,0.04))]";

export const tagClass =
  "rounded-full border border-[var(--line-soft)] bg-[var(--badge-bg)] px-3 py-1 text-[0.7rem] font-medium text-[var(--text-secondary)]";

export function SectionHeader({ kicker }: { kicker: string }) {
  return (
    <div className="mb-px">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-kicker)]">
        <span className="section-kicker-text">{kicker}</span>
      </p>
    </div>
  );
}

export function PortfolioListItem({
  item,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  item: PortfolioItem;
  onClick: () => void;
  onMouseEnter: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <article className={listItemClass}>
      <button
        type="button"
        className="block w-full text-left"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex flex-wrap items-start justify-between gap-1">
          <div>
            {item.company ? (
              <p className="text-[0.68rem] font-semibold tracking-[0.22em]">
                <span className="uppercase">{item.title}</span>
                <span className="px-2 text-[0.82rem] text-[var(--text-secondary)]">
                  •
                </span>
                <span className="tracking-[0.08em] text-[var(--text-muted)]">
                  {item.company}
                </span>
              </p>
            ) : (
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em]">
                {item.title}
              </p>
            )}
          </div>
          {item.period ? (
            <span className="rounded-full border border-[var(--line-soft)] bg-[var(--badge-bg)] px-3 py-1 text-[0.68rem] font-medium text-[var(--text-muted)]">
              {item.period}
            </span>
          ) : null}
        </div>
        {item.summary ? (
          <p className="mt-0.5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
            {item.summary}
          </p>
        ) : null}
      </button>
      {item.externalUrl ? (
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-kicker)] underline decoration-[var(--text-kicker)]/60 underline-offset-4 hover:text-[var(--text-primary)]"
        >
          {item.externalLabel ?? `Visit ${item.title}`}
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
      {item.tags?.length ? (
        <div className={`${item.externalUrl ? "mt-3" : "mt-1"} flex flex-wrap gap-2`}>
          {item.tags.map((tag) => (
            <span key={tag} className={tagClass}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
