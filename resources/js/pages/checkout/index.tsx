import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Head, router } from '@inertiajs/react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { FormEvent, useState } from 'react';

interface CartItem {
    id?: number;
    quantity: number;
    part: {
        id: number;
        name: string;
        brand: string;
        price: number;
        image: string;
    };
}

interface CheckoutIndexProps {
    cartItems: CartItem[];
    total: number;
    clientSecret: string;
    stripeKey: string;
    isBuyNow?: boolean;
}

function CheckoutForm({ total, isBuyNow }: { total: number; isBuyNow?: boolean }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-MW', {
            style: 'currency',
            currency: 'MWK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An error occurred');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Payment succeeded, submit to our success endpoint
            router.post('/checkout/success', {
                payment_intent: paymentIntent.id,
            });
        } else {
            setErrorMessage('Payment was not successful. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-[10px] bg-white p-6">
                <h2 className="mb-4 text-xl font-bold text-[#1A202C]">
                    Payment Details
                </h2>
                <PaymentElement />
            </div>

            {errorMessage && (
                <div className="rounded-lg bg-red-50 p-4">
                    <p className="text-sm font-semibold text-red-600">
                        {errorMessage}
                    </p>
                </div>
            )}

            <div className="rounded-[10px] bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#1A202C]">
                        Total
                    </span>
                    <span className="text-2xl font-bold text-[#1A202C]">
                        {formatPrice(total)}
                    </span>
                </div>

                <Button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="h-12 w-full rounded-[4px] bg-[#3563E9] text-base font-semibold text-white transition-colors hover:bg-[#264AC6] disabled:opacity-50"
                >
                    {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
                </Button>
            </div>
        </form>
    );
}

export default function CheckoutIndex({
    cartItems,
    total,
    clientSecret,
    stripeKey,
    isBuyNow = false,
}: CheckoutIndexProps) {
    const stripePromise = loadStripe(stripeKey);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            variables: {
                colorPrimary: '#3563E9',
            },
        },
    };

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
            <Head title="Checkout - ENTYRE">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#F6F7F9]">
                <Navbar />

                <main className="mx-auto max-w-[1440px] px-6 py-8 lg:px-16 lg:py-8">
                    <h1 className="mb-8 text-3xl font-bold text-[#1A202C]">
                        Checkout
                    </h1>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="rounded-[10px] bg-white p-6">
                                <h2 className="mb-4 text-xl font-bold text-[#1A202C]">
                                    Order Summary
                                </h2>

                                <div className="mb-4 space-y-4">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="flex gap-3">
                                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-[#F6F7F9] p-2">
                                                <img
                                                    src={item.part.image}
                                                    alt={item.part.name}
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-bold text-[#1A202C]">
                                                    {item.part.name}
                                                </h3>
                                                <p className="text-xs text-[#90A3BF]">
                                                    {item.part.brand} • Qty: {item.quantity}
                                                </p>
                                                <p className="mt-1 text-sm font-bold text-[#1A202C]">
                                                    {formatPrice(
                                                        item.part.price * item.quantity
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-base font-bold text-[#1A202C]">
                                            Total
                                        </span>
                                        <span className="text-xl font-bold text-[#1A202C]">
                                            {formatPrice(total)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <div className="lg:col-span-2">
                            {clientSecret && (
                                <Elements stripe={stripePromise} options={options}>
                                    <CheckoutForm total={total} isBuyNow={isBuyNow} />
                                </Elements>
                            )}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
