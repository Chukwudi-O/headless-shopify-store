'use client';
import { useState, useEffect, createContext } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { checkUserLoggedIn, getUserInfo } from '@/app/actions/auth';
import UserAvatarMenu from './profile-dropdown';

export const AuthContext = createContext({loggedIn: false, setLoggedIn: (value: boolean) => {}});

export default function Navbar({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false); // Placeholder for auth state

    useEffect(() => {
        const checkAuth = async () => {
            setLoggedIn(await checkUserLoggedIn());
        }
        checkAuth();

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
            <nav
                className={`fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-transform duration-300 ${
                    isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="grid grid-cols-3 px-6 py-4 max-w-7xl mx-auto">

                    {/* Center Nav Links */}
                    <div className="flex gap-8 justify-start items-center">
                        <Link href="/shop" className="hover:text-gray-600">
                            Shop
                        </Link>
                        <Link href="#" className="hover:text-gray-600">
                            About
                        </Link>
                        <Link href="#" className="hover:text-gray-600">
                            Contact
                        </Link>
                    </div>
                    
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-center">
                        Logo
                    </Link>

                    {/* Right Side - Profile/Login and Cart */}
                    <div className="flex gap-4 justify-end items-center">
                        {loggedIn ? (
                            <UserAvatarMenu/>
                        ) : (
                            <Link href="/auth" className="hover:text-gray-600">
                                Login
                            </Link>
                        )}
                        <Button variant="ghost">
                            <ShoppingCart size={20} />
                        </Button>
                    </div>
                </div>
            </nav>
        </AuthContext.Provider>
    );
}