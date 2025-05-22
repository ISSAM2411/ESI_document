"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LogoAnimationProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function LogoAnimation({ className, size = "md" }: LogoAnimationProps) {
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
        {/* Vous pouvez remplacer ce SVG par le logo exact de l'ESI */}
        <svg viewBox="0 0 100 100" className="animate-pulse" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cercle extérieur */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary animate-[spin_3s_linear_infinite]"
          />

          {/* Lettres E S I */}
          <g className="text-primary">
            {/* E */}
            <path
              d="M25 35H40"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-[pulse_1.5s_ease-in-out_infinite]"
            />
            <path
              d="M25 42.5H35"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-[pulse_1.5s_ease-in-out_infinite]"
              style={{ animationDelay: "0.1s" }}
            />
            <path
              d="M25 50H40"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-[pulse_1.5s_ease-in-out_infinite]"
              style={{ animationDelay: "0.2s" }}
            />

            {/* S */}
            <path
              d="M45 35H60"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-[pulse_1.5s_ease-in-out_infinite]"
              style={{ animationDelay: "0.3s" }}
            />
            <path
              d="M45 42.5H60"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-[pulse_1.5s_ease-in-out_infinite]"
              style={{ animationDelay: "0.4s" }}
            />
            <path
              d="M45 50H60"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-[pulse_1.5s_ease-in-out_infinite]"
              style={{ animationDelay: "0.5s" }}
            />

            {/* I */}
            <path
              d="M65 35H80"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-[pulse_1.5s_ease-in-out_infinite]"
              style={{ animationDelay: "0.6s" }}
            />
            <path
              d="M72.5 35V50"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-[pulse_1.5s_ease-in-out_infinite]"
              style={{ animationDelay: "0.7s" }}
            />
            <path
              d="M65 50H80"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-[pulse_1.5s_ease-in-out_infinite]"
              style={{ animationDelay: "0.8s" }}
            />
          </g>

          {/* Point central */}
          <circle
            cx="50"
            cy="65"
            r="5"
            fill="currentColor"
            className="text-primary animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"
          />
        </svg>

        {/* Animation centrale */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-primary animate-ping opacity-75" />
        </div>
      </div>
    </div>
  )
}
