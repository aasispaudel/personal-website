import { useRef, useState, type ReactNode } from "react";

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

type SocialLink = {
  label: string;
  icon: ReactNode;
  href?: string;
  copyValue?: string;
  copiedMessage?: string;
};

const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/aasispaudel",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.5 9.5 0 0 1 12 6.82a9.5 9.5 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/asis-paudel-9b145517a/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M5.25 3.5A1.75 1.75 0 1 1 5.25 7a1.75 1.75 0 0 1 0-3.5ZM3.75 8.5h3v11.75h-3V8.5Zm5.25 0h2.88v1.6h.04c.4-.76 1.38-1.97 2.84-1.97 3.04 0 3.6 2 3.6 4.6v7.52h-3v-6.67c0-1.59-.03-3.63-2.21-3.63-2.22 0-2.56 1.73-2.56 3.52v6.78H9V8.5Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    copyValue: "aasispaudelthp2@gmail.com",
    copiedMessage: "Email copied!",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} strokeWidth="2" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/9779840364883",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M12.04 2a9.84 9.84 0 0 0-8.53 14.75L2 22l5.38-1.42A9.98 9.98 0 0 0 12.04 22 10 10 0 0 0 12.04 2Zm0 18.18a8.17 8.17 0 0 1-4.16-1.14l-.3-.18-3.2.84.85-3.11-.2-.32a8.02 8.02 0 0 1-1.24-4.29 8.23 8.23 0 1 1 8.25 8.2Zm4.52-6.16c-.25-.13-1.47-.73-1.7-.81-.23-.09-.4-.13-.56.12-.17.25-.65.81-.8.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23a7.47 7.47 0 0 1-1.38-1.72c-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.16 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.47-.61 1.68-1.19.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    copyValue: "+9779840364883",
    copiedMessage: "Phone number copied!",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} strokeWidth="2" aria-hidden="true">
        <path d="M7.2 3.5 9.6 8 7.8 9.8c1.25 2.55 3.3 4.6 5.85 5.85l1.8-1.8 4.55 2.4v2.6c0 .9-.7 1.65-1.6 1.65C10.2 20.5 3.5 13.8 3.5 5.6c0-.9.75-1.6 1.65-1.6H7.2Z" />
      </svg>
    ),
  },
];

const Bio = () => {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyContact = async (link: SocialLink) => {
    if (!link.copyValue) return;

    try {
      await navigator.clipboard.writeText(link.copyValue);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = link.copyValue;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopiedLabel(link.label);
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopiedLabel(null), 1800);
  };

  const socialButtonClass =
    "grid h-11 w-11 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--text-secondary)] hover:-translate-y-1 hover:border-[var(--brand)] hover:text-[var(--brand)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]";

  return (
    <section className="mx-auto mt-3 w-full max-w-[22rem]" aria-labelledby="profile-name">
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
        {socialLinks.map((link) => (
          <div key={link.label} className="relative">
            {link.href ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className={socialButtonClass}
              >
                {link.icon}
              </a>
            ) : (
              <button
                type="button"
                aria-label={`Copy ${link.label.toLowerCase()}`}
                className={socialButtonClass}
                onClick={() => void copyContact(link)}
              >
                {link.icon}
              </button>
            )}
            {copiedLabel === link.label ? (
              <span
                role="status"
                className="absolute bottom-[calc(100%+0.7rem)] left-1/2 z-20 w-max -translate-x-1/2 rounded-lg bg-[var(--text-primary)] px-2.5 py-1.5 text-[0.7rem] font-semibold text-[var(--page-bg)] shadow-[var(--shadow-card)] after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[var(--text-primary)]"
              >
                {link.copiedMessage}
              </span>
            ) : null}
          </div>
        ))}
      </nav>
    </section>
  );
};

export default Bio;
