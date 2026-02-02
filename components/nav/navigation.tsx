import { checkUserLoggedIn } from "@/app/actions/auth";
import { getShopDetails } from "@/app/actions/shop";
import { AuthProvider } from "../auth/auth-context";
import NavigationClient from "./navigation-client";

export default async function Navbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, shopInfo] = await Promise.all([
    checkUserLoggedIn(),
    getShopDetails(),
  ]);

  return (
    <AuthProvider initialLoggedIn={loggedIn}>
      <NavigationClient shopInfo={shopInfo}>{children}</NavigationClient>
    </AuthProvider>
  );
}
