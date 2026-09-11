import { Container, Row, Col, Card } from "react-bootstrap";
import { FaTags, FaBolt, FaPercent } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getMenuItemsRealtime } from "../utils/functionFirebase";
import { addToCart } from "../utils/functionMenu";
import { useCart } from "../utils/CartContext";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Offers({ hideWhenEmpty = false }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshCartCount } = useCart();
  const { user, logUserAction } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = getMenuItemsRealtime((result) => {
      if (result.success) {
        setOffers(result.data.filter(item => item.section === "offers"));
      }
      setLoading(false);
    });
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  const handleOrderNow = (offer) => {
    if (!user) {
      navigate("/auth", { state: { from: "/offers" } });
      return;
    }
    const added = addToCart({
      id: offer.id,
      name: offer.title || offer.name,
      price: offer.newPrice || offer.price,
      img: offer.imgUrl || offer.img,
    }, user?.uid);
    if (added) {
      logUserAction({
        type: "add_to_cart",
        source: "offers",
        productId: offer.id,
        productName: offer.title || offer.name,
        price: Number(offer.newPrice || offer.price) || 0,
        quantity: 1,
      });
    }
    refreshCartCount();
  };

  if (hideWhenEmpty && !loading && offers.length === 0) {
    return null;
  }

  return (
    <Container className="py-5" >
      <div className="text-center mb-5">
        <FaBolt size={40} color="#ff3e3e" style={{ marginBottom: 10 }} />
        <h2 className="fw-bold" style={{ color: "#ff3e3e", letterSpacing: 2 }}>
          أقوى العروض والخصومات
        </h2>
        <p className="fs-5 text-muted">لا تفوت الفرصة! عروض لفترة محدودة فقط</p>
      </div>
      <Row className="gy-5">
        {offers.map((offer) => (
          <Col md={6} lg={4} key={offer.id}>
            <Card className="offer-card shadow-lg position-relative" style={{
              border: "2px solid #ff3e3e",
              borderRadius: 18,
              overflow: "hidden",
              transition: "transform 0.2s",
            }}>
              {/* شريط خصم دائري */}
              <div style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "#ff3e3e",
                color: "#fff",
                padding: "6px 18px",
                fontWeight: "bold",
                fontSize: 15,
                borderRadius: "20px",
                zIndex: 2,
                boxShadow: "0 2px 8px #ff3e3e44"
              }}>
                <FaPercent style={{ marginLeft: 6 }} />
                خصم
              </div>
              <div className="image-container" style={{ background: "#fff", padding: 10 }}>
                <img
                  src={offer.imgUrl || offer.img}
                  alt={offer.title || offer.name}
                  className="img-item"
                  
                />
              </div>
              <Card.Body className="text-end d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fw-bold" style={{ color: "#ff3e3e", fontSize: 20 }}>
                    <FaTags style={{ marginLeft: 6 }} />
                    {offer.title || offer.name}
                  </Card.Title>
                  <Card.Text className="mb-2" style={{ minHeight: 48, color: "#555" }}>
                    {offer.description || offer.desc}
                  </Card.Text>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <span className="text-muted text-decoration-line-through fs-6">
                    {offer.oldPrice} د.أ
                  </span>
                  <span className="fw-bold fs-4" style={{ color: "#1dbf73" }}>
                    {offer.newPrice || offer.price} د.أ
                  </span>
                </div>
                <div className="text-center mt-3">
                  <button
                    className="btn btn-main w-100"
                    style={{
                      borderRadius: 12,
                      background: "#ff3e3e",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: 18,
                      boxShadow: "0 2px 8px #ff3e3e44"
                    }}
                    onClick={() => handleOrderNow(offer)}
                  >
                    <FaBolt style={{ marginLeft: 4 }} />
                    اطلب الآن
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
