import { createShopifyCart } from "@/lib/shopify";
import { cookies } from "next/headers";


export async function createCart(){
    const data = await createShopifyCart();

    const cookie = await cookies();
    cookie.set("cartId", data.id);
    cookie.set("cartCheckoutUrl", data.checkoutUrl);
}

export async function addItemsToCart(items: any[]) {
    
}