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
  
} from "@mui/material";
import {
  CalendarToday,
  LocationOn,
  Search,
  Edit,
  Delete,
  People,
  Close,
  AddCircle
} from "@mui/icons-material";

const auditTypes = ["Internal Audit", "Statutory Audit"];
const frequencies = ["Weekly", "Monthly", "Quarterly", "Yearly"];
const departments = ["EHS", "Maintenance", "Operations", "HR", "Procurement"];

const AuditPlanning = () => {
  const [open, setOpen] = useState(false);
  const [audits, setAudits] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    auditId: "",
    auditType: "",
    frequency: "",
    department: "",
    auditorName: "",
    scheduleDate: "",
    location: "",
    status: "Planned",
  });

  const handleOpen = (audit = null) => {
    if (audit) {
      setFormData(audit);
      setEditingId(audit.auditId);
    } else {
      const nextId = `AUD-${(audits.length + 1).toString().padStart(3, "0")}`;
      setFormData({
        auditId: nextId,
        auditType: "",
        frequency: "",
        department: "",
        auditorName: "",
        scheduleDate: "",
        location: "",
        status: "Planned",
      });
      setEditingId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({
      auditId: "",
      auditType: "",
      frequency: "",
      department: "",
      auditorName: "",
      scheduleDate: "",
      location: "",
      status: "Planned",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.auditType || !formData.scheduleDate || !formData.auditorName) {
      alert("Please fill all required fields.");
      return;
    }
    if (editingId) {
      setAudits(audits.map((a) => (a.auditId === editingId ? formData : a)));
    } else {
      setAudits([...audits, formData]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this audit?")) {
      setAudits(audits.filter((a) => a.auditId !== id));
    }
  };

  const filteredAudits = audits.filter(
    (a) =>
      a.auditId.toLowerCase().includes(search.toLowerCase()) ||
      a.auditType.toLowerCase().includes(search.toLowerCase()) ||
      a.department.toLowerCase().includes(search.toLowerCase())
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
              Audit Planning & Scheduling
            </Typography>
          }
          action={
            <Button
              variant="contained"
              startIcon={<AddCircle />}
              sx={{ bgcolor: "#0A3A6E" }}
              onClick={() => handleOpen()}
            >
              Schedule Audit
            </Button>
          }
        />

        <CardContent>
          <TextField
            placeholder="Search by Audit ID, Type, or Department"
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
                {[
                  "Audit ID",
                  "Type",
                  "Frequency",
                  "Department",
                  "Auditor",
                  "Date",
                  "Location",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{ fontWeight: "bold", color: "#0A3A6E" }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAudits.length > 0 ? (
                filteredAudits.map((a) => (
                  <TableRow key={a.auditId}>
                    <TableCell>{a.auditId}</TableCell>
                    <TableCell>{a.auditType}</TableCell>
                    <TableCell>{a.frequency}</TableCell>
                    <TableCell>{a.department}</TableCell>
                    <TableCell>{a.auditorName}</TableCell>
                    <TableCell>{a.scheduleDate}</TableCell>
                    <TableCell>{a.location}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color:
                            a.status === "Planned"
                              ? "#1E88E5"
                              : a.status === "Completed"
                              ? "#2E7D32"
                              : "#F9A825",
                          fontWeight: "bold",
                        }}
                      >
                        {a.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpen(a)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(a.auditId)}
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
                    No audits scheduled yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
           bgcolor: "#0A3A6E", 
        color: "#fff", 
        fontWeight: "bold" ,
         display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
          }}
        >
          {editingId ? "Update Audit Schedule" : "Schedule New Audit"}
           <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            mt: 2,
            borderRadius: "8px",
          }}
        >
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Audit ID"
              name="auditId"
              value={formData.auditId}
              fullWidth
              disabled
            />

            <TextField
              select
              label="Audit Type"
              name="auditType"
              value={formData.auditType}
              onChange={handleChange}
              fullWidth
            >
              {auditTypes.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              fullWidth
            >
              {frequencies.map((f) => (
                <MenuItem key={f} value={f}>
                  {f}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              fullWidth
            >
              {departments.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Auditor Name"
              name="auditorName"
              value={formData.auditorName}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <People />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Schedule Date"
              name="scheduleDate"
              type="date"
              value={formData.scheduleDate}
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ bgcolor: "#0A3A6E" }}
          >
            {editingId ? "Update Audit" : "Save Audit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuditPlanning;
