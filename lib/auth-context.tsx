"use client"

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { pushProgressToSupabase, isSyncing } from "@/lib/supabase-sync"

interface AuthContextValue {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const signOut = useCallback(async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch {}
    setUser(null)
  }, [])

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Debounced push to Supabase on progress-updated events
  useEffect(() => {
    if (!user) return

    const handler = () => {
      if (isSyncing()) return
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(() => {
        pushProgressToSupabase(user.id).catch(console.error)
      }, 2000)
    }

    window.addEventListener("progress-updated", handler)
    return () => {
      window.removeEventListener("progress-updated", handler)
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
