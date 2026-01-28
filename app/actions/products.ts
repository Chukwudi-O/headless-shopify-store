"use server";

import { getShopifyProductByHandle, getShopifyProducts } from "@/lib/shopify";


export async function getProducts(numberOfProducts?: number, imagesPerProduct?: number) {
    const products = await getShopifyProducts(numberOfProducts, imagesPerProduct);
    return products.data.products.edges.map((edge: { node: any; }) => edge.node);
}

export async function getProductByHandle(handle: string) {
    const products = await getShopifyProductByHandle(handle);
    return products.data.product
}