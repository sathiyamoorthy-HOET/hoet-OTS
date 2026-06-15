import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search, Menu, X, Sun, Moon, Home, GraduationCap, Clapperboard, Palette, type LucideIcon } from "lucide-react";

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
      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-muted-foreground hover:bg-white/5 hover:text-foreground"
    >
      {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span>{light ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}
import logo from "@/assets/hoet-logo.png";
import { searchIndex, type SearchEntry } from "@/lib/search-index";

const NAV: { to: string; label: string; icon: LucideIcon; exact?: boolean }[] = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/training", label: "Onboarding & Training", icon: GraduationCap },
  { to: "/editing-guidelines", label: "Editing Guidelines", icon: Clapperboard },
  { to: "/brand-guidelines", label: "Brand Guidelines", icon: Palette },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { setMenuOpen(false); }, [path]);

  return (
    <div className="min-h-screen">
      {/* Desktop sticky left sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col overflow-y-auto border-r border-white/10 bg-background/95 px-4 py-5 backdrop-blur lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/85 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3 px-5 py-3">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="House of EdTech" className="h-7 w-auto" />
            <span className="font-label hidden sm:inline">House of EdTech</span>
          </Link>
          <div className="ml-auto"><ThemeToggle /></div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-md p-1.5"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col overflow-y-auto border-r border-white/10 bg-background px-4 py-5 lg:hidden">
            <SidebarContent onNavigate={() => setMenuOpen(false)} />
          </aside>
        </>
      )}

      {/* Content */}
      <div className="flex min-h-screen flex-col lg:pl-64">
        <main className="w-full flex-1 px-5 py-10 lg:px-10">{children}</main>
        <footer className="border-t border-white/10">
          <div className="flex w-full flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground lg:px-10">
            <span>HOET · GK House of EdTech Pvt. Ltd. · Internal Use Only</span>
            <span>Video Editor Onboarding & Training</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
