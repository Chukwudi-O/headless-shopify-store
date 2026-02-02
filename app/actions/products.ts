"use server";

import { getShopifyProductByHandle, getShopifyProducts } from "@/lib/shopify";


export async function getProducts(
  numberOfProducts?: number,
  imagesPerProduct?: number,
  after?: string
) {
  const { data } = await getShopifyProducts(
    numberOfProducts,
    imagesPerProduct,
    after
  );

  return {
    products: data.products.edges.map((edge: { node: any }) => edge.node),
    pageInfo: data.products.pageInfo,
  };
}

export async function getProductByHandle(handle: string) {
    const products = await getShopifyProductByHandle(handle);
    return products.data.product
}
