import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const saveExecution = mutation({
    args: {
        language: v.string(),
        code: v.string(),

        //we could have either one of them or both
        output: v.optional(v.string()),
        error: v.optional(v.string())
    },
    handler: async(ctx,args)=>{
        //user auth?
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new ConvexError("user not authenticated");

        //check user has premium or not
        const user = await ctx.db.query("users").withIndex("by_user_id")
        .filter((q)=>q.eq(q.field("userId"), identity.subject))
        .first();
        
        if(!user?.isPro && args.language!=="javascript"){
            throw new ConvexError("Pro subscription required");

        }
        await ctx.db.insert("codeExecutions", {
            ...args,
            userId: identity.subject
        })
        
    }
})