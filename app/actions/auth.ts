"use server";
import { loginUser, registerUser } from "@/lib/shopify";
import { cookies } from "next/headers";

export async function registerShopifyUser(input?:{
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string
}) {
  const res = await registerUser({
    firstName: input?.firstName || "Johnny",
    lastName: input?.lastName || "Test",
    email: input?.email || "johnnytest@example.com",
    password: input?.password || "testing"
  });
  return res.customerCreate;
}

export async function loginShopifyUser(input:{
  email: string,
  password: string
}) {
  const res = await loginUser(input)

  if (res.customerUserErrors.length > 0) {
    console.log("Incorrect login credentials");
    return false;
  }
  
  const cookie = await cookies()
  cookie.set("customer_token", res.customerAccessToken.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(res.customerAccessToken.expiresAt)
  });
  return true;
}

export async function getUserToken(){
  const cookie = await cookies()
  return cookie.get("customer_token")?.value
}