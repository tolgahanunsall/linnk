export default function Tools() {
  return (
    <section>
      <div className="container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">Tools</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">AI tools for documents and media</h1>
          <p className="mt-3 text-gray-600">This page will list all tools like Document Translator, Summarizer, and Research Assistant. Tell me exactly what to include and we will build it.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {["Document Translator","Document Summarizer","Video Summarizer","Research Assistant","Knowledge Graph","Citation Helper"].map((t) => (
            <div key={t} className="group rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600">{t}</div>
              <p className="mt-2 text-sm text-gray-600">High-quality AI powered {t.toLowerCase()}.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
