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
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-mono text-xs uppercase tracking-[0.35em] text-primary/80">
              Proyecto Científico · Eclipse Solar 12·08·2026
            </p>
            <h1 className="text-display mt-6 text-4xl leading-[1.1] text-foreground md:text-6xl">
              Biopotencial en plantas y personas ante el <em className="text-primary">eclipse solar</em>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Estación de monitoreo ambiental y bioeléctrico diseñada para registrar,
              en tiempo real, la respuesta de organismos vivos y del entorno físico
              durante el eclipse solar del 12 de agosto de 2026. La Fundación GEA-Reviure en Benicarló va a ser un escenario excepcional al estar ubicada muy cerca del centro de la franja de sombra del eclipse total.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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
          </div>

          <div className="md:col-span-5">
            <figure className="card-academic group overflow-hidden rounded-xl border border-border/50 p-2 shadow-2xl transition-transform hover:scale-[1.01]">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/estacion-monitoreo.jpg"
                  alt="Estación de monitoreo de biopotencial en planta de banano con panel solar y caja de telemetría"
                  className="max-h-[460px] w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-full bg-background/80 px-3 py-1 text-[11px] font-medium tracking-wide text-primary backdrop-blur-md border border-primary/20">
                  ⚡ Estación de Campo en Vivo
                </div>
              </div>
              <figcaption className="px-3 py-2.5 text-xs text-muted-foreground leading-snug">
                Instalación experimental con electrodos diferenciales en planta de banano, sistema de telemetría y alimentación fotovoltaica.
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
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

        <div className="mt-12 rounded-lg border border-primary/30 bg-primary/10 p-6 md:p-8">
          <h2 className="text-display text-lg text-primary">Importante</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/90">
            En la página web del Instituto Geográfico Nacional ({" "}
            <a
              href="https://eclipses.ign.es/home.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              https://eclipses.ign.es/home.html
            </a>
            ), consulta toda la información del trío de eclipses visibles en España y no te olvides de consultar el apartado de{" "}
            <strong>“CÓMO OBSERVAR LOS ECLIPSES”</strong>{" "}
            para una adecuada protección de tus ojos.
          </p>
        </div>
      </div>
    </div>
  );
}
