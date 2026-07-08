import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/mediciones")({
  component: Dashboard,
});

// ---------- Config ----------
const ENV_URL =
  "https://api.thingspeak.com/channels/3386467/feeds.json?api_key=JH8OO0QI872QHLAU&results=30";
const BIO_URL =
  "https://api.thingspeak.com/channels/3395551/feeds.json?api_key=GYOL2ONHMGBYOIQJ&results=30";
const REFRESH_MS = 15_000;
const ECLIPSE_DATE = new Date("2026-08-12T18:00:00Z");

type Feed = Record<string, string | null> & { created_at: string };
type Channel = {
  channel: Record<string, string>;
  feeds: Feed[];
};

type SeriesDef = {
  key: string;
  field: string;
  label: string;
  unit: string;
  color: string;
  source: "env" | "bio";
};

const SERIES: SeriesDef[] = [
  { key: "temp",   field: "field1", label: "Temperatura",        unit: "°C",   color: "var(--color-chart-1)", source: "env" },
  { key: "hum",    field: "field2", label: "Humedad Ambiente",   unit: "%",    color: "var(--color-chart-2)", source: "env" },
  { key: "lux",    field: "field4", label: "Luminosidad",        unit: "lx",   color: "var(--color-chart-3)", source: "env" },
  { key: "bio1",   field: "field1", label: "Biopotencial Planta 1",   unit: "mV",   color: "var(--color-chart-4)", source: "bio" },
  { key: "bio2",   field: "field2", label: "Biopotencial Planta 2",   unit: "mV",   color: "var(--color-chart-5)", source: "bio" },
  { key: "bio3",   field: "field3", label: "Biopotencial Referencia", unit: "mV",   color: "var(--color-chart-6)", source: "bio" },
  { key: "bio4",   field: "field4", label: "Biopotencial Humano",     unit: "mV",   color: "var(--color-chart-7)", source: "bio" },
];

// ---------- Helpers ----------
function toPoints(feeds: Feed[] | undefined, field: string) {
  if (!feeds) return [];
  return feeds
    .map((f) => {
      const raw = f[field];
      const v = raw == null ? NaN : parseFloat(raw);
      return {
        t: new Date(f.created_at).getTime(),
        label: new Date(f.created_at).toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
        value: isNaN(v) ? null : v,
      };
    })
    .filter((p) => p.value !== null);
}

function fmt(n: number | null | undefined, digits = 2) {
  if (n == null || isNaN(n)) return "—";
  return n.toLocaleString("es-MX", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now == null ? 0 : Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, ready: now != null };
}


// ---------- Data hook ----------
function useChannel(url: string) {
  const [data, setData] = useState<Channel | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as Channel;
        if (!alive) return;
        setData(json);
        setErr(null);
        setLastFetch(Date.now());
      } catch (e: unknown) {
        if (!alive) return;
        setErr(e instanceof Error ? e.message : "Error de red");
      }
    };
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [url]);

  return { data, err, lastFetch };
}

// ---------- Components ----------
function LiveDot() {
  return (
    <span className="inline-flex items-center gap-2 text-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
      <span className="pulse-live inline-block h-1.5 w-1.5 rounded-full bg-primary" />
      En vivo
    </span>
  );
}

function StatCard({
  label,
  value,
  unit,
  color,
  sub,
}: {
  label: string;
  value: number | null | undefined;
  unit: string;
  color: string;
  sub?: string;
}) {
  return (
    <div className="card-academic rounded-lg p-4 relative overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
      <div className="flex items-center justify-between">
        <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </span>
        <span className="text-mono text-[10px] text-muted-foreground/70">{unit}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-display text-3xl leading-none" style={{ color }}>
          {fmt(value)}
        </span>
        <span className="text-mono text-xs text-muted-foreground">{unit}</span>
      </div>
      {sub && <div className="mt-1 text-mono text-[10px] text-muted-foreground/80">{sub}</div>}
    </div>
  );
}

function ChartPanel({ series, points }: { series: SeriesDef; points: ReturnType<typeof toPoints> }) {
  const gradId = `grad-${series.key}`;
  const last = points.at(-1)?.value ?? null;
  const first = points[0]?.value ?? null;
  const delta = last != null && first != null ? last - first : null;
  const trendUp = delta != null && delta > 0;

  return (
    <div className="card-academic rounded-lg p-4 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {series.source === "env" ? "Ambiental" : "Biopotencial"} · {series.field}
          </div>
          <div className="text-display text-lg mt-0.5" style={{ color: series.color }}>
            {series.label}
          </div>
        </div>
        <div className="text-right">
          <div className="text-mono text-xl" style={{ color: series.color }}>
            {fmt(last)}<span className="text-xs text-muted-foreground ml-1">{series.unit}</span>
          </div>
          {delta != null && (
            <div className={`text-mono text-[10px] ${trendUp ? "text-primary" : "text-accent"}`}>
              {trendUp ? "▲" : "▼"} {fmt(Math.abs(delta))}
            </div>
          )}
        </div>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={series.color} stopOpacity={0.45} />
                <stop offset="100%" stopColor={series.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="oklch(1 0 0 / 0.06)" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "oklch(0.68 0.03 90)", fontSize: 10, fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "oklch(1 0 0 / 0.1)" }}
              tickLine={false}
              minTickGap={30}
            />
            <YAxis
              tick={{ fill: "oklch(0.68 0.03 90)", fontSize: 10, fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "oklch(1 0 0 / 0.1)" }}
              tickLine={false}
              width={56}
              domain={["auto", "auto"]}
              tickFormatter={(v: number) => fmt(v, 1)}
            />

            <Tooltip
              contentStyle={{
                background: "oklch(0.18 0.02 260 / 0.95)",
                border: "1px solid oklch(1 0 0 / 0.1)",
                borderRadius: 6,
                fontFamily: "JetBrains Mono",
                fontSize: 11,
                color: "oklch(0.94 0.02 90)",
              }}
              labelStyle={{ color: "oklch(0.68 0.03 90)" }}
              formatter={(v: number) => [`${fmt(v)} ${series.unit}`, series.label]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={series.color}
              strokeWidth={1.8}
              fill={`url(#${gradId})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Dashboard() {
  const env = useChannel(ENV_URL);
  const bio = useChannel(BIO_URL);
  const { d, h, m, s, ready } = useCountdown(ECLIPSE_DATE);

  const seriesData = useMemo(() => {
    return SERIES.map((s) => {
      const ch = s.source === "env" ? env.data : bio.data;
      return { def: s, points: toPoints(ch?.feeds, s.field) };
    });
  }, [env.data, bio.data]);

  const envName = env.data?.channel?.name ?? "Canal Ambiental";
  const bioName = bio.data?.channel?.name ?? "Canal Biopotenciales";
  const lastUpdate = Math.max(env.lastFetch ?? 0, bio.lastFetch ?? 0);

  return (
    <main className="bg-starfield min-h-screen">
      <div className="mx-auto max-w-[1500px] px-6 py-8">
        {/* Header */}
        <header className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <div className="text-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              Proyecto Medición Biopotencial en Plantas y Personas ante el Eclipse Solar
            </div>
            <h1 className="text-display text-4xl md:text-5xl mt-2 text-foreground">
              Eclipse Solar del 12 de Agosto, 2026
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
              Medición sincronizada de variables ambientales y biopotenciales durante la
              totalidad. Telemetría transmitida vía ThingSpeak con actualización continua.
            </p>
          </div>
          <div className="card-academic rounded-lg px-5 py-3 min-w-[260px]">
            <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Cuenta regresiva
            </div>
            <div className="text-display text-2xl text-primary text-mono mt-1">
              {ready
                ? `${String(d).padStart(2, "0")}d : ${String(h).padStart(2, "0")}h : ${String(m).padStart(2, "0")}m : ${String(s).padStart(2, "0")}s`
                : "—d : —h : —m : —s"}
            </div>
            <div className="mt-1 flex items-center justify-between">
              <LiveDot />
              <span className="text-mono text-[10px] text-muted-foreground">
                {lastUpdate
                  ? new Date(lastUpdate).toLocaleTimeString("es-MX", { hour12: false })
                  : "—"}
              </span>
            </div>
          </div>
        </header>

        {/* Errors */}
        {(env.err || bio.err) && (
          <div className="mb-6 card-academic rounded-lg p-3 border-destructive/40 text-xs text-mono text-destructive">
            {env.err && <div>Canal ambiental: {env.err}</div>}
            {bio.err && <div>Canal biopotenciales: {bio.err}</div>}
          </div>
        )}

        {/* Section: Environmental */}
        <section className="mb-10">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-display text-2xl text-foreground">
              I. Variables Ambientales
            </h2>
            <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Canal 3386467 · {envName}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {SERIES.filter((s) => s.source === "env").map((s) => {
              const last = seriesData.find((x) => x.def.key === s.key)?.points.at(-1)?.value ?? null;
              return (
                <StatCard
                  key={s.key}
                  label={`${s.field.toUpperCase()} · ${s.label}`}
                  value={last}
                  unit={s.unit}
                  color={s.color}
                />
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {seriesData
              .filter((x) => x.def.source === "env")
              .map((x) => (
                <ChartPanel key={x.def.key} series={x.def} points={x.points} />
              ))}
          </div>
        </section>

        {/* Section: Biopotentials */}
        <section className="mb-10">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-display text-2xl text-foreground">
              II. Biopotenciales
            </h2>
            <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Canal 3395551 · {bioName}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {SERIES.filter((s) => s.source === "bio").map((s) => {
              const last = seriesData.find((x) => x.def.key === s.key)?.points.at(-1)?.value ?? null;
              return (
                <StatCard
                  key={s.key}
                  label={`${s.field.toUpperCase()} · ${s.label}`}
                  value={last}
                  unit={s.unit}
                  color={s.color}
                />
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seriesData
              .filter((x) => x.def.source === "bio")
              .map((x) => (
                <ChartPanel key={x.def.key} series={x.def} points={x.points} />
              ))}
          </div>
        </section>

        <footer className="mt-12 border-t border-border pt-6 flex flex-wrap justify-between gap-4 text-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Fuente de datos · ThingSpeak API</span>
          <span>Refresco cada {REFRESH_MS / 1000}s</span>
          <span>Estación de Monitoreo Eclipse · MMXXVI</span>
        </footer>
      </div>
    </main>
  );
}
