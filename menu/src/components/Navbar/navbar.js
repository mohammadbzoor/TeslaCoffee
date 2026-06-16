import React from "react";
import { Navbar, Container, Nav, Form, FormControl, Badge } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import { useAuth } from "../../utils/AuthContext";

const NavBar = ({ onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, isAdmin, loading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("خطأ أثناء تسجيل الخروج:", error);
    }
  };

  const userName = user?.displayName || user?.email?.split("@")[0] || "مستخدم";

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="py-2">
      <Container style={{ direction: "ltr" }}>
        <Navbar.Brand as={Link} to="/">
          <div className="brand-color">Tesla Coffee</div>
        </Navbar.Brand>

        

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto" navbarScroll>
            <Nav.Link as={Link} to="/" className="brand-color text-decoration-none">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/menu" className="brand-color text-decoration-none">
              Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/offers" className="brand-color text-decoration-none">
              Offers
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/cart"
              className="brand-color text-decoration-none d-flex align-items-center gap-1"
              title="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-basket"
                viewBox="0 0 16 16"
              >
                <path d="M2.31 5.243 8 1l5.69 4.243a.5.5 0 0 1-.58.814L8 2.058 2.89 6.057a.5.5 0 1 1-.58-.814z" />
                <path d="M5.5 6.5A.5.5 0 0 1 6 7v1h4V7a.5.5 0 0 1 1 0v1h1.5a.5.5 0 0 1 .5.5v6a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-6a.5.5 0 0 1 .5-.5H4V7a.5.5 0 0 1 1-.5zm-2 2V14.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V8.5H3.5z" />
              </svg>
              <span className="ms-1">Cart</span>
              {cartCount > 0 && (
                <Badge bg="danger" pill style={{ transform: "translate(30%,-40%)" }}>
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {isAdmin && (
              <Nav.Link as={Link} to="/admin-dashboard" className="brand-color text-decoration-none">
                Admin
              </Nav.Link>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-2">
            {location.pathname === "/menu" && (
              <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                <FormControl
                  type="text"
                  placeholder="Search..."
                  className="me-2"
                  onChange={(e) => onSearch && onSearch(e.target.value)}
                />
                <button className="btn-search">Search</button>
              </Form>
            )}
            

            {!loading && user ? (
              <button type="button" onClick={handleLogout} className="nav-logout-btn brand-color">
                Logout
              </button>
            ) : (
              !loading && (
                <Nav.Link as={Link} to="/auth" className="brand-color text-decoration-none">
                  Login
                </Nav.Link>
              )
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
