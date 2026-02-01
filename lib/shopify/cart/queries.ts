import { shopifyFetch } from "../fetch";

export async function getShopifyCart(cartId: string,first: number = 10){
    const query = `
    query getCart($cartId: ID!, $first: Int) {
        cart(id: $cartId) {
            checkoutUrl
            cost{
                totalAmount {
                    amount
                    currencyCode
                }
                subtotalAmount {
                    amount
                    currencyCode
                }
            }
            lines(first: $first) {
                edges {
                    node {
                        id
                        quantity
                        cost{
                            totalAmount {
                                amount
                                currencyCode
                            }
                        }
                        merchandise {
                            ... on ProductVariant {
                                id
                                title
                                product{
                                    title
                                }
                                image {
                                    url
                                    altText
                                }
                                priceV2 {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                }
            }
        }
    }`;
    const variables = { cartId, first };
    
    const {data} = await shopifyFetch(query, variables)
    return data;
}
