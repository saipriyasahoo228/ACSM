import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  MenuItem,
  Stack,
  Chip,
  Button,
  Grid,
} from "@mui/material";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function PermitHistory() {
  // Dummy permit data
  const permitRequests = [
    {
      id: "REQ-001",
      permitType: "Hot Work",
      location: "Boiler Room 1",
      selectedWorkers: ["Ravi Kumar", "Anita Sharma"],
      status: "Pending",
      submissionDate: "2025-10-10 09:00 AM",
      expiryDate: "2025-10-10 17:00 PM",
    },
    {
      id: "REQ-002",
      permitType: "Confined Space",
      location: "Tank 3",
      selectedWorkers: ["Vikas Singh"],
      status: "Approved",
      submissionDate: "2025-10-09 10:30 AM",
      expiryDate: "2025-10-09 18:00 PM",
    },
    {
      id: "REQ-003",
      permitType: "Electrical",
      location: "Generator Room",
      selectedWorkers: ["Ravi Kumar"],
      status: "Issued",
      submissionDate: "2025-10-08 08:45 AM",
      expiryDate: "2025-10-08 16:45 PM",
    },
    {
      id: "REQ-004",
      permitType: "Hot Work",
      location: "Boiler Room 2",
      selectedWorkers: ["Anita Sharma"],
      status: "Rejected",
      submissionDate: "2025-10-07 09:15 AM",
      expiryDate: "2025-10-07 17:15 PM",
    },
  ];

  const permitTypes = ["Hot Work", "Confined Space", "Electrical", "Work at Height"];
  const statusOptions = ["Pending", "Approved", "Issued", "Rejected"];
  const locations = ["Boiler Room 1", "Boiler Room 2", "Tank 3", "Generator Room"];
  const allWorkers = ["Ravi Kumar", "Anita Sharma", "Vikas Singh"];

  // Filters
  const [filter, setFilter] = useState({
    permitType: "",
    status: "",
    location: "",
    worker: "",
  });

  const handleFilterChange = (field, value) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  // Filtered data
  const filteredRequests = useMemo(() => {
    return permitRequests.filter((r) => {
      return (
        (!filter.permitType || r.permitType === filter.permitType) &&
        (!filter.status || r.status === filter.status) &&
        (!filter.location || r.location === filter.location) &&
        (!filter.worker || r.selectedWorkers.includes(filter.worker))
      );
    });
  }, [filter]);

  // Statistics
  const stats = useMemo(() => {
    const total = permitRequests.length;
    const pending = permitRequests.filter((r) => r.status === "Pending").length;
    const approved = permitRequests.filter((r) => r.status === "Approved").length;
    const issued = permitRequests.filter((r) => r.status === "Issued").length;
    const rejected = permitRequests.filter((r) => r.status === "Rejected").length;

    const byType = permitTypes.map((type) => ({
      type,
      count: permitRequests.filter((r) => r.permitType === type).length,
    }));

    return { total, pending, approved, issued, rejected, byType };
  }, [permitRequests]);

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Permit Type", "Location", "Workers", "Status", "Submission Date", "Expiry"];
    const tableRows = filteredRequests.map((r) => [
      r.id,
      r.permitType,
      r.location,
      r.selectedWorkers.join(", "),
      r.status,
      r.submissionDate,
      r.expiryDate,
    ]);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });
    doc.save("permit_history.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredRequests.map((r) => ({
        ID: r.id,
        "Permit Type": r.permitType,
        Location: r.location,
        Workers: r.selectedWorkers.join(", "),
        Status: r.status,
        "Submission Date": r.submissionDate,
        Expiry: r.expiryDate,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PermitHistory");
    XLSX.writeFile(wb, "permit_history.xlsx");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ textAlign: "center", p: 2, backgroundColor: "#E3F2FD" }}>
            <Typography variant="h6">{stats.total}</Typography>
            <Typography variant="body2">Total Permits</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ textAlign: "center", p: 2, backgroundColor: "#FFF4E5" }}>
            <Typography variant="h6">{stats.pending}</Typography>
            <Typography variant="body2">Pending</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ textAlign: "center", p: 2, backgroundColor: "#E7F6EC" }}>
            <Typography variant="h6">{stats.approved}</Typography>
            <Typography variant="body2">Approved</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ textAlign: "center", p: 2, backgroundColor: "#D1F2FF" }}>
            <Typography variant="h6">{stats.issued}</Typography>
            <Typography variant="body2">Issued</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ textAlign: "center", p: 2, backgroundColor: "#FFECEC" }}>
            <Typography variant="h6">{stats.rejected}</Typography>
            <Typography variant="body2">Rejected</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          select
          label="Permit Type"
          value={filter.permitType}
          onChange={(e) => handleFilterChange("permitType", e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {permitTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Status"
          value={filter.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {statusOptions.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Location"
          value={filter.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {locations.map((l) => (
            <MenuItem key={l} value={l}>
              {l}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Worker"
          value={filter.worker}
          onChange={(e) => handleFilterChange("worker", e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {allWorkers.map((w) => (
            <MenuItem key={w} value={w}>
              {w}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {/* Export Buttons */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={exportPDF}>
          Export PDF
        </Button>
        <Button variant="contained" color="success" onClick={exportExcel}>
          Export Excel
        </Button>
      </Stack>

      {/* Permit Table */}
      <Card
      sx={{
          borderLeft: "6px solid #082A52",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          borderRadius: 2,
        }}
      >
        <CardHeader
          title={<Typography variant="h6">Permit History</Typography>}
        />
        <CardContent>
          <Table>
            <TableHead sx={{ backgroundColor: "#E3F2FD" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Permit Type</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Workers</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submission Date</TableCell>
                <TableCell>Expiry</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.id}</TableCell>
                  <TableCell>{req.permitType}</TableCell>
                  <TableCell>{req.location}</TableCell>
                  <TableCell>
                    {req.selectedWorkers.join(", ")}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={req.status}
                      size="small"
                      sx={{
                        backgroundColor:
                          req.status === "Pending"
                            ? "#FFF4E5"
                            : req.status === "Approved"
                            ? "#E7F6EC"
                            : req.status === "Issued"
                            ? "#D1F2FF"
                            : "#FFECEC",
                        color:
                          req.status === "Pending"
                            ? "#F57C00"
                            : req.status === "Approved"
                            ? "#2E7D32"
                            : req.status === "Issued"
                            ? "#0277BD"
                            : "#C62828",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>{req.submissionDate}</TableCell>
                  <TableCell>{req.expiryDate}</TableCell>
                </TableRow>
              ))}
              {filteredRequests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    No permits found with current filters.
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
