import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/exportar")({
  component: ExportarDatos,
  head: () => ({
    meta: [
      { title: "Exportar Datos · Proyecto Biopotencial Eclipse 2026" },
      {
        name: "description",
        content:
          "Descarga el histórico de variables ambientales y biopotenciales registrados durante el eclipse solar del 12 de agosto de 2026.",
      },
      { property: "og:title", content: "Exportar Datos · Proyecto Biopotencial Eclipse 2026" },
      {
        property: "og:description",
        content:
          "Descarga el histórico de variables ambientales y biopotenciales registrados durante el eclipse solar del 12 de agosto de 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

const PASSWORD = "GEA2026";
const ENV_BASE =
  "https://api.thingspeak.com/channels/3386467/feeds.csv?api_key=JH8OO0QI872QHLAU";
const BIO_BASE =
  "https://api.thingspeak.com/channels/3395551/feeds.csv?api_key=GYOL2ONHMGBYOIQJ";

function timestamp() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

async function downloadCSV(url: string, filename: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
}

function buildUrl(base: string, start: string, end: string) {
  const params: string[] = [];
  if (start) params.push(`start=${encodeURIComponent(`${start} 00:00:00`)}`);
  if (end) params.push(`end=${encodeURIComponent(`${end} 23:59:59`)}`);
  return params.length ? `${base}&${params.join("&")}` : base;
}

function ExportarDatos() {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [downloadErr, setDownloadErr] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (input === PASSWORD) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  async function handleDownload(kind: "env" | "bio") {
    setDownloadErr(null);
    if (startDate && endDate && startDate > endDate) {
      setDownloadErr("La fecha de inicio debe ser anterior o igual a la de fin.");
      return;
    }
    setBusy(kind);
    try {
      const base = kind === "env" ? ENV_BASE : BIO_BASE;
      const url = buildUrl(base, startDate, endDate);
      const range = startDate || endDate ? `_${startDate || "inicio"}_${endDate || "hoy"}` : "";
      const name =
        kind === "env"
          ? `historico-ambiental${range}-${timestamp()}.csv`
          : `historico-biopotenciales${range}-${timestamp()}.csv`;
      await downloadCSV(url, name);
    } catch (e) {
      setDownloadErr(e instanceof Error ? e.message : "Error de descarga");
    } finally {
      setBusy(null);
    }
  }

  if (!unlocked) {
    return (
      <PageShell
        eyebrow="07 · Exportar Datos"
        title="Acceso Restringido"
        lead="Introduce la contraseña para descargar los históricos de datos registrados durante el experimento."
      >
        <form onSubmit={submit} className="card-academic rounded-lg p-6 max-w-md">
          <label className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Contraseña
          </label>
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            className="mt-2 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-mono text-sm text-foreground outline-none focus:border-primary"
            autoFocus
          />
          {error && (
            <p className="mt-2 text-mono text-xs text-destructive">
              Contraseña incorrecta.
            </p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-md border border-primary/60 bg-primary/10 px-4 py-2 text-mono text-xs uppercase tracking-[0.22em] text-primary transition-colors hover:bg-primary/20"
          >
            Acceder
          </button>
        </form>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="07 · Exportar Datos"
      title="Descarga de Históricos"
      lead="Selecciona opcionalmente un intervalo de fechas y obtén los registros almacenados en ThingSpeak en formato CSV."
    >
      <div className="card-academic rounded-lg p-6 mb-4">
        <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Intervalo de fechas (opcional)
        </div>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Desde
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-mono text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Hasta
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-mono text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Si dejas ambas fechas en blanco, se descargará el histórico completo disponible.
        </p>
        {(startDate || endDate) && (
          <button
            type="button"
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            className="mt-2 text-mono text-[10px] uppercase tracking-[0.22em] text-primary hover:underline"
          >
            Limpiar intervalo
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card-academic rounded-lg p-6">
          <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Canal 3386467
          </div>
          <h3 className="text-display text-xl text-foreground mt-1">
            Variables Ambientales
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Temperatura, humedad relativa y luminosidad registradas por la
            estación de campo.
          </p>
          <button
            onClick={() => handleDownload("env")}
            disabled={busy !== null}
            className="mt-4 w-full rounded-md border border-primary/60 bg-primary/10 px-4 py-2 text-mono text-xs uppercase tracking-[0.22em] text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
          >
            {busy === "env" ? "Descargando…" : "Descargar Histórico variables ambientales en CSV"}
          </button>
        </div>

        <div className="card-academic rounded-lg p-6">
          <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Canal 3395551
          </div>
          <h3 className="text-display text-xl text-foreground mt-1">
            Biopotenciales
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Registros de biopotencial de las dos plantas, canal de referencia
            y sujeto humano.
          </p>
          <button
            onClick={() => handleDownload("bio")}
            disabled={busy !== null}
            className="mt-4 w-full rounded-md border border-primary/60 bg-primary/10 px-4 py-2 text-mono text-xs uppercase tracking-[0.22em] text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
          >
            {busy === "bio" ? "Descargando…" : "Descargar Histórico biopotenciales en CSV"}
          </button>
        </div>
      </div>

      {downloadErr && (
        <div className="mt-4 card-academic rounded-lg p-3 border-destructive/40 text-xs text-mono text-destructive">
          Error al descargar: {downloadErr}
        </div>
      )}
    </PageShell>
  );
}
