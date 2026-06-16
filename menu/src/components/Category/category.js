import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import useCategories from "../../hooks/useCategories";
import "./category.css";

export default function Category({ onSelectCategory }) {
  const { categories } = useCategories();
  const [activeCat, setActiveCat] = useState("الكل");
  const [dropdownOpen, setDropdownOpen] = useState(false);

 const handleSelect = (cat) => {
  setActiveCat(cat.name);
  if (onSelectCategory) onSelectCategory(cat.name);
  setDropdownOpen(false);
};

  return (
    <>
      {/* Mobile Dropdown */}
      <div className="d-block d-md-none category-dropdown-wrapper px-3 mt-3" dir="rtl">
        <div
          className="dropdown-header"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>{activeCat}</span>
          <span className={`arrow ${dropdownOpen ? "rotate" : ""}`}>▼</span>
        </div>

        {dropdownOpen && (
          <ul className="dropdown-list">
            {categories.map((cat) => (
              <li key={cat.id} onClick={() => handleSelect(cat)}>
                {cat.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop Buttons */}
      <Row className="d-none d-md-flex justify-content-center mt-3 px-2">
        {categories.map((cat) => (
          <Col xs={6} md={3} lg={2} key={cat.id} className="mb-2 text-center">
            <button
              className={`btn w-100 border ${
                activeCat === cat.name ? "btn-main" : "btn-outline-main"
              }`}
              onClick={() => handleSelect(cat)}
            >
              {cat.name}
            </button>
          </Col>
        ))}
      </Row>
    </>
  );
}
