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
import { useEffect, useState } from "react"
import { getCart, removeItemFromCart } from "@/app/actions/cart"
import { Trash } from "lucide-react"
import Image from "next/image"

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

    async function fetchCartItems(){
        const cartData = await getCart();
        setCart(cartData.cart);
        setItems(cartData.cart.lines.edges);
    }

    useEffect(() => {
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
                            {node.merchandise.image?.url && (
                                <Image
                                src={node.merchandise.image.url}
                                alt={node.merchandise.product.title}
                                width={70}
                                height={70}
                                sizes="70px"
                                className="rounded-md object-cover"
                                />
                            )}

                            {/* INFO */}
                            <div className="flex-1">
                                <p className="font-medium">
                                    {node.merchandise.product.title}
                                    {
                                        node.merchandise.title !== "Default Title"?(
                                            <span className="text-blue-500"> ({node.merchandise.title})</span>
                                        ):null
                                    }
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Qty: {node.quantity} x {""}
                                <span className="text-sm">
                                    {node.merchandise.priceV2.currencyCode} ${Number(node.merchandise.priceV2.amount).toFixed(2)}
                                </span>
                                </p>

                                <p className="text-sm">
                                    {node.cost.totalAmount.currencyCode} ${Number(node.cost.totalAmount.amount).toFixed(2)}
                                </p>


                                <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 text-red-500 hover:bg-red-400/10 px-0"
                                onClick={()=>{
                                    removeItemFromCart(node.id)
                                    .then(() => fetchCartItems());
                                }}
                                >
                                Remove <Trash/>
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
                        {
                        cart?.cost?(
                            <p>
                                {cart.cost.subtotalAmount.currencyCode} ${Number(cart.cost.subtotalAmount.amount || 0).toFixed(2)}
                            </p>
                        ):(
                            <p>
                                $TTD 0.00
                            </p>
                        )
                        }
                       
                        </span>
                    </div>

                    <Button
                        className="w-full rounded-none"
                        disabled={!cart}
                        asChild
                    >
                        <a href={cart?.checkoutUrl||"#"}>
                        Checkout
                        </a>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
