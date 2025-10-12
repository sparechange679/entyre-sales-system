import RoleDashboardLayout from '@/layouts/role-dashboard-layout';
import { cn } from '@/lib/utils';
import { edit as editPassword } from '@/routes/password';
import { edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const settingsNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
        icon: null,
    },
    {
        title: 'Password',
        href: editPassword(),
        icon: null,
    },
    {
        title: 'Two-Factor Auth',
        href: show(),
        icon: null,
    },
];

export default function DashboardSettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <RoleDashboardLayout>
            {/* Settings Content */}
            <div className="p-8">
                <div className="rounded-[10px] bg-white p-8">
                    <h1 className="mb-2 text-2xl font-bold text-[#1A202C]">Settings</h1>
                    <p className="mb-8 text-sm text-[#90A3BF]">
                        Manage your profile and account settings
                    </p>

                    <div className="flex gap-8">
                        {/* Settings Navigation */}
                        <aside className="w-56">
                            <nav className="space-y-1">
                                {settingsNavItems.map((item) => (
                                    <Link
                                        key={typeof item.href === 'string' ? item.href : item.href.url}
                                        href={item.href}
                                        className={cn(
                                            'block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                                            currentPath === (typeof item.href === 'string' ? item.href : item.href.url)
                                                ? 'bg-[#3563E9] text-white'
                                                : 'text-[#596780] hover:bg-[#F6F7F9] hover:text-[#1A202C]'
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </nav>
                        </aside>

                        {/* Settings Content */}
                        <div className="flex-1 max-w-2xl">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </RoleDashboardLayout>
    );
}
