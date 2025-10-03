import { Link, NavLink } from "react-router-dom";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
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
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors">
                Tools <ChevronDown className="h-4 w-4 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <Link to="/tools#translator">
                  <DropdownMenuItem>Document Translator</DropdownMenuItem>
                </Link>
                <Link to="/tools#summarizer">
                  <DropdownMenuItem>Document Summarizer</DropdownMenuItem>
                </Link>
                <Link to="/tools#video">
                  <DropdownMenuItem>Video Summarizer</DropdownMenuItem>
                </Link>
                <Link to="/tools#research">
                  <DropdownMenuItem>Research Assistant</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `text-gray-600 hover:text-indigo-600 transition-colors ${isActive ? "text-indigo-600" : ""}`
              }
            >
              Pricing
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Change language"
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-md border bg-white text-gray-600 hover:text-indigo-600 hover:shadow"
          >
            <Globe className="h-5 w-5" />
          </button>
          <Link to="#get-started" className="hidden sm:block">
            <Button className="shadow-[0_4px_14px_0_rgba(99,102,241,.25)] bg-indigo-600 hover:bg-indigo-500">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
