

import React from "react";
import { Box, Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody, LinearProgress } from "@mui/material";
import { People, School, CheckCircle, PendingActions, Event } from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const DUMMY_DATA = {
  totalTrainers: 8,
  totalTrainings: 83,
  statusCounts: { Completed: 68, Ongoing: 10, Planned: 5 },
  programs: [
    { name: "Safety Induction", sessions: 32, attendees: 28 },
    { name: "Electrical Safety", sessions: 18, attendees: 15 },
    { name: "Fire Drill", sessions: 22, attendees: 20 },
  ],
  trainers: [
    { name: "Ravi Singh", trainingsConducted: 20 },
    { name: "Amit Kumar", trainingsConducted: 15 },
    { name: "Priya Menon", trainingsConducted: 10 },
  ],
  siteProgress: [
    { site: "Site A", completed: 10, total: 12 },
    { site: "Site B", completed: 8, total: 10 },
    { site: "Site C", completed: 5, total: 6 },
  ],
};

const PIE_COLORS = ["#2E8B57", "#F4A261", "#3A7BD5"];

export default function ColorfulComplianceDashboard() {
  const { totalTrainers, totalTrainings, statusCounts, programs, trainers, siteProgress } = DUMMY_DATA;

  const pieData = [
    { name: "Completed", value: statusCounts.Completed },
    { name: "Ongoing", value: statusCounts.Ongoing },
    { name: "Planned", value: statusCounts.Planned },
  ];

  const summaryCards = [
    { label: "Total Trainers", value: totalTrainers, icon: <People sx={{ fontSize: 40 }} />, color: "#7267ef" },
    { label: "Total Trainings", value: totalTrainings, icon: <School sx={{ fontSize: 40 }} />, color: "#f59e0b" },
    { label: "Completed", value: statusCounts.Completed, icon: <CheckCircle sx={{ fontSize: 40 }} />, color: "#16a34a" },
    { label: "Ongoing", value: statusCounts.Ongoing, icon: <PendingActions sx={{ fontSize: 40 }} />, color: "#f97316" },
    { label: "Planned", value: statusCounts.Planned, icon: <Event sx={{ fontSize: 40 }} />, color: "#3b82f6" },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: "#f6f8fb", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ mb: 3, color: "#0E4C92" }}>Training Compliance Dashboard</Typography>

      {/* Colorful Summary Cards */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
        {summaryCards.map((card) => (
          <Card key={card.label} sx={{ flex: "1 1 180px", bgcolor: card.color, color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1">{card.label}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>{card.value}</Typography>
                </Box>
                {card.icon}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pie Chart */}
      <Box sx={{ width: "100%", height: 300, mb: 4 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Top Programs Table */}
      <Typography variant="h6" sx={{ mb: 1 }}>Top Programs</Typography>
      <Table sx={{ mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Program Name</TableCell>
            <TableCell>Sessions</TableCell>
            <TableCell>Attendees</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {programs.map((p) => (
            <TableRow key={p.name}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.sessions}</TableCell>
              <TableCell>{p.attendees}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Top Trainers Table */}
      <Typography variant="h6" sx={{ mb: 1 }}>Top Trainers</Typography>
      <Table sx={{ mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Trainer</TableCell>
            <TableCell>Trainings Conducted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainers.map((t) => (
            <TableRow key={t.name}>
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.trainingsConducted}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Site Progress Bar Chart */}
      <Typography variant="h6" sx={{ mb: 1 }}>Site-wise Completion</Typography>
      <BarChart width={600} height={300} data={siteProgress}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="site" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#16a34a" name="Completed" />
        <Bar dataKey="total" fill="#3b82f6" name="Total" />
      </BarChart>

      {/* Optional: LinearProgress for each site */}
      {siteProgress.map((s) => (
        <Box key={s.site} sx={{ mt: 2 }}>
          <Typography>{s.site} Completion</Typography>
          <LinearProgress variant="determinate" value={(s.completed / s.total) * 100} sx={{ height: 10, borderRadius: 5 }} />
        </Box>
      ))}
    </Box>
  );
}
