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
  Collapse,
  IconButton,
  Stack,
  Button,
  Chip,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  FileDownload,
  Assessment,
  FactCheck,
  Verified,
} from "@mui/icons-material";
import * as XLSX from "xlsx";

const sampleAudits = [
  {
    id: "IA-001",
    type: "Internal",
    site: "Plant A",
    auditor: "Ravi Kumar",
    date: "2025-09-15",
    nonCompliances: 2,
    capasCompleted: 1,
    totalCapas: 3,
    capas: [
      { id: "C-001", description: "Replace safety signages", status: "Completed", owner: "Ajay" },
      { id: "C-002", description: "Check wiring connections", status: "Pending", owner: "Rahul" },
      { id: "C-003", description: "Update PPE checklist", status: "Pending", owner: "Kiran" },
    ],
  },
  {
    id: "EA-001",
    type: "External",
    site: "Plant B",
    auditor: "DNV Agency",
    date: "2025-10-02",
    nonCompliances: 1,
    capasCompleted: 1,
    totalCapas: 1,
    capas: [
      { id: "C-004", description: "Replace fire extinguisher", status: "Completed", owner: "Sita" },
    ],
  },
  {
    id: "IA-002",
    type: "Internal",
    site: "Plant B",
    auditor: "Manoj Sahu",
    date: "2025-09-20",
    nonCompliances: 0,
    capasCompleted: 0,
    totalCapas: 0,
    capas: [],
  },
];

const AuditDashboard = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Export single audit row to Excel
  const exportSingleAudit = (audit) => {
    const rows = audit.capas.map((c) => ({
      AuditID: audit.id,
      Type: audit.type,
      Site: audit.site,
      Auditor: audit.auditor,
      AuditDate: audit.date,
      CAPA_ID: c.id,
      Description: c.description,
      Status: c.status,
      Owner: c.owner,
    }));
    const ws = XLSX.utils.json_to_sheet(rows.length ? rows : [audit]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Audit");
    XLSX.writeFile(wb, `${audit.id}_report.xlsx`);
  };

  // Export all audits
  const exportAllAudits = () => {
    const rows = [];
    sampleAudits.forEach((a) => {
      if (a.capas.length > 0) {
        a.capas.forEach((c) => {
          rows.push({
            AuditID: a.id,
            Type: a.type,
            Site: a.site,
            Auditor: a.auditor,
            AuditDate: a.date,
            CAPA_ID: c.id,
            Description: c.description,
            Status: c.status,
            Owner: c.owner,
          });
        });
      } else {
        rows.push({
          AuditID: a.id,
          Type: a.type,
          Site: a.site,
          Auditor: a.auditor,
          AuditDate: a.date,
          CAPA_ID: "",
          Description: "",
          Status: "",
          Owner: "",
        });
      }
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "All_Audits");
    XLSX.writeFile(wb, "All_Audit_Report.xlsx");
  };

  const totalInternal = sampleAudits.filter((a) => a.type === "Internal").length;
  const totalExternal = sampleAudits.filter((a) => a.type === "External").length;
  const totalCAPAs = sampleAudits.reduce((s, a) => s + a.totalCapas, 0);
  const completedCAPAs = sampleAudits.reduce(
    (s, a) => s + a.capas.filter((c) => c.status === "Completed").length,
    0
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #9891f8ff, #36368dff)",
          color: "#fff",
          borderRadius: 2,
          p: 2,
          mb: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Audit Master Dashboard
        </Typography>
        <Typography variant="body2">
          Overview of internal and external audits with CAPA performance
        </Typography>
      </Box>

      {/* KPI Summary Cards */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <Card sx={{ flex: 1, p: 2, textAlign: "center" ,background: "linear-gradient(45deg, #e3f2fd, #bbdefb)" }}>
          <Assessment fontSize="large" color="primary" />
          <Typography variant="subtitle2">Internal Audits</Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {totalInternal}
          </Typography>
        </Card>
        <Card sx={{ flex: 1, p: 2, textAlign: "center",background: "linear-gradient(45deg, #e3f2fd, #e398ebff)"  }}>
          <FactCheck fontSize="large" sx={{ color: "#673ab7" }} />
          <Typography variant="subtitle2">External Audits</Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {totalExternal}
          </Typography>
        </Card>
        <Card sx={{ flex: 1, p: 2, textAlign: "center" ,background: "linear-gradient(45deg, #e3f2fd, #d3dfa2ff)" }}>
          <Verified fontSize="large" color="success" />
          <Typography variant="subtitle2">CAPAs Completed</Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {completedCAPAs}
          </Typography>
        </Card>
        <Card sx={{ flex: 1, p: 2, textAlign: "center",background: "linear-gradient(45deg, #e3f2fd, #c8f6d8ff)"  }}>
          <Verified fontSize="large" color="error" />
          <Typography variant="subtitle2">Pending CAPAs</Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {totalCAPAs - completedCAPAs}
          </Typography>
        </Card>
      </Stack>

      {/* Table Section */}
      <Card>
        <CardHeader
          title={
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                All Audits Summary
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ bgcolor: "#7267ef", textTransform: "none" }}
                startIcon={<FileDownload />}
                onClick={exportAllAudits}
              >
                Download All Excel
              </Button>
            </Stack>
          }
        />
        <CardContent>
          <Table>
            <TableHead sx={{ background: "#ede7f6" }}>
              <TableRow>
                <TableCell />
                <TableCell>Audit ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Site</TableCell>
                <TableCell>Auditor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Non-Compliances</TableCell>
                <TableCell>CAPAs Completed</TableCell>
                <TableCell>Total CAPAs</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleAudits.map((a) => (
                <React.Fragment key={a.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton size="small" onClick={() => toggleRow(a.id)}>
                        {expandedRows.includes(a.id) ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{a.id}</TableCell>
                    <TableCell>
                      <Chip
                        label={a.type}
                        color={a.type === "Internal" ? "primary" : "secondary"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{a.site}</TableCell>
                    <TableCell>{a.auditor}</TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={a.nonCompliances}
                        color={a.nonCompliances > 0 ? "error" : "success"}
                      />
                    </TableCell>
                    <TableCell>{a.capasCompleted}</TableCell>
                    <TableCell>{a.totalCapas}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => exportSingleAudit(a)}
                      >
                        <FileDownload fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Collapsible CAPA Details */}
                  <TableRow>
                    <TableCell colSpan={10} sx={{ p: 0, border: "none" }}>
                      <Collapse in={expandedRows.includes(a.id)} timeout="auto">
                        <Box sx={{ p: 2, background: "#fafafa" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            CAPA Details
                          </Typography>
                          <Table size="small">
                            <TableHead sx={{ background: "#f3e5f5" }}>
                              <TableRow>
                                <TableCell>CAPA ID</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Owner</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {a.capas.length > 0 ? (
                                a.capas.map((c) => (
                                  <TableRow key={c.id}>
                                    <TableCell>{c.id}</TableCell>
                                    <TableCell>{c.description}</TableCell>
                                    <TableCell>
                                      <Chip
                                        label={c.status}
                                        color={
                                          c.status === "Completed"
                                            ? "success"
                                            : "warning"
                                        }
                                        size="small"
                                      />
                                    </TableCell>
                                    <TableCell>{c.owner}</TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={4} align="center">
                                    No CAPAs found.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuditDashboard;
