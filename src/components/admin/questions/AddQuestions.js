"use client";
import React, { useState, useEffect } from "react";
import {
  Box, Button, Typography, Grid, TextField, MenuItem, Paper, CircularProgress, Chip
} from "@mui/material";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// --- ENUMS / DROPDOWN DATA ---
const QUESTION_TYPES = [
  { value: 1, label: "General" },
  { value: 2, label: "Vital" },
];

const RAG_TYPES = [
  { value: 1, label: "Green" },
  { value: 2, label: "Amber" },
  { value: 3, label: "Red" },
];

// --- Utility for token (edit as needed) ---
function getToken() {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return "";
}

// --- Initial state for a question ---
const initialQuestion = {
  text: "",
  sequence: 0,
  isAlwaysShown: false,
  nextDefaultQuestionID: null,
  questionType: 1,
  answers: [
    {
      text: "",
      rag: 1,
      nextQuestionID: null,
      alertID: null,
      instructionID: null,
      instruction: { instructionText: "" }, // id removed
      alert: { text: "", contactInfo: "" }, // id removed
    },
  ],
  questionnaireID: null,
};

const AddQuestions = () => {
  const [saving, setSaving] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [loadingLookups, setLoadingLookups] = useState(true);

  // --- Fetch dropdown data (Alerts, Instructions, Questionnaires) ---
  useEffect(() => {
    setLoadingLookups(true);
    async function fetchLookups() {
      try {
        const token = getToken();
        const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
        const [aRes, iRes, qnRes] = await Promise.all([
          axios.get(`${API_BASE}/Alert`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_BASE}/Instruction`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_BASE}/Questionnaire`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setAlerts(Array.isArray(aRes.data) ? aRes.data : aRes.data.data || []);
        setInstructions(Array.isArray(iRes.data) ? iRes.data : iRes.data.data || []);
        setQuestionnaires(Array.isArray(qnRes.data) ? qnRes.data : qnRes.data.data || []);
      } catch {
        toast.error("Failed to fetch lookup data.");
      } finally {
        setLoadingLookups(false);
      }
    }
    fetchLookups();
  }, []);

  // --- Formik setup ---
  const formik = useFormik({
    initialValues: initialQuestion,
    validationSchema: Yup.object({
      text: Yup.string().required("Question text is required"),
      sequence: Yup.number().min(0, "Sequence must be >= 0").required("Sequence is required"),
      isAlwaysShown: Yup.boolean(),
      nextDefaultQuestionID: Yup.number().nullable(),
      questionType: Yup.number().required("Type is required"),
      questionnaireID: Yup.number().nullable(),
      answers: Yup.array().of(
        Yup.object().shape({
          text: Yup.string().required("Answer text is required"),
          rag: Yup.number().required("RAG is required"),
          nextQuestionID: Yup.number().nullable(),
          alertID: Yup.number().nullable(),
          instructionID: Yup.number().nullable(),
        })
      ).min(1, "At least one answer is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSaving(true);
      try {
        const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
        const token = getToken();

        // --- Clean payload: REMOVE any "id" fields from answers, root, instruction, alert ---
        const cleaned = {
          ...values,
          // DO NOT SEND root "id"
          answers: values.answers.map(a => ({
            text: a.text,
            rag: a.rag,
            nextQuestionID: a.nextQuestionID === "" ? null : a.nextQuestionID,
            alertID: a.alertID === "" ? null : a.alertID,
            instructionID: a.instructionID === "" ? null : a.instructionID,
            // These sub-objects are optional as per your backend, but we'll remove any id
            instruction: a.instruction && a.instruction.instructionText
              ? { instructionText: a.instruction.instructionText }
              : undefined,
            alert: a.alert && (a.alert.text || a.alert.contactInfo)
              ? { text: a.alert.text, contactInfo: a.alert.contactInfo }
              : undefined,
          })),
        };

        await axios.post(`${API_BASE}/Question`, cleaned, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Question created!");
        resetForm();
      } catch (err) {
        toast.error("Failed to create question");
      } finally {
        setSaving(false);
      }
    },
  });

  // --- Render ---
  return (
    <Paper sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 4, borderRadius: 3, boxShadow: 4 }}>
      <Toaster position="top-right" />
      <Typography variant="h5" fontWeight={700} mb={3}>Add New Question</Typography>
      {loadingLookups ? (
        <Box display="flex" alignItems="center" justifyContent="center" py={8}>
          <CircularProgress size={40} color="primary" />
        </Box>
      ) : (
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                label="Question Text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                error={formik.touched.text && !!formik.errors.text}
                helperText={formik.touched.text && formik.errors.text}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Sequence"
                name="sequence"
                type="number"
                value={formik.values.sequence}
                onChange={formik.handleChange}
                error={formik.touched.sequence && !!formik.errors.sequence}
                helperText={formik.touched.sequence && formik.errors.sequence}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Type"
                name="questionType"
                value={formik.values.questionType}
                onChange={formik.handleChange}
                error={formik.touched.questionType && !!formik.errors.questionType}
                helperText={formik.touched.questionType && formik.errors.questionType}
                fullWidth
                required
              >
                {QUESTION_TYPES.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Always Shown?"
                name="isAlwaysShown"
                value={formik.values.isAlwaysShown ? "yes" : "no"}
                onChange={e => formik.setFieldValue("isAlwaysShown", e.target.value === "yes")}
                fullWidth
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Next Default Question ID"
                name="nextDefaultQuestionID"
                type="number"
                value={formik.values.nextDefaultQuestionID ?? ""}
                onChange={formik.handleChange}
                error={formik.touched.nextDefaultQuestionID && !!formik.errors.nextDefaultQuestionID}
                helperText={formik.touched.nextDefaultQuestionID && formik.errors.nextDefaultQuestionID}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Questionnaire"
                name="questionnaireID"
                value={formik.values.questionnaireID ?? ""}
                onChange={formik.handleChange}
                error={formik.touched.questionnaireID && !!formik.errors.questionnaireID}
                helperText={formik.touched.questionnaireID && formik.errors.questionnaireID}
                fullWidth
              >
                <MenuItem value="">None</MenuItem>
                {questionnaires.map(qn => (
                  <MenuItem key={qn.id} value={qn.id}>{qn.title}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Answers Section */}
            <Grid item xs={12}>
              <Typography fontWeight="bold" mt={2} mb={1}>Answers</Typography>
              <FieldArray
                name="answers"
                render={arrayHelpers => (
                  <>
                    {formik.values.answers.map((a, idx) => (
                      <Paper
                        key={idx}
                        sx={{
                          p: 2, mb: 2,
                          border: "1px solid #e5e7eb",
                          borderRadius: 2,
                          background: "#fafcff"
                        }}
                        elevation={0}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Answer Text"
                              name={`answers[${idx}].text`}
                              value={a.text}
                              onChange={formik.handleChange}
                              error={formik.touched.answers?.[idx]?.text && !!formik.errors.answers?.[idx]?.text}
                              helperText={formik.touched.answers?.[idx]?.text && formik.errors.answers?.[idx]?.text}
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField
                              select
                              label="RAG"
                              name={`answers[${idx}].rag`}
                              value={a.rag}
                              onChange={formik.handleChange}
                              fullWidth
                              required
                            >
                              {RAG_TYPES.map(opt => (
                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField
                              label="Next QID"
                              name={`answers[${idx}].nextQuestionID`}
                              type="number"
                              value={a.nextQuestionID ?? ""}
                              onChange={formik.handleChange}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField
                              select
                              label="Alert"
                              name={`answers[${idx}].alertID`}
                              value={a.alertID ?? ""}
                              onChange={formik.handleChange}
                              fullWidth
                            >
                              <MenuItem value="">None</MenuItem>
                              {alerts.map(al => (
                                <MenuItem key={al.id} value={al.id}>{al.text}</MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField
                              select
                              label="Instruction"
                              name={`answers[${idx}].instructionID`}
                              value={a.instructionID ?? ""}
                              onChange={formik.handleChange}
                              fullWidth
                            >
                              <MenuItem value="">None</MenuItem>
                              {instructions.map(ins => (
                                <MenuItem key={ins.id} value={ins.id}>{ins.instructionText}</MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Button
                              onClick={() => arrayHelpers.remove(idx)}
                              size="small"
                              color="error"
                              variant="outlined"
                              sx={{ mt: 1 }}
                              disabled={formik.values.answers.length === 1}
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                    <Button
                      onClick={() => arrayHelpers.push({
                        text: "",
                        rag: 1,
                        nextQuestionID: null,
                        alertID: null,
                        instructionID: null,
                        instruction: { instructionText: "" },
                        alert: { text: "", contactInfo: "" },
                      })}
                      variant="outlined"
                      color="primary"
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      Add Answer
                    </Button>
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12} textAlign="right">
              <Button
                type="button"
                onClick={() => formik.resetForm()}
                variant="outlined"
                color="secondary"
                sx={{ mr: 2, borderRadius: 2, fontWeight: 600 }}
                disabled={saving}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                startIcon={saving && <CircularProgress size={18} color="inherit" />}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
              >
                {saving ? "Saving..." : "Create Question"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
      )}
    </Paper>
  );
};

export default AddQuestions;
