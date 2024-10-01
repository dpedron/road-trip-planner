export default function LocationBadge({ children }: { children: string }) {
    return (
        <span className="badge mx-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
            {children}
        </span>
    );
}
