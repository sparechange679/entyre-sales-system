import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface AdminVerificationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onVerified?: () => void;
    redirectOnSuccess?: boolean;
}

const ADMIN_CODE = '111111'; // For testing purposes - in production this would be server-side

export default function AdminVerificationModal({
    open,
    onOpenChange,
    onVerified,
    redirectOnSuccess = false,
}: AdminVerificationModalProps) {
    const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (open) {
            // Reset state when modal opens
            setCode(['', '', '', '', '', '']);
            setError('');
            // Focus first input
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }
    }, [open]);

    const handleChange = (index: number, value: string) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-verify when all 6 digits are filled
        if (newCode.every((digit) => digit !== '') && index === 5) {
            const enteredCode = newCode.join('');
            setTimeout(() => verifyCode(enteredCode), 100);
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            // Move to previous input on backspace if current is empty
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('');

        if (digits.length === 6) {
            setCode(digits);
            setError('');
            inputRefs.current[5]?.focus();
            setTimeout(() => verifyCode(digits.join('')), 100);
        }
    };

    const verifyCode = (enteredCode: string) => {
        if (enteredCode === ADMIN_CODE) {
            onOpenChange(false);
            if (redirectOnSuccess) {
                // Redirect to admin registration page
                router.visit('/admin/register');
            } else if (onVerified) {
                onVerified();
            }
        } else {
            setError('Invalid verification code. Please try again.');
            setCode(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }
    };

    const handleVerify = () => {
        const enteredCode = code.join('');
        if (enteredCode.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }
        verifyCode(enteredCode);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-[#C3D4E966] bg-white sm:max-w-[500px]">
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute right-4 top-4 rounded-sm text-[#90A3BF] opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#3563E9] focus:ring-offset-2"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>

                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#1A202C]">
                        Admin Access Verification
                    </DialogTitle>
                    <DialogDescription className="text-sm text-[#90A3BF]">
                        To register as an administrator, please enter the 6-digit
                        verification code.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-6">
                    {/* OTP Input */}
                    <div className="flex justify-center gap-2 md:gap-3">
                        {code.map((digit, index) => (
                            <Input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                    handleChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                className="h-14 w-14 rounded-lg border-2 border-[#C3D4E966] bg-white text-center text-2xl font-bold text-[#1A202C] transition-all focus:border-[#3563E9] focus:bg-[#F6F7F9] focus:ring-2 focus:ring-[#3563E9]/20"
                                data-test={`otp-input-${index}`}
                            />
                        ))}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="rounded-lg border-2 border-red-200 bg-red-50 p-3 text-center">
                            <p className="text-sm font-medium text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Help Text */}
                    <div className="rounded-lg border-2 border-[#3563E9]/10 bg-[#3563E9]/5 p-4">
                        <div className="mb-2 flex items-center justify-center gap-2">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 12C7.4 12 7 11.6 7 11C7 10.4 7.4 10 8 10C8.6 10 9 10.4 9 11C9 11.6 8.6 12 8 12ZM9 9H7V4H9V9Z"
                                    fill="#3563E9"
                                />
                            </svg>
                            <p className="text-xs font-semibold text-[#3563E9]">
                                For Testing: Code is 111111
                            </p>
                        </div>
                        <p className="text-center text-xs text-[#596780]">
                            Only authorized staff members have access to the admin
                            verification code. Contact your system administrator if
                            you need assistance.
                        </p>
                    </div>

                    {/* Verify Button */}
                    <Button
                        onClick={handleVerify}
                        className="h-12 w-full rounded-lg bg-[#3563E9] text-base font-semibold text-white transition-colors hover:bg-[#264AC6]"
                        data-test="verify-admin-button"
                    >
                        Verify & Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
