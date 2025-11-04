import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Head, router, usePage } from '@inertiajs/react';
import { Wrench, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ServiceRequest {
    id: number;
    request_number: string;
    service_type: string;
    status: string;
    mechanic: {
        name: string;
        phone: string;
        rating: number;
    } | null;
    total_cost: number;
    payment_status: string;
    scheduled_at: string | null;
    created_at: string;
}

interface ServiceRequestsIndexProps {
    serviceRequests: ServiceRequest[];
}

export default function ServiceRequestsIndex({
    serviceRequests,
}: ServiceRequestsIndexProps) {
    const { props } = usePage();
    const successMessage = (props.flash as any)?.success;

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
                label: 'Mechanic Assigned',
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
            completed: {
                color: 'bg-emerald-100 text-emerald-700',
                icon: <CheckCircle className="h-4 w-4" />,
                label: 'Completed',
            },
            rejected: {
                color: 'bg-red-100 text-red-700',
                icon: <XCircle className="h-4 w-4" />,
                label: 'Rejected',
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

    const getPaymentBadge = (status: string) => {
        return status === 'paid' ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                Paid
            </span>
        ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                Pending
            </span>
        );
    };

    return (
        <>
            <Head title="My Service Requests - ENTYRE">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#F6F7F9]">
                <Navbar />

                <main className="mx-auto max-w-[1440px] px-6 py-8 lg:px-16 lg:py-8">
                    {successMessage && (
                        <div className="mb-4 rounded-lg bg-green-100 p-4 text-sm text-green-700">
                            {successMessage}
                        </div>
                    )}

                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-[#1A202C]">
                            My Service Requests
                        </h1>
                        <Button
                            onClick={() =>
                                router.visit('/service-requests/create')
                            }
                            className="h-11 rounded-[4px] bg-[#3563E9] px-6 text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                        >
                            New Service Request
                        </Button>
                    </div>

                    {serviceRequests.length === 0 ? (
                        <div className="rounded-[10px] bg-white p-12 text-center">
                            <Wrench className="mx-auto mb-4 h-16 w-16 text-[#90A3BF]" />
                            <h2 className="mb-2 text-xl font-bold text-[#1A202C]">
                                No service requests yet
                            </h2>
                            <p className="mb-6 text-[#90A3BF]">
                                Request a service to get started
                            </p>
                            <Button
                                onClick={() =>
                                    router.visit('/service-requests/create')
                                }
                                className="h-11 rounded-[4px] bg-[#3563E9] px-6 text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                            >
                                Request Service
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {serviceRequests.map((request) => (
                                <div
                                    key={request.id}
                                    onClick={() =>
                                        router.visit(
                                            `/service-requests/${request.id}`
                                        )
                                    }
                                    className="cursor-pointer rounded-[10px] bg-white p-6 transition-shadow hover:shadow-lg"
                                >
                                    <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <h3 className="mb-1 text-lg font-bold text-[#1A202C]">
                                                {request.service_type}
                                            </h3>
                                            <p className="text-sm text-[#90A3BF]">
                                                Request #{request.request_number}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            {getStatusBadge(request.status)}
                                            {getPaymentBadge(
                                                request.payment_status
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        {request.mechanic && (
                                            <div>
                                                <p className="mb-1 text-xs font-semibold uppercase text-[#90A3BF]">
                                                    Mechanic
                                                </p>
                                                <p className="text-sm font-semibold text-[#1A202C]">
                                                    {request.mechanic.name}
                                                </p>
                                                <p className="text-xs text-[#90A3BF]">
                                                    {request.mechanic.phone} •
                                                    Rating:{' '}
                                                    {request.mechanic.rating.toFixed(
                                                        1
                                                    )}
                                                    /5
                                                </p>
                                            </div>
                                        )}

                                        <div>
                                            <p className="mb-1 text-xs font-semibold uppercase text-[#90A3BF]">
                                                Total Cost
                                            </p>
                                            <p className="text-lg font-bold text-[#1A202C]">
                                                {formatPrice(request.total_cost)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="mb-1 text-xs font-semibold uppercase text-[#90A3BF]">
                                                Created
                                            </p>
                                            <p className="text-sm font-semibold text-[#1A202C]">
                                                {request.created_at}
                                            </p>
                                            {request.scheduled_at && (
                                                <p className="text-xs text-[#90A3BF]">
                                                    Scheduled:{' '}
                                                    {request.scheduled_at}
                                                </p>
                                            )}
                                        </div>
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
