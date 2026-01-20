"use client"
import AuthCard from "@/components/auth-card";

export default function Home() {
  
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">

      <h1 className="text-4xl font-bold">Welcome to the Headless Shopify Store!</h1>

      <AuthCard/>

    </div>
  );
}




