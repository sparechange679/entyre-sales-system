import AuthenticatedLayout from '@/layouts/authenticated-layout';
import RoleDashboardLayout from '@/layouts/role-dashboard-layout';
import { Head, Link } from '@inertiajs/react';
import { Wrench, ClipboardList, DollarSign, Clock } from 'lucide-react';

interface Stats {
    total_assigned_requests: number;
    total_completed_requests: number;
    total_earnings: number;
    pending_requests: number;
}

interface ServiceRequestsByStatus {
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
    labor_cost: number;
    scheduled_at: string | null;
    created_at: string;
}

interface MechanicDashboardProps {
    stats: Stats;
    serviceRequestsByStatus: ServiceRequestsByStatus;
    recentServiceRequests: ServiceRequest[];
}

export default function MechanicDashboard({
    stats,
    serviceRequestsByStatus,
    recentServiceRequests,
}: MechanicDashboardProps) {
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
            <Head title="Mechanic Dashboard" />

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
                                    <p className="text-sm text-[#90A3BF]">Total Assigned</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{stats.total_assigned_requests}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[10px] bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-green-100 p-3">
                                    <Wrench className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Completed</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{stats.total_completed_requests}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[10px] bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-purple-100 p-3">
                                    <DollarSign className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Total Earnings</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{formatPrice(stats.total_earnings)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[10px] bg-white p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-orange-100 p-3">
                                    <Clock className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Pending</p>
                                    <p className="text-2xl font-bold text-[#1A202C]">{stats.pending_requests}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                        <div className="xl:col-span-2 space-y-6">
                            {/* Status Breakdown */}
                            <div className="rounded-[10px] bg-white p-6">
                                <h2 className="mb-6 text-xl font-bold text-[#1A202C]">Work Status Overview</h2>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
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
                                    <h2 className="text-xl font-bold text-[#1A202C]">My Recent Requests</h2>
                                    <Link href="/mechanic/requests" className="text-sm font-semibold text-[#3563E9] hover:underline">
                                        View All
                                    </Link>
                                </div>
                                {recentServiceRequests.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentServiceRequests.map((request) => (
                                            <Link
                                                key={request.id}
                                                href={`/mechanic/requests/${request.id}`}
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
                                                    <p className="font-bold text-[#3563E9]">{formatPrice(request.labor_cost)}</p>
                                                    <span className="text-xs capitalize text-[#90A3BF]">{request.status.replace('_', ' ')}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-[#90A3BF]">No service requests assigned yet.</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="rounded-[10px] bg-white p-6">
                                <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Quick Actions</h2>
                                <div className="space-y-2">
                                    <Link
                                        href="/mechanic/requests"
                                        className="flex items-center gap-3 rounded-lg border-2 border-gray-200 p-3 transition hover:border-[#3563E9] hover:bg-blue-50"
                                    >
                                        <ClipboardList className="h-5 w-5 text-[#3563E9]" />
                                        <span className="font-semibold text-[#1A202C]">View All Requests</span>
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
