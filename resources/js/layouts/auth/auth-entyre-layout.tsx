import { Link } from '@inertiajs/react';

export default function AuthEntyreLayout({
    children,
    title,
    description,
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="min-h-screen bg-[#F6F7F9]">
            <div className="grid min-h-screen lg:grid-cols-2">
                {/* Left Side - Form */}
                <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-16">
                    <div className="w-full max-w-[480px]">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="mb-8 inline-block lg:mb-12"
                        >
                            <img
                                src="/logo.jpg"
                                alt="ENTYRE"
                                className="h-12 w-auto lg:h-16"
                            />
                        </Link>

                        {/* Title & Description */}
                        <div className="mb-8">
                            <h1 className="mb-2 text-2xl font-bold text-[#1A202C] md:text-3xl">
                                {title}
                            </h1>
                            <p className="text-sm text-[#90A3BF] md:text-base">
                                {description}
                            </p>
                        </div>

                        {/* Form Content */}
                        <div className="rounded-[10px] bg-white p-6 shadow-sm md:p-8">
                            {children}
                        </div>

                        {/* Footer Links */}
                        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[#90A3BF] md:text-sm">
                            <Link
                                href="#"
                                className="transition-colors hover:text-[#3563E9]"
                            >
                                Privacy Policy
                            </Link>
                            <span>•</span>
                            <Link
                                href="#"
                                className="transition-colors hover:text-[#3563E9]"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Side - Branding & Info */}
                <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#54A6FF] to-[#3563E9] lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-16">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <svg
                            className="h-full w-full"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <pattern
                                    id="grid"
                                    width="40"
                                    height="40"
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path
                                        d="M 40 0 L 0 0 0 40"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="1"
                                    />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-[560px] text-white">
                        <div className="mb-12">
                            <h2 className="mb-6 text-4xl font-bold leading-tight xl:text-5xl">
                                Leading Tire Distribution in Malawi
                            </h2>
                            <p className="text-base leading-relaxed text-white/90 xl:text-lg">
                                Comprehensive sales and inventory management
                                system designed for efficient business operations
                                across multiple branches.
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="mb-1 font-semibold">
                                        Real-time Inventory Tracking
                                    </h3>
                                    <p className="text-sm text-white/80">
                                        Monitor stock levels across all branches
                                        with instant updates
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="mb-1 font-semibold">
                                        Automated Financial Reports
                                    </h3>
                                    <p className="text-sm text-white/80">
                                        Generate comprehensive financial statements
                                        with one click
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="mb-1 font-semibold">
                                        Mobile Payment Integration
                                    </h3>
                                    <p className="text-sm text-white/80">
                                        Accept payments via Mpamba, Airtel Money,
                                        and bank transfers
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/20 pt-8">
                            <div>
                                <div className="mb-1 text-3xl font-bold">4</div>
                                <div className="text-sm text-white/80">
                                    Branches
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 text-3xl font-bold">24/7</div>
                                <div className="text-sm text-white/80">
                                    Support
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 text-3xl font-bold">100%</div>
                                <div className="text-sm text-white/80">
                                    Secure
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
