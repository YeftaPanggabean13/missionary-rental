import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bikes: defineTable({
    id: v.string(), // e.g. "misi-beat"
    make: v.string(),
    model: v.string(),
    year: v.number(),
    category: v.string(),
    area: v.string(),
    platNomor: v.string(),
    dailyRate: v.number(),
    status: v.string(), // "TERSEDIA" | "DISEWA" | "SERVIS"
    engineDisplacement: v.optional(v.string()),
    fuelConsumption: v.optional(v.string()),
    transmission: v.optional(v.string()),
    unitCondition: v.optional(v.string()),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
  }).index("by_bike_id", ["id"]),

  bookings: defineTable({
    bookingCode: v.string(), // "MSN-0001"
    customerName: v.string(),
    customerPhone: v.string(),
    bikeId: v.string(),
    bikeName: v.string(),
    startDate: v.string(),
    rentalDays: v.number(),
    pickupLocation: v.string(),
    pickupAddress: v.string(),
    extraHelm: v.number(),
    dailyRate: v.number(),
    totalAmount: v.number(),
    paymentStatus: v.string(), // "BELUM_BAYAR" | "DP_50" | "LUNAS"
    status: v.string(), // "PENDING" | "CONFIRMED" | "DELIVERED" | "COMPLETED" | "CANCELLED"
    notes: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_code", ["bookingCode"])
    .index("by_phone", ["customerPhone"]),

  admin_sessions: defineTable({
    token: v.string(),
    createdAt: v.string(),
    expiresAt: v.string(),
  }).index("by_token", ["token"]),
});
