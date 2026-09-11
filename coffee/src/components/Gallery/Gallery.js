import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import gallery from '../../data/gallery';

function Gallery() {
  return (
    <section id="gallery" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4" style={{ fontWeight: "bold", color: "#b45b35" }}>
          معرض صور الطعام
        </h2>
        <Row className="g-4">
          {gallery.map((img, idx) => (
            <Col md={4} sm={6} xs={12} key={idx} className="text-center">
              <Image
                src={img}
                alt={`gallery-${idx}`}
                fluid
                rounded
                className="shadow-sm gallery-img"
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Gallery;
