import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={{ background: "#222", color: "#fff", padding: "32px 0 12px 0" }}>
      <Container>
        <Row className="align-items-center text-center text-md-end">
          <Col md={4} className="mb-3 mb-md-0">
            <h5 style={{ color: "#ff3e3e", fontWeight: 700, letterSpacing: 1 }}>Tesla Coffee</h5>
            <div style={{ fontSize: 15, color: "#bbb" }}>
              <FaMapMarkerAlt style={{ marginLeft: 6 }} />
              عمان - الأردن
            </div>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <div style={{ fontSize: 15, color: "#bbb" }}>
              جميع الحقوق محفوظة &copy; {new Date().getFullYear()}
            </div>
            <div style={{ fontSize: 13, color: "#888" }}>
              تصميم وبرمجة فريق Tesla Coffee
            </div>
          </Col>
          <Col md={4}>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", background: "#3b5998", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", background: "#E1306C", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaInstagram />
              </a>
              <a href="https://wa.me/962790000000" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", background: "#25D366", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaWhatsapp />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
