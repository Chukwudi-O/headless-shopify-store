"use server";

import { getShopifyProducts } from "@/lib/shopify";


export async function getProducts(numberOfProducts?: number, imagesPerProduct?: number) {
    const products = await getShopifyProducts(numberOfProducts, imagesPerProduct);
    return products.data.products.edges.map((edge: { node: any; }) => edge.node);
}