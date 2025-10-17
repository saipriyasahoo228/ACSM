import React, { useState, useEffect } from "react";
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
  MenuItem,
  Stack,
  Tooltip,
  Chip,
  Autocomplete,
  
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

// Dummy catalogs
const itemCatalog = [
  { id: "PPE-001", name: "Safety Helmet", type: "PPE", category: "Head Protection", renewal: 12 },
  { id: "PPE-002", name: "Acid-Resistant Gloves", type: "PPE", category: "Hand Protection", renewal: 6 },
  { id: "TOOL-001", name: "Tool Kit", type: "Tool", category: "Hand Tools", renewal: 24 },
  { id: "TOOL-002", name: "Multimeter", type: "Tool", category: "Electrical Tools", renewal: 18 },
];

const employees = [
  { id: "EMP-001", name: "Rajesh Kumar", department: "Welding" },
  { id: "EMP-002", name: "Priya Sharma", department: "Electrical" },
  { id: "EMP-003", name: "Amit Patel", department: "Mechanical" },
];

export default function RenewalsManagement() {
  const [renewals, setRenewals] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    renewalId: "",
    employeeId: "",
    employeeName: "",
    itemType: "",
    itemId: "",
    itemName: "",
    issueDate: "",
    expiryDate: "",
    condition: "",
    renewalStatus: "",
    renewedOn: "",
    approvedBy: "",
    remarks: "",
  });

  // Auto-generate Renewal ID
  useEffect(() => {
    if (!editingIndex) {
      const nextId = `REN-${String(renewals.length + 1).padStart(3, "0")}`;
      setForm((prev) => ({ ...prev, renewalId: nextId }));
    }
  }, [renewals, editingIndex]);

  const handleOpen = () => {
    setEditingIndex(null);
    setForm({
      renewalId: `REN-${String(renewals.length + 1).padStart(3, "0")}`,
      employeeId: "",
      employeeName: "",
      itemType: "",
      itemId: "",
      itemName: "",
      issueDate: "",
      expiryDate: "",
      condition: "",
      renewalStatus: "",
      renewedOn: "",
      approvedBy: "",
      remarks: "",
    });
    setOpen(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setForm(renewals[index]);
    setOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this renewal record?")) {
      const updated = [...renewals];
      updated.splice(index, 1);
      setRenewals(updated);
    }
  };

  const handleSave = () => {
    if (!form.employeeName || !form.itemName) {
      alert("Please fill all required fields");
      return;
    }
    const newRecord = { ...form };
    if (editingIndex !== null) {
      const updated = [...renewals];
      updated[editingIndex] = newRecord;
      setRenewals(updated);
    } else {
      setRenewals([...renewals, newRecord]);
    }
    setOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Renewed": return "success";
      case "Pending": return "warning";
      case "Overdue": return "error";
      default: return "default";
    }
  };

  // Filter items by type
  const filteredItems = form.itemType
    ? itemCatalog.filter((item) => item.type === form.itemType)
    : [];

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ borderLeft: "6px solid #0A3A6E", boxShadow: "0 6px 18px rgba(0,0,0,0.1)", borderRadius: 2 }}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ color: "#0A3A6E", fontWeight: 600 }}>
              PPE & Tool Renewals Management
            </Typography>
          }
          action={
            <Button variant="contained" startIcon={<Add />} onClick={handleOpen}
              sx={{ backgroundColor: "#0A3A6E", "&:hover": { backgroundColor: "#082A52" } }}>
              Add Renewal
            </Button>
          }
        />

        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E3EAFD" }}>
                <TableCell>Renewal ID</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Item Type</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Condition</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Approved By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renewals.map((r, idx) => (
                <TableRow key={idx}>
                  <TableCell>{r.renewalId}</TableCell>
                  <TableCell>{r.employeeName}</TableCell>
                  <TableCell>{r.itemType}</TableCell>
                  <TableCell>{r.itemName}</TableCell>
                  <TableCell>{r.issueDate}</TableCell>
                  <TableCell>{r.expiryDate}</TableCell>
                  <TableCell>{r.condition}</TableCell>
                  <TableCell>
                    <Chip label={r.renewalStatus || "N/A"} color={getStatusColor(r.renewalStatus)} size="small" />
                  </TableCell>
                  <TableCell>{r.approvedBy}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleEdit(idx)}><Edit /></IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(idx)}><Delete /></IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {renewals.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} align="center">No renewal records yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: "#0A3A6E", color: "white", py: 2 }}>
          {editingIndex !== null ? "Edit Renewal Record" : "Add New Renewal Record"}
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Stack spacing={2} sx={{mt:2}}>
            <TextField fullWidth label="Renewal ID" value={form.renewalId} disabled />
            
            {/* Employee Selection */}
            <Autocomplete
              options={employees}
              getOptionLabel={(e) => `${e.name} (${e.department})`}
              value={employees.find(emp => emp.id === form.employeeId) || null}
              onChange={(e, newVal) => {
                setForm(prev => ({
                  ...prev,
                  employeeId: newVal?.id || "",
                  employeeName: newVal?.name || ""
                }));
              }}
              renderInput={(params) => <TextField {...params} label="Employee" fullWidth />}
            />

            {/* Item Type */}
            <TextField
              select fullWidth label="Item Type" value={form.itemType}
              onChange={(e) => setForm({...form, itemType: e.target.value, itemId: "", itemName: ""})}>
              <MenuItem value="PPE">PPE</MenuItem>
              <MenuItem value="Tool">Tool</MenuItem>
              <MenuItem value="Safety Gear">Safety Gear</MenuItem>
              <MenuItem value="Dress">Dress</MenuItem>
            </TextField>

            {/* Item Name filtered by type */}
            <Autocomplete
              options={filteredItems}
              getOptionLabel={(item) => item.name}
              value={filteredItems.find(item => item.id === form.itemId) || null}
              onChange={(e, newVal) => {
                setForm(prev => ({
                  ...prev,
                  itemId: newVal?.id || "",
                  itemName: newVal?.name || ""
                }));
              }}
              renderInput={(params) => <TextField {...params} label="Item Name" fullWidth />}
            />

            <TextField type="date" fullWidth label="Issue Date" InputLabelProps={{ shrink: true }}
              value={form.issueDate} onChange={(e) => setForm({...form, issueDate: e.target.value})} />
            <TextField type="date" fullWidth label="Expiry Date" InputLabelProps={{ shrink: true }}
              value={form.expiryDate} onChange={(e) => setForm({...form, expiryDate: e.target.value})} />

            <TextField select fullWidth label="Condition Before Renewal" value={form.condition}
              onChange={(e) => setForm({...form, condition: e.target.value})}>
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Expired">Expired</MenuItem>
            </TextField>

            <TextField select fullWidth label="Renewal Status" value={form.renewalStatus}
              onChange={(e) => setForm({...form, renewalStatus: e.target.value})}>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Renewed">Renewed</MenuItem>
              <MenuItem value="Overdue">Overdue</MenuItem>
            </TextField>

            <TextField type="date" fullWidth label="Renewed On" InputLabelProps={{ shrink: true }}
              value={form.renewedOn} onChange={(e) => setForm({...form, renewedOn: e.target.value})} />
            <TextField fullWidth label="Approved By" value={form.approvedBy}
              onChange={(e) => setForm({...form, approvedBy: e.target.value})} />
            <TextField fullWidth label="Remarks" multiline rows={3} value={form.remarks}
              onChange={(e) => setForm({...form, remarks: e.target.value})} />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)} color="error">Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: "#0A3A6E", "&:hover": { backgroundColor: "#082A52" }}}>
            {editingIndex !== null ? "Save Changes" : "Add Renewal"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
