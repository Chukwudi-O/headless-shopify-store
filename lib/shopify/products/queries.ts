import { shopifyFetch } from "../fetch";

export async function getShopifyShopDetails(){
    const query = `
      query GetShopDetails {
        shop {
            name
            brand{
                slogan
                shortDescription
                logo{
                    image{
                        url
                        altText
                    }
                }
                squareLogo{
                    image{
                    url
                    altText
                    }
                }
                colors{
                    primary{
                        background
                        foreground
                    }
                    secondary{
                        background
                        foreground
                    }
                }
            }
        }
      }
    `;
    return await shopifyFetch(query);
}

export async function getShopifyProducts(numberOfProducts: number = 10, imagesPerProduct: number = 1) {
    const query = `
      query GetProducts {
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
    `
    return await shopifyFetch(query);
}


export async function getShopifyProductById(productId: string, imagesPerProduct: number = 1) {
  const query = `
    query GetProductById{
      product(id: "${productId}") {
        title
        handle
        description
        images(first: ${imagesPerProduct}) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange{
          maxVariantPrice{
            amount
            currencyCode
          }
          minVariantPrice{
            amount
            currencyCode
          }
        }
      }
    }
  `
  return await shopifyFetch(query);
}

export async function getShopifyProductByHandle(productHandle: string, imagesPerProduct: number = 1) {
  const query = `
    query GetProductByHandle{
      product(handle: "${productHandle}") {
        id
        title
        description
        images(first: ${imagesPerProduct}) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange{
          maxVariantPrice{
            amount
            currencyCode
          }
          minVariantPrice{
            amount
            currencyCode
          }
        }
      }
    }
  `
  return {...await shopifyFetch(query), handle: productHandle};
}