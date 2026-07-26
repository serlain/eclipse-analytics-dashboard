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
                El milagro geométrico de los eclipses solares
              </h3>
              <h4 className="mt-3 text-lg font-semibold text-foreground">
                Una coincidencia de proporciones perfectas
              </h4>
              <p className="mt-3 leading-relaxed">
                Que la Tierra sea testigo de eclipses solares totales es el resultado de un capricho matemático fascinante. Aunque el Sol posee un diámetro unas 400 veces mayor que el de nuestro satélite, la Luna se sitúa 400 veces más próxima a nosotros.
              </p>
              <p className="mt-3 leading-relaxed">
                Esta simetría provoca que ambos astros exhiban un tamaño visual idéntico desde la superficie terrestre. Es esta alineación matemática la que permite a la Luna ocultar por completo la estrella central de nuestro sistema, regalándonos uno de los espectáculos astronómicos más sobrecogedores del cosmos.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border/40 bg-muted/10 p-4">
                  <span className="text-mono text-xs uppercase tracking-wider text-primary">Diámetro del Sol</span>
                  <p className="mt-1 text-sm font-semibold text-foreground">400 veces mayor que el de la Luna.</p>
                </div>
                <div className="rounded-lg border border-border/40 bg-muted/10 p-4">
                  <span className="text-mono text-xs uppercase tracking-wider text-primary">Distancia a la Luna</span>
                  <p className="mt-1 text-sm font-semibold text-foreground">400 veces más próxima que la del Sol.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground">
                El orden detrás del caos: La regularidad astronómica
              </h3>
              <p className="mt-3 leading-relaxed">
                Los eclipses no suceden de manera aleatoria. Cada año, la Tierra experimenta entre dos y cinco eventos solares, aunque la mayoría pasa desapercibida por ser parciales o proyectar su sombra sobre aguas oceánicas. A nivel global, un eclipse total se registra aproximadamente cada 18 meses.
              </p>
              <p className="mt-3 leading-relaxed">
                Este patrón recurrente responde a la serie Saros. Transcurridos 223 meses lunares (el equivalente al ciclo de 18 años y las horas adicionales), el Sol, la Tierra y la Luna regresan a una configuración casi idéntica, replicando un evento con características muy parecidas al anterior.
              </p>
              <p className="mt-3 leading-relaxed">
                Sin embargo, el factor decisivo reside en esas 8 horas adicionales: durante ese lapso, el planeta rota sobre su propio eje, provocando que el siguiente eclipse se desplace en la superficie terrestre unos 120 grados hacia el oeste.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground">
                Una alineación sumamente inusual
              </h3>
              <p className="mt-3 leading-relaxed">
                Si la Luna orbita la Tierra constantemente, ¿por qué no hay eclipses todos los meses? La respuesta está en la inclinación de la órbita lunar respecto al plano terrestre. La mayoría del tiempo, la sombra proyectada por nuestro satélite pasa por encima o por debajo de la Tierra.
              </p>
              <p className="mt-3 leading-relaxed">
                Para que se produzca la totalidad, se requiere un encaje astronómico perfecto. Como resultado, la franja terrestre desde la que se aprecia la fase total es extremadamente estrecha —apenas un corredor de unos pocos cientos de kilómetros—. Por esta razón, aunque sucedan cada año y medio en algún punto del globo, presenciar un eclipse total desde una misma localización es un acontecimiento que solo ocurre una vez cada varios siglos.
              </p>
            </div>

            <div className="rounded-lg border border-primary/30 bg-primary/5 p-5 space-y-2">
              <span className="text-mono text-xs font-bold uppercase tracking-widest text-primary">💡 Dato astronómico</span>
              <h4 className="text-lg font-semibold text-foreground">
                La fecha de caducidad de los eclipses
              </h4>
              <p className="text-sm leading-relaxed text-foreground/90">
                Nuestro satélite se distorsiona en su trayectoria y se distorsiona distanciándose a una velocidad constante de 3,8 centímetros por año.
              </p>
              <p className="text-sm leading-relaxed text-foreground/90">
                A escala humana resulta imperceptible, pero dentro de cientos de millones de años la distancia será tal que la Luna se verá demasiado pequeña como para tapar el Sol por completo. En ese futuro distante, la Tierra dirá adiós a los eclipses totales para presenciar únicamente eventos anulares y parciales.
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
