import { shopifyFetch } from "../fetch";

export async function getShopifyShopDetails(){
    const query = `
      query GetShopDetails {
        shop {
          name
          privacyPolicy {
            title
            url
          }
          termsOfService {
            title
            url
          }
          brand {
            slogan
            shortDescription
            logo {
              image {
                url
                altText
              }
            }
            squareLogo {
              image {
                url
                altText
              }
            }
            colors {
              primary {
                background
                foreground
              }
              secondary {
                background
                foreground
              }
            }
          }
        }
      }
    `;
    const {data} = await shopifyFetch(query);
    
    return data;
}

export async function getShopifyProducts(
  numberOfProducts: number = 10,
  imagesPerProduct: number = 1,
  after?: string
) {
    const query = `
      query GetProducts($after: String) {
        products(first: ${numberOfProducts}, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              handle
              description
              availableForSale
              images(first: ${imagesPerProduct}) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `
    const variables = { after };
    return await shopifyFetch(query, variables);
}

export async function getShopifyCollectionProducts(
  handle: string,
  numberOfProducts: number = 10,
  imagesPerProduct: number = 1
) {
    const query = `
      query GetCollectionProducts($handle: String!) {
        collection(handle: $handle) {
          products(first: ${numberOfProducts}) {
            edges {
              node {
                id
                title
                handle
                description
                availableForSale
                images(first: ${imagesPerProduct}) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    `
    const variables = { handle };
    return await shopifyFetch(query, variables);
}


// export async function getShopifyProductById(productId: string, imagesPerProduct: number = 1) {
//   const query = `
//     query GetProductById{
//       product(id: "${productId}") {
//         title
//         handle
//         description
//         images(first: ${imagesPerProduct}) {
//           edges {
//             node {
//               url
//               altText
//             }
//           }
//         }
//         priceRange{
//           maxVariantPrice{
//             amount
//             currencyCode
//           }
//           minVariantPrice{
//             amount
//             currencyCode
//           }
//         }
//       }
//     }
//   `
//   return await shopifyFetch(query);
// }

export async function getShopifyProductByHandle(productHandle: string) {
  const query = `
    query GetProductByHandle{
      product(handle: "${productHandle}") {
        id
        title
        description
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              image{
                url
                altText
              }
              selectedOptions{
                name
                value
              }
            }
          }
        }
      }
    }
  `
  return {...await shopifyFetch(query), handle: productHandle};
}

export async function getProductVariant(variantId: string) {
  const query = `
    query GetProductVariant($id: ID!) {
      productVariant(id: $id) {
        id
        title
        price {
          amount
          currencyCode
        }
      }
      
      product{
        id
        title
        handle
        featuredImage{
          url
          altText
        }
      }
    }
      
  `

  const variables = { id: variantId };
  const {data} = await shopifyFetch(query, variables);
  return data;
}
