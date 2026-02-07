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
    return data.customerAccessTokenCreate
}

export async function updateCustomerProfile(input: {
    customerAccessToken: string,
    customer: {
        firstName?: string,
        lastName?: string,
        email?: string,
        phone?: string
    }
}) {
    const mutation = `
        mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
            customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
                customer {
                    id
                    email
                    firstName
                    lastName
                    phone
                }
                customerUserErrors {
                    code
                    field
                    message
                }
            }
        }
    `

    const variables = {
        customerAccessToken: input.customerAccessToken,
        customer: input.customer
    }

    const { data } = await shopifyFetch(mutation, variables)
    return data.customerUpdate
}

export async function createCustomerAddress(input: {
    customerAccessToken: string,
    address: {
        address1?: string,
        address2?: string,
        city?: string,
        province?: string,
        country?: string,
        zip?: string,
        phone?: string
    }
}) {
    const mutation = `
        mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
            customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
                customerAddress {
                    id
                    address1
                    address2
                    city
                    province
                    country
                    zip
                    phone
                }
                customerUserErrors {
                    code
                    field
                    message
                }
            }
        }
    `

    const variables = {
        customerAccessToken: input.customerAccessToken,
        address: input.address
    }

    const { data } = await shopifyFetch(mutation, variables)
    return data.customerAddressCreate
}

export async function updateCustomerAddress(input: {
    customerAccessToken: string,
    id: string,
    address: {
        address1?: string,
        address2?: string,
        city?: string,
        province?: string,
        country?: string,
        zip?: string,
        phone?: string
    }
}) {
    const mutation = `
        mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
            customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
                customerAddress {
                    id
                    address1
                    address2
                    city
                    province
                    country
                    zip
                    phone
                }
                customerUserErrors {
                    code
                    field
                    message
                }
            }
        }
    `

    const variables = {
        customerAccessToken: input.customerAccessToken,
        id: input.id,
        address: input.address
    }

    const { data } = await shopifyFetch(mutation, variables)
    return data.customerAddressUpdate
}
