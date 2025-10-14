

// import React from "react";
// import {
// Box,
// Card,
// CardContent,
// Typography,
// Table,
// TableHead,
// TableRow,
// TableCell,
// TableBody,
// LinearProgress,
// } from "@mui/material";
// import {
// People,
// School,
// CheckCircle,
// PendingActions,
// Event,
// } from "@mui/icons-material";
// import {
// PieChart,
// Pie,
// Cell,
// Tooltip,
// ResponsiveContainer,
// BarChart,
// Bar,
// XAxis,
// YAxis,
// CartesianGrid,
// Legend,
// } from "recharts";

// const DUMMY_DATA = {
// totalTrainers: 8,
// totalTrainings: 83,
// statusCounts: { Completed: 68, Ongoing: 10, Planned: 5 },
// programs: [
// { name: "Safety Induction", sessions: 32, attendees: 28 },
// { name: "Electrical Safety", sessions: 18, attendees: 15 },
// { name: "Fire Drill", sessions: 22, attendees: 20 },
// ],
// trainers: [
// { name: "Ravi Singh", trainingsConducted: 20 },
// { name: "Amit Kumar", trainingsConducted: 15 },
// { name: "Priya Menon", trainingsConducted: 10 },
// ],
// siteProgress: [
// { site: "Site A", completed: 10, total: 12 },
// { site: "Site B", completed: 8, total: 10 },
// { site: "Site C", completed: 5, total: 6 },
// ],
// };

// // Soft pastel colors for pie and bars
// const PIE_COLORS = ["#FADADD", "#FFF3B0", "#A7C7E7"];

// export default function ColorfulComplianceDashboard() {
// const { totalTrainers, totalTrainings, statusCounts, programs, trainers, siteProgress } =
// DUMMY_DATA;

// const pieData = [
// { name: "Completed", value: statusCounts.Completed },
// { name: "Ongoing", value: statusCounts.Ongoing },
// { name: "Planned", value: statusCounts.Planned },
// ];

// const summaryCards = [
// {
// label: "Total Trainers",
// value: totalTrainers,
// icon: <People sx={{ fontSize: 40 }} />,
// color: "#F8BBD0", // light pink
// },
// {
// label: "Total Trainings",
// value: totalTrainings,
// icon: <School sx={{ fontSize: 40 }} />,
// color: "#FFF59D", // light yellow
// },
// {
// label: "Completed",
// value: statusCounts.Completed,
// icon: <CheckCircle sx={{ fontSize: 40 }} />,
// color: "#A5D6A7", // light green
// },
// {
// label: "Ongoing",
// value: statusCounts.Ongoing,
// icon: <PendingActions sx={{ fontSize: 40 }} />,
// color: "#81D4FA", // light blue
// },
// {
// label: "Planned",
// value: statusCounts.Planned,
// icon: <Event sx={{ fontSize: 40 }} />,
// color: "#D1C4E9", // light purple
// },
// ];

// return (
// <Box sx={{ p: 3, bgcolor: "#F9FAFB", minHeight: "100vh" }}>
// <Typography
// variant="h5"
// sx={{ mb: 3, color: "#0E4C92", fontWeight: 600 }}
// >
// Training Compliance Dashboard </Typography>

// ```
//   {/* Summary Cards */}
//   <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
//     {summaryCards.map((card) => (
//       <Card
//         key={card.label}
//         sx={{
//           flex: "1 1 200px",
//           bgcolor: card.color,
//           color: "#1E293B",
//           boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
//           borderRadius: 3,
//           transition: "transform 0.2s ease, box-shadow 0.3s ease",
//           "&:hover": {
//             transform: "translateY(-4px)",
//             boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
//           },
//         }}
//       >
//         <CardContent>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Box>
//               <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
//                 {card.label}
//               </Typography>
//               <Typography
//                 variant="h4"
//                 sx={{ fontWeight: "bold", mt: 1 }}
//               >
//                 {card.value}
//               </Typography>
//             </Box>
//             {card.icon}
//           </Box>
//         </CardContent>
//       </Card>
//     ))}
//   </Box>

//   {/* Pie Chart */}
//   <Card
//     sx={{
//       p: 2,
//       mb: 4,
//       boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
//       borderRadius: 3,
//       background: "white",
//     }}
//   >
//     <Typography variant="h6" sx={{ mb: 2, color: "#0E4C92" }}>
//       Training Status Overview
//     </Typography>
//     <Box sx={{ width: "100%", height: 300 }}>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={pieData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             label
//           >
//             {pieData.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={PIE_COLORS[index % PIE_COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </Box>
//   </Card>

//   {/* Tables */}
//   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
//     <Card
//       sx={{
//         flex: 1,
//         p: 2,
//         boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
//         borderRadius: 3,
//         background: "white",
//       }}
//     >
//       <Typography variant="h6" sx={{ mb: 1, color: "#0E4C92" }}>
//         Top Programs
//       </Typography>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ background: "#FFF3CD" }}>
//             <TableCell>Program Name</TableCell>
//             <TableCell>Sessions</TableCell>
//             <TableCell>Attendees</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {programs.map((p) => (
//             <TableRow key={p.name}>
//               <TableCell>{p.name}</TableCell>
//               <TableCell>{p.sessions}</TableCell>
//               <TableCell>{p.attendees}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Card>

//     <Card
//       sx={{
//         flex: 1,
//         p: 2,
//         boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
//         borderRadius: 3,
//         background: "white",
//       }}
//     >
//       <Typography variant="h6" sx={{ mb: 1, color: "#0E4C92" }}>
//         Top Trainers
//       </Typography>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ background: "#E3F2FD" }}>
//             <TableCell>Trainer</TableCell>
//             <TableCell>Trainings Conducted</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {trainers.map((t) => (
//             <TableRow key={t.name}>
//               <TableCell>{t.name}</TableCell>
//               <TableCell>{t.trainingsConducted}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Card>
//   </Box>

//   {/* Site Progress */}
//   <Card
//     sx={{
//       mt: 4,
//       p: 2,
//       boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
//       borderRadius: 3,
//       background: "white",
//     }}
//   >
//     <Typography variant="h6" sx={{ mb: 2, color: "#0E4C92" }}>
//       Site-wise Completion
//     </Typography>
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={siteProgress}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="site" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="completed" fill="#81D4FA" name="Completed" />
//         <Bar dataKey="total" fill="#F8BBD0" name="Total" />
//       </BarChart>
//     </ResponsiveContainer>

//     {siteProgress.map((s) => (
//       <Box key={s.site} sx={{ mt: 2 }}>
//         <Typography sx={{ fontWeight: 500 }}>{s.site} Completion</Typography>
//         <LinearProgress
//           variant="determinate"
//           value={(s.completed / s.total) * 100}
//           sx={{
//             height: 10,
//             borderRadius: 5,
//             bgcolor: "#E5E7EB",
//             "& .MuiLinearProgress-bar": { bgcolor: "#81D4FA" },
//           }}
//         />
//       </Box>
//     ))}
//   </Card>
// </Box>

// );
// }
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
} from "@mui/material";
import {
  People,
  School,
  CheckCircle,
  PendingActions,
  Event,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

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

// Soft pastel colors for pie and bars
const PIE_COLORS = ["#FADADD", "#FFF3B0", "#A7C7E7"];

export default function ColorfulComplianceDashboard() {
  const {
    totalTrainers,
    totalTrainings,
    statusCounts,
    programs,
    trainers,
    siteProgress,
  } = DUMMY_DATA;

  const pieData = [
    { name: "Completed", value: statusCounts.Completed },
    { name: "Ongoing", value: statusCounts.Ongoing },
    { name: "Planned", value: statusCounts.Planned },
  ];

  const summaryCards = [
    {
      label: "Total Trainers",
      value: totalTrainers,
      icon: <People sx={{ fontSize: 40 }} />,
      gradient: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)",
    },
    {
      label: "Total Trainings",
      value: totalTrainings,
      icon: <School sx={{ fontSize: 40 }} />,
      gradient: "linear-gradient(135deg, #FFF6B7 0%, #F6416C 100%)",
    },
    {
      label: "Completed",
      value: statusCounts.Completed,
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      gradient: "linear-gradient(135deg, #A1FFCE 0%, #FAFFD1 100%)",
    },
    {
      label: "Ongoing",
      value: statusCounts.Ongoing,
      icon: <PendingActions sx={{ fontSize: 40 }} />,
      gradient: "linear-gradient(135deg, #89F7FE 0%, #66A6FF 100%)",
    },
    {
      label: "Planned",
      value: statusCounts.Planned,
      icon: <Event sx={{ fontSize: 40 }} />,
      gradient: "linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)",
    },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: "#F9FAFB", minHeight: "100vh" }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, color: "#0E4C92", fontWeight: 600 }}
      >
        Training Compliance Dashboard
      </Typography>

      {/* Summary Cards */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
        {summaryCards.map((card) => (
          <Card
            key={card.label}
            sx={{
              flex: "1 1 220px",
              background: card.gradient,
              color: "#1E293B",
              boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
              borderRadius: 4,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                    {card.label}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", mt: 1, color: "#0F172A" }}
                  >
                    {card.value}
                  </Typography>
                </Box>
                {card.icon}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pie Chart */}
      <Card
        sx={{
          p: 2,
          mb: 4,
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          borderRadius: 4,
          background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#0E4C92" }}>
          Training Status Overview
        </Typography>
        <Box sx={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      {/* Tables */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Card
          sx={{
            flex: 1,
            p: 2,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            borderRadius: 4,
            background: "linear-gradient(135deg, #FFF3CD 0%, #FFE8A1 100%)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, color: "#0E4C92" }}>
            Top Programs
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Program Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Sessions</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Attendees</TableCell>
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
        </Card>

        <Card
          sx={{
            flex: 1,
            p: 2,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            borderRadius: 4,
            background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, color: "#0E4C92" }}>
            Top Trainers
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Trainer</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Trainings Conducted
                </TableCell>
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
        </Card>
      </Box>

      {/* Site Progress */}
      <Card
        sx={{
          mt: 4,
          p: 2,
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          borderRadius: 4,
          background: "linear-gradient(135deg, #F9F9F9 0%, #E0EAFc 100%)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#0E4C92" }}>
          Site-wise Completion
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={siteProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="site" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#66A6FF" name="Completed" />
            <Bar dataKey="total" fill="#F8BBD0" name="Total" />
          </BarChart>
        </ResponsiveContainer>

        {siteProgress.map((s) => (
          <Box key={s.site} sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 500 }}>{s.site} Completion</Typography>
            <LinearProgress
              variant="determinate"
              value={(s.completed / s.total) * 100}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: "#E5E7EB",
                "& .MuiLinearProgress-bar": { bgcolor: "#66A6FF" },
              }}
            />
          </Box>
        ))}
      </Card>
    </Box>
  );
}
