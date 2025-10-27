import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
  Card,
  IconButton,
  Box,
  Divider,
  Alert,
} from "@mui/material";
import { AddCircle, RemoveCircle,Close } from "@mui/icons-material";

const ManageChecksDialog = ({ 
  open, 
  onClose, 
  availableChecks = [], // Add default value
  onChecksUpdate,
  permitTypes = [] // Add default value
}) => {
  const [newCheckForm, setNewCheckForm] = useState({
    key: "",
    label: "",
    description: ""
  });

  // Safe array access
  const safeAvailableChecks = availableChecks || [];
  const safePermitTypes = permitTypes || [];

  const handleAddNewCheck = () => {
    if (!newCheckForm.key.trim() || !newCheckForm.label.trim()) {
      alert("Key and Label are required");
      return;
    }

    // Check for duplicate key
    if (safeAvailableChecks.some(check => check.key === newCheckForm.key)) {
      alert("Check with this key already exists");
      return;
    }

    const newCheck = {
      key: newCheckForm.key.trim(),
      label: newCheckForm.label.trim(),
      description: newCheckForm.description.trim()
    };

    onChecksUpdate([...safeAvailableChecks, newCheck]);
    setNewCheckForm({ key: "", label: "", description: "" });
  };

  const handleRemoveCheck = (key) => {
    // Check if any permit type is using this check
    const isUsed = safePermitTypes.some(pt => 
      (pt.requiredChecks || []).includes(key)
    );
    if (isUsed) {
      alert("Cannot remove check that is currently in use by permit types");
      return;
    }

    onChecksUpdate(safeAvailableChecks.filter(check => check.key !== key));
  };

  const handleEditCheck = (oldKey, updatedCheck) => {
    // Check if key changed and new key already exists
    if (oldKey !== updatedCheck.key && safeAvailableChecks.some(check => check.key === updatedCheck.key)) {
      alert("Check with this key already exists");
      return;
    }

    // Update the check
    const updatedChecks = safeAvailableChecks.map(check => 
      check.key === oldKey ? updatedCheck : check
    );
    onChecksUpdate(updatedChecks);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
      sx={{ 
          background: "#0E4C92", 
          color: "white",
           display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
           }}>
      Manage Safety Checks
      <IconButton onClick={onClose} sx={{ color: "#fff" }}>
                              <Close />
                            </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Usage Alert */}
          {safePermitTypes.length > 0 && (
            <Alert severity="info">
              {safeAvailableChecks.filter(check => 
                safePermitTypes.some(pt => 
                  (pt.requiredChecks || []).includes(check.key)
                )
              ).length} checks are currently in use by permit types
            </Alert>
          )}

          {/* Add New Check Form */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Add New Check Type
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Check Key"
                value={newCheckForm.key}
                onChange={(e) => setNewCheckForm(p => ({ ...p, key: e.target.value }))}
                placeholder="e.g., fireWatch"
                helperText="Unique identifier (no spaces, used in backend)"
                required
                fullWidth
              />
              <TextField
                label="Display Label"
                value={newCheckForm.label}
                onChange={(e) => setNewCheckForm(p => ({ ...p, label: e.target.value }))}
                placeholder="e.g., Fire Watch"
                helperText="User-friendly name shown in forms"
                required
                fullWidth
              />
              <TextField
                label="Description"
                value={newCheckForm.description}
                onChange={(e) => setNewCheckForm(p => ({ ...p, description: e.target.value }))}
                placeholder="e.g., Designated fire watch personnel assigned"
                multiline
                rows={2}
                fullWidth
              />
              <Button 
                variant="contained" 
                onClick={handleAddNewCheck}
                startIcon={<AddCircle />}
                disabled={!newCheckForm.key.trim() || !newCheckForm.label.trim()}
                sx={{ alignSelf: 'flex-start' }}
              >
                Add Check Type
              </Button>
            </Stack>
          </Box>

          <Divider />

          {/* Existing Checks List */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Available Safety Checks ({safeAvailableChecks.length})
            </Typography>
            <Stack spacing={1}>
              {safeAvailableChecks.map((check) => (
                <EditableCheckCard
                  key={check.key}
                  check={check}
                  onUpdate={(updatedCheck) => handleEditCheck(check.key, updatedCheck)}
                  onRemove={() => handleRemoveCheck(check.key)}
                  isUsed={safePermitTypes.some(pt => 
                    (pt.requiredChecks || []).includes(check.key)
                  )}
                />
              ))}
              {safeAvailableChecks.length === 0 && (
                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 3 }}>
                  No safety checks configured. Add your first check above.
                </Typography>
              )}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

// Sub-component for editable check cards
const EditableCheckCard = ({ check, onUpdate, onRemove, isUsed }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(check);

  const handleSave = () => {
    if (!editForm.key.trim() || !editForm.label.trim()) {
      alert("Key and Label are required");
      return;
    }
    onUpdate(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(check);
    setIsEditing(false);
  };

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        {isEditing ? (
          <Stack spacing={1} sx={{ flex: 1 }}>
            <TextField
              size="small"
              value={editForm.key}
              onChange={(e) => setEditForm(p => ({ ...p, key: e.target.value }))}
              label="Key"
              disabled={isUsed} // Cannot change key if in use
            />
            <TextField
              size="small"
              value={editForm.label}
              onChange={(e) => setEditForm(p => ({ ...p, label: e.target.value }))}
              label="Label"
            />
            <TextField
              size="small"
              value={editForm.description}
              onChange={(e) => setEditForm(p => ({ ...p, description: e.target.value }))}
              label="Description"
              multiline
            />
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="contained" onClick={handleSave}>
                Save
              </Button>
              <Button size="small" onClick={handleCancel}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        ) : (
          <>
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body1" fontWeight={600}>
                  {check.label}
                </Typography>
                {isUsed && (
                  <Typography variant="caption" color="primary" sx={{ 
                    bgcolor: 'primary.50', 
                    px: 1, 
                    py: 0.5, 
                    borderRadius: 1 
                  }}>
                    In Use
                  </Typography>
                )}
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Key: {check.key}
              </Typography>
              {check.description && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {check.description}
                </Typography>
              )}
            </Box>
            <Stack direction="row" spacing={0.5}>
              <Button 
                size="small" 
                onClick={() => setIsEditing(true)}
                disabled={isUsed} // Can only edit if not in use
              >
                Edit
              </Button>
              <IconButton 
                color="error" 
                size="small" 
                onClick={onRemove}
                disabled={isUsed}
              >
                <RemoveCircle />
              </IconButton>
            </Stack>
          </>
        )}
      </Stack>
    </Card>
  );
};

export default ManageChecksDialog;