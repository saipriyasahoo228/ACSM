import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  ExpandMore,
  Close,
  Visibility,
} from "@mui/icons-material";

const TrainingPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [selectedProgramName, setSelectedProgramName] = useState("");

  const [formData, setFormData] = useState({
    mode: "Online", // NEW FIELD
    name: "",
    site: "",
    trade: "",
    language: "EN",
    videoUrl: "",
    documentsUrl: "",
    description: "",
    validityDays: 30,
    quizQuestions: [],
    // Offline fields
    trainer: "",
    date: "",
    duration: "",
    attendees: "",
  });

  const languages = [
    { code: "EN", label: "English" },
    { code: "HI", label: "Hindi" },
    { code: "OD", label: "Odia" },
    { code: "BN", label: "Bengali" },
    { code: "TA", label: "Tamil" },
    { code: "MR", label: "Marathi" },
  ];

  // Open Add/Edit dialog
  const handleOpen = (program = null, index = null) => {
    if (program) {
      setFormData(program);
      setEditIndex(index);
    } else {
      setFormData({
        mode: "Online",
        name: "",
        site: "",
        trade: "",
        language: "EN",
        videoUrl: "",
        documentsUrl: "",
        description: "",
        validityDays: 30,
        quizQuestions: [],
        trainer: "",
        date: "",
        duration: "",
        attendees: "",
      });
      setEditIndex(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      mode: "Online",
      name: "",
      site: "",
      trade: "",
      language: "EN",
      videoUrl: "",
      documentsUrl: "",
      description: "",
      validityDays: 30,
      quizQuestions: [],
      trainer: "",
      date: "",
      duration: "",
      attendees: "",
    });
    setEditIndex(null);
  };

  // Save program
  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...programs];
      updated[editIndex] = formData;
      setPrograms(updated);
    } else {
      setPrograms([...programs, formData]);
    }
    handleClose();
  };

  const handleDeleteProgram = (index) => {
    const updated = [...programs];
    updated.splice(index, 1);
    setPrograms(updated);
  };

  // Quiz handlers
  const addQuestion = () => {
    setFormData({
      ...formData,
      quizQuestions: [
        ...formData.quizQuestions,
        { question: "", options: ["", "", "", ""], correct: "" },
      ],
    });
  };

  const updateQuestion = (qIndex, key, value) => {
    const updatedQuestions = [...formData.quizQuestions];
    updatedQuestions[qIndex][key] = value;
    setFormData({ ...formData, quizQuestions: updatedQuestions });
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updatedQuestions = [...formData.quizQuestions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setFormData({ ...formData, quizQuestions: updatedQuestions });
  };

  const removeQuestion = (qIndex) => {
    const updatedQuestions = [...formData.quizQuestions];
    updatedQuestions.splice(qIndex, 1);
    setFormData({ ...formData, quizQuestions: updatedQuestions });
  };

  // View Quiz Dialog
  const handleViewQuiz = (program) => {
    setSelectedQuiz(program.quizQuestions || []);
    setSelectedProgramName(program.name);
    setQuizOpen(true);
  };

  const handleCloseQuiz = () => {
    setQuizOpen(false);
    setSelectedQuiz([]);
    setSelectedProgramName("");
  };

  return (
    <Box p={3}>
      <Card
      sx={{
          borderLeft: "6px solid #082A52",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Training Programs</Typography>
            <Button
              startIcon={<Add />}
              onClick={() => handleOpen()}
              sx={{ color: "#0E4C92" }}
            >
              Add Program
            </Button>
          </Box>

          {/* Table of programs */}
          <Table>
            <TableHead sx={{ background: "#E3EAFD" }}>
              <TableRow>
                <TableCell>Mode</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Site</TableCell>
                <TableCell>Trade</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Validity</TableCell>
                <TableCell>Quiz</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {programs.map((program, index) => (
                <TableRow key={index}>
                  <TableCell>{program.mode}</TableCell>
                  <TableCell>{program.name}</TableCell>
                  <TableCell>{program.site}</TableCell>
                  <TableCell>{program.trade}</TableCell>
                  <TableCell>{program.language}</TableCell>
                  <TableCell>
                    {program.mode === "Online" ? (
                      <>
                        {program.videoUrl ? (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Visibility />}
                            sx={{ color: "#7267EF", borderColor: "#7267EF" }}
                            href={program.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Video
                          </Button>
                        ) : (
                          "No Video"
                        )}
                        {" | "}
                        {program.documentsUrl ? (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Visibility />}
                            sx={{ color: "#28a745", borderColor: "#28a745" }}
                            href={program.documentsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Docs
                          </Button>
                        ) : (
                          "No Docs"
                        )}
                      </>
                    ) : (
                      <>
                        <Typography variant="body2">
                          Trainer: {program.trainer || "-"}
                        </Typography>
                        <Typography variant="body2">
                          Date: {program.date || "-"}
                        </Typography>
                        <Typography variant="body2">
                          Duration: {program.duration || "-"} hrs
                        </Typography>
                  
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    {program.mode === "Online"
                      ? program.validityDays
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {program.mode === "Online" &&
                    program.quizQuestions &&
                    program.quizQuestions.length > 0 ? (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => handleViewQuiz(program)}
                        sx={{ color: "#0E4C92" }}
                      >
                        View Quiz
                      </Button>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        {program.mode === "Online" ? "No quiz" : "N/A"}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(program, index)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteProgram(index)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {programs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No training programs added yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Program Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editIndex !== null ? "Edit Program" : "Add Program"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            {/* Mode */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Training Mode"
                value={formData.mode}
                onChange={(e) =>
                  setFormData({ ...formData, mode: e.target.value })
                }
              >
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
              </TextField>
            </Grid>

            {/* Common fields */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Program Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Site"
                value={formData.site}
                onChange={(e) =>
                  setFormData({ ...formData, site: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Trade"
                value={formData.trade}
                onChange={(e) =>
                  setFormData({ ...formData, trade: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Language"
                value={formData.language}
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Online fields */}
            {formData.mode === "Online" && (
              <>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Video URL"
                    value={formData.videoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, videoUrl: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Documents URL"
                    value={formData.documentsUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, documentsUrl: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    fullWidth
                    label="Validity (Days)"
                    value={formData.validityDays}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        validityDays: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={3}
                    fullWidth
                    label="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </Grid>

                {/* Quiz Builder */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" mb={1}>
                    Quiz Questions
                  </Typography>
                  {formData.quizQuestions.map((q, qIndex) => (
                    <Accordion key={qIndex} sx={{ mb: 1 }}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        {q.question || `Question ${qIndex + 1}`}
                      </AccordionSummary>
                      <AccordionDetails>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeQuestion(qIndex)}
                          sx={{ float: "right", mb: 1 }}
                        >
                          <Close />
                        </IconButton>
                        <TextField
                          fullWidth
                          label="Question Text"
                          value={q.question}
                          onChange={(e) =>
                            updateQuestion(qIndex, "question", e.target.value)
                          }
                          margin="dense"
                        />
                        <Grid container spacing={1} mt={1}>
                          {q.options.map((opt, oIndex) => (
                            <Grid item xs={6} key={oIndex}>
                              <TextField
                                fullWidth
                                label={`Option ${oIndex + 1}`}
                                value={opt}
                                onChange={(e) =>
                                  updateOption(qIndex, oIndex, e.target.value)
                                }
                              />
                            </Grid>
                          ))}
                        </Grid>
                        <FormControl component="fieldset" sx={{ mt: 1 }}>
                          <FormLabel component="legend">
                            Correct Answer
                          </FormLabel>
                          <RadioGroup
                            row
                            value={q.correct}
                            onChange={(e) =>
                              updateQuestion(qIndex, "correct", e.target.value)
                            }
                          >
                            {q.options.map((opt, i) => (
                              <FormControlLabel
                                key={i}
                                value={opt}
                                control={<Radio />}
                                label={opt || `Option ${i + 1}`}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={addQuestion}
                    sx={{ color: "#0E4C92" }}
                  >
                    Add Question
                  </Button>
                </Grid>
              </>
            )}

            {/* Offline fields */}
            {formData.mode === "Offline" && (
              <>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Trainer Name"
                    value={formData.trainer}
                    onChange={(e) =>
                      setFormData({ ...formData, trainer: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="date"
                    fullWidth
                    label="Training Date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Duration (Hours)"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={handleSave}
            sx={{ color: "#0E4C92" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Quiz Dialog */}
      <Dialog open={quizOpen} onClose={handleCloseQuiz} maxWidth="sm" fullWidth>
        <DialogTitle>Quiz: {selectedProgramName}</DialogTitle>
        <DialogContent dividers>
          {selectedQuiz.length > 0 ? (
            selectedQuiz.map((q, index) => (
              <Box
                key={index}
                mb={2}
                p={1}
                border="1px solid #ccc"
                borderRadius={2}
              >
                <Typography variant="subtitle1">
                  Q{index + 1}: {q.question}
                </Typography>
                <ul>
                  {q.options.map((opt, i) => (
                    <li key={i}>
                      {opt} {opt === q.correct && <b>(Correct)</b>}
                    </li>
                  ))}
                </ul>
              </Box>
            ))
          ) : (
            <Typography>No quiz questions available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQuiz}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TrainingPrograms;
