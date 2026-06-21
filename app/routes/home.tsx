import {
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
  type MouseEventHandler,
} from "react";
import { Link } from "react-router";

import type { Route } from "./+types/home";
import { AvatarPortrait } from "~/components/avatar-portrait";
import { DetailModal } from "~/components/detail-modal";
import { ExperienceSection } from "~/components/experience-section";
import {
  controlPillClass,
  menuPillClass,
  navLinkClass,
} from "~/components/portfolio-ui";
import { ProjectsSection } from "~/components/projects-section";
import { PersonalProjectsSection } from "~/components/personal-projects-section";
import {
  articleItems,
  experienceItems,
  personalProjectItems,
  projectItems,
  type PortfolioItem,
} from "~/data/portfolio";
import Bio from "~/components/bio";

type Theme = "light" | "dark";
type FocusVector = { x: number; y: number };

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Asis Paudel | Personal Website" },
    {
      name: "description",
      content:
        "Interactive personal website for Asis Paudel with a cursor-aware avatar, experience, projects, articles, and light/dark themes.",
    },
  ];
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");
  const [soundOn, setSoundOn] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isAvatarHappy, setIsAvatarHappy] = useState(false);
  const [focus, setFocus] = useState<FocusVector>({ x: 0, y: 0 });
  const [motion, setMotion] = useState({
    eyeX: 0,
    eyeY: 0,
    headX: 0,
    headY: 0,
  });

  const pointerTarget = useRef<FocusVector>({ x: 0, y: 0 });
  const scrollInfluence = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const allItems = useMemo(
    () => [...experienceItems, ...projectItems, ...personalProjectItems, ...articleItems],
    [],
  );

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme;
    if (currentTheme === "light" || currentTheme === "dark") {
      setTheme(currentTheme);
      return;
    }

    document.documentElement.dataset.theme = "dark";
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("asis-theme", theme);
  }, [theme]);

  useEffect(() => {
    let frame = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.42;
      pointerTarget.current = {
        x: Math.max(-1, Math.min(1, x * 2.1)),
        y: Math.max(-1, Math.min(1, y * 2.1)),
      };
    };

    const handlePointerLeave = () => {
      pointerTarget.current = { x: 0, y: 0 };
    };

    const handleScroll = () => {
      const hero = Math.min(window.scrollY / Math.max(window.innerHeight * 0.9, 1), 1);
      scrollInfluence.current = hero;
    };

    const loop = () => {
      const time = Date.now() / 1000;
      const idleX = Math.sin(time * 0.8) * 0.06;
      const idleY = Math.cos(time * 0.65) * 0.04;
      const targetX = pointerTarget.current.x + focus.x * 0.55 + idleX;
      const targetY = pointerTarget.current.y + focus.y * 0.55 + idleY + scrollInfluence.current * 0.08;

      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      setMotion({
        eyeX: currentX * 0.85,
        eyeY: currentY * 0.8,
        headX: currentX * 0.28,
        headY: currentY * 0.2 + scrollInfluence.current * 0.14,
      });

      frame = window.requestAnimationFrame(loop);
    };

    handleScroll();
    loop();
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [focus.x, focus.y]);

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedItem]);

  const playHoverSound = useEffectEvent(() => {
    if (!soundOn) {
      return;
    }

    const AudioContextConstructor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextConstructor) {
      return;
    }

    const context = audioContextRef.current ?? new AudioContextConstructor();
    audioContextRef.current = context;

    if (context.state === "suspended") {
      void context.resume();
    }

    const now = context.currentTime;
    const tap = (delay: number, frequency: number, gainValue: number) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequency, now + delay);
      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.exponentialRampToValueAtTime(gainValue, now + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.12);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now + delay);
      oscillator.stop(now + delay + 0.14);
    };

    tap(0, 320, 0.018);
    tap(0.06, 240, 0.015);
  });

  const handleInteractiveHover = (vector: FocusVector): MouseEventHandler<HTMLElement> => {
    return () => {
      setFocus(vector);
      setIsAvatarHappy(true);
      playHoverSound();
    };
  };

  const handleInteractiveLeave: MouseEventHandler<HTMLElement> = () => {
    setFocus({ x: 0, y: 0 });
    setIsAvatarHappy(false);
  };

  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
      <header className="relative z-20 mx-auto w-full max-w-[1500px] px-4 pb-4 pt-5 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <Link
            to="/"
            className="text-[1.55rem] font-bold leading-none tracking-[-0.05em] text-[var(--brand)] hover:text-[#a7b7ff] sm:text-[1.75rem]"
          >
            Asis Paudel
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-6">
            <a className={navLinkClass} href="#experience">
              Experience
            </a>
            <a className={navLinkClass} href="#projects">
              Projects
            </a>
            <a className={navLinkClass} href="#personal-projects">
              Personal
            </a>
            <a className={navLinkClass} href="#articles">
              Articles
            </a>
            <a className={navLinkClass} href="#contact">
              Contact
            </a>
            <a
              className={menuPillClass}
              href="/asis-paudel-resume.txt"
              download
              onMouseEnter={handleInteractiveHover({ x: 0.35, y: -0.1 })}
              onMouseLeave={handleInteractiveLeave}
            >
              Download Resume
            </a>
            <button
              type="button"
              className={controlPillClass}
              onClick={() => setSoundOn((value) => !value)}
            >
              {soundOn ? "Sound On" : "Sound Off"}
            </button>
            <button
              type="button"
              className={controlPillClass}
              onClick={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </nav>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid w-full max-w-[1500px] gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[minmax(340px,390px)_minmax(0,1fr)] lg:gap-10">
        <aside className="rounded-3xl border border-[var(--line-soft)] bg-[var(--sidebar-bg)] px-6 py-9 sm:px-8 lg:sticky lg:top-6 lg:min-h-[calc(100vh-3rem)] lg:self-start lg:rounded-none lg:border-y-0 lg:px-8 lg:py-10">
          <AvatarPortrait
            eyeX={motion.eyeX}
            eyeY={motion.eyeY}
            headX={motion.headX}
            headY={motion.headY}
            happy={isAvatarHappy}
          />
          <Bio />
        </aside>
        <div className="space-y-5">
          <ExperienceSection
            items={experienceItems}
            onSelectItem={setSelectedItem}
            onHover={handleInteractiveHover({ x: 0.24, y: -0.06 })}
            onLeave={handleInteractiveLeave}
          />

          <ProjectsSection
            items={projectItems}
            onSelectItem={setSelectedItem}
            onHover={handleInteractiveHover({ x: 0.32, y: 0.08 })}
            onLeave={handleInteractiveLeave}
          />

          <PersonalProjectsSection
            items={personalProjectItems}
            onSelectItem={setSelectedItem}
            onHover={handleInteractiveHover({ x: 0.28, y: 0.16 })}
            onLeave={handleInteractiveLeave}
          />

          <section
            id="contact"
            className="rounded-[2rem] border border-[var(--line-soft)] bg-[var(--card-sheen)] p-5 shadow-[var(--shadow-card)] sm:p-6"
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--text-kicker)]">
              Contact
            </p>
            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  If the work needs to feel polished and technically grounded, we
                  should talk.
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  This fresh starter is structured so we can now replace every bit
                  of placeholder content with your real story without touching the
                  main interaction system.
                </p>
              </div>
              <a className={`${menuPillClass} self-start md:self-auto`} href="mailto:asis@example.com">
                asis@example.com
              </a>
            </div>
          </section>
        </div>
      </section>

      {selectedItem ? (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          relatedCount={allItems.length}
        />
      ) : null}
    </main>
  );
}
