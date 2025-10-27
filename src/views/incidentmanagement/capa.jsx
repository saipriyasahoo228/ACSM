
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
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
  IconButton,
  Collapse,
  MenuItem,
  Chip,
  Stack,
} from "@mui/material";
import { ExpandMore, ExpandLess, Delete, Edit, AttachFile } from "@mui/icons-material";

const IncidentCAPA = () => {
  const [incidents, setIncidents] = useState([
    { id: "INC001", category: "Near-Miss", date: "2025-10-17", location: "Site A", rca: "", capas: [] },
    { id: "INC002", category: "LTI", date: "2025-10-16", location: "Site B", rca: "", capas: [] },
  ]);

  const [expandedRows, setExpandedRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentIncident, setCurrentIncident] = useState(null);
  const [capaForm, setCapaForm] = useState({
    type: "Corrective",
    description: "",
    owner: "",
    startDate: "",
    dueDate: "",
    cost: "",
    priority: "Medium",
    evidence: "",
    effectiveness: "",
    status: "Pending",
  });

  const employees = ["Ravi Kumar", "Sita Das", "Amit Roy", "Priya Sharma", "Rahul Verma"];
  const priorities = ["Low", "Medium", "High", "Critical"];

  useEffect(() => {
    const today = new Date();
    setIncidents((prev) =>
      prev.map((inc) => ({
        ...inc,
        capas: inc.capas.map((capa) =>
          capa.status !== "Completed" && new Date(capa.dueDate) < today
            ? { ...capa, status: "Overdue" }
            : capa
        ),
      }))
    );
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleOpenDialog = (incident, capa = null, index = null) => {
    setCurrentIncident({ incident, capa, index });
    setCapaForm(
      capa || {
        type: "Corrective",
        description: "",
        owner: "",
        startDate: "",
        dueDate: "",
        cost: "",
        priority: "Medium",
        evidence: "",
        effectiveness: "",
        status: "Pending",
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentIncident(null);
  };

  const handleCapaChange = (e) => {
    setCapaForm({ ...capaForm, [e.target.name]: e.target.value });
  };

  const handleSaveCapa = () => {
    const updatedIncidents = incidents.map((inc) => {
      if (inc.id === currentIncident.incident.id) {
        let updatedCAPAs = [...inc.capas];
        if (currentIncident.capa) {
          updatedCAPAs[currentIncident.index] = capaForm;
        } else {
          updatedCAPAs.push(capaForm);
        }
        return { ...inc, capas: updatedCAPAs };
      }
      return inc;
    });
    setIncidents(updatedIncidents);
    handleCloseDialog();
  };

  const handleDeleteCapa = (incidentId, index) => {
    const updatedIncidents = incidents.map((inc) => {
      if (inc.id === incidentId) {
        const updatedCAPAs = inc.capas.filter((_, i) => i !== index);
        return { ...inc, capas: updatedCAPAs };
      }
      return inc;
    });
    setIncidents(updatedIncidents);
  };

  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Progress":
        return "warning";
      case "Pending":
        return "default";
      case "Overdue":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card
        sx={{
          borderLeft: "6px solid #0A3A6E",
          borderRadius: 2,
          background: "linear-gradient(135deg, #f9fcff, #eef4ff)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" sx={{ color: "#0A3A6E", fontWeight: "bold" }}>
              Incident Investigation & CAPA
            </Typography>
          }
        />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "linear-gradient(135deg, #e3f2fd, #f9fcff)" }}>
                <TableCell></TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Incident ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Location</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>CAPA Status</TableCell> {/* New Column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {incidents.map((inc) => (
                <React.Fragment key={inc.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton size="small" onClick={() => toggleRow(inc.id)}>
                        {expandedRows.includes(inc.id) ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{inc.id}</TableCell>
                    <TableCell>{inc.category}</TableCell>
                    <TableCell>{inc.date}</TableCell>
                    <TableCell>{inc.location}</TableCell>
                    <TableCell>
                      {inc.capas.length === 0
                        ? "-"
                        : inc.capas.every((capa) => capa.status === "Completed")
                        ? "All Completed"
                        : "Pending CAPAs"}
                    </TableCell>
                  </TableRow>

                  {/* Expanded CAPA Details */}
                  <TableRow>
                    <TableCell colSpan={6} sx={{ p: 0, border: "none" }}>
                      <Collapse in={expandedRows.includes(inc.id)} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 2, background: "linear-gradient(135deg, #fff9f4, #fefefe)", borderRadius: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                            Root Cause Analysis
                          </Typography>
                          <TextField
                            multiline
                            rows={3}
                            fullWidth
                            value={inc.rca}
                            onChange={(e) => {
                              const updatedIncidents = incidents.map((item) =>
                                item.id === inc.id ? { ...item, rca: e.target.value } : item
                              );
                              setIncidents(updatedIncidents);
                            }}
                          />

                          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
                            Corrective & Preventive Actions
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{ mt: 1, mb: 1, bgcolor: "#0A3A6E", ":hover": { bgcolor: "#082f5a" } }}
                            onClick={() => handleOpenDialog(inc)}
                          >
                            + Add CAPA
                          </Button>

                          <Table size="small">
                            <TableHead>
                              <TableRow sx={{ background: "#e8f5e9" }}>
                                <TableCell>Type</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Owner</TableCell>
                                <TableCell>Priority</TableCell>
                                <TableCell>Cost</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Effectiveness</TableCell>
                                <TableCell>Evidence</TableCell>
                                <TableCell>Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {inc.capas.map((capa, idx) => (
                                <TableRow key={idx}>
                                  <TableCell>{capa.type}</TableCell>
                                  <TableCell>{capa.description}</TableCell>
                                  <TableCell>{capa.owner}</TableCell>
                                  <TableCell>{capa.priority}</TableCell>
                                  <TableCell>₹{capa.cost || "-"}</TableCell>
                                  <TableCell>{capa.dueDate}</TableCell>
                                  <TableCell>
                                    <Chip label={capa.status} color={statusColor(capa.status)} size="small" />
                                  </TableCell>
                                  <TableCell>{capa.effectiveness || "-"}</TableCell>
                                  <TableCell>
                                    {capa.evidence ? (
                                      <Button size="small" startIcon={<AttachFile />} sx={{ textTransform: "none" }}>
                                        View
                                      </Button>
                                    ) : (
                                      "-"
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <IconButton size="small" onClick={() => handleOpenDialog(inc, capa, idx)}>
                                      <Edit />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => handleDeleteCapa(inc.id, idx)}>
                                      <Delete />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                              {inc.capas.length === 0 && (
                                <TableRow>
                                  <TableCell colSpan={10} align="center">
                                    No CAPAs added.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* CAPA Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: "#0A3A6E", color: "#fff", fontWeight: "bold" }}>
          {currentIncident?.capa ? "Edit CAPA" : "Add CAPA"}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <TextField select label="Type" name="type" value={capaForm.type} onChange={handleCapaChange}>
              <MenuItem value="Corrective">Corrective</MenuItem>
              <MenuItem value="Preventive">Preventive</MenuItem>
            </TextField>

            <TextField select label="Owner" name="owner" value={capaForm.owner} onChange={handleCapaChange}>
              {employees.map((emp) => (
                <MenuItem key={emp} value={emp}>
                  {emp}
                </MenuItem>
              ))}
            </TextField>

            <TextField select label="Priority" name="priority" value={capaForm.priority} onChange={handleCapaChange}>
              {priorities.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>

            <TextField label="Cost (₹)" name="cost" value={capaForm.cost} onChange={handleCapaChange} />

            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={capaForm.startDate}
              onChange={handleCapaChange}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Due Date"
              name="dueDate"
              type="date"
              value={capaForm.dueDate}
              onChange={handleCapaChange}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Description"
              name="description"
              multiline
              rows={3}
              value={capaForm.description}
              onChange={handleCapaChange}
            />

            <TextField
              label="Linked Evidence (File Name / Ref)"
              name="evidence"
              value={capaForm.evidence}
              onChange={handleCapaChange}
            />

            <TextField
              label="Effectiveness Check / Verification"
              name="effectiveness"
              value={capaForm.effectiveness}
              onChange={handleCapaChange}
              multiline
              rows={2}
            />

            <TextField select label="Status" name="status" value={capaForm.status} onChange={handleCapaChange}>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Overdue">Overdue</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveCapa} variant="contained" sx={{ bgcolor: "#0A3A6E" }}>
            Save CAPA
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IncidentCAPA;
