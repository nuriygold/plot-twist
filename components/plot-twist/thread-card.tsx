"use client"

import Link from "next/link"
import {
  Archive,
  EyeIcon,
  MoreHorizontal,
  Pin,
  PinOff,
  VolumeX,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { type ThreadSummary, biasLabel, formatRelative } from "@/lib/mock-data"
import { ChannelBadge } from "./channel-badge"
import { BiasGauge } from "./bias-gauge"

export function ThreadCard({ thread }: { thread: ThreadSummary }) {
  const { tone } = biasLabel(thread.biasScore)
  const accent =
    tone === "good" ? "from-success/30 via-success/0" :
    tone === "watch" ? "from-accent/30 via-accent/0" :
    tone === "warn" ? "from-warning/30 via-warning/0" :
                       "from-destructive/30 via-destructive/0"

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_18px_60px_-30px_hsl(var(--primary)/0.6)]",
      )}
    >
      {/* Subtle accent glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br blur-3xl opacity-60",
          accent,
        )}
      />

      <Link
        href={`/threads/${thread.id}`}
        aria-label={`Open thread ${thread.name}`}
        className="absolute inset-0 z-10"
      />

      <div className="relative z-20 flex items-start justify-between gap-3 p-5 pb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <ChannelBadge channel={thread.channel} />
            {thread.status === "live" && <LivePill />}
            {thread.pinned && (
              <span className="inline-flex h-6 items-center gap-1 rounded-full bg-secondary px-2 text-[11px] text-muted-foreground">
                <Pin className="h-3 w-3" /> Pinned
              </span>
            )}
          </div>
          <h3 className="mt-2 truncate text-base font-semibold tracking-tight text-foreground">
            {thread.name}
          </h3>
          <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">{thread.id}</p>
        </div>

        <ThreadMenu thread={thread} />
      </div>

      <div className="relative z-20 grid grid-cols-[1fr_auto] items-center gap-4 px-5 pb-5">
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Dominant theme
            </div>
            <div className="mt-1 line-clamp-2 text-sm text-foreground/90">
              {thread.dominantTheme}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Stat label="Sentiment" value={thread.sentimentUniformity} suffix="% uniform" />
            <Stat label="Repetition" value={thread.keywordRepetition} suffix="% keyword" />
            <Stat label="Opposition" value={thread.opposingViewAbsence} suffix="% absent" />
          </div>
        </div>

        <BiasGauge score={thread.biasScore} size="sm" showLabel />
      </div>

      <div className="relative z-20 flex items-center justify-between border-t border-border/60 bg-secondary/20 px-5 py-3 text-[12px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>{thread.messageCount} msgs</span>
          <span aria-hidden>·</span>
          <span>{thread.participants} people</span>
          {thread.unread > 0 && (
            <>
              <span aria-hidden>·</span>
              <span className="inline-flex h-5 items-center rounded-full bg-primary/15 px-2 text-[11px] font-medium text-primary">
                {thread.unread} unread
              </span>
            </>
          )}
        </div>
        <span className="tabular-nums">{formatRelative(thread.lastActive)}</span>
      </div>
    </Card>
  )
}

function Stat({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-secondary/30 p-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-semibold tabular-nums">{value}</div>
      <div className="text-[10px] leading-tight text-muted-foreground">{suffix}</div>
    </div>
  )
}

function LivePill() {
  return (
    <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 text-[11px] font-medium text-primary">
      <span className="relative inline-flex h-1.5 w-1.5">
        <span aria-hidden className="pulse-dot" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      Live
    </span>
  )
}

function ThreadMenu({ thread }: { thread: ThreadSummary }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={(e) => e.stopPropagation()}
        className="relative z-30 grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        aria-label="Thread actions"
      >
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem>
          <EyeIcon /> Inspect
        </DropdownMenuItem>
        <DropdownMenuItem>
          {thread.pinned ? <PinOff /> : <Pin />}
          {thread.pinned ? "Unpin" : "Pin"}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <VolumeX /> Mute
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <Archive /> Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
