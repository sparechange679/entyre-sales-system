import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import LocationMap from '@/components/LocationMap';
import { Head, router } from '@inertiajs/react';
import { Clock, CheckCircle, AlertCircle, Map as MapIcon, List } from 'lucide-react';
import { useState } from 'react';

interface ServiceRequest {
    id: number;
    request_number: string;
    service_type: string;
    customer_name: string;
    customer_phone: string;
    status: string;
    total_cost: number;
    created_at: string;
    location: {
        latitude: number;
        longitude: number;
        address?: string;
    };
}

interface MechanicRequestsProps {
    requests: ServiceRequest[];
    mechanicStatus: string;
}

export default function MechanicRequests({ requests, mechanicStatus }: MechanicRequestsProps) {
    const [viewMode, setViewMode] = useState<'table' | 'map'>('table');
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-MW', {
            style: 'currency',
            currency: 'MWK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<
            string,
            { color: string; icon: React.ReactNode; label: string }
        > = {
            mechanic_assigned: {
                color: 'bg-blue-100 text-blue-700',
                icon: <Clock className="h-4 w-4" />,
                label: 'New',
            },
            accepted: {
                color: 'bg-green-100 text-green-700',
                icon: <CheckCircle className="h-4 w-4" />,
                label: 'Accepted',
            },
            in_progress: {
                color: 'bg-yellow-100 text-yellow-700',
                icon: <AlertCircle className="h-4 w-4" />,
                label: 'In Progress',
            },
        };

        const config = statusConfig[status] || {
            color: 'bg-gray-100 text-gray-700',
            icon: <AlertCircle className="h-4 w-4" />,
            label: status,
        };

        return (
            <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${config.color}`}
            >
                {config.icon}
                {config.label}
            </span>
        );
    };

    return (
        <>
            <Head title="My Service Requests - ENTYRE" />

            <div className="min-h-screen bg-[#F6F7F9]">
                <Navbar />

                <main className="mx-auto max-w-[1440px] px-6 py-8 lg:px-16 lg:py-8">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-[#1A202C]">
                            My Assigned Service Requests
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                                        viewMode === 'table'
                                            ? 'bg-[#3563E9] text-white'
                                            : 'bg-white text-[#90A3BF] hover:bg-gray-100'
                                    }`}
                                >
                                    <List className="h-4 w-4" />
                                    List View
                                </button>
                                <button
                                    onClick={() => setViewMode('map')}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                                        viewMode === 'map'
                                            ? 'bg-[#3563E9] text-white'
                                            : 'bg-white text-[#90A3BF] hover:bg-gray-100'
                                    }`}
                                >
                                    <MapIcon className="h-4 w-4" />
                                    Map View
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-[#90A3BF]">My Status:</span>
                                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${mechanicStatus === 'available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {mechanicStatus.charAt(0).toUpperCase() + mechanicStatus.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {requests.length === 0 ? (
                        <div className="rounded-[10px] bg-white p-12 text-center">
                            <h2 className="mb-2 text-xl font-bold text-[#1A202C]">
                                No assigned requests yet
                            </h2>
                            <p className="text-[#90A3BF]">
                                You will be notified when new requests are assigned to you.
                            </p>
                        </div>
                    ) : viewMode === 'table' ? (
                        <div className="rounded-[10px] bg-white p-6">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="p-4">Request #</th>
                                        <th className="p-4">Service</th>
                                        <th className="p-4">Customer</th>
                                        <th className="p-4">Total Cost</th>
                                        <th className="p-4">Created</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((request) => (
                                        <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-4 font-semibold text-[#3563E9] cursor-pointer" onClick={() => router.visit(`/service-requests/${request.id}`)}>{request.request_number}</td>
                                            <td className="p-4">{request.service_type}</td>
                                            <td className="p-4">
                                                <div>{request.customer_name}</div>
                                                <div className="text-sm text-[#90A3BF]">{request.customer_phone}</div>
                                            </td>
                                            <td className="p-4 font-semibold">{formatPrice(request.total_cost)}</td>
                                            <td className="p-4">{request.created_at}</td>
                                            <td className="p-4">{getStatusBadge(request.status)}</td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <button onClick={() => router.visit(`/service-requests/${request.id}`)} className="text-blue-600 hover:underline">View</button>
                                                    {request.status === 'mechanic_assigned' && (
                                                        <>
                                                            <button onClick={() => router.post(`/mechanic/requests/${request.id}/accept`)} className="text-green-600 hover:underline">Accept</button>
                                                            <button onClick={() => {
                                                                const reason = prompt('Enter reason for rejection:');
                                                                if (reason) {
                                                                    router.post(`/mechanic/requests/${request.id}/reject`, { reason });
                                                                }
                                                            }} className="text-red-600 hover:underline">Reject</button>
                                                        </>
                                                    )}
                                                    {request.status === 'accepted' && (
                                                        <button onClick={() => router.post(`/mechanic/requests/${request.id}/complete`)} className="text-purple-600 hover:underline">Complete</button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {requests.map((request) => (
                                <div key={request.id} className="rounded-[10px] bg-white p-6">
                                    <div className="mb-4 flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#1A202C]">
                                                {request.request_number} - {request.service_type}
                                            </h3>
                                            <p className="text-sm text-[#90A3BF]">
                                                Customer: {request.customer_name} • {request.customer_phone}
                                            </p>
                                            <p className="text-sm font-semibold text-[#1A202C]">
                                                Total Cost: {formatPrice(request.total_cost)}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {getStatusBadge(request.status)}
                                            <div className="flex gap-2">
                                                <button onClick={() => router.visit(`/service-requests/${request.id}`)} className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">View</button>
                                                {request.status === 'mechanic_assigned' && (
                                                    <>
                                                        <button onClick={() => router.post(`/mechanic/requests/${request.id}/accept`)} className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700">Accept</button>
                                                        <button onClick={() => {
                                                            const reason = prompt('Enter reason for rejection:');
                                                            if (reason) {
                                                                router.post(`/mechanic/requests/${request.id}/reject`, { reason });
                                                            }
                                                        }} className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700">Reject</button>
                                                    </>
                                                )}
                                                {request.status === 'accepted' && (
                                                    <button onClick={() => router.post(`/mechanic/requests/${request.id}/complete`)} className="rounded bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700">Complete</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="mb-2 font-semibold text-[#1A202C]">Customer Location</h4>
                                        {request.location.address && (
                                            <p className="mb-2 text-sm text-[#90A3BF]">{request.location.address}</p>
                                        )}
                                        <LocationMap
                                            latitude={request.location.latitude}
                                            longitude={request.location.longitude}
                                            address={request.location.address}
                                            height="300px"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
}
