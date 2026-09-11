import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { fetchMenuItems } from "../utils/apiMenu";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchMenuItems();
        const formatted = data.map((item) => ({
          title: item.name,
          description: item.description || "لا يوجد وصف",
          image: item.image,
          price: item.price || 0,
        }));
        setItems(formatted);
      } catch (err) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="py-5" id="menu">
      <Container>
        <h2 className="text-center mb-4">قائمة الطعام</h2>
        <Row>
          {loading && <p className="text-center">جارٍ التحميل...</p>}
          {!loading && items.length > 0 && items.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body className="text-end d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </div>
                  <div className="fw-bold">{item.price} د.أ</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {!loading && items.length === 0 && (
            <h5 className="text-center">لا يوجد بيانات</h5>
          )}
        </Row>
      </Container>
    </section>
  );
}
