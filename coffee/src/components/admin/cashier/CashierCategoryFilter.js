import React from "react";

export default function CashierCategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="cashier-category-strip">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={`cashier-category-chip ${
            activeCategory === category.name ? "cashier-category-chip-active" : ""
          }`}
          onClick={() => onChange(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
