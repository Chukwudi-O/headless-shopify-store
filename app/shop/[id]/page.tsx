"use client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Skeleton } from "@/components/ui/skeleton"
import { ShoppingCart } from "lucide-react"
import { getProductByHandle } from "@/app/actions/products"
import { useParams } from "next/navigation"
import { ShopifyProduct } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { addItemToCart } from "@/app/actions/cart"

// ----------------------------------
// Component
// ----------------------------------

export default function ShopifyProductPage() {
  const [product, setProduct] = useState<ShopifyProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [variant, setVariant] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const params = useParams()
  

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  async function fetchProduct() {
    setLoading(true)

    const handle: string = params.id?.toString() || ""
    const productData = await getProductByHandle(handle)
    
    setVariant(productData.variants.edges[0]?.node || null)
    setProduct(productData)

    setLoading(false)
  }

  if (loading) {
    return <ProductSkeleton />
  }

  if (!product) {
    return <p className="text-center mt-20">Product not found</p>
  }




  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10 mt-20">
      {/* Image */}
      <Card className="rounded-2xl overflow-hidden p-0">
        <img
          src={variant.image?.url}
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
          <p className="font-medium">{product.variants.edges[0].node.selectedOptions[0].name}</p>
          <div className="flex flex-wrap gap-2">

            {
              product.variants.edges.length > 1 && (
                <RadioGroup className="flex gap-2"
                value={variant?.title}
                defaultValue={product.variants.edges[0].node.title}>
                  {product.variants.edges.map(({ node }) => (
                    <div key={node.id} className="flex items-center space-x-2">
                      <RadioGroupItem id={node.id} value={node.title} onClick={() => setVariant(node)}/>
                      <Label htmlFor={node.id}>{node.title} </Label>
                    </div>
                  ))}
                </RadioGroup>
              )
            }

          </div>
        </div>

        {/* Price */}
        <p className="text-2xl font-semibold">
          {variant.price.currencyCode} {""}
          {variant.price.amount}
        </p>

        {/* QUANTITY */}
        <Label htmlFor="quantity">Quantity</Label>
        <Input
        id="quantity"
        type="number"
        value={quantity}
        onChange={(e)=>setQuantity(parseInt(e.target.value) || 1)}/>

        {/* CTA */}
        <Button size="lg" className="w-full"
        onClick={async () => await addItemToCart(variant.id, quantity)}>
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
