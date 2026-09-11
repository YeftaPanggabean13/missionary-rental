import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("bookings").order("desc").collect();
  },
});

export const track = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const q = args.query.trim().toUpperCase();
    const cleanDigits = args.query.replace(/\D/g, "");

    const byCode = await ctx.db
      .query("bookings")
      .withIndex("by_code", (idx) => idx.eq("bookingCode", q))
      .first();

    if (byCode) return [byCode];

    if (cleanDigits.length >= 4) {
      const all = await ctx.db.query("bookings").collect();
      return all.filter((b) => b.customerPhone.includes(cleanDigits));
    }

    return [];
  },
});

export const create = mutation({
  args: {
    customerName: v.string(),
    customerPhone: v.string(),
    bikeId: v.string(),
    bikeName: v.string(),
    startDate: v.string(),
    rentalDays: v.number(),
    pickupLocation: v.string(),
    pickupAddress: v.optional(v.string()),
    extraHelm: v.number(),
    dailyRate: v.number(),
    totalAmount: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("bookings").collect();
    const nextNum = all.length + 1;
    const bookingCode = "MSN-" + String(nextNum).padStart(4, "0");

    const now = new Date().toISOString().replace("T", " ").substring(0, 19);

    const bookingId = await ctx.db.insert("bookings", {
      bookingCode,
      customerName: args.customerName,
      customerPhone: args.customerPhone.replace(/\D/g, ""),
      bikeId: args.bikeId,
      bikeName: args.bikeName,
      startDate: args.startDate,
      rentalDays: args.rentalDays,
      pickupLocation: args.pickupLocation,
      pickupAddress: args.pickupAddress || "",
      extraHelm: args.extraHelm,
      dailyRate: args.dailyRate,
      totalAmount: args.totalAmount,
      paymentStatus: "BELUM_BAYAR",
      status: "PENDING",
      notes: args.notes || "",
      createdAt: now,
      updatedAt: now,
    });

    return {
      success: true,
      bookingCode,
      id: bookingId,
      message: `Pesanan ${bookingCode} berhasil dibuat! Admin Misionary akan segera menghubungi Anda.`,
    };
  },
});

export const createManual = mutation({
  args: {
    customerName: v.string(),
    customerPhone: v.string(),
    bikeId: v.string(),
    bikeName: v.string(),
    startDate: v.string(),
    rentalDays: v.number(),
    pickupLocation: v.string(),
    pickupAddress: v.optional(v.string()),
    extraHelm: v.number(),
    dailyRate: v.number(),
    totalAmount: v.number(),
    paymentStatus: v.string(),
    status: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("bookings").collect();
    const nextNum = all.length + 1;
    const bookingCode = "MSN-" + String(nextNum).padStart(4, "0");

    const now = new Date().toISOString().replace("T", " ").substring(0, 19);

    const bookingId = await ctx.db.insert("bookings", {
      bookingCode,
      customerName: args.customerName,
      customerPhone: args.customerPhone.replace(/\D/g, ""),
      bikeId: args.bikeId,
      bikeName: args.bikeName,
      startDate: args.startDate,
      rentalDays: args.rentalDays,
      pickupLocation: args.pickupLocation,
      pickupAddress: args.pickupAddress || "",
      extraHelm: args.extraHelm,
      dailyRate: args.dailyRate,
      totalAmount: args.totalAmount,
      paymentStatus: args.paymentStatus,
      status: args.status,
      notes: args.notes || "Booking manual walk-in",
      createdAt: now,
      updatedAt: now,
    });

    // If unit is delivered or confirmed, update bike status to DISEWA
    if (args.status === "DELIVERED" || args.status === "CONFIRMED") {
      const bike = await ctx.db
        .query("bikes")
        .withIndex("by_bike_id", (q) => q.eq("id", args.bikeId))
        .first();
      if (bike) {
        await ctx.db.patch(bike._id, { status: "DISEWA" });
      }
    }

    return { success: true, bookingCode, id: bookingId };
  },
});

export const updateStatus = mutation({
  args: { id: v.id("bookings"), status: v.string() },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.id);
    if (!booking) throw new Error("Pesanan tidak ditemukan");

    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: now,
    });

    // If completed or cancelled, free the bike
    if (args.status === "COMPLETED" || args.status === "CANCELLED") {
      const bike = await ctx.db
        .query("bikes")
        .withIndex("by_bike_id", (q) => q.eq("id", booking.bikeId))
        .first();
      if (bike && bike.status === "DISEWA") {
        await ctx.db.patch(bike._id, { status: "TERSEDIA" });
      }
    } else if (args.status === "DELIVERED") {
      const bike = await ctx.db
        .query("bikes")
        .withIndex("by_bike_id", (q) => q.eq("id", booking.bikeId))
        .first();
      if (bike) {
        await ctx.db.patch(bike._id, { status: "DISEWA" });
      }
    }

    return { success: true };
  },
});

export const updatePayment = mutation({
  args: { id: v.id("bookings"), paymentStatus: v.string() },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.id);
    if (!booking) throw new Error("Pesanan tidak ditemukan");

    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    await ctx.db.patch(args.id, {
      paymentStatus: args.paymentStatus,
      updatedAt: now,
    });

    return { success: true };
  },
});

export const seedBookings = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("bookings").collect();
    if (existing.length > 0) return { count: existing.length, message: "Sudah terisi" };

    const initialBookings = [
      {
        bookingCode: "MSN-0001",
        customerName: "Andi Pratama",
        customerPhone: "08122334455",
        bikeId: "misi-scoopy",
        bikeName: "Honda Scoopy Prestige",
        startDate: "2026-09-11",
        rentalDays: 3,
        pickupLocation: "Stasiun Bandung (Pintu Utara)",
        pickupAddress: "Jl. Kebon Kawung No. 43",
        extraHelm: 1,
        dailyRate: 95000,
        totalAmount: 285000,
        paymentStatus: "LUNAS",
        status: "DELIVERED",
        notes: "Tamu dinas pemda Bandung, antar tepat waktu pukul 08:00 WIB",
        createdAt: "2026-09-10 14:20:00",
        updatedAt: "2026-09-11 08:15:00",
      },
      {
        bookingCode: "MSN-0002",
        customerName: "Siti Nurhaliza",
        customerPhone: "08571122334",
        bikeId: "misi-beat",
        bikeName: "Honda BeAT eSP",
        startDate: "2026-09-12",
        rentalDays: 2,
        pickupLocation: "Stasiun Whoosh Padalarang",
        pickupAddress: "Drop off area Stasiun Kereta Cepat",
        extraHelm: 0,
        dailyRate: 85000,
        totalAmount: 170000,
        paymentStatus: "DP_50",
        status: "CONFIRMED",
        notes: "Tiba dengan Whoosh jam 09.45 WIB",
        createdAt: "2026-09-11 09:10:00",
        updatedAt: "2026-09-11 09:30:00",
      },
      {
        bookingCode: "MSN-0003",
        customerName: "Budi Santoso",
        customerPhone: "08139988776",
        bikeId: "misi-nmax",
        bikeName: "Yamaha NMAX 155 Connected",
        startDate: "2026-09-13",
        rentalDays: 4,
        pickupLocation: "Hotel di Bandung",
        pickupAddress: "Hotel Savoy Homann, Jl. Asia Afrika",
        extraHelm: 1,
        dailyRate: 140000,
        totalAmount: 560000,
        paymentStatus: "BELUM_BAYAR",
        status: "PENDING",
        notes: "Perjalanan dinas ke Soreang",
        createdAt: "2026-09-11 11:45:00",
        updatedAt: "2026-09-11 11:45:00",
      },
      {
        bookingCode: "MSN-0004",
        customerName: "Rian Hidayat",
        customerPhone: "08215566778",
        bikeId: "misi-aerox",
        bikeName: "Yamaha Aerox 155 Connected",
        startDate: "2026-09-08",
        rentalDays: 2,
        pickupLocation: "Garasi Misionary (Pasirkaliki)",
        pickupAddress: "Jl. Pasirkaliki No. 88",
        extraHelm: 0,
        dailyRate: 135000,
        totalAmount: 270000,
        paymentStatus: "LUNAS",
        status: "COMPLETED",
        notes: "Unit kembali tepat waktu, kondisi sangat baik",
        createdAt: "2026-09-08 07:00:00",
        updatedAt: "2026-09-10 18:00:00",
      },
      {
        bookingCode: "MSN-0005",
        customerName: "Dinda Permata",
        customerPhone: "08198877665",
        bikeId: "misi-vario",
        bikeName: "Honda Vario 125 CBS ISS",
        startDate: "2026-09-10",
        rentalDays: 3,
        pickupLocation: "Stasiun Bandung (Pintu Selatan)",
        pickupAddress: "Jl. Stasiun Barat",
        extraHelm: 1,
        dailyRate: 110000,
        totalAmount: 330000,
        paymentStatus: "LUNAS",
        status: "DELIVERED",
        notes: "Wisata belanja & kuliner Riau",
        createdAt: "2026-09-09 16:30:00",
        updatedAt: "2026-09-10 10:00:00",
      },
    ];

    for (const b of initialBookings) {
      await ctx.db.insert("bookings", b);
    }

    return { count: initialBookings.length, message: "Berhasil seed pesanan awal" };
  },
});
