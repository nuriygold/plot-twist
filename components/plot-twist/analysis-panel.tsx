import { ImageIcon, MessageSquareQuote, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type ThreadSummary, biasLabel } from "@/lib/mock-data"
import { BiasGauge } from "./bias-gauge"
import { cn } from "@/lib/utils"

export function AnalysisPanel({ thread }: { thread: ThreadSummary }) {
  const { label } = biasLabel(thread.biasScore)

  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-sm">Bias analysis</CardTitle>
            <Badge variant="warning">{label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 pt-0">
          <BiasGauge score={thread.biasScore} size="lg" showLabel={false} />
          <div className="grid w-full grid-cols-2 gap-2">
            <Metric label="Sentiment uniformity" value={thread.sentimentUniformity} />
            <Metric label="Keyword repetition" value={thread.keywordRepetition} />
            <Metric label="Opposing-view absence" value={thread.opposingViewAbsence} />
            <Metric
              label="Conversation velocity"
              value={Math.round(72 + thread.biasScore / 8)}
              suffix="/min"
              max={120}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Tag className="h-3.5 w-3.5 text-primary" />
            <CardTitle className="text-sm">Dominant theme</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-foreground/90">{thread.dominantTheme}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["fire-the-manager", "sack", "joke", "embarrassing", "cowards"].map((k) => (
              <Badge key={k} variant="secondary" className="rounded-md font-mono text-[11px]">
                {k}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="h-3.5 w-3.5 text-accent" />
            <CardTitle className="text-sm">Suggested counterpoint</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="rounded-lg border border-border/60 bg-secondary/30 p-3 text-[13px] leading-relaxed text-foreground/90">
            "OK, but hear me out — recent xG numbers suggest finishing, not coaching, is the gap.
            Mid-window manager swaps historically drop another 9% in points before recovery."
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
            <Tone label="Tone" value="Warm" />
            <Tone label="Confidence" value="High" />
            <Tone label="Sources" value="3" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-3.5 w-3.5 text-primary" />
            <CardTitle className="text-sm">Meme / Giphy preview</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="relative aspect-video overflow-hidden rounded-lg border border-border/60 bg-secondary/40">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(400px 200px at 30% 20%, hsl(var(--primary) / 0.25), transparent 60%), radial-gradient(400px 200px at 80% 80%, hsl(var(--accent) / 0.25), transparent 60%)",
              }}
            />
            <div className="relative flex h-full items-center justify-center text-center">
              <div>
                <div className="font-mono text-xs text-muted-foreground">[ giphy.gif ]</div>
                <div className="mt-1 text-sm font-medium">"Maybe the issue is the striker"</div>
              </div>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Auto-selected based on theme and tone. Disable in Settings.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function Metric({
  label,
  value,
  suffix = "%",
  max = 100,
}: {
  label: string
  value: number
  suffix?: string
  max?: number
}) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const tone = pct < 35 ? "good" : pct < 60 ? "watch" : pct < 80 ? "warn" : "danger"
  const fill =
    tone === "good" ? "hsl(var(--success))" :
    tone === "watch" ? "hsl(var(--accent))" :
    tone === "warn" ? "hsl(var(--warning))" : "hsl(var(--destructive))"
  return (
    <div className="rounded-lg border border-border/60 bg-secondary/20 p-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="text-[11px] font-semibold tabular-nums">
          {value}
          {suffix}
        </span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full transition-all")}
          style={{ width: `${pct}%`, background: fill }}
        />
      </div>
    </div>
  )
}

function Tone({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-md border border-border/60 bg-background/40 p-2">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-[12px] font-semibold">{value}</span>
    </div>
  )
}
