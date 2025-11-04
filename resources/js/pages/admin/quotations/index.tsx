import RoleDashboardLayout from '@/layouts/role-dashboard-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Eye, Pencil, Trash2 } from 'lucide-react';

interface Quotation {
    id: number;
    quotation_number: string;
    service_request_number: string;
    customer_name: string;
    service_type: string;
    total_amount: number;
    status: string;
    valid_until: string | null;
    created_at: string;
    created_by: string;
}

interface QuotationsIndexProps {
    quotations: Quotation[];
}

export default function QuotationsIndex({ quotations }: QuotationsIndexProps) {
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-MW', {
            style: 'currency',
            currency: 'MWK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { color: string; label: string }> = {
            draft: { color: 'bg-gray-100 text-gray-700', label: 'Draft' },
            sent: { color: 'bg-blue-100 text-blue-700', label: 'Sent' },
            accepted: { color: 'bg-green-100 text-green-700', label: 'Accepted' },
            rejected: { color: 'bg-red-100 text-red-700', label: 'Rejected' },
            expired: { color: 'bg-orange-100 text-orange-700', label: 'Expired' },
        };

        const config = statusConfig[status] || {
            color: 'bg-gray-100 text-gray-700',
            label: status,
        };

        return (
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const handleDelete = (id: number, quotationNumber: string) => {
        if (confirm(`Are you sure you want to delete quotation ${quotationNumber}?`)) {
            router.delete(`/admin/quotations/${id}`);
        }
    };

    return (
        <RoleDashboardLayout>
            <Head title="Quotations - ENTYRE" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1A202C]">Quotations</h1>
                        <p className="text-[#90A3BF]">Manage customer quotations for service requests</p>
                    </div>
                    <Button
                        onClick={() => router.visit('/admin/quotations/create')}
                        className="h-11 rounded-[4px] bg-[#3563E9] px-6 text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Quotation
                    </Button>
                </div>

                {quotations.length === 0 ? (
                    <div className="rounded-[10px] bg-white p-12 text-center">
                        <FileText className="mx-auto mb-4 h-16 w-16 text-[#90A3BF]" />
                        <h2 className="mb-2 text-xl font-bold text-[#1A202C]">No quotations yet</h2>
                        <p className="mb-6 text-[#90A3BF]">Create your first quotation to get started</p>
                        <Button
                            onClick={() => router.visit('/admin/quotations/create')}
                            className="h-11 rounded-[4px] bg-[#3563E9] px-6 text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                        >
                            Create Quotation
                        </Button>
                    </div>
                ) : (
                    <div className="rounded-[10px] bg-white p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="p-4 font-semibold text-[#1A202C]">Quotation #</th>
                                        <th className="p-4 font-semibold text-[#1A202C]">Service Request</th>
                                        <th className="p-4 font-semibold text-[#1A202C]">Customer</th>
                                        <th className="p-4 font-semibold text-[#1A202C]">Service Type</th>
                                        <th className="p-4 font-semibold text-[#1A202C]">Total Amount</th>
                                        <th className="p-4 font-semibold text-[#1A202C]">Status</th>
                                        <th className="p-4 font-semibold text-[#1A202C]">Valid Until</th>
                                        <th className="p-4 font-semibold text-[#1A202C]">Created</th>
                                        <th className="p-4 font-semibold text-[#1A202C]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quotations.map((quotation) => (
                                        <tr key={quotation.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-4 font-semibold text-[#3563E9]">
                                                {quotation.quotation_number}
                                            </td>
                                            <td className="p-4 text-[#1A202C]">
                                                {quotation.service_request_number}
                                            </td>
                                            <td className="p-4 text-[#1A202C]">{quotation.customer_name}</td>
                                            <td className="p-4 text-[#90A3BF]">{quotation.service_type}</td>
                                            <td className="p-4 font-semibold text-[#1A202C]">
                                                {formatPrice(quotation.total_amount)}
                                            </td>
                                            <td className="p-4">{getStatusBadge(quotation.status)}</td>
                                            <td className="p-4 text-[#90A3BF]">
                                                {quotation.valid_until || 'N/A'}
                                            </td>
                                            <td className="p-4 text-[#90A3BF]">{quotation.created_at}</td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            router.visit(`/admin/quotations/${quotation.id}`)
                                                        }
                                                        className="text-blue-600 hover:text-blue-700"
                                                        title="View"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            router.visit(`/admin/quotations/${quotation.id}/edit`)
                                                        }
                                                        className="text-green-600 hover:text-green-700"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(quotation.id, quotation.quotation_number)
                                                        }
                                                        className="text-red-600 hover:text-red-700"
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
                        </div>
                    </div>
                )}
            </div>
        </RoleDashboardLayout>
    );
}
