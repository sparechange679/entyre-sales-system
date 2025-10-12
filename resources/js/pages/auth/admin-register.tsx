import AdminRegistrationController from '@/actions/App/Http/Controllers/Auth/AdminRegistrationController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function AdminRegister() {
    return (
        <AuthLayout
            title="Administrator Registration"
            description="Create your administrator account for full system access"
        >
            <Head title="Admin Register" />

            {/* Admin Badge */}
            <div className="mb-6 rounded-lg bg-[#3563E9]/10 p-4">
                <div className="flex items-center gap-2">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 3C11.66 3 13 4.34 13 6C13 7.66 11.66 9 10 9C8.34 9 7 7.66 7 6C7 4.34 8.34 3 10 3ZM10 17.2C7.5 17.2 5.29 15.92 4 13.98C4.03 11.99 8 10.9 10 10.9C11.99 10.9 15.97 11.99 16 13.98C14.71 15.92 12.5 17.2 10 17.2Z"
                            fill="#3563E9"
                        />
                    </svg>
                    <div>
                        <p className="text-sm font-semibold text-[#3563E9]">
                            Administrator Account
                        </p>
                        <p className="text-xs text-[#596780]">
                            Full system access and management privileges
                        </p>
                    </div>
                </div>
            </div>

            <Form
                {...AdminRegistrationController.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
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
                                data-test="register-admin-button"
                            >
                                {processing && (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                )}
                                Create Admin Account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-[#90A3BF]">
                            Already have an account?{' '}
                            <TextLink
                                href={login()}
                                tabIndex={6}
                                className="font-semibold text-[#3563E9] transition-colors hover:text-[#264AC6]"
                            >
                                Sign In
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
