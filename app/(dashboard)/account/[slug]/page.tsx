import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

// Define the available profile sections
const PROFILE_SECTIONS = {
    settings: "Settings",
    authentication: "Authentication",
    favourites: "Favourites",
} as const;

type ProfileSection = keyof typeof PROFILE_SECTIONS;

const Settings = dynamic(
    () => import("./_c/settings").then((mod) => ({ default: mod.default })),
    {
        loading: () => (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                    <span>Loading...</span>
                </div>
            </div>
        ),
    },
);

const Authentication = dynamic(
    () =>
        import("./_c/authentication").then((mod) => ({ default: mod.default })),
    {
        loading: () => (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                    <span>Loading...</span>
                </div>
            </div>
        ),
    },
);

const Favourites = dynamic(
    () => import("./_c/favourites").then((mod) => ({ default: mod.default })),
    {
        loading: () => (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                    <span>Loading...</span>
                </div>
            </div>
        ),
    },
);

// Component mapping
const COMPONENT_MAP = {
    settings: Settings,
    authentication: Authentication,
    favourites: Favourites,
} as const;

export const dynamicParams = true;

export async function generateStaticParams() {
    return Object.keys(PROFILE_SECTIONS).map((slug) => ({
        slug,
    }));
}

export default async function ProfileSlugPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // Check if the slug is valid
    if (!(slug in PROFILE_SECTIONS)) {
        notFound();
    }

    const ProfileComponent = COMPONENT_MAP[slug as ProfileSection];

    return (
        <div className="container mx-auto px-4 py-8">
            <ProfileComponent />
        </div>
    );
}
