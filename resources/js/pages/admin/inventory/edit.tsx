import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Package, ArrowLeft, AlertTriangle } from 'lucide-react';

interface Part {
    id: number;
    sku: string;
    name: string;
    category: string | null;
    price: number;
    cost_price: number;
    stock_quantity: number;
    min_stock_level: number;
    is_low_stock: boolean;
    is_active: boolean;
    image_url: string | null;
}

interface InventoryEditProps {
    part: Part;
}

export default function InventoryEdit({ part }: InventoryEditProps) {
    const { data, setData, patch, processing, errors } = useForm({
        stock_quantity: part.stock_quantity,
        min_stock_level: part.min_stock_level,
        cost_price: part.cost_price,
        price: part.price,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/admin/inventory/${part.id}`);
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
        <AuthenticatedLayout>
            <Head title={`Edit Inventory - ${part.name}`} />

            <div className="p-8">
                <div className="mb-8">
                    <Link
                        href="/admin/inventory"
                        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3563E9] hover:underline"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Inventory
                    </Link>
                    <h1 className="text-3xl font-bold text-[#1A202C]">Edit Inventory</h1>
                    <p className="mt-2 text-[#90A3BF]">Update stock levels and pricing for {part.name}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Part Information */}
                    <div className="lg:col-span-1">
                        <div className="rounded-[10px] bg-white p-6">
                            <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Part Information</h2>

                            {part.image_url ? (
                                <img
                                    src={part.image_url}
                                    alt={part.name}
                                    className="mb-4 h-48 w-full rounded-lg object-cover"
                                />
                            ) : (
                                <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-gray-200">
                                    <Package className="h-16 w-16 text-gray-400" />
                                </div>
                            )}

                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Part Name</p>
                                    <p className="font-semibold text-[#1A202C]">{part.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">SKU</p>
                                    <p className="font-semibold text-[#1A202C]">{part.sku}</p>
                                </div>
                                {part.category && (
                                    <div>
                                        <p className="text-sm text-[#90A3BF]">Category</p>
                                        <p className="font-semibold text-[#1A202C]">{part.category}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Status</p>
                                    <p className={`font-semibold ${part.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                        {part.is_active ? 'Active' : 'Inactive'}
                                    </p>
                                </div>
                            </div>

                            {part.is_low_stock && (
                                <div className="mt-6 flex items-start gap-3 rounded-lg border-2 border-red-200 bg-red-50 p-4">
                                    <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-600" />
                                    <div>
                                        <p className="font-semibold text-red-600">Low Stock Alert</p>
                                        <p className="text-sm text-red-600">
                                            Current stock ({part.stock_quantity}) is below minimum level (
                                            {part.min_stock_level})
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Edit Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-[10px] bg-white p-6">
                            <h2 className="mb-6 text-xl font-bold text-[#1A202C]">Update Inventory</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Stock Quantity */}
                                <div>
                                    <label htmlFor="stock_quantity" className="mb-2 block text-sm font-semibold text-[#1A202C]">
                                        Stock Quantity <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="stock_quantity"
                                        value={data.stock_quantity}
                                        onChange={(e) => setData('stock_quantity', parseInt(e.target.value) || 0)}
                                        className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-[#3563E9] focus:outline-none"
                                        min="0"
                                        required
                                    />
                                    {errors.stock_quantity && (
                                        <p className="mt-1 text-sm text-red-500">{errors.stock_quantity}</p>
                                    )}
                                    <p className="mt-1 text-sm text-[#90A3BF]">Current stock: {part.stock_quantity} units</p>
                                </div>

                                {/* Minimum Stock Level */}
                                <div>
                                    <label htmlFor="min_stock_level" className="mb-2 block text-sm font-semibold text-[#1A202C]">
                                        Minimum Stock Level <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="min_stock_level"
                                        value={data.min_stock_level}
                                        onChange={(e) => setData('min_stock_level', parseInt(e.target.value) || 0)}
                                        className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-[#3563E9] focus:outline-none"
                                        min="0"
                                        required
                                    />
                                    {errors.min_stock_level && (
                                        <p className="mt-1 text-sm text-red-500">{errors.min_stock_level}</p>
                                    )}
                                    <p className="mt-1 text-sm text-[#90A3BF]">
                                        Alert will be triggered when stock falls below this level
                                    </p>
                                </div>

                                {/* Cost Price */}
                                <div>
                                    <label htmlFor="cost_price" className="mb-2 block text-sm font-semibold text-[#1A202C]">
                                        Cost Price (MWK)
                                    </label>
                                    <input
                                        type="number"
                                        id="cost_price"
                                        value={data.cost_price}
                                        onChange={(e) => setData('cost_price', parseFloat(e.target.value) || 0)}
                                        className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-[#3563E9] focus:outline-none"
                                        min="0"
                                        step="0.01"
                                    />
                                    {errors.cost_price && <p className="mt-1 text-sm text-red-500">{errors.cost_price}</p>}
                                    <p className="mt-1 text-sm text-[#90A3BF]">Current: {formatPrice(part.cost_price)}</p>
                                </div>

                                {/* Selling Price */}
                                <div>
                                    <label htmlFor="price" className="mb-2 block text-sm font-semibold text-[#1A202C]">
                                        Selling Price (MWK)
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        value={data.price}
                                        onChange={(e) => setData('price', parseFloat(e.target.value) || 0)}
                                        className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-[#3563E9] focus:outline-none"
                                        min="0"
                                        step="0.01"
                                    />
                                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                                    <p className="mt-1 text-sm text-[#90A3BF]">Current: {formatPrice(part.price)}</p>
                                </div>

                                {/* Profit Margin Info */}
                                {data.price > 0 && data.cost_price > 0 && (
                                    <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                                        <p className="text-sm font-semibold text-blue-600">Profit Margin</p>
                                        <p className="mt-1 text-2xl font-bold text-blue-600">
                                            {formatPrice(data.price - data.cost_price)} (
                                            {(((data.price - data.cost_price) / data.cost_price) * 100).toFixed(1)}%)
                                        </p>
                                    </div>
                                )}

                                {/* Submit Buttons */}
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-lg bg-[#3563E9] px-6 py-3 font-semibold text-white transition hover:bg-[#264ac6] disabled:opacity-50"
                                    >
                                        {processing ? 'Updating...' : 'Update Inventory'}
                                    </button>
                                    <Link
                                        href="/admin/inventory"
                                        className="rounded-lg border-2 border-gray-200 px-6 py-3 font-semibold text-[#1A202C] transition hover:border-gray-300"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
