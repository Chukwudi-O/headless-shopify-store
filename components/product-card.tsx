import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Link from "next/link";
import { ShopifyProduct } from "@/lib/types";
import { Button } from "./ui/button";


export const ProductCard: React.FC<{ prodInfo: ShopifyProduct }> = ({
  prodInfo
}) => {
  return (
    <Link href={`/shop/${prodInfo.handle}`}>
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
          <h3 className="text-lg font-semibold text-gray-800 truncate text-center">{prodInfo.title}</h3>
          <p className="text-gray-600 mt-2 text-sm line-clamp-3">{prodInfo.description}</p>
        </CardContent>

        <CardFooter className="flex flex-col m-0">
          <div className="flex flex-col w-full items-center justify-between">
            <span className="text-md font-bold text-gray-900 flex mb-2">
              {prodInfo.priceRange.minVariantPrice.currencyCode}${prodInfo.priceRange.minVariantPrice.amount} - ${prodInfo.priceRange.maxVariantPrice.amount}
            </span>
            <Button
              className="px-3 w-full bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors cursor-pointer">
              View
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
export default ProductCard;