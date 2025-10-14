import React from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const PermitDashboard = () => {
  // Dummy stats data
  const data = [
    { name: "Hot Work", value: 20 },
    { name: "Confined Space", value: 12 },
    { name: "Electrical", value: 10 },
    { name: "Work at Height", value: 18 },
    { name: "Lifting", value: 8 },
    { name: "Excavation", value: 6 },
    { name: "Isolation/LOTO", value: 5 },
  ];

  const COLORS = ["#7267EF", "#4CAF50", "#FFB300", "#E53935", "#0097A7", "#8E24AA", "#1976D2"];

  const total = data.reduce((acc, item) => acc + item.value, 0);
  const active = 22;
  const pending = 12;
  const expired = 7;

  return (
    <div className="container-fluid py-4">
      {/* HEADER */}
      <h4 className="mb-4" style={{ color: "#082A52", fontWeight: "700" }}>
        🧾 Permit Overview Dashboard
      </h4>

      {/* STAT CARDS */}
      <Row className="g-4 mb-4">
        {[
          { title: "Total Permits", value: total, color1: "#7267EF", color2: "#A993FF", icon: "feather icon-layers" },
          { title: "Active Permits", value: active, color1: "#43A047", color2: "#81C784", icon: "feather icon-check-circle" },
          { title: "Pending Approvals", value: pending, color1: "#FFB300", color2: "#FFD54F", icon: "feather icon-clock" },
          { title: "Expired Permits", value: expired, color1: "#E53935", color2: "#EF9A9A", icon: "feather icon-alert-circle" },
        ].map((card, index) => (
          <Col md={3} sm={6} key={index}>
            <Card
              className="text-white shadow-lg border-0"
              style={{
                background: `linear-gradient(135deg, ${card.color1}, ${card.color2})`,
                borderRadius: "16px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="fw-bold mb-1">{card.title}</h6>
                  <h3 className="fw-bolder mb-0">{card.value}</h3>
                </div>
                <i className={`${card.icon} fs-3 opacity-75`} style={{ fontSize: "2rem" }}></i>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* PIE CHART & TABLE */}
      <Row>
        <Col md={6}>
          <Card
            className="shadow-sm border-0"
            style={{ borderRadius: "16px", height: "100%", boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}
          >
            <Card.Header style={{ background: "#F5F7FF", borderRadius: "16px 16px 0 0" }}>
              <h6 className="fw-bold text-dark mb-0">Permit Distribution by Type</h6>
            </Card.Header>
            <Card.Body style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label={({ name }) => name}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card
            className="shadow-sm border-0"
            style={{ borderRadius: "16px", boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}
          >
            <Card.Header style={{ background: "#F5F7FF", borderRadius: "16px 16px 0 0" }}>
              <h6 className="fw-bold text-dark mb-0">Permit Summary by Type</h6>
            </Card.Header>
            <Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
              <Table hover responsive>
                <thead style={{ backgroundColor: "#E8EAF6" }}>
                  <tr>
                    <th>Permit Type</th>
                    <th>Total Issued</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.name}</td>
                      <td>{d.value}</td>
                      <td>{((d.value / total) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PermitDashboard;
