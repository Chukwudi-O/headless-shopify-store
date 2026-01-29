"use client";

import { useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginShopifyUser, registerShopifyUser } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { AuthContext } from "./navigation";

type Mode = "login" | "register";



export default function AuthCard() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState({
    firstName:"",
    lastName:""
  });
  const router = useRouter();
  const {setLoggedIn} = useContext(AuthContext);

  const isRegister = mode === "register";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegister && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = isRegister?
    {
        firstName: name.firstName,
        lastName: name.lastName,
        email,
        password
    }:
    {
        email,
        password
    }

    if (isRegister){
        const data = await registerShopifyUser(payload)
        
        if (data.customerCreate.customer){
          console.log("Registration successful:", data);
          setMode("login");
        }
      }else{
        const res = await loginShopifyUser(payload)
        
        if (res){
          router.push("/");
          setLoggedIn(true);
        }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isRegister ? "Create an account" : "Welcome back"}
        </CardTitle>
        <CardDescription>
          {isRegister
            ? "Enter your details to create your account"
            : "Enter your credentials to sign in"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isRegister && (
            <div className="flex flex-col gap-3">
                <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fName">First Name</Label>
                    <Input
                    id="fName"
                    type="text"
                    value={name.firstName}
                    onChange={(e) => setName({...name, firstName:e.target.value})}
                    required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lName">Last Name</Label>
                    <Input
                    id="lName"
                    type="text"
                    value={name.lastName}
                    onChange={(e) => setName({...name, lastName:e.target.value})}
                    required
                    />
                </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            {isRegister ? "Register" : "Log in"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <Button variant={"link"}
                className="text-primary underline"
                onClick={() => setMode("login")}
              >
                Log in
              </Button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <Button variant={"link"}
                className="text-primary underline"
                onClick={() => setMode("register")}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
