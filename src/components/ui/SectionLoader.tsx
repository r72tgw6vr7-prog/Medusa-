/**
 * Minimal loading skeleton for lazy-loaded sections.
 * Displays a subtle pulsing bar on the dark luxury background
 * so users see loading activity instead of blank space.
 */
export function SectionLoader() {
    return (
        <div className="flex items-center justify-center py-24" aria-busy="true" aria-label="Loading section">
            <div className="h-0.5 w-24 rounded-full bg-brand-accent/30 animate-pulse" />
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]" aria-busy="true" aria-label="Loading page">
            <div className="h-0.5 w-24 rounded-full bg-brand-accent/30 animate-pulse" />
        </div>
    );
}
