import Image from "next/image"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={className}>
      <Image src="/logo.svg" alt="ESI Logo" width={64} height={48} priority />
    </div>
  )
}
