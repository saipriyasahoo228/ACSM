
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  Edit,
  Add,
  Delete,
  ExpandMore,
  ExpandLess,
  Close
} from "@mui/icons-material";

const statusColors = {
  Pending: "#ed6c02",
  Present: "#0288d1",
  Completed: "#2e7d32",
};

const defaultTrainingPrograms = [
  { id: 1, name: "Electrical Safety", mode: "Offline" },
  { id: 2, name: "OSHA Compliance", mode: "Online" },
  { id: 3, name: "Advanced Plumbing", mode: "Offline" },
  { id: 4, name: "Scaffolding Safety", mode: "Online" },
  { id: 5, name: "Equipment Operation", mode: "Offline" },
];

// Dummy employees
const employees = [
  { id: "E001", name: "Ravi Kumar" },
  { id: "E002", name: "Amit Sharma" },
  { id: "E003", name: "Suresh Gupta" },
  { id: "E004", name: "Neha Singh" },
  { id: "E005", name: "Arjun Mehta" },
];

const WorkerAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    trainingId: "",
    trainingTitle: "",
    mode: "",
    employees: [], // {employeeId, employeeName, status}
  });

  // Expanded rows (for collapse)
  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpand = (trainingId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [trainingId]: !prev[trainingId],
    }));
  };

  const handleAssignDialogOpen = () => {
    setFormData({ trainingId: "", trainingTitle: "", mode: "", employees: [] });
    setAssignDialogOpen(true);
  };

  const handleAssignDialogClose = () => setAssignDialogOpen(false);

  const handleTrainingChange = (id) => {
    const training = defaultTrainingPrograms.find((p) => p.id === id);
    setFormData({
      ...formData,
      trainingId: training.id,
      trainingTitle: training.name,
      mode: training.mode,
    });
  };

  const handleEmployeeSelect = (selectedIds) => {
    const selectedEmployees = selectedIds.map((id) => {
      const emp = employees.find((e) => e.id === id);
      return { employeeId: emp.id, employeeName: emp.name, status: "Pending" };
    });
    setFormData({ ...formData, employees: selectedEmployees });
  };

  const handleSubmitAssignment = () => {
    const newAssignment = {
      id: assignments.length + 1,
      ...formData,
    };
    setAssignments((prev) => [...prev, newAssignment]);
    handleAssignDialogClose();
  };

  

  const updateStatus = (trainingId, empId, status) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.trainingId === trainingId
          ? {
              ...a,
              employees: a.employees.map((e) =>
                e.employeeId === empId ? { ...e, status } : e
              ),
            }
          : a
      )
    );
  };

  const handleDeleteAssignment = (id) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" color="primary">
          Worker Training Assignments
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAssignDialogOpen}
          sx={{ color: "#0E4C92" }}
        >
          Assign Training
        </Button>
      </Box>

      {/* Main Table */}
      <Card
       sx={{
          borderLeft: "6px solid #082A52",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Table>
            <TableHead sx={{background:"#E3EAFD"}}>
              <TableRow>
                <TableCell />
                <TableCell>Training</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Assigned Workers</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.length > 0 ? (
                assignments.map((record) => (
                  <React.Fragment key={record.id}>
                    <TableRow>
                      <TableCell>
                        <IconButton
                          onClick={() => toggleExpand(record.trainingId)}
                        >
                          {expandedRows[record.trainingId] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{record.trainingTitle}</TableCell>
                      <TableCell>{record.mode}</TableCell>
                      <TableCell>{record.employees.length}</TableCell>
                      <TableCell>
                        <IconButton
                        color="primary"
                        onClick={() => handleEditAssignment(record.id)}>
                          <Edit />
                          </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteAssignment(record.id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    {/* Nested Table */}
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        sx={{ p: 0, border: 0, backgroundColor: "#fafafa" }}
                      >
                        <Collapse
                          in={expandedRows[record.trainingId]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box m={2}>
                            <Typography variant="subtitle1">
                              Assigned Workers
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Employee ID</TableCell>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Status</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {record.employees.map((emp) => (
                                  <TableRow key={emp.employeeId}>
                                    <TableCell>{emp.employeeId}</TableCell>
                                    <TableCell>{emp.employeeName}</TableCell>
                                    <TableCell>
                                      <Select
                                        size="small"
                                        value={emp.status}
                                        onChange={(e) =>
                                          updateStatus(
                                            record.trainingId,
                                            emp.employeeId,
                                            e.target.value
                                          )
                                        }
                                        sx={{
                                          backgroundColor:
                                            statusColors[emp.status],
                                          color: "white",
                                          borderRadius: 1,
                                          "& .MuiSelect-icon": {
                                            color: "white",
                                          },
                                        }}
                                      >
                                        <MenuItem value="Pending">
                                          Pending
                                        </MenuItem>
                                        <MenuItem value="Present">
                                          Present
                                        </MenuItem>
                                        <MenuItem value="Completed">
                                          Completed
                                        </MenuItem>
                                      </Select>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No assignments yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Assign Dialog */}
<Dialog
  open={assignDialogOpen}
  onClose={handleAssignDialogClose}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    sx: {
      minHeight: 500, // taller dialog
      maxHeight: "90vh",
      p: 3,
    },
  }}
>
  <DialogTitle
  sx={{ 
            backgroundColor: '#0A3A6E',
            color: 'white',
            fontWeight: 600,
            py: 3,
            display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
          }}
  >
    Assign Training
    <IconButton onClick={handleAssignDialogClose} sx={{ color: "#fff" }}>
                  <Close />
                </IconButton>
    </DialogTitle>

  <DialogContent dividers>
    <Grid container spacing={3} direction="column">
      
      {/* Training Select */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Select Training</InputLabel>
          <Select
            value={formData.trainingId}
            onChange={(e) => handleTrainingChange(e.target.value)}
            input={<OutlinedInput label="Select Training" />}
          >
            {defaultTrainingPrograms.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name} ({p.mode})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Employees Multi-Select */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Select Employees</InputLabel>
          <Select
            multiple
            value={formData.employees.map((e) => e.employeeId)}
            onChange={(e) => handleEmployeeSelect(e.target.value)}
            input={<OutlinedInput label="Select Employees" />}
            renderValue={() => ""} // <-- hides selected employees
            MenuProps={{
              PaperProps: { style: { maxHeight: 300 } }, // scroll if many employees
            }}
          >
            {employees.map((emp) => (
              <MenuItem key={emp.id} value={emp.id}>
                <Checkbox
                  checked={formData.employees.some((e) => e.employeeId === emp.id)}
                />
                <ListItemText primary={`${emp.id} - ${emp.name}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
    </Grid>
  </DialogContent>

  <DialogActions>
    <Button onClick={handleAssignDialogClose} color="error" variant="outlined">Cancel</Button>
    <Button
      variant="outlined"
      
      onClick={handleSubmitAssignment}
      sx={{ color: "#0E4C92" }}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default WorkerAssignment;
