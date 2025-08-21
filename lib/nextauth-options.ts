import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import {
    getUserByEmail,
    signInWithCredentials,
    signInWithOauth,
    sendSignInAlertEmail,
} from "./actions/auth.actions";

// Extend the built-in session types
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            provider?: string | null;
            username?: string | null;
            preferredTheme?: string | null;
            emailNotifications?: boolean | null;
            inAppNotifications?: boolean | null;
            preferredLanguage?: string | null;
            preferredTimezone?: string | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        provider?: string | null;
        username?: string | null;
        preferredTheme?: string | null;
        emailNotifications?: boolean | null;
        inAppNotifications?: boolean | null;
        preferredLanguage?: string | null;
        preferredTimezone?: string | null;
    }
}

export const nextauthOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign_in",
        // error: "/sign_in",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", required: true },
                password: {
                    label: "Password",
                    type: "password",
                    required: true,
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const result = await signInWithCredentials({
                    email: credentials.email,
                    password: credentials.password,
                });

                if (!result.success || !result.data?.id) {
                    // Return null instead of throwing error to prevent redirect
                    return null;
                }

                return {
                    id: result.data.id,
                    name: result.data.name || null,
                    email: result.data.email || null,
                };
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile }) {
            // Handle credentials login
            if (account?.provider === "credentials") {
                if (!user) {
                    // Credentials failed - stay on sign-in page
                    return false;
                }
                // Fire-and-forget sign-in alert email with request metadata
                // We intentionally do not block sign-in if email fails
                sendSignInAlertEmail({
                    email: user.email || "",
                    username: user.name,
                });
                return true;
            }

            // Handle OAuth login
            if (account?.type === "oauth" && profile) {
                const result = await signInWithOauth({ account, profile });
                // If user exists but has no username, mark as needs completion
                if (result.success && result.data) {
                    // Attach needsCompletion to user for jwt callback
                    //eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (user as any).needsCompletion = !result.data.username;
                }
                // Send sign-in alert on successful OAuth sign-in
                if (result.success && result.data?.email) {
                    sendSignInAlertEmail({
                        email: result.data.email,
                        username: result.data.name,
                    });
                }
                return !!result.success; // Always return boolean
            }
            return true;
        },
        async jwt({ token, trigger, session, account, user }) {
            // Add provider information to token
            if (account?.provider) {
                token.provider = account.provider;
            }

            if (trigger === "update" && session) {
                // Handle updates from the session
                return { ...token, ...session };
            }

            if (token.email) {
                const userData = await getUserByEmail(token.email);
                if (userData) {
                    token.id = userData._id;
                    token.name = userData.name;
                    token.email = userData.email;
                    token.provider = token.provider || userData.provider;
                    token.image = userData.image;
                    token.username = userData.username;
                    token.preferredTheme = userData.preferredTheme;
                    token.emailNotifications = userData.emailNotifications;
                    token.inAppNotifications = userData.inAppNotifications;
                    token.preferredLanguage = userData.preferredLanguage;
                    token.preferredTimezone = userData.preferredTimezone;
                    token.needsCompletion = !userData.username;
                }
            }
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (user && (user as any).needsCompletion !== undefined) {
                //eslint-disable-next-line @typescript-eslint/no-explicit-any
                token.needsCompletion = (user as any).needsCompletion;
            }
            return token;
        },
        async session({ token, session }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.provider = token.provider as string;
                session.user.image = token.image as string;
                session.user.username = token.username as string | null;
                session.user.preferredTheme = token.preferredTheme as
                    | string
                    | null;
                session.user.emailNotifications = token.emailNotifications as
                    | boolean
                    | null;
                session.user.inAppNotifications = token.inAppNotifications as
                    | boolean
                    | null;
                session.user.preferredLanguage = token.preferredLanguage as
                    | string
                    | null;
                session.user.preferredTimezone = token.preferredTimezone as
                    | string
                    | null;
                session.needsCompletion = token.needsCompletion as
                    | boolean
                    | undefined;
            }
            return session;
        },
    },
};
