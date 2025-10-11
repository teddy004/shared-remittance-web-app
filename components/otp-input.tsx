"use client"

import { useRef, useState, type KeyboardEvent, type ClipboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface OTPInputProps {
  length?: number
  onComplete?: (otp: string) => void
  className?: string
}

export function OTPInput({ length = 6, onComplete, className }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    if (newOtp.every((digit) => digit !== "") && onComplete) {
      onComplete(newOtp.join(""))
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, length)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split("").forEach((char, i) => {
      if (i < length) newOtp[i] = char
    })
    setOtp(newOtp)

    const lastFilledIndex = Math.min(pastedData.length, length) - 1
    inputRefs.current[lastFilledIndex]?.focus()

    if (newOtp.every((digit) => digit !== "") && onComplete) {
      onComplete(newOtp.join(""))
    }
  }

  return (
    <div className={cn("flex gap-2", className)}>
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="h-12 w-12 text-center text-lg"
        />
      ))}
    </div>
  )
}
