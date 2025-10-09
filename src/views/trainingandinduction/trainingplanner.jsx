
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Typography,
} from "@mui/material";
import { AddCircleOutline, Edit, Delete } from "@mui/icons-material";

const TrainingPlanner = () => {
  const [open, setOpen] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    plannerId: "",
    trainingName: "",
    site: "",
    trainer: "",
    startDate: "",
    endDate: "",
    language: "EN",
    trade: "",
    maxParticipants: "",
    status: "Planned",
  });

  const languages = ["EN", "HI", "OD", "BN", "TA", "MR"];
  const statuses = ["Planned", "Ongoing", "Completed"];

  const handleOpen = () => {
    const nextId = `PLAN-${String(trainings.length + 1).padStart(3, "0")}`;
    setFormData({ ...formData, plannerId: nextId });
    setEditingIndex(null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingIndex !== null) {
      const updated = [...trainings];
      updated[editingIndex] = formData;
      setTrainings(updated);
    } else {
      setTrainings([...trainings, formData]);
    }
    setOpen(false);
  };

  const handleEdit = (index) => {
    setFormData(trainings[index]);
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setTrainings(trainings.filter((t) => t.plannerId !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, color: "#0E4C92" }}>
        Training Planner
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Schedule New Training
      </Button>

      <Card>
        <CardContent>
          <Table>
            <TableHead sx={{ background: "#E3EAFD" }}>
              <TableRow>
                <TableCell>Planner ID</TableCell>
                <TableCell>Training Name</TableCell>
                <TableCell>Site</TableCell>
                <TableCell>Trade</TableCell>
                <TableCell>Trainer</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Max Participants</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainings.map((t, index) => (
                <TableRow key={t.plannerId}>
                  <TableCell>{t.plannerId}</TableCell>
                  <TableCell>{t.trainingName}</TableCell>
                  <TableCell>{t.site}</TableCell>
                  <TableCell>{t.trade}</TableCell>
                  <TableCell>{t.trainer}</TableCell>
                  <TableCell>{t.language}</TableCell>
                  <TableCell>{t.startDate}</TableCell>
                  <TableCell>{t.endDate}</TableCell>
                  <TableCell>{t.maxParticipants}</TableCell>
                  <TableCell>
                    <Chip
                      label={t.status}
                      color={
                        t.status === "Planned"
                          ? "info"
                          : t.status === "Ongoing"
                          ? "warning"
                          : "success"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(t.plannerId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {trainings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    No training plans scheduled yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ background: "#0E4C92", color: "white" }}>
          {editingIndex !== null ? "Edit Training Plan" : "New Training Plan"}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Planner ID"
                name="plannerId"
                value={formData.plannerId}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Training Name"
                name="trainingName"
                value={formData.trainingName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Site / Location"
                name="site"
                value={formData.site}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Trade"
                name="trade"
                value={formData.trade}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Trainer Name"
                name="trainer"
                value={formData.trainer}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                fullWidth
              >
                {languages.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Start Date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="End Date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Max Participants"
                name="maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
              >
                {statuses.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingIndex !== null ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TrainingPlanner;

