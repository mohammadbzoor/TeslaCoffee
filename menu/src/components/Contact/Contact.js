import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faSnapchat
} from '@fortawesome/free-brands-svg-icons';
import {
  faPhone,
  faEnvelope,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';

function Contact() {
  return (
    <section id="contact" className="py-5 bg-light">
      <Container>
    <div className="text-center mb-4">
      <h2 className="section-title">تواصل معنا</h2>
    </div>        <Row className="g-4">
          <Col md={4}>
            <div className="mb-4">
              <h5>العنوان</h5>
              <p><FontAwesomeIcon icon={faLocationDot} className="me-2" /> مسجد الحصري، 6 أكتوبر، الأردن</p>
              <p><FontAwesomeIcon icon={faPhone} className="me-2" /> الهاتف: 123456789</p>
              <p><FontAwesomeIcon icon={faEnvelope} className="me-2" /> support@foodlover.com</p>
            </div>
            <div className="mb-4">
              <h5>ساعات العمل</h5>
              <p>من 8:00 صباحًا إلى 11:00 مساءً (أيام الأسبوع)</p>
              <p>من 11:00 صباحًا إلى 1:00 صباحًا (نهاية الأسبوع)</p>
            </div>
       <div>
  <h5>تابعنا</h5>
  <a href="https://www.facebook.com/..." className="me-2 text-decoration-none"
     style={{ color: "#b45b35" }}>
    <FontAwesomeIcon icon={faFacebook} size="lg" />
  </a>
  <a href="https://www.instagram.com/..." className="me-2 text-decoration-none"
     style={{ color: "#b45b35" }}>
    <FontAwesomeIcon icon={faInstagram} size="lg" />
  </a>
  <a href="https://www.youtube.com/..." className="me-2 text-decoration-none"
     style={{ color: "#b45b35" }}>
    <FontAwesomeIcon icon={faYoutube} size="lg" />
  </a>
  <a href="https://www.snapchat.com/..." className="me-2 text-decoration-none"
     style={{ color: "#b45b35" }}>
    <FontAwesomeIcon icon={faSnapchat} size="lg" />
  </a>
</div>

          </Col>
          <Col md={8}>
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formName">
                    <Form.Control type="text" placeholder="الاسم الكامل" required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Control type="email" placeholder="البريد الإلكتروني" required />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Control type="text" placeholder="الموضوع" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Control as="textarea" rows={4} placeholder="اكتب رسالتك هنا..." />
              </Form.Group>
<button
  type="submit"
  className="custom-btn p-2"
>
  إرسال الرسالة
</button>

            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;
