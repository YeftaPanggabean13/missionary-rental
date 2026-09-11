import { query } from "./_generated/server";

export const getMetrics = query({
  args: {},
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookings").collect();
    const bikes = await ctx.db.query("bikes").collect();

    const totalRevenue = bookings
      .filter((b) => b.paymentStatus === "LUNAS" || b.paymentStatus === "DP_50")
      .reduce(
        (sum, b) =>
          sum + (b.paymentStatus === "DP_50" ? b.totalAmount * 0.5 : b.totalAmount),
        0
      );

    const activeRentals = bookings.filter(
      (b) => b.status === "DELIVERED" || b.status === "CONFIRMED"
    ).length;
    const pendingBookings = bookings.filter((b) => b.status === "PENDING").length;
    const completedBookings = bookings.filter((b) => b.status === "COMPLETED").length;

    const totalBikes = bikes.length;
    const bikesInUse = bikes.filter((b) => b.status === "DISEWA").length;
    const occupancyRate = totalBikes > 0 ? Math.round((bikesInUse / totalBikes) * 100) : 0;

    return {
      totalRevenue,
      activeRentals,
      pendingBookings,
      totalBikes,
      bikesInUse,
      completedBookings,
      occupancyRate,
    };
  },
});

export const getAnalyticsData = query({
  args: {},
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookings").collect();
    const bikes = await ctx.db.query("bikes").collect();

    // 7 days trend
    const revenueTrend: {
      date: string;
      displayDate: string;
      revenue: number;
      bookingsCount: number;
    }[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const displayDate = d.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
      });
      const dayBookings = bookings.filter((b) => b.startDate === dateStr);
      const revenue = dayBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
      revenueTrend.push({
        date: dateStr,
        displayDate,
        revenue,
        bookingsCount: dayBookings.length,
      });
    }

    const bikeStats: Record<string, { trips: number; revenue: number }> = {};
    bikes.forEach((b) => {
      bikeStats[b.id] = { trips: 0, revenue: 0 };
    });

    bookings.forEach((b) => {
      if (!bikeStats[b.bikeId]) bikeStats[b.bikeId] = { trips: 0, revenue: 0 };
      bikeStats[b.bikeId].trips += 1;
      bikeStats[b.bikeId].revenue += b.totalAmount || 0;
    });

    const topBikes = bikes
      .map((b) => ({
        id: b.id,
        name: `${b.make} ${b.model}`,
        platNomor: b.platNomor,
        category: b.category,
        trips: bikeStats[b.id]?.trips || 0,
        revenue: bikeStats[b.id]?.revenue || 0,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    const categoryStats: Record<string, { count: number; totalRevenue: number }> = {};
    bikes.forEach((b) => {
      const cat = b.category || "Lainnya";
      if (!categoryStats[cat]) categoryStats[cat] = { count: 0, totalRevenue: 0 };
      categoryStats[cat].count += 1;
      categoryStats[cat].totalRevenue += bikeStats[b.id]?.revenue || 0;
    });

    return {
      revenueTrend,
      topBikes,
      categoryBreakdown: Object.entries(categoryStats).map(([category, stats]) => ({
        category,
        unitCount: stats.count,
        totalRevenue: stats.totalRevenue,
      })),
    };
  },
});
