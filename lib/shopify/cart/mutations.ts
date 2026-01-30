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

export async function addItemToShopifyCart(item: any) {
    const mutation = ``
}

export async function removeItemFromShopifyCart(item: any) {
    const mutation = ``
}

export async function updateShopifyCartItem() {
    const mutation = ``
}
