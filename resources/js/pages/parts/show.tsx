import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface Part {
    id: number;
    name: string;
    description: string;
    category: string;
    brand: string;
    sku: string;
    tireSize?: string;
    loadIndex?: string;
    speedRating?: string;
    tireType?: string;
    treadPattern?: string;
    specifications?: Record<string, unknown>;
    price: number;
    costPrice?: number;
    stockQuantity: number;
    isInStock: boolean;
    images: Array<{ id: number; url: string; isPrimary: boolean }>;
    primaryImage: string;
}

interface PartShowProps {
    part: Part;
}

export default function PartShow({ part }: PartShowProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(part.primaryImage);

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-MW', {
            style: 'currency',
            currency: 'MWK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const incrementQuantity = () => {
        if (quantity < part.stockQuantity) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        router.post('/cart', {
            part_id: part.id,
            quantity: quantity,
        });
    };

    const handleBuyNow = () => {
        router.post('/checkout/buy-now', {
            part_id: part.id,
            quantity: quantity,
        });
    };

    return (
        <>
            <Head title={`${part.name} - ENTYRE`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#F6F7F9]">
                <Navbar />

                <main className="mx-auto max-w-[1440px] px-6 py-8 lg:px-16 lg:py-8">
                    <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Images Section */}
                        <div className="rounded-[10px] bg-white p-6">
                            <div className="mb-4 flex items-center justify-center rounded-lg bg-[#F6F7F9] p-8">
                                <img
                                    src={selectedImage}
                                    alt={part.name}
                                    className="h-auto w-full max-w-[400px] object-contain"
                                />
                            </div>
                            {part.images && part.images.length > 1 && (
                                <div className="flex gap-2">
                                    {part.images.map((image) => (
                                        <button
                                            key={image.id}
                                            onClick={() => setSelectedImage(image.url)}
                                            className={`flex h-20 w-20 items-center justify-center rounded-lg border-2 p-2 transition-colors ${
                                                selectedImage === image.url
                                                    ? 'border-[#3563E9]'
                                                    : 'border-gray-200'
                                            }`}
                                        >
                                            <img
                                                src={image.url}
                                                alt={`${part.name} view ${image.id}`}
                                                className="h-full w-full object-contain"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="rounded-[10px] bg-white p-6">
                            <div className="mb-4">
                                <p className="mb-2 text-sm font-semibold text-[#90A3BF]">
                                    {part.category}
                                </p>
                                <h1 className="mb-2 text-3xl font-bold text-[#1A202C]">
                                    {part.name}
                                </h1>
                                <p className="text-base text-[#90A3BF]">
                                    {part.description}
                                </p>
                            </div>

                            {/* Specifications */}
                            <div className="mb-6 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-[#90A3BF]">
                                        Brand
                                    </p>
                                    <p className="text-base font-bold text-[#1A202C]">
                                        {part.brand}
                                    </p>
                                </div>
                                {part.sku && (
                                    <div>
                                        <p className="text-sm font-semibold text-[#90A3BF]">
                                            SKU
                                        </p>
                                        <p className="text-base font-bold text-[#1A202C]">
                                            {part.sku}
                                        </p>
                                    </div>
                                )}
                                {part.tireSize && (
                                    <div>
                                        <p className="text-sm font-semibold text-[#90A3BF]">
                                            Tire Size
                                        </p>
                                        <p className="text-base font-bold text-[#1A202C]">
                                            {part.tireSize}
                                        </p>
                                    </div>
                                )}
                                {part.loadIndex && (
                                    <div>
                                        <p className="text-sm font-semibold text-[#90A3BF]">
                                            Load Index
                                        </p>
                                        <p className="text-base font-bold text-[#1A202C]">
                                            {part.loadIndex}
                                        </p>
                                    </div>
                                )}
                                {part.speedRating && (
                                    <div>
                                        <p className="text-sm font-semibold text-[#90A3BF]">
                                            Speed Rating
                                        </p>
                                        <p className="text-base font-bold text-[#1A202C]">
                                            {part.speedRating}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-semibold text-[#90A3BF]">
                                        Stock
                                    </p>
                                    <p className="text-base font-bold text-[#1A202C]">
                                        {part.stockQuantity} units
                                    </p>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-[#1A202C]">
                                        {formatPrice(part.price)}
                                    </span>
                                    {part.costPrice && (
                                        <span className="text-lg font-bold text-[#90A3BF] line-through">
                                            {formatPrice(part.costPrice)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-6">
                                <p className="mb-2 text-sm font-semibold text-[#90A3BF]">
                                    Quantity
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center rounded-lg border-2 border-gray-200">
                                        <button
                                            onClick={decrementQuantity}
                                            className="flex h-12 w-12 items-center justify-center text-[#90A3BF] transition-colors hover:text-[#1A202C]"
                                        >
                                            <Minus className="h-5 w-5" />
                                        </button>
                                        <span className="flex h-12 w-16 items-center justify-center text-lg font-bold text-[#1A202C]">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={incrementQuantity}
                                            className="flex h-12 w-12 items-center justify-center text-[#90A3BF] transition-colors hover:text-[#1A202C]"
                                        >
                                            <Plus className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {part.isInStock ? (
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <Button
                                        onClick={handleAddToCart}
                                        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[4px] border-2 border-[#3563E9] bg-white px-6 text-base font-semibold text-[#3563E9] transition-colors hover:bg-[#3563E9] hover:text-white"
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        Add to Cart
                                    </Button>
                                    <Button
                                        onClick={handleBuyNow}
                                        className="h-12 flex-1 rounded-[4px] bg-[#3563E9] px-6 text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                                    >
                                        Buy Now
                                    </Button>
                                </div>
                            ) : (
                                <div className="rounded-lg bg-red-50 p-4 text-center">
                                    <p className="font-semibold text-red-600">
                                        Out of Stock
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
