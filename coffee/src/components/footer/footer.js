import { Container, Row, Col } from "react-bootstrap";
import {
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={{ background: "#222", color: "#fff", padding: "40px 0 15px 0" }}>
      <Container>
        <Row className="text-center text-md-end">

          {/* معلومات المكان */}
          <Col md={4} className="mb-4">
            <h5 style={{ color: "#b45b35", fontWeight: 700 }}>
              Tesla Coffee
            </h5>
            <div style={{ color: "#bbb" }}>
              <p>
                <FaMapMarkerAlt /> المفرق - الخالدية
              </p>
              <p>
                <FaPhone /> 0785865610
              </p>
              {/* <p>
                <FaEnvelope /> support@foodlover.com
              </p> */}
            </div>
          </Col>

          {/* ساعات العمل */}
          <Col md={4} className="mb-4">
            <h6 style={{ color: "#b45b35" }}>ساعات العمل</h6>
          <p style={{ color: "#bbb", fontSize: "14px" }}>
                   من 4:00 مساءً إلى 3:00 فجرًا
          </p>
          </Col>

          {/* السوشيال */}
          <Col md={4}>
            <h6 style={{ color: "#b45b35" }}>تابعنا</h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mt-3">
              {/* <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-icon">
                <FaFacebookF />
              </a> */}

              <a href="https://www.instagram.com/t.cofe.1?igsh=emMyeTZ2MWtoODA4" target="_blank" rel="noreferrer" className="footer-social-icon">
                <FaInstagram />
              </a>

              <a href="https://wa.me/962785865610" target="_blank" rel="noreferrer" className="footer-social-icon">
                <FaWhatsapp />
              </a>
            </div>
          </Col>

        </Row>

        {/* الحقوق */}
        {/* <div className="text-center mt-4" style={{ fontSize: "14px", color: "#aaa" }}>
          جميع الحقوق محفوظة © {new Date().getFullYear()}
          <br />
          Tesla Coffee
        </div> */}

      </Container>
    </footer>
  );
}
