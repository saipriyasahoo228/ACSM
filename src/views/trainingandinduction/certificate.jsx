
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
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";
import { Download, Delete, AddCircleOutline } from "@mui/icons-material";
import jsPDF from "jspdf";

const CertificateManagement = () => {
  const [open, setOpen] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    certificateId: "",
    workerName: "",
    trainingName: "",
    completionDate: "",
    expiryDate: "",
    status: "Valid",
  });

  const trainings = ["Safety Induction", "Electrical Safety", "Fire Drill"];
  const workers = ["Amit Kumar", "Ravi Singh", "S. Nair", "P. Das"];

  const handleOpen = () => {
    const nextId = `CERT-${String(certificates.length + 1).padStart(3, "0")}`;
    setFormData({ ...formData, certificateId: nextId });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setCertificates([...certificates, formData]);
    setOpen(false);
  };

  const handleDelete = (id) => {
    setCertificates(certificates.filter((cert) => cert.certificateId !== id));
  };

  const handleDownload = (cert) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Training Completion Certificate", 20, 20);
    doc.setFontSize(12);
    doc.text(`Certificate ID: ${cert.certificateId}`, 20, 40);
    doc.text(`Worker Name: ${cert.workerName}`, 20, 50);
    doc.text(`Training Name: ${cert.trainingName}`, 20, 60);
    doc.text(`Completion Date: ${cert.completionDate}`, 20, 70);
    doc.text(`Expiry Date: ${cert.expiryDate}`, 20, 80);
    doc.text(`Status: ${cert.status}`, 20, 90);
    doc.text("This certifies that the above worker has successfully completed the training.", 20, 110);
    doc.save(`${cert.certificateId}.pdf`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, color: "#0E4C92" }}>
        Certificate Management
      </Typography>

      <Button
        variant="outlined"
        startIcon={<AddCircleOutline />}
        onClick={handleOpen}
        sx={{ mb: 2 ,color: "#0E4C92" }}
      >
        Issue New Certificate
      </Button>

      {/* Certificate Table */}
      <Card
      sx={{
          borderLeft: "6px solid #082A52",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          borderRadius: 2,
        }} 
      >
        <CardContent>
          <Table>
            <TableHead sx={{ background: "#E3EAFD" }}>
              <TableRow>
                <TableCell>Certificate ID</TableCell>
                <TableCell>Worker Name</TableCell>
                <TableCell>Training Name</TableCell>
                <TableCell>Completion Date</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certificates.map((cert) => (
                <TableRow key={cert.certificateId}>
                  <TableCell>{cert.certificateId}</TableCell>
                  <TableCell>{cert.workerName}</TableCell>
                  <TableCell>{cert.trainingName}</TableCell>
                  <TableCell>{cert.completionDate}</TableCell>
                  <TableCell>{cert.expiryDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={cert.status}
                      color={cert.status === "Valid" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleDownload(cert)}>
                      <Download />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(cert.certificateId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {certificates.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No certificates issued yet.
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
          Issue Certificate
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Certificate ID"
                name="certificateId"
                value={formData.certificateId}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Worker Name"
                name="workerName"
                value={formData.workerName}
                onChange={handleChange}
                fullWidth
              >
                {workers.map((w) => (
                  <MenuItem key={w} value={w}>
                    {w}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Training Name"
                name="trainingName"
                value={formData.trainingName}
                onChange={handleChange}
                fullWidth
              >
                {trainings.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Completion Date"
                name="completionDate"
                value={formData.completionDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Expiry Date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
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
                <MenuItem value="Valid">Valid</MenuItem>
                <MenuItem value="Expired">Expired</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CertificateManagement;

