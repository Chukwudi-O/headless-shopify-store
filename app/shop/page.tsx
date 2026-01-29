import ProductCatalog from "@/components/product-catalog";


export default function ShopPage() {
    return (
        <div className=" flex flex-col items-center justify-center pt-20">
            <h1
            className="text-5xl font-bold">
                Shop
            </h1>
            <ProductCatalog/>
        </div>
    )
}