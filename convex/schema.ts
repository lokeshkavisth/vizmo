import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    uid: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.string(),
  }).index("by_uid", ["uid"]),

  rooms: defineTable({
    _id: v.id("rooms"),
    title: v.string(),
    uid: v.string(),
    email: v.string(),
    username: v.string(),
    category: v.string(),
  }).index("by_title", ["title"]),
});
