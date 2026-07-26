import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/PageShell";
import disenoExperimento from "@/assets/diseno-experimento.png.asset.json";

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
      lead="Una estación de medición desarrollada para la observación y captación simultánea de variables ambientales y bioeléctricas antes, durante y después del eclipse total."
    >
      <Section title="Objetivo">
        <p>
          Este proyecto nace con el interés y la gran oportunidad de medir y
          cuantificar cómo afecta el eclipse solar total en el biopotencial de dos
          plantas de bananera y en el biopotencial de una persona. Se tomarán medidas
          ambientales inducidas por el eclipse (temperatura, humedad, luminosidad),
          además de medir simultáneamente los tres biopotenciales así como registrar
          un biopotencial de referencia.
        </p>
        <p>
          En este proyecto participan Mariano Bueno B., Pablo Sierra F., Sergio Lainez
          S. y Anke Reichardt. Además será presentado como trabajo final de formación
          (TFF) de la promoción O de la Formación GEA en Geobiología y
          Biohabitabilidad.
        </p>
      </Section>
      <Section title="Metodología">
        <p>
          Mediante una estación electrónica desarrollada exclusivamente para este
          experimento, realiza la toma de medidas de forma constante a intervalos
          regulares, de las variables ambientales y de los biopotenciales expresados
          en milivoltios (mV). Todos estos datos se pueden visualizar en tiempo real en
          esta misma página y además se almacena un histórico de datos para realizar
          un procesamiento y estudio posterior de dichos datos y obtener unas
          conclusiones acerca de la influencia de este fenómeno sobre el biopotencial
          de los seres vivos.
        </p>
      </Section>
      <Section title="Sujetos de estudio">
        <ul className="list-disc space-y-2 pl-5">
          <li>Dos plantas vivas instrumentadas con electrodos.</li>
          <li>Un canal de referencia eléctrica para control de ruido.</li>
          <li>Un sujeto humano voluntario con electrodos no invasivos.</li>
        </ul>
      </Section>
      <section className="card-academic rounded-lg p-6 md:p-8">
        <h2 className="text-display text-2xl text-foreground">Esquema del experimento</h2>
        <figure className="mt-6">
          <img
            src={disenoExperimento.url}
            alt="Diseño del experimento propuesto: diagrama con plantas de bananera, sujeto humano y parámetros del protocolo de medición"
            className="w-full rounded-md border border-border/60"
            loading="lazy"
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            Diseño del experimento propuesto: grupo experimental, sujetos de medición y parámetros del protocolo.
          </figcaption>
        </figure>
      </section>
    </PageShell>
  );
}
