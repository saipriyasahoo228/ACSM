import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Groups,
  CheckCircle,
  Person,
  ReportProblem,
  FileDownload,
  Refresh,
  Search,
} from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip as ReTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import * as XLSX from "xlsx";

/**
 * Spacious DailyWorkforceDashboard
 * - Theme: #0E4C92
 * - Large KPI cards, charts, roomy table
 * - Sample data (dummy) included; replace with API data as required
 */

// Theme colors
const THEME_PRIMARY = "#0E4C92";
// Sample data (dummy)
const SAMPLE_WORKFORCE_BY_SITE = [
  { id: 1, project: "Plant A - Civil", total: 120, present: 110, absent: 8, incidents: 1 },
  { id: 2, project: "Plant B - Electrical", total: 90, present: 82, absent: 6, incidents: 0 },
  { id: 3, project: "Plant C - Mechanical", total: 150, present: 140, absent: 6, incidents: 2 },
  { id: 4, project: "Plant D - Finishing", total: 65, present: 62, absent: 2, incidents: 0 },
];

// Pie & Bar data derive from above
const makePieData = (sites) => [
  { name: "Present", value: sites.reduce((s, r) => s + r.present, 0) },
  { name: "Absent", value: sites.reduce((s, r) => s + r.absent, 0) },
  { name: "Incidents", value: sites.reduce((s, r) => s + r.incidents, 0) },
];

const PIE_COLORS = ["#4caf50", "#ff9800", "#f44336"];

export default function DailyWorkforceDashboard() {
  // state (you can wire to API later)
  const [sites] = useState(SAMPLE_WORKFORCE_BY_SITE);
  const [search, setSearch] = useState("");

  const pieData = useMemo(() => makePieData(sites), [sites]);
  const barData = useMemo(
    () => sites.map((s) => ({ name: s.project.replace(/ - .*$/, ""), Attendance: Math.round((s.present / s.total) * 100) })),
    [sites]
  );

  // computed totals
  const totals = useMemo(() => {
    const totalWorkforce = sites.reduce((s, r) => s + r.total, 0);
    const totalPresent = sites.reduce((s, r) => s + r.present, 0);
    const totalAbsent = sites.reduce((s, r) => s + r.absent, 0);
    const totalIncidents = sites.reduce((s, r) => s + r.incidents, 0);
    const attendancePct = totalWorkforce ? ((totalPresent / totalWorkforce) * 100).toFixed(1) : "0.0";
    return { totalWorkforce, totalPresent, totalAbsent, totalIncidents, attendancePct };
  }, [sites]);

  const filteredSites = useMemo(() => {
    if (!search) return sites;
    const s = search.toLowerCase();
    return sites.filter((r) => r.project.toLowerCase().includes(s));
  }, [sites, search]);

  // Export CSV (workforce table)
  const exportWorkforce = () => {
    const rows = sites.map((r) => ({
      Project: r.project,
      Total: r.total,
      Present: r.present,
      Absent: r.absent,
      Incidents: r.incidents,
      "Attendance %": ((r.present / r.total) * 100).toFixed(1),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Workforce");
    XLSX.writeFile(wb, `Workforce_Report_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <Box sx={{ p: 4, background: "#f4f6f8", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
               background: "linear-gradient(90deg, #7355a7ff, #97dde0ff)",
               color: "#fff",
               borderRadius: 2,
               p: 2,
               mb: 3,
               boxShadow: 3,
             }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Daily Workforce Dashboard
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.95 }}>
          Spacious view of workforce attendance, compliance & safety incidents
        </Typography>
      </Box>

      {/* Large KPI Cards */}
     <Stack
  direction={{ xs: "column", md: "row" }}
  spacing={3}
  sx={{ mb: 4 }}
>
  <Card
    sx={{
      flex: 1,
      p: 3,
      textAlign: "center",
      background: "linear-gradient(45deg, #e3f2fd, #a5d6a7)",
      minHeight: 160,
      borderRadius: 3,
      boxShadow: 4,
    }}
  >
    <Groups sx={{ fontSize: 48, color: "#2e7d32", mb: 1 }} />
    <Typography variant="h6">Total Workforce</Typography>
    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
      {totals.totalWorkforce}
    </Typography>
    <Typography variant="caption">Across all active sites</Typography>
  </Card>

  <Card
    sx={{
      flex: 1,
      p: 3,
      textAlign: "center",
      background: "linear-gradient(45deg, #fff8e1, #ffe082)",
      minHeight: 160,
      borderRadius: 3,
      boxShadow: 4,
    }}
  >
    <CheckCircle sx={{ fontSize: 48, color: "#2e7d32", mb: 1 }} />
    <Typography variant="h6">Present Today</Typography>
    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
      {totals.totalPresent}
    </Typography>
    <Typography variant="caption">{totals.totalPresent} present</Typography>
  </Card>

  <Card
    sx={{
      flex: 1,
      p: 3,
      textAlign: "center",
      background: "linear-gradient(45deg, #ffe0b2, #ffcc80)",
      minHeight: 160,
      borderRadius: 3,
      boxShadow: 4,
    }}
  >
    <Person sx={{ fontSize: 48, color: "#f57c00", mb: 1 }} />
    <Typography variant="h6">Attendance %</Typography>
    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
      {totals.attendancePct}%
    </Typography>
    <Typography variant="caption">Overall site attendance</Typography>
  </Card>

  <Card
    sx={{
      flex: 1,
      p: 3,
      textAlign: "center",
      background: "linear-gradient(45deg, #ffebee, #ef9a9a)",
      minHeight: 160,
      borderRadius: 3,
      boxShadow: 4,
    }}
  >
    <ReportProblem sx={{ fontSize: 48, color: "#c62828", mb: 1 }} />
    <Typography variant="h6">Safety Incidents</Typography>
    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
      {totals.totalIncidents}
    </Typography>
    <Typography variant="caption">Reported today</Typography>
  </Card>
</Stack>


     {/* Charts Section */}
<Stack
  direction={{ xs: "column", lg: "row" }}
  spacing={3}
  sx={{ mb: 4 }}
>
  {/* Pie Chart */}
  <Card
    sx={{
      flex: 1,
      p: 3,
      height: 440,
      borderRadius: 3,
      boxShadow: 4,
      background: "linear-gradient(135deg, #cfbeedff 0%, #e5f6c9ff 100%)",

    }}
  >
    <Typography
      variant="h6"
      sx={{ mb: 2, color: THEME_PRIMARY, fontWeight: 700 }}
    >
      Workforce Distribution
    </Typography>
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <PieChart width={420} height={360}>
        <Pie
          data={pieData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PIE_COLORS[index % PIE_COLORS.length]}
            />
          ))}
        </Pie>
        <ReTooltip />
        <Legend />
      </PieChart>
    </Box>
  </Card>

  {/* Bar Chart */}
  <Card
    sx={{
      flex: 1.5,
      p: 3,
      height: 440,
      borderRadius: 3,
      boxShadow: 4,
      background: "linear-gradient(135deg, #d2bef5ff 0%, #e5f6c9ff 100%)",
    }}
  >
    <Typography
      variant="h6"
      sx={{ mb: 2, color: THEME_PRIMARY, fontWeight: 700 }}
    >
      Attendance Trend by Site
    </Typography>
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <BarChart width={620} height={360} data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ReTooltip />
        <Legend />
        <Bar dataKey="Attendance" fill={THEME_PRIMARY} barSize={40} />
      </BarChart>
    </Box>
  </Card>
</Stack>


      {/* Table Section (large roomy table) */}
      <Card sx={{ borderRadius: 3, boxShadow: 4 ,background: "linear-gradient(135deg, #f1eeb2ff 0%, #e6c7fbff 100%)",}}>
        <CardHeader
          title={
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" sx={{ fontWeight: 800, color: THEME_PRIMARY }}>
                Workforce Details by Project
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <TextSearch
                  value={search}
                  onChange={(v) => setSearch(v)}
                  placeholder="Search project..."
                />
                <Tooltip title="Refresh">
                  <IconButton onClick={() => window.location.reload()}>
                    <Refresh />
                  </IconButton>
                </Tooltip>
                <Button variant="contained" startIcon={<FileDownload />} sx={{ background: THEME_PRIMARY }} onClick={exportWorkforce}>
                  Export
                </Button>
              </Stack>
            </Stack>
          }
          sx={{ pb: 0 }}
        />
        <CardContent sx={{ p: 3 }}>
          <Table>
            <TableHead sx={{ background: "#ede7f6" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: THEME_PRIMARY, py: 2 }}>Project</TableCell>
                <TableCell sx={{ fontWeight: 800, color: THEME_PRIMARY, py: 2 }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 800, color: THEME_PRIMARY, py: 2 }}>Present</TableCell>
                <TableCell sx={{ fontWeight: 800, color: THEME_PRIMARY, py: 2 }}>Absent</TableCell>
                <TableCell sx={{ fontWeight: 800, color: THEME_PRIMARY, py: 2 }}>Incidents</TableCell>
                <TableCell sx={{ fontWeight: 800, color: THEME_PRIMARY, py: 2 }}>Attendance %</TableCell>
                <TableCell sx={{ fontWeight: 800, color: THEME_PRIMARY, py: 2 }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredSites.map((row) => {
                const pct = ((row.present / row.total) * 100).toFixed(1);
                const status =
                  pct >= 95 ? "Excellent" : pct >= 85 ? "Good" : pct >= 75 ? "Monitor" : "Critical";
                const chipColor = status === "Excellent" ? "success" : status === "Good" ? "primary" : status === "Monitor" ? "warning" : "error";

                return (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ py: 2, fontSize: "1rem" }}>{row.project}</TableCell>
                    <TableCell sx={{ py: 2, fontSize: "1rem" }}>{row.total}</TableCell>
                    <TableCell sx={{ py: 2, fontSize: "1rem" }}>{row.present}</TableCell>
                    <TableCell sx={{ py: 2, fontSize: "1rem" }}>{row.absent}</TableCell>
                    <TableCell sx={{ py: 2, fontSize: "1rem" }}>{row.incidents}</TableCell>
                    <TableCell sx={{ py: 2, fontSize: "1rem", fontWeight: 700 }}>{pct}%</TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Chip label={status} color={chipColor} />
                    </TableCell>
                  </TableRow>
                );
              })}

              {filteredSites.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">No records found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}

/* ---------- Small helper component: TextSearch ---------- */
function TextSearch({ value, onChange, placeholder = "Search..." }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", background: "white", borderRadius: 2, px: 1 }}>
      <Search sx={{ color: "text.secondary", mr: 1 }} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ border: "none", outline: "none", padding: "8px 6px", minWidth: 220 }}
      />
    </Box>
  );
}
