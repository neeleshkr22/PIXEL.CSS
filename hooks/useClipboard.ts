"use client"

import { useState } from "react"

export const useClipboard = () => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      return true
    } catch (err) {
      console.error("Failed to copy:", err)
      return false
    }
  }

  return {
    copyToClipboard,
    copied,
  }
}
