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
  Divider ,
  Stack,
  Chip,
  Autocomplete,
  TextField,
  Checkbox,
  Paper,
} from "@mui/material";
import { Add, Edit, Delete, Person } from "@mui/icons-material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// Dummy data
const ppeCatalog = [
  { id: "PPE-001", name: "Safety Helmet", renewal: 12, category: "Head Protection" },
  { id: "PPE-002", name: "Acid-Resistant Gloves", renewal: 6, category: "Hand Protection" },
  { id: "PPE-003", name: "Safety Shoes", renewal: 18, category: "Foot Protection" },
  { id: "PPE-004", name: "Face Shield", renewal: 12, category: "Face Protection" },
];

const employees = [
  { id: "EMP-001", name: "Rajesh Kumar", code: "RK01", department: "Welding" },
  { id: "EMP-002", name: "Priya Sharma", code: "PS02", department: "Electrical" },
  { id: "EMP-003", name: "Amit Patel", code: "AP03", department: "Mechanical" },
];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function ContractorAdminModule() {
  const [requests, setRequests] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    employee_name: "",
    employee_id: "",
    department: "",
    requested_items: [],
    approval_status: "Pending",
    request_date: "",
  });

  const handleOpenDialog = () => {
    setEditingIndex(null);
    setForm({
      employee_name: "",
      employee_id: "",
      department: "",
      requested_items: [],
      approval_status: "Pending",
      request_date: new Date().toISOString().split("T")[0],
    });
    setDialogOpen(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setForm(requests[index]);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.employee_name || form.requested_items.length === 0) {
      alert("Please select an employee and at least one PPE item");
      return;
    }

    const newRequest = {
      ...form,
      request_id: editingIndex !== null ? form.request_id : `REQ-${requests.length + 1}`,
      request_date: new Date().toISOString().split("T")[0],
      module: "contractor",
    };

    if (editingIndex !== null) {
      const updated = [...requests];
      updated[editingIndex] = newRequest;
      setRequests(updated);
    } else {
      setRequests([newRequest, ...requests]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      const updated = [...requests];
      updated.splice(index, 1);
      setRequests(updated);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "success";
      case "Issued": return "info";
      case "Denied": return "error";
      case "Pending": return "warning";
      default: return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card
        sx={{
          borderLeft: "6px solid #0A3A6E",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: 2,
        }}
      >
        <CardHeader
          title={
            <Typography variant="h5" sx={{ color: "#0A3A6E", fontWeight: 600 }}>
              <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
              Contractor Admin - PPE Requests
            </Typography>
          }
          subheader="Create and manage PPE issuance requests for your employees"
          action={
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleOpenDialog}
              sx={{
                backgroundColor: "#0A3A6E",
                color: "#fff",
                borderRadius: 2,
                px: 3,
                "&:hover": { backgroundColor: "#082A52" },
              }}
            >
              New Request
            </Button>
          }
        />

        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E3EAFD" }}>
                <TableCell>Request ID</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Requested Items</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Request Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((req, idx) => (
                <TableRow key={idx} sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {req.request_id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                        {req.employee_name}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                        {req.employee_id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{req.department}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {req.requested_items.map((id) => {
                        const item = ppeCatalog.find((p) => p.id === id);
                        return (
                          <Chip
                            key={id}
                            label={item?.name}
                            size="small"
                            sx={{ mb: 0.5 }}
                          />
                        );
                      })}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={req.approval_status} 
                      color={getStatusColor(req.approval_status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{req.request_date}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      {req.approval_status === "Pending" && (
                        <IconButton 
                          color="primary" 
                          onClick={() => handleEdit(idx)}
                          size="small"
                          title="Edit Request"
                        >
                          <Edit />
                        </IconButton>
                      )}
                      <IconButton 
                        color="error" 
                        onClick={() => handleDelete(idx)}
                        size="small"
                        title="Delete Request"
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {requests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No requests created yet. Click <b>New Request</b> to create one.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Request Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        fullWidth 
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            backgroundColor: '#0A3A6E',
            color: 'white',
            fontWeight: 600,
            py: 3
          }}
        >
          <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
          {editingIndex !== null ? "Edit PPE Request" : "New PPE Request"}
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Stack spacing={4}>
            {/* Employee Selection */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#0A3A6E' }}>
                Select Employee
              </Typography>
              <Autocomplete
                options={employees}
                getOptionLabel={(option) => `${option.name} (${option.code}) - ${option.department}`}
                value={employees.find(e => e.id === form.employee_id) || null}
                onChange={(event, newValue) => {
                  setForm(prev => ({
                    ...prev,
                    employee_id: newValue?.id || "",
                    employee_name: newValue?.name || "",
                    department: newValue?.department || ""
                  }));
                }}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    placeholder="Search employee by name or code"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: '#f8f9fa'
                      }
                    }}
                  />
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
            </Box>

            <Divider />

            {/* PPE Selection */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#0A3A6E' }}>
                Select PPE Items
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, backgroundColor: '#f8f9fa' }}>
                <Autocomplete
                  multiple
                  options={ppeCatalog}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  value={ppeCatalog.filter(item => form.requested_items.includes(item.id))}
                  onChange={(event, newValue) => {
                    setForm(prev => ({
                      ...prev,
                      requested_items: newValue.map(v => v.id),
                    }));
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0' }}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 12 }}
                        checked={selected}
                      />
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          {option.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.category} • Renewal: {option.renewal} months
                        </Typography>
                      </Box>
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose PPE items from the list"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'white'
                        }
                      }}
                    />
                  )}
                />
                
                {/* Selected Items Summary */}
                {form.requested_items.length > 0 && (
                  <Box sx={{ mt: 2, p: 2, backgroundColor: 'white', borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Selected Items ({form.requested_items.length})
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {form.requested_items.map((id) => {
                        const item = ppeCatalog.find((p) => p.id === id);
                        return (
                          <Chip
                            key={id}
                            label={item?.name}
                            size="small"
                            variant="outlined"
                            onDelete={() => {
                              setForm(prev => ({
                                ...prev,
                                requested_items: prev.requested_items.filter(itemId => itemId !== id)
                              }));
                            }}
                          />
                        );
                      })}
                    </Stack>
                  </Box>
                )}
              </Paper>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2, px: 4 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#0A3A6E",
              borderRadius: 2,
              px: 4,
              fontWeight: 600,
              "&:hover": { backgroundColor: "#082A52" },
            }}
          >
            {editingIndex !== null ? "Save Changes" : "Create Request"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}