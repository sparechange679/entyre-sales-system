import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import AdminVerificationModal from '@/components/admin-verification-modal';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
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
import AuthLayout from '@/layouts/auth-layout';
import { useState } from 'react';

export default function Register() {
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string>('customer');
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);
    return (
        <AuthLayout
            title="Create Your Account"
            description="Join Entyre to manage your tire and automotive service operations"
        >
            <Head title="Register" />

            <AdminVerificationModal
                open={showAdminModal}
                onOpenChange={setShowAdminModal}
                redirectOnSuccess={true}
            />

            {/* Role Selection Header Badge - Collapsible */}
            <div className="relative mb-6">
                {/* Header Badge */}
                <button
                    type="button"
                    onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                    className="w-full rounded-lg bg-[#3563E9]/10 p-4 transition-all hover:bg-[#3563E9]/15"
                >
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            {selectedRole === 'customer' && (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#3563E9"/>
                                    <path d="M12 14.5C6.99 14.5 2.91 17.86 2.91 22C2.91 22.28 3.13 22.5 3.41 22.5H20.59C20.87 22.5 21.09 22.28 21.09 22C21.09 17.86 17.01 14.5 12 14.5Z" fill="#3563E9"/>
                                </svg>
                            )}
                            {selectedRole === 'mechanic' && (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 9H19.82C19.93 8.68 20 8.34 20 8C20 6.34 18.66 5 17 5C16.66 5 16.32 5.07 16 5.18V3C16 2.45 15.55 2 15 2H9C8.45 2 8 2.45 8 3V5.18C7.68 5.07 7.34 5 7 5C5.34 5 4 6.34 4 8C4 8.34 4.07 8.68 4.18 9H2C1.45 9 1 9.45 1 10V12C1 12.55 1.45 13 2 13H4.18C4.07 13.32 4 13.66 4 14C4 15.66 5.34 17 7 17C7.34 17 7.68 16.93 8 16.82V19C8 19.55 8.45 20 9 20H15C15.55 20 16 19.55 16 19V16.82C16.32 16.93 16.66 17 17 17C18.66 17 20 15.66 20 14C20 13.66 19.93 13.32 19.82 13H22C22.55 13 23 12.55 23 12V10C23 9.45 22.55 9 22 9Z" fill="#3563E9"/>
                                </svg>
                            )}
                            {selectedRole === 'accountant' && (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="#3563E9"/>
                                </svg>
                            )}
                            <div className="text-left">
                                <p className="text-sm font-semibold text-[#3563E9]">
                                    {selectedRole === 'customer' && 'Customer Account'}
                                    {selectedRole === 'mechanic' && 'Mechanic/Technician Account'}
                                    {selectedRole === 'accountant' && 'Accountant Account'}
                                </p>
                                <p className="text-xs text-[#596780]">
                                    {selectedRole === 'customer' && 'Request services and manage account'}
                                    {selectedRole === 'mechanic' && 'Service management and inventory'}
                                    {selectedRole === 'accountant' && 'Financial transactions and reports'}
                                </p>
                            </div>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={`flex-shrink-0 transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`}>
                            <path d="M5 7.5L10 12.5L15 7.5" stroke="#3563E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </button>

                {/* Dropdown Options - Overlay on top */}
                {showRoleDropdown && (
                    <div className="absolute left-0 right-0 top-full z-50 mt-2 space-y-2 rounded-lg border-2 border-[#C3D4E966] bg-white p-2 shadow-lg">
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedRole('customer');
                                setShowRoleDropdown(false);
                            }}
                            className={`flex w-full items-center gap-3 rounded-lg p-3 transition-colors ${selectedRole === 'customer' ? 'bg-[#3563E9]/10' : 'hover:bg-[#F6F7F9]'}`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#3563E9"/>
                                <path d="M12 14.5C6.99 14.5 2.91 17.86 2.91 22C2.91 22.28 3.13 22.5 3.41 22.5H20.59C20.87 22.5 21.09 22.28 21.09 22C21.09 17.86 17.01 14.5 12 14.5Z" fill="#3563E9"/>
                            </svg>
                            <div className="text-left">
                                <p className="text-sm font-semibold text-[#1A202C]">Customer</p>
                                <p className="text-xs text-[#596780]">Request services and manage account</p>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setSelectedRole('mechanic');
                                setShowRoleDropdown(false);
                            }}
                            className={`flex w-full items-center gap-3 rounded-lg p-3 transition-colors ${selectedRole === 'mechanic' ? 'bg-[#3563E9]/10' : 'hover:bg-[#F6F7F9]'}`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M22 9H19.82C19.93 8.68 20 8.34 20 8C20 6.34 18.66 5 17 5C16.66 5 16.32 5.07 16 5.18V3C16 2.45 15.55 2 15 2H9C8.45 2 8 2.45 8 3V5.18C7.68 5.07 7.34 5 7 5C5.34 5 4 6.34 4 8C4 8.34 4.07 8.68 4.18 9H2C1.45 9 1 9.45 1 10V12C1 12.55 1.45 13 2 13H4.18C4.07 13.32 4 13.66 4 14C4 15.66 5.34 17 7 17C7.34 17 7.68 16.93 8 16.82V19C8 19.55 8.45 20 9 20H15C15.55 20 16 19.55 16 19V16.82C16.32 16.93 16.66 17 17 17C18.66 17 20 15.66 20 14C20 13.66 19.93 13.32 19.82 13H22C22.55 13 23 12.55 23 12V10C23 9.45 22.55 9 22 9Z" fill="#3563E9"/>
                            </svg>
                            <div className="text-left">
                                <p className="text-sm font-semibold text-[#1A202C]">Mechanic/Technician</p>
                                <p className="text-xs text-[#596780]">Service management and inventory</p>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setSelectedRole('accountant');
                                setShowRoleDropdown(false);
                            }}
                            className={`flex w-full items-center gap-3 rounded-lg p-3 transition-colors ${selectedRole === 'accountant' ? 'bg-[#3563E9]/10' : 'hover:bg-[#F6F7F9]'}`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="#3563E9"/>
                            </svg>
                            <div className="text-left">
                                <p className="text-sm font-semibold text-[#1A202C]">Accountant</p>
                                <p className="text-xs text-[#596780]">Financial transactions and reports</p>
                            </div>
                        </button>
                    </div>
                )}
            </div>

            <Form
                {...RegisteredUserController.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <input
                            type="hidden"
                            name="role"
                            value={selectedRole}
                        />

                        <div className="grid gap-5">
                            {errors.role && (
                                <InputError
                                    message={errors.role}
                                    className="text-xs"
                                />
                            )}
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="name"
                                    className="text-sm font-semibold text-[#1A202C]"
                                >
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="John Doe"
                                    className="h-12 rounded-lg border-[#C3D4E966] bg-[#F6F7F9] px-4 text-sm text-[#1A202C] transition-colors focus:border-[#3563E9] focus:bg-white"
                                />
                                <InputError
                                    message={errors.name}
                                    className="text-xs"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-semibold text-[#1A202C]"
                                >
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="your.email@example.com"
                                    className="h-12 rounded-lg border-[#C3D4E966] bg-[#F6F7F9] px-4 text-sm text-[#1A202C] transition-colors focus:border-[#3563E9] focus:bg-white"
                                />
                                <InputError
                                    message={errors.email}
                                    className="text-xs"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-[#1A202C]"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Create a strong password"
                                    className="h-12 rounded-lg border-[#C3D4E966] bg-[#F6F7F9] px-4 text-sm text-[#1A202C] transition-colors focus:border-[#3563E9] focus:bg-white"
                                />
                                <InputError
                                    message={errors.password}
                                    className="text-xs"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password_confirmation"
                                    className="text-sm font-semibold text-[#1A202C]"
                                >
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Re-enter your password"
                                    className="h-12 rounded-lg border-[#C3D4E966] bg-[#F6F7F9] px-4 text-sm text-[#1A202C] transition-colors focus:border-[#3563E9] focus:bg-white"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="text-xs"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 h-12 w-full rounded-lg bg-[#3563E9] text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                )}
                                Create Account
                            </Button>
                        </div>

                        <div className="space-y-3">
                            <div className="text-center text-sm text-[#90A3BF]">
                                Already have an account?{' '}
                                <TextLink
                                    href={login()}
                                    tabIndex={7}
                                    className="font-semibold text-[#3563E9] transition-colors hover:text-[#264AC6]"
                                >
                                    Sign In
                                </TextLink>
                            </div>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => setShowAdminModal(true)}
                                    className="text-xs font-semibold text-[#90A3BF] transition-colors hover:text-[#3563E9]"
                                    data-test="admin-verification-link"
                                >
                                    Admin Registration
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
