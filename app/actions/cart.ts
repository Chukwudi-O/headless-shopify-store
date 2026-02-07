"use server";
import {
  addItemToShopifyCart,
  createShopifyCart,
  removeItemFromShopifyCart,
  updateShopifyCartBuyerIdentity,
} from "@/lib/shopify";
import { getShopifyCart } from "@/lib/shopify/cart/queries";
import { cookies } from "next/headers";

export async function getCart(){
    const cookie = await cookies();
    const cartId = cookie.get("cartId")?.value;
    const customerToken = cookie.get("customer_token")?.value;
    let cartData
    if (cartId){
        if (customerToken) {
            await updateShopifyCartBuyerIdentity(cartId, customerToken);
        }
        cartData = await getShopifyCart(cartId);
    }else{
        const newCartData = await createCart();
        cartData = await getShopifyCart(newCartData.id);
    }
    return cartData;
}

export async function createCart(){
    const cookie = await cookies();
    const token = cookie.get("customer_token")?.value;
    const data = await createShopifyCart(token);

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
