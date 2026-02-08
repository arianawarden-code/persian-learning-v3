"use client"

import { useState, useCallback, useEffect, useRef } from "react"

export function usePersianSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    setIsSupported(
      typeof window !== "undefined" && "speechSynthesis" in window
    )
  }, [])

  const speak = useCallback(
    (text: string, rate: number = 0.85) => {
      if (!isSupported) return

      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "fa-IR"
      utterance.rate = rate

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      utteranceRef.current = utterance
      speechSynthesis.speak(utterance)
    },
    [isSupported]
  )

  const stop = useCallback(() => {
    if (!isSupported) return
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [isSupported])

  return { speak, stop, isSpeaking, isSupported }
}
