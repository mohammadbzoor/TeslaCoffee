export default function exportOrdersToExcel(orders) {
  if (!orders || orders.length === 0) {
    alert("لا توجد طلبات لتصديرها!");
    return;
  }

  let csvContent = "\uFEFF"; // UTF-8 BOM to support Arabic character rendering in MS Excel
  csvContent += "ID,رقم الطاولة,تاريخ الطلب,عدد المنتجات,المجموع (د.أ),الحالة,ملاحظات\n";

  orders.forEach((o) => {
    const dateStr = new Date(o.createdAt).toLocaleString("ar-JO");
    const itemCount = o.items ? o.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
    csvContent += `"${o.id}","${o.tableNumber}","${dateStr}","${itemCount}","${o.totalPrice}","${o.status}","${o.notes || ""}"\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `تقرير_الطلبات_${new Date().toLocaleDateString("en-CA")}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
