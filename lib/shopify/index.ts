"use server";
import { createStorefrontApiClient, StorefrontApiClient } from "@shopify/storefront-api-client";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_PUBLIC_ACCESS_TOKEN;

async function getShopifyAPI(): Promise<StorefrontApiClient> {
    return createStorefrontApiClient({
        storeDomain: domain!,
        apiVersion: "2026-01",
        publicAccessToken: token!,
    });
}

async function shopifyFetch(query: string, variables?: Record<string, any>) {
    const client: StorefrontApiClient = await getShopifyAPI();
    
    const response = await client.fetch(query, { variables });
    return await response.json();
}

export async function getShopifyShopDetails(){
    const query = `
      query GetShopDetails {
        shop {
            name
            brand{
                slogan
                shortDescription
                logo{
                    image{
                        url
                        altText
                    }
                }
                squareLogo{
                    image{
                    url
                    altText
                    }
                }
                colors{
                    primary{
                        background
                        foreground
                    }
                    secondary{
                        background
                        foreground
                    }
                }
            }
        }
      }
    `;
    return shopifyFetch(query);
}

export async function getShopifyProducts(numberOfProducts: number = 10, imagesPerProduct: number = 1) {
    const query = `
      query GetProducts {
        products(first: ${numberOfProducts}) {
          edges {
            node {
              id
              title
              handle
              description
              availableForSale
              images(first: ${imagesPerProduct}) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `
    return shopifyFetch(query);
}
