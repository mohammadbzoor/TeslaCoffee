import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import aboutImg from '../../Food-image/about_img.png';

function About() {
  return (
    <section id="about" className="py-5">
      <Container>
        <div className="text-center mb-4">
          <h2 className='section-title'>قصة الكافيه ......... </h2>
          <p>أكثر من 25 سنة من التميز في عالم القهوة والمشروبات المختارة</p>
        </div>
        <Row className="align-items-center">
          <Col md={6}>
            <p>
              منذ تأسيسه، تميز كافيهنا بتقديم أرقى أنواع القهوة والمشروبات الساخنة والباردة، إلى جانب الوافل اللذيذة والوجبات الخفيفة المبتكرة.
            </p>
            <p>
              بفضل فريق عمل متمرس، نجحنا في خلق تجربة كافيه دافئة وأنيقة، تجمع بين الراحة والجودة في أجواء مريحة ومناسبة للاسترخاء.
            </p>
            {/* <Button variant="outline-primary">اعرف أكثر</Button> */}
          </Col>
          <Col md={6} className="text-center">
            <img src={aboutImg} alt="عن الكافيه" className="img-fluid rounded" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;
