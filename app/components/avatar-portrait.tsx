type AvatarPortraitProps = {
  eyeX: number;
  eyeY: number;
  headX: number;
  headY: number;
  /** Optional: pass true when cursor is near CTA/button to make him smile more */
  happy?: boolean;
};

export function AvatarPortrait({
  eyeX,
  eyeY,
  headX,
  headY,
  happy = false,
}: AvatarPortraitProps) {
  const headRotate = headX * 5;
  const headShiftX = headX * 5;
  const headShiftY = headY * 4;
  const pupilX = eyeX * 5;
  const pupilY = eyeY * 3.5;

  const smile = happy;

  // Smaller, softer smile so it feels cute instead of stretched/creepy
  const mouthPath = smile
    ? "M191 246c9 8 31 8 40 0"
    : "M193 246c8 4 26 4 34 0";

  return (
    <div className="relative mx-auto flex aspect-square w-[13.5rem] items-center justify-center overflow-hidden rounded-full border border-[var(--line-soft)] bg-[var(--avatar-frame)] shadow-[inset_0_0_36px_rgba(92,116,180,0.08)] sm:w-[14.5rem]">
      <svg
        viewBox="0 0 420 420"
        role="img"
        aria-label="Cute playful developer avatar"
        className="pointer-events-none block h-auto w-full scale-[1.04] select-none [transform-origin:50%_18%] [filter:drop-shadow(0_20px_32px_rgba(84,108,189,0.16))] will-change-transform dark:[filter:drop-shadow(0_20px_38px_rgba(0,0,0,0.28))]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="avatarSkin" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#f7d9bf" />
            <stop offset="100%" stopColor="#e8c0a2" />
          </linearGradient>

          <linearGradient id="avatarHoodie" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6FA8D8" />
            <stop offset="100%" stopColor="#3D78A8" />
          </linearGradient>

          <linearGradient id="avatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7FAFF" />
            <stop offset="100%" stopColor="#E9F0FF" />
          </linearGradient>

          <filter id="avatarSoftShadow" x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#182033" floodOpacity="0.16" />
          </filter>
        </defs>

        <g filter="url(#avatarSoftShadow)">
          <path
            d="M104 367c12-74 53-116 106-116s94 42 106 116H104Z"
            fill="url(#avatarHoodie)"
            stroke="#1F3448"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M164 263c15 17 30 26 46 26 17 0 32-9 47-26l16 48-32 56h-62l-32-56 17-48Z"
            fill="#FFFFFF"
            stroke="rgba(31,52,72,0.35)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M162 267c11 31 27 54 48 68 22-14 38-37 49-68"
            fill="none"
            stroke="#2E5F87"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M134 316c25 17 51 27 78 29m74-29c-23 16-48 25-75 29"
            fill="none"
            stroke="#2E5F87"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.35"
          />

          <path
            d="M179 235c8 20 19 31 32 31 14 0 25-11 33-31v41c-20 22-47 22-65 0v-41Z"
            fill="url(#avatarSkin)"
            stroke="#291B16"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          <g transform={`translate(${headShiftX}, ${headShiftY}) rotate(${headRotate} 210 174)`}>
            <path
              d="M131 169c-13 0-22 11-21 27 1 17 11 28 25 27"
              fill="url(#avatarSkin)"
              stroke="#291B16"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M289 169c13 0 22 11 21 27-1 17-11 28-25 27"
              fill="url(#avatarSkin)"
              stroke="#291B16"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="126" cy="201" r="5" fill="#171717" />

            <path
              d="M137 139c0-53 30-91 73-91s73 38 73 91v53c0 58-31 96-73 96s-73-38-73-96v-53Z"
              fill="url(#avatarSkin)"
              stroke="#291B16"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            <path
              d="M134 144c0-41 24-78 62-91 33-12 72-1 91 27 18 26 17 61 6 89-9-8-15-20-18-35-17 13-38 19-64 18-31-1-55-11-72-31-1 8-3 16-5 23Z"
              fill="#1D1920"
              stroke="#111014"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <g fill="#1D1920" stroke="#111014" strokeWidth="2.5">
              <circle cx="151" cy="107" r="18" />
              <circle cx="166" cy="82" r="21" />
              <circle cx="193" cy="63" r="23" />
              <circle cx="223" cy="59" r="25" />
              <circle cx="251" cy="70" r="22" />
              <circle cx="274" cy="91" r="21" />
              <circle cx="285" cy="119" r="18" />
              <circle cx="167" cy="126" r="21" />
              <circle cx="198" cy="116" r="23" />
              <circle cx="230" cy="116" r="22" />
              <circle cx="260" cy="128" r="20" />
            </g>
            <path
              d="M229 105c-2 15 5 25 20 30"
              fill="none"
              stroke="#1D1920"
              strokeWidth="9"
              strokeLinecap="round"
            />

            <path
              d="M159 170c14-7 29-8 43-4"
              stroke="#241714"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M221 166c15-4 31-2 44 5"
              stroke="#241714"
              strokeWidth="6"
              strokeLinecap="round"
            />

            <ellipse cx="181" cy="191" rx="18" ry="13" fill="#FFFDF8" />
            <ellipse cx="240" cy="191" rx="18" ry="13" fill="#FFFDF8" />
            <ellipse cx={181 + pupilX} cy={191 + pupilY} rx="6" ry="6.4" fill="#17120F" />
            <ellipse cx={240 + pupilX} cy={191 + pupilY} rx="6" ry="6.4" fill="#17120F" />
            <circle cx={183 + pupilX + 2} cy={189 + pupilY - 2} r="1.5" fill="#FFFFFF" />
            <circle cx={242 + pupilX + 2} cy={189 + pupilY - 2} r="1.5" fill="#FFFFFF" />

            <path
              d="M211 193c-4 14-8 29-10 43 7 4 15 5 23 2"
              fill="none"
              stroke="#9D5A3C"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d={mouthPath}
              fill="none"
              stroke="#5C241D"
              strokeWidth={smile ? 4.5 : 4}
              strokeLinecap="round"
            />

            {smile && (
              <path
                d="M197 248c7 3 21 3 28 0"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </g>
        </g>
      </svg>
    </div>
  );
}
