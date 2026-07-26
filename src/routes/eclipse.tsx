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

        <div className="mt-6 space-y-8 text-muted-foreground">
          <figure className="overflow-hidden rounded-xl border border-border/50 bg-black/30 p-2 shadow-xl">
            <img
              src="/geometria-eclipse.jpg"
              alt="Geometría del eclipse total: La coincidencia de 400x, cono de sombra e inclinación orbital"
              className="w-full rounded-lg object-contain"
            />
            <figcaption className="border-t border-border/30 bg-muted/10 px-4 py-3 text-xs text-muted-foreground mt-2">
              <strong>Infografía astronómica del eclipse:</strong> Geometría del eclipse total, alineación angular Sol-Luna-Tierra, zona de umbra/penumbra y coreografía de los nodos orbitales (Fuente: National Geographic).
            </figcaption>
          </figure>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                UN ECLIPSE TOTAL ES UNA CASUALIDAD EXTRAORDINARIA.
              </h3>
              <p className="mt-3 leading-relaxed">
                La Luna es aproximadamente 400 veces más pequeña que el Sol, pero también está unas 400 veces más cerca de la Tierra. 
                Esa coincidencia hace que ambos parezcan tener exactamente el mismo tamaño en nuestro cielo. Gracias a esto, la Luna puede cubrir el disco solar con una precisión tan exacta que convierte al eclipse total en uno de los fenómenos más espectaculares del Sistema Solar.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border/40 bg-muted/10 p-4">
                  <span className="text-mono text-xs uppercase tracking-wider text-primary">Tamaño de la Luna</span>
                  <p className="mt-1 text-sm font-semibold text-foreground">400 veces más pequeña que el Sol.</p>
                </div>
                <div className="rounded-lg border border-border/40 bg-muted/10 p-4">
                  <span className="text-mono text-xs uppercase tracking-wider text-primary">Distancia de la Luna</span>
                  <p className="mt-1 text-sm font-semibold text-foreground">400 veces más cerca de la Tierra que del Sol.</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
              <span className="text-mono text-xs font-bold uppercase tracking-widest text-primary">💡 ¿Sabías que? · SAROS</span>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                Es el ciclo de 18 años, 11 días y 8 horas utilizado para predecir eclipses desde la antigüedad. Este término fue introducido en 1686 por el célebre astrónomo Edmund Halley.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground">
                LOS ECLIPSES NO OCURREN AL AZAR
              </h3>
              <p className="mt-3 leading-relaxed">
                En la Tierra se producen entre 2 y 5 eclipses solares al año. Pero muchos son parciales, algunos ocurren sobre océanos y solo unos pocos son totales visibles desde zonas habitadas. Los eclipses totales solares ocurren aproximadamente cada 18 meses en algún lugar del planeta.
              </p>
              <p className="mt-3 leading-relaxed">
                Ese ciclo se conoce como serie Saros. Cada 18 años, 11 días y 8 horas, o 223 meses sinódicos, las posiciones de Sol, Tierra y Luna vuelven a alinearse casi exactamente, generando un eclipse muy similar al anterior.
              </p>
              <p className="mt-3 leading-relaxed">
                Pero hay un pequeño detalle: esas ocho horas extra hacen que la Tierra haya girado un poco más. Por eso, cada nuevo eclipse aparece desplazado unos 120° en longitud sobre otra región del planeta.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground">
                LA COREOGRAFÍA QUE CASI NUNCA OCURRE.
              </h3>
              <p className="mt-3 leading-relaxed">
                Pero debido a que la órbita de la Luna está ligeramente inclinada, la mayoría de las veces las sombras no llegan a coincidir. Por eso los eclipses totales son tan raros y la franja desde la que pueden observarse suele medir apenas unos cientos de kilómetros.
              </p>
              <p className="mt-3 leading-relaxed">
                Un eclipse total tiene lugar en algún lugar de la Tierra aproximadamente cada 18 meses, pero desde una misma ciudad pueden pasar siglos antes de volver a contemplarlo.
              </p>
            </div>

            <div className="rounded-lg border border-primary/30 bg-primary/5 p-5 space-y-2">
              <span className="text-mono text-xs font-bold uppercase tracking-widest text-primary">💡 ¿Sabías que?</span>
              <h4 className="text-lg font-semibold text-foreground">
                EL FIN DE LA DANZA CÓSMICA.
              </h4>
              <p className="text-sm leading-relaxed text-foreground/90">
                La Luna se aleja lentamente de la Tierra a un ritmo de unos 3,8 centímetros al año. Aunque esta distancia aumenta de forma casi imperceptible a escala humana, sus efectos serán importantes a muy largo plazo.
              </p>
              <p className="text-sm leading-relaxed text-foreground/90">
                Dentro de cientos de millones de años, la Luna estará demasiado lejos para cubrir completamente el disco solar. Los eclipses totales dejarán de producirse y solo podrán observarse eclipses parciales o anulares.
              </p>
              <p className="text-sm leading-relaxed text-foreground/90">
                Este cambio forma parte de la evolución natural del sistema Tierra-Luna y nos recuerda que incluso los fenómenos astronómicos más familiares pueden transformarse con el paso del tiempo.
              </p>
              <p className="text-sm leading-relaxed text-foreground/90">
                La coreografía celeste que da lugar a los eclipses continúa evolucionando, aunque lo hace a una escala temporal mucho mayor que la de la historia humana.
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section title="Trayectoria y visibilidad">
        <p>
          La banda de totalidad recorrerá zonas de Groenlandia, Islandia y el norte
          de la Península Ibérica. En el resto del territorio será visible como
          eclipse total y parcial de alta magnitud. La Fundación GEA-Reviure en Benicarló es un lugar excepcional al estar ubicada muy cerca del centro de la franja de sombra del eclipse total.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <figure className="overflow-hidden rounded-xl border border-border/50 bg-black/30 p-2 shadow-lg transition-transform hover:scale-[1.01]">
            <img
              src="/mapa-eclipses-espana.jpg"
              alt="Mapa de eclipses solares en la Península Ibérica (2026, 2027, 2028)"
              className="h-56 w-full rounded-lg object-cover object-top"
            />
            <figcaption className="mt-2 px-2 py-1.5 text-xs text-muted-foreground leading-tight">
              <strong>Tríptico de eclipses en España:</strong> Eclipse total de 2026 (Norte-Levante), eclipse total de 2027 (Sur) y eclipse anular de 2028.
            </figcaption>
          </figure>

          <figure className="overflow-hidden rounded-xl border border-border/50 bg-black/30 p-2 shadow-lg transition-transform hover:scale-[1.01]">
            <img
              src="/trayectoria-eclipse-2026-espana.jpg"
              alt="Franja de totalidad del eclipse solar del 12 de agosto de 2026"
              className="h-56 w-full rounded-lg object-cover object-center"
            />
            <figcaption className="mt-2 px-2 py-1.5 text-xs text-muted-foreground leading-tight">
              <strong>Franja de totalidad 2026:</strong> Recorrido de la umbra desde el Cantábrico cruzando la península hasta las Islas Baleares.
            </figcaption>
          </figure>

          <figure className="overflow-hidden rounded-xl border border-border/50 bg-black/30 p-2 shadow-lg transition-transform hover:scale-[1.01]">
            <img
              src="/detalle-benicarlo-eclipse.jpg"
              alt="Detalle de la franja del eclipse en el área de Benicarló y Castelló"
              className="h-56 w-full rounded-lg object-cover object-center"
            />
            <figcaption className="mt-2 px-2 py-1.5 text-xs text-muted-foreground leading-tight">
              <strong>Ubicación de Benicarló:</strong> Posición estratégica de la Fundación GEA-Reviure muy cerca de la línea central de la sombra total.
            </figcaption>
          </figure>
        </div>
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
