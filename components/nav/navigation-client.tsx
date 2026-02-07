"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import UserAvatarMenu from "./profile-dropdown";
import CartSheet from "./cart-sheet";
import { AuthContext } from "../auth/auth-context";

export default function NavigationClient({
  children,
  shopInfo,
}: {
  children: React.ReactNode;
  shopInfo: any;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [cartOpen, setCartOpen] = useState(false);
  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    console.log(shopInfo)
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {children}
      <nav
        className={`fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="grid grid-cols-3 px-6 py-4 max-w-7xl mx-auto">
          <div className="flex gap-8 justify-start items-center">
            <Link href="/shop" className="hover:text-gray-600">
              Shop
            </Link>
            <Link href="/about" className="hover:text-gray-600">
              About
            </Link>
          </div>

          {shopInfo?.brand?.logo?.image?.url ? (
            <Link href="/">
              <Image
                src={shopInfo.brand.logo.image.url}
                alt={shopInfo.brand.logo.image.altText || shopInfo?.name || "Shop logo"}
                height={100}
                width={100}
                sizes="100px"
              />
            </Link>
          ) : (
            <Link href="/" className="text-lg font-bold text-center">
              {shopInfo?.name}
            </Link>
          )}

          <div className="flex gap-4 justify-end items-center">
            {loggedIn ? (
              <UserAvatarMenu />
            ) : (
              <Link href="/auth" className="hover:text-gray-600">
                Login
              </Link>
            )}
            <Button variant="ghost" onClick={() => setCartOpen(!cartOpen)}>
              <ShoppingCart size={20} />
            </Button>
          </div>
        </div>
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      </nav>
    </>
  );
}
