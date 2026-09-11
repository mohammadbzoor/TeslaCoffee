import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getMenuItemsRealtime } from "../../utils/functionFirebase";
import { Card } from "react-bootstrap";
import { FaTags, FaBolt, FaPercent } from "react-icons/fa";
import { addToCart } from "../../utils/functionMenu";
import { useCart } from "../../utils/CartContext";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SliderOffer() {
  const [offers, setOffers] = useState([]);
  const { refreshCartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = getMenuItemsRealtime((result) => {
      if (result.success) {
        setOffers(result.data.filter(item => item.section === "offers"));
      }
    });
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  const handleOrderNow = (offer) => {
    if (!user) {
      navigate("/auth", { state: { from: "/offers" } });
      return;
    }
    addToCart({
      id: offer.id,
      name: offer.title || offer.name,
      price: offer.newPrice || offer.price,
      img: offer.imgUrl || offer.img,
    }, user?.uid);
    refreshCartCount();
  };

  const settings = {
    dots: true,
    infinite: offers.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: true, // لجعل السلايدر من اليمين لليسار
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div style={{ margin: "40px 0" }}>
      <h3 className="mb-4 text-end" style={{ color: "#ff3e3e" }}>
        <FaBolt style={{ marginLeft: 8 }} />
        عروض اليوم
      </h3>
      <Slider {...settings}>
        {offers.map((offer) => (
          <div key={offer.id} style={{ padding: 10 }}>
            <Card className="offer-card shadow-lg position-relative" style={{
              border: "2px solid #ff3e3e",
              borderRadius: 18,
              overflow: "hidden",
              transition: "transform 0.2s",
            }}>
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
              <div className="image-container">
                <img
                  src={offer.imgUrl || offer.img}
                  alt={offer.title || offer.name}
                  className="img-item"
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderRadius: "12px 12px 0 0"
                  }}
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
          </div>
        ))}
      </Slider>
    </div>
  );
}