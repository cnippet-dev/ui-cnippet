import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.redirect(
                new URL("/confirm-deletion?error=missing-deletion-token", request.url)
            );
        }

        // Redirect to the confirm-deletion page with the token
        // The page will handle the actual deletion process
        return NextResponse.redirect(
            new URL(`/confirm-deletion?token=${token}`, request.url)
        );
    } catch (error) {
        console.error("Account deletion confirmation error:", error);
        return NextResponse.redirect(
            new URL("/confirm-deletion?error=deletion-failed&message=An unexpected error occurred", request.url)
        );
    }
}
