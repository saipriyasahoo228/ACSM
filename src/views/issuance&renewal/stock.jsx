
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
  InputAdornment ,
  Tooltip,
  Grid,
} from "@mui/material";
import { Search,Add, Edit, Delete } from "@mui/icons-material";

// Define items under each type
const itemsByType = {
  PPE: ["Safety Helmet", "Acid-Resistant Gloves", "Safety Shoes", "Face Shield", "Eye Goggles", "Ear Plug"],
  "Safety Gear": ["Harness", "Safety Belt", "Respirator", "Gloves"],
  Tools: ["Hammer", "Drill", "Screwdriver", "Tool Kit"],
  Dress: ["Coverall", "Lab Coat", "Uniform"],
};

export default function StockEntry() {
  const [open, setOpen] = useState(false);
  const [stockList, setStockList] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    itemType: "",
    itemName: "",
    stockQuantity: "",
    minStockLevel: "",
    barcodeNumber: "",
    description: "",
  });

  const handleOpen = () => {
    setEditingIndex(null);
    setForm({
      itemType: "",
      itemName: "",
      stockQuantity: "",
      minStockLevel: "",
      barcodeNumber: "",
      description: "",
    });
    setOpen(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setForm(stockList[index]);
    setOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this stock entry?")) {
      const updated = [...stockList];
      updated.splice(index, 1);
      setStockList(updated);
    }
  };

  const handleSave = () => {
    if (!form.itemType || !form.itemName) {
      alert("Please select item type and item name");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...stockList];
      updated[editingIndex] = form;
      setStockList(updated);
    } else {
      setStockList([...stockList, form]);
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
              Stock Entry Management
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
              Add Stock
            </Button>
          }
        />

        <CardContent sx={{ backgroundColor: "white" }}>
          <TextField
                              placeholder="Search Here"
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
            Manage stock entries for PPE, Safety Gear, Tools, and Dress items.
          </Typography>

          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E3EAFD" }}>
                <TableCell>Item Type</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Stock Qty</TableCell>
                <TableCell>Min. Stock</TableCell>
                <TableCell>Barcode</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockList.map((stock, idx) => (
                <TableRow key={idx}>
                  <TableCell>{stock.itemType}</TableCell>
                  <TableCell>{stock.itemName}</TableCell>
                  <TableCell>{stock.stockQuantity}</TableCell>
                  <TableCell>{stock.minStockLevel}</TableCell>
                  <TableCell>{stock.barcodeNumber}</TableCell>
                  <TableCell>{stock.description}</TableCell>
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
              {stockList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    No stock entries yet. Click <b>Add Stock</b> to begin.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            backgroundColor: "#0A3A6E",
            color: "white",
            fontWeight: 600,
            py: 2,
          }}
        >
          {editingIndex !== null ? "Edit Stock Entry" : "Add Stock Entry"}
        </DialogTitle>

        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                select
                fullWidth
                label="Item Type"
                value={form.itemType}
                onChange={(e) => {
                  setForm({ ...form, itemType: e.target.value, itemName: "" });
                }}
              >
                {Object.keys(itemsByType).map((type, idx) => (
                  <MenuItem key={idx} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item>
              <TextField
                select
                fullWidth
                label="Item Name"
                value={form.itemName}
                onChange={(e) => setForm({ ...form, itemName: e.target.value })}
                disabled={!form.itemType}
              >
                {form.itemType &&
                  itemsByType[form.itemType].map((name, idx) => (
                    <MenuItem key={idx} value={name}>
                      {name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                type="number"
                label="Stock Quantity"
                value={form.stockQuantity}
                onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                type="number"
                label="Minimum Stock Level"
                value={form.minStockLevel}
                onChange={(e) => setForm({ ...form, minStockLevel: e.target.value })}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Barcode Number"
                value={form.barcodeNumber}
                onChange={(e) => setForm({ ...form, barcodeNumber: e.target.value })}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{ color: "#D32F2F", "&:hover": { backgroundColor: "rgba(211,47,47,0.05)" } }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ backgroundColor: "#0A3A6E", "&:hover": { backgroundColor: "#082A52" } }}
          >
            {editingIndex !== null ? "Save Changes" : "Add Stock"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
