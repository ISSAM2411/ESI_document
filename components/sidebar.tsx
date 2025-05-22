"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart2, FileText, LogOut, Users, Briefcase, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { ESILogoStatic } from "@/components/esi-logo-static"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  role: string
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Supprimer les informations de l'utilisateur du localStorage
    localStorage.removeItem("currentUser")

    // Rediriger vers la page de connexion
    router.push("/login")
  }

  const links = [
    {
      title: "Tableau de bord",
      href: `/${role}/dashboard`,
      icon: BarChart2,
      roles: ["admin", "rh", "employe", "sg", "assistant_sg", "missionnaire"],
    },
    {
      title: "Attestations de travail",
      href: `/${role}/attestations`,
      icon: FileText,
      roles: ["rh", "employe"],
    },
    {
      title: "Ordres de mission",
      href: `/${role}/missions`,
      icon: Briefcase,
      roles: ["sg", "assistant_sg", "missionnaire"],
    },
    {
      title: "Gestion des utilisateurs",
      href: "/admin/users",
      icon: Users,
      roles: ["admin"],
    },
    {
      title: "Paramètres système",
      href: "/admin/settings",
      icon: Settings,
      roles: ["admin"],
    },
  ]

  const filteredLinks = links.filter((link) => link.roles.includes(role))

  return (
    <div className="flex flex-col h-screen border-r bg-white">
      <div className="p-4 border-b flex justify-center">
        <ESILogoStatic className="w-16 h-16" size="sm" />
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 gap-2">
          {filteredLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                  pathname === link.href ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {link.title}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full flex items-center gap-2" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </Button>
      </div>
    </div>
  )
}
