import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useState } from 'react';

export interface CardProps {
    title: string;
    type: string;
    image: string;
    fuelCapacity: string;
    transmission: string;
    capacity: string;
    price: number;
    originalPrice?: number;
    isFavorite?: boolean;
    onFavoriteToggle?: () => void;
    onRentNow?: () => void;
}

export default function Card({
    title,
    type,
    image,
    fuelCapacity,
    transmission,
    capacity,
    price,
    originalPrice,
    isFavorite: initialFavorite = false,
    onFavoriteToggle,
    onRentNow,
}: CardProps) {
    const [isFavorite, setIsFavorite] = useState(initialFavorite);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        onFavoriteToggle?.();
    };

    return (
        <div className="group flex w-full flex-col rounded-[10px] bg-white p-4 transition-shadow hover:shadow-lg md:p-6">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between md:mb-8">
                <div className="flex flex-col">
                    <h3 className="mb-1 text-base font-bold text-[#1A202C] md:text-xl">
                        {title}
                    </h3>
                    <p className="text-xs font-bold text-[#90A3BF] md:text-sm">
                        {type}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleFavoriteClick}
                    className="transition-transform hover:scale-110"
                    aria-label={
                        isFavorite ? 'Remove from favorites' : 'Add to favorites'
                    }
                >
                    <Heart
                        className={`h-5 w-5 md:h-6 md:w-6 ${
                            isFavorite
                                ? 'fill-[#ED3F3F] text-[#ED3F3F]'
                                : 'fill-transparent text-[#90A3BF]'
                        }`}
                    />
                </button>
            </div>

            {/* Car Image */}
            <div className="mb-4 flex items-center justify-center md:mb-16">
                <img
                    src={image}
                    alt={title}
                    className="h-auto w-full max-w-[232px] object-contain"
                />
            </div>

            {/* Specs */}
            <div className="mb-4 flex items-center justify-between gap-3 md:mb-6">
                <div className="flex items-center gap-1.5 md:gap-2">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6"
                    >
                        <path
                            d="M22.34 9.33L20.34 5.33C19.97 4.61 19.19 4.15 18.35 4.15H5.65003C4.81003 4.15 4.03003 4.61 3.66003 5.33L1.66003 9.33C0.870034 10.84 0.870034 13.16 1.66003 14.67L3.66003 18.67C4.03003 19.39 4.81003 19.85 5.65003 19.85H18.35C19.19 19.85 19.97 19.39 20.34 18.67L22.34 14.67C23.13 13.16 23.13 10.84 22.34 9.33ZM12 13.75C11.04 13.75 10.25 12.96 10.25 12C10.25 11.04 11.04 10.25 12 10.25C12.96 10.25 13.75 11.04 13.75 12C13.75 12.96 12.96 13.75 12 13.75Z"
                            fill="#90A3BF"
                        />
                    </svg>
                    <span className="text-xs font-medium text-[#90A3BF] md:text-sm">
                        {fuelCapacity}
                    </span>
                </div>

                <div className="flex items-center gap-1.5 md:gap-2">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6"
                    >
                        <path
                            d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
                            fill="#90A3BF"
                        />
                        <path
                            d="M17.08 14.15C14.29 12.29 9.73996 12.29 6.92996 14.15C5.65996 15 4.95996 16.15 4.95996 17.38C4.95996 18.61 5.65996 19.75 6.91996 20.59C8.31996 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z"
                            fill="#90A3BF"
                        />
                    </svg>
                    <span className="text-xs font-medium text-[#90A3BF] md:text-sm">
                        {transmission}
                    </span>
                </div>

                <div className="flex items-center gap-1.5 md:gap-2">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6"
                    >
                        <path
                            d="M9.16 10.87C9.06 10.86 8.94 10.86 8.83 10.87C6.45 10.79 4.56 8.84 4.56 6.44C4.56 3.99 6.54 2 9 2C11.45 2 13.44 3.99 13.44 6.44C13.43 8.84 11.54 10.79 9.16 10.87Z"
                            fill="#90A3BF"
                        />
                        <path
                            d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11"
                            fill="#90A3BF"
                        />
                        <path
                            d="M4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z"
                            fill="#90A3BF"
                        />
                        <path
                            d="M18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14"
                            fill="#90A3BF"
                        />
                    </svg>
                    <span className="text-xs font-medium text-[#90A3BF] md:text-sm">
                        {capacity}
                    </span>
                </div>
            </div>

            {/* Price & Button */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-[#1A202C] md:text-xl">
                            ${price.toFixed(2)}
                        </span>
                        <span className="text-xs text-[#90A3BF] md:text-sm">
                            /day
                        </span>
                    </div>
                    {originalPrice && (
                        <span className="text-xs font-bold text-[#90A3BF] line-through md:text-sm">
                            ${originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                <Button
                    onClick={onRentNow}
                    className="h-10 rounded-[4px] bg-[#3563E9] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#264AC6] md:h-11 md:px-5 md:text-base"
                >
                    Rent Now
                </Button>
            </div>
        </div>
    );
}
