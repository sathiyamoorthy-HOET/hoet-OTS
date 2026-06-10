export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="mb-8 border-b border-white/10 pb-6">
      <p className="font-label">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h1>
      {intro && <p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">{intro}</p>}
    </header>
  );
}
