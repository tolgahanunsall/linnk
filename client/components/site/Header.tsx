import { Link, NavLink } from "react-router-dom";
import { Globe, ChevronDown, Menu, X } from "lucide-react";
import { VueButton } from "@/components/ui/vue-button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [language, setLanguage] = useState<"tr" | "en">("tr");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === "tr" ? "en" : "tr");
  };

  const text = {
    tr: {
      tools: "Araçlar",
      pricing: "Fiyatlandırma",
      signIn: "Giriş Yap",
      documentTranslator: "Belge Çevirici",
      documentSummarizer: "Belge Özetleyici",
      videoSummarizer: "Video Özetleyici",
      researchAssistant: "Araştırma Asistanı"
    },
    en: {
      tools: "Tools",
      pricing: "Pricing",
      signIn: "Sign In",
      documentTranslator: "Document Translator",
      documentSummarizer: "Document Summarizer",
      videoSummarizer: "Video Summarizer",
      researchAssistant: "Research Assistant"
    }
  };

  const t = text[language];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
              Ö
            </span>
            <span className="text-lg font-semibold tracking-tight">
              ozetle.ai
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors">
                {t.tools} <ChevronDown className="h-4 w-4 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <Link to="/tools#translator">
                  <DropdownMenuItem>{t.documentTranslator}</DropdownMenuItem>
                </Link>
                <Link to="/tools#summarizer">
                  <DropdownMenuItem>{t.documentSummarizer}</DropdownMenuItem>
                </Link>
                <Link to="/tools#video">
                  <DropdownMenuItem>{t.videoSummarizer}</DropdownMenuItem>
                </Link>
                <Link to="/tools#research">
                  <DropdownMenuItem>{t.researchAssistant}</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `text-gray-600 hover:text-indigo-600 transition-colors ${isActive ? "text-indigo-600" : ""}`
              }
            >
              {t.pricing}
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            aria-label="Change language"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-white text-gray-600 hover:text-indigo-600 hover:shadow transition-colors"
          >
            <span className="text-xs font-semibold">{language.toUpperCase()}</span>
          </button>
          
          <Link to="#get-started" className="hidden sm:block">
            <VueButton variant="uiverse" size="md">{t.signIn}</VueButton>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border bg-white text-gray-600 hover:text-indigo-600"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 pt-6">
                <Link 
                  to="/" 
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                    Ö
                  </span>
                  <span className="text-lg font-semibold tracking-tight">
                    ozetle.ai
                  </span>
                </Link>
                
                <nav className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900">{t.tools}</div>
                    <div className="pl-4 space-y-2">
                      <Link 
                        to="/tools#translator" 
                        className="block text-sm text-gray-600 hover:text-indigo-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t.documentTranslator}
                      </Link>
                      <Link 
                        to="/tools#summarizer" 
                        className="block text-sm text-gray-600 hover:text-indigo-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t.documentSummarizer}
                      </Link>
                      <Link 
                        to="/tools#video" 
                        className="block text-sm text-gray-600 hover:text-indigo-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t.videoSummarizer}
                      </Link>
                      <Link 
                        to="/tools#research" 
                        className="block text-sm text-gray-600 hover:text-indigo-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t.researchAssistant}
                      </Link>
                    </div>
                  </div>
                  
                  <NavLink
                    to="/pricing"
                    className={({ isActive }) =>
                      `text-sm ${isActive ? "text-indigo-600 font-medium" : "text-gray-600 hover:text-indigo-600"}`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.pricing}
                  </NavLink>
                </nav>

                <div className="pt-4 border-t">
                  <Link to="#get-started" onClick={() => setMobileMenuOpen(false)}>
                    <VueButton variant="uiverse" size="md" className="w-full">
                      {t.signIn}
                    </VueButton>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
