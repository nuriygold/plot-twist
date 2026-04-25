import { MessageSquare, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Channel } from "@/lib/mock-data"

export function ChannelBadge({ channel, className }: { channel: Channel; className?: string }) {
  const isWA = channel === "whatsapp"
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full border px-2 text-[11px] font-medium tracking-wide",
        isWA
          ? "border-success/30 bg-success/10 text-success"
          : "border-accent/30 bg-accent/10 text-accent",
        className,
      )}
      aria-label={isWA ? "WhatsApp" : "SMS"}
    >
      {isWA ? <MessageSquare className="h-3 w-3" /> : <Phone className="h-3 w-3" />}
      {isWA ? "WhatsApp" : "SMS"}
    </span>
  )
}
