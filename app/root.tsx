import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

const themeBootScript = `
(() => {
  const saved = window.localStorage.getItem("asis-theme");
  const theme = saved === "light" || saved === "dark" ? saved : "dark";
  document.documentElement.dataset.theme = theme;
})();
`;

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/png", href: "/favicon.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "preconnect", href: "https://fonts.cdnfonts.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Instrument+Serif:ital@0;1&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.cdnfonts.com/css/wotfard",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-20 text-[var(--text-primary)]">
      <h1 className="text-3xl font-semibold">{message}</h1>
      <p className="mt-3 text-[var(--text-secondary)]">{details}</p>
      {stack && (
        <pre className="mt-6 w-full overflow-x-auto rounded-3xl border border-[var(--line-soft)] bg-[var(--badge-bg)] p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
