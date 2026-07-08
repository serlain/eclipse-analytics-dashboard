import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/PageShell";

export const Route = createFileRoute("/experiencia")({
  head: () => ({
    meta: [
      { title: "Experiencia — Proyecto Biopotencial Eclipse 2026" },
      { name: "description", content: "Diseño experimental de medición de biopotenciales y variables ambientales durante el eclipse." },
    ],
  }),
  component: ExperienciaPage,
});

function ExperienciaPage() {
  return (
    <PageShell
      eyebrow="Diseño Experimental"
      title="La Experiencia"
      lead="Un protocolo de observación simultánea de variables ambientales y bioeléctricas antes, durante y después de la totalidad del eclipse."
    >
      <Section title="Objetivo">
        <p>
          Registrar y correlacionar los cambios en biopotencial de plantas y de un
          sujeto humano con las variaciones ambientales inducidas por el eclipse
          (temperatura, humedad, luminosidad).
        </p>
      </Section>
      <Section title="Metodología">
        <p>
          Muestreo continuo a intervalos regulares desde una hora antes del primer
          contacto hasta una hora después del último contacto, con marcadores
          temporales de cada fase del eclipse.
        </p>
      </Section>
      <Section title="Sujetos de estudio">
        <ul className="list-disc space-y-2 pl-5">
          <li>Dos plantas vivas instrumentadas con electrodos superficiales.</li>
          <li>Un canal de referencia eléctrica para control de ruido.</li>
          <li>Un sujeto humano voluntario con electrodos no invasivos.</li>
        </ul>
      </Section>
    </PageShell>
  );
}
