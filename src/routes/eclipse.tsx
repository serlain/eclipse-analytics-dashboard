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
