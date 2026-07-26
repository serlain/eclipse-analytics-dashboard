import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/PageShell";
import unidadInterior from "@/assets/unidad-biopotencial-interior.jpeg.asset.json";
import diagramaBloques from "@/assets/diagrama-bloques-mbps.png.asset.json";
import cajaExt1 from "@/assets/dispositivo-caja-1.jpeg.asset.json";
import cajaExt2 from "@/assets/dispositivo-caja-2.jpeg.asset.json";
import cajaExt3 from "@/assets/dispositivo-caja-3.jpeg.asset.json";

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
      lead="La Estación de medición y transmisión de datos, es un dispositivo electrónico desarrollado durante un año para esta experiencia. Se trata de una unidad electrónica programable basada en microcontrolador Arduino. Dispone de sensores ambientales y sensores de instrumentación electrónica para adquisición de datos. La unidad es autónoma al ser alimentada por energía solar y transmite los datos mediante protocolo Ethernet a una plataforma para la monitorización de todas las variables medidas."
    >
      <Section title="">
        <div className="grid gap-6 md:grid-cols-2">
          <figure className="space-y-2">
            <img
              src={unidadInterior.url}
              alt="Interior de la unidad de medición de biopotenciales con Arduino, sensores y cableado."
              className="w-full rounded-lg border border-white/10"
              loading="lazy"
            />
            <figcaption className="text-xs text-white/60">
              Vista interior de la unidad: microcontrolador Arduino, etapas de acondicionamiento analógico y sensores ambientales.
            </figcaption>
          </figure>
          <figure className="space-y-2">
            <img
              src={diagramaBloques.url}
              alt="Diagrama de bloques del sistema de medición y monitoreo de biopotenciales con integración IoT a ThingSpeak."
              className="w-full rounded-lg border border-white/10 bg-white"
              loading="lazy"
            />
            <figcaption className="text-xs text-white/60">
              Diagrama de bloques del sistema MBPs — adquisición, procesamiento y transmisión IoT a ThingSpeak.
            </figcaption>
          </figure>
        </div>
      </Section>

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
          protocolo Ethernet y son visualizados en el dashboard de esta web.
        </p>
      </Section>

      <Section title="Galería de la estación">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[cajaExt1, cajaExt2, cajaExt3].map((img, i) => (
            <figure key={i} className="overflow-hidden rounded-lg border border-white/10">
              <img
                src={img.url}
                alt={`Estación de medición — vista ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
