import { cn } from "@/lib/utils"

export function LogoMark({
  className,
  size = 32,
}: {
  className?: string
  size?: number
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-xl",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span
        className="absolute inset-0 rounded-xl opacity-90"
        style={{
          background:
            "linear-gradient(135deg, hsl(270 95% 60%) 0%, hsl(220 95% 62%) 100%)",
        }}
      />
      <span
        className="absolute inset-0 rounded-xl"
        style={{
          boxShadow:
            "inset 0 1px 0 hsl(0 0% 100% / 0.25), 0 8px 24px -10px hsl(270 95% 50% / 0.7)",
        }}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="relative z-10"
        width={Math.round(size * 0.6)}
        height={Math.round(size * 0.6)}
      >
        {/* Stylized speech-bubble + twist */}
        <path
          d="M5 7.5C5 5.567 6.567 4 8.5 4h7A3.5 3.5 0 0 1 19 7.5v5A3.5 3.5 0 0 1 15.5 16H11l-3.5 3v-3H8.5A3.5 3.5 0 0 1 5 12.5v-5Z"
          stroke="white"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 11c1.2-1.4 2-1.4 3 0s1.8 1.4 3 0"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
