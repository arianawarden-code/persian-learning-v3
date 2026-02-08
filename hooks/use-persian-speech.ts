"use client"

import { useState, useCallback, useRef } from "react"

export function usePersianSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const speak = useCallback((text: string) => {
    // Stop any current playback
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const encoded = encodeURIComponent(text)
    const audio = new Audio(`/api/tts?text=${encoded}`)
    audioRef.current = audio

    audio.onplay = () => setIsSpeaking(true)
    audio.onended = () => {
      setIsSpeaking(false)
      audioRef.current = null
    }
    audio.onerror = () => {
      setIsSpeaking(false)
      audioRef.current = null
    }

    audio.play().catch(() => {
      setIsSpeaking(false)
      audioRef.current = null
    })
  }, [])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking, isSupported: true }
}
