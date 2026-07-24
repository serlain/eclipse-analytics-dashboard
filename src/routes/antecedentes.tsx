import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/PageShell";
import registroHabanaAsset from "@/assets/registro-1995-habana.jpg.asset.json";

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
      <Section title="Sierra Figueredo et al. (1995)">
        <p>
          Pablo Sierra Figueredo junto con sus colegas, realizaron el experimento en el año 1995, en La Habana, Cuba, con el que se pudo comprobar que el paso de la Luna entre el Sol y la Tierra (alineación de los tres cuerpos), provoca una caída gradual del biopotencial en una planta de banana. Tanto el comienzo de la caída como la recuperación del biopotencial ocurrió gradualmente, no respondiendo, en el tiempo, con la interrupción de la luz solar por parte de la Luna, que por demás, fue en ese caso un eclipse parcial del orden de un 20% de la superficie del disco solar cubierta por la Luna. De manera que atribuimos la alteración del biopotencial a la modificación del entorno gravitacional (efecto de marea) al ir alineándose los tres cuerpos de forma gradual y no a la modificación del flujo de luz solar, comparable en este caso al tránsito de alguna nube frente al disco solar.
        </p>
        <figure className="mt-6 overflow-hidden rounded-lg border border-border/40 bg-black/20">
          <img
            src={registroHabanaAsset.url}
            alt="Segmento del registro obtenido en el Instituto de Geofísica y Astronomía de La Habana, Cuba durante el eclipse solar parcial del 29 de abril de 1995"
            className="w-full object-contain"
          />
          <figcaption className="border-t border-border/40 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
            Segmento del registro obtenido en el Instituto de Geofísica y Astronomía de La Habana, Cuba durante el eclipse solar (parcial) el día 29 de abril de 1995. Duró unas 3 horas aprox.
          </figcaption>
        </figure>
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
