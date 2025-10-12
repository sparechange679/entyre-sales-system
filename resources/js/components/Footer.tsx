import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="w-full bg-white px-6 py-8 lg:px-16 lg:py-20">
            <div className="mx-auto max-w-[1440px]">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-5">
                        <Link href="/" className="mb-4 inline-block">
                            <img
                                src="/logo.jpg"
                                alt="ENTYRE"
                                className="h-10 w-auto lg:h-20"
                            />
                        </Link>
                        <p className="text-xs leading-6 text-[#13131399] md:text-base md:leading-8 lg:max-w-[292px]">
                            Leading tire distribution and automotive service company serving Malawi with quality products and reliable service.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-7 lg:gap-12">
                        {/* About */}
                        <div>
                            <h3 className="mb-4 text-base font-semibold text-[#1A202C] md:mb-6 md:text-xl">
                                About
                            </h3>
                            <ul className="space-y-3 md:space-y-4">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-xs text-[#13131399] transition-colors hover:text-[#3563E9] md:text-base"
                                    >
                                        How it works
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-xs text-[#13131399] transition-colors hover:text-[#3563E9] md:text-base"
                                    >
                                        Featured
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-xs text-[#13131399] transition-colors hover:text-[#3563E9] md:text-base"
                                    >
                                        Partnership
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-xs text-[#13131399] transition-colors hover:text-[#3563E9] md:text-base"
                                    >
                                        Business Relation
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Community */}
                        <div>
                            <h3 className="mb-4 text-base font-semibold text-[#1A202C] md:mb-6 md:text-xl">
                                Community
                            </h3>
                            <ul className="space-y-3 md:space-y-4">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-xs text-[#13131399] transition-colors hover:text-[#3563E9] md:text-base"
                                    >
                                        Events
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-xs text-[#13131399] transition-colors hover:text-[#3563E9] md:text-base"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-xs text-[#13131399] transition-colors hover:text-[#3563E9] md:text-base"
                                    >
                                        Podcast
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-xs text-[#13131399] transition-colors hover:text-[#3563E9] md:text-base"
                                    >
                                        Invite a friend
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Socials */}
                        <div>
                            <h3 className="mb-4 text-base font-semibold text-[#1A202C] md:mb-6 md:text-xl">
                                Socials
                            </h3>
                            <ul className="space-y-3 md:space-y-4">
                                <li>
                                    <a
                                        href="https://discord.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-[#13131399] transition-colors hover:text-[#3563E9] md:text-base"
                                    >
                                        Discord
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-[#13131399] transition-colors hover:text-[#3563E9] md:text-base"
                                    >
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-[#13131399] transition-colors hover:text-[#3563E9] md:text-base"
                                    >
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-[#13131399] transition-colors hover:text-[#3563E9] md:text-base"
                                    >
                                        Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-[#13131326] lg:my-12"></div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-xs font-semibold text-[#1A202C] md:text-base">
                        ©2025 ENTYRE. All rights reserved
                    </p>
                    <div className="flex items-center gap-6 md:gap-10">
                        <Link
                            href="#"
                            className="text-xs font-semibold text-[#1A202C] transition-colors hover:text-[#3563E9] md:text-base"
                        >
                            Privacy & Policy
                        </Link>
                        <Link
                            href="#"
                            className="text-xs font-semibold text-[#1A202C] transition-colors hover:text-[#3563E9] md:text-base"
                        >
                            Terms & Condition
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
