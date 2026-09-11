import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const ADMIN_PIN = "misionary2026";

export const login = mutation({
  args: { pin: v.string() },
  handler: async (ctx, args) => {
    if (args.pin.trim() !== ADMIN_PIN) {
      return { success: false, error: "PIN salah. Coba lagi." };
    }

    const token =
      "msn_token_" +
      Math.random().toString(36).substring(2) +
      Date.now().toString(36);

    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    await ctx.db.insert("admin_sessions", {
      token,
      createdAt: now,
      expiresAt,
    });

    return { success: true, token, message: "Login berhasil!" };
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("admin_sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (session) {
      await ctx.db.delete(session._id);
    }

    return { success: true, message: "Logout berhasil" };
  },
});

export const validateSession = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    if (!args.token) return false;
    const session = await ctx.db
      .query("admin_sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    return !!session;
  },
});
