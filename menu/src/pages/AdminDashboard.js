import React, { useState } from "react";
import { Container, Button, Spinner, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaBoxOpen,
  FaCashRegister,
  FaLayerGroup,
  FaClipboardList,
  FaFileExcel,
  FaPlus,
  FaTachometerAlt,
  FaTools,
  FaTrash,
} from "react-icons/fa";

import useOrders from "../hooks/useOrders";

import {
  calculateTotalRevenue,
  calculateCompletedOrders,
  calculatePendingOrders,
  calculateActiveTables,
  groupOrdersByDate,
} from "../utils/adminStats";
import {
  toggleOrderStatus,
  saveOrderNotes,
  deleteSingleOrder,
  deleteDayOrders,
  deleteAllOrders,
  deleteProductFromOrder,
} from "../utils/orderHelpers";
import exportOrdersToExcel from "../utils/exportOrdersToExcel";

import StatsCards from "../components/admin/StatsCards";
import DailySummaryTable from "../components/admin/DailySummaryTable";
import OrdersTable from "../components/admin/OrdersTable";
import ProductDetailsModal from "../components/admin/ProductDetailsModal";
import InvoicePrintView from "../components/admin/InvoicePrintView";
import ProductManagement from "../components/admin/ProductManagement";
import CategoryManager from "../components/admin/CategoryManager";
import CashierView from "../components/admin/cashier/CashierView";

import "../components/admin/adminDashboard.css";

const sections = [
  { key: "overview", label: "نظرة عامة", icon: <FaTachometerAlt /> },
  { key: "orders", label: "الطلبات", icon: <FaClipboardList /> },
  { key: "cashier", label: "الكاشير", icon: <FaCashRegister /> },
  { key: "products", label: "المنتجات", icon: <FaBoxOpen /> },
  { key: "categories", label: "التصنيفات", icon: <FaLayerGroup /> },
  { key: "daily", label: "ملخص الأيام", icon: <FaCalendarAlt /> },
  { key: "tools", label: "أدوات الإدارة", icon: <FaTools /> },
];

export default function AdminDashboard() {
  const { orders, loading, error } = useOrders();

  const [activeSection, setActiveSection] = useState("overview");
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [tempNotes, setTempNotes] = useState({});
  const [printOrder, setPrintOrder] = useState(null);

  const totalRevenue = calculateTotalRevenue(orders);
  const completedOrders = calculateCompletedOrders(orders);
  const pendingOrders = calculatePendingOrders(orders);
  const activeTables = calculateActiveTables(orders);
  const dailySummary = groupOrdersByDate(orders);

  const filteredOrders = selectedDate
    ? orders.filter(
        (order) =>
          (order.date || new Date(order.createdAt).toLocaleDateString("en-CA")) === selectedDate
      )
    : orders;

  const handleViewDay = (date) => {
    setSelectedDate(date);
    setActiveSection("orders");
  };

  const handleDeleteDay = async (date, orderIds) => {
    if (!window.confirm(`هل أنت متأكد من حذف جميع طلبات يوم ${date}؟`)) return;
    await deleteDayOrders(orderIds);
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("تنبيه! هل أنت متأكد من حذف جميع الطلبات بالكامل؟")) return;
    await deleteAllOrders(orders);
  };

  const handleToggleStatus = async (orderId, currentStatus) => {
    await toggleOrderStatus(orderId, currentStatus);
  };

  const handleSaveNotes = async (orderId) => {
    const noteText = tempNotes[orderId];
    if (noteText === undefined) return;

    const result = await saveOrderNotes(orderId, noteText);
    if (result.success) alert("تم حفظ الملاحظة بنجاح!");
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;
    await deleteSingleOrder(orderId);
  };

  const handlePrint = (order) => {
    setPrintOrder(order);
    setTimeout(() => window.print(), 300);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleNoteChange = (orderId, value) => {
    setTempNotes((currentNotes) => ({ ...currentNotes, [orderId]: value }));
  };

  const handleDeleteProduct = async (orderId, productId) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المنتج من الطلب؟")) return;

    const order = orders.find((item) => item.id === orderId);
    if (!order) return;

    const result = await deleteProductFromOrder(order, productId);
    if (result.success) {
      if (result.deleted) {
        setShowModal(false);
        setSelectedOrder(null);
      } else {
        setSelectedOrder(result.updatedOrder);
      }
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="warning" style={{ width: 60, height: 60 }} />
        <p className="mt-3 text-muted fs-5">جاري تحميل لوحة التحكم...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <div style={{ fontSize: 48, marginBottom: 12 }}>!</div>
        <h5 className="text-danger">حدث خطأ أثناء تحميل الطلبات</h5>
        <p className="text-muted">{error.message}</p>
      </Container>
    );
  }

  return (
    <Container className="admin-dashboard py-5 text-end font">
      <InvoicePrintView order={printOrder} />

      <div className="no-print">
        <div className="admin-dashboard-header">
          <div>
            <h1>لوحة إدارة الكافيه</h1>
            <p>اختار القسم المطلوب وتابع الطلبات والمبيعات بدون تنقل معقد.</p>
          </div>
          <Button as={Link} to="/add" variant="dark" className="d-inline-flex align-items-center gap-2">
            <FaPlus /> إضافة منتج
          </Button>
        </div>

        <div className="admin-section-nav" role="tablist" aria-label="أقسام لوحة الإدارة">
          {sections.map((section) => (
            <button
              key={section.key}
              type="button"
              className={`admin-section-tab ${
                activeSection === section.key ? "admin-section-tab-active" : ""
              }`}
              onClick={() => setActiveSection(section.key)}
            >
              {section.icon}
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {activeSection === "overview" && (
          <>
            <StatsCards
              totalRevenue={totalRevenue}
              completedOrders={completedOrders}
              pendingOrders={pendingOrders}
              activeTables={activeTables}
            />

            <Row className="gy-3 mb-4">
              <Col md={3}>
                <Card className="admin-action-card">
                  <Card.Body>
                    <h5>الكاشير السريع</h5>
                    <p>أنشئ طلب الطاولة بسرعة من منتجات صغيرة وسلة مباشرة.</p>
                    <Button variant="success" onClick={() => setActiveSection("cashier")}>
                      فتح الكاشير
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="admin-action-card">
                  <Card.Body>
                    <h5>طلبات اليوم</h5>
                    <p>افتح قائمة الطلبات، غيّر الحالة، اطبع الفاتورة، أو أضف ملاحظة.</p>
                    <Button variant="primary" onClick={() => setActiveSection("orders")}>
                      عرض الطلبات
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="admin-action-card">
                  <Card.Body>
                    <h5>ملخص الأيام</h5>
                    <p>راجع مبيعات كل يوم وافتح تفاصيله مباشرة من جدول الملخص.</p>
                    <Button variant="outline-primary" onClick={() => setActiveSection("daily")}>
                      عرض الملخص
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="admin-action-card">
                  <Card.Body>
                    <h5>إدارة القائمة</h5>
                    <p>انتقل لإضافة منتج جديد إلى قائمة الطعام في صفحة مستقلة.</p>
                    <Button as={Link} to="/add" variant="outline-dark">
                      إضافة منتج
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}

        {activeSection === "orders" && (
          <OrdersTable
            filteredOrders={filteredOrders}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onToggleStatus={handleToggleStatus}
            onSaveNotes={handleSaveNotes}
            onDeleteOrder={handleDeleteOrder}
            onPrintOrder={handlePrint}
            onViewDetails={handleViewDetails}
            tempNotes={tempNotes}
            onNoteChange={handleNoteChange}
          />
        )}

        {activeSection === "cashier" && <CashierView />}

        {activeSection === "products" && <ProductManagement />}

        {activeSection === "categories" && <CategoryManager />}

        {activeSection === "daily" && (
          <>
            <div className="admin-section-heading">
              <h4>ملخص المبيعات اليومية</h4>
              <div className="d-flex gap-2 flex-wrap">
                <Button
                  variant="primary"
                  className="d-inline-flex align-items-center gap-2"
                  onClick={() => exportOrdersToExcel(orders)}
                >
                  <FaFileExcel /> تصدير Excel
                </Button>
                <Button
                  variant="outline-danger"
                  className="d-inline-flex align-items-center gap-2"
                  onClick={handleDeleteAll}
                >
                  <FaTrash /> حذف كل الطلبات
                </Button>
              </div>
            </div>

            <DailySummaryTable
              dailySummary={dailySummary}
              onViewDay={handleViewDay}
              onDeleteDay={handleDeleteDay}
            />
          </>
        )}

        {activeSection === "tools" && (
          <Row className="gy-3">
            <Col md={6}>
              <Card className="admin-action-card">
                <Card.Body>
                  <h5>تصدير الطلبات</h5>
                  <p>نزّل ملف Excel/CSV يحتوي على الطلبات الحالية والملاحظات والحالة.</p>
                  <Button
                    variant="primary"
                    className="d-inline-flex align-items-center gap-2"
                    onClick={() => exportOrdersToExcel(orders)}
                  >
                    <FaFileExcel /> تصدير الطلبات
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="admin-action-card admin-danger-card">
                <Card.Body>
                  <h5>تنظيف الطلبات</h5>
                  <p>احذف جميع الطلبات من النظام بعد التأكد من أنك لم تعد تحتاجها.</p>
                  <Button
                    variant="danger"
                    className="d-inline-flex align-items-center gap-2"
                    onClick={handleDeleteAll}
                  >
                    <FaTrash /> حذف جميع الطلبات
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </div>

      <ProductDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        selectedOrder={selectedOrder}
        onDeleteProduct={handleDeleteProduct}
      />
    </Container>
  );
}
