import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  InputAdornment,
  Collapse,
  IconButton,
  MenuItem,
  Stack
} from "@mui/material";
import { Search, ExpandMore, ExpandLess,Close } from "@mui/icons-material";

const TBTCreationScheduling = () => {
  const [open, setOpen] = useState(false);
  const [tbtList, setTbtList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const [formData, setFormData] = useState({
    tbtId: "",
    project: "",
    date: "",
    topic: "",
    discussionPoints: "",
  });

  const dummyProjects = ["Building A Extension", "Road Construction", "Pipeline Installation"];

  const employees = [
    { id: "EMP001", name: "Ravi Kumar", designation: "Welder", department: "Fabrication" },
    { id: "EMP002", name: "Sita Das", designation: "Supervisor", department: "Civil" },
    { id: "EMP003", name: "Amit Roy", designation: "Electrician", department: "Electrical" },
    { id: "EMP004", name: "Priya Sharma", designation: "Safety Officer", department: "Safety" },
    { id: "EMP005", name: "Rahul Verma", designation: "Fitter", department: "Mechanical" },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = () => {
    const nextId = `TBT-${(tbtList.length + 1).toString().padStart(3, "0")}`;
    setFormData({ ...formData, tbtId: nextId });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAttendees([]);
  };

  const handleAttendeeToggle = (emp) => {
    setSelectedAttendees((prev) =>
      prev.some((a) => a.id === emp.id)
        ? prev.filter((a) => a.id !== emp.id)
        : [...prev, emp]
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.project || !formData.topic || selectedAttendees.length === 0) {
      alert("Please fill all required fields and select at least one attendee.");
      return;
    }
    const newTBT = { ...formData, attendees: selectedAttendees };
    setTbtList([...tbtList, newTBT]);
    handleClose();
  };

  const handleExpandRow = (tbtId) => {
    setExpandedRows((prev) =>
      prev.includes(tbtId) ? prev.filter((id) => id !== tbtId) : [...prev, tbtId]
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ borderLeft: "6px solid #0A3A6E", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: 2 }}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ color: "#0A3A6E", fontWeight: "bold" }}>
              Toolbox Talk (TBT) Creation & Scheduling
            </Typography>
          }
          action={
            <Button variant="contained" onClick={handleOpen} sx={{ bgcolor: "#0A3A6E" }}>
              + Create New TBT
            </Button>
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
                <TableCell></TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>TBT ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Project</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Topic</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tbtList.map((tbt) => (
                <React.Fragment key={tbt.tbtId}>
                  <TableRow>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleExpandRow(tbt.tbtId)}>
                        {expandedRows.includes(tbt.tbtId) ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{tbt.tbtId}</TableCell>
                    <TableCell>{tbt.project}</TableCell>
                    <TableCell>{tbt.date}</TableCell>
                    <TableCell>{tbt.topic}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={5} sx={{ p: 0, border: "none" }}>
                      <Collapse in={expandedRows.includes(tbt.tbtId)} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                            Attendees
                          </Typography>
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={{ background: "#E8F5E9" }}>
                                <TableCell>Employee ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Designation</TableCell>
                                <TableCell>Department</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {tbt.attendees.map((a) => (
                                <TableRow key={a.id}>
                                  <TableCell>{a.id}</TableCell>
                                  <TableCell>{a.name}</TableCell>
                                  <TableCell>{a.designation}</TableCell>
                                  <TableCell>{a.department}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
              {tbtList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No TBT records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog for new TBT */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle
         sx={{
           bgcolor: "#0A3A6E", 
        color: "#fff", 
        fontWeight: "bold" ,
         display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        }}>
          Create New Toolbox Talk
          <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
                                                                          <Close />
                                                                        </IconButton>

        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="TBT ID" name="tbtId" value={formData.tbtId} fullWidth disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="Project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                fullWidth
              >
                {dummyProjects.map((proj) => (
                  <MenuItem key={proj} value={proj}>
                    {proj}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Topic" name="topic" value={formData.topic} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Discussion Points"
                name="discussionPoints"
                multiline
                rows={3}
                value={formData.discussionPoints}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, maxHeight: 250, overflowY: "auto", border: "1px solid #ccc", borderRadius: 1, p:1 }}>
            <Typography variant="subtitle1" sx={{ color: "#0A3A6E", fontWeight: "bold", mb: 1 }}>
              Select Attendees
            </Typography>
            <TextField
              placeholder="Search employee by name or ID"
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
              sx={{ mb: 1 }}
            />

            <Stack spacing={0.5}>
              {filteredEmployees.map((emp) => (
                <Box key={emp.id} sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={selectedAttendees.some((a) => a.id === emp.id)}
                    onChange={() => handleAttendeeToggle(emp)}
                  />
                  <Typography>{`${emp.name} (${emp.id}) - ${emp.designation}`}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: "#0A3A6E" }}>
            Save TBT
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TBTCreationScheduling;
