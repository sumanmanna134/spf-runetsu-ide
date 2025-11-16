import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

export async function getConvexUser() {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const user = await currentUser();

    if(!user?.id) return null;

    const convexUser = await convex.query(api.users.getUser, {
    userId: user.id,
    });

    return convexUser;

}