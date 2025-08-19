"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";

export function useSessionCache() {
    const { data: session, status, update } = useSession();
    
    // Memoize session data to prevent unnecessary re-renders
    const memoizedSession = useMemo(() => session, [session?.user?.id, session?.user?.email]);
    
    return {
        data: memoizedSession,
        status,
        update,
        isAuthenticated: status === "authenticated",
        isLoading: status === "loading"
    };
}
