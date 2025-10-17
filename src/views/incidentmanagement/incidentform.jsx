import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { AttachFile, CalendarToday, LocationOn, Search, Edit, Delete } from "@mui/icons-material";

const categories = [
  "Near-Miss",
  "First-Aid",
  "Lost Time Injury (LTI)",
  "Dangerous Occurrence",
];

const IncidentReporting = () => {
  const [open, setOpen] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    attachments: null,
  });

  const handleOpen = (incident = null) => {
    if (incident) {
      setFormData(incident);
      setEditingId(incident.id);
    } else {
      const nextId = `INC-${(incidents.length + 1).toString().padStart(3, "0")}`;
      setFormData({ ...formData, id: nextId });
      setEditingId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      id: "",
      category: "",
      date: "",
      time: "",
      location: "",
      description: "",
      attachments: null,
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachments: e.target.files });
  };

  const handleSubmit = () => {
    if (!formData.category || !formData.date || !formData.time || !formData.location) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingId) {
      // Update existing incident
      setIncidents(
        incidents.map((inc) => (inc.id === editingId ? formData : inc))
      );
    } else {
      // Add new incident
      setIncidents([...incidents, formData]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this incident?")) {
      setIncidents(incidents.filter((inc) => inc.id !== id));
    }
  };

  const filteredIncidents = incidents.filter(
    (inc) =>
      inc.id.toLowerCase().includes(search.toLowerCase()) ||
      inc.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ borderLeft: "6px solid #0A3A6E", borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0A3A6E" }}>
              Incident Reporting & Management
            </Typography>
          }
          action={
            <Button variant="contained" sx={{ bgcolor: "#0A3A6E" }} onClick={() => handleOpen()}>
              + Report Incident
            </Button>
          }
        />
        <CardContent>
          <TextField
            placeholder="Search by Incident ID or Category"
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
            <TableHead sx={{ background: "#E3F2FD" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Incident ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Time</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Location</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#0A3A6E" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIncidents.length > 0 ? (
                filteredIncidents.map((inc) => (
                  <TableRow key={inc.id}>
                    <TableCell>{inc.id}</TableCell>
                    <TableCell>{inc.category}</TableCell>
                    <TableCell>{inc.date}</TableCell>
                    <TableCell>{inc.time}</TableCell>
                    <TableCell>{inc.location}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpen(inc)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(inc.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No incidents reported.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: "#0A3A6E", color: "#fff", fontWeight: "bold" }}>
          {editingId ? "Update Incident" : "Report New Incident"}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Incident ID" name="id" value={formData.id} fullWidth disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AttachFile />}
              >
                Upload Attachments
                <input type="file" hidden multiple onChange={handleFileChange} />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: "#0A3A6E" }}>
            {editingId ? "Update Incident" : "Submit Incident"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IncidentReporting;
