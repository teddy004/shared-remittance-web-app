"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "@/lib/icons"

export type Language = "en" | "am" | "om"

const languages = [
  { code: "en", name: "English" },
  { code: "am", name: "Amharic" },
  { code: "om", name: "Oromiffa" },
]

export function LanguageSelector() {
  const [selectedLang, setSelectedLang] = useState<Language>("en")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          {languages.find((lang) => lang.code === selectedLang)?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => setSelectedLang(lang.code as Language)} className="gap-2">
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
