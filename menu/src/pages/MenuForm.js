import { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import useCategories from "../hooks/useCategories";
import "../style/menuForm.css"
import { sendMenuItem } from '../utils/functionFirebase';

export default function MenuForm() {
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imgUrl: "",
    newPrice: "",
    oldPrice: "",
    category: "قهوة ساخنة",
    section: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (section) => {
    setSubmitting(true);
    const result = await sendMenuItem({ ...formData, section });
    setSubmitting(false);
    if (result.success) {
      setFormData({
        title: "",
        description: "",
        imgUrl: "",
        newPrice: "",
        oldPrice: "",
        category: "قهوة ساخنة",
        section: "",
      });
    } else {
      console.error("خطأ في الإرسال:", result.error);
    }
  };

  return (
    <div className="menuForm">


    <Card className="p-4 mt-4 ">
      <h4 className="mb-3 text-end">إضافة صنف جديد</h4>
      <Form onSubmit={handleSubmit} dir="rtl">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formTitle">
              <Form.Label>العنوان</Form.Label>
              <Form.Control
                type="text"
                placeholder="مثلاً: بيتزا مارجريتا"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formImage">
              <Form.Label>رابط الصورة</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://image.url"
                name="imgUrl"
                value={formData.imgUrl}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formDesc">
          <Form.Label>الوصف</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="مثلاً: تحتوي على جبنة ومكونات طازجة"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formOldPrice">
              <Form.Label>السعر القديم (اختياري)</Form.Label>
              <Form.Control
                type="number"
                placeholder="مثلاً: 10"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formNewPrice">
              <Form.Label>السعر الجديد</Form.Label>
              <Form.Control
                type="number"
                placeholder="مثلاً: 7"
                name="newPrice"
                value={formData.newPrice}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>التصنيف</Form.Label>
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select text-end custom-select"
            dir="rtl"
          >
            {categories
              .filter((cat) => cat.name !== "الكل")
              .map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Button
              variant="success"
              className="w-100"
              disabled={submitting}
              onClick={() => handleSubmit("menu")}
              type="button"
            >
              إضافة إلى المنيو
            </Button>
          </Col>
          <Col>
            <Button
              variant="warning"
              className="w-100"
              disabled={submitting}
              onClick={() => handleSubmit("offers")}
              type="button"
            >
              إضافة إلى العروض
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
    </div>
  );
}
