import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/PageShell";

export const Route = createFileRoute("/antecedentes")({
  head: () => ({
    meta: [
      { title: "Antecedentes — Proyecto Biopotencial Eclipse 2026" },
      { name: "description", content: "Marco teórico y antecedentes históricos del estudio de biopotenciales en eventos astronómicos." },
    ],
  }),
  component: AntecedentesPage,
});

function AntecedentesPage() {
  return (
    <PageShell
      eyebrow="Marco Teórico"
      title="Antecedentes"
      lead="Investigaciones previas sobre la respuesta de organismos vivos a eclipses solares y sobre el registro de biopotenciales en plantas."
    >
      <Section title="Bioelectricidad vegetal">
        <p>
          Desde los trabajos de Bose a comienzos del siglo XX, se ha documentado
          que las plantas generan potenciales eléctricos medibles en respuesta a
          estímulos ambientales como luz, temperatura y estrés mecánico.
        </p>
      </Section>
      <Section title="Efectos biológicos de los eclipses">
        <p>
          Estudios de campo han reportado alteraciones conductuales en animales,
          cambios en actividad estomática en plantas y variaciones micro-climáticas
          durante la fase de totalidad de eclipses solares.
        </p>
      </Section>
      <Section title="Antecedentes locales">
        <p>
          Este proyecto se apoya en experiencias previas de instrumentación de bajo
          costo y en la infraestructura de telemetría abierta ThingSpeak para el
          registro sincronizado de múltiples variables.
        </p>
      </Section>
    </PageShell>
  );
}
