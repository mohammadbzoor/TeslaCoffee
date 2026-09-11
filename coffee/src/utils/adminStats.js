export function calculateTotalRevenue(orders) {
  return orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
}

export function calculateCompletedOrders(orders) {
  return orders.filter((order) => order.status === "تم الإنجاز").length;
}

export function calculatePendingOrders(orders) {
  return orders.filter((order) => order.status === "جديد").length;
}

export function calculateActiveTables(orders) {
  // Number of active unique tables that currently have "جديد" status
  const pendingOrders = orders.filter((order) => order.status === "جديد");
  const uniqueTables = new Set(pendingOrders.map((order) => order.tableNumber));
  return uniqueTables.size;
}

export function groupOrdersByDate(orders) {
  const summaryMap = {};
  orders.forEach((order) => {
    const day = order.date || new Date(order.createdAt).toLocaleDateString("en-CA");
    if (!summaryMap[day]) {
      summaryMap[day] = {
        date: day,
        ordersCount: 0,
        totalSales: 0,
        orderIds: [],
      };
    }
    summaryMap[day].ordersCount += 1;
    summaryMap[day].totalSales += order.totalPrice || 0;
    summaryMap[day].orderIds.push(order.id);
  });

  return Object.values(summaryMap).sort((a, b) => b.date.localeCompare(a.date));
}
