// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardHeader,
//   CardContent,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Checkbox,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Stack ,
//   InputAdornment,
// } from "@mui/material";
// import { Search } from "@mui/icons-material";

// // Sample TBT list (replace with your actual data from TBT Creation module)
// const sampleTBTs = [
//   {
//     tbtId: "TBT-001",
//     project: "Building A Extension",
//     date: "2025-10-17",
//     topic: "Working at Height",
//     discussionPoints: "Use harness, safety checks",
//     attendees: [
//       { id: "EMP001", name: "Ravi Kumar", designation: "Welder", department: "Fabrication" },
//       { id: "EMP002", name: "Sita Das", designation: "Supervisor", department: "Civil" },
//       { id: "EMP003", name: "Amit Roy", designation: "Electrician", department: "Electrical" },
//     ],
//   },
// ];

// export default function TBTAttendance() {
//   const [selectedTBTId, setSelectedTBTId] = useState("");
//   const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [attendanceRecords, setAttendanceRecords] = useState({}); // {tbtId: [{empId, present, reason}]}
//   const [officerSignOff, setOfficerSignOff] = useState({ name: "", date: "" });

//   const selectedTBT = sampleTBTs.find((tbt) => tbt.tbtId === selectedTBTId);

//   const handleOpenDialog = (tbtId) => {
//     setSelectedTBTId(tbtId);
//     if (!attendanceRecords[tbtId]) {
//       const initAttendance = selectedTBT.attendees.map((a) => ({
//         ...a,
//         present: true,
//         reason: "",
//       }));
//       setAttendanceRecords((prev) => ({ ...prev, [tbtId]: initAttendance }));
//     }
//     setOfficerSignOff({ name: "", date: new Date().toISOString().split("T")[0] }); // default today's date
//     setAttendanceDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setAttendanceDialogOpen(false);
//     setSearch("");
//   };

//   const handleAttendanceToggle = (empId) => {
//     setAttendanceRecords((prev) => ({
//       ...prev,
//       [selectedTBTId]: prev[selectedTBTId].map((a) =>
//         a.id === empId ? { ...a, present: !a.present } : a
//       ),
//     }));
//   };

//   const handleReasonChange = (empId, value) => {
//     setAttendanceRecords((prev) => ({
//       ...prev,
//       [selectedTBTId]: prev[selectedTBTId].map((a) =>
//         a.id === empId ? { ...a, reason: value } : a
//       ),
//     }));
//   };

//  const filteredAttendees = (attendanceRecords[selectedTBTId] || []).filter(
//   (a) =>
//     a.name.toLowerCase().includes(search.toLowerCase()) ||
//     a.id.toLowerCase().includes(search.toLowerCase())
// );

//   const handleSaveAttendance = () => {
//     if (!officerSignOff.name) {
//       alert("Please enter Safety Officer name for sign-off.");
//       return;
//     }

//     // Attendance and sign-off saved (you can replace this with API call)
//     console.log("Saved Attendance:", attendanceRecords[selectedTBTId]);
//     console.log("Signed-off by:", officerSignOff);

//     alert(`Attendance saved and signed-off by ${officerSignOff.name}`);
//     handleCloseDialog();
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Card sx={{ border: "2px solid #0A3A6E", borderRadius: 2, boxShadow: 3 }}>
//         <CardHeader
//           title={
//             <Typography variant="h6" sx={{ color: "#0A3A6E", fontWeight: "bold" }}>
//               Digital Attendance & Sign-off
//             </Typography>
//           }
//         />
//         <CardContent>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ background: "#E3F2FD" }}>
//                 <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>TBT ID</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Project</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Date</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Topic</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {sampleTBTs.map((tbt) => (
//                 <TableRow key={tbt.tbtId}>
//                   <TableCell>{tbt.tbtId}</TableCell>
//                   <TableCell>{tbt.project}</TableCell>
//                   <TableCell>{tbt.date}</TableCell>
//                   <TableCell>{tbt.topic}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       sx={{ bgcolor: "#0A3A6E" }}
//                       onClick={() => handleOpenDialog(tbt.tbtId)}
//                     >
//                       Mark Attendance
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Attendance Dialog */}
//       <Dialog open={attendanceDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
//         <DialogTitle sx={{ bgcolor: "#0A3A6E", color: "#fff" }}>
//           {selectedTBT?.tbtId} - Attendance
//         </DialogTitle>
//         <DialogContent sx={{ mt: 2 }}>
//           <Typography sx={{ mb: 2, fontWeight: "bold", color: "#0A3A6E" }}>
//             {selectedTBT?.project} | {selectedTBT?.date} | {selectedTBT?.topic}
//           </Typography>

//           <TextField
//             placeholder="Search attendee by name or ID"
//             fullWidth
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Search />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ mb: 2 }}
//           />

//           <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow sx={{ background: "#E3F2FD" }}>
//                   <TableCell>Present</TableCell>
//                   <TableCell>Employee ID</TableCell>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Designation</TableCell>
//                   <TableCell>Department</TableCell>
//                   <TableCell>Reason (if absent)</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredAttendees?.map((a) => (
//                   <TableRow key={a.id}>
//                     <TableCell>
//                       <Checkbox
//                         checked={a.present}
//                         onChange={() => handleAttendanceToggle(a.id)}
//                       />
//                     </TableCell>
//                     <TableCell>{a.id}</TableCell>
//                     <TableCell>{a.name}</TableCell>
//                     <TableCell>{a.designation}</TableCell>
//                     <TableCell>{a.department}</TableCell>
//                     <TableCell>
//                       {!a.present && (
//                         <TextField
//                           value={a.reason}
//                           onChange={(e) => handleReasonChange(a.id, e.target.value)}
//                           size="small"
//                         />
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>

//           {/* Safety Officer Sign-off */}
//           <Box sx={{ mt: 3 }}>
//             <Typography sx={{ fontWeight: "bold", color: "#0A3A6E", mb: 1 }}>
//               Safety Officer Sign-off
//             </Typography>
//             <Stack direction="row" spacing={2}>
//               <TextField
//                 label="Officer Name"
//                 fullWidth
//                 value={officerSignOff.name}
//                 onChange={(e) => setOfficerSignOff({ ...officerSignOff, name: e.target.value })}
//               />
//               <TextField
//                 label="Date"
//                 type="date"
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//                 value={officerSignOff.date}
//                 onChange={(e) => setOfficerSignOff({ ...officerSignOff, date: e.target.value })}
//               />
//             </Stack>
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="error">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveAttendance} variant="contained" sx={{ bgcolor: "#0A3A6E" }}>
//             Save & Sign-off
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Search, Person, Visibility ,Download } from "@mui/icons-material";

// Sample TBT list (replace with your actual data from TBT Creation module)
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
  },
];

export default function TBTAttendance() {
  const [selectedTBTId, setSelectedTBTId] = useState("");
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [officerSignOff, setOfficerSignOff] = useState({ name: "", date: "" });

  const selectedTBT = sampleTBTs.find((tbt) => tbt.tbtId === selectedTBTId);

  const handleOpenDialog = (tbtId) => {
    setSelectedTBTId(tbtId);
    if (!attendanceRecords[tbtId]) {
      const initAttendance = selectedTBT.attendees.map((a) => ({
        ...a,
        present: true,
        reason: "",
      }));
      setAttendanceRecords((prev) => ({ ...prev, [tbtId]: initAttendance }));
    }
    setOfficerSignOff({ name: "", date: new Date().toISOString().split("T")[0] });
    setAttendanceDialogOpen(true);
  };

  const handleViewAttendance = (tbtId) => {
    setSelectedTBTId(tbtId);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setAttendanceDialogOpen(false);
    setSearch("");
  };

  const handleCloseView = () => {
    setViewDialogOpen(false);
    setSearch("");
  };

  const handleAttendanceToggle = (empId) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [selectedTBTId]: prev[selectedTBTId].map((a) =>
        a.id === empId ? { ...a, present: !a.present } : a
      ),
    }));
  };

  const handleReasonChange = (empId, value) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [selectedTBTId]: prev[selectedTBTId].map((a) =>
        a.id === empId ? { ...a, reason: value } : a
      ),
    }));
  };

  const filteredAttendees = (attendanceRecords[selectedTBTId] || []).filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveAttendance = () => {
    if (!officerSignOff.name) {
      alert("Please enter Safety Officer name for sign-off.");
      return;
    }

    console.log("Saved Attendance:", attendanceRecords[selectedTBTId]);
    console.log("Signed-off by:", officerSignOff);

    alert(`Attendance saved and signed-off by ${officerSignOff.name}`);
    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ borderLeft: "6px solid #0A3A6E", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: 2 }}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ color: "#0A3A6E", fontWeight: "bold" }}>
              Digital Attendance & Sign-off
            </Typography>
          }
        />
        <CardContent>
           <TextField
                              placeholder="Search Here"
                              fullWidth
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Search />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{ mb: 2 }}
                            />
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#E3F2FD" }}>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>TBT ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Project</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Topic</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleTBTs.map((tbt) => (
                <TableRow key={tbt.tbtId}>
                  <TableCell>{tbt.tbtId}</TableCell>
                  <TableCell>{tbt.project}</TableCell>
                  <TableCell>{tbt.date}</TableCell>
                  <TableCell>{tbt.topic}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(tbt.tbtId)}
                        title="Mark Attendance"
                      >
                        <Person />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleViewAttendance(tbt.tbtId)}
                        title="View Attendance"
                      >
                        <Visibility />
                      </IconButton>
                      <Button
            sx={{ color: "#0A3A6E" }}
            onClick={() => handleDownload(tbt.tbtId)}
          >
            <Download /> 
          </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Attendance Dialog */}
      <Dialog open={attendanceDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: "#0A3A6E", color: "#fff" }}>
          {selectedTBT?.tbtId} - Attendance
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography sx={{ mb: 2, fontWeight: "bold", color: "#0A3A6E" }}>
            {selectedTBT?.project} | {selectedTBT?.date} | {selectedTBT?.topic}
          </Typography>

          <TextField
            placeholder="Search attendee by name or ID"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ background: "#E3F2FD" }}>
                  <TableCell>Present</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Reason (if absent)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAttendees?.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>
                      <Checkbox
                        checked={a.present}
                        onChange={() => handleAttendanceToggle(a.id)}
                      />
                    </TableCell>
                    <TableCell>{a.id}</TableCell>
                    <TableCell>{a.name}</TableCell>
                    <TableCell>{a.designation}</TableCell>
                    <TableCell>{a.department}</TableCell>
                    <TableCell>
                      {!a.present && (
                        <TextField
                          value={a.reason}
                          onChange={(e) => handleReasonChange(a.id, e.target.value)}
                          size="small"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Safety Officer Sign-off */}
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ fontWeight: "bold", color: "#0A3A6E", mb: 1 }}>
              Safety Officer Sign-off
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Officer Name"
                fullWidth
                value={officerSignOff.name}
                onChange={(e) => setOfficerSignOff({ ...officerSignOff, name: e.target.value })}
              />
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={officerSignOff.date}
                onChange={(e) => setOfficerSignOff({ ...officerSignOff, date: e.target.value })}
              />
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
          <Button onClick={handleSaveAttendance} variant="contained" sx={{ bgcolor: "#0A3A6E" }}>
            Save & Sign-off
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Attendance Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleCloseView} fullWidth maxWidth="md">
  <DialogTitle sx={{ bgcolor: "#0A3A6E", color: "#fff" }}>
    {selectedTBT?.tbtId} - Final Attendance
  </DialogTitle>
  <DialogContent sx={{ mt: 2 }}>
    {/* Safety Officer Sign-off */}
    <Box sx={{ mb: 2, p: 1, border: "1px solid #0A3A6E", borderRadius: 1 }}>
      <Typography sx={{ fontWeight: "bold", color: "#0A3A6E" }}>
        Safety Officer Sign-off
      </Typography>
      <Typography>Name: {officerSignOff.name || "N/A"}</Typography>
      <Typography>Date: {officerSignOff.date || "N/A"}</Typography>
    </Box>

    <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ background: "#E3F2FD" }}>
            <TableCell>Present</TableCell>
            <TableCell>Employee ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Reason (if absent)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(attendanceRecords[selectedTBTId] || []).map((a) => (
            <TableRow key={a.id}>
              <TableCell>
                <Checkbox checked={a.present} disabled />
              </TableCell>
              <TableCell>{a.id}</TableCell>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.designation}</TableCell>
              <TableCell>{a.department}</TableCell>
              <TableCell>{a.reason}</TableCell>
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
