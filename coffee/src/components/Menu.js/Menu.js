import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import menu from '../../data/menu';

function Menu() {
  return (
    <section id="menu" className="py-5">
      <Container>
        <div className="text-center mb-4">
          <h2>Our Special Menu</h2>
          <p>Order two and get third for free</p>
        </div>
        <Row className="g-4">
          {menu.map((item) => (
            <Col md={4} key={item.id}>
              <Card className="h-100">
                <Card.Img variant="top" src={item.img.replace(/^\.\.\//, '/')} alt={item.name} />
                <Card.Body>
                  <Card.Title>{item.name} <span className="float-end text-success">${item.price}</span></Card.Title>
                  <hr />
                  <Card.Text>{item.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button variant="outline-primary" size="lg">EXPLORE FULL MENU</Button>
        </div>
      </Container>
    </section>
  );
}

export default Menu; 