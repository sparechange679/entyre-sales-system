
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import { Wrench, Clock, CheckCircle, XCircle, AlertCircle, MapPin, User, Car, Package, Calendar } from 'lucide-react';

interface ServiceRequest {
    id: number;
    request_number: string;
    status: string;
    service_type: {
        name: string;
        description: string;
    };
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    mechanic: {
        id: number;
        name: string;
        phone: string;
        rating: number;
    } | null;
    vehicle: {
        make: string;
        model: string;
        year: number;
        license_plate: string;
    };
    problem_description: string;
    location: {
        address: string;
        notes: string;
        latitude: number;
        longitude: number;
    };
    parts: {
        id: number;
        name: string;
        quantity: number;
        unit_price: number;
        subtotal: number;
        status: string;
        image: string;
    }[];
    labor_cost: number;
    parts_cost: number;
    total_cost: number;
    payment_status: string;
    created_at: string;
    scheduled_at: string | null;
    accepted_at: string | null;
    completed_at: string | null;
}

interface ServiceRequestShowProps {
    serviceRequest: ServiceRequest;
}

export default function ServiceRequestShow({ serviceRequest }: ServiceRequestShowProps) {
    const { props } = usePage();
    const user = props.auth.user;

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
            <Head title={`Service Request #${serviceRequest.request_number} - ENTYRE`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#F6F7F9]">
                <Navbar />

                <main className="mx-auto max-w-[1440px] px-6 py-8 lg:px-16 lg:py-8">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-[#1A202C]">
                                Service Request #{serviceRequest.request_number}
                            </h1>
                            <p className="text-sm text-[#90A3BF]">Created on {serviceRequest.created_at}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {getStatusBadge(serviceRequest.status)}
                            {getPaymentBadge(serviceRequest.payment_status)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="rounded-[10px] bg-white p-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <Wrench className="h-5 w-5 text-[#3563E9]" />
                                    <h2 className="text-xl font-bold text-[#1A202C]">Service Details</h2>
                                </div>
                                <p className="font-semibold text-lg text-[#1A202C]">{serviceRequest.service_type.name}</p>
                                <p className="text-sm text-[#90A3BF]">{serviceRequest.service_type.description}</p>
                            </div>

                            <div className="rounded-[10px] bg-white p-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <Car className="h-5 w-5 text-[#3563E9]" />
                                    <h2 className="text-xl font-bold text-[#1A202C]">Vehicle & Problem</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="font-semibold text-[#1A202C]">Make: <span className="font-normal text-[#90A3BF]">{serviceRequest.vehicle.make}</span></p>
                                        <p className="font-semibold text-[#1A202C]">Model: <span className="font-normal text-[#90A3BF]">{serviceRequest.vehicle.model}</span></p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#1A202C]">Year: <span className="font-normal text-[#90A3BF]">{serviceRequest.vehicle.year}</span></p>
                                        <p className="font-semibold text-[#1A202C]">License Plate: <span className="font-normal text-[#90A3BF]">{serviceRequest.vehicle.license_plate}</span></p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="font-semibold text-[#1A202C]">Problem Description:</p>
                                    <p className="text-sm text-[#90A3BF]">{serviceRequest.problem_description}</p>
                                </div>
                            </div>

                            <div className="rounded-[10px] bg-white p-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <Package className="h-5 w-5 text-[#3563E9]" />
                                    <h2 className="text-xl font-bold text-[#1A202C]">Parts</h2>
                                </div>
                                {serviceRequest.parts.length > 0 ? (
                                    <div className="space-y-3">
                                        {serviceRequest.parts.map((part) => (
                                            <div key={part.id} className="flex items-center gap-4 rounded-lg border-2 border-gray-200 p-4">
                                                <img src={part.image} alt={part.name} className="h-16 w-16 rounded object-contain" />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-[#1A202C]">{part.name}</h3>
                                                    <p className="text-sm text-[#90A3BF]">Qty: {part.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-[#3563E9]">{formatPrice(part.subtotal)}</p>
                                                    <p className="text-sm text-[#90A3BF]">{formatPrice(part.unit_price)} each</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-[#90A3BF]">No parts were required for this service.</p>
                                )}
                            </div>
                        </div>
                        <div className="lg:col-span-1 space-y-6">
                            <div className="sticky top-8 rounded-[10px] bg-white p-6">
                                <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Cost Summary</h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[#90A3BF]">Labor Cost</span>
                                        <span className="font-semibold text-[#1A202C]">{formatPrice(serviceRequest.labor_cost)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#90A3BF]">Parts Cost</span>
                                        <span className="font-semibold text-[#1A202C]">{formatPrice(serviceRequest.parts_cost)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold">
                                        <span className="text-[#1A202C]">Total Cost</span>
                                        <span className="text-[#3563E9]">{formatPrice(serviceRequest.total_cost)}</span>
                                    </div>
                                </div>
                                {user.role === 'admin' && (
                                    <div className="mt-4">
                                        <form action={route('service-requests.send-quotation', serviceRequest.id)} method="post">
                                            <input type="hidden" name="_token" value={props.csrf_token} />
                                            <Button type="submit" className="w-full">
                                                Send Quotation to Customer
                                            </Button>
                                        </form>
                                    </div>
                                )}
                                {user.role === 'customer' && serviceRequest.payment_status === 'pending' && serviceRequest.total_cost > 0 && (
                                    <div className="mt-4">
                                        <Link href={route('service-requests.payment', serviceRequest.id)}>
                                            <Button className="w-full">
                                                Proceed to Payment
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {serviceRequest.mechanic && (
                                <div className="rounded-[10px] bg-white p-6">
                                    <div className="mb-4 flex items-center gap-2">
                                        <User className="h-5 w-5 text-[#3563E9]" />
                                        <h2 className="text-xl font-bold text-[#1A202C]">Mechanic Details</h2>
                                    </div>
                                    <p className="font-semibold text-[#1A202C]">{serviceRequest.mechanic.name}</p>
                                    <p className="text-sm text-[#90A3BF]">{serviceRequest.mechanic.phone}</p>
                                    <p className="text-sm text-[#90A3BF]">Rating: {serviceRequest.mechanic.rating.toFixed(1)}/5</p>
                                </div>
                            )}

                            <div className="rounded-[10px] bg-white p-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <User className="h-5 w-5 text-[#3563E9]" />
                                    <h2 className="text-xl font-bold text-[#1A202C]">Customer Details</h2>
                                </div>
                                <p className="font-semibold text-[#1A202C]">{serviceRequest.customer.name}</p>
                                <p className="text-sm text-[#90A3BF]">{serviceRequest.customer.email}</p>
                                <p className="text-sm text-[#90A3BF]">{serviceRequest.customer.phone}</p>
                            </div>

                            <div className="rounded-[10px] bg-white p-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-[#3563E9]" />
                                    <h2 className="text-xl font-bold text-[#1A202C]">Location</h2>
                                </div>
                                <p className="font-semibold text-[#1A202C]">{serviceRequest.location.address}</p>
                                <p className="text-sm text-[#90A3BF]">{serviceRequest.location.notes}</p>
                                <a href={`https://www.google.com/maps/search/?api=1&query=${serviceRequest.location.latitude},${serviceRequest.location.longitude}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#3563E9] hover:underline">View on map</a>
                            </div>

                            <div className="rounded-[10px] bg-white p-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-[#3563E9]" />
                                    <h2 className="text-xl font-bold text-[#1A202C]">Timeline</h2>
                                </div>
                                <ul className="space-y-2 text-sm">
                                    <li><span className="font-semibold">Created:</span> {serviceRequest.created_at}</li>
                                    {serviceRequest.accepted_at && <li><span className="font-semibold">Accepted:</span> {serviceRequest.accepted_at}</li>}
                                    {serviceRequest.scheduled_at && <li><span className="font-semibold">Scheduled:</span> {serviceRequest.scheduled_at}</li>}
                                    {serviceRequest.completed_at && <li><span className="font-semibold">Completed:</span> {serviceRequest.completed_at}</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
