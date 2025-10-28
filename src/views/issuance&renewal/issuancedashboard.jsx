
import React from "react";
import {
  Box,
  Card,
  Stack,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Paper,
  Avatar,
} from "@mui/material";
import {
  Inventory,
  Assignment,
  People,
  Update,
  TrendingUp,
  Warning,
} from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Dummy Data
const stockSummary = [
  {
    title: "Total Stock Items",
    count: 120,
    icon: <Inventory fontSize="large" />,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    trend: "+12%",
  },
  {
    title: "New Issuances",
    count: 45,
    icon: <Assignment fontSize="large" />,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    trend: "+8%",
  },
  {
    title: "Employee Acknowledgements",
    count: 78,
    icon: <People fontSize="large" />,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    trend: "+15%",
  },
  {
    title: "Renewals Pending",
    count: 12,
    icon: <Update fontSize="large" />,
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    trend: "-5%",
  },
];

const stockDistribution = [
  { name: "PPE", value: 60, color: "#667eea" },
  { name: "Tools", value: 40, color: "#764ba2" },
];

const recentRenewals = [
  {
    id: "STK:001",
    itemName: "Safety Helmet",
    employee: "Employee 1",
    status: "Available",
    expiryDate: "2025-12-31",
  },
  {
    id: "STK:002",
    itemName: "Acid-Resistant Gloves",
    employee: "Employee 2",
    status: "Low Stock",
    expiryDate: "2025-12-31",
  },
  {
    id: "STK:003",
    itemName: "Tool Kit",
    employee: "Employee 3",
    status: "Available",
    expiryDate: "2025-12-31",
  },
];

const stockRecords = [
  {
    id: "STK-001",
    itemName: "Safety Helmet",
    quantity: 50,
    location: "Store 1",
    status: "Available",
  },
  {
    id: "STK-002",
    itemName: "Acid-Resistant Gloves",
    quantity: 8,
    location: "Store 2",
    status: "Low Stock",
  },
  {
    id: "STK-003",
    itemName: "Tool Kit",
    quantity: 20,
    location: "Store 1",
    status: "Available",
  },
];

const StatusChip = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case "Available":
        return "success";
      case "Low Stock":
        return "warning";
      default:
        return "default";
    }
  };

  const getIcon = () => {
    switch (status) {
      case "Available":
        return <TrendingUp sx={{ fontSize: 16 }} />;
      case "Low Stock":
        return <Warning sx={{ fontSize: 16 }} />;
      default:
        return null;
    }
  };

  return (
    <Chip
      icon={getIcon()}
      label={status}
      color={getColor()}
      variant="filled"
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
};

export default function StockDashboard() {
  return (
    <Box sx={{ p: 4, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #c8c5fbff, #97dde0ff)",
          borderRadius: 2,
          p: 3,
          mb: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Stock Management Dashboard
        </Typography>
        <Typography variant="body1">
          Overview of stock distribution, renewals, and inventory status
        </Typography>
      </Box>

      {/* Summary Cards using Stack */}
      <Stack
        direction="row"
        spacing={3}
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{ mb: 5 }}
      >
        {stockSummary.map((card, idx) => (
          <Card
            key={idx}
            sx={{
              flex: 1,
              minWidth: 270,
              height: 180,
              color: "white",
              background: card.gradient,
              borderRadius: 3,
              boxShadow: 4,
              p: 3,
            }}
          >
            <Stack direction="row" spacing={3} alignItems="center" height="100%">
              <Avatar sx={{ bgcolor: "#fff", color: "#000" }}>{card.icon}</Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
                  {card.title}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, lineHeight: 1.2, mt: 1 }}
                >
                  {card.count}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.9, display: "flex", alignItems: "center" }}
                >
                  <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} /> {card.trend} from
                  last month
                </Typography>
              </Box>
            </Stack>
          </Card>
        ))}
      </Stack>

      {/* Pie Chart & Recent Renewals using Stack */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 5 }}>
        {/* Pie Chart */}
        <Card
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            boxShadow: 4,
            background: "linear-gradient(135deg, #ffffff, #d39ce0ff)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Stock Distribution Pie Chart
          </Typography>
          <Box sx={{ width: "100%", height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {stockDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Card>

        {/* Renewals Table */}
        <Card
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            boxShadow: 4,
            background: "linear-gradient(135deg, #ffffff, #86c6b5ff)",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Recent Renewals
            </Typography>
            <Chip
              label={`${recentRenewals.length} total`}
              size="small"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Stack>
          <Paper variant="outlined" sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#fdf9f5" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Renewal ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Item</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Expiry Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentRenewals.map((row, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>{row.itemName}</Typography>
                      <Typography variant="caption">{row.employee}</Typography>
                    </TableCell>
                    <TableCell>
                      <StatusChip status={row.status} />
                    </TableCell>
                    <TableCell>{row.expiryDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Card>
      </Stack>

      {/* Stock Records Table */}
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
          background: "linear-gradient(135deg, #ffffff, #c7cc9cff)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Stock Records
          </Typography>
          <Chip
            label={`${stockRecords.length} items`}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Stack>
        <Paper variant="outlined" sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#fdf9f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Item ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Item Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockRecords.map((record, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.itemName}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.quantity}
                      size="small"
                      variant="outlined"
                      color={
                        record.quantity < 10 ? "warning" : "primary"
                      }
                    />
                  </TableCell>
                  <TableCell>{record.location}</TableCell>
                  <TableCell>
                    <StatusChip status={record.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Card>
    </Box>
  );
}
