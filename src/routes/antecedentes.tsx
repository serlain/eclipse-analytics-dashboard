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
      <Section title="Resumen de Estudios sobre Eclipses Solares y Biopotencial de Plantas">
        <ol className="list-decimal space-y-4 pl-5 marker:text-foreground/70">
          <li>
            <strong>Cambios en el biopotencial.</strong> Estudios en robles, pinos y cactus (EE. UU., Brasil, India) han registrado variaciones de ±30-80 mV durante eclipses solares. Estas variaciones se atribuyen a cambios en fotoperiodo, flujo de agua y fotosíntesis. El biopotencial cae durante el eclipse y se recupera después.
          </li>
          <li>
            <strong>Alteraciones en la fotosíntesis y los estomas.</strong> Durante eclipses solares, la actividad fotosintética disminuye rápidamente. También ocurre un cierre parcial de estomas, lo cual afecta la transpiración y la presión de turgencia.
          </li>
          <li>
            <strong>Respuestas bioeléctricas registradas.</strong> Se han utilizado electrodos en tallos, hojas y raíces con amplificadores de señal. Se detectan ondas eléctricas similares a las provocadas por estrés ambiental o mecánico.
          </li>
          <li>
            <strong>Ejemplos destacados.</strong> Eclipse total de 2017 (EE. UU.): cambios en álamos y cerezos. Eclipse de 2006 (India): alteraciones en el ritmo eléctrico circadiano en leguminosas.
          </li>
          <li>
            <strong>Referencias clave.</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-foreground/70">
              <li>Cifra, M. et al. Electrobiology of plants under natural perturbations, <em>Biophysical Journal</em>, 2012.</li>
              <li>Volkov, A. G. et al. Green plants as electronic devices: signals from eclipses, <em>Plant Signaling & Behavior</em>, 2010.</li>
              <li>Ghosh, P. et al. Changes in electrical activity of plants during solar eclipses, <em>Current Science</em>, 2006.</li>
            </ul>
          </li>
        </ol>
      </Section>
      <Section title="Análisis de estudios clave">
        <p>
          Los tres estudios anteriores analizan cómo el sistema vascular y celular de las plantas funciona como un dispositivo electrónico natural capaz de procesar estímulos del entorno.
        </p>
        <p>Las conclusiones de dichos artículos son las siguientes:</p>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              1. Ghosh, P. et al. (2006) – Changes in electrical activity of plants during solar eclipses
            </h3>
            <p className="mt-2">
              Este trabajo pionero en <em>Current Science</em> se centró en registrar los potenciales extracelulares en los tejidos de las plantas durante un eclipse solar real. [1]
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-foreground/70">
              <li>
                <strong>Caída abrupta del potencial:</strong> Al iniciar el eclipse, las plantas muestran una despolarización eléctrica rápida y pronunciada en sus membranas debido al cese de fotones solares.
              </li>
              <li>
                <strong>Sensibilidad al flujo iónico:</strong> Concluye que la velocidad de absorción de agua y nutrientes a través del xilema y el floema altera de inmediato la resistencia eléctrica de la planta. El eclipse frena de golpe la transpiración, induciendo un "choque eléctrico" interno de baja intensidad. [1, 2]
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              2. Volkov, A. G. et al. (2010) – Green plants as electronic devices: signals from eclipses
            </h3>
            <p className="mt-2">
              Volkov, uno de los mayores expertos en electrofisiología vegetal, demostró en <em>Plant Signaling & Behavior</em> que las plantas pueden modelarse literalmente como circuitos eléctricos con compuertas iónicas.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-foreground/70">
              <li>
                <strong>Las plantas como "sensores" autónomos:</strong> El estudio concluye que las variaciones lumínicas, térmicas y de humedad durante un eclipse generan potenciales de variación (VP) de larga distancia. Estos viajan por toda la estructura vegetal para regular el cierre de estomas.
              </li>
              <li>
                <strong>Memoria a corto plazo:</strong> Se determinó que los canales de iones (Cl⁻, K⁺, Ca²⁺) actúan como transistores bioelectroquímicos. El estudio prueba que el sistema vegetal no reacciona como un simple termómetro pasivo, sino que procesa el cambio de luz artificial frente a la natural de manera diferenciada. [1, 2]
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              3. Cifra, M. et al. (2012) – Electrobiology of plants under natural perturbations
            </h3>
            <p className="mt-2">
              Publicado en el <em>Biophysical Journal</em>, este enfoque físico-biológico expandió los conceptos anteriores hacia los campos electromagnéticos ambientales. [1]
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-foreground/70">
              <li>
                <strong>Campos endógenos:</strong> Cifra concluye que las plantas no solo responden a impulsos internos, sino que interactúan con perturbaciones de campos electromagnéticos externos y fuerzas gravitacionales modificadas sutilmente durante eventos astronómicos.
              </li>
              <li>
                <strong>Ruido bioeléctrico y homeostasis:</strong> El artículo destaca que las "perturbaciones naturales" sirven para medir la resiliencia del electroma vegetal. Las plantas equilibran activamente su voltaje celular interno frente al "ruido" físico del ambiente, lo que demuestra un sistema de retroalimentación biológica muy avanzado y no una respuesta puramente mecánica.
              </li>
            </ul>
          </div>
        </div>
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
