import { shopifyFetch } from "../fetch"

export async function getCustomerInfo(token: string) {
    const query = `
        query {
            customer(customerAccessToken: "${token}") {
                id
                email
                firstName
                lastName
                avatarUrl
            }
        }
    `

    const res = await shopifyFetch(query)
    return res.data.customer
}