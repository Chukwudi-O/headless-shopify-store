"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserInfo, updateUserProfile } from "@/app/actions/auth";

type AddressForm = {
  id?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string;
};

function formatPhoneInput(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/[^\d]/g, "");
  if (!digits) return hasPlus ? "+" : "";
  if (!hasPlus) return digits;
  return `+${digits}`;
}

function normalizePhone(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (!trimmed.startsWith("+")) return "";
  const digits = trimmed.replace(/[^\d]/g, "");
  if (digits.length < 8 || digits.length > 15) return "";
  return `+${digits}`;
}

export default function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState<AddressForm>({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getUserInfo();
      if (data) {
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");

        const defaultAddress = data.defaultAddress || data.addresses?.edges?.[0]?.node;
        if (defaultAddress) {
          setAddress({
            id: defaultAddress.id,
            address1: defaultAddress.address1 || "",
            address2: defaultAddress.address2 || "",
            city: defaultAddress.city || "",
            province: defaultAddress.province || "",
            country: defaultAddress.country || "",
            zip: defaultAddress.zip || "",
            phone: defaultAddress.phone || "",
          });
        }
      }

      setLoading(false);
    };
    load();
  }, []);

  const fullName = useMemo(
    () => `${firstName} ${lastName}`.trim(),
    [firstName, lastName]
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const normalizedPhone = normalizePhone(phone);
    if (phone && !normalizedPhone) {
      setError("Enter a valid phone number with country code (e.g. +1 415 555 0123).");
      setSaving(false);
      return;
    }

    const result = await updateUserProfile({
      firstName,
      lastName,
      email,
      phone: normalizedPhone || "",
      address,
    });

    if (!result.ok) {
      setError(result.error || "Failed to update profile.");
    } else {
      setSuccess("Profile updated.");
    }

    setSaving(false);
  };

  if (loading) {
    return <div className="text-center text-slate-500">Loading profile…</div>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                placeholder="+1 (415) 555-0123"
              />
              <p className="text-xs text-slate-500">
                Use country code + area code. Example: +1 415 555 0123
              </p>
            </div>
            <div className="md:col-span-2 text-sm text-slate-500">
              Signed in as {fullName || "customer"}.
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address1">Address line 1</Label>
            <Input
              id="address1"
              value={address.address1 || ""}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, address1: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address2">Address line 2</Label>
            <Input
              id="address2"
              value={address.address2 || ""}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, address2: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={address.city || ""}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, city: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="province">State/Province</Label>
            <Input
              id="province"
              value={address.province || ""}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, province: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={address.country || ""}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, country: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP/Postal</Label>
            <Input
              id="zip"
              value={address.zip || ""}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, zip: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="addressPhone">Address phone</Label>
            <Input
              id="addressPhone"
              value={address.phone || ""}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
