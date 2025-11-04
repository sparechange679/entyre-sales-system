import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, AlertTriangle, Package } from 'lucide-react';

interface Category {
    id: number;
    name: string;
}

interface Part {
    id: number;
    category_id: number;
    sku: string;
    name: string;
    description: string | null;
    brand: string | null;
    price: number;
    cost_price: number;
    stock_quantity: number;
    min_stock_level: number;
    is_active: boolean;
    is_featured: boolean;
    image_url: string | null;
}

interface PartsEditProps {
    part: Part;
    categories: Category[];
}

export default function PartsEdit({ part, categories }: PartsEditProps) {
    const { data, setData, patch, processing, errors } = useForm({
        category_id: part.category_id.toString(),
        sku: part.sku,
        name: part.name,
        description: part.description || '',
        brand: part.brand || '',
        price: part.price.toString(),
        cost_price: part.cost_price.toString(),
        stock_quantity: part.stock_quantity.toString(),
        min_stock_level: part.min_stock_level.toString(),
        is_active: part.is_active,
        is_featured: part.is_featured,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/admin/parts/${part.id}`);
    };

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-MW', {
            style: 'currency',
            currency: 'MWK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const isLowStock = parseInt(data.stock_quantity) <= parseInt(data.min_stock_level);

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Part - ${part.name}`} />

            <div className="p-8">
                <div className="mb-8">
                    <Link
                        href="/admin/parts"
                        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3563E9] hover:underline"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Parts
                    </Link>
                    <h1 className="text-3xl font-bold text-[#1A202C]">Edit Part</h1>
                    <p className="mt-2 text-[#90A3BF]">Update part details and inventory levels</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Left Sidebar - Part Preview */}
                    <div className="lg:col-span-1">
                        <div className="rounded-[10px] bg-white p-6">
                            <h2 className="mb-4 text-lg font-bold text-[#1A202C]">Part Preview</h2>

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
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Current Price</p>
                                    <p className="font-semibold text-[#1A202C]">{formatPrice(part.price)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#90A3BF]">Current Stock</p>
                                    <p className="font-semibold text-[#1A202C]">{part.stock_quantity} units</p>
                                </div>
                            </div>

                            {isLowStock && (
                                <div className="mt-6 flex items-start gap-3 rounded-lg border-2 border-red-200 bg-red-50 p-4">
                                    <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-600" />
                                    <div>
                                        <p className="font-semibold text-red-600">Low Stock Warning</p>
                                        <p className="text-sm text-red-600">
                                            Stock is below minimum level. Email alert will be sent when you save.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="lg:col-span-3">
                        <div className="rounded-[10px] bg-white p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Category */}
                                    <div>
                                        <label htmlFor="category_id" className="mb-2 block text-sm font-semibold text-[#1A202C]">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="category_id"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-[#3563E9] focus:outline-none"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category_id && <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>}
                                    </div>

                                    {/* SKU */}
                                    <div>
                                        <label htmlFor="sku" className="mb-2 block text-sm font-semibold text-[#1A202C]">
                                            SKU <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="sku"
                                            value={data.sku}
                                            onChange={(e) => setData('sku', e.target.value)}
                                            className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-[#3563E9] focus:outline-none"
                                            required
                                        />
                                        {errors.sku && <p className="mt-1 text-sm text-red-500">{errors.sku}</p>}
                                    </div>

                                    {/* Name */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#1A202C]">
                                            Part Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-[#3563E9] focus:outline-none"
                                            required
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    {/* Brand */}
                                    <div>
                                        <label htmlFor="brand" className="mb-2 block text-sm font-semibold text-[#1A202C]">
                                            Brand
                                        </label>
                                        <input
                                            type="text"
                                            id="brand"
                                            value={data.brand}
                                            onChange={(e) => setData('brand', e.target.value)}
                                            className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-[#3563E9] focus:outline-none"
                                        />
                                        {errors.brand && <p className="mt-1 text-sm text-red-500">{errors.brand}</p>}
                                    </div>

                                    {/* Description */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="description" className="mb-2 block text-sm font-semibold text-[#1A202C]">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={4}
                                            className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-[#3563E9] focus:outline-none"
                                        />
                                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                                    </div>
                                </div>

                                {/* Pricing Section */}
                                <div className="border-t-2 border-gray-200 pt-6">
                                    <h3 className="mb-4 text-lg font-bold text-[#1A202C]">Pricing</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        {/* Price */}
                                        <div>
                                            <label htmlFor="price" className="mb-2 block text-sm font-semibold text-[#1A202C]">
                                                Selling Price (MWK) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                id="price"
                                                value={data.price}
                                                onChange={(e) => setData('price', e.target.value)}
                                                className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-[#3563E9] focus:outline-none"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
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
                                                onChange={(e) => setData('cost_price', e.target.value)}
                                                className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-[#3563E9] focus:outline-none"
                                                min="0"
                                                step="0.01"
                                            />
                                            {errors.cost_price && <p className="mt-1 text-sm text-red-500">{errors.cost_price}</p>}
                                        </div>

                                        {/* Profit Margin Display */}
                                        {parseFloat(data.price) > 0 && parseFloat(data.cost_price) > 0 && (
                                            <div className="md:col-span-2">
                                                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                                                    <p className="text-sm font-semibold text-blue-600">Profit Margin</p>
                                                    <p className="mt-1 text-2xl font-bold text-blue-600">
                                                        {formatPrice(parseFloat(data.price) - parseFloat(data.cost_price))} (
                                                        {(
                                                            ((parseFloat(data.price) - parseFloat(data.cost_price)) /
                                                                parseFloat(data.cost_price)) *
                                                            100
                                                        ).toFixed(1)}
                                                        %)
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Inventory Section */}
                                <div className="border-t-2 border-gray-200 pt-6">
                                    <h3 className="mb-4 text-lg font-bold text-[#1A202C]">Inventory</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        {/* Stock Quantity */}
                                        <div>
                                            <label htmlFor="stock_quantity" className="mb-2 block text-sm font-semibold text-[#1A202C]">
                                                Stock Quantity <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                id="stock_quantity"
                                                value={data.stock_quantity}
                                                onChange={(e) => setData('stock_quantity', e.target.value)}
                                                className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-[#3563E9] focus:outline-none"
                                                min="0"
                                                required
                                            />
                                            {errors.stock_quantity && (
                                                <p className="mt-1 text-sm text-red-500">{errors.stock_quantity}</p>
                                            )}
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
                                                onChange={(e) => setData('min_stock_level', e.target.value)}
                                                className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-[#3563E9] focus:outline-none"
                                                min="0"
                                                required
                                            />
                                            {errors.min_stock_level && (
                                                <p className="mt-1 text-sm text-red-500">{errors.min_stock_level}</p>
                                            )}
                                            <p className="mt-1 text-sm text-[#90A3BF]">
                                                Email alerts will be sent when stock falls below this level
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Section */}
                                <div className="border-t-2 border-gray-200 pt-6">
                                    <h3 className="mb-4 text-lg font-bold text-[#1A202C]">Status</h3>
                                    <div className="space-y-3">
                                        {/* Is Active */}
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id="is_active"
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                                className="h-5 w-5 rounded border-gray-300 text-[#3563E9] focus:ring-[#3563E9]"
                                            />
                                            <label htmlFor="is_active" className="text-sm font-semibold text-[#1A202C]">
                                                Active (Part is available for sale)
                                            </label>
                                        </div>

                                        {/* Is Featured */}
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id="is_featured"
                                                checked={data.is_featured}
                                                onChange={(e) => setData('is_featured', e.target.checked)}
                                                className="h-5 w-5 rounded border-gray-300 text-[#3563E9] focus:ring-[#3563E9]"
                                            />
                                            <label htmlFor="is_featured" className="text-sm font-semibold text-[#1A202C]">
                                                Featured (Show on homepage)
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex gap-4 border-t-2 border-gray-200 pt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-lg bg-[#3563E9] px-6 py-3 font-semibold text-white transition hover:bg-[#264ac6] disabled:opacity-50"
                                    >
                                        {processing ? 'Updating...' : 'Update Part'}
                                    </button>
                                    <Link
                                        href="/admin/parts"
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
