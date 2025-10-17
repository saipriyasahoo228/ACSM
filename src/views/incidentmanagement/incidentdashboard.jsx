
import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  WarningAmber,
  ReportProblem,
  AssignmentTurnedIn,
  Insights,
  Visibility,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const IncidentDashboard = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Summary cards
  const summary = [
    {
      title: "Total Incidents",
      value: 42,
      icon: <WarningAmber />,
      gradient: "linear-gradient(135deg, #ff6a00, #ee0979)",
    },
    {
      title: "Open Incidents",
      value: 10,
      icon: <ReportProblem />,
      gradient: "linear-gradient(135deg, #43cea2, #185a9d)",
    },
    {
      title: "Closed Incidents",
      value: 25,
      icon: <AssignmentTurnedIn />,
      gradient: "linear-gradient(135deg, #11998e, #38ef7d)",
    },
    {
      title: "CAPA Pending",
      value: 7,
      icon: <Insights />,
      gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
    },
  ];

  // Pie chart data
  const categoryData = [
    { name: "Near Miss", value: 12, color: "#00C49F" },
    { name: "First Aid", value: 10, color: "#FFBB28" },
    { name: "LTI", value: 8, color: "#FF8042" },
    { name: "Dangerous Occurrence", value: 12, color: "#8884D8" },
  ];

  // Line chart data
  const monthlyData = [
    { month: "Jan", incidents: 4 },
    { month: "Feb", incidents: 6 },
    { month: "Mar", incidents: 5 },
    { month: "Apr", incidents: 8 },
    { month: "May", incidents: 3 },
    { month: "Jun", incidents: 6 },
    { month: "Jul", incidents: 9 },
    { month: "Aug", incidents: 4 },
    { month: "Sep", incidents: 7 },
    { month: "Oct", incidents: 5 },
  ];

  // Table dummy data
  const recentIncidents = [
    {
      id: "INC-001",
      category: "Near Miss",
      date: "2025-10-01",
      location: "Plant A",
      status: "Open",
      capa: "Pending",
      reporter: "John Doe",
      description:
        "Worker slipped on wet floor but avoided injury. Housekeeping notified.",
    },
    {
      id: "INC-002",
      category: "First Aid",
      date: "2025-09-22",
      location: "Plant B",
      status: "Closed",
      capa: "Completed",
      reporter: "Amit Sharma",
      description:
        "Minor cut while handling tools. First aid given, no lost time.",
    },
    {
      id: "INC-003",
      category: "LTI",
      date: "2025-09-10",
      location: "Warehouse",
      status: "Under Investigation",
      capa: "Pending",
      reporter: "Rahul Singh",
      description:
        "Forklift collision causing ankle injury. Investigation ongoing.",
    },
  ];

  const handleView = (incident) => setSelectedIncident(incident);
  const handleClose = () => setSelectedIncident(null);

  return (
    <Box
      sx={{
        p: 4,
        background: "linear-gradient(135deg, #f5f7fa, #e8ecf3)",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
          textAlign: "center",
          color: "#0A3A6E",
        }}
      >
        Incident Management Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3}>
        {summary.map((card, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card
              sx={{
                background: card.gradient,
                color: "#fff",
                p: 3,
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box sx={{ fontSize: 36 }}>{card.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {card.value}
                </Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 500 }}>
                {card.title}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pie Chart - Full Width */}
      <Card
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #f8faff, #e8f0ff, #aabff7ff)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "#0A3A6E", textAlign: "center" }}
        >
          Incident Category Distribution
        </Typography>
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={150}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      {/* Line Chart - Full Width */}
      <Card
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #ffffff, #b994e7ff)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "#0A3A6E", textAlign: "center" }}
        >
          Monthly Incident Review
        </Typography>
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="incidents"
                stroke="#6C63FF"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      {/* Recent Incidents Table */}
      <Card
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #ffffff, #c7cc9cff)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "#0A3A6E", textAlign: "center" }}
        >
          Recent Incidents
        </Typography>
        <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead
              sx={{
                background: "linear-gradient(90deg, #e3f2fd, #f9f9f9)",
              }}
            >
              <TableRow>
                <TableCell>Incident ID</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>CAPA</TableCell>
                <TableCell align="center">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentIncidents.map((incident, i) => (
                <TableRow key={i}>
                  <TableCell>{incident.id}</TableCell>
                  <TableCell>{incident.category}</TableCell>
                  <TableCell>{incident.date}</TableCell>
                  <TableCell>{incident.location}</TableCell>
                  <TableCell>{incident.status}</TableCell>
                  <TableCell>{incident.capa}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleView(incident)}>
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Card>

      {/* View Dialog */}
      <Dialog open={!!selectedIncident} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: "#0A3A6E", color: "#fff" }}>
          {selectedIncident?.id} - {selectedIncident?.category}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedIncident && (
            <>
              <Typography><strong>Date:</strong> {selectedIncident.date}</Typography>
              <Typography><strong>Location:</strong> {selectedIncident.location}</Typography>
              <Typography><strong>Status:</strong> {selectedIncident.status}</Typography>
              <Typography><strong>CAPA:</strong> {selectedIncident.capa}</Typography>
              <Typography><strong>Reporter:</strong> {selectedIncident.reporter}</Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Description:</strong> {selectedIncident.description}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IncidentDashboard;
