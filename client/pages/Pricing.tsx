import { useState } from "react";
import { Button } from "@/components/ui/button";

const plans = {
  monthly: [
    {
      name: "Starter",
      price: 0,
      cta: "Get started",
      features: ["100 pages/month", "Basic translation", "Email support"],
    },
    {
      name: "Pro",
      price: 19,
      cta: "Upgrade",
      popular: true,
      features: [
        "2,000 pages/month",
        "Advanced summarization",
        "Priority support",
      ],
    },
    {
      name: "Team",
      price: 49,
      cta: "Choose Team",
      features: ["10,000 pages/month", "Collaboration", "SSO (beta)"],
    },
  ],
  yearly: [
    {
      name: "Starter",
      price: 0,
      cta: "Get started",
      features: ["1,200 pages/year", "Basic translation", "Email support"],
    },
    {
      name: "Pro",
      price: 190,
      cta: "Upgrade",
      popular: true,
      features: [
        "24,000 pages/year",
        "Advanced summarization",
        "Priority support",
      ],
    },
    {
      name: "Team",
      price: 490,
      cta: "Choose Team",
      features: ["120,000 pages/year", "Collaboration", "SSO (beta)"],
    },
  ],
};

export default function Pricing() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const items = plans[period];
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 to-transparent" />
      <div className="container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
            Pricing
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-3 text-gray-600">
            Choose a plan that scales with you.
          </p>
          <div className="mt-6 inline-flex items-center rounded-full border bg-white p-1 text-sm shadow-sm">
            <button
              onClick={() => setPeriod("monthly")}
              className={`px-4 py-1.5 rounded-full ${period === "monthly" ? "bg-indigo-600 text-white" : "text-gray-700"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod("yearly")}
              className={`px-4 py-1.5 rounded-full ${period === "yearly" ? "bg-indigo-600 text-white" : "text-gray-700"}`}
            >
              Yearly <span className="ml-1 opacity-80">(save 2 months)</span>
            </button>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border bg-white p-6 shadow-sm ${p.popular ? "ring-2 ring-indigo-200" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.popular && (
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                    Popular
                  </span>
                )}
              </div>
              <div className="mt-4 text-4xl font-bold">
                {p.price === 0 ? "Free" : `$${p.price}`}
                <span className="text-base font-normal text-gray-500">
                  /{period === "monthly" ? "mo" : "yr"}
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  className={`w-full ${p.popular ? "bg-indigo-600 hover:bg-indigo-500" : ""}`}
                >
                  {p.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
