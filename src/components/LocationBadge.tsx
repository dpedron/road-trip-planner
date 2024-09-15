export default function LocationBadge({ children }: { children: string }) {
    return (
        <span className="badge bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mx-2">
            {children}
        </span>
    );
}
