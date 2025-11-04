import RoleDashboardLayout from '@/layouts/role-dashboard-layout';
import { Head } from '@inertiajs/react';
import { DollarSign, Package, ShoppingCart, AlertTriangle } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    sku: string;
    quantity_sold: number;
    revenue: number;
    stock_remaining: number;
    price: number;
}

interface Inventory {
    total_value: number;
    total_items: number;
    low_stock_count: number;
}

interface IncomeIndexProps {
    totalIncome: number;
    totalProductsSold: number;
    productsSold: Product[];
    inventory: Inventory;
}

export default function IncomeIndex({ totalIncome, totalProductsSold, productsSold, inventory }: IncomeIndexProps) {
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-MW', {
            style: 'currency',
            currency: 'MWK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <RoleDashboardLayout>
            <Head title="Income & Analytics - ENTYRE" />

            <div className="space-y-6 p-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A202C]">Income & Analytics</h1>
                    <p className="text-[#90A3BF]">Track your sales performance and inventory</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Total Income */}
                    <div className="rounded-[10px] bg-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#90A3BF]">Total Income</p>
                                <p className="mt-2 text-3xl font-bold text-[#1A202C]">{formatPrice(totalIncome)}</p>
                            </div>
                            <div className="rounded-full bg-green-100 p-3">
                                <DollarSign className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    {/* Products Sold */}
                    <div className="rounded-[10px] bg-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#90A3BF]">Products Sold</p>
                                <p className="mt-2 text-3xl font-bold text-[#1A202C]">{totalProductsSold}</p>
                            </div>
                            <div className="rounded-full bg-blue-100 p-3">
                                <ShoppingCart className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Inventory Value */}
                    <div className="rounded-[10px] bg-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#90A3BF]">Inventory Value</p>
                                <p className="mt-2 text-3xl font-bold text-[#1A202C]">{formatPrice(inventory.total_value)}</p>
                                <p className="mt-1 text-xs text-[#90A3BF]">{inventory.total_items} items in stock</p>
                            </div>
                            <div className="rounded-full bg-purple-100 p-3">
                                <Package className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    {/* Low Stock Items */}
                    <div className="rounded-[10px] bg-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#90A3BF]">Low Stock Alert</p>
                                <p className="mt-2 text-3xl font-bold text-[#1A202C]">{inventory.low_stock_count}</p>
                                <p className="mt-1 text-xs text-[#90A3BF]">Items need restock</p>
                            </div>
                            <div className="rounded-full bg-orange-100 p-3">
                                <AlertTriangle className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="rounded-[10px] bg-white p-6">
                    <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Product Sales & Inventory</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="p-4 font-semibold text-[#1A202C]">Product</th>
                                    <th className="p-4 font-semibold text-[#1A202C]">SKU</th>
                                    <th className="p-4 font-semibold text-[#1A202C]">Quantity Sold</th>
                                    <th className="p-4 font-semibold text-[#1A202C]">Revenue</th>
                                    <th className="p-4 font-semibold text-[#1A202C]">Price</th>
                                    <th className="p-4 font-semibold text-[#1A202C]">Stock Remaining</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsSold.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="p-4 text-[#1A202C]">{product.name}</td>
                                        <td className="p-4 text-[#90A3BF]">{product.sku}</td>
                                        <td className="p-4 text-[#1A202C]">{product.quantity_sold}</td>
                                        <td className="p-4 font-semibold text-[#1A202C]">{formatPrice(product.revenue)}</td>
                                        <td className="p-4 text-[#90A3BF]">{formatPrice(product.price)}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                                                product.stock_remaining <= 10
                                                    ? 'bg-red-100 text-red-700'
                                                    : product.stock_remaining <= 20
                                                    ? 'bg-orange-100 text-orange-700'
                                                    : 'bg-green-100 text-green-700'
                                            }`}>
                                                {product.stock_remaining}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </RoleDashboardLayout>
    );
}
