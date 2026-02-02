import { getProducts } from "@/app/actions/products";
import ProductCard from "./product-card";
import { ShopifyProducts } from "@/lib/types";

export default async function ProductCatalog() {
  const products: ShopifyProducts = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-10 place-items-center">
      {products?.length ? (
        products.map((product: any) => (
          <ProductCard key={product.handle} prodInfo={product} />
        ))
      ) : (
        <p className="text-center mt-20">No products found</p>
      )}
    </div>
  );
}
