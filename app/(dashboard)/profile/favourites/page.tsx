import { getUserFavourites } from "@/lib/actions/profile.actions";
import Image from "next/image";
import Link from "next/link";

export default async function FavouritesPage() {
    const favourites = await getUserFavourites();

    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold">
                Your Favourite Components
            </h1>
            {favourites && favourites.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {favourites.map((fav: string) => (
                        <div
                            key={fav}
                            className="rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-900"
                        >
                            <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                                <Image
                                    src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1753447263/${fav}.png`}
                                    alt={fav}
                                    width={4210}
                                    height={1080}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <Link
                                href={`/sections/${fav.split("-")[0]}`}
                                className="text-lg font-medium hover:underline"
                            >
                                {fav}
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no favourite components yet.</p>
            )}
        </div>
    );
}
