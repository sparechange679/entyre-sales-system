import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Category {
    id: number;
    name: string;
}

interface PartsCreateProps {
    categories: Category[];
}

export default function PartsCreate({ categories }: PartsCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        sku: '',
        name: '',
        description: '',
        brand: '',
        price: '',
        cost_price: '',
        stock_quantity: '',
        min_stock_level: '',
        is_active: true,
        is_featured: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/parts');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add New Part" />

            <div className="p-8">
                <div className="mb-8">
                    <Link
                        href="/admin/parts"
                        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3563E9] hover:underline"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Parts
                    </Link>
                    <h1 className="text-3xl font-bold text-[#1A202C]">Add New Part</h1>
                    <p className="mt-2 text-[#90A3BF]">Add a new part to your inventory</p>
                </div>

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

                        {/* Submit Buttons */}
                        <div className="flex gap-4 border-t-2 border-gray-200 pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-[#3563E9] px-6 py-3 font-semibold text-white transition hover:bg-[#264ac6] disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create Part'}
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
        </AuthenticatedLayout>
    );
}
