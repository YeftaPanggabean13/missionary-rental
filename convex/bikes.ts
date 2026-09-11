import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("bikes").collect();
  },
});

export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bikes")
      .withIndex("by_bike_id", (q) => q.eq("id", args.id))
      .first();
  },
});

export const updateStatus = mutation({
  args: { id: v.string(), status: v.string() },
  handler: async (ctx, args) => {
    const bike = await ctx.db
      .query("bikes")
      .withIndex("by_bike_id", (q) => q.eq("id", args.id))
      .first();

    if (!bike) throw new Error("Motor tidak ditemukan");
    await ctx.db.patch(bike._id, { status: args.status });
    return { success: true };
  },
});

export const addBike = mutation({
  args: {
    id: v.string(),
    make: v.string(),
    model: v.string(),
    year: v.number(),
    category: v.string(),
    area: v.string(),
    platNomor: v.string(),
    dailyRate: v.number(),
    status: v.string(),
    engineDisplacement: v.optional(v.string()),
    fuelConsumption: v.optional(v.string()),
    transmission: v.optional(v.string()),
    unitCondition: v.optional(v.string()),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const newId = await ctx.db.insert("bikes", args);
    return { success: true, id: newId };
  },
});

export const updateBike = mutation({
  args: {
    id: v.string(),
    make: v.optional(v.string()),
    model: v.optional(v.string()),
    year: v.optional(v.number()),
    category: v.optional(v.string()),
    area: v.optional(v.string()),
    platNomor: v.optional(v.string()),
    dailyRate: v.optional(v.number()),
    status: v.optional(v.string()),
    engineDisplacement: v.optional(v.string()),
    fuelConsumption: v.optional(v.string()),
    transmission: v.optional(v.string()),
    unitCondition: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const bike = await ctx.db
      .query("bikes")
      .withIndex("by_bike_id", (q) => q.eq("id", args.id))
      .first();

    if (!bike) throw new Error("Motor tidak ditemukan");
    const { id, ...updates } = args;
    await ctx.db.patch(bike._id, updates);
    return { success: true };
  },
});

export const deleteBike = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const bike = await ctx.db
      .query("bikes")
      .withIndex("by_bike_id", (q) => q.eq("id", args.id))
      .first();

    if (!bike) throw new Error("Motor tidak ditemukan");
    await ctx.db.delete(bike._id);
    return { success: true };
  },
});

export const seedBikes = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("bikes").collect();
    if (existing.length > 0) return { count: existing.length, message: "Sudah terisi" };

    const initialBikes = [
      {
        id: "misi-beat",
        make: "Honda",
        model: "BeAT eSP",
        year: 2023,
        category: "Matic Harian",
        area: "Stasiun Bandung & Pasteur",
        platNomor: "D 2841 MSN",
        dailyRate: 85000,
        status: "TERSEDIA",
        engineDisplacement: "110 cc eSP",
        fuelConsumption: "60.6 km/l",
        transmission: "Otomatis",
        unitCondition: "Prima & Bersih",
        description: "Skutik terlaris dan paling lincah di Bandung. Sangat hemat bahan bakar.",
        image: "/img/beat.jpg",
      },
      {
        id: "misi-scoopy",
        make: "Honda",
        model: "Scoopy Prestige",
        year: 2024,
        category: "Matic Harian",
        area: "Dago & Braga Heritage",
        platNomor: "D 4912 MSN",
        dailyRate: 95000,
        status: "DISEWA",
        engineDisplacement: "110 cc Smart Key",
        fuelConsumption: "59 km/l",
        transmission: "Otomatis",
        unitCondition: "Favorit Wisatawan",
        description: "Desain retro fashionable yang sangat digemari muda-mudi Bandung.",
        image: "/img/scoppy.jpg",
      },
      {
        id: "misi-vario",
        make: "Honda",
        model: "Vario 125 CBS ISS",
        year: 2023,
        category: "Matic Harian",
        area: "Stasiun Whoosh & Padalarang",
        platNomor: "D 3381 MSN",
        dailyRate: 110000,
        status: "TERSEDIA",
        engineDisplacement: "125 cc eSP",
        fuelConsumption: "51.7 km/l",
        transmission: "Otomatis",
        unitCondition: "Tanggap & Bertenaga",
        description: "Skutik serbaguna dengan bagasi luas helm-in dan tenaga mantap.",
        image: "/img/vari.jpg",
      },
      {
        id: "misi-aerox",
        make: "Yamaha",
        model: "Aerox 155 Connected",
        year: 2024,
        category: "Maxi Scooter",
        area: "Lembang & Bandung Utara",
        platNomor: "D 5109 MSN",
        dailyRate: 135000,
        status: "TERSEDIA",
        engineDisplacement: "155 cc VVA",
        fuelConsumption: "45 km/l",
        transmission: "Otomatis",
        unitCondition: "Sporty & Kencang",
        description: "Maxi scooter sporty bertenaga 155cc VVA, sangat tangguh melibas tanjakan Lembang.",
        image: "/img/aerox.jpg",
      },
      {
        id: "misi-nmax",
        make: "Yamaha",
        model: "NMAX 155 Connected",
        year: 2024,
        category: "Maxi Scooter",
        area: "Ciwidey & Garasi Pasirkaliki",
        platNomor: "D 6042 MSN",
        dailyRate: 140000,
        status: "TERSEDIA",
        engineDisplacement: "155 cc VVA ABS",
        fuelConsumption: "43 km/l",
        transmission: "Otomatis",
        unitCondition: "Mewah & Sangat Nyaman",
        description: "Kenyamanan berkendara touring terbaik untuk perjalanan jauh rute Ciwidey atau Pangalengan.",
        image: "/img/nmax.jpg",
      },
    ];

    for (const bike of initialBikes) {
      await ctx.db.insert("bikes", bike);
    }

    return { count: initialBikes.length, message: "Berhasil seed armada motor" };
  },
});
