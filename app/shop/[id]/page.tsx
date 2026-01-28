"use client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Skeleton } from "@/components/ui/skeleton"
import { ShoppingCart } from "lucide-react"
import { getProductByHandle, getProducts } from "@/app/actions/products"
import { useParams } from "next/navigation"
import { ShopifyProduct } from "@/lib/types"

// ----------------------------------
// Component
// ----------------------------------

export default function ShopifyProductPage() {
  const [product, setProduct] = useState<ShopifyProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  async function fetchProduct() {
    setLoading(true)

    const handle: string = params.id?.toString() || ""
    const productData = await getProductByHandle(handle)

    setProduct(productData)
    setLoading(false)
  }

  if (loading) {
    return <ProductSkeleton />
  }

  if (!product) {
    return <p className="text-center mt-20">Product not found</p>
  }

  const mainImage = product.images.edges[0]?.node.url

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      {/* Image */}
      <Card className="rounded-2xl overflow-hidden">
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </Card>

      {/* Info */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.title}</h1>

        <p className="text-muted-foreground">
          {product.description}
        </p>

        {/* Variants */}
        <div className="space-y-2">
          <p className="font-medium">Options</p>
          <div className="flex flex-wrap gap-2">
            
          </div>
        </div>

        {/* Price */}
        <p className="text-2xl font-semibold">
          {product.priceRange.minVariantPrice.currencyCode} {""}
          {product.priceRange.minVariantPrice.amount}
        </p>

        {/* CTA */}
        <Button size="lg" className="w-full">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

// ----------------------------------
// Loading Skeleton
// ----------------------------------

function ProductSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      <Skeleton className="h-100 w-full rounded-2xl" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}
