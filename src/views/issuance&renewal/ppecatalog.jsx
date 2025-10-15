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
  Tooltip,
  Grid,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const categories = [
  "Safety Helmet",
  "Acid-Resistant Gloves",
  "Safety Shoes",
  "Face Shield",
  "Eye Goggles",
  "Tool Kit",
  "Ear Plug",
];

export default function PPECatalogManagement() {
  const [open, setOpen] = useState(false);
  const [ppeList, setPpeList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    item_name: "",
    category: "",
    renewal_period_months: "",
    stock_quantity: "",
    min_stock_level: "",
    barcode_number: "",
    description: "",
  });

  const handleOpen = () => {
    setEditingIndex(null);
    setForm({
      item_name: "",
      category: "",
      renewal_period_months: "",
      stock_quantity: "",
      min_stock_level: "",
      barcode_number: "",
      description: "",
    });
    setOpen(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setForm(ppeList[index]);
    setOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this PPE item?")) {
      const updated = [...ppeList];
      updated.splice(index, 1);
      setPpeList(updated);
    }
  };

  const handleSave = () => {
    if (!form.item_name || !form.category) {
      alert("Please fill all required fields");
      return;
    }
    if (editingIndex !== null) {
      const updated = [...ppeList];
      updated[editingIndex] = form;
      setPpeList(updated);
    } else {
      setPpeList([
        ...ppeList,
        { ...form, ppe_id: `PPE-${ppeList.length + 1}` },
      ]);
    }
    setOpen(false);
  };

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
              PPE Catalog Management
            </Typography>
          }
          action={
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleOpen}
              sx={{
                backgroundColor: "#0A3A6E",
                color: "#fff",
                "&:hover": { backgroundColor: "#082A52" },
              }}
            >
              Add New PPE
            </Button>
          }
        />

        <CardContent>
          <Typography variant="body2" sx={{ mb: 2, color: "#334155" }}>
            Manage all Personal Protective Equipment (PPE) types, define renewal
            periods, and track their stock availability.
          </Typography>

          {/* Table */}
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E3EAFD" }}>
                <TableCell>PPE ID</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Renewal (Months)</TableCell>
                <TableCell>Stock Qty</TableCell>
                <TableCell>Min. Stock</TableCell>
                <TableCell>Barcode</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ppeList.map((ppe, idx) => (
                <TableRow key={idx}>
                  <TableCell>{ppe.ppe_id}</TableCell>
                  <TableCell>{ppe.item_name}</TableCell>
                  <TableCell>{ppe.category}</TableCell>
                  <TableCell>{ppe.renewal_period_months}</TableCell>
                  <TableCell>{ppe.stock_quantity}</TableCell>
                  <TableCell>{ppe.min_stock_level}</TableCell>
                  <TableCell>{ppe.barcode_number}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleEdit(idx)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(idx)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {ppeList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    No PPE items available. Click <b>Add New PPE</b> to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ color: "#0A3A6E", fontWeight: 600 }}>
          {editingIndex !== null ? "Edit PPE Item" : "Add New PPE Item"}
        </DialogTitle>

        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Item Name"
                name="item_name"
                value={form.item_name}
                onChange={(e) =>
                  setForm({ ...form, item_name: e.target.value })
                }
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                sx={{
                  "& .MuiInputLabel-root": { fontSize: "1rem" },
                  "& .MuiSelect-select": { minHeight: "45px" },
                }}
              >
                {categories.map((cat, idx) => (
                  <MenuItem key={idx} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Renewal Period (Months)"
                name="renewal_period_months"
                type="number"
                value={form.renewal_period_months}
                onChange={(e) =>
                  setForm({ ...form, renewal_period_months: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stock_quantity"
                type="number"
                value={form.stock_quantity}
                onChange={(e) =>
                  setForm({ ...form, stock_quantity: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Minimum Stock Level"
                name="min_stock_level"
                type="number"
                value={form.min_stock_level}
                onChange={(e) =>
                  setForm({ ...form, min_stock_level: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Barcode Number"
                name="barcode_number"
                value={form.barcode_number}
                onChange={(e) =>
                  setForm({ ...form, barcode_number: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={2}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              color: "#D32F2F",
              "&:hover": { backgroundColor: "rgba(211,47,47,0.05)" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#0A3A6E",
              "&:hover": { backgroundColor: "#082A52" },
            }}
          >
            {editingIndex !== null ? "Save Changes" : "Add PPE"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
