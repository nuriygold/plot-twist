import {
  AlertTriangle,
  ArrowDownLeft,
  Bot,
  CheckCircle2,
  Gauge,
  Webhook,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type ActivityEvent, formatRelative, liveActivity } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const iconFor = {
  message_received: ArrowDownLeft,
  agent_replied: Bot,
  webhook: Webhook,
  error: AlertTriangle,
  bias_analysis: Gauge,
  delivery: CheckCircle2,
} as const

const toneRing = {
  ok: "ring-success/30 text-success bg-success/10",
  warn: "ring-warning/30 text-warning bg-warning/10",
  error: "ring-destructive/30 text-destructive bg-destructive/10",
} as const

export function LiveActivityPanel() {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
        <div className="min-w-0">
          <CardTitle className="text-sm">Live activity</CardTitle>
          <p className="text-xs text-muted-foreground">Real-time events across all threads</p>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-2 py-1 text-[10px] font-medium text-muted-foreground">
          <span className="relative inline-flex h-1.5 w-1.5 text-success">
            <span aria-hidden className="pulse-dot" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Streaming
        </div>
      </CardHeader>

      <ScrollArea className="flex-1">
        <ul className="flex flex-col gap-1 p-2 pt-0">
          {liveActivity.map((event) => (
            <ActivityRow key={event.id} event={event} />
          ))}
        </ul>
      </ScrollArea>

      <CardContent className="border-t border-border/60 bg-secondary/20 p-3">
        <div className="grid grid-cols-3 gap-2 text-[11px]">
          <Mini label="Webhook" status="200" tone="ok" />
          <Mini label="OpenAI" status="ok" tone="ok" />
          <Mini label="Twilio" status="80% rate" tone="warn" />
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityRow({ event }: { event: ActivityEvent }) {
  const Icon = iconFor[event.type] ?? Webhook
  const tone = event.status ?? "ok"
  return (
    <li className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-secondary/40">
      <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-md ring-1", toneRing[tone])}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-xs font-medium text-foreground">{event.message}</p>
          <span className="shrink-0 text-[10px] text-muted-foreground tabular-nums">
            {formatRelative(event.timestamp)}
          </span>
        </div>
        {event.threadName && (
          <p className="truncate text-[11px] text-muted-foreground">{event.threadName}</p>
        )}
      </div>
    </li>
  )
}

function Mini({ label, status, tone }: { label: string; status: string; tone: "ok" | "warn" | "error" }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-md border border-border/60 bg-background/40 p-2">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-[12px] font-semibold",
          tone === "ok" && "text-success",
          tone === "warn" && "text-warning",
          tone === "error" && "text-destructive",
        )}
      >
        {status}
      </span>
    </div>
  )
}
