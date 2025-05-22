"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LoadingLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function LoadingLogo({ className, size = "md" }: LoadingLogoProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <svg viewBox="0 0 100 100" className="animate-pulse" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Logo ESI - Cercle extérieur */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary animate-[spin_3s_linear_infinite]"
          />

          {/* Logo ESI - Lettres */}
          <path
            d="M30 35H55"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-primary animate-[pulse_1.5s_ease-in-out_infinite]"
          />
          <path
            d="M30 50H55"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-primary animate-[pulse_1.5s_ease-in-out_infinite]"
            style={{ animationDelay: "0.2s" }}
          />
          <path
            d="M30 65H55"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-primary animate-[pulse_1.5s_ease-in-out_infinite]"
            style={{ animationDelay: "0.4s" }}
          />

          {/* Logo ESI - Point central */}
          <circle
            cx="70"
            cy="50"
            r="5"
            fill="currentColor"
            className="text-primary animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </div>
  )
}
