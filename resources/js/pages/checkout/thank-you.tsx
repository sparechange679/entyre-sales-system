import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Head, router } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: number;
    total: number;
    status: string;
    createdAt: string;
    items: OrderItem[];
}

interface ThankYouProps {
    order: Order;
}

export default function ThankYou({ order }: ThankYouProps) {
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
            <Head title="Order Confirmed - ENTYRE">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#F6F7F9]">
                <Navbar />

                <main className="mx-auto max-w-[1440px] px-6 py-8 lg:px-16 lg:py-16">
                    <div className="mx-auto max-w-3xl">
                        {/* Success Message */}
                        <div className="mb-8 rounded-[10px] bg-white p-8 text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                                    <CheckCircle className="h-12 w-12 text-green-600" />
                                </div>
                            </div>

                            <h1 className="mb-2 text-3xl font-bold text-[#1A202C]">
                                Thank You for Your Order!
                            </h1>
                            <p className="mb-4 text-lg text-[#90A3BF]">
                                Your order has been confirmed and will be processed
                                shortly.
                            </p>

                            <div className="mb-6 rounded-lg bg-[#F6F7F9] p-4">
                                <p className="text-sm text-[#90A3BF]">Order Number</p>
                                <p className="text-2xl font-bold text-[#3563E9]">
                                    #{order.id}
                                </p>
                            </div>

                            <p className="text-sm text-[#90A3BF]">
                                A confirmation email has been sent to your email address
                                with your order details and receipt.
                            </p>
                        </div>

                        {/* Order Details */}
                        <div className="mb-8 rounded-[10px] bg-white p-8">
                            <h2 className="mb-4 text-xl font-bold text-[#1A202C]">
                                Order Details
                            </h2>

                            <div className="mb-6 space-y-2 border-b border-gray-200 pb-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#90A3BF]">Order Date</span>
                                    <span className="font-semibold text-[#1A202C]">
                                        {order.createdAt}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#90A3BF]">Status</span>
                                    <span className="font-semibold capitalize text-green-600">
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="mb-3 text-base font-bold text-[#1A202C]">
                                    Items Ordered
                                </h3>
                                <div className="space-y-3">
                                    {order.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-lg bg-[#F6F7F9] p-3"
                                        >
                                            <div>
                                                <p className="text-sm font-semibold text-[#1A202C]">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-[#90A3BF]">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-bold text-[#1A202C]">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-[#1A202C]">
                                        Total
                                    </span>
                                    <span className="text-2xl font-bold text-[#1A202C]">
                                        {formatPrice(order.total)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button
                                onClick={() => router.visit('/')}
                                className="h-12 flex-1 rounded-[4px] bg-[#3563E9] text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                            >
                                Continue Shopping
                            </Button>
                            <Button
                                onClick={() => router.visit('/dashboard')}
                                className="h-12 flex-1 rounded-[4px] border-2 border-[#3563E9] bg-white text-base font-semibold text-[#3563E9] transition-colors hover:bg-[#3563E9] hover:text-white"
                            >
                                View Dashboard
                            </Button>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
