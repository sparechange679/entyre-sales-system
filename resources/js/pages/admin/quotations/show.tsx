import RoleDashboardLayout from '@/layouts/role-dashboard-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil, FileText, Calendar, Clock, User, Wrench, Send } from 'lucide-react';

interface Quotation {
    id: number;
    quotation_number: string;
    service_request: {
        request_number: string;
        service_type: string;
    };
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    service_description: string;
    labor_cost: number;
    parts_cost: number;
    total_amount: number;
    valid_from: string | null;
    valid_until: string | null;
    estimated_duration_hours: number | null;
    status: string;
    terms_and_conditions: string | null;
    notes: string | null;
    created_by: string;
    created_at: string;
}

interface QuotationShowProps {
    quotation: Quotation;
}

export default function QuotationShow({ quotation }: QuotationShowProps) {
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-MW', {
            style: 'currency',
            currency: 'MWK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleSendToCustomer = () => {
        if (confirm('Are you sure you want to send this quotation to the customer?')) {
            router.post(`/admin/quotations/${quotation.id}/send`, {}, {
                preserveScroll: true,
            });
        }
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

    return (
        <RoleDashboardLayout>
            <Head title={`${quotation.quotation_number} - ENTYRE`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => router.visit('/admin/quotations')}
                            variant="outline"
                            className="h-10 w-10 rounded-full p-0"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-[#1A202C]">{quotation.quotation_number}</h1>
                            <p className="text-[#90A3BF]">Created on {quotation.created_at}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {getStatusBadge(quotation.status)}
                        {quotation.status === 'draft' && (
                            <Button
                                onClick={handleSendToCustomer}
                                className="h-11 rounded-[4px] bg-green-600 px-6 text-base font-semibold text-white transition-colors hover:bg-green-700"
                            >
                                <Send className="mr-2 h-4 w-4" />
                                Send to Customer
                            </Button>
                        )}
                        <Button
                            onClick={() => router.visit(`/admin/quotations/${quotation.id}/edit`)}
                            className="h-11 rounded-[4px] bg-[#3563E9] px-6 text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Service Request Info */}
                        <div className="rounded-[10px] bg-white p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <Wrench className="h-5 w-5 text-[#3563E9]" />
                                <h2 className="text-xl font-bold text-[#1A202C]">Service Request</h2>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#90A3BF]">Request Number</span>
                                    <span className="font-semibold text-[#1A202C]">
                                        {quotation.service_request.request_number}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#90A3BF]">Service Type</span>
                                    <span className="font-semibold text-[#1A202C]">
                                        {quotation.service_request.service_type}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Service Description */}
                        <div className="rounded-[10px] bg-white p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-[#3563E9]" />
                                <h2 className="text-xl font-bold text-[#1A202C]">Service Description</h2>
                            </div>
                            <p className="text-[#1A202C]">{quotation.service_description}</p>
                        </div>

                        {/* Pricing Breakdown */}
                        <div className="rounded-[10px] bg-white p-6">
                            <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Pricing Breakdown</h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                    <span className="text-[#90A3BF]">Labor Cost</span>
                                    <span className="font-semibold text-[#1A202C]">
                                        {formatPrice(quotation.labor_cost)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                    <span className="text-[#90A3BF]">Parts Cost</span>
                                    <span className="font-semibold text-[#1A202C]">
                                        {formatPrice(quotation.parts_cost)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-lg font-bold text-[#1A202C]">Total Amount</span>
                                    <span className="text-2xl font-bold text-[#3563E9]">
                                        {formatPrice(quotation.total_amount)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        {quotation.terms_and_conditions && (
                            <div className="rounded-[10px] bg-white p-6">
                                <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Terms and Conditions</h2>
                                <p className="text-[#1A202C] whitespace-pre-wrap">{quotation.terms_and_conditions}</p>
                            </div>
                        )}

                        {/* Internal Notes */}
                        {quotation.notes && (
                            <div className="rounded-[10px] bg-white p-6">
                                <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Internal Notes</h2>
                                <p className="text-[#90A3BF] whitespace-pre-wrap">{quotation.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* Customer Info */}
                        <div className="rounded-[10px] bg-white p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-[#3563E9]" />
                                <h2 className="text-xl font-bold text-[#1A202C]">Customer</h2>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm font-semibold text-[#1A202C]">
                                        {quotation.customer.name}
                                    </p>
                                    <p className="text-sm text-[#90A3BF]">{quotation.customer.email}</p>
                                    <p className="text-sm text-[#90A3BF]">{quotation.customer.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Validity Period */}
                        <div className="rounded-[10px] bg-white p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-[#3563E9]" />
                                <h2 className="text-xl font-bold text-[#1A202C]">Validity Period</h2>
                            </div>
                            <div className="space-y-2">
                                {quotation.valid_from && (
                                    <div>
                                        <span className="text-sm text-[#90A3BF]">Valid From: </span>
                                        <span className="text-sm font-semibold text-[#1A202C]">
                                            {quotation.valid_from}
                                        </span>
                                    </div>
                                )}
                                {quotation.valid_until && (
                                    <div>
                                        <span className="text-sm text-[#90A3BF]">Valid Until: </span>
                                        <span className="text-sm font-semibold text-[#1A202C]">
                                            {quotation.valid_until}
                                        </span>
                                    </div>
                                )}
                                {!quotation.valid_from && !quotation.valid_until && (
                                    <p className="text-sm text-[#90A3BF]">No validity period specified</p>
                                )}
                            </div>
                        </div>

                        {/* Estimated Duration */}
                        {quotation.estimated_duration_hours && (
                            <div className="rounded-[10px] bg-white p-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-[#3563E9]" />
                                    <h2 className="text-xl font-bold text-[#1A202C]">Estimated Duration</h2>
                                </div>
                                <p className="text-2xl font-bold text-[#1A202C]">
                                    {quotation.estimated_duration_hours} hours
                                </p>
                            </div>
                        )}

                        {/* Meta Information */}
                        <div className="rounded-[10px] bg-white p-6">
                            <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Information</h2>
                            <div className="space-y-2">
                                <div>
                                    <span className="text-sm text-[#90A3BF]">Created By: </span>
                                    <span className="text-sm font-semibold text-[#1A202C]">
                                        {quotation.created_by}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#90A3BF]">Created At: </span>
                                    <span className="text-sm font-semibold text-[#1A202C]">
                                        {quotation.created_at}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RoleDashboardLayout>
    );
}
