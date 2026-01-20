"use server";
import { registerUser } from "@/lib/shopify";

export async function registerNewUser(input?:{
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
  console.log(res);
}

