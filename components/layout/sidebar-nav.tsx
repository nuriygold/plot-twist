"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessagesSquare, Settings2, ScrollText, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/brand/logo-mark"
import { Badge } from "@/components/ui/badge"

const items = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/threads", label: "Threads", icon: MessagesSquare, badge: "9" },
  { href: "/settings", label: "Settings", icon: Settings2 },
  { href: "/logs", label: "Logs", icon: ScrollText },
]

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="flex h-full w-full flex-col gap-2 border-r border-sidebar-border bg-sidebar p-4"
    >
      <Link
        href="/"
        onClick={onNavigate}
        className="group mb-2 flex items-center gap-3 rounded-lg p-1.5"
      >
        <LogoMark size={36} />
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-tight gradient-text">Plot Twist</div>
          <div className="truncate text-[11px] text-muted-foreground">OK, but hear me out...</div>
        </div>
      </Link>

      <ul className="mt-2 flex flex-col gap-1">
        {items.map(({ href, label, icon: Icon, badge }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-all",
                  "hover:text-sidebar-foreground hover:bg-sidebar-accent",
                  active && "text-sidebar-foreground bg-sidebar-accent",
                )}
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-[linear-gradient(180deg,hsl(var(--primary)),hsl(var(--accent)))]"
                  />
                )}
                <Icon className={cn("h-4 w-4 transition-colors", active ? "text-primary" : "text-muted-foreground")} />
                <span className="flex-1 truncate">{label}</span>
                {badge ? (
                  <Badge variant="outline" className="h-5 border-border/80 px-1.5 text-[10px]">
                    {badge}
                  </Badge>
                ) : null}
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="mt-auto">
        <div className="gradient-border relative overflow-hidden rounded-xl bg-secondary/30 p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <div className="text-sm font-medium">Plot Twist Pro</div>
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Custom system prompts, multi-agent personas, and unlimited threads.
          </p>
          <button className="mt-3 inline-flex h-7 items-center justify-center rounded-md bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)))] px-3 text-xs font-medium text-white shadow-sm transition hover:brightness-110">
            Upgrade
          </button>
        </div>
      </div>
    </nav>
  )
}
