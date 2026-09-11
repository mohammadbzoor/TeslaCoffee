import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Col, Card } from "react-bootstrap";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { addToCart } from "../../utils/functionMenu";
import { useCart } from "../../utils/CartContext";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AnimatedCard({ item, index, handleImageError }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });
  const location = useLocation();
  const { refreshCartCount } = useCart();
  const { user, logUserAction } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);

  if (!item) return null;

  // دالة عند الضغط على اطلب الآن
  const handleOrderNow = () => {
    if (!user) {
      navigate("/auth", { state: { from: "/menu" } });
      return;
    }
    console.log("بيانات المنتج:", item); // أضف هذا السطر
    if (!item.id || !item.title || !item.imgUrl || !item.newPrice) {
      alert("هناك خطأ في بيانات المنتج، لا يمكن إضافته للسلة.");
      return;
    }
    const added = addToCart({
      id: item.id,
      name: item.title,
      price: item.newPrice,
      img: item.imgUrl,
    }, user?.uid);
    if (added) {
      logUserAction({
        type: "add_to_cart",
        source: "menu",
        productId: item.id,
        productName: item.title,
        price: Number(item.newPrice) || 0,
        quantity: 1,
      });
    }
    refreshCartCount();
  };
  return (
    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card className="menu-card shadow-sm border-0 h-100">
          <div className="image-container">
            <Card.Img
              variant="top"
              src={item.imgUrl}
              className="img-item"
              alt={item.title}
              onError={handleImageError}
            />
          </div>
          <Card.Body className="text-end d-flex flex-column justify-content-between">
            <div>
              <Card.Title className="item-title">{item.title}</Card.Title>
              <Card.Text className="item-description">
                {item.description}
              </Card.Text>
            </div>
            <div>
              <div className="d-flex align-items-center justify-content-start gap-2 mb-3">
                <span className="old-price">{item.oldPrice} د.أ</span>
                <span className="item-price">{item.newPrice} د.أ</span>
              </div>

              {/* ✅ عرض الزر فقط إذا ما كانت الصفحة الرئيسية */}
              {location.pathname !== "/" && (
                <button className="btn btn-main w-100" onClick={handleOrderNow}>
                  اطلب الآن
                </button>
              )}
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </Col>
  );
}
