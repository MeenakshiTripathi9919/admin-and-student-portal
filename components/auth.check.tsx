"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getUser } from "@/lib/auth"

interface AuthCheckProps {
  children: React.ReactNode
  requiredRole?: "admin" | "student"
}

export function AuthCheck({ children, requiredRole }: AuthCheckProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await getUser()

        if (!user) {
          router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
          return
        }

        if (requiredRole && user.role !== requiredRole) {
          if (user.role === "admin") {
            router.push("/admin/dashboard")
          } else {
            router.push("/student/dashboard")
          }
          return
        }

        setIsLoading(false)
      } catch (error) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [router, pathname, requiredRole])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
