
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  ReportProblem,
  Warning,
  CheckCircle,
  Engineering,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const THEME_PRIMARY = "#0E4C92";
const PIE_COLORS = ["#0E4C92", "#2e7d32", "#f57c00", "#c62828"];

const IncidentDashboard = () => {
  // Dummy summary data
  const totals = {
    totalIncidents: 45,
    openIncidents: 12,
    resolvedIncidents: 28,
    highRisk: 5,
  };

  // Dummy Pie chart data
  const pieData = [
    { name: "Resolved", value: 28 },
    { name: "Open", value: 12 },
    { name: "High Risk", value: 5 },
  ];

  // Dummy Bar chart data
  const barData = [
    { name: "Site A", Incidents: 10 },
    { name: "Site B", Incidents: 7 },
    { name: "Site C", Incidents: 15 },
    { name: "Site D", Incidents: 13 },
  ];

  // Dummy incident table
  const recentIncidents = [
    { id: 1, site: "Site A", type: "Slip & Fall", severity: "High", status: "Open" },
    { id: 2, site: "Site B", type: "Equipment Failure", severity: "Medium", status: "Resolved" },
    { id: 3, site: "Site C", type: "Fire", severity: "High", status: "Open" },
    { id: 4, site: "Site D", type: "Chemical Spill", severity: "Low", status: "Resolved" },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box
  sx={{
    background: "linear-gradient(90deg, #b5dff1ff, #94b2eaff)",
    color: "#fff",
    borderRadius: 2,
    p: 3,
    mb: 4,
    boxShadow: 3,
  }}
>
  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0.5 }}>
    Incident Management Dashboard
  </Typography>
  <Typography variant="body1">
    Real-time tracking of incidents, safety metrics, and risk performance
  </Typography>
</Box>


      {/* KPI Cards Row */}
      <Stack direction="row" spacing={3} sx={{ mb: 5 }} useFlexGap flexWrap="wrap">
        <Card sx={{ flex: 1, minWidth: 250, borderRadius: 3, boxShadow: 4 ,background: "linear-gradient(90deg, #f3dab9ff, #f3bf86ff)"}}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <ReportProblem sx={{ fontSize: 56, color: THEME_PRIMARY, mb: 1 }} />
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              Total Incidents
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: THEME_PRIMARY }}>
              {totals.totalIncidents}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 250, borderRadius: 3, boxShadow: 4 ,background: "linear-gradient(90deg, #f0d1efff, #ef9efdff)"}}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Warning sx={{ fontSize: 56, color: "#f57c00", mb: 1 }} />
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              Open Incidents
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#f57c00" }}>
              {totals.openIncidents}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 250, borderRadius: 3, boxShadow: 4 ,background: "linear-gradient(90deg, #c1f0e8ff, #96b2e8ff)"}}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <CheckCircle sx={{ fontSize: 56, color: "#2e7d32", mb: 1 }} />
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              Resolved Incidents
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#2e7d32" }}>
              {totals.resolvedIncidents}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 250, borderRadius: 3, boxShadow: 4 ,background: "linear-gradient(90deg, #ecdfbdff, #a1ddb4ff)"}}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Engineering sx={{ fontSize: 56, color: "#c62828", mb: 1 }} />
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              High-Risk Incidents
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#c62828" }}>
              {totals.highRisk}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Charts Row */}
      <Stack direction="row" spacing={3} sx={{ mb: 5 }} useFlexGap flexWrap="wrap">
        <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 4, p: 3, height: 440 ,background: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)", }}>
          <Typography variant="h6" sx={{ mb: 2, color: THEME_PRIMARY, fontWeight: 700 }}>
            Incident Type Distribution
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PieChart width={420} height={360}>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={120} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <ReTooltip />
              <Legend />
            </PieChart>
          </Box>
        </Card>

        <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 4, p: 3, height: 440 ,background: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)", }}>
          <Typography variant="h6" sx={{ mb: 2, color: THEME_PRIMARY, fontWeight: 700 }}>
            Incidents by Site
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <BarChart width={600} height={360} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ReTooltip />
              <Legend />
              <Bar dataKey="Incidents" fill={THEME_PRIMARY} barSize={40} />
            </BarChart>
          </Box>
        </Card>
      </Stack>

      {/* Recent Incidents Table */}
      <Card sx={{ borderRadius: 3, boxShadow: 4 ,background: "linear-gradient(135deg, #b2eef1ff 0%, #e7dee8ff 100%)", }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: THEME_PRIMARY, fontWeight: 700 }}>
            Recent Incident Records
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Site</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentIncidents.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.site}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.severity}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default IncidentDashboard;
