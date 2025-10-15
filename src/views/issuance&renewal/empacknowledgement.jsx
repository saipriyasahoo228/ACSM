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
  Button,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";

// Dummy data for issued PPE/tools
const issuedItemsData = [
  {
    request_id: "REQ-001",
    employee_id: "EMP-001",
    employee_name: "John Doe",
    items: [
      { id: "PPE-001", name: "Safety Helmet", renewal_months: 12 },
      { id: "PPE-002", name: "Acid-Resistant Gloves", renewal_months: 6 },
    ],
    issue_date: "2025-10-01",
    renewal_date: "2026-10-01",
    acknowledged: false,
  },
  {
    request_id: "REQ-002",
    employee_id: "EMP-002",
    employee_name: "Jane Smith",
    items: [
      { id: "PPE-003", name: "Safety Shoes", renewal_months: 18 },
    ],
    issue_date: "2025-09-15",
    renewal_date: "2027-03-15",
    acknowledged: true,
  },
];

export default function EmployeeAcknowledgment() {
  const [issuedItems, setIssuedItems] = useState(issuedItemsData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Open acknowledgment dialog
  const handleAcknowledgeClick = (req) => {
    setSelectedRequest(req);
    setDialogOpen(true);
  };

  // Confirm acknowledgment
  const handleConfirmAcknowledgment = () => {
    setIssuedItems((prev) =>
      prev.map((req) =>
        req.request_id === selectedRequest.request_id
          ? { ...req, acknowledged: true }
          : req
      )
    );
    setDialogOpen(false);
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
              Employee PPE / Tool Acknowledgment
            </Typography>
          }
        />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E3EAFD" }}>
                <TableCell>Request ID</TableCell>
                <TableCell>Issued Items</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Renewal Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Acknowledge</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issuedItems.map((req) => (
                <TableRow key={req.request_id}>
                  <TableCell>{req.request_id}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap">
                      {req.items.map((item) => (
                        <Chip
                          key={item.id}
                          label={`${item.name} (Renew: ${item.renewal_months} mo)`}
                          size="small"
                          sx={{ mb: 0.5 }}
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>{req.issue_date}</TableCell>
                  <TableCell>{req.renewal_date}</TableCell>
                  <TableCell>
                    {req.acknowledged ? (
                      <Chip label="Acknowledged" color="success" size="small" />
                    ) : (
                      <Chip label="Pending" color="warning" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    {!req.acknowledged && (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Check />}
                        onClick={() => handleAcknowledgeClick(req)}
                      >
                        Acknowledge
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {issuedItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    No issued items to acknowledge.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Acknowledgment Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "#0A3A6E", fontWeight: 600 }}>
          Confirm Acknowledgment
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure you want to acknowledge receipt of the following items for{" "}
            <b>{selectedRequest?.employee_name}</b>?
          </Typography>
          <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
            {selectedRequest?.items.map((item) => (
              <Chip key={item.id} label={item.name} size="small" />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{ color: "#D32F2F" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmAcknowledgment}
            sx={{ backgroundColor: "#0A3A6E" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
