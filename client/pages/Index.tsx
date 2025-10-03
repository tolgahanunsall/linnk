import { Button } from "@/components/ui/button";
import { Brain, Globe2, Search, Clock, BookOpen, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroCanvas } from "@/components/site/HeroCanvas";
import { UploadCenter } from "@/components/site/UploadCenter";

const features = [
  {
    icon: Brain,
    title: "Smart Document Analysis",
    desc: "Extract key insights from research papers, reports, and documents with context-aware AI.",
  },
  {
    icon: Globe2,
    title: "Accurate Translation",
    desc: "Translate content across languages while preserving technical context and formatting.",
  },
  {
    icon: Search,
    title: "Research Assistant",
    desc: "Accelerate research with literature reviews and citation suggestions.",
  },
  {
    icon: Clock,
    title: "Time-Saving",
    desc: "Process documents in seconds instead of hours.",
  },
  {
    icon: BookOpen,
    title: "Enhanced Comprehension",
    desc: "Get concise summaries highlighting key findings.",
  },
  {
    icon: Share2,
    title: "Knowledge Discovery",
    desc: "Uncover connections with AI-generated maps and graphs.",
  },
];

export default function Index() {
  return (
    <div className="relative">
      {/* Decorative 3D canvas */}
      <HeroCanvas />

      {/* Hero */}
      <section className="container relative pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
            Trusted by 300,000+ professionals
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Unlock Global Knowledge, Instantly
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Turn language barriers into bridges and complex documents into
            clarity.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="#upload-section" id="get-started">
              <Button className="h-12 px-6 text-base shadow-[0_4px_14px_0_rgba(99,102,241,.25)] bg-indigo-600 hover:bg-indigo-500">
                Get Started for Free
              </Button>
            </Link>
            <Link
              to="/pricing"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              View Pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="container py-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-sm font-medium text-gray-600">
            Trusted by leading organizations
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              "Apple",
              "Google",
              "McKinsey",
              "Anthropic",
              "WPP",
              "Stanford",
            ].map((name) => (
              <div
                key={name}
                className="flex h-16 items-center justify-center rounded-lg border bg-white text-gray-600 shadow-sm"
              >
                <span className="text-sm font-semibold opacity-70">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-3 text-gray-600">
            Advanced AI tools designed for academic and professional excellence.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-300"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 to-purple-600" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Research and Translation?
            </h3>
            <p className="mt-3 text-indigo-100">
              Join professionals who use Linnk AI to break down language
              barriers and simplify complex documents.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="#upload-section">
                <Button className="h-12 px-6 text-base bg-white text-indigo-700 hover:bg-indigo-50">
                  Get Started for Free
                </Button>
              </Link>
              <Link
                to="/pricing"
                className="font-medium text-white/90 hover:text-white"
              >
                View Pricing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upload section */}
      <div id="upload-section" className="container py-16">
        <UploadCenter />
      </div>
    </div>
  );
}
