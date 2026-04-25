import { ArrowUpRight, Filter, Inbox, MessagesSquare, Plus, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThreadCard } from "@/components/plot-twist/thread-card"
import { LiveActivityPanel } from "@/components/plot-twist/live-activity-panel"
import { threads } from "@/lib/mock-data"

export default function DashboardPage() {
  const totalThreads = threads.length
  const liveThreads = threads.filter((t) => t.status === "live").length
  const totalMessages = threads.reduce((acc, t) => acc + t.messageCount, 0)
  const repliesToday = 26

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
      <PageHero />

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard
          label="Active threads"
          value={liveThreads}
          delta="+2"
          deltaTone="up"
          icon={MessagesSquare}
          accent="primary"
        />
        <KpiCard
          label="Counterpoints today"
          value={repliesToday}
          delta="+18%"
          deltaTone="up"
          icon={Sparkles}
          accent="accent"
        />
        <KpiCard
          label="Avg bias score"
          value="63"
          delta="-4"
          deltaTone="down"
          icon={Zap}
          accent="warning"
        />
        <KpiCard
          label="Inbound messages"
          value={totalMessages}
          delta="+9%"
          deltaTone="up"
          icon={Inbox}
          accent="primary"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold tracking-tight">Live conversations</h2>
              <p className="text-xs text-muted-foreground">
                {totalThreads} threads · sorted by activity
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="live">Live</TabsTrigger>
                  <TabsTrigger value="risk">High bias</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-3.5 w-3.5" /> Filter
              </Button>
              <Button variant="gradient" size="sm" className="gap-2">
                <Plus className="h-3.5 w-3.5" /> New thread
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {threads.map((t) => (
              <ThreadCard key={t.id} thread={t} />
            ))}
          </div>
        </div>

        <aside className="xl:sticky xl:top-20 xl:self-start">
          <div className="h-[680px]">
            <LiveActivityPanel />
          </div>
        </aside>
      </section>
    </div>
  )
}

function PageHero() {
  return (
    <Card className="gradient-border relative overflow-hidden border-transparent bg-card/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 220px at 80% -20%, hsl(270 95% 55% / 0.18), transparent 60%), radial-gradient(700px 240px at -10% 120%, hsl(220 95% 60% / 0.14), transparent 55%)",
        }}
      />
      <CardContent className="relative grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-[11px] font-medium text-muted-foreground">
            <span className="relative inline-flex h-1.5 w-1.5 text-primary">
              <span aria-hidden className="pulse-dot" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            3 echo chambers detected today
          </div>
          <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            Welcome back. <span className="gradient-text">Plot Twist</span> is listening.
          </h1>
          <p className="mt-1 max-w-2xl text-pretty text-sm text-muted-foreground">
            Monitoring SMS and WhatsApp group chats for groupthink. Warm counterpoints
            are queued the moment a thread tips into an echo chamber.
          </p>
        </div>
        <div className="flex items-center gap-2 md:justify-end">
          <Button variant="outline" size="sm" className="gap-2">
            View report <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
          <Button variant="gradient" size="sm" className="gap-2">
            <Sparkles className="h-3.5 w-3.5" /> Tune agent
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function KpiCard({
  label,
  value,
  delta,
  deltaTone,
  icon: Icon,
  accent,
}: {
  label: string
  value: string | number
  delta: string
  deltaTone: "up" | "down"
  icon: React.ElementType
  accent: "primary" | "accent" | "warning"
}) {
  const accentClass =
    accent === "primary" ? "text-primary bg-primary/10 ring-primary/20" :
    accent === "accent" ? "text-accent bg-accent/10 ring-accent/20" :
                          "text-warning bg-warning/10 ring-warning/20"

  return (
    <Card className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-10 h-32 w-32 rounded-full blur-3xl opacity-60"
        style={{
          background:
            accent === "primary"
              ? "radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 60%)"
              : accent === "accent"
                ? "radial-gradient(circle, hsl(var(--accent) / 0.30), transparent 60%)"
                : "radial-gradient(circle, hsl(var(--warning) / 0.25), transparent 60%)",
        }}
      />
      <CardContent className="relative p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className="mt-2 text-2xl font-semibold tabular-nums">{value}</div>
          </div>
          <span className={`grid h-9 w-9 place-items-center rounded-lg ring-1 ${accentClass}`}>
            <Icon className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs">
          <span
            className={
              deltaTone === "up"
                ? "rounded-md bg-success/10 px-1.5 py-0.5 font-medium text-success"
                : "rounded-md bg-destructive/10 px-1.5 py-0.5 font-medium text-destructive"
            }
          >
            {delta}
          </span>
          <span className="text-muted-foreground">vs last 24h</span>
        </div>
      </CardContent>
    </Card>
  )
}
