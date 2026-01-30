import { shopifyFetch } from "../fetch";

export async function getCart(cartId: string,first: number = 10){
    const query = `
    query getCart($cartId: ID!, $first: Int) {
        cart(id: $cartId) {
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
                            amountPerQuantity {
                                amount
                                currencyCode
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
