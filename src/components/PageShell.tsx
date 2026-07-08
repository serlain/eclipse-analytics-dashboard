import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-starfield min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-primary/80">
          {eyebrow}
        </p>
        <h1 className="text-display mt-4 text-4xl leading-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {lead}
          </p>
        )}
        <div className="mt-12 space-y-8 text-[15px] leading-relaxed text-foreground/90">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card-academic rounded-lg p-6 md:p-8">
      <h2 className="text-display text-2xl text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-muted-foreground">{children}</div>
    </section>
  );
}
