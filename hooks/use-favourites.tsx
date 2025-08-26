"use client";

import { useState, useTransition, useEffect } from "react";
import { updateUserFavourites } from "@/lib/actions/profile.actions";
import { useRouter } from "next/navigation";

export function useFavourites() {
    const [favourites, setFavourites] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        const fetchFavourites = async () => {
            const { getUserFavourites } = await import(
                "@/lib/actions/profile.actions"
            );
            const favs = await getUserFavourites();
            setFavourites(favs || []);
        };
        fetchFavourites();
    }, []);

    const toggleFavourite = (name: string) => {
        let updated;
        if (favourites.includes(name)) {
            updated = favourites.filter((fav) => fav !== name);
        } else {
            updated = [...favourites, name];
        }

        setFavourites(updated);
        startTransition(() => {
            updateUserFavourites({ favourites: updated });
            router.refresh();
        });
    };
    const isFavourite = (name: string) => favourites.includes(name);

    return { toggleFavourite, isFavourite, isPending };
}
