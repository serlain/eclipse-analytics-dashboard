import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/PageShell";

export const Route = createFileRoute("/eclipse")({
  head: () => ({
    meta: [
      { title: "Eclipse — 12 de Agosto de 2026" },
      { name: "description", content: "Información sobre el eclipse solar total del 12 de agosto de 2026." },
    ],
  }),
  component: EclipsePage,
});

function EclipsePage() {
  return (
    <PageShell
      eyebrow="Fenómeno Astronómico"
      title="Eclipse Solar del 12 de Agosto de 2026"
      lead="Un eclipse solar total que atravesará regiones del hemisferio norte y ofrecerá una ventana única para el estudio de la respuesta de los seres vivos a la interrupción abrupta de la radiación solar."
    >
      <Section title="Naturaleza del evento">
        <p>
          Un eclipse solar total ocurre cuando la Luna se interpone entre el Sol y la
          Tierra, proyectando su sombra sobre nuestro planeta y bloqueando por
          completo el disco solar durante algunos minutos.
        </p>

        <div className="mt-6 space-y-4 text-muted-foreground">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border/40 bg-muted/10 p-4">
              <h4 className="font-semibold text-foreground text-sm">1. La Coincidencia de 400X</h4>
              <p className="mt-1 text-xs leading-relaxed">
                El Sol es ~400 veces más grande que la Luna (diámetro de 1,39M km vs 3,474 km), pero también se encuentra ~400 veces más lejos de la Tierra (149,6M km vs 384,400 km). Esto hace que ambos tengan un diámetro angular aparente casi idéntico en el cielo (~0.5°).
              </p>
            </div>
            <div className="rounded-lg border border-border/40 bg-muted/10 p-4">
              <h4 className="font-semibold text-foreground text-sm">2. Cono de Sombra (Umbra y Penumbra)</h4>
              <p className="mt-1 text-xs leading-relaxed">
                La zona de <strong>umbra</strong> es la franja estrecha en la superficie terrestre donde el Sol es cubierto al 100%. Quienes están fuera de esta franja pero dentro de la <strong>penumbra</strong> perciben un eclipse parcial.
              </p>
            </div>
            <div className="rounded-lg border border-border/40 bg-muted/10 p-4">
              <h4 className="font-semibold text-foreground text-sm">3. Inclinación Orbital (5.1°)</h4>
              <p className="mt-1 text-xs leading-relaxed">
                La órbita de la Luna está inclinada 5.1° respecto al plano orbital terrestre (la Eclíptica). Por ello, solo hay eclipse cuando la Luna Nueva coincide cerca de un <strong>nodo orbital</strong> (intersección entre ambos planos).
              </p>
            </div>
          </div>

          <figure className="mt-6 overflow-hidden rounded-xl border border-border/50 bg-black/30 p-2 shadow-xl">
            <img
              src="/geometria-eclipse.jpg"
              alt="Geometría del eclipse total: La coincidencia de 400x, cono de sombra e inclinación orbital"
              className="w-full rounded-lg object-contain"
            />
            <figcaption className="border-t border-border/30 bg-muted/10 px-4 py-3 text-xs text-muted-foreground mt-2">
              <strong>Infografía astronómica del eclipse:</strong> Geometría del eclipse total, alineación angular Sol-Luna-Tierra, zona de umbra/penumbra y coreografía de los nodos orbitales (Fuente: National Geographic).
            </figcaption>
          </figure>
        </div>
      </Section>
      <Section title="Trayectoria y visibilidad">
        <p>
          La banda de totalidad recorrerá zonas de Groenlandia, Islandia y el norte
          de la Península Ibérica. En el resto del territorio será visible como
          eclipse parcial de alta magnitud.
        </p>
      </Section>
      <Section title="Relevancia científica">
        <p>
          La caída brusca de luminosidad y temperatura permite estudiar reacciones
          fisiológicas rápidas en organismos vivos, así como perturbaciones
          atmosféricas breves y bien delimitadas en el tiempo.
        </p>
      </Section>
    </PageShell>
  );
}
