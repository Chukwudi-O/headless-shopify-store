"use server";
import {
  getCustomerInfo,
  loginUser,
  registerUser,
  updateCustomerProfile,
  createCustomerAddress,
  updateCustomerAddress,
  updateShopifyCartBuyerIdentity,
} from "@/lib/shopify";
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

  const cartId = cookie.get("cartId")?.value;
  if (cartId) {
    await updateShopifyCartBuyerIdentity(
      cartId,
      res.customerAccessToken.accessToken
    );
  }

  return true;
}

export async function checkUserLoggedIn(){
  const cookie = await cookies()
  return !!cookie.get("customer_token")?.value
}

export async function logoutUser(){
  const cookie = await cookies()
  cookie.delete("customer_token");
}

export async function getUserInfo(){
  const cookie = await cookies()
  const token = cookie.get("customer_token")?.value

  return await getCustomerInfo(token || "");
}

export async function updateUserProfile(input: {
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: string,
  address?: {
    id?: string,
    address1?: string,
    address2?: string,
    city?: string,
    province?: string,
    country?: string,
    zip?: string,
    phone?: string
  }
}) {
  const cookie = await cookies()
  const token = cookie.get("customer_token")?.value

  if (!token) {
    return { ok: false, error: "Not authenticated" }
  }
  
  const profileRes = await updateCustomerProfile({
    customerAccessToken: token,
    customer: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone
    }
  })

  if (profileRes.customerUserErrors?.length) {
    return { ok: false, error: profileRes.customerUserErrors[0].message }
  }

  if (input.address) {
    if (input.address.id) {
      const addressRes = await updateCustomerAddress({
        customerAccessToken: token,
        id: input.address.id,
        address: {
          address1: input.address.address1,
          address2: input.address.address2,
          city: input.address.city,
          province: input.address.province,
          country: input.address.country,
          zip: input.address.zip,
          phone: input.address.phone
        }
      })

      if (addressRes.customerUserErrors?.length) {
        return { ok: false, error: addressRes.customerUserErrors[0].message }
      }
    } else {
      const addressRes = await createCustomerAddress({
        customerAccessToken: token,
        address: {
          address1: input.address.address1,
          address2: input.address.address2,
          city: input.address.city,
          province: input.address.province,
          country: input.address.country,
          zip: input.address.zip,
          phone: input.address.phone
        }
      })

      if (addressRes.customerUserErrors?.length) {
        return { ok: false, error: addressRes.customerUserErrors[0].message }
      }
    }
  }

  return { ok: true }
}
