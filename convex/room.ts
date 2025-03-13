import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new new Room
export const createNewRoom = mutation({
  args: {
    title: v.string(),
    uid: v.string(),
    email: v.string(),
    username: v.string(),
    category: v.string(),
  },

  handler: async (ctx, args) => {
    const room = await ctx.db.insert("rooms", {
      title: args.title,
      uid: args.uid,
      email: args.email,
      username: args.username,
      category: args.category,
    });

    return room;
  },
});

// Get a room by room _id
export const getRoomById = query({
  args: {
    roomId: v.id("rooms"),
  },
  handler: async (ctx, args) => {
    const meeting = await ctx.db.get(args.roomId);
    return meeting;
  },
});

// Get all rooms
export const getAllRooms = query({
  handler: async (ctx) => {
    const rooms = await ctx.db.query("rooms").order("desc").take(100);
    return rooms;
  },
});

// Delete a room by room id
export const deleteRoomById = mutation({
  args: {
    roomId: v.id("rooms"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.roomId);
  },
});
