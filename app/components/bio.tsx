import type { ReactNode } from "react";

type ProfileItemProps = {
  icon: ReactNode;
  children: ReactNode;
};

const iconClass = "h-6 w-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round]";

function ProfileItem({ icon, children }: ProfileItemProps) {
  return (
    <li className="grid grid-cols-[1.75rem_1fr] items-start gap-3.5">
      <span className="mt-0.5 text-[var(--text-kicker)]" aria-hidden="true">
        {icon}
      </span>
      <p className="text-[0.94rem] leading-6 text-[var(--text-secondary)]">{children}</p>
    </li>
  );
}

const socialLinks = [
  {
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.5 9.5 0 0 1 12 6.82a9.5 9.5 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M5.25 3.5A1.75 1.75 0 1 1 5.25 7a1.75 1.75 0 0 1 0-3.5ZM3.75 8.5h3v11.75h-3V8.5Zm5.25 0h2.88v1.6h.04c.4-.76 1.38-1.97 2.84-1.97 3.04 0 3.6 2 3.6 4.6v7.52h-3v-6.67c0-1.59-.03-3.63-2.21-3.63-2.22 0-2.56 1.73-2.56 3.52v6.78H9V8.5Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} strokeWidth="2" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
  {
    label: "Resume",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} strokeWidth="2" aria-hidden="true">
        <path d="M6 2.75h8l4 4v14.5H6z" />
        <path d="M14 3v4h4M9 12h6M9 15.5h6" />
      </svg>
    ),
  },
];

const Bio = () => {
  return (
    <section className="mx-auto mt-7 w-full max-w-[22rem]" aria-labelledby="profile-name">
      <h1
        id="profile-name"
        className="text-center text-[2.25rem] font-semibold leading-none tracking-[-0.045em] text-[var(--brand)] sm:text-[2.5rem]"
      >
        Asis Paudel
      </h1>
      <p className="mt-3.5 text-center text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-kicker)]">
        Software Engineer
      </p>
      <p className="mt-6 text-[0.98rem] leading-7 text-[var(--text-secondary)]">
        I build thoughtful software that helps products run smarter and businesses grow faster.
      </p>

      <div className="my-6 h-px bg-[var(--line-soft)]" />

      <ul className="space-y-[1.15rem]">
        <ProfileItem
          icon={
            <svg viewBox="0 0 24 24" className={iconClass} strokeWidth="2">
              <path d="m8 7-4 5 4 5M16 7l4 5-4 5M14 4l-4 16" />
            </svg>
          }
        >
          6+ years building scalable systems across AI, IoT, and cloud platforms
        </ProfileItem>
        <ProfileItem
          icon={
            <svg viewBox="0 0 24 24" className={iconClass} strokeWidth="2">
              <path d="m12 2 8 4.5v10L12 21l-8-4.5v-10zM4 6.5l8 4.5 8-4.5M12 11v10" />
            </svg>
          }
        >
          Experience with real-time data, APIs, microservices, and AI tooling
        </ProfileItem>
        <ProfileItem
          icon={
            <svg viewBox="0 0 24 24" className={iconClass} strokeWidth="2">
              <circle cx="9" cy="8" r="3" />
              <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19M16 5.5a3 3 0 0 1 0 5.8M17 13.5a4.5 4.5 0 0 1 3.5 4.4V19" />
            </svg>
          }
        >
          I care about clean code, great UX, and measurable impact
        </ProfileItem>
        <ProfileItem
          icon={
            <svg viewBox="0 0 24 24" className={iconClass} strokeWidth="2">
              <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          }
        >
          Based in Nepal<br />Open to remote opportunities
        </ProfileItem>
      </ul>

      <div className="mb-5 mt-6 h-px bg-[var(--line-soft)]" />

      <nav className="flex items-center justify-between gap-3" aria-label="Social links">
        {socialLinks.map(({ label, icon }) => (
          <a
            key={label}
            href="#"
            aria-label={`${label} (coming soon)`}
            onClick={(event) => event.preventDefault()}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--text-secondary)] hover:-translate-y-1 hover:border-[var(--brand)] hover:text-[var(--brand)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
          >
            {icon}
          </a>
        ))}
      </nav>
    </section>
  );
};

export default Bio;
