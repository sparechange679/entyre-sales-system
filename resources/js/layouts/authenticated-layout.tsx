import { type ReactNode } from 'react';

interface AuthenticatedLayoutProps {
    children: ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    return (
        <div className="min-h-screen bg-[#F6F7F9]">
            {children}
        </div>
    );
}
