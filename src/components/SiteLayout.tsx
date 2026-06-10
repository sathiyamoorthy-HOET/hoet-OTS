import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search, Menu, X, Sun, Moon } from "lucide-react";

function ThemeToggle() {
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
      className="rounded-full border border-white/15 p-1.5 hover:bg-white/5"
    >
      {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
import logo from "@/assets/hoet-logo.png";
import { searchIndex, type SearchEntry } from "@/lib/search-index";

const NAV = [
  { to: "/training", label: "Onboarding & Training" },
  { to: "/editing-guidelines", label: "Editing Guidelines" },
  { to: "/brand-guidelines", label: "Brand Guidelines" },
] as const;

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
    <div ref={ref} className="relative w-full max-w-xs">
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
            <ul>
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

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { setMenuOpen(false); }, [path]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="House of EdTech" className="h-7 w-auto" />
            <span className="font-label hidden sm:inline">House of EdTech</span>
          </Link>
          <div className="ml-auto hidden md:block">
            <SearchBar />
          </div>
          <div className="hidden md:block"><ThemeToggle /></div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-auto rounded-md p-1.5 lg:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <nav className="mx-auto hidden max-w-7xl flex-wrap items-center gap-1 px-5 pb-2 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-foreground bg-white/10" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="rounded-md px-2.5 py-1.5 text-[13px] transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        {menuOpen && (
          <div className="border-t border-white/10 px-5 py-3 lg:hidden">
            <div className="mb-3 md:hidden"><SearchBar /></div>
            <nav className="grid gap-1">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} className="rounded-md px-2 py-1.5 text-sm hover:bg-white/5">{n.label}</Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">{children}</main>

      <footer className="mt-16 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground">
          <span>HOET · GK House of EdTech Pvt. Ltd. · Internal Use Only</span>
          <span>Video Editor Onboarding & Training</span>
        </div>
      </footer>
    </div>
  );
}
