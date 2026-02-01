"use server";
import { addItemToShopifyCart, createShopifyCart, removeItemFromShopifyCart } from "@/lib/shopify";
import { getShopifyCart } from "@/lib/shopify/cart/queries";
import { cookies } from "next/headers";

export async function getCart(){
    const cookie = await cookies();
    const cartId = cookie.get("cartId")?.value;
    let cartData
    if (cartId){
        cartData = await getShopifyCart(cartId);
    }else{
        const newCartData = await createCart();
        cartData = await getShopifyCart(newCartData.id);
    }
    return cartData;
}

export async function createCart(){
    const data = await createShopifyCart();

    const cookie = await cookies();
    cookie.set("cartId", data.id);
    cookie.set("cartCheckoutUrl", data.checkoutUrl);

    return data;
}

export async function addItemToCart(variantId:string,quantity:number){
    const cookie = await cookies();
    const cartId = cookie.get("cartId")?.value;
    
    addItemToShopifyCart(cartId!, variantId, quantity);
    
}

export async function removeItemFromCart(lineId:string){
    const cookie = await cookies();
    const cartId = cookie.get("cartId")?.value;
    if (cartId){
        await removeItemFromShopifyCart(cartId, lineId);
    }
}