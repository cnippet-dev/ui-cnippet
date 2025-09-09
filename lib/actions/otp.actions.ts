"use server";
import prisma from "@/lib/prisma";
import { render } from "@react-email/render";
import { OTPEmail } from "@/components/emails/otp-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const MAX_ATTEMPTS = 5;

const OTP_EXPIRATION_MINUTES = 10;
const MAX_OTP_PER_HOUR = 3;

function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function storeOTP(email: string, otp: string) {
    try {
        const expiresAt = new Date(
            Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000,
        );

        return await prisma.otp.upsert({
            where: { email },
            update: {
                code: otp,
                expiresAt,
                attempts: 0,
                createdAt: new Date(),
                sentCount: {
                    increment: 1,
                },
                lastSentAt: new Date(),
            },
            create: {
                email,
                code: otp,
                expiresAt,
                attempts: 0,
                sentCount: 1,
                lastSentAt: new Date(),
            },
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to store OTP");
    }
}

export async function sendOTP(email: string) {
    try {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        const existingOtp = await prisma.otp.findUnique({
            where: { email },
        });

        if (existingOtp && existingOtp.sentCount >= MAX_OTP_PER_HOUR) {
            if (existingOtp.lastSentAt && existingOtp.lastSentAt > oneHourAgo) {
                return {
                    error: "You've reached the maximum OTP attempts. Please try again later.",
                };
            } else {
                await prisma.otp.update({
                    where: { email },
                    data: {
                        sentCount: 0,
                    },
                });
            }
        }

        const otp = generateOTP();
        await storeOTP(email, otp);

        const emailHtml = render(OTPEmail({ userEmail: email, otp }));
        const { error } = await resend.emails.send({
            from: "Cnippet <system@cnippet.dev>",
            to: email,
            subject: `${otp} - Cnippet Sign-in Verification`,
            html: await emailHtml,
        });

        if (error) {
            console.error("Resend Error:", error);
            return { error: "Failed to send OTP email. Please try again." };
        }

        return { success: true };
    } catch (error) {
        console.error("OTP Process Error:", error);
        return { error: "OTP process failed. Please try again." };
    }
}

export async function verifyOTP(email: string, otp: string) {
    try {
        const otpRecord = await prisma.otp.findUnique({ where: { email } });

        if (!otpRecord) {
            return {
                error: "OTP not found. Please request a new one.",
                shouldReset: true,
            };
        }

        if (otpRecord.expiresAt < new Date()) {
            await prisma.otp.delete({ where: { email } });
            return {
                error: "OTP expired. Please request a new one.",
                shouldReset: true,
            };
        }

        if (otpRecord.attempts >= MAX_ATTEMPTS) {
            await prisma.otp.delete({ where: { email } });
            return {
                error: "Too many attempts. Please request a new OTP.",
                shouldReset: true,
            };
        }

        if (otpRecord.code !== otp) {
            await prisma.otp.update({
                where: { email },
                data: { attempts: { increment: 1 } },
            });

            const remainingAttempts = MAX_ATTEMPTS - (otpRecord.attempts + 1);
            let errorMsg = "Invalid OTP. Please try again.";

            if (remainingAttempts <= 2) {
                errorMsg += ` ${remainingAttempts} ${remainingAttempts === 1 ? "attempt" : "attempts"} left.`;
            }

            return {
                error: errorMsg,
                shouldReset: false,
            };
        }

        await prisma.otp.delete({ where: { email } });
        return { success: true };
    } catch (error) {
        console.error("Verification Error:", error);
        return {
            error: "OTP verification failed. Please try again.",
            shouldReset: false,
        };
    }
}

export async function deleteOTP(email: string) {
    try {
        await prisma.otp.delete({ where: { email } });
        return { success: true };
    } catch (error) {
        console.error("OTP Deletion Error:", error);
        return { error: "Failed to delete OTP" };
    }
}
