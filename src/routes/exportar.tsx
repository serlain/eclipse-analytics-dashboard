import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
const ENV_CSV =
  "https://api.thingspeak.com/channels/3386467/feeds.csv?api_key=JH8OO0QI872QHLAU";
const BIO_CSV =
  "https://api.thingspeak.com/channels/3395551/feeds.csv?api_key=GYOL2ONHMGBYOIQJ";
const ENV_JSON =
  "https://api.thingspeak.com/channels/3386467/feeds.json?api_key=JH8OO0QI872QHLAU";
const BIO_JSON =
  "https://api.thingspeak.com/channels/3395551/feeds.json?api_key=GYOL2ONHMGBYOIQJ";

const ENV_SERIES = [
  { field: "field1", label: "Temperatura", unit: "°C", color: "hsl(12 90% 60%)" },
  { field: "field2", label: "Humedad", unit: "%", color: "hsl(200 90% 60%)" },
  { field: "field4", label: "Luminosidad", unit: "lx", color: "hsl(48 95% 60%)" },
];
const BIO_SERIES = [
  { field: "field1", label: "Planta 1", unit: "mV", color: "hsl(140 70% 55%)" },
  { field: "field2", label: "Planta 2", unit: "mV", color: "hsl(160 70% 50%)" },
  { field: "field3", label: "Referencia", unit: "mV", color: "hsl(280 60% 65%)" },
  { field: "field4", label: "Humano", unit: "mV", color: "hsl(340 75% 60%)" },
];

type Feed = Record<string, string | null> & { created_at: string };

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

function buildUrl(base: string, start: string, end: string, extra?: string) {
  const params: string[] = [];
  if (start) params.push(`start=${encodeURIComponent(`${start} 00:00:00`)}`);
  if (end) params.push(`end=${encodeURIComponent(`${end} 23:59:59`)}`);
  if (extra) params.push(extra);
  return params.length ? `${base}&${params.join("&")}` : base;
}

function toChartData(feeds: Feed[], fields: { field: string }[]) {
  return feeds.map((f) => {
    const row: Record<string, number | string> = {
      t: new Date(f.created_at).getTime(),
      label: new Date(f.created_at).toLocaleString("es-ES", {
        hour12: false,
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    for (const { field } of fields) {
      const v = f[field];
      row[field] = v == null || v === "" ? NaN : parseFloat(v);
    }
    return row;
  });
}

function HistoryChart({
  title,
  data,
  series,
  loading,
  error,
}: {
  title: string;
  data: Array<Record<string, number | string>>;
  series: { field: string; label: string; unit: string; color: string }[];
  loading: boolean;
  error: string | null;
}) {
  const unit = series[0]?.unit ?? "";
  return (
    <div className="card-academic rounded-lg p-4 md:p-6">
      <div className="flex items-baseline justify-between">
        <h3 className="text-display text-lg text-foreground">{title}</h3>
        <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {loading ? "Cargando…" : `${data.length} puntos`}
        </span>
      </div>
      {error && (
        <p className="mt-2 text-mono text-xs text-destructive">Error: {error}</p>
      )}
      <div className="mt-4 h-72 w-full">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 12, left: 4, bottom: 24 }}>
              <defs>
                {series.map((s) => (
                  <linearGradient key={s.field} id={`g-${title}-${s.field}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={s.color} stopOpacity={0.45} />
                    <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.14)" strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                stroke="oklch(1 0 0 / 0.25)"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                tickLine={{ stroke: "oklch(1 0 0 / 0.14)" }}
                fontSize={10}
                minTickGap={40}
                label={{
                  value: "Momento temporal",
                  position: "insideBottom",
                  offset: -12,
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 10,
                }}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="oklch(1 0 0 / 0.35)"
                tick={{ fill: "oklch(0.90 0.02 90)", fontSize: 11 }}
                tickLine={{ stroke: "oklch(1 0 0 / 0.25)" }}
                fontSize={11}
                width={64}
                tickFormatter={(v) => (typeof v === "number" ? v.toFixed(1) : String(v))}
                label={{
                  value: unit,
                  angle: -90,
                  position: "insideLeft",
                  fill: "oklch(0.90 0.02 90)",
                  fontSize: 11,
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="oklch(1 0 0 / 0.35)"
                tick={{ fill: "oklch(0.90 0.02 90)", fontSize: 11 }}
                tickLine={{ stroke: "oklch(1 0 0 / 0.25)" }}
                fontSize={11}
                width={64}
                tickFormatter={(v) => (typeof v === "number" ? v.toFixed(1) : String(v))}
                label={{
                  value: unit,
                  angle: 90,
                  position: "insideRight",
                  fill: "oklch(0.90 0.02 90)",
                  fontSize: 11,
                }}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {series.map((s) => (
                <Area
                  key={s.field}
                  type="monotone"
                  dataKey={s.field}
                  name={s.label}
                  stroke={s.color}
                  fill={`url(#g-${title}-${s.field})`}
                  strokeWidth={1.5}
                  isAnimationActive={false}
                  connectNulls
                  dot={false}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-mono text-xs text-muted-foreground">
            {loading ? "Consultando ThingSpeak…" : "Sin datos. Pulsa «Cargar históricos»."}
          </div>
        )}
      </div>
    </div>
  );
}

function ExportarDatos() {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [downloadErr, setDownloadErr] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [envData, setEnvData] = useState<Array<Record<string, number | string>>>([]);
  const [bioData, setBioData] = useState<Array<Record<string, number | string>>>([]);
  const [loadingCharts, setLoadingCharts] = useState(false);
  const [chartsErr, setChartsErr] = useState<string | null>(null);

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
      const base = kind === "env" ? ENV_CSV : BIO_CSV;
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

  async function loadCharts() {
    setChartsErr(null);
    if (startDate && endDate && startDate > endDate) {
      setChartsErr("La fecha de inicio debe ser anterior o igual a la de fin.");
      return;
    }
    setLoadingCharts(true);
    try {
      const extra = "results=8000";
      const [envRes, bioRes] = await Promise.all([
        fetch(buildUrl(ENV_JSON, startDate, endDate, extra), { cache: "no-store" }),
        fetch(buildUrl(BIO_JSON, startDate, endDate, extra), { cache: "no-store" }),
      ]);
      if (!envRes.ok) throw new Error(`Ambiental HTTP ${envRes.status}`);
      if (!bioRes.ok) throw new Error(`Biopotenciales HTTP ${bioRes.status}`);
      const envJson = await envRes.json();
      const bioJson = await bioRes.json();
      setEnvData(toChartData(envJson.feeds ?? [], ENV_SERIES));
      setBioData(toChartData(bioJson.feeds ?? [], BIO_SERIES));
    } catch (e) {
      setChartsErr(e instanceof Error ? e.message : "Error al cargar históricos");
    } finally {
      setLoadingCharts(false);
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
      title="Descarga y Visualización de Históricos"
      lead="Selecciona opcionalmente un intervalo de fechas para descargar los CSV y visualizar las gráficas históricas de ambos canales."
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
          Si dejas ambas fechas en blanco, se usará el histórico completo disponible (máx. 8000 puntos por canal en las gráficas).
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

      <div className="mt-10 flex items-center justify-between gap-4">
        <div>
          <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Visualización
          </div>
          <h2 className="text-display text-2xl text-foreground mt-1">
            Gráficas históricas
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Aplica un intervalo de fechas (o déjalo vacío) y pulsa cargar para
            renderizar las series completas.
          </p>
        </div>
        <button
          onClick={loadCharts}
          disabled={loadingCharts}
          className="shrink-0 rounded-md border border-primary/60 bg-primary/10 px-4 py-2 text-mono text-xs uppercase tracking-[0.22em] text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
        >
          {loadingCharts ? "Cargando…" : "Cargar históricos"}
        </button>
      </div>

      {chartsErr && (
        <div className="mt-3 card-academic rounded-lg p-3 border-destructive/40 text-xs text-mono text-destructive">
          {chartsErr}
        </div>
      )}

      <div className="mt-4 grid gap-4">
        <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Variables ambientales
        </div>
        {ENV_SERIES.map((s) => (
          <HistoryChart
            key={`env-${s.field}`}
            title={s.label}
            data={envData}
            series={[s]}
            loading={loadingCharts}
            error={null}
          />
        ))}
        <div className="mt-4 text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Biopotenciales
        </div>
        {BIO_SERIES.map((s) => (
          <HistoryChart
            key={`bio-${s.field}`}
            title={s.label}
            data={bioData}
            series={[s]}
            loading={loadingCharts}
            error={null}
          />
        ))}
      </div>
    </PageShell>
  );
}
