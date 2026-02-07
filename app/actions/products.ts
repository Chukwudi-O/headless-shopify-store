"use server";

import {
  getShopifyProductByHandle,
  getShopifyProducts,
  getShopifyCollectionProducts,
} from "@/lib/shopify";


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

export async function getProductsByCollection(
  handle: string,
  numberOfProducts: number = 4,
  imagesPerProduct: number = 1
) {
  const { data } = await getShopifyCollectionProducts(
    handle,
    numberOfProducts,
    imagesPerProduct
  );

  const edges = data.collection?.products?.edges || [];
  return edges.map((edge: { node: any }) => edge.node);
}
