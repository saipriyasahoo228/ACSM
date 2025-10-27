
import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
  IconButton,
  Chip,
  FormHelperText,
} from "@mui/material";
import { Add, Delete,Edit ,Close} from "@mui/icons-material";

export default function PermitRequestManager() {
  // Dummy permit & worker data
  const permitTypes = [
    { id: "PTW-001", name: "Hot Work", requiredChecks: ["Gas Test", "PPE Check"] },
    { id: "PTW-002", name: "Confined Space", requiredChecks: ["Gas Test", "Isolation Certificate"] },
  ];

  const workers = [
    { id: "W001", name: "Ravi Kumar", role: "Welder", competencies: ["Gas Test", "PPE Check"] },
    { id: "W002", name: "Anita Sharma", role: "Technician", competencies: ["PPE Check"] },
    { id: "W003", name: "Vikas Singh", role: "Maintenance", competencies: ["Gas Test", "Isolation Certificate"] },
  ];

  const [permitRequests, setPermitRequests] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const emptyForm = {
    permitType: "",
    location: "",
    description: "",
    selectedWorkers: [],
    remarks: "",
  };

  const [form, setForm] = useState(emptyForm);

  // Filter eligible workers for selected permit
  const eligibleWorkers = useMemo(() => {
    if (!form.permitType) return [];
    const selectedPermit = permitTypes.find((p) => p.id === form.permitType);
    if (!selectedPermit) return [];

    return workers.map((w) => {
      const eligible = selectedPermit.requiredChecks.every((rc) =>
        w.competencies.includes(rc)
      );
      return { ...w, eligible };
    });
  }, [form.permitType]);

  const handleAddRequest = () => {
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.permitType || form.selectedWorkers.length === 0) {
      alert("Please select a permit type and at least one eligible worker.");
      return;
    }

    const selectedPermit = permitTypes.find((p) => p.id === form.permitType);
    const payload = {
      id: `REQ-${Date.now()}`,
      permitType: selectedPermit.name,
      location: form.location,
      description: form.description,
      selectedWorkers: form.selectedWorkers,
      remarks: form.remarks,
      status: "Pending Approval",
      date: new Date().toLocaleString(),
    };

    setPermitRequests((prev) => [payload, ...prev]);
    setDialogOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this permit request?")) {
      setPermitRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleWorkerToggle = (workerId) => {
    setForm((prev) => {
      const set = new Set(prev.selectedWorkers);
      if (set.has(workerId)) set.delete(workerId);
      else set.add(workerId);
      return { ...prev, selectedWorkers: Array.from(set) };
    });
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
            <Typography variant="h6" 
            sx={{ color: "#082A52", fontWeight: 600 }}>
              Permit Request & Issuance Manager
            </Typography>
          }
          action={
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddRequest}
              sx={{
                backgroundColor: "#082A52",
                "&:hover": { backgroundColor: "#061E3B" },
              }}
            >
              New Permit Request
            </Button>
          }
        />

        <CardContent>
          <Typography variant="body2" sx={{ mb: 2, color: "#334155" }}>
            Create and manage permit requests, assign eligible workers, and track
            approval status.
          </Typography>

          <Table>
            <TableHead>
              <TableRow sx={{ background: "#E3F2FD" }}>
                <TableCell>Request ID</TableCell>
                <TableCell>Permit Type</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Workers</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permitRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.id}</TableCell>
                  <TableCell>{req.permitType}</TableCell>
                  <TableCell>{req.location}</TableCell>
                  <TableCell>
                    {req.selectedWorkers.map((w) => (
                      <Chip key={w} label={w} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                    ))}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={req.status}
                      size="small"
                      sx={{
                        backgroundColor:
                          req.status === "Pending Approval"
                            ? "#FFF4E5"
                            : req.status === "Approved"
                            ? "#E7F6EC"
                            : "#FFECEC",
                        color:
                          req.status === "Pending Approval"
                            ? "#F57C00"
                            : req.status === "Approved"
                            ? "#2E7D32"
                            : "#C62828",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleDelete(req.id)}>
                      <Delete />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleEdit(req.id)}>
                     <Edit />
                   </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {permitRequests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    No permit requests yet. Click <b>New Permit Request</b> to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
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
          New Permit Request
          <IconButton onClick={() => setDialogOpen(false)} sx={{ color: "#fff" }}>
                                            <Close />
                                          </IconButton>
          </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              select
              label="Permit Type"
              value={form.permitType}
              onChange={(e) => setForm((p) => ({ ...p, permitType: e.target.value }))}
              fullWidth
              required
            >
              {permitTypes.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>

            <Stack direction="row" spacing={2}>
              <TextField
                label="Location / Area"
                fullWidth
                value={form.location}
                onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
              />
              <TextField
                label="Description"
                fullWidth
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              />
            </Stack>

            {form.permitType && (
  <Box>
    <TextField
      select
      label="Select Eligible Workers"
      fullWidth
      SelectProps={{
        multiple: true,
        renderValue: (selected) => selected.join(", "),
      }}
      value={form.selectedWorkers}
      onChange={(e) =>
        setForm((p) => ({
          ...p,
          selectedWorkers: e.target.value,
        }))
      }
    >
      {eligibleWorkers
        .filter((w) => w.eligible) // show only eligible workers
        .map((w) => (
          <MenuItem key={w.id} value={w.name}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <input
                type="checkbox"
                checked={form.selectedWorkers.includes(w.name)}
                readOnly
              />
              <Typography>
                {w.name} ({w.role})
              </Typography>
            </Stack>
          </MenuItem>
        ))}
    </TextField>

    {eligibleWorkers.filter((w) => w.eligible).length === 0 && (
      <FormHelperText sx={{ color: "error.main" }}>
        No eligible workers found for this permit type.
      </FormHelperText>
    )}
  </Box>
)}

            

            <TextField
              label="Remarks"
              fullWidth
              multiline
              rows={2}
              value={form.remarks}
              onChange={(e) => setForm((p) => ({ ...p, remarks: e.target.value }))}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: "#D32F2F" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#082A52",
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "#061E3B" },
            }}
          >
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
