
import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Chip,
  Stack,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Add, Edit, Delete, ExpandMore ,Close} from "@mui/icons-material";

// Import only ManageChecksDialog since it's truly reusable
import ManageChecksDialog from "./managechecks";

const INITIAL_DEFAULT_CHECKS = [
  { key: "gasTest", label: "Gas Test", description: "Atmospheric monitoring for hazardous gases" },
  { key: "isolationCert", label: "Isolation Certificate", description: "Energy isolation verification" },
  { key: "ppe", label: "PPE Check", description: "Personal Protective Equipment inspection" },
  { key: "lockout", label: "LOTO / Isolation", description: "Lockout Tagout procedure completion" },
];

const INITIAL_PERMIT_TYPES = [
  {
    id: "PTW-001",
    name: "Hot Work",
    code: "HOT",
    description: "Welding, cutting, grinding or any activity producing sparks/heat.",
    validityHours: 8,
    jsaRequired: true,
    requiredChecks: ["gasTest", "ppe"],
    customChecklist: ["Fire extinguisher available", "Hot work permit displayed"],
  },
  {
    id: "PTW-002",
    name: "Confined Space",
    code: "CONFINED",
    description: "Entry into tanks, pits, pits, tunnels requiring permits and monitoring.",
    validityHours: 12,
    jsaRequired: true,
    requiredChecks: ["gasTest", "isolationCert"],
    customChecklist: ["Atmospheric monitoring logged", "Rescue team ready"],
  },
];

function generateId(prefix = "PTW") {
  const t = Date.now().toString(36).slice(-5).toUpperCase();
  return `${prefix}-${t}`;
}

export default function PermitTypeConfigurator() {
  const [permitTypes, setPermitTypes] = useState(INITIAL_PERMIT_TYPES);
  const [availableChecks, setAvailableChecks] = useState(INITIAL_DEFAULT_CHECKS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checkManagementOpen, setCheckManagementOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    code: "",
    description: "",
    validityHours: 8,
    jsaRequired: true,
    requiredChecks: [],
    newChecklistItem: "",
    customChecklist: [],
  };
  const [form, setForm] = useState(emptyForm);

  // Derived map for quick labeling
  const checksMap = useMemo(() => {
    const m = {};
    availableChecks.forEach((c) => (m[c.key] = c));
    return m;
  }, [availableChecks]);

  // Open create dialog
  function handleAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }

  // Open edit dialog
  function handleEdit(id) {
    const item = permitTypes.find((p) => p.id === id);
    if (!item) return;
    setEditingId(id);
    setForm({
      name: item.name,
      code: item.code,
      description: item.description,
      validityHours: item.validityHours,
      jsaRequired: item.jsaRequired,
      requiredChecks: item.requiredChecks || [],
      newChecklistItem: "",
      customChecklist: item.customChecklist || [],
    });
    setDialogOpen(true);
  }

  // Delete a permit type
  function handleDelete(id) {
    if (!window.confirm("Delete permit type? This cannot be undone.")) return;
    setPermitTypes((prev) => prev.filter((p) => p.id !== id));
  }

  // Required Checks handlers (now inline)
  function handleToggleCheck(key) {
    setForm((prev) => {
      const set = new Set(prev.requiredChecks);
      if (set.has(key)) set.delete(key);
      else set.add(key);
      return { ...prev, requiredChecks: Array.from(set) };
    });
  }

  // Custom checklist handlers
  function handleAddChecklistItem() {
    const v = form.newChecklistItem?.trim();
    if (!v) return;
    setForm((prev) => ({
      ...prev,
      customChecklist: [...prev.customChecklist, v],
      newChecklistItem: "",
    }));
  }

  function handleRemoveChecklistItem(index) {
    setForm((prev) => ({
      ...prev,
      customChecklist: prev.customChecklist.filter((_, i) => i !== index),
    }));
  }

  function validateForm() {
    if (!form.name.trim()) return "Permit name is required.";
    if (!form.code.trim()) return "Permit code is required.";
    if (form.validityHours <= 0) return "Validity hours must be > 0.";
    return null;
  }

  function handleSave() {
    const err = validateForm();
    if (err) {
      alert(err);
      return;
    }

    const payload = {
      id: editingId ? editingId : generateId(),
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      description: form.description.trim(),
      validityHours: Number(form.validityHours),
      jsaRequired: Boolean(form.jsaRequired),
      requiredChecks: form.requiredChecks,
      customChecklist: form.customChecklist,
    };

    if (editingId) {
      setPermitTypes((prev) => prev.map((p) => (p.id === editingId ? payload : p)));
    } else {
      setPermitTypes((prev) => [payload, ...prev]);
    }

    setDialogOpen(false);
  }

  // Inline RequiredChecksSelector component
  const RequiredChecksSection = () => (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle2">
          Required Safety Checks ({form.requiredChecks.length} selected)
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Select the mandatory safety checks for this permit type
        </Typography>
        
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {availableChecks.map((check) => {
            const checked = form.requiredChecks.includes(check.key);
            return (
              <Tooltip key={check.key} title={check.description || check.label}>
                <Chip
                  label={check.label}
                  clickable
                  color={checked ? "primary" : "default"}
                  variant={checked ? "filled" : "outlined"}
                  onClick={() => handleToggleCheck(check.key)}
                  sx={{
                    mb: 1,
                    bgcolor: checked ? "rgba(129,212,250,0.25)" : undefined,
                    border: checked ? "1px solid rgba(59,130,246,0.12)" : undefined,
                  }}
                />
              </Tooltip>
            );
          })}
        </Stack>
        
        {availableChecks.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No safety checks available. Add some in the "Manage Checks" section.
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );

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
              Permit Type Configurator
            </Typography>
          }
          action={
            <Stack direction="row" spacing={1}>
              <Tooltip title="Manage Available Checks">
               <Button 
  variant="outlined" 
  onClick={() => setCheckManagementOpen(true)}
  sx={{ 
    mr: 1,
    borderColor: '#81C784',
    color: '#1B5E20',
  }}
>
  Manage Checks
</Button>
              </Tooltip>
             <Button
  variant="contained"
  startIcon={<Add />}
  onClick={handleAdd}
  sx={{
    backgroundColor: '#0A3A6E',
  }}
>
  New Permit Type
</Button>
            </Stack>
          }
        />
        <CardContent>
          <Typography variant="body2" sx={{ mb: 2, color: "#334155" }}>
            Define permit categories and their default safety requirements. These are
            used when creating a new permit request.
          </Typography>

          {/* Table */}
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#E3F2FD" }}>
                <TableCell>Permit ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Validity (hrs)</TableCell>
                <TableCell>JSA</TableCell>
                <TableCell>Required Checks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {permitTypes.map((pt) => (
                <TableRow key={pt.id}>
                  <TableCell>{pt.id}</TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }}>{pt.name}</Typography>
                    <Typography variant="caption" sx={{ display: "block", color: "#475569" }}>
                      {pt.description}
                    </Typography>
                  </TableCell>
                  <TableCell>{pt.code}</TableCell>
                  <TableCell>{pt.validityHours}</TableCell>
                  <TableCell>{pt.jsaRequired ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap">
                      {(pt.requiredChecks || []).map((c) => (
                        <Tooltip key={c} title={checksMap[c]?.description || c}>
                          <Chip 
                            label={checksMap[c]?.label || c} 
                            size="small" 
                            sx={{ mr: 0.5, mb: 0.5 }} 
                          />
                        </Tooltip>
                      ))}
                      {(pt.customChecklist || []).slice(0, 3).map((cc, idx) => (
                        <Chip key={idx} label={cc} size="small" variant="outlined" sx={{ mb: 0.5 }} />
                      ))}
                      {pt.customChecklist && pt.customChecklist.length > 3 && (
                        <Chip label={`+${pt.customChecklist.length - 3} more`} size="small" sx={{ mb: 0.5 }} />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton color="primary" onClick={() => handleEdit(pt.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(pt.id)}>
                        <Delete />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {permitTypes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    No permit types defined yet. Click <b>New Permit Type</b> to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog: Create/Edit Permit Type */}
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
          {editingId ? "Edit Permit Type" : "New Permit Type"}
          <IconButton onClick={() => setDialogOpen(false)} sx={{ color: "#fff" }}>
                                  <Close />
                                </IconButton>
          </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Permit Name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                fullWidth
                required
              />
              <TextField
                label="Code"
                value={form.code}
                onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))}
                helperText="Short code (e.g., HOT, CONFINED)"
                sx={{ width: 180 }}
                required
              />
            </Stack>

            <TextField
              label="Description"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              fullWidth
              multiline
              rows={2}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
              <TextField
                label="Default Validity (hours)"
                type="number"
                value={form.validityHours}
                onChange={(e) => setForm((p) => ({ ...p, validityHours: Number(e.target.value) }))}
                sx={{ width: 200 }}
                inputProps={{ min: 1 }}
                required
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={form.jsaRequired}
                    onChange={(e) => setForm((p) => ({ ...p, jsaRequired: e.target.checked }))}
                  />
                }
                label="JSA Required"
              />
            </Stack>

            {/* Inline Required Checks Section */}
            <RequiredChecksSection />

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Custom Checklist Items
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <TextField
                  placeholder="Add checklist item (e.g., 'Permit board signed')"
                  value={form.newChecklistItem}
                  onChange={(e) => setForm((p) => ({ ...p, newChecklistItem: e.target.value }))}
                  fullWidth
                />
                <Button variant="outlined" onClick={handleAddChecklistItem} startIcon={<Add />}>
                  Add
                </Button>
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                {form.customChecklist.length === 0 && (
                  <Typography variant="body2" sx={{ color: "#64748B" }}>
                    No custom items yet.
                  </Typography>
                )}
                {form.customChecklist.map((it, idx) => (
                  <Chip
                    key={idx}
                    label={it}
                    onDelete={() => handleRemoveChecklistItem(idx)}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
         <Button 
  onClick={() => setDialogOpen(false)}
  sx={{
    color: '#D32F2F',
    borderColor: '#D32F2F',
    '&:hover': {
      backgroundColor: 'rgba(211, 47, 47, 0.04)',
      borderColor: '#B71C1C',
    },
  }}
>
  Cancel
</Button>
          <Button 
  variant="contained" 
  onClick={handleSave}
  sx={{
    backgroundColor: '#0A3A6E',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#082A52',
    },
  }}
>
  {editingId ? "Save Changes" : "Create Permit Type"}
</Button>
        </DialogActions>
      </Dialog>

      {/* Manage Checks Dialog (still separate - truly reusable) */}
      <ManageChecksDialog
        open={checkManagementOpen}
        onClose={() => setCheckManagementOpen(false)}
        availableChecks={availableChecks}
        onChecksUpdate={setAvailableChecks}
        permitTypes={permitTypes}
      />
    </Box>
  );
}