import { DashboardNotificationsDropdown } from '@/components/dashboard-notifications-dropdown';
import { Button } from '@/components/ui/button';
import { login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Heart, Menu, User, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="w-full border-b border-gray-100 bg-white px-6 py-4 lg:px-16">
            <div className="mx-auto flex max-w-[1440px] items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img
                        src="/logo.jpg"
                        alt="ENTYRE"
                        className="h-10 w-auto lg:h-20"
                    />
                </Link>

                {/* Desktop Search Bar */}
                <div className="hidden flex-1 items-center justify-center px-8 lg:flex xl:px-16">
                    <div className="relative w-full max-w-[492px]">
                        <input
                            type="text"
                            placeholder="Search something here"
                            className="h-11 w-full rounded-[70px] border border-[#C3D4E966] bg-white px-5 pr-12 text-sm text-[#596780] transition-all outline-none placeholder:text-[#596780] focus:border-[#3563E9]"
                        />
                        <button
                            title="search"
                            type="submit"
                            className="absolute top-1/2 right-5 -translate-y-1/2"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                                    stroke="#596780"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M22 22L20 20"
                                    stroke="#596780"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Desktop Right Icons & Auth */}
                <div className="hidden items-center gap-5 lg:flex">
                    {/* Favorite Icon */}
                    <button
                        title="favorite"
                        type="button"
                        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#C3D4E966] transition-colors hover:border-[#3563E9]"
                    >
                        <Heart className="h-6 w-6 text-[#596780]" />
                        <span className="absolute top-0 right-0 flex h-[11px] w-[11px] items-center justify-center rounded-full bg-[#FF4033]" />
                    </button>

                    {/* Notification Icon */}
                    <DashboardNotificationsDropdown />

                    {/* User Profile or Auth Links */}
                    {auth.user ? (
                        <Link
                            title="user"
                            href="/login"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3563E9]"
                        >
                            <User className="h-5 w-5 text-white" />
                        </Link>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href={login()}>
                                <Button
                                    variant="ghost"
                                    className="text-[#596780] shadow-md transition-colors hover:bg-[#3563E9]"
                                >
                                    Log in
                                </Button>
                            </Link>
                            <Link href={register()}>
                                <Button className="bg-[#3563E9] text-white shadow-md transition-colors hover:bg-[#264AC6]">
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="flex h-10 w-10 items-center justify-center lg:hidden"
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6 text-[#596780]" />
                    ) : (
                        <Menu className="h-6 w-6 text-[#596780]" />
                    )}
                </button>
            </div>

            {/* Mobile Search Bar */}
            <div className="mt-4 lg:hidden">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search something here"
                        className="h-11 w-full rounded-[70px] border border-[#C3D4E966] bg-white px-5 pr-12 text-sm text-[#596780] transition-all outline-none placeholder:text-[#596780] focus:border-[#3563E9]"
                    />
                    <Button className="absolute top-1/2 right-5 -translate-y-1/2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                                stroke="#596780"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M22 22L20 20"
                                stroke="#596780"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mt-4 flex flex-col gap-4 border-t border-gray-100 pt-4 lg:hidden">
                    <div className="flex items-center justify-around">
                        <Button className="flex flex-col items-center gap-1">
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#C3D4E966]">
                                <Heart className="h-5 w-5 text-[#596780]" />
                                <span className="absolute top-0 right-0 flex h-[11px] w-[11px] items-center justify-center rounded-full bg-[#FF4033]" />
                            </div>
                            <span className="text-xs text-[#596780]">
                                Favorites
                            </span>
                        </Button>

                        <DashboardNotificationsDropdown />
                    </div>

                    {!auth.user && (
                        <div className="flex flex-col gap-2">
                            <Link href={login()}>
                                <Button
                                    variant="ghost"
                                    className="text-[#596780] w-full shadow-md transition-colors hover:bg-[#3563E9]"
                                >
                                    Log in
                                </Button>
                            </Link>
                            <Link href={register()}>
                                <Button className="w-full bg-[#3563E9] text-white hover:bg-[#264AC6]">
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
