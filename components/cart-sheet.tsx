
"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getCart } from "@/app/actions/cart"

type CartSheetProps = {
  open: boolean,
  onOpenChange?: (open: boolean) => void
}

export default function CartSheet({
  open,
  onOpenChange
}: CartSheetProps) {
    const [cart,setCart] = useState<any>(null);
    const [items,setItems] = useState<any[]>([]);


    useEffect(() => {
        async function fetchCartItems(){
            const cartData = await getCart();
            console.log("Fetched cart data:", cartData);
            setCart(cartData.cart);
            setItems(cartData.cart.lines.edges);
        }
        fetchCartItems();
    }, [open]);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-95 sm:w-105">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>

                {/* CART ITEMS */}
                <ScrollArea className="h-[70vh] pr-4 mt-4">
                    {items.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center">
                        Your cart is empty.
                        </p>
                    )}

                    {items.map(({ node }: any) => (
                        <div key={node.id} className="flex gap-4 py-4">
                            {/* IMAGE */}
                            {node.merchandise.image && (
                                <img
                                src={node.merchandise.image.url}
                                alt={node.merchandise.product.title}
                                width={70}
                                height={70}
                                className="rounded-md object-cover"
                                />
                            )}

                            {/* INFO */}
                            <div className="flex-1">
                                <p className="font-medium">
                                {node.merchandise.product.title} <span className="text-blue-500">({node.merchandise.title})</span>
                                </p>

                                <p className="text-sm text-muted-foreground">
                                Qty: {node.quantity}
                                </p>

                                <p className="text-sm">
                                ${Number(node.merchandise.priceV2.amount).toFixed(2)}
                                </p>

                                <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 text-red-500 px-0"
                                
                                >
                                Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                </ScrollArea>

                <Separator className="my-4" />

                {/* FOOTER */}
                <div className="space-y-4">
                    <div className="flex justify-between font-medium px-2">
                        <span>Subtotal</span>
                        <span>
                        ${Number(cart?.cost?.subtotalAmount?.amount || 0).toFixed(2)}
                        </span>
                    </div>

                    <Button
                        className="w-full rounded-none"
                        disabled={!cart}
                        asChild
                    >
                        <a href={cart?.checkoutUrl}>
                        Checkout
                        </a>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
