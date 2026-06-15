import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search, Sun, Moon, Home, GraduationCap, Clapperboard, Palette, type LucideIcon } from "lucide-react";

function ThemeToggle({ compact }: { compact?: boolean }) {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const isLight = stored === "light";
    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={
        compact
          ? "inline-flex shrink-0 items-center justify-center rounded-full border border-white/15 p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground"
          : "inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-muted-foreground hover:bg-white/5 hover:text-foreground"
      }
    >
      {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      {!compact && <span>{light ? "Dark mode" : "Light mode"}</span>}
    </button>
  );
}
import logo from "@/assets/hoet-logo.png";
import { searchIndex, type SearchEntry } from "@/lib/search-index";

const NAV: { to: string; label: string; short: string; icon: LucideIcon; exact?: boolean }[] = [
  { to: "/", label: "Home", short: "Home", icon: Home, exact: true },
  { to: "/training", label: "Onboarding & Training", short: "Training", icon: GraduationCap },
  { to: "/editing-guidelines", label: "Editing Guidelines", short: "Editing", icon: Clapperboard },
  { to: "/brand-guidelines", label: "Brand Guidelines", short: "Brand", icon: Palette },
];

function SearchBar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchEntry[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => { setResults(searchIndex(q)); }, [q]);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search the guideline…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      {open && q && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-white/10 bg-card shadow-xl">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">No results.</div>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {results.map((r) => (
                <li key={r.path}>
                  <button
                    onClick={() => { navigate({ to: r.path }); setOpen(false); setQ(""); }}
                    className="flex w-full items-baseline justify-between gap-3 px-4 py-2.5 text-left hover:bg-white/5"
                  >
                    <span className="text-sm">{r.title}</span>
                    <span className="font-label">{r.section}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="grid gap-1">
      {NAV.map((n) => {
        const Icon = n.icon;
        return (
          <Link
            key={n.to}
            to={n.to}
            onClick={onNavigate}
            activeOptions={n.exact ? { exact: true } : undefined}
            activeProps={{ className: "bg-white/10 text-foreground" }}
            inactiveProps={{ className: "text-muted-foreground hover:bg-white/5 hover:text-foreground" }}
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors"
          >
            <Icon className="h-4 w-4 shrink-0" />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-2 px-2 py-1">
        <img src={logo} alt="House of EdTech" className="h-7 w-auto" />
        <span className="font-label">House of EdTech</span>
      </Link>

      <div className="mt-5">
        <SearchBar />
      </div>

      <div className="mt-6">
        <p className="font-label px-3 pb-2">Navigate</p>
        <NavLinks onNavigate={onNavigate} />
      </div>

      <div className="mt-auto space-y-3 pt-6">
        <ThemeToggle />
        <p className="px-1 text-[11px] leading-relaxed text-muted-foreground">
          HOET · GK House of EdTech Pvt. Ltd.<br />Internal Use Only
        </p>
      </div>
    </div>
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Desktop sticky left sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col overflow-y-auto border-r border-white/10 bg-background/95 px-4 py-5 backdrop-blur lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile top bar — logo + search + theme (Slack-style) */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/85 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3 px-4 py-2.5">
          <Link to="/" className="shrink-0" aria-label="House of EdTech home">
            <img src={logo} alt="House of EdTech" className="h-7 w-auto" />
          </Link>
          <div className="min-w-0 flex-1"><SearchBar /></div>
          <ThemeToggle compact />
        </div>
      </header>

      {/* Mobile bottom tab bar — Slack-style primary navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-white/10 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        {NAV.map((n) => {
          const Icon = n.icon;
          return (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={n.exact ? { exact: true } : undefined}
              activeProps={{ className: "text-foreground [&>span:first-child]:bg-white/10" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors"
            >
              <span className="flex h-7 w-12 items-center justify-center rounded-full transition-colors">
                <Icon className="h-5 w-5" />
              </span>
              {n.short}
            </Link>
          );
        })}
      </nav>

      {/* Content */}
      <div className="flex min-h-screen flex-col lg:pl-64">
        <main className="w-full flex-1 px-5 py-8 lg:px-10 lg:py-10">{children}</main>
        <footer className="border-t border-white/10 pb-20 lg:pb-0">
          <div className="flex w-full flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground lg:px-10">
            <span>HOET · GK House of EdTech Pvt. Ltd. · Internal Use Only</span>
            <span>Video Editor Onboarding & Training</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
