import { shopifyFetch } from "../fetch";


export async function createShopifyCart(){
    const mutation = `mutation {
        cartCreate {
            cart {
                id
                checkoutUrl
            }
        }
    }`;

    const response = await shopifyFetch(mutation);
    return response.data.cartCreate.cart;
}

export async function addItemToShopifyCart(cartId:string,variantId:string,quantity:number) {
    const mutation = `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
                id
                totalQuantity
            }
            userErrors {
                field
                message
            }
        }
    }`

    const variables = { cartId, lines: [{
        merchandiseId: variantId,
        quantity
    }] };

    const { data } = await shopifyFetch(mutation, variables);
    // console.log("Add Item Response:", data);
}

export async function removeItemFromShopifyCart(cartId: string, lineId: string) {
    const mutation = `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
                id
                totalQuantity
            }
            userErrors {
                field
                message
            }
        }
    }`;

    const variables = { cartId, lineIds: [lineId] };
    await shopifyFetch(mutation, variables);
    // console.log("Remove Item Response:", data);
}

export async function updateShopifyCartItem() {
    const mutation = ``
}
