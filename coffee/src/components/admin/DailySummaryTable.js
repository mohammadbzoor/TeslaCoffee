import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaEye, FaTrash } from "react-icons/fa";

export default function DailySummaryTable({ dailySummary, onViewDay, onDeleteDay }) {
  if (dailySummary.length === 0) {
    return (
      <div className="text-center py-5">
        <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
        <h5 className="text-muted">لا يوجد طلبات مسجلة بعد</h5>
        <p className="text-muted">ستظهر هنا بيانات الطلبات عند تسجيلها من قبل الزبائن.</p>
      </div>
    );
  }

  return (
    <Table className="admin-table text-center align-middle" responsive>
      <thead>
        <tr>
          <th>اليوم</th>
          <th>عدد الطلبات</th>
          <th>إجمالي المبيعات</th>
          <th>تفاصيل</th>
          <th>حذف اليوم</th>
        </tr>
      </thead>
      <tbody>
        {dailySummary.map((row) => (
          <tr key={row.date}>
            <td className="fw-bold">{row.date}</td>
            <td>{row.ordersCount}</td>
            <td className="fw-bold" style={{ color: "#1b5e20" }}>
              {row.totalSales.toFixed(1)} د.أ
            </td>
            <td>
              <Button
                variant="primary"
                size="sm"
                className="d-inline-flex align-items-center gap-2"
                onClick={() => onViewDay(row.date)}
              >
                <FaEye /> عرض الطلبات
              </Button>
            </td>
            <td>
              <Button
                variant="outline-danger"
                size="sm"
                className="d-inline-flex align-items-center gap-2"
                onClick={() => onDeleteDay(row.date, row.orderIds)}
              >
                <FaTrash /> حذف اليوم
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
