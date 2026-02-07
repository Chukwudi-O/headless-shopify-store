import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            About us
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900">
            Built for thoughtful, modern commerce.
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl">
            This is a template you can customize with your story, mission, and
            values. Replace the placeholders below with real company details.
          </p>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Our mission",
              text: "A one-sentence statement about what your brand exists to do.",
            },
            {
              title: "What we make",
              text: "Describe your products and what makes them unique or better.",
            },
            {
              title: "How we work",
              text: "Share the principles or process that guide your business.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-3 text-sm text-slate-600">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Our story
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Tell the origin story — where you started, what problem you saw,
                and how you decided to build this brand. Keep it human and
                specific.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Example: We began in a small studio in 2020, designing essentials
                that lasted longer and felt better. Today, we keep our catalog
                intentionally small and refined.
              </p>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
              Add a team photo, studio shot, or brand image here.
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Sustainability
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Mention your materials, production choices, and how you reduce
                waste. Be specific with proof points or partnerships.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Community
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Highlight your community, collaborators, or customers. Include
                events, donations, or initiatives if relevant.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Ready to explore?
              </h2>
              <p className="text-sm text-slate-600">
                Invite visitors to browse your products or get in touch.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                Shop now
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
