import { lazy, Suspense } from "react";

const DancingAvatarSceneImpl = lazy(async () => {
  const module = await import("./dancing-avatar-scene-impl");
  return { default: module.DancingAvatarSceneImpl };
});

export function DancingAvatarScene() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[22rem] w-full place-items-center rounded-[1.6rem] border border-[var(--line-soft)] bg-[radial-gradient(circle_at_50%_28%,rgba(141,162,255,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] text-sm text-[var(--text-muted)]">
          Warming up the dance floor…
        </div>
      }
    >
      <DancingAvatarSceneImpl />
    </Suspense>
  );
}
