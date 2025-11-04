import AuthenticatedLayout from '@/layouts/authenticated-layout';
import RoleDashboardLayout from '@/layouts/role-dashboard-layout';
import { Head, Link } from '@inertiajs/react';
import { Users, Wrench, DollarSign, ClipboardList, Package, AlertTriangle } from 'lucide-react';

interface Stats {
    total_service_requests: number;
    total_revenue: number;
    total_customers: number;
    total_mechanics: number;
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
    customer_name: string;
    service_type: string;
    status: string;
    total_cost: number;
    created_at: string;
}

interface Part {
    id: number;
    name: string;
    sku: string;
    stock_quantity: number;
    min_stock_level: number;
}

interface AdminDashboardProps {
    stats: Stats;
    serviceRequestsByStatus: ServiceRequestsByStatus;
    recentServiceRequests: ServiceRequest[];
    lowStockParts: Part[];
}

export default function AdminDashboard({
    stats,
    serviceRequestsByStatus,
    recentServiceRequests,
    lowStockParts,
}: AdminDashboardProps) {
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
            <Head title="Admin Dashboard" />

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
                                    <p className="text-sm text-[#90A3BF]">Total Requests</p>
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
                                    <p className="text-sm text-[#90A3BF]">Total Revenue</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{formatPrice(stats.total_revenue)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[10px] bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-purple-100 p-3">
                                    <Users className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Total Customers</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{stats.total_customers}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[10px] bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-orange-100 p-3">
                                    <Wrench className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Total Mechanics</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{stats.total_mechanics}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                        {/* Service Requests Overview */}
                        <div className="xl:col-span-2 space-y-6">
                            {/* Status Breakdown */}
                            <div className="rounded-[10px] bg-white p-6">
                                <h2 className="mb-6 text-xl font-bold text-[#1A202C]">Service Requests by Status</h2>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
                                        <p className="text-2xl font-bold text-yellow-600">{serviceRequestsByStatus.pending}</p>
                                        <p className="text-sm text-[#90A3BF]">Pending</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
                                        <p className="text-2xl font-bold text-blue-600">{serviceRequestsByStatus.mechanic_assigned}</p>
                                        <p className="text-sm text-[#90A3BF]">Assigned</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
                                        <p className="text-2xl font-bold text-green-600">{serviceRequestsByStatus.accepted}</p>
                                        <p className="text-sm text-[#90A3BF]">Accepted</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
                                        <p className="text-2xl font-bold text-orange-600">{serviceRequestsByStatus.in_progress}</p>
                                        <p className="text-sm text-[#90A3BF]">In Progress</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
                                        <p className="text-2xl font-bold text-emerald-600">{serviceRequestsByStatus.completed}</p>
                                        <p className="text-sm text-[#90A3BF]">Completed</p>
                                    </div>
                                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
                                        <p className="text-2xl font-bold text-red-600">{serviceRequestsByStatus.rejected}</p>
                                        <p className="text-sm text-[#90A3BF]">Rejected</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Service Requests */}
                            <div className="rounded-[10px] bg-white p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-[#1A202C]">Recent Service Requests</h2>
                                    <Link href="/admin/service-requests" className="text-sm font-semibold text-[#3563E9] hover:underline">
                                        View All
                                    </Link>
                                </div>
                                {recentServiceRequests.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentServiceRequests.map((request) => (
                                            <Link
                                                key={request.id}
                                                href={`/admin/service-requests/${request.id}`}
                                                className="flex items-center justify-between rounded-lg border-2 border-gray-200 p-4 transition hover:border-[#3563E9]"
                                            >
                                                <div className="flex-1">
                                                    <p className="font-semibold text-[#1A202C]">#{request.request_number}</p>
                                                    <p className="text-sm text-[#90A3BF]">
                                                        {request.customer_name} - {request.service_type}
                                                    </p>
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

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Low Stock Parts */}
                            <div className="rounded-[10px] bg-white p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-[#1A202C]">Low Stock Alert</h2>
                                    <Link href="/admin/parts" className="text-sm font-semibold text-[#3563E9] hover:underline">
                                        View All
                                    </Link>
                                </div>
                                {lowStockParts.length > 0 ? (
                                    <div className="space-y-3">
                                        {lowStockParts.map((part) => (
                                            <Link
                                                key={part.id}
                                                href={`/admin/parts/${part.id}`}
                                                className="flex items-center gap-3 rounded-lg border-2 border-red-200 bg-red-50 p-3 transition hover:border-red-400"
                                            >
                                                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-600" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="truncate font-semibold text-[#1A202C]">{part.name}</p>
                                                    <p className="text-xs text-[#90A3BF]">SKU: {part.sku}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-red-600">{part.stock_quantity}</p>
                                                    <p className="text-xs text-[#90A3BF]">Min: {part.min_stock_level}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-[#90A3BF]">All parts are well stocked.</p>
                                )}
                            </div>

                            {/* Quick Actions */}
                            <div className="rounded-[10px] bg-white p-6">
                                <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Quick Actions</h2>
                                <div className="space-y-2">
                                    <Link
                                        href="/admin/service-requests"
                                        className="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-3 transition hover:border-[#3563E9] hover:bg-blue-50"
                                    >
                                        <ClipboardList className="h-5 w-5 text-[#3563E9]" />
                                        <span className="font-semibold text-[#1A202C]">Manage Requests</span>
                                    </Link>
                                    <Link
                                        href="/admin/parts"
                                        className="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-3 transition hover:border-[#3563E9] hover:bg-blue-50"
                                    >
                                        <Package className="h-5 w-5 text-[#3563E9]" />
                                        <span className="font-semibold text-[#1A202C]">Manage Parts</span>
                                    </Link>
                                    <Link
                                        href="/admin/users"
                                        className="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-3 transition hover:border-[#3563E9] hover:bg-blue-50"
                                    >
                                        <Users className="h-5 w-5 text-[#3563E9]" />
                                        <span className="font-semibold text-[#1A202C]">Manage Users</span>
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
