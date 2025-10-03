export default function Pricing() {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 to-transparent" />
      <div className="container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">Pricing</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Simple, transparent pricing</h1>
          <p className="mt-3 text-gray-600">This is a placeholder. Tell me your pricing tiers and we will implement them precisely.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Starter</h3>
            <p className="mt-2 text-sm text-gray-600">Great for trying things out.</p>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm ring-1 ring-indigo-100">
            <h3 className="text-lg font-semibold">Pro</h3>
            <p className="mt-2 text-sm text-gray-600">For professionals and teams.</p>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Enterprise</h3>
            <p className="mt-2 text-sm text-gray-600">Custom solutions at scale.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
