import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/PageShell";

export const Route = createFileRoute("/dispositivo")({
  head: () => ({
    meta: [
      { title: "Dispositivo — Proyecto Biopotencial Eclipse 2026" },
      { name: "description", content: "Arquitectura de hardware y sensores utilizados en la estación de monitoreo del eclipse." },
    ],
  }),
  component: DispositivoPage,
});

function DispositivoPage() {
  return (
    <PageShell
      eyebrow="Instrumentación"
      title="El Dispositivo"
      lead="Estación autónoma de adquisición basada en microcontrolador con sensores ambientales y frontal analógico de biopotenciales."
    >
      <Section title="Sensores ambientales">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Temperatura</strong> — Field 1 del canal ambiental.</li>
          <li><strong>Humedad relativa</strong> — Field 2 del canal ambiental.</li>
          <li><strong>Luminosidad</strong> — Field 4 del canal ambiental (sensor de lux).</li>
        </ul>
      </Section>
      <Section title="Adquisición de biopotenciales">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Planta 1</strong> — Field 1 del canal de biopotenciales.</li>
          <li><strong>Planta 2</strong> — Field 2 del canal de biopotenciales.</li>
          <li><strong>Referencia</strong> — Field 3 del canal de biopotenciales.</li>
          <li><strong>Sujeto humano</strong> — Field 4 del canal de biopotenciales.</li>
        </ul>
      </Section>
      <Section title="Transmisión de datos">
        <p>
          Los datos se envían a la plataforma <span className="text-mono">ThingSpeak</span> mediante
          conexión Wi-Fi y son consumidos por este dashboard mediante peticiones
          periódicas a su API pública.
        </p>
      </Section>
    </PageShell>
  );
}
