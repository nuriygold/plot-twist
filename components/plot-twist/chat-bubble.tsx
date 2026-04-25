import { Bot, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { type ChatMessage, formatRelative } from "@/lib/mock-data"

export function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.role === "system") {
    return (
      <li className="flex items-center justify-center py-1">
        <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-border bg-secondary/30 px-3 py-1 text-[11px] text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          {message.content}
          <span className="opacity-60">· {formatRelative(message.timestamp)}</span>
        </div>
      </li>
    )
  }

  const isAgent = message.role === "agent"

  return (
    <li
      className={cn(
        "flex items-end gap-2 animate-fade-in",
        isAgent ? "flex-row" : "flex-row-reverse",
      )}
    >
      <div className="flex shrink-0 flex-col items-center gap-1">
        <Avatar className={cn("h-8 w-8 ring-2", isAgent ? "ring-primary/30" : "ring-border")}>
          <AvatarFallback
            className={cn(
              "text-[10px] font-semibold",
              isAgent
                ? "bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)))] text-white"
                : "bg-secondary text-foreground/80",
            )}
          >
            {isAgent ? <Bot className="h-3.5 w-3.5" /> : initials(message.author)}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className={cn("flex max-w-[80%] min-w-0 flex-col gap-1", isAgent ? "items-start" : "items-end")}>
        <div
          className={cn(
            "flex items-center gap-2 text-[11px] text-muted-foreground",
            isAgent ? "" : "flex-row-reverse",
          )}
        >
          <span
            className={cn(
              "font-medium",
              isAgent ? "gradient-text" : "text-foreground/85",
            )}
          >
            {isAgent ? "Plot Twist" : message.author}
          </span>
          <span aria-hidden>·</span>
          <span className="tabular-nums">{formatRelative(message.timestamp)}</span>
        </div>

        <div
          className={cn(
            "relative whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed shadow-sm",
            isAgent
              ? "rounded-bl-sm border border-primary/20 bg-[linear-gradient(180deg,hsl(var(--primary)/0.10),hsl(var(--accent)/0.06))] text-foreground"
              : "rounded-br-sm border border-border bg-secondary/60 text-foreground",
          )}
        >
          {message.content}
          {isAgent && (
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-2xl rounded-bl-sm"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary) / 0.35), transparent 50%)",
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: 1,
                borderRadius: "inherit",
              }}
            />
          )}
        </div>
      </div>
    </li>
  )
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}
