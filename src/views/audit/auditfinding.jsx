
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
  IconButton,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import {
  Search,
  Edit,
  Delete,
  Comment,
  Description,
  CalendarToday,
  Person,
  Download,
  Close,
} from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";


const findingTypes = ["Non-Conformity", "Observation", "Improvement"];
const statuses = ["Open", "Under Review", "Closed"];
const audits = [
  { auditId: "AUD-001", auditorName: "John Smith" },
  { auditId: "AUD-002", auditorName: "Priya Mehta" },
  { auditId: "AUD-003", auditorName: "David Lee" },
];

const AuditFindings = () => {
  const [open, setOpen] = useState(false);
  const [findings, setFindings] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [auditType, setAuditType] = useState("internal");

  const [formData, setFormData] = useState({
    findingId: "",
    auditId: "",
    auditorName: "",
    findingType: "",
    findingDescription: "",
    internalAuditorComments: "",
    externalAuditorComments: "",
    responsibleDept: "",
    targetDate: "",
    status: "Open",
  });

  const handleOpen = (finding = null) => {
    if (finding) {
      setFormData(finding);
      setEditingId(finding.findingId);
      setAuditType(finding.auditType || "internal");
    } else {
      const nextId = `FND-${(findings.length + 1).toString().padStart(3, "0")}`;
      setFormData({
        findingId: nextId,
        auditId: "",
        auditorName: "",
        findingType: "",
        findingDescription: "",
        internalAuditorComments: "",
        externalAuditorComments: "",
        responsibleDept: "",
        targetDate: "",
        status: "Open",
      });
      setAuditType("internal");
      setEditingId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "auditId") {
      const selectedAudit = audits.find((a) => a.auditId === value);
      if (selectedAudit) {
        setFormData((prev) => ({
          ...prev,
          auditorName: selectedAudit.auditorName,
        }));
      }
    }
  };

  const handleSubmit = () => {
    if (!formData.auditId || !formData.findingDescription || !formData.findingType) {
      alert("Please fill all required fields.");
      return;
    }

    const newFinding = { ...formData, auditType };

    if (editingId) {
      setFindings(findings.map((f) => (f.findingId === editingId ? newFinding : f)));
    } else {
      setFindings([...findings, newFinding]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this finding?")) {
      setFindings(findings.filter((f) => f.findingId !== id));
    }
  };

 const handleDownload = (finding) => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Audit Finding Details", 105, 15, { align: "center" });

  const tableData = [
    ["Finding ID", finding.findingId],
    ["Audit ID", finding.auditId],
    ["Audit Type", finding.auditType === "external" ? "External" : "Internal"],
    ["Auditor Name", finding.auditorName],
    ["Finding Type", finding.findingType],
    ["Finding Description", finding.findingDescription],
    [
      "Comments",
      finding.auditType === "internal"
        ? finding.internalAuditorComments
        : finding.externalAuditorComments,
    ],
    ["Responsible Dept", finding.responsibleDept],
    ["Target Date", finding.targetDate],
    ["Status", finding.status],
  ];

  doc.autoTable({
    startY: 25,
    head: [["Field", "Value"]],
    body: tableData,
    theme: "grid",
    styles: { cellPadding: 2, fontSize: 11 },
    headStyles: { fillColor: [10, 58, 110], textColor: 255, fontStyle: "bold" },
  });

  doc.save(`${finding.findingId}.pdf`);
};

const handleDownloadAll = () => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("All Audit Findings", 105, 15, { align: "center" });

  const tableData = findings.map((f) => [
    f.findingId,
    f.auditId,
    f.auditType === "external" ? "External" : "Internal",
    f.auditorName,
    f.findingType,
    f.findingDescription,
    f.auditType === "internal" ? f.internalAuditorComments : f.externalAuditorComments,
    f.responsibleDept,
    f.targetDate,
    f.status,
  ]);

  doc.autoTable({
    startY: 25,
    head: [
      [
        "Finding ID",
        "Audit ID",
        "Audit Type",
        "Auditor",
        "Type",
        "Description",
        "Comments",
        "Dept",
        "Target Date",
        "Status",
      ],
    ],
    body: tableData,
    theme: "grid",
    styles: { cellPadding: 2, fontSize: 10 },
    headStyles: { fillColor: [10, 58, 110], textColor: 255, fontStyle: "bold" },
  });

  doc.save("all_audit_findings.pdf");
};
  const filteredFindings = findings.filter(
    (f) =>
      f.findingId.toLowerCase().includes(search.toLowerCase()) ||
      f.auditId.toLowerCase().includes(search.toLowerCase()) ||
      f.findingType.toLowerCase().includes(search.toLowerCase())
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
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0A3A6E" }}>
              Audit Findings & Comments
            </Typography>
          }
          action={
            <Stack direction="row" spacing={1}>
              <Button variant="contained" sx={{ bgcolor: "#0A3A6E" }} onClick={() => handleOpen()}>
                + Add Finding
              </Button>
              <Button
                variant="outlined"
                sx={{ color: "#0A3A6E", borderColor: "#0A3A6E" }}
                startIcon={<Download />}
                onClick={handleDownloadAll}
              >
                Download All
              </Button>
            </Stack>
          }
        />

        <CardContent>
          <TextField
            placeholder="Search by Finding ID, Audit ID, or Type"
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
                  "Finding ID",
                  "Audit ID",
                  "Audit Type",
                  "Auditor Name",
                  "Type",
                  "Description",
                  "Comments",
                  "Responsible Dept",
                  "Target Date",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <TableCell key={head} sx={{ fontWeight: "bold", color: "#0A3A6E" }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFindings.length > 0 ? (
                filteredFindings.map((f) => (
                  <TableRow key={f.findingId}>
                    <TableCell>{f.findingId}</TableCell>
                    <TableCell>{f.auditId}</TableCell>
                    <TableCell>{f.auditType === "external" ? "External" : "Internal"}</TableCell>
                    <TableCell>{f.auditorName}</TableCell>
                    <TableCell>{f.findingType}</TableCell>
                    <TableCell>{f.findingDescription}</TableCell>
                    <TableCell>
                      {f.auditType === "internal"
                        ? f.internalAuditorComments
                        : f.externalAuditorComments}
                    </TableCell>
                    <TableCell>{f.responsibleDept}</TableCell>
                    <TableCell>{f.targetDate}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color:
                            f.status === "Closed"
                              ? "#2E7D32"
                              : f.status === "Under Review"
                              ? "#F9A825"
                              : "#1E88E5",
                          fontWeight: "bold",
                        }}
                      >
                        {f.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton size="small" color="primary" onClick={() => handleOpen(f)}>
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(f.findingId)}>
                          <Delete />
                        </IconButton>
                        <IconButton size="small" color="secondary" onClick={() => handleDownload(f)}>
                          <Download />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    No audit findings recorded yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle
          sx={{
            bgcolor: "#0A3A6E",
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
             display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
          }}
        >
          {editingId ? "Update Audit Finding" : "Add New Audit Finding"}
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
            {/* All your fields preserved */}
            <TextField
              label="Finding ID"
              name="findingId"
              value={formData.findingId}
              fullWidth
              disabled
            />
            <TextField
              select
              label="Audit ID (From Audit Planning)"
              name="auditId"
              value={formData.auditId}
              onChange={handleChange}
              fullWidth
            >
              {audits.map((a) => (
                <MenuItem key={a.auditId} value={a.auditId}>
                  {a.auditId}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Auditor Name"
              name="auditorName"
              value={formData.auditorName}
              onChange={handleChange}
              select
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            >
              {audits.map((a) => (
                <MenuItem key={a.auditorName} value={a.auditorName}>
                  {a.auditorName}
                </MenuItem>
              ))}
            </TextField>
            <FormLabel>Audit Type</FormLabel>
            <RadioGroup
              row
              value={auditType}
              onChange={(e) => setAuditType(e.target.value)}
            >
              <FormControlLabel value="internal" control={<Radio />} label="Internal Audit" />
              <FormControlLabel value="external" control={<Radio />} label="External Audit" />
            </RadioGroup>
            <TextField
              select
              label="Finding Type"
              name="findingType"
              value={formData.findingType}
              onChange={handleChange}
              fullWidth
            >
              {findingTypes.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Finding Description"
              name="findingDescription"
              value={formData.findingDescription}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description />
                  </InputAdornment>
                ),
              }}
            />
            {auditType === "internal" ? (
              <TextField
                label="Internal Auditor Comments"
                name="internalAuditorComments"
                value={formData.internalAuditorComments}
                onChange={handleChange}
                multiline
                rows={2}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Comment />
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <TextField
                label="External Auditor Comments"
                name="externalAuditorComments"
                value={formData.externalAuditorComments}
                onChange={handleChange}
                multiline
                rows={2}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Comment />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            <TextField
              label="Responsible Department"
              name="responsibleDept"
              value={formData.responsibleDept}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Target Date"
              name="targetDate"
              type="date"
              value={formData.targetDate}
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
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: "#0A3A6E" }}>
            {editingId ? "Update Finding" : "Save Finding"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuditFindings;
