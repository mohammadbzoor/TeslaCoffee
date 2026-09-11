import React, { useMemo, useState } from "react";
import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";

import useProducts from "../../hooks/useProducts";
import { deleteProduct, updateProduct } from "../../utils/productHelpers";
import ProductEditModal from "./ProductEditModal";
import ProductsTable from "./ProductsTable";

export default function ProductManagement() {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const categoryOptions = useMemo(() => {
    const categories = products
      .map((product) => product.category || "")
      .filter((category) => category.trim() !== "");
    return ["all", ...Array.from(new Set(categories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSection = sectionFilter === "all" || product.section === sectionFilter;
      const matchesCategory =
        categoryFilter === "all" ||
        (product.category || "").trim().toLowerCase() === categoryFilter.trim().toLowerCase();
      const text = `${product.title || ""} ${product.description || ""} ${product.category || ""}`;
      const matchesSearch = text.toLowerCase().includes(searchTerm.trim().toLowerCase());
      return matchesSection && matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, sectionFilter, categoryFilter]);

  const menuCount = products.filter((product) => product.section === "menu").length;
  const offersCount = products.filter((product) => product.section === "offers").length;

  const handleEdit = (product) => {
    setMessage("");
    setEditingProduct(product);
  };

  const handleSave = async (formData) => {
    if (!editingProduct) return;

    setSaving(true);
    const result = await updateProduct(editingProduct.id, formData);
    setSaving(false);

    if (result.success) {
      setEditingProduct(null);
      setMessage("تم تعديل المنتج بنجاح.");
    } else {
      setMessage("تعذر تعديل المنتج، حاول مرة أخرى.");
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`هل أنت متأكد من حذف المنتج "${product.title}"؟`)) return;

    const result = await deleteProduct(product.id);
    setMessage(result.success ? "تم حذف المنتج بنجاح." : "تعذر حذف المنتج، حاول مرة أخرى.");
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3 text-muted">جاري تحميل المنتجات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        حدث خطأ أثناء تحميل المنتجات: {error.message}
      </Alert>
    );
  }

  return (
    <>
      <div className="admin-section-heading">
        <div>
          <h4>إدارة المنتجات</h4>
          <p className="text-muted m-0">عدّل منتجات المنيو والعروض أو احذفها من مكان واحد.</p>
        </div>
        <Button as={Link} to="/add" variant="dark" className="d-inline-flex align-items-center gap-2">
          <FaPlus /> إضافة منتج
        </Button>
      </div>

      <Row className="gy-3 mb-4">
        <Col md={4}>
          <Card className="admin-product-stat">
            <Card.Body>
              <span>كل المنتجات</span>
              <strong>{products.length}</strong>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="admin-product-stat">
            <Card.Body>
              <span>منتجات المنيو</span>
              <strong>{menuCount}</strong>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="admin-product-stat">
            <Card.Body>
              <span>العروض</span>
              <strong>{offersCount}</strong>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {message && (
        <Alert variant={message.includes("تعذر") ? "danger" : "success"} onClose={() => setMessage("")} dismissible>
          {message}
        </Alert>
      )}

      <Card className="admin-products-toolbar mb-3">
        <Card.Body>
          <Row className="g-3 align-items-center">
            <Col lg={5}>
              <div className="admin-search-box">
                <FaSearch />
                <Form.Control
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="ابحث باسم المنتج أو التصنيف"
                  className="text-end"
                />
              </div>
            </Col>
            <Col lg={3}>
              <Form.Select
                value={sectionFilter}
                onChange={(event) => setSectionFilter(event.target.value)}
                className="text-end"
              >
                <option value="all">كل الأقسام</option>
                <option value="menu">المنيو</option>
                <option value="offers">العروض</option>
              </Form.Select>
            </Col>
            <Col lg={4}>
              <Form.Select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="text-end"
              >
                <option value="all">كل التصنيفات</option>
                {categoryOptions.map((cat) =>
                  cat === "all" ? null : (
                    <option key={cat} value={cat}>{cat}</option>
                  )
                )}
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <ProductsTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductEditModal
        show={Boolean(editingProduct)}
        product={editingProduct}
        onHide={() => setEditingProduct(null)}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
}
