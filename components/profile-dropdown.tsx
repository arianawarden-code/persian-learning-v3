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

function getInitial(user: { email?: string | null; user_metadata?: { first_name?: string } }): string {
  const firstName = user.user_metadata?.first_name
  if (firstName) return firstName.charAt(0).toUpperCase()
  const email = user.email ?? ""
  return email.charAt(0).toUpperCase()
}

export function ProfileDropdown() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  if (!user) return null

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
        <Avatar className="h-11 w-11 cursor-pointer border-2 border-terracotta/20 transition-colors hover:border-terracotta/40">
          <AvatarFallback className="bg-terracotta text-sm font-semibold text-white">
            {getInitial(user)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm text-charcoal/60">{user.email}</p>
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
