
import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Select,
  MenuItem,
  Collapse,
  Tooltip,
  Chip,
} from "@mui/material";
import { Add, Edit, Delete, ExpandMore, ExpandLess,Close } from "@mui/icons-material";

// Dummy permit types and their required checks
const DUMMY_PERMITS = [
  { id: "PTW-001", name: "Hot Work", requiredChecks: ["gasTest", "ppe"] },
  { id: "PTW-002", name: "Confined Space", requiredChecks: ["gasTest", "isolationCert"] },
  { id: "PTW-003", name: "Work at Height", requiredChecks: ["ppe"] },
  { id: "PTW-004", name: "Electrical Work", requiredChecks: ["ppe"] },
  { id: "PTW-005", name: "Excavation", requiredChecks: ["gasTest", "isolationCert"] },
  { id: "PTW-006", name: "Lifting Operations", requiredChecks: ["ppe"] },
];

// Dummy workers
const DUMMY_WORKERS = [
  { id: "W001", name: "John Doe" },
  { id: "W002", name: "Priya Sahoo" },
  { id: "W003", name: "Amit Patel" },
];

// All possible competencies/checks
const DUMMY_CHECKS = [
  { key: "gasTest", label: "Gas Test" },
  { key: "isolationCert", label: "Isolation Certificate" },
  { key: "ppe", label: "PPE Check" },
];

export default function WorkerCompetencyManager() {
  const [workers, setWorkers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [form, setForm] = useState({ workerId: "", competencies: [] });

  const handleAddWorker = () => {
    setEditingId(null);
    setForm({ workerId: "", competencies: [] });
    setDialogOpen(true);
  };

  const handleEditWorker = (worker) => {
    setEditingId(worker.workerId);
    setForm({ workerId: worker.workerId, competencies: worker.competencies });
    setDialogOpen(true);
  };

  const handleDeleteWorker = (workerId) => {
    if (window.confirm("Delete this worker?")) {
      setWorkers((prev) => prev.filter((w) => w.workerId !== workerId));
    }
  };

  const handleToggleCompetency = (key) => {
    setForm((prev) => {
      const set = new Set(prev.competencies);
      if (set.has(key)) set.delete(key);
      else set.add(key);
      return { ...prev, competencies: Array.from(set) };
    });
  };

  const handleSaveWorker = () => {
    if (!form.workerId) return alert("Select a Worker");

    const payload = {
      workerId: form.workerId,
      name: DUMMY_WORKERS.find((w) => w.id === form.workerId)?.name || "",
      competencies: form.competencies,
    };

    if (editingId) {
      setWorkers((prev) => prev.map((w) => (w.workerId === editingId ? payload : w)));
    } else {
      setWorkers((prev) => [...prev, payload]);
    }

    setDialogOpen(false);
  };

  const checkMap = useMemo(() => {
    const m = {};
    DUMMY_CHECKS.forEach((c) => (m[c.key] = c.label));
    return m;
  }, []);

  const isEligible = (worker, permit) => {
    return permit.requiredChecks.every((check) => worker.competencies.includes(check));
  };

  const toggleExpandRow = (workerId) => {
    setExpandedRows((prev) => ({ ...prev, [workerId]: !prev[workerId] }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card 
       sx={{
          borderLeft: "6px solid #082A52",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          borderRadius: 2,
        }}

      >
        <CardHeader
          title={
            <Typography variant="h6" sx={{ color: "#0E4C92", fontWeight: 600 }}>
              Worker & Competency Manager
            </Typography>
          }
          action={
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddWorker}
              sx={{ backgroundColor: "#0A3A6E" }}
            >
              Assign Competencies
            </Button>
          }
        />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#E3F2FD" }}>
                <TableCell />
                <TableCell>Worker ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Competencies</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workers.map((worker) => (
                <React.Fragment key={worker.workerId}>
                  <TableRow>
                    <TableCell>
                      <IconButton size="small" onClick={() => toggleExpandRow(worker.workerId)}>
                        {expandedRows[worker.workerId] ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{worker.workerId}</TableCell>
                    <TableCell>{worker.name}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {worker.competencies.length === 0 && (
                          <Typography variant="body2" sx={{ color: "#64748B" }}>
                            None
                          </Typography>
                        )}
                        {worker.competencies.map((c) => (
                          <Tooltip key={c} title={checkMap[c]}>
                            <Chip label={checkMap[c]} size="small" sx={{ mb: 0.5 }} />
                          </Tooltip>
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton color="primary" onClick={() => handleEditWorker(worker)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteWorker(worker.workerId)}>
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                      <Collapse in={expandedRows[worker.workerId]} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Permit Eligibility
                          </Typography>
                          <Stack spacing={1}>
                            {DUMMY_PERMITS.map((permit) => (
                              <Typography
                                key={permit.id}
                                sx={{
                                  color: isEligible(worker, permit) ? "green" : "red",
                                  fontWeight: 600,
                                }}
                              >
                                {permit.name}: {isEligible(worker, permit) ? "Eligible" : "Not Eligible"}
                              </Typography>
                            ))}
                          </Stack>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
              {workers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    No workers assigned yet. Click <b>Assign Competencies</b> to start.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
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
          {editingId ? "Edit Worker Competencies" : "Assign Competencies"}
          <IconButton onClick={() => setDialogOpen(false)} sx={{ color: "#fff" }}>
                                  <Close />
                                </IconButton>
          </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Select
              value={form.workerId}
              onChange={(e) => setForm((prev) => ({ ...prev, workerId: e.target.value }))}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">Select Worker</MenuItem>
              {DUMMY_WORKERS.map((w) => (
                <MenuItem key={w.id} value={w.id}>
                  {w.name} ({w.id})
                </MenuItem>
              ))}
            </Select>

            <Typography variant="subtitle2">Competencies</Typography>
            <FormGroup row>
              {DUMMY_CHECKS.map((check) => (
                <FormControlLabel
                  key={check.key}
                  control={
                    <Checkbox
                      checked={form.competencies.includes(check.key)}
                      onChange={() => handleToggleCompetency(check.key)}
                    />
                  }
                  label={check.label}
                />
              ))}
            </FormGroup>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: "#D32F2F" }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveWorker} sx={{ backgroundColor: "#0A3A6E" }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
