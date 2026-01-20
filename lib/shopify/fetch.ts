
import { createStorefrontApiClient, StorefrontApiClient } from "@shopify/storefront-api-client";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_PUBLIC_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION;


async function getShopifyAPI(): Promise<StorefrontApiClient> {
    return createStorefrontApiClient({
        storeDomain: domain!,
        apiVersion: apiVersion!,
        publicAccessToken: token!,
    });
}

export async function shopifyFetch(query: string, variables?: Record<string, any>) {
    const client: StorefrontApiClient = await getShopifyAPI();
    const response = await client.fetch(query, { variables });

    return await response.json();
}