import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
} from "@mui/material";
import {
  Assessment,
  WarningAmber,
  Error,
  Star,
  FileDownload,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import * as XLSX from "xlsx";

const COLORS = ["#4caf50", "#ffb300", "#f44336"];

const pieData = [
  { name: "On Target", value: 58 },
  { name: "Warning", value: 25 },
  { name: "Breached", value: 17 },
];

const trendData = [
  { month: "Jan", value: 75 },
  { month: "Feb", value: 82 },
  { month: "Mar", value: 88 },
  { month: "Apr", value: 80 },
  { month: "May", value: 92 },
  { month: "Jun", value: 89 },
];

const contractorData = [
  { contractor: "ABC Infra", score: 92, status: "Green" },
  { contractor: "BuildTech", score: 78, status: "Amber" },
  { contractor: "SafeWorks", score: 68, status: "Amber" },
  { contractor: "ZenConstructions", score: 54, status: "Red" },
  { contractor: "MegaInfra", score: 95, status: "Green" },
];

const exportLeagueTable = () => {
  const ws = XLSX.utils.json_to_sheet(contractorData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "KPI_League");
  XLSX.writeFile(wb, "KPI_League_Table.xlsx");
};

const KPIDashboard = () => {
  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
       <Box
             sx={{
               background: "linear-gradient(90deg, #c8c5fbff, #97dde0ff)",
               color: "#fff",
               borderRadius: 2,
               p: 2,
               mb: 3,
               boxShadow: 3,
             }}
           >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          KPI Monitoring Dashboard
        </Typography>
        <Typography variant="body1">
          Real-time overview of safety KPIs and contractor performance
        </Typography>
      </Box>

      {/* Summary Cards */}
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
            minHeight: 140,
          }}
        >
          <Assessment sx={{ fontSize: 45, color: "#2e7d32" }} />
          <Typography variant="h6">KPIs On Target</Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            58%
          </Typography>
        </Card>

        <Card
          sx={{
            flex: 1,
            p: 3,
            textAlign: "center",
            background: "linear-gradient(45deg, #fff8e1, #ffe082)",
            minHeight: 140,
          }}
        >
          <WarningAmber sx={{ fontSize: 45, color: "#ff8f00" }} />
          <Typography variant="h6">KPIs in Warning</Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            25%
          </Typography>
        </Card>

        <Card
          sx={{
            flex: 1,
            p: 3,
            textAlign: "center",
            background: "linear-gradient(45deg, #ffebee, #ef9a9a)",
            minHeight: 140,
          }}
        >
          <Error sx={{ fontSize: 45, color: "#d32f2f" }} />
          <Typography variant="h6">KPIs Breached</Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            17%
          </Typography>
        </Card>

        <Card
          sx={{
            flex: 1,
            p: 3,
            textAlign: "center",
            background: "linear-gradient(45deg, #ede7f6, #d1c4e9)",
            minHeight: 140,
          }}
        >
          <Star sx={{ fontSize: 45, color: "#512da8" }} />
          <Typography variant="h6">Avg. Contractor Score</Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            82%
          </Typography>
        </Card>
      </Stack>

      {/* Charts Section */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={3}
        sx={{ mb: 4 }}
      >
        {/* Pie Chart */}
        <Card sx={{ flex: 1, p: 3, height: 400 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, color: "#36368dff", fontWeight: "bold" }}
          >
            KPI Status Distribution
          </Typography>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Card>

        {/* Line Chart */}
        <Card sx={{ flex: 2, p: 3, height: 400 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, color: "#36368dff", fontWeight: "bold" }}
          >
            KPI Trend Over Time
          </Typography>
          <LineChart width={600} height={300} data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#7267ef"
              strokeWidth={3}
            />
          </LineChart>
        </Card>
      </Stack>

      {/* Bar Chart */}
      <Card sx={{ p: 3, mb: 4, height: 420 }}>
        <Typography
          variant="h6"
          sx={{ mb: 2, color: "#36368dff", fontWeight: "bold" }}
        >
          KPI Performance by Contractor
        </Typography>
        <BarChart width={900} height={300} data={contractorData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="contractor" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="score" fill="#7267ef" barSize={50} />
        </BarChart>
      </Card>

      {/* League Table */}
      <Card>
        <CardHeader
          title={
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Contractor KPI League Table
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#7267ef",
                  textTransform: "none",
                  px: 3,
                }}
                startIcon={<FileDownload />}
                onClick={exportLeagueTable}
              >
                Export Excel
              </Button>
            </Stack>
          }
        />
        <CardContent>
          <Table>
            <TableHead sx={{ background: "#ede7f6" }}>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Contractor</TableCell>
                <TableCell>KPI Score (%)</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contractorData.map((c, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{c.contractor}</TableCell>
                  <TableCell>{c.score}</TableCell>
                  <TableCell>
                    <Chip
                      label={c.status}
                      color={
                        c.status === "Green"
                          ? "success"
                          : c.status === "Amber"
                          ? "warning"
                          : "error"
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default KPIDashboard;
