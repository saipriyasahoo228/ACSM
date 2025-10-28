
import React, { useState } from "react";
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
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { Search, AddCircle, Edit, Delete, Close } from "@mui/icons-material";

export default function KPILibrary() {
  const [open, setOpen] = useState(false);
  const [kpiList, setKpiList] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    kpiName: "",
    category: "",
    unit: "",
    target: "",
    greenThreshold: "",
    amberThreshold: "",
    redThreshold: "",
    frequency: "",
    responsiblePerson: "",
    dataSource: "",
    description: "",
  });

  const categories = ["Safety", "Health", "Environment", "Compliance"];
  const units = ["%", "Count", "Ratio"];
  const frequencies = ["Daily", "Weekly", "Monthly", "Quarterly"];

  const handleOpen = () => {
    setEditingIndex(null);
    setForm({
      kpiName: "",
      category: "",
      unit: "",
      target: "",
      greenThreshold: "",
      amberThreshold: "",
      redThreshold: "",
      frequency: "",
      responsiblePerson: "",
      dataSource: "",
      description: "",
    });
    setOpen(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setForm(kpiList[index]);
    setOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this KPI?")) {
      const updated = [...kpiList];
      updated.splice(index, 1);
      setKpiList(updated);
    }
  };

  const handleSave = () => {
    if (!form.kpiName || !form.category) {
      alert("Please enter KPI Name and Category");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...kpiList];
      updated[editingIndex] = form;
      setKpiList(updated);
    } else {
      setKpiList([...kpiList, form]);
    }
    setOpen(false);
  };

  const filteredList = kpiList.filter((kpi) =>
    kpi.kpiName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Card
        sx={{
          borderLeft: "6px solid #0A3A6E",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          borderRadius: 2,
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" sx={{ color: "#0A3A6E", fontWeight: 600 }}>
              KPI Library Management
            </Typography>
          }
          action={
            <Button
              variant="contained"
              startIcon={<AddCircle />}
              onClick={handleOpen}
              sx={{
                backgroundColor: "#0A3A6E",
                color: "#fff",
                "&:hover": { backgroundColor: "#082A52" },
              }}
            >
              Add KPI
            </Button>
          }
        />

        <CardContent>
          <TextField
            placeholder="Search KPI..."
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

          <Typography variant="body2" sx={{ mb: 2, color: "#334155" }}>
            Define and manage KPIs such as Training %, PPE Compliance, TRIR, etc.
          </Typography>

          <Table>
            <TableHead sx={{ backgroundColor: "#E3EAFD" }}>
              <TableRow>
                <TableCell>KPI Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Target</TableCell>
                <TableCell>Green</TableCell>
                <TableCell>Amber</TableCell>
                <TableCell>Red</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Responsible</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredList.map((kpi, idx) => (
                <TableRow key={idx}>
                  <TableCell>{kpi.kpiName}</TableCell>
                  <TableCell>{kpi.category}</TableCell>
                  <TableCell>{kpi.target}</TableCell>
                  <TableCell>{kpi.greenThreshold}</TableCell>
                  <TableCell>{kpi.amberThreshold}</TableCell>
                  <TableCell>{kpi.redThreshold}</TableCell>
                  <TableCell>{kpi.frequency}</TableCell>
                  <TableCell>{kpi.responsiblePerson}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(idx)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(idx)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {filteredList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                    No KPIs added yet. Click <b>Add KPI</b> to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog Form - Vertical layout */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            backgroundColor: "#0A3A6E",
            color: "#fff",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {editingIndex !== null ? "Edit KPI" : "Add New KPI"}
          <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <TextField
              label="KPI Name"
              value={form.kpiName}
              onChange={(e) => setForm({ ...form, kpiName: e.target.value })}
              fullWidth
            />

            <TextField
              select
              label="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              fullWidth
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Unit"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              fullWidth
            >
              {units.map((u) => (
                <MenuItem key={u} value={u}>
                  {u}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Target Value"
              type="number"
              value={form.target}
              onChange={(e) => setForm({ ...form, target: e.target.value })}
              fullWidth
            />

            <TextField
              select
              label="Frequency"
              value={form.frequency}
              onChange={(e) =>
                setForm({ ...form, frequency: e.target.value })
              }
              fullWidth
            >
              {frequencies.map((f) => (
                <MenuItem key={f} value={f}>
                  {f}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Green Threshold"
              type="number"
              value={form.greenThreshold}
              onChange={(e) =>
                setForm({ ...form, greenThreshold: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Amber Threshold"
              type="number"
              value={form.amberThreshold}
              onChange={(e) =>
                setForm({ ...form, amberThreshold: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Red Threshold"
              type="number"
              value={form.redThreshold}
              onChange={(e) =>
                setForm({ ...form, redThreshold: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Responsible Person"
              value={form.responsiblePerson}
              onChange={(e) =>
                setForm({ ...form, responsiblePerson: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Data Source"
              value={form.dataSource}
              onChange={(e) =>
                setForm({ ...form, dataSource: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Description"
              multiline
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ bgcolor: "#0A3A6E" }}
          >
            {editingIndex !== null ? "Save Changes" : "Add KPI"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
