// import React from "react";
// import {
//   Box,
//   Card,
//   Grid,
//   Stack,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Chip,
//   Paper,
// } from "@mui/material";
// import {
//   Inventory,
//   Assignment,
//   People,
//   Update,
//   TrendingUp,
//   Warning,
// } from "@mui/icons-material";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// // Dummy data
// const stockSummary = [
//   { title: "Total Stock Items", count: 120, icon: <Inventory fontSize="large" />, gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", trend: "+12%" },
//   { title: "New Issuances", count: 45, icon: <Assignment fontSize="large" />, gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", trend: "+8%" },
//   { title: "Employee Acknowledgements", count: 78, icon: <People fontSize="large" />, gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", trend: "+15%" },
//   { title: "Renewals Pending", count: 12, icon: <Update fontSize="large" />, gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", trend: "-5%" },
// ];

// const stockDistribution = [
//   { name: "PPE", value: 60, color: "#667eea" },
//   { name: "Tools", value: 40, color: "#764ba2" },
// ];

// const recentRenewals = [
//   { id: "STK:001", itemName: "Safety Helmet", employee: "Employee 1", status: "Available", expiryDate: "2025-12-31" },
//   { id: "STK:002", itemName: "Acid-Resistant Gloves", employee: "Employee 2", status: "Low Stock", expiryDate: "2025-12-31" },
//   { id: "STK:003", itemName: "Tool Kit", employee: "Employee 3", status: "Available", expiryDate: "2025-12-31" },
//   { id: "STK:004", itemName: "Multimeter", employee: "Employee 4", status: "Low Stock", expiryDate: "2025-12-31" },
// ];

// const stockRecords = [
//   { id: "STK-001", itemName: "Safety Helmet", quantity: 50, location: "Store 1", status: "Available" },
//   { id: "STK-002", itemName: "Acid-Resistant Gloves", quantity: 8, location: "Store 2", status: "Low Stock" },
//   { id: "STK-003", itemName: "Tool Kit", quantity: 20, location: "Store 1", status: "Available" },
//   { id: "STK-004", itemName: "Multimeter", quantity: 5, location: "Store 2", status: "Low Stock" },
// ];

// const StatusChip = ({ status }) => {
//   const getColor = () => {
//     switch (status) {
//       case "Available": return "success";
//       case "Low Stock": return "warning";
//       default: return "default";
//     }
//   };

//   const getIcon = () => {
//     switch (status) {
//       case "Available": return <TrendingUp sx={{ fontSize: 16 }} />;
//       case "Low Stock": return <Warning sx={{ fontSize: 16 }} />;
//       default: return null;
//     }
//   };

//   return (
//     <Chip
//       icon={getIcon()}
//       label={status}
//       color={getColor()}
//       variant="filled"
//       size="small"
//       sx={{ fontWeight: 600 }}
//     />
//   );
// };

// export default function Dashboard() {
//   return (
//     <Box sx={{ p: 3, backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      
//       {/* Header */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", mb: 1 }}>
//           Stock Management Dashboard
//         </Typography>
//         <Typography variant="subtitle1" sx={{ color: "#64748b" }}>
//           Overview of stock distribution, renewals, and inventory status
//         </Typography>
//       </Box>

//       {/* Summary Cards */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {stockSummary.map((card, idx) => (
//           <Grid item xs={12} sm={6} md={3} key={idx}>
//             <Card
//               sx={{
//                 borderRadius: 3,
//                 color: "white",
//                 background: card.gradient,
//                 p: 3,
//                 height: 140,
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                 transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
//                 "&:hover": {
//                   transform: "translateY(-4px)",
//                   boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
//                 },
//               }}
//             >
//               <Stack direction="row" spacing={2} alignItems="flex-start" height="100%">
//                 <Box sx={{ flexShrink: 0 }}>
//                   {card.icon}
//                 </Box>
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Typography variant="subtitle2" sx={{ opacity: 0.9, fontSize: "0.875rem", mb: 1 }}>
//                     {card.title}
//                   </Typography>
//                   <Typography variant="h3" sx={{ fontWeight: 700, fontSize: "2.5rem", lineHeight: 1 }}>
//                     {card.count}
//                   </Typography>
//                   <Typography variant="caption" sx={{ opacity: 0.9, display: "flex", alignItems: "center", mt: 1 }}>
//                     <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
//                     {card.trend} from last month
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Charts and Recent Renewals */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {/* Stock Distribution Chart */}
//         <Grid item xs={12} md={6}>
//           <Card 
//             sx={{ 
//               p: 3, 
//               borderRadius: 3, 
//               height: "100%",
//               boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
//             }}
//           >
//             <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: "#1e293b" }}>
//               Stock Distribution
//             </Typography>
//             <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 280 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={stockDistribution}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={100}
//                     innerRadius={60}
//                     label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                     labelLine={false}
//                   >
//                     {stockDistribution.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip 
//                     formatter={(value) => [`${value} items`, "Quantity"]}
//                   />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Box>
//           </Card>
//         </Grid>

//         {/* Recent Renewals */}
//         <Grid item xs={12} md={6}>
//           <Card 
//             sx={{ 
//               p: 3, 
//               borderRadius: 3, 
//               height: "100%",
//               boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
//             }}
//           >
//             <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
//               <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b" }}>
//                 Recent Renewals
//               </Typography>
//               <Chip 
//                 label={`${recentRenewals.length} total`} 
//                 size="small" 
//                 variant="outlined"
//                 sx={{ fontWeight: 600 }}
//               />
//             </Stack>
//             <Table sx={{ border: "1px solid #e2e8f0", borderRadius: 2, overflow: "hidden" }}>
//               <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 600, color: "#475569", py: 2 }}>Renewal ID</TableCell>
//                   <TableCell sx={{ fontWeight: 600, color: "#475569", py: 2 }}>Item Name</TableCell>
//                   <TableCell sx={{ fontWeight: 600, color: "#475569", py: 2 }}>Status</TableCell>
//                   <TableCell sx={{ fontWeight: 600, color: "#475569", py: 2 }}>Expiry Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {recentRenewals.map((renewal, idx) => (
//                   <TableRow 
//                     key={idx}
//                     sx={{ 
//                       '&:last-child td, &:last-child th': { border: 0 },
//                       '&:hover': { backgroundColor: '#f8fafc' }
//                     }}
//                   >
//                     <TableCell sx={{ py: 2, fontWeight: 600, color: "#334155" }}>
//                       {renewal.id}
//                     </TableCell>
//                     <TableCell sx={{ py: 2 }}>
//                       <Box>
//                         <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b" }}>
//                           {renewal.itemName}
//                         </Typography>
//                         <Typography variant="caption" sx={{ color: "#64748b" }}>
//                           {renewal.employee}
//                         </Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell sx={{ py: 2 }}>
//                       <StatusChip status={renewal.status} />
//                     </TableCell>
//                     <TableCell sx={{ py: 2, color: "#64748b", fontWeight: 500 }}>
//                       {renewal.expiryDate}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Stock Records Table */}
//       <Card 
//         sx={{ 
//           p: 3, 
//           borderRadius: 3,
//           boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
//         }}
//       >
//         <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
//           <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b" }}>
//             Stock Records
//           </Typography>
//           <Chip 
//             label={`${stockRecords.length} items`} 
//             size="small" 
//             variant="outlined"
//             sx={{ fontWeight: 600 }}
//           />
//         </Stack>
//         <Paper variant="outlined">
//           <Table>
//             <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Item ID</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Item Name</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Quantity</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Location</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {stockRecords.map((record, idx) => (
//                 <TableRow 
//                   key={idx}
//                   sx={{ 
//                     '&:last-child td, &:last-child th': { border: 0 },
//                     '&:hover': { backgroundColor: '#f8fafc' }
//                   }}
//                 >
//                   <TableCell sx={{ fontWeight: 600, color: "#334155" }}>
//                     {record.id}
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 500, color: "#1e293b" }}>
//                     {record.itemName}
//                   </TableCell>
//                   <TableCell>
//                     <Chip 
//                       label={record.quantity} 
//                       size="small"
//                       variant="outlined"
//                       color={record.quantity < 10 ? "warning" : "primary"}
//                       sx={{ fontWeight: 600 }}
//                     />
//                   </TableCell>
//                   <TableCell sx={{ color: "#64748b", fontWeight: 500 }}>
//                     {record.location}
//                   </TableCell>
//                   <TableCell>
//                     <StatusChip status={record.status} />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Paper>
//       </Card>

//     </Box>
//   );
// }

import React from "react";
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Paper,
} from "@mui/material";
import { Inventory, Assignment, People, Update, TrendingUp, Warning } from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Dummy data
const stockSummary = [
  { title: "Total Stock Items", count: 120, icon: <Inventory fontSize="large" />, gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", trend: "+12%" },
  { title: "New Issuances", count: 45, icon: <Assignment fontSize="large" />, gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", trend: "+8%" },
  { title: "Employee Acknowledgements", count: 78, icon: <People fontSize="large" />, gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", trend: "+15%" },
  { title: "Renewals Pending", count: 12, icon: <Update fontSize="large" />, gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", trend: "-5%" },
];

const stockDistribution = [
  { name: "PPE", value: 60, color: "#667eea" },
  { name: "Tools", value: 40, color: "#764ba2" },
];

const recentRenewals = [
  { id: "STK:001", itemName: "Safety Helmet", employee: "Employee 1", status: "Available", expiryDate: "2025-12-31" },
  { id: "STK:002", itemName: "Acid-Resistant Gloves", employee: "Employee 2", status: "Low Stock", expiryDate: "2025-12-31" },
  { id: "STK:003", itemName: "Tool Kit", employee: "Employee 3", status: "Available", expiryDate: "2025-12-31" },
  { id: "STK:004", itemName: "Multimeter", employee: "Employee 4", status: "Low Stock", expiryDate: "2025-12-31" },
];

const stockRecords = [
  { id: "STK-001", itemName: "Safety Helmet", quantity: 50, location: "Store 1", status: "Available" },
  { id: "STK-002", itemName: "Acid-Resistant Gloves", quantity: 8, location: "Store 2", status: "Low Stock" },
  { id: "STK-003", itemName: "Tool Kit", quantity: 20, location: "Store 1", status: "Available" },
  { id: "STK-004", itemName: "Multimeter", quantity: 5, location: "Store 2", status: "Low Stock" },
];

const StatusChip = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case "Available": return "success";
      case "Low Stock": return "warning";
      default: return "default";
    }
  };

  const getIcon = () => {
    switch (status) {
      case "Available": return <TrendingUp sx={{ fontSize: 16 }} />;
      case "Low Stock": return <Warning sx={{ fontSize: 16 }} />;
      default: return null;
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

export default function Dashboard() {
  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b", mb: 1 }}>
          Stock Management Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#64748b" }}>
          Overview of stock distribution, renewals, and inventory status
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stockSummary.map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              sx={{
                borderRadius: 3,
                color: "white",
                background: card.gradient,
                p: 3,
                height: 140,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 30px rgba(0,0,0,0.15)" },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start" height="100%">
                <Box sx={{ flexShrink: 0 }}>{card.icon}</Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" sx={{ opacity: 0.9, fontSize: "0.875rem", mb: 1 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, fontSize: "2.5rem", lineHeight: 1 }}>
                    {card.count}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9, display: "flex", alignItems: "center", mt: 1 }}>
                    <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} /> {card.trend} from last month
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pie Chart & Recent Renewals */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Pie Chart Full Width */}
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" ,background: "linear-gradient(135deg, #ffffff, #d39ce0ff)",}}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: "#1e293b" }}>
              Stock Distribution Pie-Chart
            </Typography>
            <Box sx={{ width: "100%", height: 400, background: "#fdf9f5", borderRadius: 2, p:2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {stockDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} items`, "Quantity"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Recent Renewals */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" ,background: "linear-gradient(135deg, #ffffff, #86c6b5ff)",}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b" }}>
                Recent Renewals
              </Typography>
              <Chip label={`${recentRenewals.length} total`} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
            </Stack>
            <Paper variant="outlined" sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#fdf9f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Renewal ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Item Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Expiry Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentRenewals.map((renewal, idx) => (
                    <TableRow key={idx} sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}>
                      <TableCell sx={{ fontWeight: 600, color: "#334155" }}>{renewal.id}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600, color: "#1e293b" }}>{renewal.itemName}</Typography>
                        <Typography variant="caption" sx={{ color: "#64748b" }}>{renewal.employee}</Typography>
                      </TableCell>
                      <TableCell><StatusChip status={renewal.status} /></TableCell>
                      <TableCell sx={{ color: "#64748b", fontWeight: 500 }}>{renewal.expiryDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Card>
        </Grid>
      </Grid>

      {/* Stock Records Table */}
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.1)",background: "linear-gradient(135deg, #ffffff, #c7cc9cff)", }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b" }}>Stock Records</Typography>
          <Chip label={`${stockRecords.length} items`} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
        </Stack>
        <Paper variant="outlined" sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#fdf9f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Item ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Item Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockRecords.map((record, idx) => (
                <TableRow key={idx} sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}>
                  <TableCell sx={{ fontWeight: 600, color: "#334155" }}>{record.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500, color: "#1e293b" }}>{record.itemName}</TableCell>
                  <TableCell>
                    <Chip label={record.quantity} size="small" variant="outlined" color={record.quantity < 10 ? "warning" : "primary"} sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell sx={{ color: "#64748b", fontWeight: 500 }}>{record.location}</TableCell>
                  <TableCell><StatusChip status={record.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Card>
    </Box>
  );
}
