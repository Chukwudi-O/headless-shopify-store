import Link from "next/link";
import { getShopDetails } from "@/app/actions/shop";

const socialLinks = [
  { label: "Instagram", href: "#", icon: "/icons/instagram.svg" },
  { label: "Facebook", href: "#", icon: "/icons/facebook.svg" },
  { label: "YouTube", href: "#", icon: "/icons/youtube.svg" },
];

export default async function Footer() {
  const shopInfo = await getShopDetails();
  const storeName = shopInfo?.name || "Your Brand";
  const legalLinks = [
    shopInfo?.privacyPolicy?.url
      ? { label: "Privacy Policy", href: shopInfo.privacyPolicy.url }
      : null,
    shopInfo?.termsOfService?.url
      ? { label: "Terms of Service", href: shopInfo.termsOfService.url }
      : null,
    // { label: "Shipping & Returns", href: "/shipping-returns" },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Social
            </p>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-700 hover:text-slate-900"
                >
                  <span className="flex items-center gap-2">
                    <img src={link.icon} alt={link.label} width={100} height={100} className="size-4"/>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Legal
            </p>
            <div className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-700 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {storeName}. All rights reserved.
          </p>
          <p>Designed for a headless Shopify experience.</p>
        </div>
      </div>
    </footer>
  );
}
