import { getProducts } from "@/app/actions/products";
import ShopCatalogClient from "@/components/shop/shop-catalog-client";

export default async function ShopPage() {
  const { products, pageInfo } = await getProducts(50, 1);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ShopCatalogClient products={products} pageInfo={pageInfo} />
      </div>
    </div>
  );
}
