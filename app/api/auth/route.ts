import prisma from "@/lib/prisma";

export async function GET() {
    // Process due deletions: hard-delete users whose deletionScheduledAt <= now
    try {
        const now = new Date();
        const dueUsers = await prisma.user.findMany({
            // @ts-ignore - new fields present after prisma generate
            where: { deletionScheduledAt: { lte: now } },
            select: { id: true },
        });
        if (dueUsers.length > 0) {
            const ids = dueUsers.map((u) => u.id);
            await prisma.$transaction([
                prisma.resetToken.deleteMany({ where: { userId: { in: ids } } }),
                prisma.user.deleteMany({ where: { id: { in: ids } } }),
            ]);
        }
        return new Response(JSON.stringify({ processed: dueUsers.length }), {
            status: 200,
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        console.error("Deletion cron error", error);
        return new Response(JSON.stringify({ error: "failed" }), {
            status: 500,
            headers: { "content-type": "application/json" },
        });
    }
}


