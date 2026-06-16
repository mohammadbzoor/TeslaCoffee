import { Container, Card, Button, Row, Col, Modal, Form, Alert } from "react-bootstrap";
import { getCart, removeFromCart } from "../utils/functionMenu";
import { useState, useEffect } from "react";
import { useCart } from "../utils/CartContext";
import { collection, addDoc } from "firebase/firestore";
import { data } from "../firebase/firebese";
import { useAuth } from "../utils/AuthContext";

export default function Cart() {
  const [cart, setCart] = useState(getCart());
  const { refreshCartCount } = useCart();
  const { user, logUserAction } = useAuth();

  const [showCheckout, setShowCheckout] = useState(false);
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // تحديث السلة عند أي تغيير في localStorage (مثلاً عند الإضافة)
  useEffect(() => {
    const handleStorage = () => setCart(getCart());
    window.addEventListener("storage", handleStorage);
    // تحديث عند العودة للصفحة
    const interval = setInterval(() => setCart(getCart()), 500);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  const handleRemove = (id) => {
    const removedItem = cart.find((item) => item.id === id);
    removeFromCart(id);
    setCart(getCart());
    if (removedItem) {
      logUserAction({
        type: "remove_from_cart",
        productId: removedItem.id,
        productName: removedItem.name,
        price: Number(removedItem.price) || 0,
        quantity: removedItem.quantity || 1,
      });
    }
    refreshCartCount();
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!tableNumber) return;
    setSubmitting(true);
    try {
      const now = new Date();
      // Date in local YYYY-MM-DD format
      const localDate = now.toLocaleDateString("en-CA");

      const orderData = {
        tableNumber: parseInt(tableNumber, 10),
        notes: notes,
        items: cart,
        totalPrice: total,
        status: "جديد",
        createdAt: now.toISOString(),
        date: localDate,
        userId: user?.uid || "guest",
        userEmail: user?.email || "",
        userName: user?.displayName || "",
      };

      const orderRef = await addDoc(collection(data, "orders"), orderData);

      await logUserAction({
        type: "checkout",
        orderId: orderRef.id,
        tableNumber: orderData.tableNumber,
        totalPrice: Number(total) || 0,
        itemsCount: cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
        items: cart.map((item) => ({
          productId: item.id,
          productName: item.name,
          price: Number(item.price) || 0,
          quantity: item.quantity || 1,
        })),
      });

      // Clear localStorage cart
      localStorage.removeItem("cart");
      setCart([]);
      refreshCartCount();
      setOrderSuccess(true);
      setShowCheckout(false);
      setTableNumber("");
      setNotes("");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">سلة المشتريات</h2>

      {orderSuccess && (
        <Alert variant="success" onClose={() => setOrderSuccess(false)} dismissible className="text-center">
          تم إرسال طلبك بنجاح! سيتم تحضير الطلب وتوصيله إلى طاولتك قريباً.
        </Alert>
      )}

      {cart.length === 0 ? (
        <h5 className="text-center mt-5">السلة فارغة</h5>
      ) : (
        <>
          <Row className="gy-4">
            {cart.map((item, idx) => (
              <Col xs={12} key={item.id || idx}>
                <Card className="flex-row align-items-center shadow-sm p-2" style={{ minHeight: 110 }}>
                  <Card.Img
                    src={item.img || "https://via.placeholder.com/80"}
                    alt={item.name || "منتج"}
                    style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 12, marginLeft: 16 }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Title className="mb-1">{item.name || "منتج غير معروف"}</Card.Title>
                        <div className="text-muted" style={{ fontSize: 14 }}>
                          السعر: {item.price ? `${item.price} د.أ` : "غير متوفر"}
                        </div>
                      </div>
                      <Button variant="danger" size="sm" style={{ minWidth: 60 }} onClick={() => handleRemove(item.id)}>
                        حذف
                      </Button>
                    </div>
                    <div className="mt-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span style={{ fontSize: 13 }}>الكمية: {item.quantity || 1}</span>
                        <span className="fw-bold">{item.price && item.quantity ? item.price * item.quantity : ""} د.أ</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="justify-content-center mt-5">
            <Col md={6} lg={4}>
              <Card className="text-center shadow-lg border-0" style={{ borderRadius: 18 }}>
                <Card.Body>
                  <Card.Title className="mb-3" style={{ fontWeight: 700, fontSize: 22 }}>
                    المجموع الكلي
                  </Card.Title>
                  <Card.Text className="fs-3 fw-bold text-success">{total} د.أ</Card.Text>
                  <Button variant="success" size="lg" style={{ borderRadius: 20 }} onClick={() => setShowCheckout(true)}>
                    إتمام الشراء
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {/* مودال إتمام الشراء */}
      <Modal show={showCheckout} onHide={() => setShowCheckout(false)} centered className="text-end font">
        <Modal.Header closeButton className="flex-row-reverse">
          <Modal.Title className="w-100 text-center fw-bold">إتمام الطلب</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCheckoutSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="tableNumber">
              <Form.Label className="fw-bold">رقم الطاولة <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                placeholder="أدخل رقم الطاولة الخاصة بك"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                required
                min="1"
                className="text-end"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="notes">
              <Form.Label className="fw-bold">ملاحظات إضافية</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="أي ملاحظات خاصة بالطلب (مثلاً: بدون بصل، صوص إضافي...)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="text-end"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button variant="secondary" onClick={() => setShowCheckout(false)}>
              إلغاء
            </Button>
            <Button variant="success" type="submit" disabled={submitting}>
              {submitting ? "جاري الإرسال..." : "تأكيد الطلب"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
