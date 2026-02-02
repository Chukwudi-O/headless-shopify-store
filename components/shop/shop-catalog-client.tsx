"use client";

import { useMemo, useState } from "react";
import ProductCard from "./product-card";

type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "title-asc"
  | "title-desc";

export default function ShopCatalogClient({
  products,
  pageInfo,
}: {
  products: any[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
}) {
  const [items, setItems] = useState(products);
  const [hasNextPage, setHasNextPage] = useState(pageInfo.hasNextPage);
  const [endCursor, setEndCursor] = useState<string | null>(pageInfo.endCursor);
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items.filter((p) => {
      if (onlyInStock && !p.availableForSale) return false;

      // const price = Number(p.priceRange?.minVariantPrice?.amount ?? 0);

      if (!q) return true;
      const haystack = `${p.title ?? ""} ${p.description ?? ""} ${
        p.handle ?? ""
      }`.toLowerCase();
      return haystack.includes(q);
    });

    if (sort !== "featured") {
      list = [...list].sort((a, b) => {
        const priceA = Number(a.priceRange?.minVariantPrice?.amount ?? 0);
        const priceB = Number(b.priceRange?.minVariantPrice?.amount ?? 0);
        const titleA = (a.title ?? "").toLowerCase();
        const titleB = (b.title ?? "").toLowerCase();

        switch (sort) {
          case "price-asc":
            return priceA - priceB;
          case "price-desc":
            return priceB - priceA;
          case "title-asc":
            return titleA.localeCompare(titleB);
          case "title-desc":
            return titleB.localeCompare(titleA);
          default:
            return 0;
        }
      });
    }

    return list;
  }, [items, query, sort, onlyInStock]);

  const clearFilters = () => {
    setQuery("");
    setSort("featured");
    setOnlyInStock(false);
  };

  const loadMore = async () => {
    if (!hasNextPage || loadingMore) return;
    setLoadingMore(true);
    const { getProducts } = await import("@/app/actions/products");
    const res = await getProducts(10, 1, endCursor || undefined);
    setItems((prev) => [...prev, ...res.products]);
    setHasNextPage(res.pageInfo.hasNextPage);
    setEndCursor(res.pageInfo.endCursor);
    setLoadingMore(false);
  };

  return (
    <section className="w-full">
      <div className="rounded-3xl bg-linear-to-br from-slate-50 via-white to-slate-100 border border-slate-200/70 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Curated Selection
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
              Shop our latest arrivals
            </h1>
          </div>

          <div className="flex items-center gap-3">
          <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm border border-slate-200 text-center">
              {filteredProducts.length} items
          </div>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Clear filters
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr]">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Search by name, description, or handle"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortOption);
            }}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
          </select>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => {
                setOnlyInStock(e.target.checked);
              }}
              className="h-4 w-4 rounded border-slate-300 text-slate-900"
            />
            In stock only
          </label>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.handle} prodInfo={product} />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            No products match your filters. Try widening your search.
          </div>
        )}
      </div>

      {hasNextPage && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingMore ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </section>
  );
}
