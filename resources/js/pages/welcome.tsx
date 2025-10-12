import Card from '@/components/Card';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    // Sample car data for demonstration
    const popularCars = [
        {
            title: 'Koenigsegg',
            type: 'Sport',
            image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=200&fit=crop',
            fuelCapacity: '90L',
            transmission: 'Manual',
            capacity: '2 People',
            price: 99.0,
        },
        {
            title: 'Nissan GT - R',
            type: 'Sport',
            image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=200&fit=crop',
            fuelCapacity: '80L',
            transmission: 'Manual',
            capacity: '2 People',
            price: 80.0,
            originalPrice: 100.0,
        },
        {
            title: 'Rolls - Royce',
            type: 'Sedan',
            image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=200&fit=crop',
            fuelCapacity: '70L',
            transmission: 'Manual',
            capacity: '4 People',
            price: 96.0,
            isFavorite: true,
        },
        {
            title: 'Nissan GT - R',
            type: 'Sport',
            image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=200&fit=crop',
            fuelCapacity: '80L',
            transmission: 'Manual',
            capacity: '2 People',
            price: 80.0,
            originalPrice: 100.0,
        },
    ];

    const recommendedCars = [
        {
            title: 'All New Rush',
            type: 'SUV',
            image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=200&fit=crop',
            fuelCapacity: '70L',
            transmission: 'Manual',
            capacity: '6 People',
            price: 72.0,
            originalPrice: 80.0,
        },
        {
            title: 'CR - V',
            type: 'SUV',
            image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=200&fit=crop',
            fuelCapacity: '80L',
            transmission: 'Manual',
            capacity: '6 People',
            price: 80.0,
            isFavorite: true,
        },
        {
            title: 'All New Terios',
            type: 'SUV',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=200&fit=crop',
            fuelCapacity: '90L',
            transmission: 'Manual',
            capacity: '6 People',
            price: 74.0,
        },
        {
            title: 'CR - V',
            type: 'SUV',
            image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=200&fit=crop',
            fuelCapacity: '80L',
            transmission: 'Manual',
            capacity: '6 People',
            price: 80.0,
            isFavorite: true,
        },
        {
            title: 'MG ZX Exclusice',
            type: 'Hatchback',
            image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=200&fit=crop',
            fuelCapacity: '70L',
            transmission: 'Manual',
            capacity: '4 People',
            price: 76.0,
            originalPrice: 80.0,
        },
        {
            title: 'New MG ZS',
            type: 'SUV',
            image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400&h=200&fit=crop',
            fuelCapacity: '80L',
            transmission: 'Manual',
            capacity: '6 People',
            price: 80.0,
        },
        {
            title: 'MG ZX Excite',
            type: 'Hatchback',
            image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=200&fit=crop',
            fuelCapacity: '90L',
            transmission: 'Manual',
            capacity: '4 People',
            price: 74.0,
            isFavorite: true,
        },
        {
            title: 'New MG ZS',
            type: 'SUV',
            image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400&h=200&fit=crop',
            fuelCapacity: '80L',
            transmission: 'Manual',
            capacity: '6 People',
            price: 80.0,
        },
    ];

    return (
        <>
            <Head title="ENTYRE - Tire & Automotive Services">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#F6F7F9]">
                {/* Navbar */}
                <Navbar />

                {/* Main Content */}
                <main className="mx-auto max-w-[1440px] px-6 py-8 lg:px-16 lg:py-8">
                    {/* Hero Banners */}
                    <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Banner 1 */}
                        <div className="relative overflow-hidden rounded-[10px] bg-gradient-to-br from-[#54A6FF] to-[#3563E9] p-6 md:p-8">
                            <div className="relative z-10 max-w-[284px]">
                                <h2 className="mb-4 text-[28px] leading-tight font-semibold text-white md:text-[32px]">
                                    Quality Tires & Expert Service
                                </h2>
                                <p className="mb-5 text-xs leading-6 text-white md:text-base">
                                    Premium tire solutions and automotive
                                    services across Malawi. Reliable,
                                    professional, affordable.
                                </p>
                                <Button className="h-11 rounded-[4px] bg-[#3563E9] px-5 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#264AC6]">
                                    Browse Products
                                </Button>
                            </div>
                            <div className="absolute right-0 bottom-0 w-[60%] md:w-[50%]">
                                <img
                                    src="/assets/images/image-7.png"
                                    alt="Car"
                                    className="h-auto w-full object-contain"
                                />
                            </div>
                        </div>

                        {/* Banner 2 */}
                        <div className="relative overflow-hidden rounded-[10px] bg-gradient-to-br from-[#5CAFFC] to-[#3563E9] p-6 md:p-8">
                            <div className="relative z-10 max-w-[284px]">
                                <h2 className="mb-4 text-[28px] leading-tight font-semibold text-white md:text-[32px]">
                                    Professional Breakdown Assistance
                                </h2>
                                <p className="mb-5 text-xs leading-6 text-white md:text-base">
                                    24/7 emergency tire services, wheel
                                    alignment, and vehicle maintenance support.
                                </p>
                                <Button className="h-11 rounded-[4px] bg-[#54A6FF] px-5 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#3B8ED9]">
                                    Request Service
                                </Button>
                            </div>
                            <div className="absolute right-0 bottom-0 w-[60%] md:w-[50%]">
                                <img
                                    src="/assets/images/image-7.png"
                                    alt="Car"
                                    className="h-auto w-full object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pick-Up & Drop-Off Section */}
                    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Pick-Up */}
                        <div className="rounded-[10px] bg-white p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3563E940]">
                                    <div className="h-2 w-2 rounded-full bg-[#3563E9]" />
                                </div>
                                <span className="text-base font-semibold text-[#1A202C]">
                                    Pick - Up
                                </span>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-2 block text-base font-bold text-[#1A202C]">
                                        Locations
                                        <select
                                            id="city"
                                            className="h-12 w-full rounded-md border-0 bg-transparent text-xs text-[#90A3BF] outline-none md:text-sm"
                                        >
                                            <option>Select your city</option>
                                        </select>
                                    </label>
                                </div>
                                <div>
                                    <label className="mb-2 block text-base font-bold text-[#1A202C]">
                                        Date
                                        <select
                                            id="date"
                                            className="h-12 w-full rounded-md border-0 bg-transparent text-xs text-[#90A3BF] outline-none md:text-sm"
                                        >
                                            <option>Select your date</option>
                                        </select>
                                    </label>
                                </div>
                                <div>
                                    <label className="mb-2 block text-base font-bold text-[#1A202C]">
                                        Time
                                        <select
                                            id="time"
                                            className="h-12 w-full rounded-md border-0 bg-transparent text-xs text-[#90A3BF] outline-none md:text-sm"
                                        >
                                            <option>Select your time</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Drop-Off */}
                        <div className="rounded-[10px] bg-white p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#54A6FF40]">
                                    <div className="h-2 w-2 rounded-full bg-[#54A6FF]" />
                                </div>
                                <span className="text-base font-semibold text-[#1A202C]">
                                    Drop - Off
                                </span>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-2 block text-base font-bold text-[#1A202C]">
                                        Locations
                                    </label>
                                    <select className="h-12 w-full rounded-md border-0 bg-transparent text-xs text-[#90A3BF] outline-none md:text-sm">
                                        <option>Select your city</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-base font-bold text-[#1A202C]">
                                        Date
                                    </label>
                                    <select className="h-12 w-full rounded-md border-0 bg-transparent text-xs text-[#90A3BF] outline-none md:text-sm">
                                        <option>Select your date</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-base font-bold text-[#1A202C]">
                                        Time
                                    </label>
                                    <select className="h-12 w-full rounded-md border-0 bg-transparent text-xs text-[#90A3BF] outline-none md:text-sm">
                                        <option>Select your time</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular Car Section */}
                    <div className="mb-8">
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-[#90A3BF] md:text-base">
                                Popular Car
                            </h3>
                            <button className="text-sm font-semibold text-[#3563E9] transition-colors hover:underline md:text-base">
                                View All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {popularCars.map((car, index) => (
                                <Card key={index} {...car} />
                            ))}
                        </div>
                    </div>

                    {/* Recommendation Car Section */}
                    <div className="mb-8">
                        <div className="mb-5">
                            <h3 className="text-sm font-semibold text-[#90A3BF] md:text-base">
                                Recommendation Car
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {recommendedCars.map((car, index) => (
                                <Card key={index} {...car} />
                            ))}
                        </div>
                    </div>

                    {/* Show More Button */}
                    <div className="mb-8 flex justify-center">
                        <Button className="h-11 rounded-[4px] bg-[#3563E9] px-5 text-base font-semibold text-white transition-colors hover:bg-[#264AC6]">
                            Show more car
                        </Button>
                    </div>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
