"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    User,
    Settings,
    Shield,
    Calendar,
    Edit3,
    X,
    Heart,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    getCurrentUserProfile,
    updateProfileImage,
} from "@/lib/actions/profile.actions";
import { toast } from "sonner";
import { AvatarUpload } from "@/components/file-upload";

interface ProfileLayoutProps {
    children: React.ReactNode;
}

export default function ProfilePage({ children }: ProfileLayoutProps) {
    const [isEditing, setIsEditing] = useState(false);
    const pathname = usePathname();
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            const data = await getCurrentUserProfile();
            setProfile(data);
            setTimeout(() => {
                setLoading(false);
            }, 2500);
        }
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center gap-2">
                <div className="loader"></div>
                Loading profile...
            </div>
        );
    }
    if (!profile) {
        return (
            <div className="flex h-full items-center justify-center text-red-500">
                Profile not found.
            </div>
        );
    }

    console.log(profile);

    const navItems = [
        { name: "General", href: "/profile/general-information", icon: User },
        { name: "Favourites", href: "/profile/favourites", icon: Heart },
        { name: "Settings", href: "/profile/settings", icon: Settings },
        { name: "Security", href: "/profile/security", icon: Shield },
    ];

    const handleImageUpload = async (url: string) => {
        try {
            setIsUploading(true);
            await updateProfileImage(url);

            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            setProfile((prev: any) => ({ ...prev, image: url }));
            toast.success("Profile image updated successfully!");
        } catch (error) {
            console.error("Profile image update failed:", error);
            toast.error("Failed to update profile image");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="mb-8">
                    <div className="relative">
                        <div className="h-48 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 shadow-xl"></div>
                        <div className="absolute -bottom-16 left-8">
                            <div className="relative">
                                <Avatar className="h-32 w-32 border-4 border-white shadow-2xl">
                                    <AvatarImage
                                        src={profile.image ?? undefined}
                                        alt="Profile"
                                    />
                                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-2xl font-bold text-white">
                                        {profile.name
                                            ? profile.name
                                                  .slice(0, 2)
                                                  .toUpperCase()
                                            : "DK"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -right-2 -bottom-2">
                                    {isUploading ? (
                                        <Button
                                            size="icon"
                                            className="h-10 w-10 rounded-full bg-white"
                                            disabled
                                        >
                                            <Loader2 className="h-4 w-4 animate-spin text-gray-700" />
                                        </Button>
                                    ) : (
                                        <AvatarUpload
                                            onSuccess={handleImageUpload}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-4 right-4">
                            <Badge
                                variant="secondary"
                                className="border-white/30 bg-white/20 text-white"
                            >
                                Pro Member
                            </Badge>
                        </div>
                    </div>

                    <div className="mt-20 ml-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="mb-2 text-3xl font-bold text-slate-900">
                                    {profile.name}
                                </h1>

                                <div className="flex items-center gap-10 text-sm text-slate-500">
                                    <p className="text-slate-600">
                                        @{profile.username}
                                    </p>

                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Joined{" "}
                                        {profile.emailVerified.toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={() => setIsEditing(!isEditing)}
                                variant={isEditing ? "outline" : "default"}
                                className="gap-2"
                            >
                                {isEditing ? (
                                    <>
                                        <X className="h-4 w-4" />
                                        Cancel
                                    </>
                                ) : (
                                    <>
                                        <Edit3 className="h-4 w-4" />
                                        Edit Profile
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="grid grid-cols-10 gap-5">
                        <nav className="col-span-2 mb-6 flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-700 hover:text-white ${
                                        pathname === item.href || 
                                        (item.href === "/profile/general-information" && pathname === "/profile")
                                            ? "bg-blue-600 text-white"
                                            : ""
                                    }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="col-span-6 w-full px-4">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
