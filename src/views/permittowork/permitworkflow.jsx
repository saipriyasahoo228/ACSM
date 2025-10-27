import React, { useState } from "react";
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Stack,
  Chip,
  Tooltip,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Add, Edit, Delete, ExpandMore, ArrowUpward, ArrowDownward ,Close} from "@mui/icons-material";

// Dummy permit types — replace later with real data
const DUMMY_PERMIT_TYPES = [
  { id: "PTW-001", name: "Hot Work" },
  { id: "PTW-002", name: "Confined Space" },
  { id: "PTW-003", name: "Work at Height" },
];

export default function PermitWorkflowRouter() {
  const [workflows, setWorkflows] = useState([
    {
      permitType: "Hot Work",
      stages: [
        {
          id: "s1",
          name: "Supervisor Review",
          role: "Supervisor",
          approver: "John Doe",
          autoApprove: false,
          timeLimit: 4,
          notes: "Check fire safety equipment",
          attachmentRequired: true,
        },
        {
          id: "s2",
          name: "Safety Officer Approval",
          role: "Safety Officer",
          approver: "Priya Sahoo",
          autoApprove: false,
          timeLimit: 6,
          notes: "Verify gas test done",
          attachmentRequired: false,
        },
      ],
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ permitType: "", stages: [] });

  const emptyStage = {
  id: "",           // optional
  name: "",
  role: "",
  approver: "",
  autoApprove: false,
  timeLimit: 0,     // default number
  notes: "",
  attachmentRequired: false,
};


  // Add workflow
  const handleAddWorkflow = () => {
    setEditingIndex(null);
    setForm({ permitType: "", stages: [] });
    setDialogOpen(true);
  };

  // Edit workflow
  const handleEditWorkflow = (index) => {
    setEditingIndex(index);
    setForm({ ...workflows[index] });
    setDialogOpen(true);
  };

  // Delete workflow
  const handleDeleteWorkflow = (index) => {
    if (window.confirm("Delete this workflow?")) {
      setWorkflows((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Add stage
 const handleAddStage = () => {
  setForm((prev) => ({
    ...prev,
    stages: [...prev.stages, { ...emptyStage, id: `s${Date.now()}` }],
  }));
};

  // Remove stage
  const handleRemoveStage = (id) => {
    setForm((prev) => ({
      ...prev,
      stages: prev.stages.filter((s) => s.id !== id),
    }));
  };

  // Reorder stage
  const handleReorderStage = (index, direction) => {
    const updated = [...form.stages];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    setForm((prev) => ({ ...prev, stages: updated }));
  };

  // Save workflow
  const handleSaveWorkflow = () => {
    if (!form.permitType) {
      alert("Select a Permit Type");
      return;
    }
    if (form.stages.length === 0) {
      alert("Add at least one stage");
      return;
    }
    if (editingIndex !== null) {
      setWorkflows((prev) => prev.map((wf, i) => (i === editingIndex ? form : wf)));
    } else {
      setWorkflows((prev) => [...prev, form]);
    }
    setDialogOpen(false);
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
          title={<Typography variant="h6" sx={{ color: "#0E4C92", fontWeight: 600 }}>Permit Workflow & Approval Router</Typography>}
          action={
            <Button variant="contained" startIcon={<Add />} onClick={handleAddWorkflow} sx={{ backgroundColor: "#0A3A6E" }}>
              New Workflow
            </Button>
          }
        />
        <CardContent>
          <Typography variant="body2" sx={{ mb: 2, color: "#334155" }}>
            Define approval hierarchy for each permit type.
          </Typography>

          <Table>
            <TableHead>
              <TableRow sx={{ background: "#E3F2FD" }}>
                <TableCell>Permit Type</TableCell>
                <TableCell>Stages</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workflows.map((wf, index) => (
                <TableRow key={wf.permitType}>
                  <TableCell sx={{ fontWeight: 600 }}>{wf.permitType}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {wf.stages.map((stage, idx) => (
                        <Tooltip
                          key={stage.id}
                          title={`Role: ${stage.role}, Approver: ${stage.approver}, Time Limit: ${stage.timeLimit}h`}
                        >
                          <Chip
                            label={`${idx + 1}. ${stage.name} ${stage.autoApprove ? "(Auto)" : "(Manual)"}`}
                            color={stage.autoApprove ? "success" : "default"}
                            variant={stage.autoApprove ? "filled" : "outlined"}
                            sx={{ mb: 0.5 }}
                          />
                        </Tooltip>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleEditWorkflow(index)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDeleteWorkflow(index)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {workflows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                    No workflows defined. Click <b>New Workflow</b>.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xl">
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
    {editingIndex !== null ? "Edit Workflow" : "New Workflow"}
    <IconButton  onClick={() => setDialogOpen(false)} sx={{ color: "#fff" }}>
                            <Close />
                          </IconButton>
    </DialogTitle>
  <DialogContent dividers>
    <Stack spacing={3}>
      <Select
        fullWidth
        value={form.permitType}
        onChange={(e) => setForm((prev) => ({ ...prev, permitType: e.target.value }))}
        displayEmpty
      >
        <MenuItem value="">Select Permit Type</MenuItem>
        {DUMMY_PERMIT_TYPES.map((pt) => (
          <MenuItem key={pt.id} value={pt.name}>{pt.name}</MenuItem>
        ))}
      </Select>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle2">Approval Stages ({form.stages.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {form.stages.length === 0 && (
            <Typography variant="body2" sx={{ color: "#64748B" }}>No stages yet. Add one below.</Typography>
          )}

          {form.stages.map((stage, idx) => (
            <Card
  key={stage.id}
  sx={{
    mb: 2,
    border: "1px solid #E0E0E0",
    borderRadius: 2,
    p: 2,
    bgcolor: "#FAFAFA",
  }}
>
  <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
    <TextField
      label="Stage Name"
      value={stage.name}
      onChange={(e) => {
        const updated = [...form.stages];
        updated[idx].name = e.target.value;
        setForm(prev => ({ ...prev, stages: updated }));
      }}
      sx={{ flex: 1, minWidth: 180 }}
    />
    <TextField
      label="Role"
      value={stage.role}
      onChange={(e) => {
        const updated = [...form.stages];
        updated[idx].role = e.target.value;
        setForm(prev => ({ ...prev, stages: updated }));
      }}
      sx={{ flex: 1, minWidth: 180 }}
    />
    <TextField
      label="Approver"
      value={stage.approver}
      onChange={(e) => {
        const updated = [...form.stages];
        updated[idx].approver = e.target.value;
        setForm(prev => ({ ...prev, stages: updated }));
      }}
      sx={{ flex: 1, minWidth: 180 }}
    />
    <TextField
      label="Time Limit (hrs)"
      type="number"
      value={stage.timeLimit || ""}
      onChange={(e) => {
        const updated = [...form.stages];
        updated[idx].timeLimit = Number(e.target.value);
        setForm(prev => ({ ...prev, stages: updated }));
      }}
      sx={{ width: 140 }}
    />
    <Button
      variant={stage.autoApprove ? "contained" : "outlined"}
      color={stage.autoApprove ? "success" : "inherit"}
      onClick={() => {
        const updated = [...form.stages];
        updated[idx].autoApprove = !updated[idx].autoApprove;
        setForm(prev => ({ ...prev, stages: updated }));
      }}
    >
      {stage.autoApprove ? "Auto" : "Manual"}
    </Button>
    <IconButton onClick={() => handleReorderStage(idx, "up")}>
      <ArrowUpward />
    </IconButton>
    <IconButton onClick={() => handleReorderStage(idx, "down")}>
      <ArrowDownward />
    </IconButton>
    <IconButton color="error" onClick={() => handleRemoveStage(stage.id)}>
      <Delete />
    </IconButton>
  </Stack>
</Card>

          ))}
          <Button startIcon={<Add />} variant="outlined" onClick={handleAddStage}>Add Stage</Button>
        </AccordionDetails>
      </Accordion>
    </Stack>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDialogOpen(false)} sx={{ color: "#D32F2F" }}>Cancel</Button>
    <Button variant="contained" onClick={handleSaveWorkflow} sx={{ backgroundColor: "#0A3A6E" }}>Save Workflow</Button>
  </DialogActions>
</Dialog>

    </Box>
  );
}
