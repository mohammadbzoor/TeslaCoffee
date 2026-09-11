import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import useCategories from "../../hooks/useCategories";

const defaultForm = {
  title: "",
  description: "",
  imgUrl: "",
  newPrice: "",
  oldPrice: "",
  category: "قهوة ساخنة",
  section: "menu",
};

export default function ProductEditModal({ show, product, onHide, onSave, saving }) {
  const { categories } = useCategories();
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (!product) {
      setFormData(defaultForm);
      return;
    }

    setFormData({
      title: product.title || "",
      description: product.description || "",
      imgUrl: product.imgUrl || "",
      newPrice: product.newPrice ?? "",
      oldPrice: product.oldPrice ?? "",
      category: product.category || "قهوة ساخنة",
      section: product.section || "menu",
    });
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="admin-modal text-end font">
      <Modal.Header closeButton className="flex-row-reverse">
        <Modal.Title className="w-100 text-center fw-bold">تعديل المنتج</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit} dir="rtl">
        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="editProductTitle">
                <Form.Label>اسم المنتج</Form.Label>
                <Form.Control
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="text-end"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="editProductImage">
                <Form.Label>رابط الصورة</Form.Label>
                <Form.Control
                  name="imgUrl"
                  value={formData.imgUrl}
                  onChange={handleChange}
                  className="text-end"
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group controlId="editProductDescription">
                <Form.Label>الوصف</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="text-end"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="editProductNewPrice">
                <Form.Label>السعر الحالي</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  step="0.01"
                  name="newPrice"
                  value={formData.newPrice}
                  onChange={handleChange}
                  required
                  className="text-end"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="editProductOldPrice">
                <Form.Label>السعر القديم</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  step="0.01"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  className="text-end"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="editProductCategory">
                <Form.Label>التصنيف</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="text-end"
                >
                  {categories
                    .filter((category) => category.name !== "الكل")
                    .map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="editProductSection">
                <Form.Label>مكان العرض</Form.Label>
                <Form.Select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="text-end"
                >
                  <option value="menu">المنيو</option>
                  <option value="offers">العروض</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={onHide} disabled={saving}>
            إلغاء
          </Button>
          <Button variant="success" type="submit" disabled={saving}>
            {saving ? "جاري الحفظ..." : "حفظ التعديل"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
