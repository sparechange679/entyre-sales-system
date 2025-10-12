import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <AuthLayout
            title="Welcome Back"
            description="Sign in to access your dashboard and manage operations"
        >
            <Head title="Log in" />

            {status && (
                <div className="mb-6 rounded-lg bg-green-50 p-3 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <Form
                {...AuthenticatedSessionController.store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
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
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="your.email@example.com"
                                    className="h-12 rounded-lg border-[#C3D4E966] bg-[#F6F7F9] px-4 text-sm text-[#1A202C] transition-colors focus:border-[#3563E9] focus:bg-white"
                                />
                                <InputError
                                    message={errors.email}
                                    className="text-xs"
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-semibold text-[#1A202C]"
                                    >
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs font-semibold text-[#3563E9] transition-colors hover:text-[#264AC6]"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    className="h-12 rounded-lg border-[#C3D4E966] bg-[#F6F7F9] px-4 text-sm text-[#1A202C] transition-colors focus:border-[#3563E9] focus:bg-white"
                                />
                                <InputError
                                    message={errors.password}
                                    className="text-xs"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="border-[#C3D4E966]"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-sm text-[#596780]"
                                >
                                    Keep me signed in
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 h-12 w-full rounded-lg bg-[#3563E9] text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                )}
                                Sign In
                            </Button>
                        </div>

                        <div className="text-center text-sm text-[#90A3BF]">
                            Don't have an account?{' '}
                            <TextLink
                                href={register()}
                                tabIndex={6}
                                className="font-semibold text-[#3563E9] transition-colors hover:text-[#264AC6]"
                            >
                                Create Account
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
