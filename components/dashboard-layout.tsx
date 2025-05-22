"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { UserNav } from "@/components/user-nav"

// Ajouter l'import useEffect et useState
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: string
  user: {
    name: string
    email: string
    avatar?: string
    role: string
  }
}

// Modifier la fonction DashboardLayout pour vérifier l'authentification
export function DashboardLayout({ children, role, user }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentUser, setCurrentUser] = useState(user)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const storedUser = localStorage.getItem("currentUser")

    if (!storedUser) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(storedUser)

      // Pour les pages génériques comme /profile et /settings, on ne vérifie pas le rôle
      const isGenericPage = pathname === "/profile" || pathname === "/settings"

      // Vérifier si l'utilisateur a le bon rôle pour accéder à cette page
      if (!isGenericPage && parsedUser.role !== role) {
        // Rediriger vers le tableau de bord correspondant au rôle de l'utilisateur
        switch (parsedUser.role) {
          case "admin":
            router.push("/admin/dashboard")
            break
          case "rh":
            router.push("/rh/dashboard")
            break
          case "employe":
            router.push("/employe/dashboard")
            break
          case "sg":
          case "assistant_sg":
            router.push("/sg/dashboard")
            break
          case "missionnaire":
            router.push("/missionnaire/dashboard")
            break
          default:
            router.push("/login")
        }
        return
      }

      // Mettre à jour l'utilisateur actuel
      setCurrentUser({
        ...user,
        name: parsedUser.name,
        email: parsedUser.email,
        role: parsedUser.role,
      })

      setIsLoading(false)
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error)
      router.push("/login")
    }
  }, [router, role, user, pathname])

  if (isLoading) {
    return <LoadingScreen message="Chargement..." />
  }

  return (
    <div className="flex h-screen">
      <Sidebar role={currentUser.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b bg-white flex items-center justify-end px-4">
          <UserNav user={currentUser} />
        </header>
        <main className="flex-1 overflow-auto p-4 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
