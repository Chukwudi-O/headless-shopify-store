import { shopifyFetch } from "../fetch"

export async function getCustomerInfo(token: string) {
    const query = `
        query getCustomer($customerAccessToken: String!) {
            customer(customerAccessToken: $customerAccessToken) {
                id
                email
                firstName
                lastName
                avatarUrl
            }
        }
    `

    const res = await shopifyFetch(query,{ customerAccessToken: token })
    return res.data.customer
}