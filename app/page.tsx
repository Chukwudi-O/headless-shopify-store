"use client"
import { Button } from "@/components/ui/button";
import { registerNewUser } from "./actions/auth";

export default function Home() {
  
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">

      <h1 className="text-4xl font-bold">Welcome to the Headless Shopify Store!</h1>
      <Button variant="outline" onClick={registerNewUser}>
        Send Shopify Request
      </Button>

    </div>
  );
}




