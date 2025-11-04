import { DashboardNotificationsDropdown } from '@/components/dashboard-notifications-dropdown';
import { DashboardUserDropdown } from '@/components/dashboard-user-dropdown';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    Calendar,
    Car,
    CreditCard,
    DollarSign,
    FileText,
    Home,
    Inbox,
    Package,
    Search,
    ShoppingCart,
    Wrench,
} from 'lucide-react';
import { type PropsWithChildren } from 'react';

interface MenuItem {
    id: string;
    icon: typeof Home;
    label: string;
    href: string;
}

// Dashboard menu items based on role
const getDashboardMenuItems = (role?: string): MenuItem[] => {
    const roleKey = role?.toLowerCase() || 'customer';

    const menus: Record<string, MenuItem[]> = {
        admin: [
            { id: 'dashboard', icon: Home, label: 'Dashboard', href: '/dashboard/admin' },
            { id: 'quotations', icon: FileText, label: 'Quotations', href: '/admin/quotations' },
            { id: 'reports', icon: BarChart3, label: 'Reports', href: '/admin/reports' },
            { id: 'income', icon: DollarSign, label: 'Income', href: '/admin/income' },
        ],
        mechanic: [
            { id: 'dashboard', icon: Home, label: 'Dashboard', href: '/dashboard/mechanic' },
            { id: 'my-requests', icon: Wrench, label: 'My Assigned Requests', href: '/mechanic/requests' },
            { id: 'services', icon: Wrench, label: 'Services', href: '#' },
            { id: 'inventory', icon: Package, label: 'Inventory', href: '#' },
        ],
        accountant: [
            { id: 'dashboard', icon: Home, label: 'Dashboard', href: '/dashboard/accountant' },
            { id: 'transactions', icon: DollarSign, label: 'Transactions', href: '#' },
            { id: 'reports', icon: FileText, label: 'Reports', href: '#' },
        ],
        customer: [
            { id: 'dashboard', icon: Home, label: 'Dashboard', href: '/dashboard/customer' },
            { id: 'products', icon: Package, label: 'Browse Products', href: '/' },
            { id: 'cart', icon: ShoppingCart, label: 'Shopping Cart', href: '/cart' },
            { id: 'services', icon: Wrench, label: 'My Service Requests', href: '/service-requests' },
            { id: 'request-service', icon: Wrench, label: 'Request a Service', href: '/service-requests/create' },
            { id: 'quotations', icon: FileText, label: 'Quotations', href: '#' },
        ],
    };

    return menus[roleKey as keyof typeof menus] || menus.customer;
};

const getRoleLabel = (role?: string): string => {
    const roleLabels: Record<string, string> = {
        admin: 'Admin Dashboard',
        mechanic: 'Mechanic Dashboard',
        accountant: 'Accountant Dashboard',
        customer: 'Customer Dashboard',
    };

    return roleLabels[role?.toLowerCase() || 'customer'] || 'Main Menu';
};

export default function RoleDashboardLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<SharedData>().props;

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;
    const role = auth.user.role;
    const menuItems = getDashboardMenuItems(role);
    const roleLabel = getRoleLabel(role);

    return (
        <div className="flex min-h-screen bg-[#F6F7F9]">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-[280px] bg-white">
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex items-center gap-2 px-8 py-8">
                        <img src="/logo.jpg" alt="Logo" className="h-20 w-auto rounded-md object-cover" />
                    </div>

                    {/* Main Menu */}
                    <nav className="flex-1 px-4">
                        <p className="mb-4 px-4 text-xs font-semibold uppercase tracking-wider text-[#94A7CB]">
                            {roleLabel}
                        </p>
                        <ul className="space-y-1">
                            {menuItems.map((item) => {
                                const isActive = currentPath === item.href ||
                                    (item.id === 'dashboard' && currentPath.includes('settings'));

                                return (
                                    <li key={item.id}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors',
                                                isActive
                                                    ? 'bg-[#3563E9] text-white'
                                                    : 'text-[#90A3BF] hover:bg-[#F6F7F9]'
                                            )}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-[280px] flex-1">
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-white px-8 py-6">
                    <div className="flex items-center justify-between">
                        {/* Search */}
                        <div className="relative w-[490px]">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#596780]" />
                            <input
                                type="text"
                                placeholder="Search something here"
                                className="h-[44px] w-full rounded-full border border-[#C3D4E966] bg-white pl-12 pr-12 text-sm text-[#1A202C] placeholder:text-[#90A3BF] focus:border-[#3563E9] focus:outline-none"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M22 6.5H16"
                                        stroke="#596780"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6 6.5H2"
                                        stroke="#596780"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
                                        stroke="#596780"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M22 17.5H18"
                                        stroke="#596780"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8 17.5H2"
                                        stroke="#596780"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
                                        stroke="#596780"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Right Icons */}
                        <div className="flex items-center gap-5">
                            <DashboardNotificationsDropdown />
                            <DashboardUserDropdown user={auth.user} />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                {children}
            </main>
        </div>
    );
}
