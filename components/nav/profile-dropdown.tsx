"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { getUserInfo, logoutUser } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/auth-context";
import Link from "next/link";

export default function UserAvatarMenu() {
    // Create type for profileData in types.ts later
    const [profileData, setProfileData] = useState<any>(null);
    const router = useRouter();
    const {loggedIn,setLoggedIn} = useContext(AuthContext)

    useEffect(() => {
        const fetchProfileData = async () => {
            if (loggedIn){
                const data = await getUserInfo();
                setProfileData(data);
            }else{
                setProfileData(null);
            }
        }
        fetchProfileData();
    }, [loggedIn]);

    const handleLogout = () => {
        logoutUser();
        router.push("/auth");
        setLoggedIn(false);
    }

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
            <AvatarImage src={profileData?.avatarUrl} />
            <AvatarFallback>{profileData?.firstName?.charAt(0)+profileData?.lastName?.charAt(0) || ""}</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4"/>
            Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    );
}
