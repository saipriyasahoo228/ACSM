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
  Chip,
  Tooltip,
} from "@mui/material";
import {
  CalendarToday,
  Search,
  Edit,
  Delete,
  Close,
  AddCircle,
  Info,
} from "@mui/icons-material";

const KPITracking = () => {
  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    contractor: "",
    project: "",
    kpiName: "",
    target: "",
    actual: "",
    status: "",
    month: "",
  });

  const contractors = ["ABC Contractors", "XYZ Infra", "Safety First Ltd"];
  const projects = ["Site A", "Site B", "Site C"];
  const kpiList = [
    { name: "Training %", target: 95 },
    { name: "PPE Compliance %", target: 100 },
    { name: "PTW On-Time %", target: 90 },
    { name: "Open CAPs", target: 5 },
    { name: "TRIR", target: 1 },
  ];

  const calculateStatus = (target, actual) => {
    const t = parseFloat(target);
    const a = parseFloat(actual);

    if (isNaN(t) || isNaN(a)) return "";
    if (t === 0) return a === 0 ? "On Target" : "Critical";

    const percentage = (a / t) * 100;

    if (percentage >= 95) return "On Target";
    if (percentage >= 80) return "Needs Improvement";
    return "Critical";
  };

  const handleOpen = (record = null) => {
    if (record) {
      setFormData(record);
      setEditingId(record.id);
    } else {
      const nextId = `KPI-${(records.length + 1)
        .toString()
        .padStart(3, "0")}`;
      setFormData({
        id: nextId,
        contractor: "",
        project: "",
        kpiName: "",
        target: "",
        actual: "",
        status: "",
        month: "",
      });
      setEditingId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      id: "",
      contractor: "",
      project: "",
      kpiName: "",
      target: "",
      actual: "",
      status: "",
      month: "",
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    if (name === "target" || name === "actual") {
      updated.status = calculateStatus(updated.target, updated.actual);
    }
    setFormData(updated);
  };

  const handleSubmit = () => {
    if (
      !formData.contractor ||
      !formData.project ||
      !formData.kpiName ||
      !formData.actual ||
      !formData.month
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingId) {
      setRecords(records.map((r) => (r.id === editingId ? formData : r)));
    } else {
      setRecords([...records, formData]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setRecords(records.filter((r) => r.id !== id));
    }
  };

  const filteredRecords = records.filter(
    (r) =>
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.contractor.toLowerCase().includes(search.toLowerCase()) ||
      r.kpiName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Card
        sx={{
          borderLeft: "6px solid #0A3A6E",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <CardHeader
          title={
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#0A3A6E" }}
            >
              KPI Performance Tracking
            </Typography>
          }
          action={
            <Button
              variant="contained"
              sx={{ bgcolor: "#0A3A6E" }}
              startIcon={<AddCircle />}
              onClick={() => handleOpen()}
            >
               New KPI Record
            </Button>
          }
        />

        <CardContent>
          <TextField
            placeholder="Search by Contractor, KPI Name, or ID"
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

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Tooltip title="On Target = ≥95%, Needs Improvement = 80–94%, Critical = Below 80%">
              <Info sx={{ color: "#0A3A6E" }} />
            </Tooltip>
            <Typography variant="body2" color="text.secondary">
              Status Legend:{" "}
              <b style={{ color: "#2e7d32" }}>On Target</b> |{" "}
              <b style={{ color: "#ed6c02" }}>Needs Improvement</b> |{" "}
              <b style={{ color: "#d32f2f" }}>Critical</b>
            </Typography>
          </Stack>

          <Table>
            <TableHead sx={{ background: "#E3F2FD" }}>
              <TableRow>
                {[
                  "KPI ID",
                  "Contractor",
                  "Project / Area",
                  "KPI Name",
                  "Target",
                  "Actual",
                  "Status",
                  "Month",
                  "Actions",
                ].map((h) => (
                  <TableCell
                    key={h}
                    sx={{ fontWeight: "bold", color: "#0A3A6E" }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell>{rec.id}</TableCell>
                    <TableCell>{rec.contractor}</TableCell>
                    <TableCell>{rec.project}</TableCell>
                    <TableCell>{rec.kpiName}</TableCell>
                    <TableCell>{rec.target}</TableCell>
                    <TableCell>{rec.actual}</TableCell>
                    <TableCell>
                      <Chip
                        label={rec.status}
                        sx={{
                          color: "white",
                          backgroundColor:
                            rec.status === "On Target"
                              ? "#2e7d32"
                              : rec.status === "Needs Improvement"
                              ? "#ed6c02"
                              : "#d32f2f",
                        }}
                      />
                    </TableCell>
                    <TableCell>{rec.month}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpen(rec)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(rec.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No KPI records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            bgcolor: "#0A3A6E",
            color: "#fff",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {editingId ? "Update KPI Record" : "Add New KPI Record"}
          <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField label="KPI ID" value={formData.id} fullWidth disabled />

            <TextField
              select
              label="Contractor"
              name="contractor"
              value={formData.contractor}
              onChange={handleChange}
              fullWidth
            >
              {contractors.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Project / Area"
              name="project"
              value={formData.project}
              onChange={handleChange}
              fullWidth
            >
              {projects.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="KPI Name"
              name="kpiName"
              value={formData.kpiName}
              onChange={(e) => {
                const selected = kpiList.find(
                  (k) => k.name === e.target.value
                );
                setFormData({
                  ...formData,
                  kpiName: selected.name,
                  target: selected.target,
                  status: calculateStatus(selected.target, formData.actual),
                });
              }}
              fullWidth
            >
              {kpiList.map((k) => (
                <MenuItem key={k.name} value={k.name}>
                  {k.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Target"
              name="target"
              value={formData.target}
              onChange={handleChange}
              fullWidth
              disabled
            />

            <TextField
              label="Actual"
              name="actual"
              value={formData.actual}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Month / Period"
              name="month"
              type="month"
              value={formData.month}
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
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ bgcolor: "#0A3A6E" }}
          >
            {editingId ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default KPITracking;
