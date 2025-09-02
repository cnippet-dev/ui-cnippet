"use client";

import * as React from "react";
import { useState, useTransition } from "react";
import { RiAddFill, RiHeart3Fill, RiLinkM } from "@remixicon/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
    getUserFavourites,
    updateUserFavourites,
} from "@/lib/actions/profile.actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function FavouritesPage() {
    const [favourites, setFavourites] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    React.useEffect(() => {
        const fetchFavourites = async () => {
            const favs = await getUserFavourites();
            setFavourites(favs || []);
        };
        fetchFavourites();
    }, []);

    const removeFavourite = (name: string) => {
        const updated = favourites.filter((fav) => fav !== name);
        setFavourites(updated);

        startTransition(() => {
            updateUserFavourites({ favourites: updated });
            router.refresh();
        });
    };

    return (
        <div className="max-w-2xl space-y-8">
            <div>
                <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                    Favourites
                </h2>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Your saved components appear here for quick access.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                    Manage and revisit components you like the most.
                </p>
            </div>

            <Separator />

            {favourites && favourites.length > 0 ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {favourites.map((fav: string) => (
                            <div
                                key={fav}
                                className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                            >
                                {/* TODO: Add image here using cldImage and the name of the component */}
                                {/* Remove from favourites button */}

                                <div className="relative flex items-center justify-between p-4">
                                    {/* <Link
                                        href={`/charts/${fav.split("-")[0]}`}
                                        className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-100"
                                    >
                                        {fav
                                            .replace(/-/g, " ")
                                            .replace(/\b\w/g, (l) =>
                                                l.toUpperCase(),
                                            )}
                                    </Link> */}
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {fav
                                            .replace(/-/g, " ")
                                            .replace(/\b\w/g, (l) =>
                                                l.toUpperCase(),
                                            )}
                                    </div>
                                    <Button
                                        onClick={() => removeFavourite(fav)}
                                        disabled={isPending}
                                        size="sm"
                                        variant="ghost"
                                        className="rounded-full bg-white/90 p-0 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
                                    >
                                        <RiHeart3Fill className="size-5 fill-red-500 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-900/50">
                        <RiAddFill className="mx-auto mb-3 h-8 w-8 text-gray-400" />
                        <h3 className="mb-2 text-base font-medium text-gray-900 dark:text-gray-100">
                            Discover More Components
                        </h3>
                        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            Explore our collection of components and add more to
                            your favourites
                        </p>
                        <Link href="/components">
                            <Button className="inline-flex items-center gap-2">
                                Browse Components
                                <RiLinkM className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        <RiHeart3Fill className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-base font-medium text-gray-900 dark:text-gray-100">
                        No favourites yet
                    </h3>
                    <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                        Start exploring components and mark them as favourites
                        to see them here.
                    </p>
                    <Link href="/components">
                        <Button className="inline-flex items-center gap-2">
                            <RiLinkM className="h-4 w-4" />
                            Explore Components
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
