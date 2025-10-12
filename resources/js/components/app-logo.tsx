export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square h-20 items-center justify-center">
                <img src="/logo.jpg" alt="Logo" className="h-20 rounded-md object-cover" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold sr-only">
                    Logo
                </span>
            </div>
        </>
    );
}
