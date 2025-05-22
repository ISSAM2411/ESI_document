"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface ESILogoAnimationProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  onAnimationComplete?: () => void
  autoReplay?: boolean
  replayDelay?: number
}

export function ESILogoAnimation({
  className,
  size = "md",
  onAnimationComplete,
  autoReplay = false,
  replayDelay = 5000,
}: ESILogoAnimationProps) {
  const [animationComplete, setAnimationComplete] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const animationTimeoutRef = useRef<NodeJS.Timeout[]>([])

  // Tailles réelles du logo
  const sizeClasses = {
    sm: "w-16 h-12",
    md: "w-24 h-18",
    lg: "w-32 h-24",
    xl: "w-48 h-36",
  }

  const runAnimation = () => {
    if (!svgRef.current) return

    // Clear any existing timeouts
    animationTimeoutRef.current.forEach(clearTimeout)
    animationTimeoutRef.current = []

    setAnimationComplete(false)

    // Get all the paths
    const paths = svgRef.current.querySelectorAll("path")

    // Calculate total length for each path and prepare for animation
    paths.forEach((path) => {
      const length = path.getTotalLength()
      // Store original fill
      path.setAttribute("data-original-fill", path.getAttribute("fill") || "")

      // Set initial state
      path.style.fill = "none"
      path.style.stroke = path.getAttribute("data-original-fill") || "#000"
      path.style.strokeWidth = "2"
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
    })

    // Animate paths sequentially - Animation plus rapide
    let delay = 150 // Réduit de 300 à 150
    const animationDuration = 800 // Réduit de 1500 à 800 ms par chemin

    paths.forEach((path, index) => {
      const timeout1 = setTimeout(() => {
        path.style.transition = `stroke-dashoffset ${animationDuration}ms ease-in-out`
        path.style.strokeDashoffset = "0"

        // Fill in after path is drawn
        const timeout2 = setTimeout(() => {
          path.style.fill = path.getAttribute("data-original-fill") || ""

          // Check if this is the last path to complete
          if (index === paths.length - 1) {
            const timeout3 = setTimeout(() => {
              setAnimationComplete(true)
              if (onAnimationComplete) {
                onAnimationComplete()
              }
            }, 300) // Réduit de 500 à 300
            animationTimeoutRef.current.push(timeout3)
          }
        }, animationDuration * 0.6) // Réduit de 0.8 à 0.6
        animationTimeoutRef.current.push(timeout2)
      }, delay)
      animationTimeoutRef.current.push(timeout1)

      delay += animationDuration / 3 // Réduit de 1/2 à 1/3 pour plus de chevauchement
    })
  }

  const resetAnimation = () => {
    if (!svgRef.current) return

    // Reset all paths
    const paths = svgRef.current.querySelectorAll("path")
    paths.forEach((path) => {
      const length = path.getTotalLength()
      path.style.transition = "none"
      path.style.fill = "none"
      path.style.strokeDashoffset = `${length}`
    })

    // Trigger reflow
    const timeout = setTimeout(() => {
      runAnimation()
    }, 50)
    animationTimeoutRef.current.push(timeout)
  }

  useEffect(() => {
    runAnimation()

    // Set up auto replay if enabled
    let replayTimeout: NodeJS.Timeout
    if (autoReplay) {
      const setupReplay = () => {
        replayTimeout = setTimeout(() => {
          resetAnimation()
          setupReplay()
        }, replayDelay)
      }

      if (animationComplete) {
        setupReplay()
      }
    }

    return () => {
      // Clean up all timeouts
      animationTimeoutRef.current.forEach(clearTimeout)
      if (replayTimeout) clearTimeout(replayTimeout)
    }
  }, [autoReplay, animationComplete, replayDelay])

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <svg
        ref={svgRef}
        className={cn("logo", sizeClasses[size])}
        width="384"
        height="286"
        viewBox="0 0 384 286"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.1078 1.20431C12.9917 4.68643 5.08998 12.3203 2.14357 22.6328C0.268579 29.0613 0.000722836 43.6594 0.000722836 142.766C0.000722836 269.06 -0.267133 264.373 9.50961 274.417C18.3489 283.658 23.572 284.596 63.6165 284.596C93.3485 284.596 99.3753 284.194 105.134 282.185C115.045 278.837 121.206 273.078 124.42 264.373C126.964 257.676 127.232 254.06 127.232 222.989V188.837H99.1074H70.9825V223.391C70.9825 248.435 70.5807 258.346 69.3754 259.551C67.2325 261.694 60.9379 261.56 59.0629 259.283C57.9915 258.078 57.5897 245.757 57.8576 216.828L58.2594 176.114L92.8128 175.712L127.232 175.444V101.115C127.232 34.5523 126.964 26.2488 124.955 21.1596C121.607 12.5882 118.259 8.70427 110.625 4.41857L103.795 0.668594L65.6254 0.400738C44.5987 0.26681 25.9827 0.668594 24.1078 1.20431ZM68.8397 27.5881C70.7147 28.2577 70.9825 34.5523 70.9825 84.2396C70.9825 125.891 70.5807 140.489 69.3754 141.695C66.9647 144.105 59.3308 143.704 58.3933 141.159C57.9915 139.954 57.5897 114.507 57.5897 84.5074C57.5897 43.9273 57.9915 29.597 59.1969 28.3917C60.9379 26.6506 65.4915 26.2488 68.8397 27.5881Z"
          fill="black"
          fillOpacity="0.9"
        />
        <path
          d="M168.616 1.87516C158.973 5.35729 154.688 8.70549 150.67 16.0715L146.652 23.4376L146.25 98.705L145.848 174.106H179.866C204.375 174.106 214.152 174.508 215.357 175.714C216.562 176.919 216.964 188.169 216.964 217.901C216.964 256.606 216.83 258.481 214.419 259.82C210.535 261.829 206.919 261.427 204.509 258.749C202.5 256.606 202.232 252.052 202.232 222.588V188.838H173.973H145.848L146.25 224.597C146.652 259.82 146.652 260.624 150 267.186C154.42 276.026 162.857 281.784 174.509 283.793C185.223 285.668 234.241 285.668 243.884 283.927C259.419 280.981 268.526 272.945 271.741 259.418C272.678 255.133 273.214 234.106 273.214 198.08V143.303H239.33C214.821 143.303 205.044 142.901 203.839 141.696C201.562 139.419 201.562 30.6697 203.839 28.3929C204.777 27.4554 207.321 26.7858 209.598 26.7858C211.875 26.7858 214.419 27.4554 215.357 28.3929C216.562 29.5982 216.964 42.8571 216.964 79.9551V129.91H245.089H273.348L272.946 77.2766C272.544 40.4464 271.874 23.3036 270.803 19.8215C268.794 14.0626 262.633 7.63406 255.133 3.61623C250.044 0.803741 247.901 0.669813 211.607 0.401958C182.545 0.134102 172.232 0.401958 168.616 1.87516Z"
          fill="black"
          fillOpacity="0.9"
        />
        <path
          d="M289.151 2.27709C287.678 4.01815 287.41 9.64312 287.678 29.3305C288.348 61.7411 286.473 59.7321 312.187 57.0536C322.767 55.8482 336.026 54.6429 341.651 54.1072C357.588 52.9018 357.588 52.9018 357.588 26.2502C357.588 6.83064 357.321 4.15208 355.178 2.27709C353.035 0.268172 348.615 0.000316587 321.83 0.000316587C294.776 0.000316587 290.758 0.268172 289.151 2.27709Z"
          fill="#0061B2"
          fillOpacity="0.9"
        />
        <path
          d="M350.892 61.2031C347.544 61.471 336.294 62.5424 325.713 63.6138C315.267 64.6853 304.017 65.6228 300.669 65.6228C297.321 65.6228 294.642 66.0245 294.642 66.6942C294.642 67.2299 299.463 69.9084 305.356 72.7209C317.008 78.078 322.499 78.7477 338.838 76.337C343.66 75.6673 355.579 74.1941 365.49 72.9888C375.401 71.9174 383.704 70.712 383.972 70.4442C384.91 69.6406 361.874 60.2656 359.329 60.5335C357.99 60.6674 354.24 60.9353 350.892 61.2031Z"
          fill="#0061B2"
          fillOpacity="0.9"
        />
        <path
          d="M291.964 186.829V285.266H320.088H348.213V186.829V88.3917H320.088H291.964V186.829Z"
          fill="black"
          fillOpacity="0.9"
        />
      </svg>

      {animationComplete && (
        <button
          onClick={resetAnimation}
          className="mt-4 px-3 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Rejouer l'animation
        </button>
      )}
    </div>
  )
}
