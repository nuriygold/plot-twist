"use client"

import { useState } from "react"
import { Bell, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { LogoMark } from "@/components/brand/logo-mark"
import { SidebarNav } from "./sidebar-nav"

export function TopHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl md:px-6"
    >
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarNav onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 items-center gap-3 md:hidden">
        <LogoMark size={28} />
        <span className="text-sm font-semibold tracking-tight">Plot Twist</span>
      </div>

      <div className="hidden min-w-0 items-center gap-3 md:flex">
        <div className="flex min-w-0 flex-col">
          <h1 className="truncate text-base font-semibold leading-tight">
            Plot Twist <span className="text-muted-foreground"> · console</span>
          </h1>
          <p className="truncate text-xs text-muted-foreground">"OK, but hear me out..."</p>
        </div>
      </div>

      <div className="ml-2 hidden items-center gap-2 md:flex">
        <LiveStatus />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search threads, logs, env…"
            className="h-9 w-[260px] pl-8 lg:w-[340px]"
            aria-label="Search"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden h-5 -translate-y-1/2 items-center rounded border border-border bg-secondary px-1.5 font-mono text-[10px] text-muted-foreground md:inline-flex">
            ⌘K
          </kbd>
        </div>

        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent shadow-[0_0_0_2px_hsl(var(--background))]" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 rounded-full border border-border/70 bg-secondary/60 p-1 pr-2 transition-colors hover:bg-secondary"
              aria-label="Profile menu"
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)))] text-white">
                  PT
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-xs font-medium md:inline">admin</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Plot Twist Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function LiveStatus() {
  return (
    <Badge variant="outline" className="gap-2 border-border/80 bg-secondary/40 py-1 pl-2 pr-2.5">
      <span className="relative inline-flex h-2 w-2 text-success">
        <span aria-hidden className="pulse-dot" />
        <span className="relative h-2 w-2 rounded-full bg-success" />
      </span>
      <span className="text-[11px] font-medium tracking-wide text-foreground/90">All systems live</span>
    </Badge>
  )
}
