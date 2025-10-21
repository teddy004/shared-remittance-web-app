"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "@/lib/icons"
import { useLanguage, type Language } from "@/lib/language-context"
// The type Language is already exported from "@/lib/language-context", so re-exporting it here causes a conflict.
// Removing the duplicate export.

const languages = [
  { code: "en", name: "English" },
  { code: "am", name: "Amharic" },
  { code: "om", name: "Oromiffa" },
] as const

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languages.find((lang) => lang.code === language)?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as Language)}>
          {languages.map((lang) => (
            <DropdownMenuRadioItem key={lang.code} value={lang.code} className="gap-2">
              {lang.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
