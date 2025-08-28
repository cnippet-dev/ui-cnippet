import { z } from "zod";

const ALLOWED_EMAIL_DOMAINS = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "protonmail.com",
];

// Step 1 validation
export const Step1Schema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z
        .string()
        .email("Invalid email address")
        .refine((email) => {
            // Check if email contains only allowed special characters (. and @)
            const specialChars = email.replace(/[a-zA-Z0-9]/g, "");
            const allowedSpecialChars = new Set([".", "@"]);
            for (const char of specialChars) {
                if (!allowedSpecialChars.has(char)) {
                    return false;
                }
            }
            return true;
        }, "Email can only contain letters, numbers, dots (.) and @ symbol")
        .refine((email) => {
            const domain = email.split("@")[1];
            return ALLOWED_EMAIL_DOMAINS.includes(domain);
        }, "Please use a supported email provider"),
});

// Step 2 validation
export const Step2Schema = z.object({
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Requires at least one uppercase letter")
        .regex(/[0-9]/, "Requires at least one number"),
});

// Step 3 validation
export const Step3Schema = z.object({
    otp: z.string().length(6, "OTP must be 6 characters"),
});

// Update SignUpSchema to include new fields
export const SignUpSchema = z
    .object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters")
            .optional(),
        email: z
            .string()
            .email("Invalid email address")
            .refine((email) => {
                const specialChars = email.replace(/[a-zA-Z0-9]/g, "");
                const allowedSpecialChars = new Set([".", "@"]);
                for (const char of specialChars) {
                    if (!allowedSpecialChars.has(char)) {
                        return false;
                    }
                }
                return true;
            }, "Email can only contain letters, numbers, dots (.) and @ symbol")
            .refine((email) => {
                const domain = email.split("@")[1];
                return ALLOWED_EMAIL_DOMAINS.includes(domain);
            }, "Please use a supported email provider"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Requires at least one uppercase letter")
            .regex(/[0-9]/, "Requires at least one number")
            .optional()
            .or(z.literal("")), // Allow empty for social signup
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be at most 20 characters")
            .regex(
                /^[a-zA-Z0-9_-]+$/,
                "Username can only contain letters, numbers, hyphens, and underscores",
            )
            .refine(
                (username) =>
                    !username.startsWith("-") && !username.endsWith("-"),
                "Username cannot begin or end with a hyphen",
            ),
        country: z.string().min(1, "Country is required"),
        otp: z.string().length(6, "OTP must be 6 characters").optional(),
        termsAccepted: z
            .boolean()
            .refine(
                (val) => val === true,
                "You must accept the terms and conditions",
            ),
        emailPreferences: z.boolean().default(false),
    })
    .refine(
        (data) => {
            // Only validate password for non-social signup
            if (!data.password) return true;
            return !data.password
                .toLowerCase()
                .includes(data.email.toLowerCase());
        },
        {
            message: "Password must not contain your email address",
            path: ["password"],
        },
    );
