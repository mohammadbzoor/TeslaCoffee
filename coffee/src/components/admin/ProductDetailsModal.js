import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ProductDetailsModal({
  show,
  onHide,
  selectedOrder,
  onDeleteProduct,
}) {
  if (!selectedOrder) return null;

  return (
    <Modal show={show} onHide={onHide} centered className="admin-modal text-end font no-print">
      <Modal.Header closeButton className="flex-row-reverse">
        <Modal.Title className="w-100 text-center fw-bold">
          تفاصيل المنتجات
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedOrder.items && selectedOrder.items.length > 0 ? (
          selectedOrder.items.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center py-3"
              style={{ borderBottom: "1px solid #f0f0f0" }}
            >
              <div>
                <h6 className="mb-1 fw-bold">{item.name}</h6>
                <small className="text-muted">
                  {item.name} × {item.quantity} ({item.price * item.quantity} د.أ)
                </small>
              </div>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDeleteProduct(selectedOrder.id, item.id)}
              >
                حذف المنتج
              </Button>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">لا توجد منتجات في هذا الطلب</p>
        )}

        <div className="mt-4 d-flex justify-content-between align-items-center fw-bold fs-5" style={{ color: "#1b5e20" }}>
          <span>المجموع الكلي للطلب:</span>
          <span>{selectedOrder.totalPrice} د.أ</span>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={onHide}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
