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
                phone
                defaultAddress {
                    id
                    address1
                    address2
                    city
                    province
                    country
                    zip
                    phone
                }
                addresses(first: 5) {
                    edges {
                        node {
                            id
                            address1
                            address2
                            city
                            province
                            country
                            zip
                            phone
                        }
                    }
                }
            }
        }
    `

    const res = await shopifyFetch(query,{ customerAccessToken: token })
    return res.data.customer
}
