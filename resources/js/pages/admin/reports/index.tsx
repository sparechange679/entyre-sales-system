import AuthenticatedLayout from '@/layouts/authenticated-layout';
import RoleDashboardLayout from '@/layouts/role-dashboard-layout';
import { Head, useForm } from '@inertiajs/react';

export default function ReportsIndex({ filters, revenue, services }) {
    const { data, setData, get } = useForm({
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
    });

    function submit(e) {
        e.preventDefault();
        get(route('admin.reports.index'), {
            preserveState: true,
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Reports" />

            <RoleDashboardLayout>
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-[#1A202C]">Reports</h1>

                    <form onSubmit={submit} className="mt-4">
                        <div className="flex items-center space-x-4">
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    id="start_date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    id="end_date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Filter
                                </button>
                            </div>
                            <div>
                                <a href={route('admin.reports.download', { start_date: data.start_date, end_date: data.end_date })} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Download PDF
                                </a>
                            </div>
                        </div>
                    </form>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium text-gray-900">Total Revenue</h2>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{revenue.total}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium text-gray-900">Parts Revenue</h2>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{revenue.parts}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium text-gray-900">Services Revenue</h2>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{revenue.services}</p>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium text-gray-900">Total Services</h2>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{services.total}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium text-gray-900">Popular Services</h2>
                            <ul>
                                {services.popular.map((service) => (
                                    <li key={service.name}>{service.name} ({service.count})</li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium text-gray-900">Busiest Mechanics</h2>
                            <ul>
                                {services.busiest_mechanics.map((mechanic) => (
                                    <li key={mechanic.name}>{mechanic.name} ({mechanic.count})</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </RoleDashboardLayout>
        </AuthenticatedLayout>
    );
}
