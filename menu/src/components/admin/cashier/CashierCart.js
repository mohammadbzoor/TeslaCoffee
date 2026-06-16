import React from "react";
import { Button, Form } from "react-bootstrap";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

export default function CashierCart({
  cart,
  total,
  tableNumber,
  notes,
  submitting,
  onTableNumberChange,
  onNotesChange,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
  onSubmit,
}) {
  return (
    <aside className="cashier-cart-panel">
      <div className="cashier-cart-header">
        <h5>الطلب الحالي</h5>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={onClear}
          disabled={cart.length === 0 || submitting}
        >
          تفريغ
        </Button>
      </div>

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="cashierTableNumber">
          <Form.Label>رقم الطاولة</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={tableNumber}
            onChange={(event) => onTableNumberChange(event.target.value)}
            placeholder="مثلاً 5"
            className="text-end"
            required
          />
        </Form.Group>

        <div className="cashier-cart-items">
          {cart.length === 0 ? (
            <div className="cashier-cart-empty">اضغط على المنتج لإضافته للطلب.</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cashier-cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.price} د.أ</span>
                </div>
                <div className="cashier-quantity-controls">
                  <Button variant="light" size="sm" onClick={() => onIncrease(item.id)}>
                    <FaPlus />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button variant="light" size="sm" onClick={() => onDecrease(item.id)}>
                    <FaMinus />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => onRemove(item.id)}>
                    <FaTrash />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <Form.Group className="my-3" controlId="cashierNotes">
          <Form.Label>ملاحظات</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={notes}
            onChange={(event) => onNotesChange(event.target.value)}
            placeholder="أي ملاحظة للطلب"
            className="text-end"
          />
        </Form.Group>

        <div className="cashier-total-row">
          <span>المجموع</span>
          <strong>{total.toFixed(1)} د.أ</strong>
        </div>

        <Button
          type="submit"
          variant="success"
          className="w-100 mt-3"
          disabled={submitting || cart.length === 0}
        >
          {submitting ? "جاري إنشاء الطلب..." : "إنشاء الطلب"}
        </Button>
      </Form>
    </aside>
  );
}
