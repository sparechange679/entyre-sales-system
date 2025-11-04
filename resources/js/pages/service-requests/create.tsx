import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
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
import { Form, Head } from '@inertiajs/react';
import {
    MapPin,
    Wrench,
    User,
    Car,
    Package,
    LoaderCircle,
    Star,
    Plus,
    Minus,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface ServiceType {
    id: number;
    name: string;
    description: string;
    base_price: number;
    requires_parts: boolean;
    estimated_duration: number;
}

interface Part {
    id: number;
    name: string;
    description: string;
    brand: string;
    price: number;
    stock_quantity: number;
    image: string;
    category: string;
}

interface Mechanic {
    id: number;
    name: string;
    email: string;
    branch?: string;
    rating?: number;
}

interface ServiceRequestCreateProps {
    serviceTypes: ServiceType[];
    userVehicle: {
        make_id: number | null;
        model_id: number | null;
        year: number | null;
        license_plate: string | null;
    };
}

export default function ServiceRequestCreate({
    serviceTypes,
    userVehicle,
}: ServiceRequestCreateProps) {
    const [selectedServiceType, setSelectedServiceType] =
        useState<ServiceType | null>(null);
    const [recommendedParts, setRecommendedParts] = useState<Part[]>([]);
    const [selectedParts, setSelectedParts] = useState<
        Map<number, { part: Part; quantity: number }>
    >(new Map());
    const [mechanics, setMechanics] = useState<Mechanic[]>([]);
    const [loadingParts, setLoadingParts] = useState(false);
    const [loadingMechanics, setLoadingMechanics] = useState(false);
    const [usingCurrentLocation, setUsingCurrentLocation] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-MW', {
            style: 'currency',
            currency: 'MWK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Fetch mechanics when component mounts
    useEffect(() => {
        fetchMechanics();
    }, []);

    const fetchMechanics = async () => {
        setLoadingMechanics(true);
        try {
            const response = await axios.get(
                '/api/service-requests/available-mechanics'
            );
            setMechanics(response.data.mechanics);
        } catch (error) {
            console.error('Error fetching mechanics:', error);
        } finally {
            setLoadingMechanics(false);
        }
    };

    const handleServiceTypeChange = async (serviceTypeId: string) => {
        const serviceType = serviceTypes.find(
            (st) => st.id === parseInt(serviceTypeId)
        );
        setSelectedServiceType(serviceType || null);
        setSelectedParts(new Map());

        if (serviceType?.requires_parts) {
            setLoadingParts(true);
            try {
                const response = await axios.post(
                    '/api/service-requests/recommended-parts',
                    {
                        service_type_id: serviceType.id,
                        vehicle_model_id: userVehicle.model_id,
                    }
                );
                setRecommendedParts(response.data.parts);
            } catch (error) {
                console.error('Error fetching parts:', error);
            } finally {
                setLoadingParts(false);
            }
        } else {
            setRecommendedParts([]);
        }
    };

    const handlePartQuantityChange = (part: Part, delta: number) => {
        const newSelectedParts = new Map(selectedParts);
        const current = newSelectedParts.get(part.id);

        if (current) {
            const newQuantity = current.quantity + delta;
            if (newQuantity <= 0) {
                newSelectedParts.delete(part.id);
            } else if (newQuantity <= part.stock_quantity) {
                newSelectedParts.set(part.id, { part, quantity: newQuantity });
            }
        } else if (delta > 0) {
            newSelectedParts.set(part.id, { part, quantity: 1 });
        }

        setSelectedParts(newSelectedParts);
    };

    const calculateTotal = () => {
        let total = selectedServiceType?.base_price || 0;
        selectedParts.forEach(({ part, quantity }) => {
            total += part.price * quantity;
        });
        return total;
    };

    const getCurrentLocation = () => {
        setUsingCurrentLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latInput = document.querySelector(
                        '[name="customer_latitude"]'
                    ) as HTMLInputElement;
                    const lonInput = document.querySelector(
                        '[name="customer_longitude"]'
                    ) as HTMLInputElement;

                    if (latInput && lonInput) {
                        latInput.value = position.coords.latitude.toString();
                        lonInput.value = position.coords.longitude.toString();
                    }
                    setUsingCurrentLocation(false);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Could not get your current location. Please enter it manually.');
                    setUsingCurrentLocation(false);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
            setUsingCurrentLocation(false);
        }
    };

    return (
        <>
            <Head title="Request Service - ENTYRE">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#F6F7F9]">
                <Navbar />

                <main className="mx-auto max-w-[1440px] px-6 py-8 lg:px-16 lg:py-8">
                    <h1 className="mb-8 text-3xl font-bold text-[#1A202C]">
                        Request a Service
                    </h1>

                    <Form
                        action="/service-requests"
                        method="post"
                        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
                    >
                        {({ processing, errors }) => (
                            <>
                                {/* Form Section */}
                                <div className="space-y-6 lg:col-span-2" hidden={currentStep !== 1}>
                                    {/* Service Type Selection */}
                                    <div className="rounded-[10px] bg-white p-6">
                                        <div className="mb-4 flex items-center gap-2">
                                            <Wrench className="h-5 w-5 text-[#3563E9]" />
                                            <h2 className="text-xl font-bold text-[#1A202C]">
                                                Select Service
                                            </h2>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="service_type_id">
                                                    Service Type *
                                                </Label>
                                                <Select
                                                    name="service_type_id"
                                                    onValueChange={
                                                        handleServiceTypeChange
                                                    }
                                                    required
                                                >
                                                    <SelectTrigger className="mt-1">
                                                        <SelectValue placeholder="Choose a service" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {serviceTypes.map(
                                                            (serviceType) => (
                                                                <SelectItem
                                                                    key={
                                                                        serviceType.id
                                                                    }
                                                                    value={serviceType.id.toString()}
                                                                >
                                                                    {
                                                                        serviceType.name
                                                                    }{' '}
                                                                    -{' '}
                                                                    {formatPrice(
                                                                        serviceType.base_price
                                                                    )}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                {errors.service_type_id && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors.service_type_id}
                                                    </p>
                                                )}
                                            </div>

                                            {selectedServiceType && (
                                                <div className="rounded-lg bg-blue-50 p-4">
                                                    <p className="text-sm text-[#1A202C]">
                                                        {
                                                            selectedServiceType.description
                                                        }
                                                    </p>
                                                    <p className="mt-2 text-sm text-[#90A3BF]">
                                                        Estimated duration:{' '}
                                                        {
                                                            selectedServiceType.estimated_duration
                                                        }{' '}
                                                        minutes
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Vehicle Information */}
                                    <div className="rounded-[10px] bg-white p-6">
                                        <div className="mb-4 flex items-center gap-2">
                                            <Car className="h-5 w-5 text-[#3563E9]" />
                                            <h2 className="text-xl font-bold text-[#1A202C]">
                                                Vehicle Information
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <Label htmlFor="vehicle_year">
                                                    Year
                                                </Label>
                                                <Input
                                                    id="vehicle_year"
                                                    name="vehicle_year"
                                                    type="number"
                                                    defaultValue={
                                                        userVehicle.year || ''
                                                    }
                                                    placeholder="2020"
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="vehicle_license_plate">
                                                    License Plate
                                                </Label>
                                                <Input
                                                    id="vehicle_license_plate"
                                                    name="vehicle_license_plate"
                                                    defaultValue={
                                                        userVehicle.license_plate ||
                                                        ''
                                                    }
                                                    placeholder="ABC 1234"
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button type="button" onClick={handleNextStep} className="h-11 rounded-[4px] bg-[#3563E9] px-6 text-base font-semibold text-white transition-colors hover:bg-[#264AC6]">
                                            Next
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-6 lg:col-span-2" hidden={currentStep !== 2}>
                                    {/* Problem Description */}
                                    <div className="rounded-[10px] bg-white p-6">
                                        <div className="mb-4">
                                            <Label htmlFor="vehicle_problem_description">
                                                Describe the Problem *
                                            </Label>
                                            <textarea
                                                id="vehicle_problem_description"
                                                name="vehicle_problem_description"
                                                rows={4}
                                                required
                                                className="mt-1 w-full rounded-lg border-2 border-gray-200 p-3 text-[#1A202C] focus:border-[#3563E9] focus:outline-none"
                                                placeholder="Please describe the issue you're experiencing with your vehicle..."
                                            />
                                            {errors.vehicle_problem_description && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {
                                                        errors.vehicle_problem_description
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="rounded-[10px] bg-white p-6">
                                        <div className="mb-4 flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-[#3563E9]" />
                                            <h2 className="text-xl font-bold text-[#1A202C]">
                                                Service Location
                                            </h2>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <Button
                                                    type="button"
                                                    onClick={getCurrentLocation}
                                                    disabled={
                                                        usingCurrentLocation
                                                    }
                                                    className="w-full rounded-[4px] border-2 border-[#3563E9] bg-white text-[#3563E9] hover:bg-[#3563E9] hover:text-white"
                                                >
                                                    {usingCurrentLocation ? (
                                                        <>
                                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                            Getting location...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <MapPin className="mr-2 h-4 w-4" />
                                                            Use Current Location
                                                        </>
                                                    )}
                                                </Button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="customer_latitude">
                                                        Latitude *
                                                    </Label>
                                                    <Input
                                                        id="customer_latitude"
                                                        name="customer_latitude"
                                                        type="number"
                                                        step="any"
                                                        required
                                                        placeholder="-13.9626"
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="customer_longitude">
                                                        Longitude *
                                                    </Label>
                                                    <Input
                                                        id="customer_longitude"
                                                        name="customer_longitude"
                                                        type="number"
                                                        step="any"
                                                        required
                                                        placeholder="33.7741"
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="customer_address">
                                                    Address
                                                </Label>
                                                <Input
                                                    id="customer_address"
                                                    name="customer_address"
                                                    placeholder="123 Main Street, Lilongwe"
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="location_notes">
                                                    Location Notes
                                                </Label>
                                                <textarea
                                                    id="location_notes"
                                                    name="location_notes"
                                                    rows={2}
                                                    className="mt-1 w-full rounded-lg border-2 border-gray-200 p-3 text-[#1A202C] focus:border-[#3563E9] focus:outline-none"
                                                    placeholder="Additional directions or landmarks..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <Button type="button" onClick={handlePrevStep} variant="outline" className="h-11 rounded-[4px] px-6 text-base font-semibold">
                                            Previous
                                        </Button>
                                        <Button type="button" onClick={handleNextStep} className="h-11 rounded-[4px] bg-[#3563E9] px-6 text-base font-semibold text-white transition-colors hover:bg-[#264AC6]">
                                            Next
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-6 lg:col-span-2" hidden={currentStep !== 3}>
                                    {/* Recommended Parts */}
                                    {selectedServiceType?.requires_parts && (
                                        <div className="rounded-[10px] bg-white p-6">
                                            <div className="mb-4 flex items-center gap-2">
                                                <Package className="h-5 w-5 text-[#3563E9]" />
                                                <h2 className="text-xl font-bold text-[#1A202C]">
                                                    Recommended Parts
                                                </h2>
                                            </div>

                                            {loadingParts ? (
                                                <div className="flex items-center justify-center py-8">
                                                    <LoaderCircle className="h-8 w-8 animate-spin text-[#3563E9]" />
                                                </div>
                                            ) : recommendedParts.length ===
                                              0 ? (
                                                <p className="text-center text-[#90A3BF]">
                                                    No parts available for this
                                                    service
                                                </p>
                                            ) : (
                                                <div className="space-y-3">
                                                    {recommendedParts.map(
                                                        (part) => {
                                                            const selected =
                                                                selectedParts.get(
                                                                    part.id
                                                                );
                                                            return (
                                                                <div
                                                                    key={part.id}
                                                                    className="flex items-center gap-4 rounded-lg border-2 border-gray-200 p-4"
                                                                >
                                                                    <img
                                                                        src={
                                                                            part.image
                                                                        }
                                                                        alt={
                                                                            part.name
                                                                        }
                                                                        className="h-16 w-16 rounded object-contain"
                                                                    />
                                                                    <div className="flex-1">
                                                                        <h3 className="font-semibold text-[#1A202C]">
                                                                            {
                                                                                part.name
                                                                            }
                                                                        </h3>
                                                                        <p className="text-sm text-[#90A3BF]">
                                                                            {
                                                                                part.brand
                                                                            }{' '}
                                                                            •{' '}
                                                                            {
                                                                                part.category
                                                                            }
                                                                        </p>
                                                                        <p className="font-bold text-[#3563E9]">
                                                                            {formatPrice(
                                                                                part.price
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handlePartQuantityChange(
                                                                                    part,
                                                                                    -1
                                                                                )
                                                                            }
                                                                            variant="outline"
                                                                            size="icon"
                                                                            className="h-8 w-8"
                                                                        >
                                                                            <Minus className="h-4 w-4" />
                                                                        </Button>
                                                                        <span className="w-8 text-center font-semibold">
                                                                            {selected?.quantity ||
                                                                                0}
                                                                        </span>
                                                                        <Button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handlePartQuantityChange(
                                                                                    part,
                                                                                    1
                                                                                )
                                                                            }
                                                                            variant="outline"
                                                                            size="icon"
                                                                            className="h-8 w-8"
                                                                        >
                                                                            <Plus className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            )}

                                            {/* Hidden inputs for selected parts */}
                                            {Array.from(
                                                selectedParts.entries()
                                            ).map(([partId, { quantity }]) => (
                                                <div key={partId}>
                                                    <input
                                                        type="hidden"
                                                        name={`selected_parts[${partId}][part_id]`}
                                                        value={partId}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name={`selected_parts[${partId}][quantity]`}
                                                        value={quantity}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Mechanic Selection */}
                                    <div className="rounded-[10px] bg-white p-6">
                                        <div className="mb-4 flex items-center gap-2">
                                            <User className="h-5 w-5 text-[#3563E9]" />
                                            <h2 className="text-xl font-bold text-[#1A202C]">
                                                Select Mechanic
                                            </h2>
                                        </div>

                                        {loadingMechanics ? (
                                            <div className="flex items-center justify-center py-8">
                                                <LoaderCircle className="h-8 w-8 animate-spin text-[#3563E9]" />
                                            </div>
                                        ) : mechanics.length === 0 ? (
                                            <p className="text-center text-[#90A3BF]">
                                                No mechanics available at the
                                                moment
                                            </p>
                                        ) : (
                                            <div className="space-y-4">
                                                <Label htmlFor="mechanic_id">
                                                    Choose a mechanic *
                                                </Label>
                                                <Select
                                                    name="mechanic_id"
                                                    required
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a mechanic" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {mechanics.map(
                                                            (mechanic) => (
                                                                <SelectItem
                                                                    key={
                                                                        mechanic.id
                                                                    }
                                                                    value={mechanic.id.toString()}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <span>
                                                                            {
                                                                                mechanic.name
                                                                            }
                                                                        </span>
                                                                        {mechanic.branch && (
                                                                            <span className="text-xs text-[#90A3BF]">
                                                                                •{' '}
                                                                                {
                                                                                    mechanic.branch
                                                                                }
                                                                            </span>
                                                                        )}
                                                                        {mechanic.rating !== undefined && (
                                                                            <span className="flex items-center gap-1 text-xs text-yellow-600">
                                                                                <Star className="h-3 w-3 fill-current" />
                                                                                {mechanic.rating.toFixed(
                                                                                    1
                                                                                )}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                {errors.mechanic_id && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors.mechanic_id}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-start">
                                        <Button type="button" onClick={handlePrevStep} variant="outline" className="h-11 rounded-[4px] px-6 text-base font-semibold">
                                            Previous
                                        </Button>
                                    </div>
                                </div>

                                {/* Summary Section */}
                                <div className="lg:col-span-1">
                                    <div className="sticky top-8 rounded-[10px] bg-white p-6">
                                        <h2 className="mb-4 text-xl font-bold text-[#1A202C]">
                                            Request Summary
                                        </h2>

                                        {selectedServiceType ? (
                                            <>
                                                <div className="mb-4 space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-[#90A3BF]">
                                                            Service
                                                        </span>
                                                        <span className="font-semibold text-[#1A202C]">
                                                            {
                                                                selectedServiceType.name
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-[#90A3BF]">
                                                            Labor Cost
                                                        </span>
                                                        <span className="font-semibold text-[#1A202C]">
                                                            {formatPrice(
                                                                selectedServiceType.base_price
                                                            )}
                                                        </span>
                                                    </div>

                                                    {selectedParts.size > 0 && (
                                                        <>
                                                            <div className="my-2 border-t border-gray-200 pt-2">
                                                                <p className="text-sm font-semibold text-[#90A3BF]">
                                                                    Selected
                                                                    Parts
                                                                </p>
                                                            </div>
                                                            {Array.from(
                                                                selectedParts.values()
                                                            ).map(
                                                                ({
                                                                    part,
                                                                    quantity,
                                                                }) => (
                                                                    <div
                                                                        key={
                                                                            part.id
                                                                        }
                                                                        className="flex items-center justify-between text-sm"
                                                                    >
                                                                        <span className="text-[#90A3BF]">
                                                                            {
                                                                                part.name
                                                                            }{' '}
                                                                            x
                                                                            {
                                                                                quantity
                                                                            }
                                                                        </span>
                                                                        <span className="font-semibold text-[#1A202C]">
                                                                            {formatPrice(
                                                                                part.price *
                                                                                    quantity
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )
                                                            )}
                                                        </>
                                                    )}
                                                </div>

                                                <div className="mb-6 border-t border-gray-200 pt-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-lg font-bold text-[#1A202C]">
                                                            Total
                                                        </span>
                                                        <span className="text-2xl font-bold text-[#3563E9]">
                                                            {formatPrice(
                                                                calculateTotal()
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="h-12 w-full rounded-[4px] bg-[#3563E9] text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                                                >
                                                    {processing ? (
                                                        <>
                                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                            Submitting...
                                                        </>
                                                    ) : (
                                                        'Submit Request'
                                                    )}
                                                </Button>
                                            </>
                                        ) : (
                                            <p className="text-center text-sm text-[#90A3BF]">
                                                Select a service to see the
                                                summary
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </Form>
                </main>

                <Footer />
            </div>
        </>
    );
}
