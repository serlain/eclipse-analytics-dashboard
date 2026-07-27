import { Link } from "@tanstack/react-router";

const TABS = [
  { to: "/", label: "Home" },
  { to: "/eclipse", label: "Eclipse" },
  { to: "/experiencia", label: "Experiencia" },
  { to: "/antecedentes", label: "Antecedentes" },
  { to: "/dispositivo", label: "Dispositivo" },
  { to: "/mediciones", label: "Mediciones" },
  { to: "/exportar", label: "Exportar Datos" },
] as const;

export function NavBar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2">
        {TABS.map((t, i) => (
          <Link
            key={t.to}
            to={t.to}
            activeOptions={{ exact: true }}
            activeProps={{
              className:
                "text-primary border-primary/60 bg-primary/10",
            }}
            inactiveProps={{
              className:
                "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/40",
            }}
            className="text-mono flex-shrink-0 rounded-md border px-3 py-1.5 text-xs uppercase tracking-widest transition-colors"
          >
            <span className="mr-2 opacity-60">0{i + 1}</span>
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
