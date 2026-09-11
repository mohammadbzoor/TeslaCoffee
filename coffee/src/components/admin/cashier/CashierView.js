import React, { useMemo, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { FaSearch } from "react-icons/fa";

import useCategories from "../../../hooks/useCategories";
import useProducts from "../../../hooks/useProducts";
import { useAuth } from "../../../utils/AuthContext";
import { data } from "../../../firebase/firebese";
import CashierCart from "./CashierCart";
import CashierCategoryFilter from "./CashierCategoryFilter";
import CashierProductGrid from "./CashierProductGrid";

export default function CashierView() {
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { categories } = useCategories();
  const { user, logUserAction } = useAuth();
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const visibleProducts = useMemo(() => {
    return products
      .filter((product) => product.section !== "offers")
      .filter((product) => activeCategory === "الكل" || product.category === activeCategory)
      .filter((product) => {
        const text = `${product.title || ""} ${product.description || ""}`;
        return text.toLowerCase().includes(searchTerm.trim().toLowerCase());
      });
  }, [activeCategory, products, searchTerm]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddProduct = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...currentCart,
        {
          id: product.id,
          name: product.title,
          price: Number(product.newPrice) || 0,
          img: product.imgUrl || "",
          quantity: 1,
        },
      ];
    });
  };

  const handleIncrease = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!tableNumber || cart.length === 0) return;

    setSubmitting(true);
    setMessage("");

    try {
      const now = new Date();
      const orderData = {
        tableNumber: parseInt(tableNumber, 10),
        notes,
        items: cart,
        totalPrice: total,
        status: "جديد",
        createdAt: now.toISOString(),
        date: now.toLocaleDateString("en-CA"),
        userId: user?.uid || "admin",
        userEmail: user?.email || "",
        userName: user?.displayName || "",
        source: "admin_cashier",
      };

      const orderRef = await addDoc(collection(data, "orders"), orderData);

      await logUserAction({
        type: "admin_create_order",
        source: "cashier",
        orderId: orderRef.id,
        tableNumber: orderData.tableNumber,
        totalPrice: Number(total) || 0,
        itemsCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        items: cart.map((item) => ({
          productId: item.id,
          productName: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      });

      setCart([]);
      setTableNumber("");
      setNotes("");
      setMessage("تم إنشاء الطلب بنجاح.");
    } catch (error) {
      console.error("Error creating cashier order:", error);
      setMessage("تعذر إنشاء الطلب، تأكد من صلاحيات Firestore وحاول مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cashier-view">
      <div className="admin-section-heading">
        <div>
          <h4>الكاشير السريع</h4>
          <p className="text-muted m-0">أنشئ طلب الطاولة مباشرة من لوحة الإدارة.</p>
        </div>
      </div>

      {productsError && (
        <Alert variant="danger">حدث خطأ أثناء تحميل المنتجات: {productsError.message}</Alert>
      )}

      {message && (
        <Alert
          variant={message.includes("تعذر") ? "danger" : "success"}
          onClose={() => setMessage("")}
          dismissible
        >
          {message}
        </Alert>
      )}

      <div className="cashier-layout">
        <section className="cashier-products-panel">
          <div className="cashier-toolbar">
            <div className="admin-search-box">
              <FaSearch />
              <Form.Control
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="ابحث عن منتج"
                className="text-end"
              />
            </div>
          </div>

          <CashierCategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />

          <CashierProductGrid
            products={visibleProducts}
            loading={productsLoading}
            onAddProduct={handleAddProduct}
          />
        </section>

        <CashierCart
          cart={cart}
          total={total}
          tableNumber={tableNumber}
          notes={notes}
          submitting={submitting}
          onTableNumberChange={setTableNumber}
          onNotesChange={setNotes}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          onClear={() => setCart([])}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
