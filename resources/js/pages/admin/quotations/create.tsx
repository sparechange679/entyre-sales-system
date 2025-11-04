import RoleDashboardLayout from '@/layouts/role-dashboard-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Form } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface ServiceRequest {
    id: number;
    request_number: string;
    customer_name: string;
    service_type: string;
    status: string;
}

interface QuotationCreateProps {
    serviceRequests: ServiceRequest[];
}

export default function QuotationCreate({ serviceRequests }: QuotationCreateProps) {
    return (
        <RoleDashboardLayout>
            <Head title="Create Quotation - ENTYRE" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button
                        onClick={() => router.visit('/admin/quotations')}
                        variant="outline"
                        className="h-10 w-10 rounded-full p-0"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-[#1A202C]">Create Quotation</h1>
                        <p className="text-[#90A3BF]">Create a new quotation for a service request</p>
                    </div>
                </div>

                <Form action="/admin/quotations" method="post">
                    {({ errors, processing }) => (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="space-y-6 lg:col-span-2">
                                {/* Service Request Selection */}
                                <div className="rounded-[10px] bg-white p-6">
                                    <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Service Request</h2>
                                    <div>
                                        <Label htmlFor="service_request_id">Select Service Request *</Label>
                                        <Select name="service_request_id" required>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Choose a service request" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {serviceRequests.map((request) => (
                                                    <SelectItem key={request.id} value={request.id.toString()}>
                                                        {request.request_number} - {request.customer_name} ({request.service_type})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.service_request_id && (
                                            <p className="mt-1 text-sm text-red-600">{errors.service_request_id}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Quotation Details */}
                                <div className="rounded-[10px] bg-white p-6">
                                    <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Quotation Details</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="service_description">Service Description *</Label>
                                            <textarea
                                                id="service_description"
                                                name="service_description"
                                                rows={4}
                                                required
                                                className="mt-1 w-full rounded-lg border-2 border-gray-200 p-3 text-[#1A202C] focus:border-[#3563E9] focus:outline-none"
                                                placeholder="Describe the services to be provided..."
                                            />
                                            {errors.service_description && (
                                                <p className="mt-1 text-sm text-red-600">{errors.service_description}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <Label htmlFor="labor_cost">Labor Cost (MWK) *</Label>
                                                <Input
                                                    id="labor_cost"
                                                    name="labor_cost"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    required
                                                    placeholder="0.00"
                                                    className="mt-1"
                                                />
                                                {errors.labor_cost && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.labor_cost}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="parts_cost">Parts Cost (MWK) *</Label>
                                                <Input
                                                    id="parts_cost"
                                                    name="parts_cost"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    required
                                                    placeholder="0.00"
                                                    className="mt-1"
                                                />
                                                {errors.parts_cost && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.parts_cost}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Validity Period */}
                                <div className="rounded-[10px] bg-white p-6">
                                    <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Validity Period</h2>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <Label htmlFor="valid_from">Valid From</Label>
                                                <Input
                                                    id="valid_from"
                                                    name="valid_from"
                                                    type="date"
                                                    className="mt-1"
                                                />
                                                {errors.valid_from && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.valid_from}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="valid_until">Valid Until</Label>
                                                <Input
                                                    id="valid_until"
                                                    name="valid_until"
                                                    type="date"
                                                    className="mt-1"
                                                />
                                                {errors.valid_until && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.valid_until}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="estimated_duration_hours">Estimated Duration (Hours)</Label>
                                            <Input
                                                id="estimated_duration_hours"
                                                name="estimated_duration_hours"
                                                type="number"
                                                min="1"
                                                placeholder="e.g., 24"
                                                className="mt-1"
                                            />
                                            {errors.estimated_duration_hours && (
                                                <p className="mt-1 text-sm text-red-600">{errors.estimated_duration_hours}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div className="rounded-[10px] bg-white p-6">
                                    <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Additional Information</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="terms_and_conditions">Terms and Conditions</Label>
                                            <textarea
                                                id="terms_and_conditions"
                                                name="terms_and_conditions"
                                                rows={3}
                                                className="mt-1 w-full rounded-lg border-2 border-gray-200 p-3 text-[#1A202C] focus:border-[#3563E9] focus:outline-none"
                                                placeholder="Enter terms and conditions..."
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="notes">Internal Notes</Label>
                                            <textarea
                                                id="notes"
                                                name="notes"
                                                rows={3}
                                                className="mt-1 w-full rounded-lg border-2 border-gray-200 p-3 text-[#1A202C] focus:border-[#3563E9] focus:outline-none"
                                                placeholder="Internal notes (not visible to customer)..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Button
                                        type="button"
                                        onClick={() => router.visit('/admin/quotations')}
                                        variant="outline"
                                        className="h-11 rounded-[4px] px-6 text-base font-semibold"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="h-11 rounded-[4px] bg-[#3563E9] px-6 text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                                    >
                                        {processing ? 'Creating...' : 'Create Quotation'}
                                    </Button>
                                </div>
                            </div>

                            {/* Summary Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-8 rounded-[10px] bg-white p-6">
                                    <h2 className="mb-4 text-xl font-bold text-[#1A202C]">Summary</h2>
                                    <p className="text-sm text-[#90A3BF]">
                                        Fill in the quotation details to create a new quotation for the customer.
                                        The total amount will be calculated automatically based on labor and parts costs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </RoleDashboardLayout>
    );
}
