import { useState } from "react";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar/navbar";
import Heder from "./components/heder/heder";
import Category from "./components/Category/category";
import CardList from "./components/CardList/cardList";
import MenuForm from "./pages/MenuForm";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Slider from "./components/slider/slider";
import { CartProvider } from "./utils/CartContext";
import { AuthProvider } from "./utils/AuthContext";
import Cart from "./pages/cart";
import Offers from "./pages/offers";
import Footer from "./components/footer/footer";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import HeroSection from "./components/HeroSection";
function App() {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const handleSelectCategory = (selectedCat) => {
    setCategory(selectedCat);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="color-body font app-main-content">
          <Navbar onSearch={setSearchTerm} />

          {location.pathname === "/" && <Slider />}
          {location.pathname === "/" && <HeroSection />}

          <Container>
            <Routes>
              <Route
                path="/menu"
                element={
                    <>
                      <Heder />
                      <Category onSelectCategory={handleSelectCategory} />
                      <CardList category={category} searchTerm={searchTerm} />
                    </>
                }
              />
              <Route
                path="/add"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <MenuForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="offers" element={<Offers />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Container>
        </div>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
