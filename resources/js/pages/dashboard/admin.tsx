import AuthenticatedLayout from '@/layouts/authenticated-layout';
import RoleDashboardLayout from '@/layouts/role-dashboard-layout';
import { Head } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <RoleDashboardLayout>
                {/* Dashboard Content */}
                <div className="p-8">
                        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                            {/* Left Column - Details Rental */}
                            <div className="xl:col-span-2">
                                <div className="rounded-[10px] bg-white p-6">
                                    <h2 className="mb-6 text-xl font-bold text-[#1A202C]">
                                        Details Rental
                                    </h2>

                                    {/* Map Placeholder */}
                                    <div className="mb-8 h-[272px] rounded-[10px] bg-gradient-to-br from-[#A0A4FF] to-[#E6E9FF] p-6">
                                        <div className="flex h-full items-center justify-center">
                                            <svg
                                                width="92"
                                                height="92"
                                                viewBox="0 0 92 92"
                                                fill="none"
                                            >
                                                <circle
                                                    cx="46"
                                                    cy="46"
                                                    r="46"
                                                    fill="white"
                                                    fillOpacity="0.2"
                                                />
                                                <path
                                                    d="M46 23C35.507 23 27 31.507 27 42C27 54.75 46 69 46 69C46 69 65 54.75 65 42C65 31.507 56.493 23 46 23ZM46 47.5C43.243 47.5 41 45.257 41 42.5C41 39.743 43.243 37.5 46 37.5C48.757 37.5 51 39.743 51 42.5C51 45.257 48.757 47.5 46 47.5Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Car Details */}
                                    <div className="flex items-start gap-6">
                                        <div className="h-[108px] w-[132px] overflow-hidden rounded-[10px] bg-[#3563E9] p-4">
                                            <div className="flex h-full items-center justify-center">
                                                <svg
                                                    width="80"
                                                    height="36"
                                                    viewBox="0 0 80 36"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M20 28C22.2091 28 24 26.2091 24 24C24 21.7909 22.2091 20 20 20C17.7909 20 16 21.7909 16 24C16 26.2091 17.7909 28 20 28Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M60 28C62.2091 28 64 26.2091 64 24C64 21.7909 62.2091 20 60 20C57.7909 20 56 21.7909 56 24C56 26.2091 57.7909 28 60 28Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M76 12H68L62 4H32L26 12H4C1.8 12 0 13.8 0 16V28H4C4 30.8 6.2 33 9 33C11.8 33 14 30.8 14 28H46C46 30.8 48.2 33 51 33C53.8 33 56 30.8 56 28H80V20C80 15.6 78.4 12 76 12Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-[#1A202C]">
                                                        Nissan GT - R
                                                    </h3>
                                                    <p className="text-sm text-[#90A3BF]">
                                                        Sport Car
                                                    </p>
                                                </div>
                                                <span className="text-sm text-[#90A3BF]">
                                                    #9761
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pick Up & Drop Off */}
                                    <div className="mt-8 space-y-6">
                                        {/* Pick Up */}
                                        <div>
                                            <div className="mb-4 flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-[#3563E9]" />
                                                <span className="text-base font-semibold text-[#1A202C]">
                                                    Pick - Up
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-6">
                                                <div>
                                                    <label className="mb-2 block text-base font-bold text-[#1A202C]">
                                                        Locations
                                                    </label>
                                                    <select className="w-full rounded-[10px] border border-[#C3D4E966] bg-[#F6F7F9] px-4 py-3 text-xs text-[#90A3BF]">
                                                        <option>
                                                            Kota Semarang
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-base font-bold text-[#1A202C]">
                                                        Date
                                                    </label>
                                                    <select className="w-full rounded-[10px] border border-[#C3D4E966] bg-[#F6F7F9] px-4 py-3 text-xs text-[#90A3BF]">
                                                        <option>
                                                            20 July 2022
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-base font-bold text-[#1A202C]">
                                                        Time
                                                    </label>
                                                    <select className="w-full rounded-[10px] border border-[#C3D4E966] bg-[#F6F7F9] px-4 py-3 text-xs text-[#90A3BF]">
                                                        <option>07.00</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Drop Off */}
                                        <div>
                                            <div className="mb-4 flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-[#5CAFFC]" />
                                                <span className="text-base font-semibold text-[#1A202C]">
                                                    Drop - Off
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-6">
                                                <div>
                                                    <label className="mb-2 block text-base font-bold text-[#1A202C]">
                                                        Locations
                                                    </label>
                                                    <select className="w-full rounded-[10px] border border-[#C3D4E966] bg-[#F6F7F9] px-4 py-3 text-xs text-[#90A3BF]">
                                                        <option>
                                                            Kota Semarang
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-base font-bold text-[#1A202C]">
                                                        Date
                                                    </label>
                                                    <select className="w-full rounded-[10px] border border-[#C3D4E966] bg-[#F6F7F9] px-4 py-3 text-xs text-[#90A3BF]">
                                                        <option>
                                                            21 July 2022
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-base font-bold text-[#1A202C]">
                                                        Time
                                                    </label>
                                                    <select className="w-full rounded-[10px] border border-[#C3D4E966] bg-[#F6F7F9] px-4 py-3 text-xs text-[#90A3BF]">
                                                        <option>01.00</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total Price */}
                                    <div className="mt-8 border-t border-[#C3D4E966] pt-8">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-[#1A202C]">
                                                    Total Rental Price
                                                </h3>
                                                <p className="text-sm text-[#90A3BF]">
                                                    Overall price and includes
                                                    rental discount
                                                </p>
                                            </div>
                                            <div className="text-[32px] font-bold text-[#1A202C]">
                                                $80.00
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-8">
                                {/* Top 5 Car Rental */}
                                <div className="rounded-[10px] bg-white p-6">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-[#1A202C]">
                                            Top 5 Car Rental
                                        </h2>
                                        <button>
                                            <MoreHorizontal className="h-6 w-6 text-[#90A3BF]" />
                                        </button>
                                    </div>

                                    {/* Donut Chart */}
                                    <div className="mb-6 flex items-center justify-center">
                                        <div className="relative h-[220px] w-[220px]">
                                            <svg
                                                className="h-full w-full -rotate-90"
                                                viewBox="0 0 100 100"
                                            >
                                                {/* Sport Car - 17,439 */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#0D3559"
                                                    strokeWidth="20"
                                                    strokeDasharray="72.3 251.2"
                                                    strokeDashoffset="0"
                                                />
                                                {/* SUV - 9,478 */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#175D9C"
                                                    strokeWidth="20"
                                                    strokeDasharray="39.5 251.2"
                                                    strokeDashoffset="-72.3"
                                                />
                                                {/* Coupe - 18,197 */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#2185DE"
                                                    strokeWidth="20"
                                                    strokeDasharray="75.8 251.2"
                                                    strokeDashoffset="-111.8"
                                                />
                                                {/* Hatchback - 12,510 */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#63A9E8"
                                                    strokeWidth="20"
                                                    strokeDasharray="52.1 251.2"
                                                    strokeDashoffset="-187.6"
                                                />
                                                {/* MPV - 14,406 */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#A6CEF2"
                                                    strokeWidth="20"
                                                    strokeDasharray="60 251.2"
                                                    strokeDashoffset="-239.7"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <div className="text-[32px] font-bold text-[#1A202C]">
                                                    72,030
                                                </div>
                                                <div className="text-sm text-[#90A3BF]">
                                                    Rental Car
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Legend */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-3 w-3 rounded-full bg-[#0D3559]" />
                                                <span className="text-sm font-semibold text-[#90A3BF]">
                                                    Sport Car
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-[#1A202C]">
                                                17,439
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-3 w-3 rounded-full bg-[#175D9C]" />
                                                <span className="text-sm font-semibold text-[#90A3BF]">
                                                    SUV
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-[#1A202C]">
                                                9,478
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-3 w-3 rounded-full bg-[#2185DE]" />
                                                <span className="text-sm font-semibold text-[#90A3BF]">
                                                    Coupe
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-[#1A202C]">
                                                18,197
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-3 w-3 rounded-full bg-[#63A9E8]" />
                                                <span className="text-sm font-semibold text-[#90A3BF]">
                                                    Hatchback
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-[#1A202C]">
                                                12,510
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-3 w-3 rounded-full bg-[#A6CEF2]" />
                                                <span className="text-sm font-semibold text-[#90A3BF]">
                                                    MPV
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-[#1A202C]">
                                                14,406
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Transaction */}
                                <div className="rounded-[10px] bg-white p-6">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-[#1A202C]">
                                            Recent Transaction
                                        </h2>
                                        <button className="text-xs font-semibold text-[#3563E9]">
                                            View All
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Transaction 1 */}
                                        <div className="flex items-center gap-3">
                                            <div className="h-[70px] w-[114px] overflow-hidden rounded-[8px] bg-[#3563E9] p-2">
                                                <div className="flex h-full items-center justify-center">
                                                    <svg
                                                        width="60"
                                                        height="27"
                                                        viewBox="0 0 80 36"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M20 28C22.2091 28 24 26.2091 24 24C24 21.7909 22.2091 20 20 20C17.7909 20 16 21.7909 16 24C16 26.2091 17.7909 28 20 28Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M60 28C62.2091 28 64 26.2091 64 24C64 21.7909 62.2091 20 60 20C57.7909 20 56 21.7909 56 24C56 26.2091 57.7909 28 60 28Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M76 12H68L62 4H32L26 12H4C1.8 12 0 13.8 0 16V28H4C4 30.8 6.2 33 9 33C11.8 33 14 30.8 14 28H46C46 30.8 48.2 33 51 33C53.8 33 56 30.8 56 28H80V20C80 15.6 78.4 12 76 12Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-base font-bold text-[#1A202C]">
                                                    Nissan GT - R
                                                </h4>
                                                <p className="text-xs text-[#90A3BF]">
                                                    Sport Car
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-[#90A3BF]">
                                                    20 July
                                                </p>
                                                <p className="text-base font-bold text-[#1A202C]">
                                                    $80.00
                                                </p>
                                            </div>
                                        </div>

                                        {/* Transaction 2 */}
                                        <div className="flex items-center gap-3">
                                            <div className="h-[70px] w-[114px] overflow-hidden rounded-[8px] bg-white p-2 ring-1 ring-[#C3D4E966]">
                                                <div className="flex h-full items-center justify-center">
                                                    <svg
                                                        width="60"
                                                        height="27"
                                                        viewBox="0 0 80 36"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M20 28C22.2091 28 24 26.2091 24 24C24 21.7909 22.2091 20 20 20C17.7909 20 16 21.7909 16 24C16 26.2091 17.7909 28 20 28Z"
                                                            fill="#90A3BF"
                                                        />
                                                        <path
                                                            d="M60 28C62.2091 28 64 26.2091 64 24C64 21.7909 62.2091 20 60 20C57.7909 20 56 21.7909 56 24C56 26.2091 57.7909 28 60 28Z"
                                                            fill="#90A3BF"
                                                        />
                                                        <path
                                                            d="M76 12H68L62 4H32L26 12H4C1.8 12 0 13.8 0 16V28H4C4 30.8 6.2 33 9 33C11.8 33 14 30.8 14 28H46C46 30.8 48.2 33 51 33C53.8 33 56 30.8 56 28H80V20C80 15.6 78.4 12 76 12Z"
                                                            fill="#90A3BF"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-base font-bold text-[#1A202C]">
                                                    Koegnigsegg
                                                </h4>
                                                <p className="text-xs text-[#90A3BF]">
                                                    Sport Car
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-[#90A3BF]">
                                                    19 July
                                                </p>
                                                <p className="text-base font-bold text-[#1A202C]">
                                                    $99.00
                                                </p>
                                            </div>
                                        </div>

                                        {/* Transaction 3 */}
                                        <div className="flex items-center gap-3">
                                            <div className="h-[70px] w-[114px] overflow-hidden rounded-[8px] bg-[#0D3559] p-2">
                                                <div className="flex h-full items-center justify-center">
                                                    <svg
                                                        width="60"
                                                        height="27"
                                                        viewBox="0 0 80 36"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M20 28C22.2091 28 24 26.2091 24 24C24 21.7909 22.2091 20 20 20C17.7909 20 16 21.7909 16 24C16 26.2091 17.7909 28 20 28Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M60 28C62.2091 28 64 26.2091 64 24C64 21.7909 62.2091 20 60 20C57.7909 20 56 21.7909 56 24C56 26.2091 57.7909 28 60 28Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M76 12H68L62 4H32L26 12H4C1.8 12 0 13.8 0 16V28H4C4 30.8 6.2 33 9 33C11.8 33 14 30.8 14 28H46C46 30.8 48.2 33 51 33C53.8 33 56 30.8 56 28H80V20C80 15.6 78.4 12 76 12Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-base font-bold text-[#1A202C]">
                                                    Rolls - Royce
                                                </h4>
                                                <p className="text-xs text-[#90A3BF]">
                                                    Sport Car
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-[#90A3BF]">
                                                    18 July
                                                </p>
                                                <p className="text-base font-bold text-[#1A202C]">
                                                    $96.00
                                                </p>
                                            </div>
                                        </div>

                                        {/* Transaction 4 */}
                                        <div className="flex items-center gap-3">
                                            <div className="h-[70px] w-[114px] overflow-hidden rounded-[8px] bg-white p-2 ring-1 ring-[#C3D4E966]">
                                                <div className="flex h-full items-center justify-center">
                                                    <svg
                                                        width="60"
                                                        height="27"
                                                        viewBox="0 0 80 36"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M20 28C22.2091 28 24 26.2091 24 24C24 21.7909 22.2091 20 20 20C17.7909 20 16 21.7909 16 24C16 26.2091 17.7909 28 20 28Z"
                                                            fill="#90A3BF"
                                                        />
                                                        <path
                                                            d="M60 28C62.2091 28 64 26.2091 64 24C64 21.7909 62.2091 20 60 20C57.7909 20 56 21.7909 56 24C56 26.2091 57.7909 28 60 28Z"
                                                            fill="#90A3BF"
                                                        />
                                                        <path
                                                            d="M76 12H68L62 4H32L26 12H4C1.8 12 0 13.8 0 16V28H4C4 30.8 6.2 33 9 33C11.8 33 14 30.8 14 28H46C46 30.8 48.2 33 51 33C53.8 33 56 30.8 56 28H80V20C80 15.6 78.4 12 76 12Z"
                                                            fill="#90A3BF"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-base font-bold text-[#1A202C]">
                                                    CR - V
                                                </h4>
                                                <p className="text-xs text-[#90A3BF]">
                                                    SUV
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-[#90A3BF]">
                                                    17 July
                                                </p>
                                                <p className="text-base font-bold text-[#1A202C]">
                                                    $80.00
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </RoleDashboardLayout>
        </AuthenticatedLayout>
    );
}
