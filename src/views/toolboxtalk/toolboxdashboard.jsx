import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
} from "@mui/material";
import { Search, Visibility, Download, Group, Assignment, CheckCircle } from "@mui/icons-material";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Dummy data
const sampleTBTs = [
  {
    tbtId: "TBT-001",
    project: "Building A Extension",
    date: "2025-10-17",
    topic: "Working at Height",
    discussionPoints: "Use harness, safety checks",
    attendees: [
      { id: "EMP001", name: "Ravi Kumar", designation: "Welder", department: "Fabrication" },
      { id: "EMP002", name: "Sita Das", designation: "Supervisor", department: "Civil" },
      { id: "EMP003", name: "Amit Roy", designation: "Electrician", department: "Electrical" },
    ],
    officerSignOff: { name: "Priya Sharma", date: "2025-10-17" },
  },
  {
    tbtId: "TBT-002",
    project: "Factory B Renovation",
    date: "2025-10-18",
    topic: "Electrical Safety",
    discussionPoints: "Use gloves, isolate circuits",
    attendees: [
      { id: "EMP004", name: "Rahul Verma", designation: "Fitter", department: "Mechanical" },
      { id: "EMP005", name: "Priya Sharma", designation: "Safety Officer", department: "Safety" },
    ],
    officerSignOff: { name: "Sita Das", date: "2025-10-18" },
  },
];

const pieData = [
  { name: "Present", value: 7 },
  { name: "Absent", value: 3 },
];
const COLORS = ["#0A3A6E", "#FF6B6B"];

export default function TBTSummaryDashboard() {
  const [tbtList, setTbtList] = useState(sampleTBTs);
  const [selectedTBT, setSelectedTBT] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleViewAttendance = (tbt) => {
    setSelectedTBT(tbt);
    setViewDialogOpen(true);
  };

  const handleCloseView = () => {
    setSelectedTBT(null);
    setViewDialogOpen(false);
  };

  const handleDownload = () => {
    if (!selectedTBT) return;
    const doc = new jsPDF();
    doc.text(`TBT ID: ${selectedTBT.tbtId}`, 14, 20);
    doc.text(`Project: ${selectedTBT.project}`, 14, 28);
    doc.text(`Date: ${selectedTBT.date}`, 14, 36);
    doc.text(`Topic: ${selectedTBT.topic}`, 14, 44);
    doc.autoTable({
      startY: 50,
      head: [["ID", "Name", "Designation", "Department", "Present", "Reason"]],
      body: selectedTBT.attendees.map((a) => [
        a.id,
        a.name,
        a.designation,
        a.department,
        a.present !== undefined ? (a.present ? "Yes" : "No") : "N/A",
        a.reason || "",
      ]),
    });
    doc.save(`${selectedTBT.tbtId}_Attendance.pdf`);
  };

  const filteredTBTs = tbtList.filter(
    (tbt) =>
      tbt.tbtId.toLowerCase().includes(search.toLowerCase()) ||
      tbt.project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, background: "linear-gradient(to right, #e0f7fa, #f1f8e9)" }}>
      {/* Dashboard Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              background: "linear-gradient(135deg, #0A3A6E 0%, #3A7BD5 100%)",
              color: "#fff",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "#fff", color: "#0A3A6E" }}>
                  <Assignment />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    Total TBTs
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {tbtList.length}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E72 100%)",
              color: "#fff",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "#fff", color: "#FF6B6B" }}>
                  <Group />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    Total Attendees
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {tbtList.reduce((sum, tbt) => sum + tbt.attendees.length, 0)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              background: "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)",
              color: "#fff",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "#fff", color: "#4CAF50" }}>
                  <CheckCircle />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    Pending Sign-offs
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {tbtList.filter((tbt) => !tbt.officerSignOff?.name).length}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pie Chart */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0px 4px 20px rgba(0,0,0,0.1),",background: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)", }}>
        <CardHeader
          title={
            <Typography sx={{ fontWeight: "bold", color: "#0A3A6E" }}>
              Attendance Summary
            </Typography>
          }
        />
        <CardContent sx={{ height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label={{ fill: "#0A3A6E", fontWeight: "bold" }}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* TBT Table */}
      <Card sx={{ borderRadius: 3, boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",background: "#f9f9f9", }}>
     
        <CardHeader
          title={
            <Typography sx={{ fontWeight: "bold", color: "#0A3A6E" }}>TBT List</Typography>
          }
          action={
            <TextField
              placeholder="Search by TBT ID / Project"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          }
        />
        <CardContent>
          <Table sx={{ borderRadius: 2 }}>
            <TableHead>
              <TableRow sx={{ background: "linear-gradient(90deg, #0A3A6E, #3A7BD5)", color: "#fff" }}>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>TBT ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Project</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Topic</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Sign-off</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTBTs.map((tbt) => (
                <TableRow key={tbt.tbtId} sx={{ "&:hover": { backgroundColor: "#f1f1f1" } }}>
                  <TableCell>{tbt.tbtId}</TableCell>
                  <TableCell>{tbt.project}</TableCell>
                  <TableCell>{tbt.date}</TableCell>
                  <TableCell>{tbt.topic}</TableCell>
                  <TableCell>{tbt.officerSignOff?.name || "Pending"}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton color="primary" onClick={() => handleViewAttendance(tbt)}>
                        <Visibility />
                      </IconButton>
                      <IconButton color="secondary" onClick={handleDownload}>
                        <Download />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Attendance Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleCloseView} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: "#0A3A6E", color: "#fff" }}>
          {selectedTBT?.tbtId} - Final Attendance
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography sx={{ fontWeight: "bold", color: "#0A3A6E", mb: 1 }}>
            Project: {selectedTBT?.project} | Date: {selectedTBT?.date} | Topic: {selectedTBT?.topic}
          </Typography>
          <Typography sx={{ fontWeight: "bold", color: "#0A3A6E", mb: 1 }}>
            Safety Officer: {selectedTBT?.officerSignOff?.name || "Pending"}
          </Typography>
          <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ background: "linear-gradient(90deg, #0A3A6E, #3A7BD5)", color: "#fff" }}>
                  <TableCell>Present</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Reason (if absent)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {selectedTBT?.attendees.map((a) => (
    <TableRow key={a.id} sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}>
      <TableCell>
        {a.present !== false ? (
          <CheckCircle sx={{ color: "#4CAF50" }} />
        ) : (
          <CheckCircle sx={{ color: "#FF6B6B" }} />
        )}
      </TableCell>
      <TableCell>{a.id}</TableCell>
      <TableCell>{a.name}</TableCell>
      <TableCell>{a.designation}</TableCell>
      <TableCell>{a.department}</TableCell>
      <TableCell>{a.reason || ""}</TableCell>
    </TableRow>
  ))}
</TableBody>

            </Table>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
