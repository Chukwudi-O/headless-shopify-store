import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Link from "next/link";
import { ShopifyProduct } from "@/lib/types";


export const ProductCard: React.FC<{ prodInfo: ShopifyProduct }> = ({
  prodInfo
}) => {
  return (
    <Card
    
      className="pt-0 max-w-sm rounded-xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer bg-white"
      
    >
      <div className="h-64 w-full overflow-hidden">
        <img
          src={prodInfo.images.edges[0]?.node.url}
          alt={prodInfo.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <CardContent>
        <h3 className="text-lg font-semibold text-gray-800 truncate">{prodInfo.title}</h3>
        <p className="text-gray-600 mt-2 text-sm line-clamp-3">{prodInfo.description}</p>
      </CardContent>

      <CardFooter className="flex flex-col">

        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{prodInfo.priceRange.minVariantPrice.currencyCode}${prodInfo.priceRange.minVariantPrice.amount}</span>
          <Link href={`/shop/${prodInfo.handle}`}>
            <button
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
              View
            </button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;