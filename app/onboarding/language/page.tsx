"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    preview: "Welcome to GoozX - Send money home with purpose",
  },
  {
    code: "am",
    name: "Amharic",
    nativeName: "አማርኛ",
    flag: "🇪🇹",
    preview: "እንኳን ወደ GoozX በደህና መጡ - ገንዘብ ወደ ቤት በዓላማ ይላኩ",
  },
  {
    code: "om",
    name: "Oromo",
    nativeName: "Afaan Oromoo",
    flag: "🇪🇹",
    preview:
      "Baga gara GoozX dhuftan - Maallaqa kaayyoo waliin gara manaatti ergaa",
  },
];

export default function LanguageSelectionPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const router = useRouter();

  const handleContinue = () => {
    // In a real app, save language preference
    router.push("/onboarding/register");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Choose Your Language</CardTitle>
          <CardDescription>
            Select your preferred language for the app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedLanguage(language.code)}
                className={cn(
                  "flex items-start gap-4 rounded-lg border-2 p-4 text-left transition-all hover:border-primary/50",
                  selectedLanguage === language.code
                    ? "border-primary bg-primary/5"
                    : "border-border"
                )}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-2xl">
                  {language.flag}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{language.nativeName}</h3>
                    <span className="text-sm text-muted-foreground">
                      ({language.name})
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language.preview}
                  </p>
                </div>
                {selectedLanguage === language.code && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <Button onClick={handleContinue} className="h-12 w-full" size="lg">
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
