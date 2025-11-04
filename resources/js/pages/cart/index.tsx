import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Head, router } from '@inertiajs/react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface CartItem {
    id: number;
    quantity: number;
    part: {
        id: number;
        name: string;
        brand: string;
        price: number;
        image: string;
        stockQuantity: number;
        category: string;
    };
}

interface CartIndexProps {
    cartItems: CartItem[];
    total: number;
}

export default function CartIndex({ cartItems, total }: CartIndexProps) {
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-MW', {
            style: 'currency',
            currency: 'MWK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const updateQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        router.patch(
            `/cart/${itemId}`,
            { quantity: newQuantity },
            {
                preserveScroll: true,
            }
        );
    };

    const removeItem = (itemId: number) => {
        if (confirm('Are you sure you want to remove this item from your cart?')) {
            router.delete(`/cart/${itemId}`, {
                preserveScroll: true,
            });
        }
    };

    const proceedToCheckout = () => {
        router.get('/checkout');
    };

    return (
        <>
            <Head title="Shopping Cart - ENTYRE">
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
                        Shopping Cart
                    </h1>

                    {cartItems.length === 0 ? (
                        <div className="rounded-[10px] bg-white p-12 text-center">
                            <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-[#90A3BF]" />
                            <h2 className="mb-2 text-xl font-bold text-[#1A202C]">
                                Your cart is empty
                            </h2>
                            <p className="mb-6 text-[#90A3BF]">
                                Add some items to get started
                            </p>
                            <Button
                                onClick={() => router.visit('/')}
                                className="h-11 rounded-[4px] bg-[#3563E9] px-6 text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                            >
                                Browse Products
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Cart Items */}
                            <div className="lg:col-span-2">
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 rounded-[10px] bg-white p-4 md:p-6"
                                        >
                                            {/* Image */}
                                            <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-[#F6F7F9] p-2 md:h-32 md:w-32">
                                                <img
                                                    src={item.part.image}
                                                    alt={item.part.name}
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex flex-1 flex-col">
                                                <div className="mb-2 flex items-start justify-between">
                                                    <div>
                                                        <h3 className="mb-1 text-base font-bold text-[#1A202C] md:text-lg">
                                                            {item.part.name}
                                                        </h3>
                                                        <p className="text-sm text-[#90A3BF]">
                                                            {item.part.brand} •{' '}
                                                            {item.part.category}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-[#90A3BF] transition-colors hover:text-red-500"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>

                                                <div className="mt-auto flex items-center justify-between">
                                                    {/* Quantity */}
                                                    <div className="flex items-center rounded-lg border-2 border-gray-200">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.quantity - 1
                                                                )
                                                            }
                                                            className="flex h-10 w-10 items-center justify-center text-[#90A3BF] transition-colors hover:text-[#1A202C]"
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </button>
                                                        <span className="flex h-10 w-12 items-center justify-center text-base font-bold text-[#1A202C]">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.quantity + 1
                                                                )
                                                            }
                                                            disabled={
                                                                item.quantity >=
                                                                item.part.stockQuantity
                                                            }
                                                            className="flex h-10 w-10 items-center justify-center text-[#90A3BF] transition-colors hover:text-[#1A202C] disabled:opacity-50"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    {/* Price */}
                                                    <p className="text-lg font-bold text-[#1A202C] md:text-xl">
                                                        {formatPrice(
                                                            item.part.price * item.quantity
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="rounded-[10px] bg-white p-6">
                                    <h2 className="mb-4 text-xl font-bold text-[#1A202C]">
                                        Order Summary
                                    </h2>

                                    <div className="mb-4 space-y-2">
                                        <div className="flex items-center justify-between text-base text-[#90A3BF]">
                                            <span>
                                                Subtotal ({cartItems.length} items)
                                            </span>
                                            <span className="font-semibold text-[#1A202C]">
                                                {formatPrice(total)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-6 border-t border-gray-200 pt-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-[#1A202C]">
                                                Total
                                            </span>
                                            <span className="text-2xl font-bold text-[#1A202C]">
                                                {formatPrice(total)}
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={proceedToCheckout}
                                        className="h-12 w-full rounded-[4px] bg-[#3563E9] text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                                    >
                                        Proceed to Checkout
                                    </Button>

                                    <Button
                                        onClick={() => router.visit('/')}
                                        className="mt-3 h-12 w-full rounded-[4px] border-2 border-[#3563E9] bg-white text-base font-semibold text-[#3563E9] transition-colors hover:bg-[#3563E9] hover:text-white"
                                    >
                                        Continue Shopping
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
}
