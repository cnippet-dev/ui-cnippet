"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { nextauthOptions } from "../nextauth-options";
import { getServerSession } from "next-auth/next";
import { Account, Profile } from "next-auth";
import { Resend } from "resend";
import { generateResetToken } from "@/lib/utils";
import { ResetPasswordEmail } from "@/components/emails/reset-password";
import { render } from "@react-email/components";
import { SignInEmail } from "@/components/emails/sign-in";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

type User = {
    id: string;
    name: string | null;
    email: string | null;
    password?: string;
    username?: string | null;
    termsAccepted?: boolean;
    createdAt: Date;
    updatedAt: Date;
};

type AuthResult = {
    success?: boolean;
    data?: Partial<User>;
    error?: string;
};

export async function getUserSession() {
    return await getServerSession(nextauthOptions);
}

export async function completeSocialSignup({
    email,
    username,
    country,
    emailPreferences,
    termsAccepted,
}: {
    email: string;
    username: string;
    country: string;
    emailPreferences: boolean;
    termsAccepted: boolean;
}): Promise<AuthResult> {
    try {
        if (!termsAccepted) {
            return { error: "You must accept the terms and conditions" };
        }

        const usernameCheck = await checkUsername(username);
        if (usernameCheck.exists) {
            return { error: "Username already taken" };
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (!existing) {
            return { error: "No OAuth user found for this email" };
        }
        if (existing.provider === "credentials") {
            return { error: "This email is already registered with password" };
        }

        const updatedUser = await prisma.user.update({
            where: { id: existing.id },
            data: {
                username,
                country,
                emailNotifications: emailPreferences,
                termsAccepted,
            },
        });

        return {
            success: true,
            data: { id: updatedUser.id, username: updatedUser.username },
        };
    } catch (error) {
        console.error("Complete social signup error:", error);
        return { error: "Failed to complete signup" };
    }
}

export async function signUpWithCredentials({
    name,
    email,
    password,
    username,
    country,
    termsAccepted,
    emailPreferences,
}: {
    name: string;
    email: string;
    password: string;
    username: string;
    country: string;
    termsAccepted: boolean;
    emailPreferences: boolean;
}): Promise<AuthResult> {
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return { error: "User already exists" };

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                name,
                email,
                password: hashedPassword,
                country,
                emailVerified: new Date(), // Set to current timestamp since user verified via OTP
                termsAccepted,
                emailNotifications: emailPreferences,
                provider: "credentials",
            },
        });

        return { success: true, data: { id: user.id } };
    } catch (error) {
        console.error("Signup error:", error);
        return { error: "Registration failed" };
    }
}

export async function signInWithCredentials({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<AuthResult> {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return { error: "Invalid credentials" };
        if (!user.password)
            return { error: "Account created with social provider" };

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return { error: "Invalid credentials" };

        return {
            success: true,
            data: { id: user.id, name: user.name, email: user.email },
        };
    } catch (error) {
        console.error("Signin error:", error);
        return { error: "Login failed" };
    }
}

export async function resetPassword({
    token,
    newPassword,
}: {
    token: string;
    newPassword: string;
}): Promise<AuthResult> {
    try {
        const resetToken = await prisma.resetToken.findFirst({
            where: { token, expires: { gt: new Date() } },
            include: { user: true },
        });

        if (!resetToken) return { error: "Invalid or expired token" };

        const isSamePassword = await bcrypt.compare(
            newPassword,
            resetToken.user.password || "",
        );
        if (isSamePassword) {
            return {
                error: "New password cannot be the same as current password",
            };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.$transaction([
            prisma.user.update({
                where: { id: resetToken.userId },
                data: { password: hashedPassword },
            }),
            prisma.resetToken.delete({ where: { id: resetToken.id } }),
        ]);

        return {
            success: true,
            data: { id: resetToken.user.id, email: resetToken.user.email },
        };
    } catch (error) {
        console.error("Password reset error:", error);
        return { error: "Password reset failed" };
    }
}

export async function sendResetEmail(email: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return { error: "No user found" };

        const resetToken = await generateResetToken(user.id);
        const resetLink = `${process.env.NEXT_PUBLIC_URL}/reset_password?token=${resetToken}`;

        try {
            const emailHtml = await render(
                ResetPasswordEmail({ userEmail: user.email!, resetLink }),
            );

            await resend.emails.send({
                from: "Cnippet <system@cnippet.dev>",
                to: email,
                subject: "Password Reset Request",
                html: emailHtml,
            });
            return { success: true, data: { email: user.email } };
        } catch (error) {
            console.error("Email sending error:", error);
            return { error: "Failed to send email" };
        }
    } catch (error) {
        console.error("Reset email error:", error);
        return { error: "Reset email failed" };
    }
}

export async function sendSignInAlertEmail({
    email,
    username,
}: {
    email: string;
    username?: string | null;
}) {
    try {
        const meta = await getRequestMeta();

        const timeFormatter = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC",
        });
        const time = `${timeFormatter.format(new Date())} UTC`;

        const emailHtml = await render(
            SignInEmail({
                username: username || email.split("@")[0],
                userEmail: email,
                time,
                browser: meta.browser || meta.userAgent || "Unknown",
                ip: meta.ip || "Unknown",
                location: meta.location || "Unknown",
                userAgent: meta.userAgent || "Unknown",
            }),
        );

        await resend.emails.send({
            from: "Cnippet <notifications@cnippet.dev>",
            to: email,
            subject: "New sign-in detected on your Cnippet account",
            html: emailHtml,
        });
        return { success: true };
    } catch (error) {
        console.error("Sign-in email error:", error);
        return { success: false };
    }
}

function parseUserAgent(userAgent: string) {
    const browserMatch = userAgent.match(
        /(Chrome|Firefox|Safari|Edge)\/([0-9.]+)/,
    );
    const osMatch = userAgent.match(/(Windows NT|Mac OS X|Linux) ([0-9._]+)/);

    return {
        browser: {
            name: browserMatch ? browserMatch[1] : "Unknown",
            version: browserMatch ? browserMatch[2] : "",
        },
        os: {
            name: osMatch ? osMatch[1] : "Unknown",
            version: osMatch ? osMatch[2] : "",
        },
    };
}

export async function checkUsernameAvailability(
    username: string,
): Promise<{ available: boolean; error?: string }> {
    try {
        if (!username || username.length < 3) {
            return {
                available: false,
                error: "Username must be at least 3 characters long",
            };
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return {
                available: false,
                error: "Username can only contain letters, numbers, and underscores",
            };
        }

        const existingUser = await prisma.user.findUnique({
            where: { username },
        });
        return { available: !existingUser };
    } catch (error) {
        console.error("Username check error:", error);
        return {
            available: false,
            error: "Failed to check username availability",
        };
    }
}

export async function checkUsername(username: string) {
    try {
        const existingUser = await prisma.user.findFirst({
            where: { username },
        });
        return { exists: !!existingUser };
    } catch (error) {
        console.error("Error checking username:", error);
        return { exists: false, error: "Error checking username" };
    }
}

export async function checkEmail(email: string) {
    try {
        const existingUser = await prisma.user.findFirst({ where: { email } });
        return { exists: !!existingUser };
    } catch (error) {
        console.error("Error checking email:", error);
        return { exists: false, error: "Error checking email" };
    }
}

async function getRequestMeta() {
    try {
        const headersList = await headers();
        const userAgent = headersList.get("user-agent") || "";
        const xff = headersList.get("x-forwarded-for") || "";

        const ip = (
            xff.split(",")[0] ||
            headersList.get("x-real-ip") ||
            ""
        ).trim();

        let location = "Unknown";

        // Fetch location information from IP
        if (ip && ip !== "::1" && ip !== "127.0.0.1") {
            try {
                // Using ipapi.co API (free tier available)
                const response = await fetch(`https://ipapi.co/${ip}/json/`);
                const data = await response.json();

                if (data && !data.error) {
                    location = `${data.city || ""}${data.city && data.region ? ", " : ""}${data.region || ""}${(data.city || data.region) && data.country_name ? ", " : ""}${data.country_name || ""}`;

                    if (!location.trim()) {
                        location = "Unknown";
                    }
                }
            } catch (error) {
                console.error("Error fetching location from IP:", error);
            }
        } else if (ip === "::1" || ip === "127.0.0.1") {
            location = "Localhost";
        }

        const parsed = userAgent ? parseUserAgent(userAgent) : null;
        const browser = parsed
            ? `${parsed.browser.name}${parsed.browser.version ? " " + parsed.browser.version : ""}`
            : "";

        return { ip, userAgent, browser, location };
    } catch (error) {
        return { ip: "", userAgent: "", browser: "", location: "Unknown" };
    }
}

// Add these new functions to handle linked accounts

export async function linkOAuthAccount({
    userId,
    provider,
    providerAccountId,
}: {
    userId: string;
    provider: string;
    providerAccountId: string;
}): Promise<AuthResult> {
    try {
        // Check if this provider account is already linked to any user
        const existingLink = await prisma.linkedAccount.findUnique({
            where: {
                provider_providerAccountId: {
                    provider,
                    providerAccountId,
                },
            },
        });

        if (existingLink) {
            return { error: "This account is already linked to another user" };
        }

        // Check if user already has this provider linked
        const userExistingLink = await prisma.linkedAccount.findUnique({
            where: {
                userId_provider: {
                    userId,
                    provider,
                },
            },
        });

        if (userExistingLink) {
            return { error: "This provider is already linked to your account" };
        }

        // Create the link
        await prisma.linkedAccount.create({
            data: {
                userId,
                provider,
                providerAccountId,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error linking account:", error);
        return { error: "Failed to link account" };
    }
}

export async function unlinkOAuthAccount({
    userId,
    provider,
}: {
    userId: string;
    provider: string;
}): Promise<AuthResult> {
    try {
        // Check if user has at least one other login method
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { linkedAccounts: true },
        });

        if (!user) {
            return { error: "User not found" };
        }

        // Can't unlink if it's the only login method and no password set
        if (
            user.provider === provider &&
            !user.password &&
            user.linkedAccounts.length <= 1
        ) {
            return {
                error: "Cannot unlink your only login method. Please set a password first.",
            };
        }

        await prisma.linkedAccount.delete({
            where: {
                userId_provider: {
                    userId,
                    provider,
                },
            },
        });

        // If this was the main provider, update the main provider field
        if (user.provider === provider) {
            const remainingAccounts = user.linkedAccounts.filter(
                (acc) => acc.provider !== provider,
            );

            if (remainingAccounts.length > 0) {
                // Set the first remaining account as the main provider
                await prisma.user.update({
                    where: { id: userId },
                    data: { provider: remainingAccounts[0].provider },
                });
            } else if (user.password) {
                // Fall back to credentials
                await prisma.user.update({
                    where: { id: userId },
                    data: { provider: "credentials" },
                });
            } else {
                // This shouldn't happen due to our check above
                return { error: "Cannot remove the only login method" };
            }
        }

        return { success: true };
    } catch (error) {
        console.error("Error unlinking account:", error);
        return { error: "Failed to unlink account" };
    }
}

export async function getUserLinkedAccounts(userId: string) {
    try {
        const accounts = await prisma.linkedAccount.findMany({
            where: { userId },
            select: {
                id: true,
                provider: true,
                providerAccountId: true,
                // createdAt: true,
            },
        });

        return accounts;
    } catch (error) {
        console.error("Error fetching linked accounts:", error);
        return [];
    }
}

// Update the signInWithOauth function to handle account linking
export async function signInWithOauth({
    account,
    profile,
}: {
    account: Account;
    profile: Profile & { picture?: string };
}) {
    try {
        // First, try to find user by the OAuth account
        const linkedAccount = await prisma.linkedAccount.findUnique({
            where: {
                provider_providerAccountId: {
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                },
            },
            include: { user: true },
        });

        if (linkedAccount) {
            return {
                success: true,
                data: {
                    id: linkedAccount.user.id,
                    name: linkedAccount.user.name,
                    email: linkedAccount.user.email,
                    username: linkedAccount.user.username,
                },
            };
        }

        // If no linked account found, try to find by email
        if (profile.email) {
            const user = await prisma.user.findUnique({
                where: { email: profile.email },
                include: { linkedAccounts: true },
            });

            if (user) {
                // Link this OAuth account to the existing user
                await prisma.linkedAccount.create({
                    data: {
                        userId: user.id,
                        provider: account.provider,
                        providerAccountId: account.providerAccountId,
                    },
                });

                // Update provider if this is the first OAuth account
                if (
                    user.provider === "credentials" &&
                    user.linkedAccounts.length === 0
                ) {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { provider: account.provider },
                    });
                }

                return {
                    success: true,
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                    },
                };
            }
        }

        // Create new user if no existing user found
        const newUser = await prisma.user.create({
            data: {
                name: profile.name || "",
                username: "",
                email: profile.email || "",
                image: profile.picture,
                provider: account.provider,
                emailVerified: new Date(),
            },
        });

        // Create linked account record
        await prisma.linkedAccount.create({
            data: {
                userId: newUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
            },
        });

        return {
            success: true,
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
        };
    } catch (error) {
        return { success: false, error: `OAuth signin failed ${error}` };
    }
}
