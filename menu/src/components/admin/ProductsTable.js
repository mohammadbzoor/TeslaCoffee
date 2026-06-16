import React from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ProductsTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <div style={{ fontSize: 48, marginBottom: 12 }}>+</div>
        <h5 className="text-muted">لا توجد منتجات مطابقة</h5>
        <p className="text-muted">غيّر البحث أو الفلتر لعرض منتجات أخرى.</p>
      </div>
    );
  }

  return (
    <Table className="admin-table text-center align-middle" responsive>
      <thead>
        <tr>
          <th>الصورة</th>
          <th>المنتج</th>
          <th>التصنيف</th>
          <th>القسم</th>
          <th>السعر</th>
          <th>إجراءات</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              <img
                src={product.imgUrl || "https://via.placeholder.com/70"}
                alt={product.title}
                className="admin-product-thumb"
              />
            </td>
            <td className="text-end">
              <div className="fw-bold">{product.title}</div>
              <small className="text-muted admin-product-description">
                {product.description}
              </small>
            </td>
            <td>{product.category || "-"}</td>
            <td>
              <Badge bg={product.section === "offers" ? "warning" : "primary"}>
                {product.section === "offers" ? "العروض" : "المنيو"}
              </Badge>
            </td>
            <td>
              <div className="fw-bold text-success">{product.newPrice} د.أ</div>
              {product.oldPrice !== "" && product.oldPrice !== undefined && (
                <small className="text-muted text-decoration-line-through">
                  {product.oldPrice} د.أ
                </small>
              )}
            </td>
            <td>
              <div className="d-flex gap-2 justify-content-center flex-wrap">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="d-inline-flex align-items-center gap-1"
                  onClick={() => onEdit(product)}
                >
                  <FaEdit /> تعديل
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="d-inline-flex align-items-center gap-1"
                  onClick={() => onDelete(product)}
                >
                  <FaTrash /> حذف
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
