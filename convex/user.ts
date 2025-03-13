import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    uid: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // check if user exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .first();

    if (user) {
      return user._id;
    }

    const userId = await ctx.db.insert("users", {
      uid: args.uid,
      email: args.email,
      name: args.name,
      imageUrl: args.imageUrl,
    });

    return userId;
  },
});

export const getUser = query({
  args: {
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .first();
    return user;
  },
});
