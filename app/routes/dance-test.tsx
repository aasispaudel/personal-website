import { Link } from "react-router";

import { DancingAvatarScene } from "~/components/dancing-avatar-scene";
import { controlPillClass, menuPillClass } from "~/components/portfolio-ui";

export function meta() {
  return [
    { title: "Dance Test | Asis Paudel" },
    {
      name: "description",
      content: "A lightweight Three.js dancing avatar experiment for Asis Paudel.",
    },
  ];
}

export default function DanceTest() {
  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay)] p-4 backdrop-blur-lg sm:p-6">
        <div className="relative flex h-[min(86vh,860px)] w-[min(92vw,1100px)] flex-col overflow-hidden rounded-[2.2rem] border border-[var(--line-strong)] bg-[var(--modal-bg)] shadow-[var(--shadow-modal)]">
          <div className="flex items-start justify-between gap-4 border-b border-[var(--line-soft)] px-5 py-5 sm:px-7">
            <div className="max-w-3xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-kicker)]">
                Three.js experiment
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
                Dancing avatar test
              </h1>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                A tiny 3D version of the current cartoon avatar, built from simple
                shapes so it stays playful, fast, and easy to tune.
              </p>
            </div>
            <Link to="/" className={controlPillClass}>
              Close
            </Link>
          </div>

          <div className="grid min-h-0 flex-1 gap-0 overflow-hidden lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="overlay-scrollbar min-h-0 overflow-y-auto px-5 py-5 sm:px-7">
              <DancingAvatarScene />

              <div className="mt-5 rounded-[1.6rem] border border-[var(--line-soft)] bg-[var(--card-sheen)] p-5 pt-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--text-kicker)]">
                  Notes
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
                  This is intentionally model-free: no GLB files, no texture assets,
                  just Three.js primitives with a dance loop. If we like the direction,
                  we can later make it react to hover, sound mode, or portfolio clicks.
                </p>
              </div>
            </div>

            <aside className="border-t border-[var(--line-soft)] bg-[var(--sidebar-bg)] px-5 py-5 lg:border-l lg:border-t-0">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-kicker)]">
                Snapshot
              </p>
              <dl className="mt-4 space-y-4 text-sm text-[var(--text-secondary)]">
                <div>
                  <dt className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                    Route
                  </dt>
                  <dd className="mt-1 font-medium text-[var(--text-primary)]">
                    /dance-test
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                    Engine
                  </dt>
                  <dd className="mt-1 font-medium text-[var(--text-primary)]">
                    Three.js primitives
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                    Mood
                  </dt>
                  <dd className="mt-1 font-medium text-[var(--text-primary)]">
                    Cute hoodie bounce
                  </dd>
                </div>
              </dl>

              <Link to="/" className={`${menuPillClass} mt-6 w-full`}>
                Back home
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
