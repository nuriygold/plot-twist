import { cn } from "@/lib/utils"
import { biasLabel } from "@/lib/mock-data"

type Props = {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

/**
 * Half-circle analytical gauge from 0 (Balanced) -> 100 (Full Echo Chamber).
 * Pure SVG with a gradient stroke for that "real instrument" feeling.
 */
export function BiasGauge({ score, size = "md", showLabel = true, className }: Props) {
  const clamped = Math.max(0, Math.min(100, score))
  const { label, tone } = biasLabel(clamped)

  const dims =
    size === "sm" ? { w: 120, h: 70, stroke: 10, font: 18, sub: 10 } :
    size === "lg" ? { w: 240, h: 140, stroke: 16, font: 36, sub: 12 } :
                    { w: 180, h: 105, stroke: 13, font: 28, sub: 11 }

  // Half-circle path: from (stroke,h) to (w-stroke,h) arcing up.
  const r = (dims.w - dims.stroke * 2) / 2
  const cx = dims.w / 2
  const cy = dims.h - dims.stroke / 2
  const startX = cx - r
  const endX = cx + r
  const path = `M ${startX} ${cy} A ${r} ${r} 0 0 1 ${endX} ${cy}`

  // Length of half circle ≈ π * r
  const length = Math.PI * r
  const dash = (clamped / 100) * length

  const toneColor =
    tone === "good" ? "hsl(var(--success))" :
    tone === "watch" ? "hsl(var(--accent))" :
    tone === "warn" ? "hsl(var(--warning))" :
                       "hsl(var(--destructive))"

  // Gradient stops shift slightly with tone
  const gradId = `bg-grad-${size}-${Math.round(clamped)}`

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg
        width={dims.w}
        height={dims.h + 4}
        viewBox={`0 0 ${dims.w} ${dims.h + 4}`}
        role="img"
        aria-label={`Bias score ${clamped} of 100, ${label}`}
      >
        <defs>
          <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(var(--success))" />
            <stop offset="45%" stopColor="hsl(var(--accent))" />
            <stop offset="75%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--destructive))" />
          </linearGradient>
        </defs>

        {/* Track */}
        <path
          d={path}
          stroke="hsl(var(--secondary))"
          strokeWidth={dims.stroke}
          strokeLinecap="round"
          fill="none"
        />
        {/* Tick marks */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const angle = Math.PI - Math.PI * t
          const inner = r - dims.stroke / 2 - 2
          const outer = r + dims.stroke / 2 + 2
          const x1 = cx + Math.cos(angle) * inner
          const y1 = cy - Math.sin(angle) * inner
          const x2 = cx + Math.cos(angle) * outer
          const y2 = cy - Math.sin(angle) * outer
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(var(--border))"
              strokeWidth={1}
            />
          )
        })}
        {/* Filled arc */}
        <path
          d={path}
          stroke={`url(#${gradId})`}
          strokeWidth={dims.stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${dash} ${length}`}
          style={{ transition: "stroke-dasharray 600ms cubic-bezier(0.4,0,0.2,1)" }}
        />
        {/* Needle */}
        {(() => {
          const angle = Math.PI - Math.PI * (clamped / 100)
          const tipR = r - dims.stroke / 2 - 4
          const tipX = cx + Math.cos(angle) * tipR
          const tipY = cy - Math.sin(angle) * tipR
          return (
            <g>
              <line
                x1={cx}
                y1={cy}
                x2={tipX}
                y2={tipY}
                stroke="hsl(var(--foreground))"
                strokeOpacity={0.85}
                strokeWidth={2}
                strokeLinecap="round"
              />
              <circle cx={cx} cy={cy} r={dims.stroke * 0.45} fill="hsl(var(--background))" stroke="hsl(var(--border))" />
            </g>
          )
        })()}

        {/* Centered numeric value */}
        <text
          x={cx}
          y={cy - r * 0.45}
          textAnchor="middle"
          fontSize={dims.font}
          fontWeight={600}
          fill="hsl(var(--foreground))"
          fontFamily="var(--font-sans)"
        >
          {clamped}
        </text>
        <text
          x={cx}
          y={cy - r * 0.45 + dims.font * 0.65}
          textAnchor="middle"
          fontSize={dims.sub}
          fill="hsl(var(--muted-foreground))"
          fontFamily="var(--font-sans)"
        >
          / 100 bias
        </text>
      </svg>
      {showLabel && (
        <div className="mt-1 flex items-center gap-1.5 text-xs">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: toneColor }} aria-hidden />
          <span className="font-medium tracking-wide">{label}</span>
        </div>
      )}
    </div>
  )
}
