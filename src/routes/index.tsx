import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Proyecto Biopotencial Eclipse Solar 2026" },
      { name: "description", content: "Proyecto científico de medición de biopotenciales en plantas y personas y variables ambientales durante el eclipse solar del 12 de agosto de 2026." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="bg-starfield min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-primary/80">
          Proyecto Científico · Eclipse Solar 12·08·2026
        </p>
        <h1 className="text-display mt-6 text-5xl leading-[1.05] text-foreground md:text-7xl">
          Biopotencial en plantas y personas ante el <em className="text-primary">eclipse solar</em>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Estación de monitoreo ambiental y bioeléctrico diseñada para registrar,
          en tiempo real, la respuesta de organismos vivos y del entorno físico
          durante el eclipse solar del 12 de agosto de 2026.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/mediciones"
            className="text-mono rounded-md bg-primary px-5 py-2.5 text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ver mediciones en vivo →
          </Link>
          <Link
            to="/eclipse"
            className="text-mono rounded-md border border-border px-5 py-2.5 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-muted/40"
          >
            Sobre el eclipse
          </Link>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {[
            { k: "01", t: "Ambiental", d: "Temperatura, humedad y luminosidad muestreadas de forma continua." },
            { k: "02", t: "Biopotencial", d: "Registro diferencial en plantas, referencia y sujeto humano." },
            { k: "03", t: "Tiempo real", d: "Telemetría vía ThingSpeak y visualización académica." },
          ].map((c) => (
            <div key={c.k} className="card-academic rounded-lg p-5">
              <div className="text-mono text-xs text-primary/70">{c.k}</div>
              <div className="text-display mt-2 text-xl text-foreground">{c.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
