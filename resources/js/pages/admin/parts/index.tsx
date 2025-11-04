import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Package, Edit, Trash2, Plus, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface Part {
    id: number;
    sku: string;
    name: string;
    category: string | null;
    brand: string | null;
    price: number;
    cost_price: number;
    stock_quantity: number;
    min_stock_level: number;
    is_low_stock: boolean;
    is_active: boolean;
    is_featured: boolean;
    image_url: string | null;
}

interface PartsIndexProps {
    parts: Part[];
}

export default function PartsIndex({ parts }: PartsIndexProps) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-MW', {
            style: 'currency',
            currency: 'MWK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleDelete = (part: Part) => {
        if (confirm(`Are you sure you want to delete "${part.name}"? This action cannot be undone.`)) {
            setDeletingId(part.id);
            router.delete(`/admin/parts/${part.id}`, {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    const lowStockParts = parts.filter((part) => part.is_low_stock);
    const inStockParts = parts.filter((part) => !part.is_low_stock && part.stock_quantity > 0);
    const outOfStockParts = parts.filter((part) => part.stock_quantity === 0);

    return (
        <AuthenticatedLayout>
            <Head title="Parts Management" />

            <div className="p-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link href="/dashboard/admin" ><h1 className="text-3xl font-bold text-[#1A202C]">Parts Management</h1></Link>
                        <p className="mt-2 text-[#90A3BF]">Manage parts inventory, pricing, and availability</p>
                    </div>
                    <Link
                        href="/admin/parts/create"
                        className="flex items-center gap-2 rounded-lg bg-[#3563E9] px-6 py-3 font-semibold text-white transition hover:bg-[#264ac6]"
                    >
                        <Plus className="h-5 w-5" />
                        Add New Part
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="rounded-[10px] bg-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-blue-100 p-3">
                                <Package className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-[#90A3BF]">Total Parts</p>
                                <p className="text-2xl font-bold text-[#1A202C]">{parts.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[10px] bg-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-green-100 p-3">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-[#90A3BF]">In Stock</p>
                                <p className="text-2xl font-bold text-[#1A202C]">{inStockParts.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[10px] bg-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-red-100 p-3">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-sm text-[#90A3BF]">Low Stock</p>
                                <p className="text-2xl font-bold text-[#1A202C]">{lowStockParts.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[10px] bg-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-gray-100 p-3">
                                <Package className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-sm text-[#90A3BF]">Out of Stock</p>
                                <p className="text-2xl font-bold text-[#1A202C]">{outOfStockParts.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Parts Table */}
                <div className="rounded-[10px] bg-white p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="pb-4 text-left text-sm font-semibold text-[#90A3BF]">Part</th>
                                    <th className="pb-4 text-left text-sm font-semibold text-[#90A3BF]">SKU</th>
                                    <th className="pb-4 text-left text-sm font-semibold text-[#90A3BF]">Category</th>
                                    <th className="pb-4 text-left text-sm font-semibold text-[#90A3BF]">Brand</th>
                                    <th className="pb-4 text-center text-sm font-semibold text-[#90A3BF]">Stock</th>
                                    <th className="pb-4 text-right text-sm font-semibold text-[#90A3BF]">Price</th>
                                    <th className="pb-4 text-center text-sm font-semibold text-[#90A3BF]">Status</th>
                                    <th className="pb-4 text-center text-sm font-semibold text-[#90A3BF]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parts.map((part) => (
                                    <tr key={part.id} className="border-b border-gray-100">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                {part.image_url ? (
                                                    <img
                                                        src={part.image_url}
                                                        alt={part.name}
                                                        className="h-12 w-12 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200">
                                                        <Package className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-semibold text-[#1A202C]">{part.name}</p>
                                                    {part.is_featured && (
                                                        <span className="text-xs text-blue-600">Featured</span>
                                                    )}
                                                    {!part.is_active && (
                                                        <span className="text-xs text-red-500"> (Inactive)</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-[#90A3BF]">{part.sku}</td>
                                        <td className="py-4 text-[#90A3BF]">{part.category || 'N/A'}</td>
                                        <td className="py-4 text-[#90A3BF]">{part.brand || 'N/A'}</td>
                                        <td className="py-4 text-center">
                                            <span
                                                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                                                    part.stock_quantity === 0
                                                        ? 'bg-gray-100 text-gray-600'
                                                        : part.is_low_stock
                                                        ? 'bg-red-100 text-red-600'
                                                        : 'bg-green-100 text-green-600'
                                                }`}
                                            >
                                                {part.stock_quantity}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right font-semibold text-[#1A202C]">
                                            {formatPrice(part.price)}
                                        </td>
                                        <td className="py-4 text-center">
                                            {part.is_low_stock ? (
                                                <div className="flex items-center justify-center gap-1 text-red-600">
                                                    <AlertTriangle className="h-4 w-4" />
                                                    <span className="text-xs font-semibold">Low Stock</span>
                                                </div>
                                            ) : part.stock_quantity === 0 ? (
                                                <span className="text-xs font-semibold text-gray-600">Out of Stock</span>
                                            ) : (
                                                <div className="flex items-center justify-center gap-1 text-green-600">
                                                    <CheckCircle className="h-4 w-4" />
                                                    <span className="text-xs font-semibold">In Stock</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/admin/parts/${part.id}`}
                                                    className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                                                    title="View"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/parts/${part.id}/edit`}
                                                    className="rounded-lg bg-green-100 p-2 text-green-600 transition hover:bg-green-200"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(part)}
                                                    disabled={deletingId === part.id}
                                                    className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200 disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {parts.length === 0 && (
                            <div className="py-12 text-center">
                                <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <p className="text-[#90A3BF]">No parts found. Add your first part to get started.</p>
                                <Link
                                    href="/admin/parts/create"
                                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#3563E9] px-6 py-3 font-semibold text-white transition hover:bg-[#264ac6]"
                                >
                                    <Plus className="h-5 w-5" />
                                    Add New Part
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
