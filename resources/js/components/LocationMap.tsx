import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationMapProps {
    latitude: number;
    longitude: number;
    address?: string;
    height?: string;
}

export default function LocationMap({ latitude, longitude, address, height = '400px' }: LocationMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Create map instance
        const map = L.map(mapRef.current).setView([latitude, longitude], 15);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Fix icon issue with webpack
        const icon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // Add marker
        const marker = L.marker([latitude, longitude], { icon }).addTo(map);

        // Add popup if address is provided
        if (address) {
            marker.bindPopup(`<b>Customer Location</b><br>${address}`).openPopup();
        } else {
            marker.bindPopup(`<b>Customer Location</b><br>Lat: ${latitude}<br>Lng: ${longitude}`).openPopup();
        }

        mapInstanceRef.current = map;

        // Cleanup
        return () => {
            map.remove();
            mapInstanceRef.current = null;
        };
    }, [latitude, longitude, address]);

    return (
        <div
            ref={mapRef}
            style={{ height, width: '100%' }}
            className="rounded-lg border-2 border-gray-200"
        />
    );
}
