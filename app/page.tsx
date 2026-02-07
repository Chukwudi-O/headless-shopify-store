
import Link from "next/link";
import { checkUserLoggedIn } from "@/app/actions/auth";
import { getProductsByCollection } from "@/app/actions/products";
import ProductCard from "@/components/shop/product-card";

export default async function Home() {
  const [loggedIn, products] = await Promise.all([
    checkUserLoggedIn(),
    getProductsByCollection("featured", 4, 1),
  ]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
              New season edit
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900">
              Build your next look with curated essentials.
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-xl">
              Discover standout pieces, effortless layers, and everyday staples.
              Shop the newest arrivals and featured picks tailored for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                Shop the collection
              </Link>
              {!loggedIn && (
                <Link
                  href="/auth"
                  className="rounded-full border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-slate-100 via-white to-slate-200 blur-2xl" />
            <div className="relative rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Feature drop
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Limited run
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  The featured edit, hand-picked
                </h2>
                <p className="text-sm text-slate-600">
                  Explore a tight edit of best sellers and new arrivals. Fresh
                  colors, clean silhouettes, and premium fabrics.
                </p>
                <div className="flex gap-3">
                  <div className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-600">
                    Fast checkout
                  </div>
                  <div className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-600">
                    Curated weekly
                  </div>
                  <div className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-600">
                    Secure payment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Featured products
              </p>
              <h2 className="text-3xl font-semibold text-slate-900">
                Highlights from the shop
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              View all products
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any, index: number) => (
              <div
                key={product.handle}
                className="animate-in fade-in slide-in-from-bottom-6 duration-700"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <ProductCard prodInfo={product} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


