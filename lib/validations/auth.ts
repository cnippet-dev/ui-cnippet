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

// Complete form validation
export const SignUpSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
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
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Requires at least one uppercase letter")
            .regex(/[0-9]/, "Requires at least one number"),
        otp: z.string().length(6, "OTP must be 6 characters"),
        termsAccepted: z.boolean(),
    })
    .refine(
        (data) => {
            return !data.password
                .toLowerCase()
                .includes(data.email.toLowerCase());
        },
        {
            message:
                "The provided password contains the associated user's email address. Passwords must not contain easily guessable user information.",
            path: ["password"],
        },
    );
