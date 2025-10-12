import AuthenticatedLayout from '@/layouts/authenticated-layout';
import RoleDashboardLayout from '@/layouts/role-dashboard-layout';
import { Head } from '@inertiajs/react';
import { MoreHorizontal, Wrench } from 'lucide-react';

export default function MechanicDashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Mechanic Dashboard" />

            <RoleDashboardLayout>
                {/* Dashboard Content */}
                <div className="p-8">
                        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                            {/* Left Column - Service Overview */}
                            <div className="xl:col-span-2">
                                <div className="rounded-[10px] bg-white p-6">
                                    <h2 className="mb-6 text-xl font-bold text-[#1A202C]">
                                        Service Overview
                                    </h2>

                                    {/* Placeholder Content */}
                                    <div className="mb-8 flex h-[272px] items-center justify-center rounded-[10px] bg-gradient-to-br from-[#A0A4FF] to-[#E6E9FF] p-6">
                                        <div className="text-center">
                                            <Wrench className="mx-auto h-16 w-16 text-white" />
                                            <p className="mt-4 text-lg font-semibold text-white">
                                                Service Management
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="rounded-lg border border-[#C3D4E966] p-4">
                                            <h3 className="font-semibold text-[#1A202C]">
                                                Service management and inventory
                                                usage
                                            </h3>
                                            <p className="mt-2 text-sm text-[#90A3BF]">
                                                Track ongoing services, manage
                                                inventory, and monitor work
                                                orders.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-8">
                                {/* Work Statistics */}
                                <div className="rounded-[10px] bg-white p-6">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-[#1A202C]">
                                            Work Statistics
                                        </h2>
                                        <button type="button" title="menu">
                                            <MoreHorizontal className="h-6 w-6 text-[#90A3BF]" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-3 w-3 rounded-full bg-[#0D3559]" />
                                                <span className="text-sm font-semibold text-[#90A3BF]">
                                                    Completed
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-[#1A202C]">
                                                0
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-3 w-3 rounded-full bg-[#175D9C]" />
                                                <span className="text-sm font-semibold text-[#90A3BF]">
                                                    In Progress
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-[#1A202C]">
                                                0
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-3 w-3 rounded-full bg-[#2185DE]" />
                                                <span className="text-sm font-semibold text-[#90A3BF]">
                                                    Pending
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-[#1A202C]">
                                                0
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Services */}
                                <div className="rounded-[10px] bg-white p-6">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-[#1A202C]">
                                            Recent Services
                                        </h2>
                                        <button
                                            type="button"
                                            className="text-xs font-semibold text-[#3563E9]"
                                        >
                                            View All
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="py-8 text-center">
                                            <p className="text-sm text-[#90A3BF]">
                                                No recent services
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </RoleDashboardLayout>
        </AuthenticatedLayout>
    );
}
