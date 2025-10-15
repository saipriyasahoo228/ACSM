// import React, { useState, useRef } from "react";
// import {
//   Box,
//   Card,
//   CardHeader,
//   CardContent,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   Stack,
//   Chip,
//   TextField,
//   Paper,
//   Divider,
//   Stepper,
//   StepContent ,
//   Step,
//   StepLabel,
// } from "@mui/material";
// import { Check, Close, Inventory, QrCodeScanner, Assignment } from "@mui/icons-material";

// export default function StoreKeeperModule({ requests = [], onUpdateRequest }) {
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [detailDialogOpen, setDetailDialogOpen] = useState(false);
//   const [issueDialogOpen, setIssueDialogOpen] = useState(false);
//   const [signatureDialogOpen, setSignatureDialogOpen] = useState(false);
//   const [activeStep, setActiveStep] = useState(0);
//   const signatureRef = useRef(null);

//   // Sample barcode data (in real app, this would come from scanner)
//   const [barcodes, setBarcodes] = useState({});

//   const handleViewDetails = (request) => {
//     setSelectedRequest(request);
//     setDetailDialogOpen(true);
//   };

//   const handleApprove = (request) => {
//     const updatedRequest = {
//       ...request,
//       approval_status: "Approved",
//       approved_date: new Date().toISOString().split("T")[0],
//       approved_by: "Store Keeper"
//     };
//     onUpdateRequest(updatedRequest);
//     setDetailDialogOpen(false);
//   };

//   const handleDeny = (request) => {
//     const updatedRequest = {
//       ...request,
//       approval_status: "Denied",
//       approved_date: new Date().toISOString().split("T")[0],
//       approved_by: "Store Keeper",
//       denial_reason: "Not available in stock" // This could be from input
//     };
//     onUpdateRequest(updatedRequest);
//     setDetailDialogOpen(false);
//   };

//   const handleStartIssue = (request) => {
//     setSelectedRequest(request);
//     setActiveStep(0);
//     setIssueDialogOpen(true);
//   };

//   const handleScanBarcode = (itemId) => {
//     // Simulate barcode scan
//     const barcode = `BRC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
//     setBarcodes(prev => ({
//       ...prev,
//       [itemId]: barcode
//     }));
//   };

//   const handleProceedToSignature = () => {
//     setIssueDialogOpen(false);
//     setSignatureDialogOpen(true);
//   };

//   const handleCompleteIssuance = () => {
//     const today = new Date().toISOString().split("T")[0];
//     const maxRenewal = Math.max(
//       ...selectedRequest.requested_items.map(id => {
//         const item = ppeCatalog.find(p => p.id === id);
//         return item?.renewal || 12;
//       })
//     );
//     const renewalDate = new Date();
//     renewalDate.setMonth(renewalDate.getMonth() + maxRenewal);

//     const updatedRequest = {
//       ...selectedRequest,
//       approval_status: "Issued",
//       issue_date: today,
//       renewal_date: renewalDate.toISOString().split("T")[0],
//       issued_by: "Store Keeper",
//       barcodes: barcodes,
//       signature_date: today,
//       signature: "digitally_signed", // In real app, this would be the signature data
//     };
    
//     onUpdateRequest(updatedRequest);
//     setSignatureDialogOpen(false);
//     setBarcodes({});
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Approved": return "success";
//       case "Issued": return "info";
//       case "Denied": return "error";
//       case "Pending": return "warning";
//       default: return "default";
//     }
//   };

//   const pendingRequests = requests.filter(req => req.approval_status === "Pending");
//   const approvedRequests = requests.filter(req => req.approval_status === "Approved");
//   const issuedRequests = requests.filter(req => req.approval_status === "Issued");

//   const steps = ['Scan Barcodes', 'Employee Signature', 'Completion'];

//   return (
//     <Box sx={{ p: 3 }}>
//       <Card sx={{ mb: 3, borderLeft: "6px solid #2E7D32", borderRadius: 2 }}>
//         <CardHeader
//           title={
//             <Typography variant="h5" sx={{ color: "#2E7D32", fontWeight: 600 }}>
//               <Inventory sx={{ mr: 1, verticalAlign: 'middle' }} />
//               Store Keeper - PPE Management
//             </Typography>
//           }
//           subheader="Review, approve and issue PPE items to employees"
//         />
//       </Card>

//       {/* Pending Requests */}
//       <Card sx={{ mb: 3 }}>
//         <CardHeader
//           title={
//             <Typography variant="h6" color="warning.main">
//               <Assignment sx={{ mr: 1, verticalAlign: 'middle' }} />
//               Pending Approval ({pendingRequests.length})
//             </Typography>
//           }
//         />
//         <CardContent>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#FFF3E0" }}>
//                 <TableCell>Request ID</TableCell>
//                 <TableCell>Employee</TableCell>
//                 <TableCell>Department</TableCell>
//                 <TableCell>Requested Items</TableCell>
//                 <TableCell>Request Date</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {pendingRequests.map((req, idx) => (
//                 <TableRow key={idx} sx={{ '&:hover': { backgroundColor: '#fff8e1' } }}>
//                   <TableCell>{req.request_id}</TableCell>
//                   <TableCell>
//                     <Typography fontWeight={600}>{req.employee_name}</Typography>
//                     <Typography variant="caption">{req.employee_id}</Typography>
//                   </TableCell>
//                   <TableCell>{req.department}</TableCell>
//                   <TableCell>
//                     <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
//                       {req.requested_items.slice(0, 2).map((id) => {
//                         const item = ppeCatalog.find(p => p.id === id);
//                         return <Chip key={id} label={item?.name} size="small" />;
//                       })}
//                       {req.requested_items.length > 2 && (
//                         <Chip label={`+${req.requested_items.length - 2} more`} size="small" />
//                       )}
//                     </Stack>
//                   </TableCell>
//                   <TableCell>{req.request_date}</TableCell>
//                   <TableCell>
//                     <Button 
//                       variant="outlined"
//                       size="small"
//                       onClick={() => handleViewDetails(req)}
//                     >
//                       Review
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {pendingRequests.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
//                     <Typography color="text.secondary">No pending requests</Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Approved Requests */}
//       <Card sx={{ mb: 3 }}>
//         <CardHeader
//           title={
//             <Typography variant="h6" color="success.main">
//               Approved - Ready for Issue ({approvedRequests.length})
//             </Typography>
//           }
//         />
//         <CardContent>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#E8F5E8" }}>
//                 <TableCell>Request ID</TableCell>
//                 <TableCell>Employee</TableCell>
//                 <TableCell>Items Count</TableCell>
//                 <TableCell>Approved Date</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {approvedRequests.map((req, idx) => (
//                 <TableRow key={idx} sx={{ '&:hover': { backgroundColor: '#f1f8e9' } }}>
//                   <TableCell>{req.request_id}</TableCell>
//                   <TableCell>{req.employee_name}</TableCell>
//                   <TableCell>{req.requested_items.length} items</TableCell>
//                   <TableCell>{req.approved_date}</TableCell>
//                   <TableCell>
//                     <Button 
//                       variant="contained"
//                       size="small"
//                       startIcon={<Inventory />}
//                       onClick={() => handleStartIssue(req)}
//                     >
//                       Issue Items
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Issued Items */}
//       <Card>
//         <CardHeader
//           title={
//             <Typography variant="h6" color="info.main">
//               Issued Items ({issuedRequests.length})
//             </Typography>
//           }
//         />
//         <CardContent>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#E3F2FD" }}>
//                 <TableCell>Request ID</TableCell>
//                 <TableCell>Employee</TableCell>
//                 <TableCell>Issued Items</TableCell>
//                 <TableCell>Issue Date</TableCell>
//                 <TableCell>Renewal Date</TableCell>
//                 <TableCell>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {issuedRequests.map((req, idx) => (
//                 <TableRow key={idx}>
//                   <TableCell>{req.request_id}</TableCell>
//                   <TableCell>{req.employee_name}</TableCell>
//                   <TableCell>{req.requested_items.length} items</TableCell>
//                   <TableCell>{req.issue_date}</TableCell>
//                   <TableCell>{req.renewal_date}</TableCell>
//                   <TableCell>
//                     <Chip label="Issued" color="success" size="small" />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Request Detail Dialog */}
//       <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ color: "#0A3A6E", fontWeight: 600 }}>
//           Review Request - {selectedRequest?.request_id}
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedRequest && (
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Employee Name</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedRequest.employee_name}</Typography>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Employee ID</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedRequest.employee_id}</Typography>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Department</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedRequest.department}</Typography>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Request Date</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedRequest.request_date}</Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle2" color="text.secondary">Requested Items</Typography>
//                 <Stack spacing={1} sx={{ mt: 1 }}>
//                   {selectedRequest.requested_items.map((id) => {
//                     const item = ppeCatalog.find((p) => p.id === id);
//                     return (
//                       <Paper key={id} variant="outlined" sx={{ p: 2 }}>
//                         <Typography fontWeight={500}>{item?.name}</Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           {item?.category} • Renewal: {item?.renewal} months
//                         </Typography>
//                       </Paper>
//                     );
//                   })}
//                 </Stack>
//               </Grid>
//             </Grid>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: 3, gap: 2 }}>
//           <Button 
//             onClick={() => handleDeny(selectedRequest)}
//             variant="outlined"
//             color="error"
//             startIcon={<Close />}
//           >
//             Deny Request
//           </Button>
//           <Button 
//             onClick={() => handleApprove(selectedRequest)}
//             variant="contained"
//             color="success"
//             startIcon={<Check />}
//           >
//             Approve Request
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Issue Items Dialog with Stepper */}
//       <Dialog open={issueDialogOpen} onClose={() => setIssueDialogOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ color: "#2E7D32", fontWeight: 600 }}>
//           Issue PPE Items - {selectedRequest?.request_id}
//         </DialogTitle>
//         <DialogContent dividers>
//           <Stepper activeStep={activeStep} orientation="vertical">
//             <Step>
//               <StepLabel>Scan Barcodes</StepLabel>
//               <StepContent>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                   Scan barcode for each item being issued
//                 </Typography>
//                 <Stack spacing={2}>
//                   {selectedRequest?.requested_items.map((id) => {
//                     const item = ppeCatalog.find(p => p.id === id);
//                     return (
//                       <Paper key={id} variant="outlined" sx={{ p: 2 }}>
//                         <Grid container alignItems="center" spacing={2}>
//                           <Grid item xs={8}>
//                             <Typography fontWeight={500}>{item?.name}</Typography>
//                             <Typography variant="caption" color="text.secondary">
//                               {item?.category}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={4}>
//                             {barcodes[id] ? (
//                               <Chip label={barcodes[id]} color="success" size="small" />
//                             ) : (
//                               <Button
//                                 variant="outlined"
//                                 size="small"
//                                 startIcon={<QrCodeScanner />}
//                                 onClick={() => handleScanBarcode(id)}
//                               >
//                                 Scan Barcode
//                               </Button>
//                             )}
//                           </Grid>
//                         </Grid>
//                       </Paper>
//                     );
//                   })}
//                 </Stack>
//                 <Box sx={{ mt: 2 }}>
//                   <Button
//                     variant="contained"
//                     onClick={() => setActiveStep(1)}
//                     disabled={Object.keys(barcodes).length !== selectedRequest?.requested_items.length}
//                   >
//                     Continue to Signature
//                   </Button>
//                 </Box>
//               </StepContent>
//             </Step>
            
//             <Step>
//               <StepLabel>Employee Signature</StepLabel>
//               <StepContent>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                   Employee will sign on the tablet to acknowledge receipt
//                 </Typography>
//                 <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
//                   <Typography variant="h6" gutterBottom>
//                     Digital Signature Pad
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Employee: {selectedRequest?.employee_name}
//                   </Typography>
//                   <Box
//                     ref={signatureRef}
//                     sx={{
//                       height: 200,
//                       border: '2px dashed #ccc',
//                       borderRadius: 2,
//                       mt: 2,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       backgroundColor: 'white'
//                     }}
//                   >
//                     <Typography color="text.secondary">
//                       Signature area - Employee will sign here
//                     </Typography>
//                   </Box>
//                 </Paper>
//                 <Box sx={{ mt: 2 }}>
//                   <Button variant="contained" onClick={handleProceedToSignature}>
//                     Complete Signature
//                   </Button>
//                 </Box>
//               </StepContent>
//             </Step>
//           </Stepper>
//         </DialogContent>
//       </Dialog>

//       {/* Signature Completion Dialog */}
//       <Dialog open={signatureDialogOpen} onClose={() => setSignatureDialogOpen(false)}>
//         <DialogTitle sx={{ color: "#2E7D32", fontWeight: 600 }}>
//           Issuance Complete
//         </DialogTitle>
//         <DialogContent>
//           <Typography>
//             All items have been issued to <strong>{selectedRequest?.employee_name}</strong> 
//             and digital signature has been captured.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setSignatureDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleCompleteIssuance}>
//             Complete Issuance
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// // Dummy data for Store Keeper module
// const ppeCatalog = [
//   { id: "PPE-001", name: "Safety Helmet", renewal: 12, category: "Head Protection" },
//   { id: "PPE-002", name: "Acid-Resistant Gloves", renewal: 6, category: "Hand Protection" },
//   { id: "PPE-003", name: "Safety Shoes", renewal: 18, category: "Foot Protection" },
//   { id: "PPE-004", name: "Face Shield", renewal: 12, category: "Face Protection" },
// ];





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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Stack,
  Chip,
  TextField,
  Paper,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import { Check, Close, Inventory, QrCodeScanner, Assignment } from "@mui/icons-material";

// Dummy data for Store Keeper module
const ppeCatalog = [
  { id: "PPE-001", name: "Safety Helmet", renewal: 12, category: "Head Protection" },
  { id: "PPE-002", name: "Acid-Resistant Gloves", renewal: 6, category: "Hand Protection" },
  { id: "PPE-003", name: "Safety Shoes", renewal: 18, category: "Foot Protection" },
  { id: "PPE-004", name: "Face Shield", renewal: 12, category: "Face Protection" },
  { id: "PPE-005", name: "Safety Glasses", renewal: 12, category: "Eye Protection" },
  { id: "PPE-006", name: "Ear Plugs", renewal: 6, category: "Hearing Protection" },
  { id: "PPE-007", name: "High-Vis Vest", renewal: 12, category: "Body Protection" },
  { id: "PPE-008", name: "Welding Mask", renewal: 24, category: "Face Protection" },
];

// Pre-populated dummy requests for Store Keeper
const storeKeeperDummyRequests = [
  {
    request_id: "REQ-1001",
    employee_name: "Rajesh Kumar",
    employee_id: "EMP-001",
    department: "Welding",
    requested_items: ["PPE-001", "PPE-002", "PPE-008"],
    approval_status: "Pending",
    request_date: "2024-01-15",
    module: "contractor"
  },
  {
    request_id: "REQ-1002",
    employee_name: "Priya Sharma",
    employee_id: "EMP-002",
    department: "Electrical",
    requested_items: ["PPE-001", "PPE-003", "PPE-005"],
    approval_status: "Approved",
    request_date: "2024-01-14",
    approved_date: "2024-01-15",
    approved_by: "Store Keeper",
    module: "contractor"
  },
  {
    request_id: "REQ-1005",
    employee_name: "Vikram Singh",
    employee_id: "EMP-005",
    department: "Construction",
    requested_items: ["PPE-001", "PPE-003", "PPE-007"],
    approval_status: "Pending",
    request_date: "2024-01-16",
    module: "contractor"
  },
  {
    request_id: "REQ-1003",
    employee_name: "Amit Patel",
    employee_id: "EMP-003",
    department: "Mechanical",
    requested_items: ["PPE-001", "PPE-003", "PPE-004"],
    approval_status: "Issued",
    request_date: "2024-01-10",
    approved_date: "2024-01-11",
    approved_by: "Store Keeper",
    issue_date: "2024-01-12",
    renewal_date: "2025-07-12",
    issued_by: "Store Keeper",
    barcodes: {
      "PPE-001": "BRC-HLM-89342",
      "PPE-003": "BRC-SHO-45621",
      "PPE-004": "BRC-FSH-78901"
    },
    signature_date: "2024-01-12",
    signature: "digitally_signed",
    module: "contractor"
  },
  {
    request_id: "REQ-1004",
    employee_name: "Sneha Reddy",
    employee_id: "EMP-004",
    department: "Laboratory",
    requested_items: ["PPE-001", "PPE-002", "PPE-004", "PPE-005"],
    approval_status: "Denied",
    request_date: "2024-01-13",
    approved_date: "2024-01-14",
    approved_by: "Store Keeper",
    denial_reason: "Safety glasses out of stock",
    module: "contractor"
  }
];

export default function StoreKeeperModule() {
  const [requests, setRequests] = useState(storeKeeperDummyRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [signatureDialogOpen, setSignatureDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [barcodes, setBarcodes] = useState({});

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setDetailDialogOpen(true);
  };

  const handleApprove = (request) => {
    const updatedRequests = requests.map(req => 
      req.request_id === request.request_id 
        ? {
            ...req,
            approval_status: "Approved",
            approved_date: new Date().toISOString().split("T")[0],
            approved_by: "Store Keeper"
          }
        : req
    );
    setRequests(updatedRequests);
    setDetailDialogOpen(false);
  };

  const handleDeny = (request) => {
    const updatedRequests = requests.map(req => 
      req.request_id === request.request_id 
        ? {
            ...req,
            approval_status: "Denied",
            approved_date: new Date().toISOString().split("T")[0],
            approved_by: "Store Keeper",
            denial_reason: "Items not available in stock"
          }
        : req
    );
    setRequests(updatedRequests);
    setDetailDialogOpen(false);
  };

  const handleStartIssue = (request) => {
    setSelectedRequest(request);
    setActiveStep(0);
    setBarcodes({});
    setIssueDialogOpen(true);
  };

  const handleScanBarcode = (itemId) => {
    // Simulate barcode scan with realistic codes
    const barcodePrefixes = {
      "PPE-001": "HLM",
      "PPE-002": "GLV",
      "PPE-003": "SHO",
      "PPE-004": "FSH",
      "PPE-005": "GLS",
      "PPE-006": "EAR",
      "PPE-007": "VST",
      "PPE-008": "MSK"
    };
    
    const barcode = `BRC-${barcodePrefixes[itemId]}-${Math.random().toString().substr(2, 6)}`;
    setBarcodes(prev => ({
      ...prev,
      [itemId]: barcode
    }));
  };

  const handleProceedToSignature = () => {
    setIssueDialogOpen(false);
    setSignatureDialogOpen(true);
  };

  const handleCompleteIssuance = () => {
    const today = new Date().toISOString().split("T")[0];
    const maxRenewal = Math.max(
      ...selectedRequest.requested_items.map(id => {
        const item = ppeCatalog.find(p => p.id === id);
        return item?.renewal || 12;
      })
    );
    const renewalDate = new Date();
    renewalDate.setMonth(renewalDate.getMonth() + maxRenewal);

    const updatedRequests = requests.map(req => 
      req.request_id === selectedRequest.request_id 
        ? {
            ...req,
            approval_status: "Issued",
            issue_date: today,
            renewal_date: renewalDate.toISOString().split("T")[0],
            issued_by: "Store Keeper",
            barcodes: { ...barcodes },
            signature_date: today,
            signature: "digitally_signed",
          }
        : req
    );
    
    setRequests(updatedRequests);
    setSignatureDialogOpen(false);
    setBarcodes({});
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

  const pendingRequests = requests.filter(req => req.approval_status === "Pending");
  const approvedRequests = requests.filter(req => req.approval_status === "Approved");
  const issuedRequests = requests.filter(req => req.approval_status === "Issued");

  const steps = ['Scan Barcodes', 'Employee Signature', 'Completion'];

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ mb: 3, borderLeft: "6px solid #2E7D32", borderRadius: 2 }}>
        <CardHeader
          title={
            <Typography variant="h5" sx={{ color: "#2E7D32", fontWeight: 600 }}>
              <Inventory sx={{ mr: 1, verticalAlign: 'middle' }} />
              Store Keeper - PPE Management
            </Typography>
          }
          subheader="Review, approve and issue PPE items to employees"
        />
      </Card>

      {/* Pending Requests */}
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={
            <Typography variant="h6" color="warning.main">
              <Assignment sx={{ mr: 1, verticalAlign: 'middle' }} />
              Pending Approval ({pendingRequests.length})
            </Typography>
          }
          subheader="Requests waiting for your review and approval"
        />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#FFF3E0" }}>
                <TableCell>Request ID</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Requested Items</TableCell>
                <TableCell>Request Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingRequests.map((req, idx) => (
                <TableRow key={idx} sx={{ '&:hover': { backgroundColor: '#fff8e1' } }}>
                  <TableCell>
                    <Typography fontWeight={600}>{req.request_id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>{req.employee_name}</Typography>
                    <Typography variant="caption">{req.employee_id}</Typography>
                  </TableCell>
                  <TableCell>{req.department}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {req.requested_items.slice(0, 2).map((id) => {
                        const item = ppeCatalog.find(p => p.id === id);
                        return <Chip key={id} label={item?.name} size="small" />;
                      })}
                      {req.requested_items.length > 2 && (
                        <Chip label={`+${req.requested_items.length - 2} more`} size="small" />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>{req.request_date}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewDetails(req)}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Approved Requests */}
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={
            <Typography variant="h6" color="success.main">
              Approved - Ready for Issue ({approvedRequests.length})
            </Typography>
          }
          subheader="Approved requests ready for item issuance"
        />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E8F5E8" }}>
                <TableCell>Request ID</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Items Count</TableCell>
                <TableCell>Approved Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {approvedRequests.map((req, idx) => (
                <TableRow key={idx} sx={{ '&:hover': { backgroundColor: '#f1f8e9' } }}>
                  <TableCell>{req.request_id}</TableCell>
                  <TableCell>{req.employee_name}</TableCell>
                  <TableCell>{req.requested_items.length} items</TableCell>
                  <TableCell>{req.approved_date}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained"
                      size="small"
                      startIcon={<Inventory />}
                      onClick={() => handleStartIssue(req)}
                    >
                      Issue Items
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Issued Items */}
      <Card>
        <CardHeader
          title={
            <Typography variant="h6" color="info.main">
              Issued Items ({issuedRequests.length})
            </Typography>
          }
          subheader="Completed issuances with digital signatures"
        />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E3F2FD" }}>
                <TableCell>Request ID</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Issued Items</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Renewal Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issuedRequests.map((req, idx) => (
                <TableRow key={idx}>
                  <TableCell>{req.request_id}</TableCell>
                  <TableCell>{req.employee_name}</TableCell>
                  <TableCell>{req.requested_items.length} items</TableCell>
                  <TableCell>{req.issue_date}</TableCell>
                  <TableCell>{req.renewal_date}</TableCell>
                  <TableCell>
                    <Chip label="Issued" color="success" size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Request Detail Dialog */}
      <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: "#0A3A6E", fontWeight: 600 }}>
          Review Request - {selectedRequest?.request_id}
        </DialogTitle>
        <DialogContent dividers>
          {selectedRequest && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">Employee Name</Typography>
                <Typography variant="body1" gutterBottom>{selectedRequest.employee_name}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">Employee ID</Typography>
                <Typography variant="body1" gutterBottom>{selectedRequest.employee_id}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">Department</Typography>
                <Typography variant="body1" gutterBottom>{selectedRequest.department}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">Request Date</Typography>
                <Typography variant="body1" gutterBottom>{selectedRequest.request_date}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">Requested Items</Typography>
                <Stack spacing={1} sx={{ mt: 1 }}>
                  {selectedRequest.requested_items.map((id) => {
                    const item = ppeCatalog.find((p) => p.id === id);
                    return (
                      <Paper key={id} variant="outlined" sx={{ p: 2 }}>
                        <Typography fontWeight={500}>{item?.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item?.category} • Renewal: {item?.renewal} months
                        </Typography>
                      </Paper>
                    );
                  })}
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            onClick={() => handleDeny(selectedRequest)}
            variant="outlined"
            color="error"
            startIcon={<Close />}
          >
            Deny Request
          </Button>
          <Button 
            onClick={() => handleApprove(selectedRequest)}
            variant="contained"
            color="success"
            startIcon={<Check />}
          >
            Approve Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Issue Items Dialog with Stepper */}
      <Dialog open={issueDialogOpen} onClose={() => setIssueDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: "#2E7D32", fontWeight: 600 }}>
          Issue PPE Items - {selectedRequest?.request_id}
        </DialogTitle>
        <DialogContent dividers>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Scan Barcodes</StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Scan barcode for each item being issued to {selectedRequest?.employee_name}
                </Typography>
                <Stack spacing={2}>
                  {selectedRequest?.requested_items.map((id) => {
                    const item = ppeCatalog.find(p => p.id === id);
                    return (
                      <Paper key={id} variant="outlined" sx={{ p: 2 }}>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={8}>
                            <Typography fontWeight={500}>{item?.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item?.category}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            {barcodes[id] ? (
                              <Chip 
                                label={`Scanned: ${barcodes[id]}`} 
                                color="success" 
                                size="small" 
                                onDelete={() => {
                                  const newBarcodes = { ...barcodes };
                                  delete newBarcodes[id];
                                  setBarcodes(newBarcodes);
                                }}
                              />
                            ) : (
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<QrCodeScanner />}
                                onClick={() => handleScanBarcode(id)}
                              >
                                Scan Barcode
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </Paper>
                    );
                  })}
                </Stack>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => setActiveStep(1)}
                    disabled={Object.keys(barcodes).length !== selectedRequest?.requested_items.length}
                  >
                    Continue to Signature ({Object.keys(barcodes).length}/{selectedRequest?.requested_items.length})
                  </Button>
                </Box>
              </StepContent>
            </Step>
            
            <Step>
              <StepLabel>Employee Signature</StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Employee will sign on the tablet to acknowledge receipt
                </Typography>
                <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                  <Typography variant="h6" gutterBottom>
                    Digital Signature Pad
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Employee: <strong>{selectedRequest?.employee_name}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Employee ID: {selectedRequest?.employee_id}
                  </Typography>
                  <Box
                    sx={{
                      height: 200,
                      border: '2px dashed #ccc',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                    onClick={handleProceedToSignature}
                  >
                    <Typography color="text.secondary">
                      Click here to simulate employee signature
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    * Employee will sign in this area on the tablet device
                  </Typography>
                </Paper>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={handleProceedToSignature}>
                    Complete Signature
                  </Button>
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        </DialogContent>
      </Dialog>

      {/* Signature Completion Dialog */}
      <Dialog open={signatureDialogOpen} onClose={() => setSignatureDialogOpen(false)}>
        <DialogTitle sx={{ color: "#2E7D32", fontWeight: 600 }}>
          Issuance Complete
        </DialogTitle>
        <DialogContent>
          <Typography paragraph>
            All items have been issued to <strong>{selectedRequest?.employee_name}</strong> 
            and digital signature has been captured.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Request ID: {selectedRequest?.request_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Issue Date: {new Date().toISOString().split("T")[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Items Issued: {selectedRequest?.requested_items.length}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSignatureDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCompleteIssuance}>
            Complete Issuance
          </Button>
        </DialogActions>
      </Dialog>

      {/* Workflow Explanation */}
      <Card sx={{ mt: 3, p: 3, bgcolor: '#f0f7f0' }}>
        <Typography variant="h6" gutterBottom color="#2E7D32">
          Store Keeper Workflow
        </Typography>
        <Typography variant="body2" paragraph>
          This module demonstrates the complete Store Keeper workflow:
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">
            1. <strong>Review Pending Requests</strong> - Check REQ-1001 and REQ-1005 in "Pending Approval"
          </Typography>
          <Typography variant="body2">
            2. <strong>Approve/Deny Requests</strong> - Click "Review" to approve or deny requests
          </Typography>
          <Typography variant="body2">
            3. <strong>Issue Approved Items</strong> - Check REQ-1002 in "Approved" section, click "Issue Items"
          </Typography>
          <Typography variant="body2">
            4. <strong>Scan Barcodes</strong> - Simulate scanning each item's barcode
          </Typography>
          <Typography variant="body2">
            5. <strong>Digital Signature</strong> - Employee acknowledges receipt by signing
          </Typography>
          <Typography variant="body2">
            6. <strong>Complete Issuance</strong> - Request moves to "Issued Items" section
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}