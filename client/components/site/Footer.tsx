import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                Ö
              </span>
              <span className="text-lg font-semibold tracking-tight">
                ozetle.ai
              </span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Break language barriers and understand complex content with AI.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900">
              Solutions
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/tools" className="hover:text-indigo-600">
                  Document Translator
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-indigo-600">
                  Document Summarizer
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-indigo-600">
                  Video Summarizer
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-indigo-600">
                  Research Assistant
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Submit Ticket
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-indigo-600">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} ozetle.ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
