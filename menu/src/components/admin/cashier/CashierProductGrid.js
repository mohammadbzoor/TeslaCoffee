import React from "react";
import { Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function CashierProductGrid({ products, loading, onAddProduct }) {
  if (loading) {
    return (
      <div className="cashier-empty-state">
        <Spinner animation="border" variant="warning" />
        <p>جاري تحميل المنتجات...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="cashier-empty-state">
        <strong>لا توجد منتجات</strong>
        <p>غيّر البحث أو التصنيف لعرض منتجات أخرى.</p>
      </div>
    );
  }

  return (
    <div className="cashier-product-grid">
      {products.map((product) => (
        <button
          key={product.id}
          type="button"
          className="cashier-product-card"
          onClick={() => onAddProduct(product)}
        >
          <img
            src={product.imgUrl || "https://via.placeholder.com/90"}
            alt={product.title}
          />
          <span className="cashier-product-title">{product.title}</span>
          <span className="cashier-product-meta">
            <span>{product.newPrice} د.أ</span>
            <FaPlus />
          </span>
        </button>
      ))}
    </div>
  );
}
