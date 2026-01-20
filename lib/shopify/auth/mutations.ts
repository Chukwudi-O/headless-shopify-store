import { shopifyFetch } from "../fetch"

export async function registerUser(input: { 
    firstName: string,
    lastName: string,
    email: string,
    password: string
}) {
    const mutation = `
        mutation customerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
                customer {
                    id
                    email
                    firstName
                    lastName
                }
                customerUserErrors {
                    code
                    field
                    message
                }
            }
        }
    `

    const variables = { input: input }

    const res = await shopifyFetch(mutation, variables)
    return res.data
}


export async function loginUser(input: {
    email: string,
    password: string
}) {
    const mutation = `
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
                customerAccessToken {
                    accessToken
                    expiresAt
                }
                customerUserErrors {
                    code
                    field
                    message
                }
            }
        }
    `
    const variables = { input: input }

    const {data} = await shopifyFetch(mutation, variables)
    return data
}
