import React from "react";

export default function InvoicePrintView({ order }) {
  if (!order) return null;

  return (
    <div id="print-receipt-container" className="d-none d-print-block">
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h3 style={{ marginBottom: 4 }}>Tesla Coffee</h3>
        <p style={{ fontSize: 13, margin: "2px 0" }}>
          فاتورة طلب طاولة رقم {order.tableNumber}
        </p>
        <p style={{ fontSize: 11, color: "#555" }}>
          تاريخ الطلب: {new Date(order.createdAt).toLocaleString("ar-JO")}
        </p>
      </div>
      <hr style={{ borderTop: "1px dashed black" }} />
      <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid black" }}>
            <th style={{ textAlign: "right", padding: "5px 0" }}>المنتج</th>
            <th style={{ textAlign: "center" }}>الكمية</th>
            <th style={{ textAlign: "left" }}>السعر</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, idx) => (
            <tr key={idx} style={{ borderBottom: "1px dashed #eee" }}>
              <td style={{ padding: "8px 0" }}>{item.name}</td>
              <td style={{ textAlign: "center" }}>{item.quantity}</td>
              <td style={{ textAlign: "left" }}>{item.price * item.quantity} د.أ</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr style={{ borderTop: "1px dashed black" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          fontSize: 15,
        }}
      >
        <span>المجموع الكلي:</span>
        <span>{order.totalPrice} د.أ</span>
      </div>
      {order.notes && (
        <div style={{ marginTop: 15, fontSize: 12, fontStyle: "italic" }}>
          <strong>ملاحظات:</strong> {order.notes}
        </div>
      )}
      <hr style={{ borderTop: "1px dashed black" }} />
      <p style={{ textAlign: "center", fontSize: 12, marginTop: 20 }}>
        شكرًا لزيارتكم!
      </p>
    </div>
  );
}
