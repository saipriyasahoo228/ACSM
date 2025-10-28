import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Chip,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";

const DesignationMaster = () => {
  // live input groups before creating a record
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [levels, setLevels] = useState([]);
  const [reportingRoles, setReportingRoles] = useState([]);
  const [statuses, setStatuses] = useState([]);

  // single input values for "type and press Enter"
  const [input, setInput] = useState({});

  // saved records (each record is an object with arrays)
  const [records, setRecords] = useState([]);

  // edit mode for a particular record index and working copy for edits
  const [editingIndex, setEditingIndex] = useState(null);
  const [editCopy, setEditCopy] = useState(null);

  // Helper: handle Enter to add to a live group
  const handleKeyPressAdd = (e, fieldName, setter, values) => {
    if (e.key === "Enter" && (input[fieldName] && input[fieldName].trim() !== "")) {
      e.preventDefault();
      setter([...values, input[fieldName].trim()]);
      setInput({ ...input, [fieldName]: "" });
    }
  };

  // Remove chip from live group
  const handleDeleteLive = (value, setter, values) => {
    setter(values.filter((v) => v !== value));
  };

  // Submit: add a new record and reset live inputs
  const handleSubmit = () => {
    const payload = {
      departments: [...departments],
      designations: [...designations],
      levels: [...levels],
      reportingRoles: [...reportingRoles],
      statuses: [...statuses],
      createdAt: new Date().toISOString(),
    };
    setRecords([payload, ...records]); // newest first
    // reset live inputs and single input box
    setDepartments([]);
    setDesignations([]);
    setLevels([]);
    setReportingRoles([]);
    setStatuses([]);
    setInput({});
  };

  // Delete an entire record
  const handleDeleteRecord = (index) => {
    setRecords(records.filter((_, i) => i !== index));
    // if deleting the record currently being edited, cancel edit
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditCopy(null);
    } else if (editingIndex !== null && index < editingIndex) {
      // adjust editingIndex if a prior item removed
      setEditingIndex(editingIndex - 1);
    }
  };

  // Start editing a specific record: create working copy
  const handleEditRecord = (index) => {
    setEditingIndex(index);
    // deep copy arrays
    const r = records[index];
    setEditCopy({
      departments: [...r.departments],
      designations: [...r.designations],
      levels: [...r.levels],
      reportingRoles: [...r.reportingRoles],
      statuses: [...r.statuses],
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditCopy(null);
  };

  // Save edits back to records
  const handleSaveEdit = () => {
    if (editingIndex === null || !editCopy) return;
    const updated = [...records];
    updated[editingIndex] = {
      ...updated[editingIndex],
      departments: [...editCopy.departments],
      designations: [...editCopy.designations],
      levels: [...editCopy.levels],
      reportingRoles: [...editCopy.reportingRoles],
      statuses: [...editCopy.statuses],
      updatedAt: new Date().toISOString(),
    };
    setRecords(updated);
    setEditingIndex(null);
    setEditCopy(null);
  };

  // Add chip to editCopy field
  const addChipToEdit = (field, value) => {
    if (!value || value.trim() === "") return;
    setEditCopy({
      ...editCopy,
      [field]: [...editCopy[field], value.trim()],
    });
  };

  // Remove chip from editCopy field
  const removeChipFromEdit = (field, value) => {
    setEditCopy({
      ...editCopy,
      [field]: editCopy[field].filter((v) => v !== value),
    });
  };

  // Utility render function for live input groups (top form)
  const renderLiveGroup = (label, fieldName, values, setter, placeholder) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        placeholder={placeholder}
        value={input[fieldName] || ""}
        onChange={(e) => setInput({ ...input, [fieldName]: e.target.value })}
        onKeyDown={(e) => handleKeyPressAdd(e, fieldName, setter, values)}
        sx={{ mb: 1 }}
      />
      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          p: 1,
          borderRadius: 1,
          border: "1px solid #ddd",
        }}
      >
        {values.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No entries yet
          </Typography>
        ) : (
          values.map((v) => (
            <Chip
              key={v}
              label={v}
              onDelete={() => handleDeleteLive(v, setter, values)}
              sx={{
                backgroundColor: "#EAF2F8",
                color: "#0A3A6E",
                border: "1px solid #0A3A6E",
              }}
            />
          ))
        )}
      </Paper>
    </Box>
  );

  // Utility render function for showing chips (read-only)
  const renderChipsReadOnly = (arr) =>
    arr.length === 0 ? (
      <Typography variant="body2" color="text.secondary">
        -
      </Typography>
    ) : (
      arr.map((v) => (
        <Chip
          key={v}
          label={v}
          size="small"
          sx={{
            mr: 0.5,
            mb: 0.5,
            backgroundColor: "#F6F9FB",
            color: "#0A3A6E",
            border: "1px solid #E0E7EF",
          }}
        />
      ))
    );

  return (
    <Box sx={{ p: 3 }}>
      {/* Top card: enter master data */}
      <Card sx={{ border: "1px solid #0A3A6E", borderRadius: 2, mb: 3 }}>
        <CardHeader
          title={
            <Typography sx={{ color: "#0A3A6E", fontWeight: 700 }}>
              Designation Master Setup
            </Typography>
          }
          sx={{ backgroundColor: "#F3F7FA", borderBottom: "1px solid #e6eef6" }}
        />
        <CardContent>
          <Typography sx={{ mb: 2, color: "#555" }}>
            Type a value and press <b>Enter</b> to add it. When you're ready,
            click <b>Save Master Data</b> to create a record (the form will reset).
          </Typography>

          {renderLiveGroup(
            "Departments",
            "departments",
            departments,
            setDepartments,
            "Type and press Enter to add department"
          )}
          {renderLiveGroup(
            "Designations",
            "designations",
            designations,
            setDesignations,
            "Type and press Enter to add designation"
          )}
          {renderLiveGroup(
            "Levels",
            "levels",
            levels,
            setLevels,
            "Type and press Enter to add level"
          )}
          {renderLiveGroup(
            "Reporting Roles",
            "reportingRoles",
            reportingRoles,
            setReportingRoles,
            "Type and press Enter to add reporting role"
          )}
          {renderLiveGroup(
            "Statuses",
            "statuses",
            statuses,
            setStatuses,
            "Type and press Enter to add status"
          )}

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#0A3A6E",
                "&:hover": { backgroundColor: "#08314a" },
              }}
            >
              Save Master Data
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Report card: lists records with update/delete */}
      <Card sx={{ border: "1px solid #0A3A6E", borderRadius: 2 }}>
        <CardHeader
          title={
            <Typography sx={{ color: "#0A3A6E", fontWeight: 700 }}>
              Master Data Report
            </Typography>
          }
          sx={{ backgroundColor: "#F3F7FA", borderBottom: "1px solid #e6eef6" }}
        />
        <CardContent>
          <Table>
            <TableHead sx={{ backgroundColor: "#0A3A6E" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>
                  #
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>
                  Departments
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>
                  Designations
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>
                  Levels
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>
                  Reporting Roles
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>
                  Statuses
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No records yet. Save Master Data to create a record.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {records.map((rec, idx) => {
                const isEditing = editingIndex === idx;
                return (
                  <TableRow key={idx}>
                    <TableCell sx={{ width: 40 }}>{idx + 1}</TableCell>

                    {/* Departments */}
                    <TableCell sx={{ minWidth: 160 }}>
                      {isEditing ? (
                        <Box>
                          <TextField
                            placeholder="Add department and press Enter"
                            size="small"
                            value={input[`edit-dep-${idx}`] || ""}
                            onChange={(e) =>
                              setInput({
                                ...input,
                                [`edit-dep-${idx}`]: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const v = (input[`edit-dep-${idx}`] || "")
                                  .trim();
                                if (v) {
                                  setEditCopy({
                                    ...editCopy,
                                    departments: [...editCopy.departments, v],
                                  });
                                  setInput({
                                    ...input,
                                    [`edit-dep-${idx}`]: "",
                                  });
                                }
                              }
                            }}
                            sx={{ mb: 1, width: "100%" }}
                          />
                          <Paper
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                              p: 0.5,
                            }}
                          >
                            {editCopy.departments.length === 0 ? (
                              <Typography variant="body2" color="text.secondary">
                                -
                              </Typography>
                            ) : (
                              editCopy.departments.map((v) => (
                                <Chip
                                  key={v}
                                  label={v}
                                  onDelete={() =>
                                    removeChipFromEdit("departments", v)
                                  }
                                  size="small"
                                  sx={{
                                    backgroundColor: "#EAF2F8",
                                    color: "#0A3A6E",
                                    border: "1px solid #0A3A6E",
                                  }}
                                />
                              ))
                            )}
                          </Paper>
                        </Box>
                      ) : (
                        <Box>{renderChipsReadOnly(rec.departments)}</Box>
                      )}
                    </TableCell>

                    {/* Designations */}
                    <TableCell sx={{ minWidth: 160 }}>
                      {isEditing ? (
                        <Box>
                          <TextField
                            placeholder="Add designation and press Enter"
                            size="small"
                            value={input[`edit-des-${idx}`] || ""}
                            onChange={(e) =>
                              setInput({
                                ...input,
                                [`edit-des-${idx}`]: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const v = (input[`edit-des-${idx}`] || "").trim();
                                if (v) {
                                  setEditCopy({
                                    ...editCopy,
                                    designations: [...editCopy.designations, v],
                                  });
                                  setInput({
                                    ...input,
                                    [`edit-des-${idx}`]: "",
                                  });
                                }
                              }
                            }}
                            sx={{ mb: 1, width: "100%" }}
                          />
                          <Paper sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, p: 0.5 }}>
                            {editCopy.designations.length === 0 ? (
                              <Typography variant="body2" color="text.secondary">-</Typography>
                            ) : (
                              editCopy.designations.map((v) => (
                                <Chip
                                  key={v}
                                  label={v}
                                  onDelete={() => removeChipFromEdit("designations", v)}
                                  size="small"
                                  sx={{ backgroundColor: "#EAF2F8", color: "#0A3A6E", border: "1px solid #0A3A6E" }}
                                />
                              ))
                            )}
                          </Paper>
                        </Box>
                      ) : (
                        <Box>{renderChipsReadOnly(rec.designations)}</Box>
                      )}
                    </TableCell>

                    {/* Levels */}
                    <TableCell sx={{ minWidth: 120 }}>
                      {isEditing ? (
                        <Box>
                          <TextField
                            placeholder="Add level and press Enter"
                            size="small"
                            value={input[`edit-lvl-${idx}`] || ""}
                            onChange={(e) =>
                              setInput({
                                ...input,
                                [`edit-lvl-${idx}`]: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const v = (input[`edit-lvl-${idx}`] || "").trim();
                                if (v) {
                                  setEditCopy({
                                    ...editCopy,
                                    levels: [...editCopy.levels, v],
                                  });
                                  setInput({
                                    ...input,
                                    [`edit-lvl-${idx}`]: "",
                                  });
                                }
                              }
                            }}
                            sx={{ mb: 1, width: "100%" }}
                          />
                          <Paper sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, p: 0.5 }}>
                            {editCopy.levels.length === 0 ? (
                              <Typography variant="body2" color="text.secondary">-</Typography>
                            ) : (
                              editCopy.levels.map((v) => (
                                <Chip
                                  key={v}
                                  label={v}
                                  onDelete={() => removeChipFromEdit("levels", v)}
                                  size="small"
                                  sx={{ backgroundColor: "#EAF2F8", color: "#0A3A6E", border: "1px solid #0A3A6E" }}
                                />
                              ))
                            )}
                          </Paper>
                        </Box>
                      ) : (
                        <Box>{renderChipsReadOnly(rec.levels)}</Box>
                      )}
                    </TableCell>

                    {/* Reporting Roles */}
                    <TableCell sx={{ minWidth: 160 }}>
                      {isEditing ? (
                        <Box>
                          <TextField
                            placeholder="Add reporting role and press Enter"
                            size="small"
                            value={input[`edit-rr-${idx}`] || ""}
                            onChange={(e) =>
                              setInput({
                                ...input,
                                [`edit-rr-${idx}`]: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const v = (input[`edit-rr-${idx}`] || "").trim();
                                if (v) {
                                  setEditCopy({
                                    ...editCopy,
                                    reportingRoles: [...editCopy.reportingRoles, v],
                                  });
                                  setInput({
                                    ...input,
                                    [`edit-rr-${idx}`]: "",
                                  });
                                }
                              }
                            }}
                            sx={{ mb: 1, width: "100%" }}
                          />
                          <Paper sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, p: 0.5 }}>
                            {editCopy.reportingRoles.length === 0 ? (
                              <Typography variant="body2" color="text.secondary">-</Typography>
                            ) : (
                              editCopy.reportingRoles.map((v) => (
                                <Chip
                                  key={v}
                                  label={v}
                                  onDelete={() => removeChipFromEdit("reportingRoles", v)}
                                  size="small"
                                  sx={{ backgroundColor: "#EAF2F8", color: "#0A3A6E", border: "1px solid #0A3A6E" }}
                                />
                              ))
                            )}
                          </Paper>
                        </Box>
                      ) : (
                        <Box>{renderChipsReadOnly(rec.reportingRoles)}</Box>
                      )}
                    </TableCell>

                    {/* Statuses */}
                    <TableCell sx={{ minWidth: 140 }}>
                      {isEditing ? (
                        <Box>
                          <TextField
                            placeholder="Add status and press Enter"
                            size="small"
                            value={input[`edit-st-${idx}`] || ""}
                            onChange={(e) =>
                              setInput({
                                ...input,
                                [`edit-st-${idx}`]: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const v = (input[`edit-st-${idx}`] || "").trim();
                                if (v) {
                                  setEditCopy({
                                    ...editCopy,
                                    statuses: [...editCopy.statuses, v],
                                  });
                                  setInput({
                                    ...input,
                                    [`edit-st-${idx}`]: "",
                                  });
                                }
                              }
                            }}
                            sx={{ mb: 1, width: "100%" }}
                          />
                          <Paper sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, p: 0.5 }}>
                            {editCopy.statuses.length === 0 ? (
                              <Typography variant="body2" color="text.secondary">-</Typography>
                            ) : (
                              editCopy.statuses.map((v) => (
                                <Chip
                                  key={v}
                                  label={v}
                                  onDelete={() => removeChipFromEdit("statuses", v)}
                                  size="small"
                                  sx={{ backgroundColor: "#EAF2F8", color: "#0A3A6E", border: "1px solid #0A3A6E" }}
                                />
                              ))
                            )}
                          </Paper>
                        </Box>
                      ) : (
                        <Box>{renderChipsReadOnly(rec.statuses)}</Box>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell sx={{ minWidth: 140 }}>
                      {isEditing ? (
                        <Stack direction="row" spacing={1}>
                          <Button
                            startIcon={<Save />}
                            size="small"
                            variant="contained"
                            onClick={handleSaveEdit}
                            sx={{ backgroundColor: "#0A3A6E", "&:hover": { backgroundColor: "#08314a" } }}
                          >
                            Save
                          </Button>
                          <Button
                            startIcon={<Cancel />}
                            size="small"
                            variant="outlined"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        </Stack>
                      ) : (
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            onClick={() => handleEditRecord(idx)}
                            sx={{ color: "#0A3A6E" }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteRecord(idx)}
                            sx={{ color: "#D32F2F" }}
                          >
                            <Delete />
                          </IconButton>
                        </Stack>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DesignationMaster;
