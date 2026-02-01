
export type ShopifyProduct = {
  id: string,
  title: string,
  description: string,
  handle:string,
  priceRange: {
    minVariantPrice: {
      currencyCode: string,
      amount: number
    },
    maxVariantPrice: {
      currencyCode: string,
      amount: number
    }
  },
  availableForSale: boolean,
  images: {
    edges: [
      {
        node: {
          url: string
        }
      }
    ]
  },
  variants:{
    edges: [
      {
        node: {
          id: string,
          title: string,
          availableForSale: boolean
          price: {
            amount: number,
            currencyCode: string
          },
          selectedOptions: [
            {
              name: string,
              value: string
            }
          ],
          image: {
            url: string,
            altText: string
          }
        }
      }
    ]
  }
}

export type ShopifyProducts = 
[
    id: string,
    handle: string,
    title: string,
    description: string,
    availableForSale: boolean,
    images: {
        edges: [
        {
            node: {
            url: string
            }
        }
        ]
    },
    priceRange: {
        minVariantPrice: {
        currencyCode: string,
        amount: number
        }
        maxVariantPrice: {
        currencyCode: string,
        amount: number
        }
    }
]