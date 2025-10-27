
import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Stack,
  Chip,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  Search,
  Download,
  Refresh,
  Visibility,
  Schedule,
  CheckCircle,
  Cancel,
  Warning,
  Groups,
  AccessTime,
  CalendarToday,
  Business,
  FilterList,
  Close,
  Person,
  Badge,
  Work,
  Schedule as ScheduleIcon,
  Security,
  MedicalInformation,
  Construction,
} from "@mui/icons-material";

const DailyWorkforceDetails = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // Sample data with enhanced worker details
  const projectsData = [
    {
      project: "Building A Extension",
      projectCode: "BLD-A-2024",
      contractor: "ABC Construction Ltd",
      location: "Site A, Industrial Area",
      progress: 75,
      workers: [
        {
          id: "EMP001",
          name: "Ravi Kumar",
          role: "Site Supervisor",
          department: "Construction",
          clockIn: "08:10 AM",
          clockOut: "05:20 PM",
          totalHours: "9h 10m",
          compliance: "compliant",
          status: "completed",
          contact: "+91 98765 43210",
          email: "ravi.kumar@abcconstruction.com",
          complianceDetails: {
            medical: { status: "valid", expiry: "2024-12-31" },
            ppe: { status: "issued", lastIssued: "2024-01-15" },
            training: { status: "completed", lastTraining: "2024-02-20" },
            tbt: { status: "attended", date: "2024-03-15" }
          },
          workHistory: [
            { date: "2024-03-14", hours: "8h 45m", project: "Building A Extension" },
            { date: "2024-03-13", hours: "9h 05m", project: "Building A Extension" }
          ]
        },
        {
          id: "EMP002",
          name: "Amit Singh",
          role: "Electrician",
          department: "Electrical",
          clockIn: "08:15 AM",
          clockOut: "05:15 PM",
          totalHours: "9h 00m",
          compliance: "compliant",
          status: "completed",
          contact: "+91 98765 43211",
          email: "amit.singh@abcconstruction.com",
          complianceDetails: {
            medical: { status: "valid", expiry: "2024-11-30" },
            ppe: { status: "issued", lastIssued: "2024-01-20" },
            training: { status: "completed", lastTraining: "2024-02-25" },
            tbt: { status: "attended", date: "2024-03-15" }
          },
          workHistory: [
            { date: "2024-03-14", hours: "8h 30m", project: "Building A Extension" },
            { date: "2024-03-13", hours: "9h 15m", project: "Building A Extension" }
          ]
        },
        {
          id: "EMP003",
          name: "Rohit Das",
          role: "Plumber",
          department: "Plumbing",
          clockIn: "—",
          clockOut: "—",
          totalHours: "—",
          compliance: "non-compliant",
          status: "absent",
          contact: "+91 98765 43212",
          email: "rohit.das@abcconstruction.com",
          issues: ["Medical checkup expired", "Missed TBT"],
          complianceDetails: {
            medical: { status: "expired", expiry: "2024-02-28" },
            ppe: { status: "issued", lastIssued: "2024-01-18" },
            training: { status: "completed", lastTraining: "2024-02-22" },
            tbt: { status: "missed", date: "2024-03-15" }
          },
          workHistory: [
            { date: "2024-03-14", hours: "8h 50m", project: "Building A Extension" },
            { date: "2024-03-13", hours: "9h 00m", project: "Building A Extension" }
          ]
        },
      ],
    },
    {
      project: "Road Construction - Phase 2",
      projectCode: "RD-2024-P2",
      contractor: "XYZ Infrastructure",
      location: "Highway 45, KM 12-18",
      progress: 45,
      workers: [
        {
          id: "EMP005",
          name: "Vikram Joshi",
          role: "Foreman",
          department: "Construction",
          clockIn: "07:45 AM",
          clockOut: "04:45 PM",
          totalHours: "9h 00m",
          compliance: "compliant",
          status: "completed",
          contact: "+91 98765 43213",
          email: "vikram.joshi@xyzinfra.com",
          complianceDetails: {
            medical: { status: "valid", expiry: "2024-10-31" },
            ppe: { status: "issued", lastIssued: "2024-01-10" },
            training: { status: "completed", lastTraining: "2024-02-28" },
            tbt: { status: "attended", date: "2024-03-15" }
          },
          workHistory: [
            { date: "2024-03-14", hours: "8h 55m", project: "Road Construction - Phase 2" },
            { date: "2024-03-13", hours: "9h 10m", project: "Road Construction - Phase 2" }
          ]
        },
      ],
    },
  ];

  const selectedProjectData = projectsData.find(p => p.project === selectedProject);
  const filteredWorkers = selectedProjectData?.workers || [];

  // Calculate statistics
  const stats = {
    total: filteredWorkers.length,
    present: filteredWorkers.filter(w => w.status !== "absent").length,
    compliant: filteredWorkers.filter(w => w.compliance === "compliant").length,
    working: filteredWorkers.filter(w => w.status === "working").length,
    attendanceRate: filteredWorkers.length > 0 ? Math.round((filteredWorkers.filter(w => w.status !== "absent").length / filteredWorkers.length) * 100) : 0,
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      completed: { label: "Completed", color: "success", icon: <CheckCircle fontSize="small" /> },
      working: { label: "Working", color: "primary", icon: <AccessTime fontSize="small" /> },
      absent: { label: "Absent", color: "error", icon: <Cancel fontSize="small" /> },
    };
    
    const config = statusConfig[status] || { label: status, color: "default", icon: <Warning fontSize="small" /> };
    
    return (
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color}
        variant="outlined"
        size="small"
        sx={{ fontWeight: 600 }}
      />
    );
  };

  const getComplianceChip = (compliance) => {
    const complianceConfig = {
      compliant: { label: "Compliant", color: "success" },
      partial: { label: "Partial", color: "warning" },
      "non-compliant": { label: "Non-Compliant", color: "error" },
    };
    
    const config = complianceConfig[compliance] || { label: compliance, color: "default" };
    
    return (
      <Chip 
        label={config.label} 
        color={config.color} 
        size="small" 
        variant="filled"
        sx={{ fontWeight: 600, color: 'white' }}
      />
    );
  };

  const handleViewDetails = (worker) => {
    setSelectedWorker(worker);
    setViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setViewModalOpen(false);
    setSelectedWorker(null);
  };

  const getComplianceIcon = (type, status) => {
    const icons = {
      medical: <MedicalInformation />,
      ppe: <Security />,
      training: <Work />,
      tbt: <ScheduleIcon />
    };
    
    const colors = {
      valid: "#10b981",
      issued: "#10b981",
      completed: "#10b981",
      attended: "#10b981",
      expired: "#ef4444",
      missed: "#ef4444"
    };
    
    return (
      <ListItemIcon>
        <Box sx={{ color: colors[status] || "#6b7280" }}>
          {icons[type]}
        </Box>
      </ListItemIcon>
    );
  };

  const StatCard = ({ icon, value, label, color, subtitle }) => (
    <Paper 
      sx={{ 
        p: 3, 
        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
        border: `1px solid ${color}30`,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
        }
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: `${color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" color={color}>
            {value}
          </Typography>
          <Typography variant="h6" fontWeight="600" color="text.primary">
            {label}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Stack>
    </Paper>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
          Daily Workforce Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor real-time attendance and compliance across projects
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Enhanced Search Card */}
        <Grid item xs={12}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            overflow: 'visible'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={5}>
                  <TextField
                    select
                    fullWidth
                    label={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Business fontSize="small" />
                        <Typography>Select Project</Typography>
                      </Stack>
                    }
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    size="medium"
                    InputProps={{
                      sx: { 
                        borderRadius: 2,
                        backgroundColor: 'white',
                        '&:before': { borderBottom: 'none' },
                        '&:after': { borderBottom: 'none' },
                      }
                    }}
                  >
                    {projectsData.map((project, idx) => (
                      <MenuItem key={idx} value={project.project}>
                        <Box sx={{ py: 0.5 }}>
                          <Typography variant="body1" fontWeight="500">
                            {project.project}
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="caption" color="text.secondary">
                              {project.projectCode}
                            </Typography>
                            <Box sx={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {project.contractor}
                            </Typography>
                          </Stack>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CalendarToday fontSize="small" />
                        <Typography>Attendance Date</Typography>
                      </Stack>
                    }
                    InputLabelProps={{ shrink: true }}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    size="medium"
                    InputProps={{
                      sx: { 
                        borderRadius: 2,
                        backgroundColor: 'white',
                        '&:before': { borderBottom: 'none' },
                        '&:after': { borderBottom: 'none' },
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      startIcon={<FilterList />}
                      sx={{ 
                        borderRadius: 2,
                        px: 3,
                        borderColor: 'divider',
                        color: 'text.secondary'
                      }}
                    >
                      Filters
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Refresh />}
                      onClick={() => setSelectedProject("")}
                      sx={{ borderRadius: 2, px: 3 }}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Search />}
                      sx={{ 
                        borderRadius: 2,
                        px: 4,
                        background: '#0A3A6E',
                        boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #2563eb, #1e40af)',
                          boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                        }
                      }}
                    >
                      Search
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Enhanced Statistics Cards */}
        {selectedProject && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<Groups sx={{ fontSize: 28, color: '#3b82f6' }} />}
                  value={stats.total}
                  label="Total Workers"
                  color="#3b82f6"
                  subtitle={`${stats.present} present today`}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<CheckCircle sx={{ fontSize: 28, color: '#10b981' }} />}
                  value={`${stats.attendanceRate}%`}
                  label="Attendance Rate"
                  color="#10b981"
                  subtitle={`${stats.present}/${stats.total} workers`}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<AccessTime sx={{ fontSize: 28, color: '#f59e0b' }} />}
                  value={stats.compliant}
                  label="Fully Compliant"
                  color="#f59e0b"
                  subtitle={`${Math.round((stats.compliant/stats.total) * 100)}% compliance rate`}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<Warning sx={{ fontSize: 28, color: '#ef4444' }} />}
                  value={stats.total - stats.compliant}
                  label="Issues Found"
                  color="#ef4444"
                  subtitle="Need attention"
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Project Progress Card */}
        {selectedProject && selectedProjectData && (
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              border: '1px solid',
              borderColor: 'divider'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {selectedProjectData.project}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip 
                        label={selectedProjectData.projectCode} 
                        size="small" 
                        variant="outlined" 
                        color="primary"
                      />
                      <Typography variant="body2" color="text.secondary">
                        {selectedProjectData.contractor}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedProjectData.location}
                      </Typography>
                    </Stack>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    sx={{ borderRadius: 2 }}
                  >
                    Export Report
                  </Button>
                </Stack>
                
                {/* Progress Bar */}
                <Box sx={{ mb: 3 }}>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" fontWeight="500">
                      Project Progress
                    </Typography>
                    <Typography variant="body2" fontWeight="600" color="primary">
                      {selectedProjectData.progress}%
                    </Typography>
                  </Stack>
                  <Box 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4, 
                      backgroundColor: '#e2e8f0',
                      overflow: 'hidden'
                    }}
                  >
                    <Box 
                      sx={{ 
                        height: '100%', 
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                        width: `${selectedProjectData.progress}%`,
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </Box>
                </Box>

                {/* Data Table */}
                <Table>
                  <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>Employee ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>Name & Role</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>Time Tracking</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>Compliance</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredWorkers.map((worker) => (
                      <TableRow key={worker.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="600" color="text.primary">
                            {worker.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography fontWeight="600">{worker.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {worker.role}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{getStatusChip(worker.status)}</TableCell>
                        <TableCell>
                          <Box>
                            <Stack direction="row" spacing={2}>
                              <Box>
                                <Typography variant="caption" color="text.secondary">In</Typography>
                                <Typography variant="body2" fontWeight="500">{worker.clockIn}</Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary">Out</Typography>
                                <Typography variant="body2" fontWeight="500">{worker.clockOut}</Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary">Total</Typography>
                                <Typography 
                                  variant="body2" 
                                  fontWeight="600"
                                  color={
                                    worker.totalHours === "—" ? "error.main" : 
                                    worker.totalHours === "Working" ? "primary.main" : "success.main"
                                  }
                                >
                                  {worker.totalHours}
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                        </TableCell>
                        <TableCell>{getComplianceChip(worker.compliance)}</TableCell>
                        <TableCell>
                          <Tooltip title="View Full Details">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => handleViewDetails(worker)}
                              sx={{
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: '#2563eb',
                                }
                              }}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Worker Details Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
          }
        }}
      >
        {selectedWorker && (
          <>
            <DialogTitle sx={{ 
              borderBottom: '1px solid',
              borderColor: 'divider',
              backgroundColor: '#f8fafc',
              py: 2
            }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: '#3b82f6', width: 48, height: 48 }}>
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {selectedWorker.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedWorker.id} • {selectedWorker.role}
                    </Typography>
                  </Box>
                </Stack>
                <IconButton onClick={handleCloseModal} size="small">
                  <Close />
                </IconButton>
              </Stack>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
              <Grid container>
                {/* Basic Information */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Basic Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <Badge />
                        </ListItemIcon>
                        <ListItemText primary="Employee ID" secondary={selectedWorker.id} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Work />
                        </ListItemIcon>
                        <ListItemText primary="Department" secondary={selectedWorker.department} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Business />
                        </ListItemIcon>
                        <ListItemText primary="Contractor" secondary={selectedProjectData?.contractor} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Construction />
                        </ListItemIcon>
                        <ListItemText primary="Project" secondary={selectedProjectData?.project} />
                      </ListItem>
                    </List>
                  </Box>
                </Grid>

                {/* Contact Information */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 3, backgroundColor: '#f8fafc' }}>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Contact Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Phone" secondary={selectedWorker.contact} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Email" secondary={selectedWorker.email} />
                      </ListItem>
                    </List>
                  </Box>
                </Grid>

                {/* Today's Attendance */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Today's Attendance
                    </Typography>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Status:</Typography>
                        {getStatusChip(selectedWorker.status)}
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Clock In:</Typography>
                        <Typography variant="body2" fontWeight="600">{selectedWorker.clockIn}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Clock Out:</Typography>
                        <Typography variant="body2" fontWeight="600">{selectedWorker.clockOut}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Total Hours:</Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight="600"
                          color={
                            selectedWorker.totalHours === "—" ? "error.main" : "success.main"
                          }
                        >
                          {selectedWorker.totalHours}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>

                {/* Compliance Status */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Compliance Status
                    </Typography>
                    <List dense>
                      {Object.entries(selectedWorker.complianceDetails).map(([key, detail]) => (
                        <ListItem key={key}>
                          {getComplianceIcon(key, detail.status)}
                          <ListItemText 
                            primary={key.toUpperCase()} 
                            secondary={
                              <Box>
                                <Typography variant="body2" component="span">
                                  Status: {detail.status}
                                </Typography>
                                {detail.expiry && (
                                  <Typography variant="caption" display="block" color="text.secondary">
                                    Expires: {detail.expiry}
                                  </Typography>
                                )}
                                {detail.lastIssued && (
                                  <Typography variant="caption" display="block" color="text.secondary">
                                    Last Issued: {detail.lastIssued}
                                  </Typography>
                                )}
                              </Box>
                            } 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Grid>

                {/* Recent Work History */}
                <Grid item xs={12}>
                  <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', backgroundColor: '#f8fafc' }}>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Recent Work History
                    </Typography>
                    <Stack spacing={1}>
                      {selectedWorker.workHistory.map((work, index) => (
                        <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">{work.date}</Typography>
                          <Typography variant="body2" fontWeight="500">{work.hours}</Typography>
                          <Typography variant="body2" color="text.secondary">{work.project}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Button onClick={handleCloseModal}>Close</Button>
              <Button variant="contained" color="primary">
                Print Details
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default DailyWorkforceDetails;