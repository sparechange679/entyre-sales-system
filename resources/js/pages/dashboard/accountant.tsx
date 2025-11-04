import AuthenticatedLayout from '@/layouts/authenticated-layout';
import RoleDashboardLayout from '@/layouts/role-dashboard-layout';
import { Head, Link } from '@inertiajs/react';
import { DollarSign, Package, Clock, TrendingUp } from 'lucide-react';

interface Stats {
    total_revenue: number;
    total_inventory_value: number;
    pending_payments: number;
    current_month_revenue: number;
}

interface RevenueBreakdown {
    service_revenue: number;
    parts_revenue: number;
    labor_revenue: number;
    parts_cost_from_services: number;
}

interface Transaction {
    id: number;
    type: string;
    request_number: string;
    customer_name: string;
    service_type: string;
    amount: number;
    paid_at: string | null;
}

interface Part {
    name: string;
    quantity_sold: number;
    revenue: number;
}

interface AccountantDashboardProps {
    stats: Stats;
    revenueBreakdown: RevenueBreakdown;
    recentTransactions: Transaction[];
    topSellingParts: Part[];
}

export default function AccountantDashboard({
    stats,
    revenueBreakdown,
    recentTransactions,
    topSellingParts,
}: AccountantDashboardProps) {
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-MW', {
            style: 'currency',
            currency: 'MWK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Accountant Dashboard" />

            <RoleDashboardLayout>
                <div className="p-8">
                    {/* Stats Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-[10px] bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-green-100 p-3">
                                    <DollarSign className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Total Revenue</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{formatPrice(stats.total_revenue)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[10px] bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-blue-100 p-3">
                                    <Package className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Inventory Value</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{formatPrice(stats.total_inventory_value)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[10px] bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-orange-100 p-3">
                                    <Clock className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Pending Payments</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{formatPrice(stats.pending_payments)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[10px] bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-purple-100 p-3">
                                    <TrendingUp className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">This Month</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{formatPrice(stats.current_month_revenue)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                        <div className="xl:col-span-2 space-y-6">
                            {/* Revenue Breakdown */}
                            <div className="rounded-[10px] bg-white p-6">
                                <h2 className="mb-6 text-xl font-bold text-[#1A202C]">Revenue Breakdown</h2>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
                                        <p className="text-2xl font-bold text-green-600">{formatPrice(revenueBreakdown.service_revenue)}</p>
                                        <p className="text-sm text-[#90A3BF]">Service Revenue</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
                                        <p className="text-2xl font-bold text-blue-600">{formatPrice(revenueBreakdown.parts_revenue)}</p>
                                        <p className="text-sm text-[#90A3BF]">Parts Revenue</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
                                        <p className="text-2xl font-bold text-purple-600">{formatPrice(revenueBreakdown.labor_revenue)}</p>
                                        <p className="text-sm text-[#90A3BF]">Labor Revenue</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
                                        <p className="text-2xl font-bold text-orange-600">{formatPrice(revenueBreakdown.parts_cost_from_services)}</p>
                                        <p className="text-sm text-[#90A3BF]">Parts (Services)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Transactions */}
                            <div className="rounded-[10px] bg-white p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-[#1A202C]">Recent Transactions</h2>
                                    <Link href="/admin/income" className="text-sm font-semibold text-[#3563E9] hover:underline">
                                        View All
                                    </Link>
                                </div>
                                {recentTransactions.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentTransactions.map((transaction) => (
                                            <div
                                                key={transaction.id}
                                                className="flex items-center justify-between rounded-lg border-2 border-gray-200 p-4"
                                            >
                                                <div className="flex-1">
                                                    <p className="font-semibold text-[#1A202C]">#{transaction.request_number}</p>
                                                    <p className="text-sm text-[#90A3BF]">
                                                        {transaction.customer_name} - {transaction.service_type}
                                                    </p>
                                                    <p className="text-xs text-[#90A3BF]">{transaction.paid_at}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-green-600">{formatPrice(transaction.amount)}</p>
                                                    <span className="text-xs text-[#90A3BF]">{transaction.type}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-[#90A3BF]">No transactions yet.</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Top Selling Parts */}
                            <div className="rounded-[10px] bg-white p-6">
                                <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Top Selling Parts</h2>
                                {topSellingParts.length > 0 ? (
                                    <div className="space-y-3">
                                        {topSellingParts.map((part, index) => (
                                            <div key={index} className="rounded-lg border-2 border-gray-200 p-3">
                                                <p className="truncate font-semibold text-[#1A202C]">{part.name}</p>
                                                <div className="mt-1 flex items-center justify-between">
                                                    <p className="text-xs text-[#90A3BF]">Qty: {part.quantity_sold}</p>
                                                    <p className="text-sm font-bold text-green-600">{formatPrice(part.revenue)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-[#90A3BF]">No sales data yet.</p>
                                )}
                            </div>

                            {/* Quick Actions */}
                            <div className="rounded-[10px] bg-white p-6">
                                <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Quick Actions</h2>
                                <div className="space-y-2">
                                    <Link
                                        href="/admin/income"
                                        className="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-3 transition hover:border-[#3563E9] hover:bg-blue-50"
                                    >
                                        <DollarSign className="h-5 w-5 text-[#3563E9]" />
                                        <span className="font-semibold text-[#1A202C]">View Income</span>
                                    </Link>
                                    <Link
                                        href="/admin/reports"
                                        className="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-3 transition hover:border-[#3563E9] hover:bg-blue-50"
                                    >
                                        <Package className="h-5 w-5 text-[#3563E9]" />
                                        <span className="font-semibold text-[#1A202C]">View Reports</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </RoleDashboardLayout>
        </AuthenticatedLayout>
    );
}
