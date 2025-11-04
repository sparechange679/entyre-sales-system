import AuthenticatedLayout from '@/layouts/authenticated-layout';
import RoleDashboardLayout from '@/layouts/role-dashboard-layout';
import { Head, Link } from '@inertiajs/react';
import { ClipboardList, DollarSign, ShoppingCart, Package } from 'lucide-react';

interface Stats {
    total_service_requests: number;
    total_spent: number;
    total_orders: number;
    pending_requests: number;
}

interface ServiceRequestsByStatus {
    pending: number;
    mechanic_assigned: number;
    accepted: number;
    in_progress: number;
    completed: number;
    rejected: number;
}

interface ServiceRequest {
    id: number;
    request_number: string;
    service_type: string;
    status: string;
    mechanic_name: string | null;
    total_cost: number;
    payment_status: string;
    created_at: string;
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    total_amount: number;
    created_at: string;
}

interface CustomerDashboardProps {
    stats: Stats;
    serviceRequestsByStatus: ServiceRequestsByStatus;
    recentServiceRequests: ServiceRequest[];
    recentOrders: Order[];
}

export default function CustomerDashboard({
    stats,
    serviceRequestsByStatus,
    recentServiceRequests,
    recentOrders,
}: CustomerDashboardProps) {
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
            <Head title="Customer Dashboard" />

            <RoleDashboardLayout>
                <div className="p-8">
                    {/* Stats Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-[10px] bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-blue-100 p-3">
                                    <ClipboardList className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Service Requests</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{stats.total_service_requests}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[10px] bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-green-100 p-3">
                                    <DollarSign className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Total Spent</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{formatPrice(stats.total_spent)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[10px] bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-purple-100 p-3">
                                    <Package className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Total Orders</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{stats.total_orders}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[10px] bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-orange-100 p-3">
                                    <ShoppingCart className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Pending Requests</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{stats.pending_requests}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                        <div className="xl:col-span-2 space-y-6">
                            {/* Service Requests Status */}
                            <div className="rounded-[10px] bg-white p-6">
                                <h2 className="mb-6 text-xl font-bold text-[#1A202C]">My Service Requests</h2>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
                                        <p className="text-2xl font-bold text-yellow-600">{serviceRequestsByStatus.pending}</p>
                                        <p className="text-sm text-[#90A3BF]">Pending</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
                                        <p className="text-2xl font-bold text-orange-600">{serviceRequestsByStatus.in_progress}</p>
                                        <p className="text-sm text-[#90A3BF]">In Progress</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
                                        <p className="text-2xl font-bold text-emerald-600">{serviceRequestsByStatus.completed}</p>
                                        <p className="text-sm text-[#90A3BF]">Completed</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Service Requests */}
                            <div className="rounded-[10px] bg-white p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-[#1A202C]">Recent Service Requests</h2>
                                    <Link href="/service-requests" className="text-sm font-semibold text-[#3563E9] hover:underline">
                                        View All
                                    </Link>
                                </div>
                                {recentServiceRequests.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentServiceRequests.map((request) => (
                                            <Link
                                                key={request.id}
                                                href={`/service-requests/${request.id}`}
                                                className="flex items-center justify-between rounded-lg border-2 border-gray-200 p-4 transition hover:border-[#3563E9]"
                                            >
                                                <div className="flex-1">
                                                    <p className="font-semibold text-[#1A202C]">#{request.request_number}</p>
                                                    <p className="text-sm text-[#90A3BF]">{request.service_type}</p>
                                                    <p className="text-xs text-[#90A3BF]">{request.created_at}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-[#3563E9]">{formatPrice(request.total_cost)}</p>
                                                    <span className="text-xs capitalize text-[#90A3BF]">{request.status.replace('_', ' ')}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-[#90A3BF]">No service requests yet.</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="rounded-[10px] bg-white p-6">
                                <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Quick Actions</h2>
                                <div className="space-y-2">
                                    <Link
                                        href="/service-requests/create"
                                        className="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-3 transition hover:border-[#3563E9] hover:bg-blue-50"
                                    >
                                        <ClipboardList className="h-5 w-5 text-[#3563E9]" />
                                        <span className="font-semibold text-[#1A202C]">New Service Request</span>
                                    </Link>
                                    <Link
                                        href="/parts"
                                        className="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-3 transition hover:border-[#3563E9] hover:bg-blue-50"
                                    >
                                        <Package className="h-5 w-5 text-[#3563E9]" />
                                        <span className="font-semibold text-[#1A202C]">Browse Parts</span>
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
