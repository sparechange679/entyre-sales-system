import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';

interface ServiceRequest {
    id: number;
    request_number: string;
    status: string;
    service_type: {
        name: string;
        description: string;
    };
    total_cost: number;
}

interface PaymentShowProps {
    serviceRequest: ServiceRequest;
}

export default function PaymentShow({ serviceRequest }: PaymentShowProps) {
    const { post, processing } = useForm();

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-MW', {
            style: 'currency',
            currency: 'MWK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <>
            <Head title={`Payment for Service Request #${serviceRequest.request_number} - ENTYRE`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#F6F7F9]">
                <Navbar />

                <main className="mx-auto max-w-[1440px] px-6 py-8 lg:px-16 lg:py-8">
                    <div className="mx-auto max-w-lg">
                        <div className="rounded-[10px] bg-white p-8">
                            <h1 className="mb-4 text-center text-2xl font-bold text-[#1A202C]">
                                Payment for Service Request #{serviceRequest.request_number}
                            </h1>

                            <div className="mb-6 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-[#90A3BF]">Service</span>
                                    <span className="font-semibold text-[#1A202C]">{serviceRequest.service_type.name}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold">
                                    <span className="text-[#1A202C]">Total Cost</span>
                                    <span className="text-[#3563E9]">{formatPrice(serviceRequest.total_cost)}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    post(route('service-requests.payment.store', serviceRequest.id));
                                }}>
                                    <Button type="submit" className="w-full h-12 text-lg" disabled={processing}>
                                        {processing ? 'Processing...' : 'Pay Now'}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
