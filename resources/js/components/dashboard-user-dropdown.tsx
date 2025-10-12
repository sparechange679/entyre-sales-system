import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import { type User } from '@/types';
import { Link } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';

interface DashboardUserDropdownProps {
    user: User;
}

export function DashboardUserDropdown({ user }: DashboardUserDropdownProps) {
    const getInitials = useInitials();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full hover:bg-[#F6F7F9]">
                    <Avatar className="h-11 w-11 overflow-hidden rounded-full">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-[#C3D4E9] text-[#596780] text-sm font-semibold">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-[10px] border-[#C3D4E966] bg-white p-2 shadow-lg">
                <div className="px-3 py-3 border-b border-[#C3D4E966]">
                    <p className="text-sm font-semibold text-[#1A202C]">{user.name}</p>
                    <p className="text-xs text-[#90A3BF] mt-0.5">
                        {user.email}
                    </p>
                </div>
                <div className="py-1">
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer focus:bg-[#F6F7F9] focus:text-[#1A202C]">
                        <Link
                            href={edit()}
                            as="button"
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-[#596780] transition-colors hover:bg-[#F6F7F9] hover:text-[#1A202C]"
                        >
                            <Settings className="h-4 w-4" />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </div>
                <div className="border-t border-[#C3D4E966] py-1">
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer focus:bg-[#F6F7F9] focus:text-[#FF4423]">
                        <Link
                            href={logout()}
                            as="button"
                            method="post"
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-[#596780] transition-colors hover:bg-[#F6F7F9] hover:text-[#FF4423]"
                        >
                            <LogOut className="h-4 w-4" />
                            Log out
                        </Link>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
