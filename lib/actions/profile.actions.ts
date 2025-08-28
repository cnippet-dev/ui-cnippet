"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
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

// Account deletion actions
export async function scheduleAccountDeletion({
    graceDays = 7,
}: {
    graceDays?: number;
}) {
    const session = await getUserSession();
    if (!session || !session.user || !session.user.id) {
        return { error: { general: "Unauthorized. Please sign in." } } as const;
    }
    const userId = session.user.id;
    const now = new Date();
    const scheduledAt = new Date(now.getTime() + graceDays * 24 * 60 * 60 * 1000);
    try {
        const data = {
            deletionRequestedAt: now,
            deletionScheduledAt: scheduledAt,
        } as unknown as Prisma.UserUpdateInput;
        await prisma.user.update({ where: { id: userId }, data });
        return { success: true, message: "Account deletion scheduled." } as const;
    } catch (error) {
        console.error("Error scheduling account deletion:", error);
        return { error: { general: "Failed to schedule deletion." } } as const;
    }
}

export async function cancelAccountDeletion() {
    const session = await getUserSession();
    if (!session || !session.user || !session.user.id) {
        return { error: { general: "Unauthorized. Please sign in." } } as const;
    }
    try {
        const data = {
            deletionRequestedAt: null,
            deletionScheduledAt: null,
        } as unknown as Prisma.UserUpdateInput;
        await prisma.user.update({ where: { id: session.user.id }, data });
        return { success: true, message: "Account deletion cancelled." } as const;
    } catch (error) {
        console.error("Error cancelling account deletion:", error);
        return { error: { general: "Failed to cancel deletion." } } as const;
    }
}

export async function deleteAccountImmediately() {
    const session = await getUserSession();
    if (!session || !session.user || !session.user.id) {
        return { error: { general: "Unauthorized. Please sign in." } } as const;
    }
    const userId = session.user.id;
    try {
        // Delete dependent records if any (ResetToken and Otp cascade or manual)
        await prisma.$transaction([
            prisma.resetToken.deleteMany({ where: { userId } }),
            prisma.user.delete({ where: { id: userId } }),
        ]);
        return { success: true, message: "Account deleted permanently." } as const;
    } catch (error) {
        console.error("Error deleting account:", error);
        return { error: { general: "Failed to delete account." } } as const;
    }
}

// New account deletion flow actions
export async function requestAccountDeletion({
    email,
    username,
    reason,
}: {
    email: string;
    username?: string;
    reason?: string;
}) {
    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, name: true, username: true },
        });

        if (!user) {
            return { error: { general: "User not found." } } as const;
        }

        // Generate deletion token
        const { randomBytes } = await import("crypto");
        const deletionToken = randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // Store deletion request
        await prisma.user.update({
            where: { id: user.id },
            data: {
                deletionRequestedAt: new Date(),
                deletionToken: deletionToken,
                deletionTokenExpires: expiresAt,
                deletionReason: reason,
            } as any, // Type assertion for new fields not yet in schema
        });

        // Send confirmation email
        const { Resend } = await import("resend");
        const { render } = await import("@react-email/render");
        const { AccountDeletionEmail } = await import("@/components/emails/account-deletion");

        const resend = new Resend(process.env.RESEND_API_KEY);
        const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
        const deletionLink = `${baseUrl}/confirm-deletion?token=${deletionToken}`;

        const emailHtml = await render(
            AccountDeletionEmail({
                username: username || user.username || user.name || "User",
                userEmail: email,
                deletionLink,
                reason,
            })
        );

        const { error: emailError } = await resend.emails.send({
            from: "Cnippet <system@cnippet.dev>",
            to: email,
            subject: "Confirm Your Account Deletion Request",
            html: emailHtml,
        });

        if (emailError) {
            console.error("Failed to send deletion email:", emailError);
            return { error: { general: "Failed to send confirmation email." } } as const;
        }

        return { success: true, message: "Deletion confirmation email sent." } as const;
    } catch (error) {
        console.error("Error requesting account deletion:", error);
        return { error: { general: "Failed to process deletion request." } } as const;
    }
}

export async function confirmAccountDeletion(token: string) {
    try {
        // Find user by deletion token
        const user = await prisma.user.findFirst({
            where: {
                deletionToken: token,
                deletionTokenExpires: { gt: new Date() },
            },
            select: { id: true },
        });

        if (!user) {
            return { error: { general: "Invalid or expired deletion token." } } as const;
        }

        // Delete the account
        await prisma.$transaction([
            prisma.resetToken.deleteMany({ where: { userId: user.id } }),
            prisma.user.delete({ where: { id: user.id } }),
        ]);

        return { success: true, message: "Account deleted successfully." } as const;
    } catch (error) {
        console.error("Error confirming account deletion:", error);
        return { error: { general: "Failed to delete account." } } as const;
    }
}   