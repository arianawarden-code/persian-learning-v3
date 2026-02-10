"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, RotateCcw, User } from "lucide-react"

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/modules", label: "Modules", icon: BookOpen },
  { href: "/review", label: "Review", icon: RotateCcw },
  { href: "/profile", label: "Profile", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  // Hide on auth pages
  if (pathname?.startsWith("/auth")) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-sand-200 bg-cream/95 backdrop-blur-sm md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around">
        {tabs.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname?.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-[44px] flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "text-terracotta"
                  : "text-charcoal/50 hover:text-charcoal/70"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-terracotta" : ""}`} />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
