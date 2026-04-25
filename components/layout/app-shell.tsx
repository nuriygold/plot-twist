import type React from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarNav } from "./sidebar-nav"
import { TopHeader } from "./top-header"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex min-h-screen w-full">
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="sticky top-0 h-screen">
            <SidebarNav />
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <TopHeader />
          <main className="flex-1 px-4 pb-12 pt-6 md:px-8">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  )
}
