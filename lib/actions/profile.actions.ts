"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { getUserSession } from "./auth.actions";
import {
    updateGeneralInfoSchema,
    changePasswordSchema,
    updateUserSettingsSchema,
} from "@/lib/validations/profile";

type FieldErrors<T extends z.ZodTypeAny> = {
    [K in keyof z.infer<T>]?: string[];
};

type ActionResponse<T extends z.ZodTypeAny> =
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    | { success: true; message: string; user?: any }
    | { error: FieldErrors<T> | { general: string } };

export async function updateGeneralInformation(
    values: z.infer<typeof updateGeneralInfoSchema>,
): Promise<ActionResponse<typeof updateGeneralInfoSchema>> {
    const session = await getUserSession();
    if (!session || !session.user || !session.user.id) {
        return { error: { general: "Unauthorized. Please sign in." } };
    }

    const validatedFields = updateGeneralInfoSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors as FieldErrors<
                typeof updateGeneralInfoSchema
            >,
        };
    }

    const { name, username } = validatedFields.data;
    const userId = session.user.id;

    try {
        if (username) {
            const existingUserWithUsername = await prisma.user.findUnique({
                where: { username },
            });
            if (
                existingUserWithUsername &&
                existingUserWithUsername.id !== userId
            ) {
                return { error: { username: ["Username already taken."] } };
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                username,
            },
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
                image: true,
                termsAccepted: true,
                emailVerified: true,
            },
        });

        return {
            success: true,
            message: "Profile updated successfully!",
            user: updatedUser,
        };
    } catch (error) {
        console.error("Error updating general information:", error);
        return {
            error: { general: "Failed to update profile. Please try again." },
        };
    }
}

export async function changeUserPassword(
    values: z.infer<typeof changePasswordSchema>,
): Promise<ActionResponse<typeof changePasswordSchema>> {
    const session = await getUserSession();
    if (!session || !session.user || !session.user.id) {
        return { error: { general: "Unauthorized. Please sign in." } };
    }

    const validatedFields = changePasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors as FieldErrors<
                typeof changePasswordSchema
            >,
        };
    }

    const { currentPassword, newPassword } = validatedFields.data;
    const userId = session.user.id;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user || !user.password) {
            return { error: { general: "User not found or no password set." } };
        }

        const passwordsMatch = await bcrypt.compare(
            currentPassword,
            user.password,
        );
        if (!passwordsMatch) {
            return {
                error: { currentPassword: ["Incorrect current password."] },
            };
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        });

        return { success: true, message: "Password updated successfully!" };
    } catch (error) {
        console.error("Error changing password:", error);
        return {
            error: { general: "Failed to change password. Please try again." },
        };
    }
}

export async function updateUserSettings(
    values: z.infer<typeof updateUserSettingsSchema>,
): Promise<ActionResponse<typeof updateUserSettingsSchema>> {
    const session = await getUserSession();
    if (!session || !session.user || !session.user.id) {
        return { error: { general: "Unauthorized. Please sign in." } };
    }

    const validatedFields = updateUserSettingsSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors as FieldErrors<
                typeof updateUserSettingsSchema
            >,
        };
    }

    const userId = session.user.id;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                preferredTheme: values.theme,
                emailNotifications: values.emailNotifications,
                inAppNotifications: values.inAppNotifications,
                preferredLanguage: values.language,
                preferredTimezone: values.timezone,
            },
            select: {
                id: true,
                preferredTheme: true,
                emailNotifications: true,
                inAppNotifications: true,
                preferredLanguage: true,
                preferredTimezone: true,
            },
        });

        return {
            success: true,
            message: "Settings updated successfully!",
            user: updatedUser,
        };
    } catch (error) {
        console.error("Error updating user settings:", error);
        return {
            error: { general: "Failed to update settings. Please try again." },
        };
    }
}

export async function getCurrentUserProfile() {
    const session = await getUserSession();
    if (!session || !session.user || !session.user.id) {
        return null;
    }
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            image: true,
            emailVerified: true,
        },
    });
    return user;
}

export async function getUserFavourites() {
    const session = await getUserSession();
    if (!session || !session.user || !session.user.id) {
        return null;
    }
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { favourites: true },
    });
    return user?.favourites || [];
}

export async function updateUserFavourites(values: { favourites: string[] }) {
    const session = await getUserSession();
    if (!session || !session.user || !session.user.id) {
        return { error: { general: "Unauthorized. Please sign in." } };
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { favourites: values.favourites },
            select: { favourites: true },
        });
        return { success: true, favourites: updatedUser.favourites };
    } catch (error) {
        console.error("Error updating favourites:", error);
        return {
            error: {
                general: "Failed to update favourites. Please try again.",
            },
        };
    }
}

export async function updateProfileImage(imageUrl: string) {
    const session = await getUserSession();
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized");
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { image: imageUrl },
        });
        return updatedUser;
    } catch (error) {
        console.error("Error updating profile image:", error);
        throw new Error("Failed to update profile image");
    }
}
