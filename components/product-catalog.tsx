"use client"

import { getProducts } from "@/app/actions/products"
import { useEffect, useState } from "react"
import ProductCard from "./product-card"
import { ShopifyProducts } from "@/lib/types"




export default function ProductCatalog() {
    const [products, setProducts] = useState<ShopifyProducts | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            const prodData = await getProducts()
            console.log("Fetched products:", prodData);
            setProducts(prodData)
        }
        fetchProducts()
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-10 place-items-center">
            {products? products.map((product: any) => (
                <ProductCard key={product.handle} prodInfo={product}/>
            )): <p className="text-center mt-20">No products found</p>}
        </div>
    )
}