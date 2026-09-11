import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaMoneyBillWave, FaCheckCircle, FaClock, FaUtensils } from "react-icons/fa";

export default function StatsCards({ totalRevenue, completedOrders, pendingOrders, activeTables }) {
  const stats = [
    {
      title: "إجمالي المبيعات",
      value: `${totalRevenue.toFixed(1)} د.أ`,
      icon: <FaMoneyBillWave />,
      bg: "#e3f2fd",
      color: "#0d47a1",
    },
    {
      title: "الطلبات المنجزة",
      value: completedOrders,
      icon: <FaCheckCircle />,
      bg: "#e8f5e9",
      color: "#1b5e20",
    },
    {
      title: "طلبات قيد الانتظار",
      value: pendingOrders,
      icon: <FaClock />,
      bg: "#fff3e0",
      color: "#e65100",
    },
    {
      title: "نشاط الطاولات",
      value: `${activeTables} طاولات`,
      icon: <FaUtensils />,
      bg: "#f3e5f5",
      color: "#4a148c",
    },
  ];

  return (
    <Row className="gy-4 mb-5 text-end">
      {stats.map((item, idx) => (
        <Col xs={12} sm={6} lg={3} key={idx}>
          <Card className="stats-card p-3 d-flex flex-row align-items-center justify-content-between">
            <div className="card-icon-wrapper" style={{ backgroundColor: item.bg, color: item.color }}>
              {item.icon}
            </div>
            <div>
              <div className="text-muted mb-1" style={{ fontSize: 14 }}>{item.title}</div>
              <h3 className="fw-bold m-0" style={{ color: "#333" }}>{item.value}</h3>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
