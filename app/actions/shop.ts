"use server"
import { getShopifyShopDetails } from "@/lib/shopify";

export async function getShopDetails(){
    const shop = await getShopifyShopDetails()
    return shop.shop
}