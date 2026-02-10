"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

function getInitials(email: string): string {
  const name = email.split("@")[0]
  if (name.length <= 2) return name.toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export function ProfileDropdown() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  if (!user) return null

  const email = user.email ?? ""

  async function handleSignOut() {
    try {
      await signOut()
    } catch (err) {
      console.error("Sign out error:", err)
    }
    router.push("/")
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full outline-none ring-offset-cream focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2">
        <Avatar className="h-9 w-9 cursor-pointer border-2 border-terracotta/20 transition-colors hover:border-terracotta/40">
          <AvatarFallback className="bg-terracotta text-sm font-semibold text-white">
            {getInitials(email)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm text-charcoal/60">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
