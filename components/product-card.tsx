import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";

type ProductCardProps = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number | string; // can be string if formatted
  onClick?: (id: string) => void; // optional click handler
};

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  price,
  onClick,
}) => {
  return (
    <Card
      className="pt-0 max-w-sm rounded-xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer bg-white"
      onClick={() => onClick && onClick(id)}
    >
      <div className="h-64 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <CardContent>
        <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
        <p className="text-gray-600 mt-2 text-sm line-clamp-3">{description}</p>
      </CardContent>

      <CardFooter className="flex flex-col">

        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          <button
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // prevent card click if button is clicked
              onClick && onClick(id);
            }}
          >
            View
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;