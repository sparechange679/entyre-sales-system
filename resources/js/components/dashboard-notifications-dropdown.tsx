import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';

export function DashboardNotificationsDropdown() {
    // Mock notifications - replace with actual data from backend
    const notifications = [
        // { id: 1, message: 'New service request received', time: '5m ago' },
        // { id: 2, message: 'Payment confirmed', time: '1h ago' },
        // { id: 3, message: 'Service completed', time: '2h ago' },
    ];

    const hasUnread = true; // Replace with actual logic

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="relative rounded-full p-2 hover:bg-[#F6F7F9]">
                    <Bell className="h-6 w-6 text-[#596780]" />
                    {hasUnread && (
                        <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#FF4423]" />
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="px-4 py-3">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                </div>
                {notifications.length > 0 ? (
                    <>
                        {notifications.slice(0, 3).map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className="cursor-pointer px-4 py-3"
                            >
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm">
                                        {notification.message}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {notification.time}
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        ))}
                        <div className="border-t px-4 py-2">
                            <a href='/notifications' className="text-xs font-semibold text-[#3563E9] hover:underline">
                                View all notifications
                            </a>
                        </div>
                    </>
                ) : (
                    <div className="px-4 py-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            No new notifications
                        </p>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
