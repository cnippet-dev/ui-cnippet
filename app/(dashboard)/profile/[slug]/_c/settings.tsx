"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { updateUserSettings } from "@/lib/actions/profile.actions";

import { useSessionCache } from "@/hooks/use-session-cache";

export default function SettingsPage() {
    const { data: session, status, update } = useSessionCache();
    const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [inAppNotifications, setInAppNotifications] = useState(false);
    const [language, setLanguage] = useState("en");
    const [timezone, setTimezone] = useState("UTC");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            setTheme(
                (session.user.preferredTheme as "light" | "dark" | "system") ||
                    "system",
            );
            setEmailNotifications(session.user.emailNotifications ?? true);
            setInAppNotifications(session.user.inAppNotifications ?? false);
            setLanguage(session.user.preferredLanguage || "en");
            setTimezone(session.user.preferredTimezone || "UTC");
        }
    }, [session, status]);

    const handleSaveSettings = async () => {
        setIsSaving(true);
        try {
            const result = await updateUserSettings({
                theme,
                emailNotifications,
                inAppNotifications,
                language,
                timezone,
            });

            if ('success' in result && result.success) {
                toast.success("Settings saved successfully!");
                // Update the session with new settings
                await update({
                    preferredTheme: theme,
                    emailNotifications,
                    inAppNotifications,
                    preferredLanguage: language,
                    preferredTimezone: timezone,
                });
            } else {
                if ('error' in result) {
                    if ('general' in result.error) {
                        toast.error(result.error.general);
                    } else {
                        // Handle field-specific errors
                        const fieldErrors = Object.values(result.error).flat();
                        toast.error(fieldErrors[0] || "Failed to save settings");
                    }
                } else {
                    toast.error("Failed to save settings");
                }
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
            console.error("Settings save error:", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading settings...</span>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-semibold">Access Denied</h2>
                <p className="text-muted-foreground">
                    You must be logged in to view this page.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account preferences and settings.
                </p>
            </div>

            <div className="grid gap-6">
                {/* Theme Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>
                            Customize how the app looks and feels.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="theme">Theme</Label>
                            <Select value={theme} onValueChange={(value: "light" | "dark" | "system") => setTheme(value)}>
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>
                            Choose how you want to receive notifications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <Switch
                                id="email-notifications"
                                checked={emailNotifications}
                                onCheckedChange={setEmailNotifications}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                            <Switch
                                id="in-app-notifications"
                                checked={inAppNotifications}
                                onCheckedChange={setInAppNotifications}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Language & Timezone Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Localization</CardTitle>
                        <CardDescription>
                            Set your preferred language and timezone.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="language">Language</Label>
                            <Select value={language} onValueChange={setLanguage}>
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                    <SelectItem value="fr">French</SelectItem>
                                    <SelectItem value="de">German</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Select value={timezone} onValueChange={setTimezone}>
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="UTC">UTC</SelectItem>
                                    <SelectItem value="EST">EST</SelectItem>
                                    <SelectItem value="PST">PST</SelectItem>
                                    <SelectItem value="GMT">GMT</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                    {isSaving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save Settings"
                    )}
                </Button>
            </div>
        </div>
    );
}
