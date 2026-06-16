import React from "react";
import { Table, Button, Form, Badge } from "react-bootstrap";
import { FaPrint, FaCheck, FaArrowRight } from "react-icons/fa";

export default function OrdersTable({
  filteredOrders,
  selectedDate,
  onDateChange,
  onGoBack,
  backLabel = "الرجوع للملخص اليومي",
  onToggleStatus,
  onSaveNotes,
  onDeleteOrder,
  onPrintOrder,
  onViewDetails,
  tempNotes,
  onNoteChange,
}) {
  return (
    <>
      {/* Header bar */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        {onGoBack ? (
          <Button
            variant="outline-secondary"
            className="d-inline-flex align-items-center gap-2"
            onClick={onGoBack}
          >
            <FaArrowRight /> {backLabel}
          </Button>
        ) : (
          <h4 className="fw-bold m-0">الطلبات</h4>
        )}
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <Form.Group className="d-flex align-items-center gap-2 mb-0">
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              style={{ width: 170 }}
            />
            <Button variant="dark" size="sm">
              تحديث
            </Button>
          </Form.Group>
          <Badge bg="primary" style={{ fontSize: 14, padding: "8px 15px" }}>
            عدد الطلبات: {filteredOrders.length}
          </Badge>
        </div>
      </div>

      {/* Empty state */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: 48, marginBottom: 12 }}>🍽️</div>
          <h5 className="text-muted">لا توجد طلبات لهذا اليوم</h5>
          <p className="text-muted">جرّب اختيار تاريخ آخر أو ارجع للملخص اليومي.</p>
        </div>
      ) : (
        <Table className="admin-table text-center align-middle" responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>رقم الطاولة</th>
              <th>تاريخ الطلب</th>
              <th>عدد المنتجات</th>
              <th>المجموع</th>
              <th>إنجاز الطلب</th>
              <th>تفاصيل المنتجات</th>
              <th>بيانات إضافية</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => {
              const itemCount = order.items
                ? order.items.reduce((sum, item) => sum + item.quantity, 0)
                : 0;
              const orderTime = new Date(order.createdAt).toLocaleTimeString("ar-JO", {
                hour: "2-digit",
                minute: "2-digit",
              });
              const orderDate = new Date(order.createdAt).toLocaleDateString("ar-JO");

              return (
                <tr key={order.id}>
                  <td>{index}</td>
                  <td className="fw-bold text-primary">{order.tableNumber}</td>
                  <td style={{ fontSize: 13 }}>
                    {orderDate} {orderTime}
                  </td>
                  <td>{itemCount}</td>
                  <td className="fw-bold" style={{ color: "#1b5e20" }}>
                    {order.totalPrice} د.أ
                  </td>
                  <td>
                    <button
                      className={`status-badge ${
                        order.status === "جديد" ? "status-new" : "status-completed"
                      }`}
                      style={{ border: "none", cursor: "pointer" }}
                      onClick={() => onToggleStatus(order.id, order.status)}
                    >
                      {order.status === "جديد" ? (
                        "جديد"
                      ) : (
                        <>
                          <FaCheck /> تم الإنجاز
                        </>
                      )}
                    </button>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => onViewDetails(order)}
                    >
                      عرض تفاصيل المنتجات
                    </Button>
                  </td>
                  <td>
                    <div className="note-input-wrapper">
                      <input
                        type="text"
                        placeholder="أدخل ملاحظة على الطلب"
                        value={
                          tempNotes[order.id] !== undefined
                            ? tempNotes[order.id]
                            : order.notes || ""
                        }
                        onChange={(e) => onNoteChange(order.id, e.target.value)}
                      />
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => onSaveNotes(order.id)}
                      >
                        حفظ
                      </Button>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex gap-1 justify-content-center">
                      <Button
                        variant="info"
                        size="sm"
                        className="text-white"
                        onClick={() => onPrintOrder(order)}
                      >
                        <FaPrint /> طباعة
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDeleteOrder(order.id)}
                      >
                        حذف الطلب
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}
