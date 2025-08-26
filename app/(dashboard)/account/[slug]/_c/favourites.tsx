import { getUserFavourites } from "@/lib/actions/profile.actions";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default async function FavouritesPage() {
    const favourites = await getUserFavourites();

    return (
        <div className="max-w-2xl space-y-8">
            <div>
                <h2 className="mb-2 text-lg font-medium text-gray-900">
                    Favourites
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                    Your saved components appear here for quick access.
                </p>
                <p className="text-xs text-gray-500">
                    Manage and revisit components you like the most.
                </p>
            </div>

            <Separator />

            {favourites && favourites.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {favourites.map((fav: string) => (
                        <div
                            key={fav}
                            className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-900"
                        >
                            <div className="aspect-video w-full">
                                <Image
                                    src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1753447263/${fav}.png`}
                                    alt={fav}
                                    width={4210}
                                    height={1080}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <Link
                                    href={`/sections/${fav.split("-")[0]}`}
                                    className="text-sm font-medium hover:underline"
                                >
                                    {fav}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <h3 className="mb-2 text-base font-medium text-gray-900">
                        No favourites yet
                    </h3>
                    <p className="text-sm text-gray-600">
                        Start exploring components and mark them as favourites
                        to see them here.
                    </p>
                </div>
            )}
        </div>
    );
}
