import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  ImagePlus,
  Quote,
  RotateCw,
  Send,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChatBubble } from "@/components/plot-twist/chat-bubble"
import { AnalysisPanel } from "@/components/plot-twist/analysis-panel"
import { ChannelBadge } from "@/components/plot-twist/channel-badge"
import { getMessages, getThread } from "@/lib/mock-data"

type Params = { id: string }

export default async function ThreadDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params
  const thread = getThread(id)
  if (!thread) notFound()
  const messages = getMessages(id)

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Button asChild variant="ghost" size="icon" aria-label="Back to dashboard">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <ChannelBadge channel={thread.channel} />
              <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 text-[11px] font-medium text-primary">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span aria-hidden className="pulse-dot" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Live thread
              </span>
            </div>
            <h1 className="mt-1 truncate text-xl font-semibold tracking-tight">{thread.name}</h1>
            <p className="truncate font-mono text-[11px] text-muted-foreground">
              {thread.id} · {thread.participants} participants · {thread.messageCount} messages
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <CheckCircle2 className="h-3.5 w-3.5" /> Mark reviewed
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <RotateCw className="h-3.5 w-3.5" /> Regenerate
          </Button>
          <Button variant="gradient" size="sm" className="gap-2">
            <Sparkles className="h-3.5 w-3.5" /> Send counterpoint
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Chat timeline */}
        <Card className="flex h-[78vh] min-h-[560px] flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Quote className="h-3.5 w-3.5" />
              <span>Today · {thread.dominantTheme}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-7 gap-1.5">
                <Copy className="h-3 w-3" /> Copy reply
              </Button>
              <Button variant="ghost" size="sm" className="h-7 gap-1.5">
                <ImagePlus className="h-3 w-3" /> Insert meme
              </Button>
            </div>
          </div>

          <div className="scroll-fade-mask flex-1 overflow-y-auto px-4 py-6">
            <ul className="mx-auto flex max-w-3xl flex-col gap-4">
              {messages.map((m) => (
                <ChatBubble key={m.id} message={m} />
              ))}
            </ul>
          </div>

          <div className="border-t border-border/60 bg-secondary/20 p-3">
            <div className="mx-auto flex max-w-3xl items-center gap-2">
              <Input
                placeholder="Compose a counterpoint or inject a fact…"
                aria-label="Compose message"
                className="bg-background/60"
              />
              <Button variant="outline" size="sm" className="gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Inject fact
              </Button>
              <Button variant="gradient" size="sm" className="gap-1.5">
                <Send className="h-3.5 w-3.5" /> Send
              </Button>
            </div>
            <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground">
              Replies are delivered via Twilio · {thread.channel === "whatsapp" ? "WhatsApp" : "SMS"} · routed through your configured number.
            </p>
          </div>
        </Card>

        {/* Analysis panel */}
        <aside className="xl:sticky xl:top-20 xl:self-start">
          <AnalysisPanel thread={thread} />
        </aside>
      </div>
    </div>
  )
}
