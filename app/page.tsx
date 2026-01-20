"use client"
import { Button } from "@/components/ui/button";
import { getShopifyProducts, getShopifyShopDetails } from "@/lib/shopify";

export default function Home() {
  const testFunction = async () => {
    const res = await getShopifyShopDetails();
    console.log(res?.data);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">

      <h1 className="text-4xl font-bold">Welcome to the Headless Shopify Store!</h1>
      <Button variant="outline"
      onClick={testFunction}>
        Send Shopify Request
      </Button>

    </div>
  );
}
