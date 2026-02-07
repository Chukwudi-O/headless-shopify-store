import { shopifyFetch } from "../fetch";


export async function createShopifyCart(customerAccessToken?: string){
    const mutation = `
    mutation CartCreate($buyerIdentity: CartBuyerIdentityInput) {
        cartCreate(input: { buyerIdentity: $buyerIdentity }) {
            cart {
                id
                checkoutUrl
            }
        }
    }`;

    const variables = customerAccessToken
      ? { buyerIdentity: { customerAccessToken } }
      : { buyerIdentity: null };

    const response = await shopifyFetch(mutation, variables);
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
    return !!data
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

export async function updateShopifyCartItemQuantity(cartId:string, lineId: string, ) {
    const mutation = ``
}

export async function updateShopifyCartBuyerIdentity(
    cartId: string,
    customerAccessToken: string
) {
    const mutation = `
    mutation CartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
        cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
            cart {
                id
                checkoutUrl
            }
            userErrors {
                field
                message
            }
        }
    }`;

    const variables = {
        cartId,
        buyerIdentity: { customerAccessToken },
    };

    const { data } = await shopifyFetch(mutation, variables);
    return data.cartBuyerIdentityUpdate;
}
