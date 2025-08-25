"use client";

import {
    Search,
    MessageSquare,
    Copy,
    Plus,
    MoreHorizontal,
    ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

    const sidebarItems = [
        { id: "general", label: "General" },
        { id: "authentication", label: "Authentication" },
        { id: "signin", label: "Sign in with Vercel" },
        { id: "billing-info", label: "Billing Information" },
        { id: "billing-items", label: "Billing Items" },
        { id: "invoices", label: "Invoices" },
        { id: "tokens", label: "Tokens" },
    ];

    useEffect(() => {
        async function fetchProfile() {
            const data = await getCurrentUserProfile();
            setProfile(data);
            setTimeout(() => {
                setLoading(false);
            });
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
        { name: "General", href: "/account/settings", icon: User },
        { name: "Authentication", href: "/account/authentication", icon: Heart },
        { name: "Favourites", href: "/account/favourites", icon: Settings },
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
        <>
            <div className="min-h-screen bg-white">
                {/* Header */}
                <header className="border-b border-gray-200 bg-white">
                    <div className="flex h-16 items-center justify-between px-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-black">
                                    <div className="h-3 w-3 rotate-45 transform rounded-sm bg-white"></div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center space-x-2 text-sm font-medium"
                                        >
                                            <span>My Account</span>
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            My Account
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    placeholder="Find..."
                                    className="w-64 border-gray-200 bg-gray-50 pl-10"
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-sm"
                            >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Feedback
                            </Button>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-sm text-white">
                                    M
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Tab Navigation */}
                <Tabs defaultValue="settings">
                    <div className="border-b border-gray-200 bg-white">
                        <div className="px-6">
                            <TabsList className="h-auto bg-transparent p-0">
                                <TabsTrigger
                                    value="overview"
                                    className="mr-8 rounded-none border-b-2 border-transparent px-0 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:text-gray-900"
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="activity"
                                    className="mr-8 rounded-none border-b-2 border-transparent px-0 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:text-gray-900"
                                >
                                    Activity
                                </TabsTrigger>
                                <TabsTrigger
                                    value="settings"
                                    className="mr-8 rounded-none border-b-2 border-transparent px-0 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:text-gray-900"
                                >
                                    Settings
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </div>

                    <TabsContent value="overview" className="mt-0">
                        <div className="p-8">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Overview
                            </h1>
                            <p className="mt-4 text-gray-600">
                                Account overview content goes here.
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="activity" className="mt-0">
                        <div className="p-8">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Activity
                            </h1>
                            <p className="mt-4 text-gray-600">
                                Account activity content goes here.
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="settings" className="mt-0">
                        <div className="mx-auto flex max-w-7xl">
                            {/* Sidebar */}
                            <aside className="min-h-screen w-72 border-r border-gray-200 bg-white">
                                <div className="p-6">
                                    <div className="relative mb-6">
                                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            placeholder="Search..."
                                            className="border-gray-200 bg-gray-50 pl-10"
                                        />
                                    </div>

                                    <nav className="space-y-1">
                                        {/* {sidebarItems.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() =>
                                                    setActiveSettingsTab(
                                                        item.id,
                                                    )
                                                }
                                                className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                                                    activeSettingsTab ===
                                                    item.id
                                                        ? "bg-gray-100 font-medium text-gray-900"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                }`}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                         */}

                                        {navItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-700 hover:text-white ${
                                                    pathname === item.href ||
                                                    (item.href ===
                                                        "/profile/general-information" &&
                                                        pathname === "/profile")
                                                        ? "bg-blue-600 text-white"
                                                        : ""
                                                }`}
                                            >
                                                <item.icon className="h-4 w-4" />
                                                {item.name}
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </aside>

                            {/* Main Content */}
                            <main className="flex-1 p-8">
                                <h1 className="mb-8 text-2xl font-semibold text-gray-900">
                                    Account Settings
                                </h1>

                                {children}
                            </main>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
