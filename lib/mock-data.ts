export type Channel = "sms" | "whatsapp"

export type ThreadSummary = {
  id: string
  name: string
  channel: Channel
  messageCount: number
  unread: number
  lastActive: string // ISO
  dominantTheme: string
  biasScore: number // 0 (balanced) - 100 (full echo chamber)
  sentimentUniformity: number // 0-100
  keywordRepetition: number // 0-100
  opposingViewAbsence: number // 0-100
  participants: number
  pinned?: boolean
  muted?: boolean
  status: "live" | "idle" | "archived"
}

export type ChatMessage = {
  id: string
  threadId: string
  author: string
  role: "human" | "agent" | "system"
  content: string
  timestamp: string
  channel?: Channel
  reactions?: string[]
}

export type ActivityEvent = {
  id: string
  type:
    | "message_received"
    | "agent_replied"
    | "webhook"
    | "error"
    | "bias_analysis"
    | "delivery"
  threadId?: string
  threadName?: string
  message: string
  timestamp: string
  status?: "ok" | "warn" | "error"
}

export type LogEntry = {
  id: string
  timestamp: string
  category: "webhook" | "processing" | "analysis" | "generation" | "delivery"
  threadName?: string
  message: string
  status: "ok" | "warn" | "error"
  durationMs?: number
}

export const threads: ThreadSummary[] = [
  {
    id: "thr_01HX9ZAM3K",
    name: "Sunday League Lads",
    channel: "whatsapp",
    messageCount: 248,
    unread: 7,
    lastActive: relative(2),
    dominantTheme: "Manager out, hire from within",
    biasScore: 86,
    sentimentUniformity: 92,
    keywordRepetition: 78,
    opposingViewAbsence: 81,
    participants: 11,
    pinned: true,
    status: "live",
  },
  {
    id: "thr_01HX9ZBN7P",
    name: "Q4 Launch — Core Team",
    channel: "sms",
    messageCount: 84,
    unread: 2,
    lastActive: relative(14),
    dominantTheme: "Ship Friday, polish later",
    biasScore: 64,
    sentimentUniformity: 71,
    keywordRepetition: 55,
    opposingViewAbsence: 60,
    participants: 6,
    status: "live",
  },
  {
    id: "thr_01HX9ZCQ4R",
    name: "Brunch Crew",
    channel: "whatsapp",
    messageCount: 412,
    unread: 0,
    lastActive: relative(46),
    dominantTheme: "That new oat-milk place is overrated",
    biasScore: 49,
    sentimentUniformity: 58,
    keywordRepetition: 41,
    opposingViewAbsence: 44,
    participants: 5,
    status: "idle",
  },
]

export const messagesByThread: Record<string, ChatMessage[]> = {
  thr_01HX9ZAM3K: [
    {
      id: "m1",
      threadId: "thr_01HX9ZAM3K",
      author: "system",
      role: "system",
      content: "Plot Twist joined the thread",
      timestamp: relative(58),
    },
    {
      id: "m2",
      threadId: "thr_01HX9ZAM3K",
      author: "Marcus",
      role: "human",
      content: "Bro the manager has GOT to go. Three losses in a row, no excuse.",
      timestamp: relative(54),
    },
    {
      id: "m3",
      threadId: "thr_01HX9ZAM3K",
      author: "Devon",
      role: "human",
      content: "100%. Fire him tonight. Promote Coach K, easy fix.",
      timestamp: relative(52),
    },
    {
      id: "m4",
      threadId: "thr_01HX9ZAM3K",
      author: "Sam",
      role: "human",
      content: "Agreed. Same XI, same problems, same result. Insanity.",
      timestamp: relative(50),
    },
    {
      id: "m5",
      threadId: "thr_01HX9ZAM3K",
      author: "Marcus",
      role: "human",
      content: "Cant believe nobody on the board is saying anything. Cowards.",
      timestamp: relative(48),
    },
    {
      id: "m6",
      threadId: "thr_01HX9ZAM3K",
      author: "Plot Twist",
      role: "agent",
      content:
        "OK, but hear me out — the last three losses were against top-of-table sides, and xG was actually up 18% week-over-week. The shots are coming, the finishing isn't. Swapping the manager mid-window historically drops points another 9% before recovery. Maybe the fix is the striker, not the gaffer?",
      timestamp: relative(46),
    },
    {
      id: "m7",
      threadId: "thr_01HX9ZAM3K",
      author: "system",
      role: "system",
      content: "Response sent via Twilio · WhatsApp",
      timestamp: relative(46),
    },
    {
      id: "m8",
      threadId: "thr_01HX9ZAM3K",
      author: "Devon",
      role: "human",
      content: "...ok that's actually a fair point. Forgot about the xG.",
      timestamp: relative(40),
    },
    {
      id: "m9",
      threadId: "thr_01HX9ZAM3K",
      author: "Sam",
      role: "human",
      content: "Still annoying tho lol. But yeah maybe the #9 is the issue.",
      timestamp: relative(38),
    },
  ],
  thr_01HX9ZBN7P: [
    {
      id: "n1",
      threadId: "thr_01HX9ZBN7P",
      author: "system",
      role: "system",
      content: "Plot Twist joined the thread",
      timestamp: relative(120),
    },
    {
      id: "n2",
      threadId: "thr_01HX9ZBN7P",
      author: "Priya",
      role: "human",
      content: "We should just ship Friday. Polish in v1.1, ship and learn.",
      timestamp: relative(40),
    },
    {
      id: "n3",
      threadId: "thr_01HX9ZBN7P",
      author: "Jordan",
      role: "human",
      content: "+1, momentum matters more than perfection.",
      timestamp: relative(36),
    },
    {
      id: "n4",
      threadId: "thr_01HX9ZBN7P",
      author: "Alex",
      role: "human",
      content: "Yeah lets just ship.",
      timestamp: relative(32),
    },
    {
      id: "n5",
      threadId: "thr_01HX9ZBN7P",
      author: "Plot Twist",
      role: "agent",
      content:
        "Hear me out — the onboarding flow still has a 22% drop-off on step 2 in the staging metrics. Shipping Friday is great for momentum, but a one-day fix on that step is worth more than a week of post-launch retention work. Want me to draft the Linear ticket?",
      timestamp: relative(28),
    },
    {
      id: "n6",
      threadId: "thr_01HX9ZBN7P",
      author: "Priya",
      role: "human",
      content: "Ugh. Fine. Friday + the step 2 fix. Compromise.",
      timestamp: relative(20),
    },
  ],
  thr_01HX9ZCQ4R: [
    {
      id: "b1",
      threadId: "thr_01HX9ZCQ4R",
      author: "system",
      role: "system",
      content: "Plot Twist joined the thread",
      timestamp: relative(180),
    },
    {
      id: "b2",
      threadId: "thr_01HX9ZCQ4R",
      author: "Téa",
      role: "human",
      content: "That new oat-milk place is SO overrated. Mid latte, mid pastry, $11.",
      timestamp: relative(90),
    },
    {
      id: "b3",
      threadId: "thr_01HX9ZCQ4R",
      author: "Mo",
      role: "human",
      content: "Truly. The vibe is fine, the coffee is not.",
      timestamp: relative(88),
    },
    {
      id: "b4",
      threadId: "thr_01HX9ZCQ4R",
      author: "Plot Twist",
      role: "agent",
      content:
        "Counterpoint with love — they sourced this season's beans from a co-op in Huila and the grind is intentionally coarser. Try the cortado, not the latte. If it's still mid I'll personally venmo you back.",
      timestamp: relative(80),
    },
    {
      id: "b5",
      threadId: "thr_01HX9ZCQ4R",
      author: "Téa",
      role: "human",
      content: "lol fine. Cortado round 2 next Sunday.",
      timestamp: relative(60),
    },
  ],
}

export const liveActivity: ActivityEvent[] = [
  {
    id: "a1",
    type: "message_received",
    threadId: "thr_01HX9ZAM3K",
    threadName: "Sunday League Lads",
    message: "New inbound message from Marcus",
    timestamp: relative(0.4),
    status: "ok",
  },
  {
    id: "a2",
    type: "bias_analysis",
    threadId: "thr_01HX9ZAM3K",
    threadName: "Sunday League Lads",
    message: "Bias score updated: 86 (Echo Chamber)",
    timestamp: relative(0.5),
    status: "warn",
  },
  {
    id: "a3",
    type: "agent_replied",
    threadId: "thr_01HX9ZAM3K",
    threadName: "Sunday League Lads",
    message: "Counterpoint generated and queued for delivery",
    timestamp: relative(0.7),
    status: "ok",
  },
  {
    id: "a4",
    type: "webhook",
    threadName: "Twilio",
    message: "Webhook 200 — message.delivered",
    timestamp: relative(0.9),
    status: "ok",
  },
  {
    id: "a5",
    type: "message_received",
    threadId: "thr_01HX9ZBN7P",
    threadName: "Q4 Launch — Core Team",
    message: "New inbound message from Jordan",
    timestamp: relative(2),
    status: "ok",
  },
  {
    id: "a6",
    type: "error",
    threadName: "Twilio",
    message: "Rate limit warning — 80% of channel quota",
    timestamp: relative(4),
    status: "warn",
  },
]

export const logs: LogEntry[] = [
  {
    id: "l1",
    timestamp: relative(0.4),
    category: "webhook",
    threadName: "Sunday League Lads",
    message: "POST /api/twilio/webhook · 200",
    status: "ok",
    durationMs: 84,
  },
  {
    id: "l2",
    timestamp: relative(0.5),
    category: "processing",
    threadName: "Sunday League Lads",
    message: "Parsed inbound SMS, deduped against window",
    status: "ok",
    durationMs: 12,
  },
  {
    id: "l3",
    timestamp: relative(0.6),
    category: "analysis",
    threadName: "Sunday League Lads",
    message: "Bias score 86 · sentiment uniformity 92 · keyword repetition 78",
    status: "warn",
    durationMs: 312,
  },
  {
    id: "l4",
    timestamp: relative(0.7),
    category: "generation",
    threadName: "Sunday League Lads",
    message: "OpenAI gpt-4o-mini · 412 tokens · cached: false",
    status: "ok",
    durationMs: 884,
  },
  {
    id: "l5",
    timestamp: relative(0.8),
    category: "delivery",
    threadName: "Sunday League Lads",
    message: "Twilio · WhatsApp · message.queued",
    status: "ok",
    durationMs: 121,
  },
  {
    id: "l6",
    timestamp: relative(2),
    category: "webhook",
    threadName: "Q4 Launch — Core Team",
    message: "POST /api/twilio/webhook · 200",
    status: "ok",
    durationMs: 78,
  },
  {
    id: "l7",
    timestamp: relative(4),
    category: "delivery",
    threadName: "Twilio",
    message: "Rate limit warning · 80% of channel quota used",
    status: "warn",
    durationMs: 0,
  },
  {
    id: "l8",
    timestamp: relative(7),
    category: "analysis",
    threadName: "Brunch Crew",
    message: "Bias score 49 · within healthy range, no reply",
    status: "ok",
    durationMs: 244,
  },
  {
    id: "l9",
    timestamp: relative(11),
    category: "generation",
    threadName: "Q4 Launch — Core Team",
    message: "OpenAI gpt-4o-mini · failed: timeout · retried: success",
    status: "warn",
    durationMs: 2940,
  },
  {
    id: "l10",
    timestamp: relative(20),
    category: "webhook",
    threadName: "Twilio",
    message: "POST /api/twilio/webhook · 401 invalid signature",
    status: "error",
    durationMs: 9,
  },
]

function relative(minutesAgo: number): string {
  const d = new Date()
  d.setMinutes(d.getMinutes() - minutesAgo)
  return d.toISOString()
}

export function getThread(id: string) {
  return threads.find((t) => t.id === id)
}

export function getMessages(id: string) {
  return messagesByThread[id] ?? []
}

export function biasLabel(score: number): {
  label: string
  tone: "good" | "watch" | "warn" | "danger"
} {
  if (score < 35) return { label: "Balanced", tone: "good" }
  if (score < 60) return { label: "Slight Lean", tone: "watch" }
  if (score < 80) return { label: "Echo Chamber", tone: "warn" }
  return { label: "Full Echo Chamber", tone: "danger" }
}

export function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.round(diff / 60000)
  if (m < 1) return "just now"
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  const days = Math.round(h / 24)
  return `${days}d ago`
}
