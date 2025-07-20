// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Typography, Modal, Grid, TextField, IconButton, Table, TableContainer,
//   TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Tooltip, MenuItem, Chip
// } from "@mui/material";
// import { Add, Edit, Delete } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useFormik, FieldArray, FormikProvider } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";
// import ClipLoader from "react-spinners/ClipLoader";

// // -- API & Types --
// const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Question`;
// const QUESTION_TYPES = [
//   { value: 1, label: "Single Choice" },
//   { value: 2, label: "Multi Choice" },
//   { value: 3, label: "Text" }
// ];
// const initialQuestion = {
//   text: "",
//   sequence: 0,
//   isAlwaysShown: false,
//   nextDefaultQuestionID: 0,
//   questionType: 1,
//   answers: [
//     {
//       text: "",
//       rag: 1,
//       nextQuestionID: 0,
//       alertID: 0,
//       instructionID: 0,
//       instruction: { instructionText: "" },
//       alert: { text: "", contactInfo: "" }
//     }
//   ],
//   questionnaireID: 0,
// };

// export default function Questions() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editQuestion, setEditQuestion] = useState(null);
//   const [saving, setSaving] = useState(false);

//   const getToken = () => localStorage.getItem("token");

//   // Fetch Questions
//   const fetchQuestions = async () => {
//     setLoading(true);
//     try {
//       const token = getToken();
//       const { data } = await axios.get(API_URL, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setQuestions(data || []);
//     } catch (err) {
//       if (err?.response?.status === 401) toast.error("Session expired. Login again.");
//       else toast.error("Failed to fetch questions.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchQuestions(); }, []);

//   // Formik + Yup
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: editQuestion ? { ...editQuestion } : initialQuestion,
//     validationSchema: Yup.object({
//       text: Yup.string().required("Question is required"),
//       sequence: Yup.number().min(0).required("Sequence required"),
//       isAlwaysShown: Yup.boolean(),
//       nextDefaultQuestionID: Yup.number().min(0),
//       questionType: Yup.number().required("Type required"),
//       answers: Yup.array().of(
//         Yup.object().shape({
//           text: Yup.string().required("Answer text required"),
//           rag: Yup.number().required(),
//           nextQuestionID: Yup.number(),
//           alertID: Yup.number(),
//           instructionID: Yup.number(),
//           instruction: Yup.object().shape({
//             instructionText: Yup.string()
//           }),
//           alert: Yup.object().shape({
//             text: Yup.string(),
//             contactInfo: Yup.string()
//           }),
//         })
//       ),
//       questionnaireID: Yup.number(),
//     }),
//     onSubmit: async (values) => {
//       setSaving(true);
//       const token = getToken();
//       try {
//         if (editQuestion) {
//           await axios.put(`${API_URL}/${editQuestion.id}`, values, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Question updated!");
//         } else {
//           await axios.post(API_URL, values, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Question created!");
//         }
//         setModalOpen(false);
//         setEditQuestion(null);
//         fetchQuestions();
//       } catch (err) {
//         if (err?.response?.status === 401) toast.error("Session expired. Login again.");
//         else toast.error("Something went wrong.");
//       } finally {
//         setSaving(false);
//       }
//     },
//   });

//   // Delete
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Delete Question?",
//       text: "Are you sure you want to delete this question?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d32f2f",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       reverseButtons: true,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const token = getToken();
//         try {
//           await axios.delete(`${API_URL}/${id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Question deleted!");
//           fetchQuestions();
//         } catch (err) {
//           if (err?.response?.status === 401) toast.error("Session expired. Login again.");
//           else toast.error("Delete failed.");
//         }
//       }
//     });
//   };

//   const openEditModal = (q) => { setEditQuestion(q); setModalOpen(true); };
//   const openAddModal = () => { setEditQuestion(null); setModalOpen(true); };

//   // Modern MUI Modal Style
//   const modalStyle = {
//     position: "absolute",
//     top: "50%", left: "50%", transform: "translate(-50%, -50%)",
//     width: "96vw", maxWidth: 760, bgcolor: "background.paper", boxShadow: 24,
//     borderRadius: 3, p: 3, maxHeight: "90vh", overflow: "auto"
//   };

//   return (
//     <Box p={2} sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
//       <Toaster position="top-right" />
//       <Box
//         component={motion.div}
//         initial={{ opacity: 0, y: -18 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         mb={3}
//         display="flex"
//         alignItems="center"
//         gap={2}
//         justifyContent="space-between"
//       >
//         <Typography variant="h4" fontWeight="bold" color="primary">
//           Questions Management
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={openAddModal}
//           sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
//         >
//           Add Question
//         </Button>
//       </Box>
//       <Paper
//         component={motion.div}
//         initial={{ opacity: 0, scale: 0.97 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         sx={{ boxShadow: 2, borderRadius: 3, overflow: "auto" }}
//       >
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" p={6}>
//             <ClipLoader color="#1976d2" size={50} />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>#</TableCell>
//                   <TableCell>Question</TableCell>
//                   <TableCell>Seq</TableCell>
//                   <TableCell>Type</TableCell>
//                   <TableCell>Always?</TableCell>
//                   <TableCell>Answers</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {questions.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center">No records found.</TableCell>
//                   </TableRow>
//                 ) : (
//                   questions.map((q, idx) => (
//                     <TableRow key={q.id}>
//                       <TableCell>{idx + 1}</TableCell>
//                       <TableCell>{q.text}</TableCell>
//                       <TableCell>{q.sequence}</TableCell>
//                       <TableCell>
//                         <Chip label={QUESTION_TYPES.find(t => t.value === q.questionType)?.label || q.questionType} size="small" />
//                       </TableCell>
//                       <TableCell>
//                         {q.isAlwaysShown ? <Chip label="Yes" color="success" size="small" /> : <Chip label="No" color="default" size="small" />}
//                       </TableCell>
//                       <TableCell>
//                         {q.answers?.map((a, i) =>
//                           <Chip key={i} label={a.text} color="info" size="small" sx={{ mr: 0.5, mb: 0.5 }} />
//                         )}
//                       </TableCell>
//                       <TableCell align="center">
//                         <Tooltip title="Edit" arrow>
//                           <IconButton onClick={() => openEditModal(q)} size="small" color="primary">
//                             <Edit />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete" arrow>
//                           <IconButton
//                             onClick={() => handleDelete(q.id)}
//                             size="small"
//                             color="error"
//                           >
//                             <Delete />
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>
//       {/* Add/Edit Modal */}
//       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//         <Box sx={modalStyle} component={motion.div}>
//           <Typography variant="h6" mb={2} fontWeight="bold">
//             {editQuestion ? "Edit Question" : "Add Question"}
//           </Typography>
//           <FormikProvider value={formik}>
//             <form onSubmit={formik.handleSubmit}>
//               <Grid container columns={12} columnSpacing={2} rowSpacing={2}>
//                 {/* -- Top Row -- */}
//                 <Grid item gridColumn="span 8">
//                   <TextField
//                     label="Question Text"
//                     name="text"
//                     value={formik.values.text}
//                     onChange={formik.handleChange}
//                     error={formik.touched.text && !!formik.errors.text}
//                     helperText={formik.touched.text && formik.errors.text}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item gridColumn="span 2">
//                   <TextField
//                     label="Sequence"
//                     name="sequence"
//                     type="number"
//                     value={formik.values.sequence}
//                     onChange={formik.handleChange}
//                     error={formik.touched.sequence && !!formik.errors.sequence}
//                     helperText={formik.touched.sequence && formik.errors.sequence}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item gridColumn="span 2">
//                   <TextField
//                     select
//                     label="Type"
//                     name="questionType"
//                     value={formik.values.questionType}
//                     onChange={formik.handleChange}
//                     error={formik.touched.questionType && !!formik.errors.questionType}
//                     helperText={formik.touched.questionType && formik.errors.questionType}
//                     fullWidth
//                   >
//                     {QUESTION_TYPES.map(opt => (
//                       <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 {/* -- Row 2 -- */}
//                 <Grid item gridColumn="span 2">
//                   <TextField
//                     select
//                     label="Always Shown?"
//                     name="isAlwaysShown"
//                     value={formik.values.isAlwaysShown ? "yes" : "no"}
//                     onChange={e => formik.setFieldValue("isAlwaysShown", e.target.value === "yes")}
//                     fullWidth
//                   >
//                     <MenuItem value="yes">Yes</MenuItem>
//                     <MenuItem value="no">No</MenuItem>
//                   </TextField>
//                 </Grid>
//                 <Grid item gridColumn="span 3">
//                   <TextField
//                     label="Next Default Q ID"
//                     name="nextDefaultQuestionID"
//                     type="number"
//                     value={formik.values.nextDefaultQuestionID}
//                     onChange={formik.handleChange}
//                     error={formik.touched.nextDefaultQuestionID && !!formik.errors.nextDefaultQuestionID}
//                     helperText={formik.touched.nextDefaultQuestionID && formik.errors.nextDefaultQuestionID}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item gridColumn="span 3">
//                   <TextField
//                     label="Questionnaire ID"
//                     name="questionnaireID"
//                     type="number"
//                     value={formik.values.questionnaireID}
//                     onChange={formik.handleChange}
//                     error={formik.touched.questionnaireID && !!formik.errors.questionnaireID}
//                     helperText={formik.touched.questionnaireID && formik.errors.questionnaireID}
//                     fullWidth
//                   />
//                 </Grid>
//                 {/* -- Answers Section -- */}
//                 <Grid item gridColumn="span 12">
//                   <Typography fontWeight="bold" mb={1} mt={2}>Answers</Typography>
//                   <FieldArray
//                     name="answers"
//                     render={arrayHelpers => (
//                       <>
//                         {formik.values.answers.map((a, idx) => (
//                           <Grid container columns={12} columnSpacing={2} key={idx} sx={{ mb: 1 }}>
//                             <Grid item gridColumn="span 4">
//                               <TextField
//                                 label="Answer Text"
//                                 name={`answers[${idx}].text`}
//                                 value={a.text}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched.answers?.[idx]?.text && !!formik.errors.answers?.[idx]?.text}
//                                 helperText={formik.touched.answers?.[idx]?.text && formik.errors.answers?.[idx]?.text}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item gridColumn="span 2">
//                               <TextField
//                                 label="RAG"
//                                 name={`answers[${idx}].rag`}
//                                 type="number"
//                                 value={a.rag}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item gridColumn="span 2">
//                               <TextField
//                                 label="Next QID"
//                                 name={`answers[${idx}].nextQuestionID`}
//                                 type="number"
//                                 value={a.nextQuestionID}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item gridColumn="span 2">
//                               <TextField
//                                 label="Alert ID"
//                                 name={`answers[${idx}].alertID`}
//                                 type="number"
//                                 value={a.alertID}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item gridColumn="span 2">
//                               <TextField
//                                 label="Instr ID"
//                                 name={`answers[${idx}].instructionID`}
//                                 type="number"
//                                 value={a.instructionID}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item gridColumn="span 4">
//                               <TextField
//                                 label="Instr Text"
//                                 name={`answers[${idx}].instruction.instructionText`}
//                                 value={a.instruction?.instructionText || ""}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item gridColumn="span 3">
//                               <TextField
//                                 label="Alert Text"
//                                 name={`answers[${idx}].alert.text`}
//                                 value={a.alert?.text || ""}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item gridColumn="span 3">
//                               <TextField
//                                 label="Contact Info"
//                                 name={`answers[${idx}].alert.contactInfo`}
//                                 value={a.alert?.contactInfo || ""}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item gridColumn="span 1" display="flex" alignItems="center" justifyContent="flex-end">
//                               <Button
//                                 onClick={() => arrayHelpers.remove(idx)}
//                                 size="small"
//                                 color="error"
//                                 variant="outlined"
//                                 sx={{ minWidth: 0, p: "4px 8px", mt: 1 }}
//                                 disabled={formik.values.answers.length === 1}
//                               >Delete</Button>
//                             </Grid>
//                           </Grid>
//                         ))}
//                         <Button
//                           onClick={() => arrayHelpers.push({
//                             text: "", rag: 1, nextQuestionID: 0, alertID: 0, instructionID: 0,
//                             instruction: { instructionText: "" },
//                             alert: { text: "", contactInfo: "" }
//                           })}
//                           color="primary"
//                           variant="outlined"
//                           sx={{ mt: 1 }}
//                           size="small"
//                         >Add Answer</Button>
//                       </>
//                     )}
//                   />
//                 </Grid>
//                 <Grid item gridColumn="span 12" textAlign="right">
//                   <Button onClick={() => setModalOpen(false)} sx={{ mr: 1 }} disabled={saving}>
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={saving}
//                     startIcon={saving && <CircularProgress size={18} color="inherit" />}
//                     sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
//                   >
//                     {editQuestion ? "Update" : "Create"}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           </FormikProvider>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }





// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Typography, Modal, Grid, TextField, IconButton, Table, TableContainer,
//   TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Tooltip, MenuItem, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Divider
// } from "@mui/material";
// import { Add, Edit, Delete, InfoOutlined } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useFormik, FieldArray, FormikProvider } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";
// import ClipLoader from "react-spinners/ClipLoader";

// // --- API URL and config ---
// const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Question`;
// const QUESTION_TYPES = [
//   { value: 1, label: "Single Choice" },
//   { value: 2, label: "Multi Choice" },
//   { value: 3, label: "Text" }
// ];

// const initialQuestion = {
//   id: 0,
//   text: "",
//   sequence: 0,
//   isAlwaysShown: false,
//   nextDefaultQuestionID: 0,
//   questionType: 1,
//   answers: [
//     {
//       id: 0,
//       text: "",
//       rag: 1,
//       nextQuestionID: 0,
//       alertID: 0,
//       instructionID: 0,
//       instruction: { id: 0, instructionText: "" },
//       alert: { id: 0, text: "", contactInfo: "" }
//     }
//   ],
//   questionnaireID: 0,
// };

// export default function Questions() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editQuestion, setEditQuestion] = useState(null);
//   const [detailDialog, setDetailDialog] = useState({ open: false, question: null });
//   const [saving, setSaving] = useState(false);

//   const getToken = () => localStorage.getItem("token");

//   // --- Fetch all questions ---
//   const fetchQuestions = async () => {
//     setLoading(true);
//     try {
//       const token = getToken();
//       const { data } = await axios.get(API_URL, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setQuestions(Array.isArray(data) ? data : data.data || []);
//     } catch (err) {
//       toast.error("Failed to fetch questions.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchQuestions(); }, []);

//   // --- Formik for Add/Edit ---
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: editQuestion ? { ...editQuestion } : initialQuestion,
//     validationSchema: Yup.object({
//       text: Yup.string().required("Question is required"),
//       sequence: Yup.number().min(0).required("Sequence required"),
//       isAlwaysShown: Yup.boolean(),
//       nextDefaultQuestionID: Yup.number().min(0),
//       questionType: Yup.number().required("Type required"),
//       answers: Yup.array().of(
//         Yup.object().shape({
//           id: Yup.number(),
//           text: Yup.string().required("Answer text required"),
//           rag: Yup.number().required(),
//           nextQuestionID: Yup.number(),
//           alertID: Yup.number(),
//           instructionID: Yup.number(),
//           instruction: Yup.object().shape({
//             id: Yup.number(),
//             instructionText: Yup.string()
//           }),
//           alert: Yup.object().shape({
//             id: Yup.number(),
//             text: Yup.string(),
//             contactInfo: Yup.string()
//           }),
//         })
//       ),
//       questionnaireID: Yup.number(),
//     }),
//     onSubmit: async (values) => {
//       setSaving(true);
//       const token = getToken();
//       try {
//         if (editQuestion) {
//           await axios.put(`${API_URL}/${editQuestion.id}`, values, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Question updated!");
//         } else {
//           await axios.post(API_URL, values, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Question created!");
//         }
//         setModalOpen(false);
//         setEditQuestion(null);
//         fetchQuestions();
//       } catch (err) {
//         toast.error("Save failed.");
//       } finally {
//         setSaving(false);
//       }
//     },
//   });

//   // --- Delete ---
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Delete Question?",
//       text: "Are you sure you want to delete this question?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d32f2f",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       reverseButtons: true,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const token = getToken();
//         try {
//           await axios.delete(`${API_URL}/${id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Question deleted!");
//           fetchQuestions();
//         } catch {
//           toast.error("Delete failed.");
//         }
//       }
//     });
//   };

//   // --- Modal controls ---
//   const openEditModal = (q) => { setEditQuestion(q); setModalOpen(true); };
//   const openAddModal = () => { setEditQuestion(null); setModalOpen(true); };

//   // --- Details dialog ---
//   const openDetails = (question) => setDetailDialog({ open: true, question });
//   const closeDetails = () => setDetailDialog({ open: false, question: null });

//   // --- Modal style
//   const modalStyle = {
//     position: "absolute",
//     top: "50%", left: "50%", transform: "translate(-50%, -50%)",
//     width: "96vw", maxWidth: 760, bgcolor: "background.paper", boxShadow: 24,
//     borderRadius: 3, p: 3, maxHeight: "90vh", overflow: "auto"
//   };

//   // --- Clean Detail Dialog for a Question ---
//   const QuestionDetails = ({ question }) => (
//     <Box>
//       <Typography fontWeight={600}>Question ID:</Typography>
//       <Typography mb={1}>{question.id}</Typography>
//       <Typography fontWeight={600}>Text:</Typography>
//       <Typography mb={1}>{question.text}</Typography>
//       <Grid container spacing={2}>
//         <Grid item size={{ xs: 12, md: 6 }}>
//           <Typography fontWeight={600}>Sequence:</Typography>
//           <Typography mb={1}>{question.sequence}</Typography>
//         </Grid>
//         <Grid item size={{ xs: 12, md: 6 }}>
//           <Typography fontWeight={600}>Type:</Typography>
//           <Typography mb={1}>{QUESTION_TYPES.find(t => t.value === question.questionType)?.label || question.questionType}</Typography>
//         </Grid>
//         <Grid item size={{ xs: 12, md: 6 }}>
//           <Typography fontWeight={600}>Always Shown:</Typography>
//           <Typography mb={1}>{question.isAlwaysShown ? "Yes" : "No"}</Typography>
//         </Grid>
//         <Grid item size={{ xs: 12, md: 6 }}>
//           <Typography fontWeight={600}>Next Default QID:</Typography>
//           <Typography mb={1}>{question.nextDefaultQuestionID}</Typography>
//         </Grid>
//         <Grid item size={{ xs: 12, md: 6 }}>
//           <Typography fontWeight={600}>Questionnaire ID:</Typography>
//           <Typography mb={1}>{question.questionnaireID}</Typography>
//         </Grid>
//       </Grid>
//       <Divider sx={{ my: 2 }} />
//       <Typography variant="subtitle1" fontWeight={600} mb={1}>Answers</Typography>
//       {question.answers?.length === 0 ? <Typography>No answers.</Typography> : (
//         question.answers.map((a, idx) => (
//           <Box key={idx} mb={1} p={1} sx={{ border: "1px solid #eee", borderRadius: 1 }}>
//             <Grid container spacing={2}>
//               <Grid item size={{ xs: 12, md: 2 }}><Typography fontWeight={600}>ID:</Typography><Typography>{a.id}</Typography></Grid>
//               <Grid item size={{ xs: 12, md: 4 }}><Typography fontWeight={600}>Text:</Typography><Typography>{a.text}</Typography></Grid>
//               <Grid item size={{ xs: 12, md: 2 }}><Typography fontWeight={600}>RAG:</Typography><Typography>{a.rag}</Typography></Grid>
//               <Grid item size={{ xs: 12, md: 2 }}><Typography fontWeight={600}>Next QID:</Typography><Typography>{a.nextQuestionID}</Typography></Grid>
//               <Grid item size={{ xs: 12, md: 2 }}><Typography fontWeight={600}>Alert ID:</Typography><Typography>{a.alertID}</Typography></Grid>
//               <Grid item size={{ xs: 12, md: 3 }}><Typography fontWeight={600}>Instruction ID:</Typography><Typography>{a.instructionID}</Typography></Grid>
//               <Grid item size={{ xs: 12, md: 3 }}><Typography fontWeight={600}>Instruction Text:</Typography><Typography>{a.instruction?.instructionText}</Typography></Grid>
//               <Grid item size={{ xs: 12, md: 3 }}><Typography fontWeight={600}>Alert Text:</Typography><Typography>{a.alert?.text}</Typography></Grid>
//               <Grid item size={{ xs: 12, md: 3 }}><Typography fontWeight={600}>Contact Info:</Typography><Typography>{a.alert?.contactInfo}</Typography></Grid>
//             </Grid>
//           </Box>
//         ))
//       )}
//     </Box>
//   );

//   return (
//     <Box p={2} sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
//       <Toaster position="top-right" />
//       <Box
//         component={motion.div}
//         initial={{ opacity: 0, y: -18 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         mb={3}
//         display="flex"
//         alignItems="center"
//         gap={2}
//         justifyContent="space-between"
//       >
//         <Typography variant="h4" fontWeight="bold" color="primary">
//           Questions Management
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={openAddModal}
//           sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
//         >
//           Add Question
//         </Button>
//       </Box>
//       <Paper
//         component={motion.div}
//         initial={{ opacity: 0, scale: 0.97 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         sx={{ boxShadow: 2, borderRadius: 3, overflow: "auto" }}
//       >
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" p={6}>
//             <ClipLoader color="#1976d2" size={50} />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Question</TableCell>
//                   <TableCell>Seq</TableCell>
//                   <TableCell>Type</TableCell>
//                   <TableCell>Always?</TableCell>
//                   <TableCell>Answers</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {questions.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center">No records found.</TableCell>
//                   </TableRow>
//                 ) : (
//                   questions.map((q) => (
//                     <TableRow key={q.id}>
//                       <TableCell>{q.id}</TableCell>
//                       <TableCell>{q.text}</TableCell>
//                       <TableCell>{q.sequence}</TableCell>
//                       <TableCell>
//                         <Chip label={QUESTION_TYPES.find(t => t.value === q.questionType)?.label || q.questionType} size="small" />
//                       </TableCell>
//                       <TableCell>
//                         {q.isAlwaysShown ? <Chip label="Yes" color="success" size="small" /> : <Chip label="No" color="default" size="small" />}
//                       </TableCell>
//                       <TableCell>
//                         <Tooltip title="See answers" arrow>
//                           <Box>
//                             {q.answers?.slice(0, 3).map((a, i) =>
//                               <Chip key={i} label={a.text} color="info" size="small" sx={{ mr: 0.5, mb: 0.5 }} />
//                             )}
//                             {q.answers && q.answers.length > 3 && (
//                               <Chip label={`+${q.answers.length - 3}`} size="small" />
//                             )}
//                           </Box>
//                         </Tooltip>
//                       </TableCell>
//                       <TableCell align="center">
//                         <Tooltip title="Details" arrow>
//                           <IconButton onClick={() => openDetails(q)} size="small" color="info">
//                             <InfoOutlined />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Edit" arrow>
//                           <IconButton onClick={() => openEditModal(q)} size="small" color="primary">
//                             <Edit />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete" arrow>
//                           <IconButton
//                             onClick={() => handleDelete(q.id)}
//                             size="small"
//                             color="error"
//                           >
//                             <Delete />
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>

//       {/* Add/Edit Modal */}
//       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//         <Box sx={modalStyle} component={motion.div}>
//           <Typography variant="h6" mb={2} fontWeight="bold">
//             {editQuestion ? "Edit Question" : "Add Question"}
//           </Typography>
//           <FormikProvider value={formik}>
//             <form onSubmit={formik.handleSubmit}>
//               <Grid container spacing={2}>
//                 {/* Top row */}
//                 <Grid item size={{ xs: 12, md: 2 }}>
//                   <TextField
//                     label="ID"
//                     name="id"
//                     value={formik.values.id}
//                     InputProps={{ readOnly: true }}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item size={{ xs: 12, md: 6 }}>
//                   <TextField
//                     label="Question Text"
//                     name="text"
//                     value={formik.values.text}
//                     onChange={formik.handleChange}
//                     error={formik.touched.text && !!formik.errors.text}
//                     helperText={formik.touched.text && formik.errors.text}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item size={{ xs: 12, md: 2 }}>
//                   <TextField
//                     label="Sequence"
//                     name="sequence"
//                     type="number"
//                     value={formik.values.sequence}
//                     onChange={formik.handleChange}
//                     error={formik.touched.sequence && !!formik.errors.sequence}
//                     helperText={formik.touched.sequence && formik.errors.sequence}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item size={{ xs: 12, md: 2 }}>
//                   <TextField
//                     select
//                     label="Type"
//                     name="questionType"
//                     value={formik.values.questionType}
//                     onChange={formik.handleChange}
//                     error={formik.touched.questionType && !!formik.errors.questionType}
//                     helperText={formik.touched.questionType && formik.errors.questionType}
//                     fullWidth
//                   >
//                     {QUESTION_TYPES.map(opt => (
//                       <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 {/* Row 2 */}
//                 <Grid item size={{ xs: 12, md: 3 }}>
//                   <TextField
//                     select
//                     label="Always Shown?"
//                     name="isAlwaysShown"
//                     value={formik.values.isAlwaysShown ? "yes" : "no"}
//                     onChange={e => formik.setFieldValue("isAlwaysShown", e.target.value === "yes")}
//                     fullWidth
//                   >
//                     <MenuItem value="yes">Yes</MenuItem>
//                     <MenuItem value="no">No</MenuItem>
//                   </TextField>
//                 </Grid>
//                 <Grid item size={{ xs: 12, md: 3 }}>
//                   <TextField
//                     label="Next Default Q ID"
//                     name="nextDefaultQuestionID"
//                     type="number"
//                     value={formik.values.nextDefaultQuestionID}
//                     onChange={formik.handleChange}
//                     error={formik.touched.nextDefaultQuestionID && !!formik.errors.nextDefaultQuestionID}
//                     helperText={formik.touched.nextDefaultQuestionID && formik.errors.nextDefaultQuestionID}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item size={{ xs: 12, md: 3 }}>
//                   <TextField
//                     label="Questionnaire ID"
//                     name="questionnaireID"
//                     type="number"
//                     value={formik.values.questionnaireID}
//                     onChange={formik.handleChange}
//                     error={formik.touched.questionnaireID && !!formik.errors.questionnaireID}
//                     helperText={formik.touched.questionnaireID && formik.errors.questionnaireID}
//                     fullWidth
//                   />
//                 </Grid>
//                 {/* Answers Section */}
//                 <Grid item size={{ xs: 12 }}>
//                   <Typography fontWeight="bold" mb={1} mt={2}>Answers</Typography>
//                   <FieldArray
//                     name="answers"
//                     render={arrayHelpers => (
//                       <>
//                         {formik.values.answers.map((a, idx) => (
//                           <Grid container spacing={2} key={idx}>
//                             <Grid item size={{ xs: 12, md: 2 }}>
//                               <TextField
//                                 label="ID"
//                                 name={`answers[${idx}].id`}
//                                 value={a.id}
//                                 InputProps={{ readOnly: true }}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item size={{ xs: 12, md: 4 }}>
//                               <TextField
//                                 label="Answer Text"
//                                 name={`answers[${idx}].text`}
//                                 value={a.text}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched.answers?.[idx]?.text && !!formik.errors.answers?.[idx]?.text}
//                                 helperText={formik.touched.answers?.[idx]?.text && formik.errors.answers?.[idx]?.text}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item size={{ xs: 12, md: 2 }}>
//                               <TextField
//                                 label="RAG"
//                                 name={`answers[${idx}].rag`}
//                                 type="number"
//                                 value={a.rag}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item size={{ xs: 12, md: 2 }}>
//                               <TextField
//                                 label="Next QID"
//                                 name={`answers[${idx}].nextQuestionID`}
//                                 type="number"
//                                 value={a.nextQuestionID}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item size={{ xs: 12, md: 2 }}>
//                               <TextField
//                                 label="Alert ID"
//                                 name={`answers[${idx}].alertID`}
//                                 type="number"
//                                 value={a.alertID}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item size={{ xs: 12, md: 3 }}>
//                               <TextField
//                                 label="Instr ID"
//                                 name={`answers[${idx}].instructionID`}
//                                 type="number"
//                                 value={a.instructionID}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item size={{ xs: 12, md: 3 }}>
//                               <TextField
//                                 label="Instr Text"
//                                 name={`answers[${idx}].instruction.instructionText`}
//                                 value={a.instruction?.instructionText || ""}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item size={{ xs: 12, md: 2 }}>
//                               <TextField
//                                 label="Alert Text"
//                                 name={`answers[${idx}].alert.text`}
//                                 value={a.alert?.text || ""}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item size={{ xs: 12, md: 2 }}>
//                               <TextField
//                                 label="Contact Info"
//                                 name={`answers[${idx}].alert.contactInfo`}
//                                 value={a.alert?.contactInfo || ""}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid item size={{ xs: 12, md: 1 }} display="flex" alignItems="center" justifyContent="flex-end">
//                               <Button
//                                 onClick={() => arrayHelpers.remove(idx)}
//                                 size="small"
//                                 color="error"
//                                 variant="outlined"
//                                 sx={{ minWidth: 0, p: "4px 8px", mt: 1 }}
//                                 disabled={formik.values.answers.length === 1}
//                               >Delete</Button>
//                             </Grid>
//                           </Grid>
//                         ))}
//                         <Button
//                           onClick={() => arrayHelpers.push({
//                             id: 0, text: "", rag: 1, nextQuestionID: 0, alertID: 0, instructionID: 0,
//                             instruction: { id: 0, instructionText: "" },
//                             alert: { id: 0, text: "", contactInfo: "" }
//                           })}
//                           color="primary"
//                           variant="outlined"
//                           sx={{ mt: 1 }}
//                           size="small"
//                         >Add Answer</Button>
//                       </>
//                     )}
//                   />
//                 </Grid>
//                 <Grid item size={{ xs: 12 }} textAlign="right">
//                   <Button onClick={() => setModalOpen(false)} sx={{ mr: 1 }} disabled={saving}>
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={saving}
//                     startIcon={saving && <CircularProgress size={18} color="inherit" />}
//                     sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
//                   >
//                     {editQuestion ? "Update" : "Create"}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           </FormikProvider>
//         </Box>
//       </Modal>

//       {/* Question Detail Dialog */}
//       <Dialog open={detailDialog.open} onClose={closeDetails} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Question Details
//         </DialogTitle>
//         <DialogContent>
//           {detailDialog.question && <QuestionDetails question={detailDialog.question} />}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDetails} variant="contained">Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }





// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Typography, Modal, Grid, TextField, IconButton, Table, TableContainer,
//   TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Tooltip, MenuItem, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Divider
// } from "@mui/material";
// import { Add, Edit, Delete, InfoOutlined } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useFormik, FieldArray, FormikProvider } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";
// import ClipLoader from "react-spinners/ClipLoader";

// // --- API URLs ---
// const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
// const API_QUESTION = `${API_BASE}/Question`;
// const API_ALERT = `${API_BASE}/Alert`;
// const API_INSTRUCTION = `${API_BASE}/Instruction`;
// const API_QUESTIONNAIRE = `${API_BASE}/Questionnaire`;

// const QUESTION_TYPES = [
//   { value: 1, label: "Single Choice" },
//   { value: 2, label: "Multi Choice" },
//   { value: 3, label: "Text" }
// ];

// const initialQuestion = {
//   id: 0,
//   text: "",
//   sequence: 0,
//   isAlwaysShown: false,
//   nextDefaultQuestionID: 0,
//   questionType: 1,
//   answers: [
//     {
//       id: 0,
//       text: "",
//       rag: 1,
//       nextQuestionID: 0,
//       alertID: 0,
//       instructionID: 0,
//       instruction: { id: 0, instructionText: "" },
//       alert: { id: 0, text: "", contactInfo: "" }
//     }
//   ],
//   questionnaireID: 0,
// };

// function getToken() {
//   if (typeof window !== "undefined") return localStorage.getItem("token");
//   return "";
// }

// export default function Questions() {
//   // Main state
//   const [questions, setQuestions] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const [instructions, setInstructions] = useState([]);
//   const [questionnaires, setQuestionnaires] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editQuestion, setEditQuestion] = useState(null);
//   const [detailDialog, setDetailDialog] = useState({ open: false, question: null });
//   const [saving, setSaving] = useState(false);

//   // --- Fetch master lists on mount ---
//   useEffect(() => {
//     fetchAll();
//   }, []);
//   const fetchAll = async () => {
//     setLoading(true);
//     try {
//       const token = getToken();
//       // All in parallel
//       const [
//         qres,
//         ares,
//         ires,
//         qnres
//       ] = await Promise.all([
//         axios.get(API_QUESTION, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_ALERT, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_INSTRUCTION, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_QUESTIONNAIRE, { headers: { Authorization: `Bearer ${token}` } }),
//       ]);
//       setQuestions(Array.isArray(qres.data) ? qres.data : qres.data.data || []);
//       setAlerts(Array.isArray(ares.data) ? ares.data : ares.data.data || []);
//       setInstructions(Array.isArray(ires.data) ? ires.data : ires.data.data || []);
//       setQuestionnaires(Array.isArray(qnres.data) ? qnres.data : qnres.data.data || []);
//     } catch (err) {
//       toast.error("Failed to fetch data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Formik for Add/Edit ---
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: editQuestion ? { ...editQuestion } : initialQuestion,
//     validationSchema: Yup.object({
//       text: Yup.string().required("Question is required"),
//       sequence: Yup.number().min(0).required("Sequence required"),
//       isAlwaysShown: Yup.boolean(),
//       nextDefaultQuestionID: Yup.number().min(0),
//       questionType: Yup.number().required("Type required"),
//       answers: Yup.array().of(
//         Yup.object().shape({
//           id: Yup.number(),
//           text: Yup.string().required("Answer text required"),
//           rag: Yup.number().required(),
//           nextQuestionID: Yup.number(),
//           alertID: Yup.number(),
//           instructionID: Yup.number(),
//           // Alert/Instruction objects are fetched for display only; you only post the IDs
//         })
//       ),
//       questionnaireID: Yup.number().required("Questionnaire is required"),
//     }),
//     onSubmit: async (values) => {
//       setSaving(true);
//       const token = getToken();
//       try {
//         // Clean up answers, only IDs for alert/instruction
//         const cleaned = {
//           ...values,
//           answers: values.answers.map(a => ({
//             ...a,
//             alert: undefined,
//             instruction: undefined,
//           })),
//         };
//         if (editQuestion) {
//           await axios.put(`${API_QUESTION}/${editQuestion.id}`, cleaned, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Question updated!");
//         } else {
//           await axios.post(API_QUESTION, cleaned, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Question created!");
//         }
//         setModalOpen(false);
//         setEditQuestion(null);
//         fetchAll();
//       } catch (err) {
//         toast.error("Save failed.");
//       } finally {
//         setSaving(false);
//       }
//     },
//   });

//   // --- Delete ---
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Delete Question?",
//       text: "Are you sure you want to delete this question?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d32f2f",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       reverseButtons: true,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const token = getToken();
//         try {
//           await axios.delete(`${API_QUESTION}/${id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Question deleted!");
//           fetchAll();
//         } catch {
//           toast.error("Delete failed.");
//         }
//       }
//     });
//   };

//   // --- Modal controls ---
//   const openEditModal = (q) => { setEditQuestion(q); setModalOpen(true); };
//   const openAddModal = () => { setEditQuestion(null); setModalOpen(true); };
//   const openDetails = (question) => setDetailDialog({ open: true, question });
//   const closeDetails = () => setDetailDialog({ open: false, question: null });

//   // --- Modal style ---
//   const modalStyle = {
//     position: "absolute",
//     top: "50%", left: "50%", transform: "translate(-50%, -50%)",
//     width: "96vw", maxWidth: 820, bgcolor: "background.paper", boxShadow: 24,
//     borderRadius: 3, p: 3, maxHeight: "90vh", overflow: "auto"
//   };

//   // --- Question Detail Dialog ---
//   const QuestionDetails = ({ question }) => (
//     <Box>
//       <Typography fontWeight={600}>Question ID: <span style={{ fontWeight: 400 }}>{question.id}</span></Typography>
//       <Typography fontWeight={600}>Text: <span style={{ fontWeight: 400 }}>{question.text}</span></Typography>
//       <Grid container spacing={2} mt={1} mb={2}>
//         <Grid item xs={12} md={4}><b>Sequence:</b> {question.sequence}</Grid>
//         <Grid item xs={12} md={4}><b>Type:</b> {QUESTION_TYPES.find(t => t.value === question.questionType)?.label || question.questionType}</Grid>
//         <Grid item xs={12} md={4}><b>Always Shown:</b> {question.isAlwaysShown ? "Yes" : "No"}</Grid>
//         <Grid item xs={12} md={4}><b>Next Default QID:</b> {question.nextDefaultQuestionID}</Grid>
//         <Grid item xs={12} md={4}><b>Questionnaire ID:</b> {question.questionnaireID}</Grid>
//       </Grid>
//       <Divider sx={{ my: 2 }} />
//       <Typography variant="subtitle1" fontWeight={600} mb={1}>Answers</Typography>
//       {question.answers?.length === 0 ? <Typography>No answers.</Typography> : (
//         question.answers.map((a, idx) => (
//           <Box key={idx} mb={1} p={1.5} sx={{ border: "1px solid #eee", borderRadius: 2 }}>
//             <Grid container spacing={1}>
//               <Grid item xs={12} md={2}><b>ID:</b> {a.id}</Grid>
//               <Grid item xs={12} md={4}><b>Text:</b> {a.text}</Grid>
//               <Grid item xs={12} md={2}><b>RAG:</b> {a.rag}</Grid>
//               <Grid item xs={12} md={2}><b>Next QID:</b> {a.nextQuestionID}</Grid>
//               <Grid item xs={12} md={2}><b>Alert:</b> {alerts.find(al => al.id === a.alertID)?.text}</Grid>
//               <Grid item xs={12} md={3}><b>Instruction:</b> {instructions.find(ins => ins.id === a.instructionID)?.instructionText}</Grid>
//             </Grid>
//           </Box>
//         ))
//       )}
//     </Box>
//   );

//   // --- Main Render ---
//   return (
//     <Box p={2} sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
//       <Toaster position="top-right" />
//       <Box
//         component={motion.div}
//         initial={{ opacity: 0, y: -18 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         mb={3}
//         display="flex"
//         alignItems="center"
//         gap={2}
//         justifyContent="space-between"
//       >
//         <Typography variant="h4" fontWeight="bold" color="primary">
//           Questions Management
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={openAddModal}
//           sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
//         >
//           Add Question
//         </Button>
//       </Box>
//       <Paper
//         component={motion.div}
//         initial={{ opacity: 0, scale: 0.97 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         sx={{ boxShadow: 2, borderRadius: 3, overflow: "auto" }}
//       >
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" p={6}>
//             <ClipLoader color="#1976d2" size={48} />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Question</TableCell>
//                   <TableCell>Seq</TableCell>
//                   <TableCell>Type</TableCell>
//                   <TableCell>Always?</TableCell>
//                   <TableCell>Answers</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {questions.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center">No records found.</TableCell>
//                   </TableRow>
//                 ) : (
//                   questions.map((q) => (
//                     <TableRow key={q.id}>
//                       <TableCell>{q.id}</TableCell>
//                       <TableCell>{q.text}</TableCell>
//                       <TableCell>{q.sequence}</TableCell>
//                       <TableCell>
//                         <Chip label={QUESTION_TYPES.find(t => t.value === q.questionType)?.label || q.questionType} size="small" />
//                       </TableCell>
//                       <TableCell>
//                         {q.isAlwaysShown ? <Chip label="Yes" color="success" size="small" /> : <Chip label="No" color="default" size="small" />}
//                       </TableCell>
//                       <TableCell>
//                         <Tooltip title="See answers" arrow>
//                           <Box>
//                             {q.answers?.slice(0, 2).map((a, i) =>
//                               <Chip key={i} label={a.text} color="info" size="small" sx={{ mr: 0.5, mb: 0.5 }} />
//                             )}
//                             {q.answers && q.answers.length > 2 && (
//                               <Chip label={`+${q.answers.length - 2}`} size="small" />
//                             )}
//                           </Box>
//                         </Tooltip>
//                       </TableCell>
//                       <TableCell align="center">
//                         <Tooltip title="Details" arrow>
//                           <IconButton onClick={() => openDetails(q)} size="small" color="info">
//                             <InfoOutlined />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Edit" arrow>
//                           <IconButton onClick={() => openEditModal(q)} size="small" color="primary">
//                             <Edit />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete" arrow>
//                           <IconButton
//                             onClick={() => handleDelete(q.id)}
//                             size="small"
//                             color="error"
//                           >
//                             <Delete />
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>

//       {/* Add/Edit Modal */}
//       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//         <Box sx={modalStyle} component={motion.div}>
//           <Typography variant="h6" mb={2} fontWeight="bold">
//             {editQuestion ? "Edit Question" : "Add Question"}
//           </Typography>
//           <FormikProvider value={formik}>
//             <form onSubmit={formik.handleSubmit}>
//               <Grid container spacing={2}>
//                 {/* Top row */}
//                 <Grid size={{xs:12,md:2}}>
//                   <TextField
//                     label="ID"
//                     name="id"
//                     value={formik.values.id}
//                     InputProps={{ readOnly: true }}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid size={{xs:12,md:6}}>
//                   <TextField
//                     label="Question Text"
//                     name="text"
//                     value={formik.values.text}
//                     onChange={formik.handleChange}
//                     error={formik.touched.text && !!formik.errors.text}
//                     helperText={formik.touched.text && formik.errors.text}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid size={{xs:12,md:2}}>
//                   <TextField
//                     label="Sequence"
//                     name="sequence"
//                     type="number"
//                     value={formik.values.sequence}
//                     onChange={formik.handleChange}
//                     error={formik.touched.sequence && !!formik.errors.sequence}
//                     helperText={formik.touched.sequence && formik.errors.sequence}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid size={{xs:12,md:2}}>
//                   <TextField
//                     select
//                     label="Type"
//                     name="questionType"
//                     value={formik.values.questionType}
//                     onChange={formik.handleChange}
//                     error={formik.touched.questionType && !!formik.errors.questionType}
//                     helperText={formik.touched.questionType && formik.errors.questionType}
//                     fullWidth
//                   >
//                     {QUESTION_TYPES.map(opt => (
//                       <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 {/* Row 2 */}
//                 <Grid size={{xs:12,md:3}}>
//                   <TextField
//                     select
//                     label="Always Shown?"
//                     name="isAlwaysShown"
//                     value={formik.values.isAlwaysShown ? "yes" : "no"}
//                     onChange={e => formik.setFieldValue("isAlwaysShown", e.target.value === "yes")}
//                     fullWidth
//                   >
//                     <MenuItem value="yes">Yes</MenuItem>
//                     <MenuItem value="no">No</MenuItem>
//                   </TextField>
//                 </Grid>
//                 <Grid size={{xs:12,md:3}}>
//                   <TextField
//                     label="Next Default Q ID"
//                     name="nextDefaultQuestionID"
//                     type="number"
//                     value={formik.values.nextDefaultQuestionID}
//                     onChange={formik.handleChange}
//                     error={formik.touched.nextDefaultQuestionID && !!formik.errors.nextDefaultQuestionID}
//                     helperText={formik.touched.nextDefaultQuestionID && formik.errors.nextDefaultQuestionID}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid size={{xs:12,md:3}}>
//                   <TextField
//                     select
//                     label="Questionnaire"
//                     name="questionnaireID"
//                     value={formik.values.questionnaireID}
//                     onChange={formik.handleChange}
//                     error={formik.touched.questionnaireID && !!formik.errors.questionnaireID}
//                     helperText={formik.touched.questionnaireID && formik.errors.questionnaireID}
//                     fullWidth
//                   >
//                     {questionnaires.map((qn) => (
//                       <MenuItem key={qn.id} value={qn.id}>{qn.title}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 {/* Answers Section */}
//                 <Grid size={{xs:12}}>
//                   <Typography fontWeight="bold" mb={1} mt={2}>Answers</Typography>
//                   <FieldArray
//                     name="answers"
//                     render={arrayHelpers => (
//                       <>
//                         {formik.values.answers.map((a, idx) => (
//                           <Grid container spacing={2} key={idx}>
//                             <Grid size={{xs:12}} md={2}>
//                               <TextField
//                                 label="ID"
//                                 name={`answers[${idx}].id`}
//                                 value={a.id}
//                                 InputProps={{ readOnly: true }}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid size={{xs:12}} md={4}>
//                               <TextField
//                                 label="Answer Text"
//                                 name={`answers[${idx}].text`}
//                                 value={a.text}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched.answers?.[idx]?.text && !!formik.errors.answers?.[idx]?.text}
//                                 helperText={formik.touched.answers?.[idx]?.text && formik.errors.answers?.[idx]?.text}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid size={{xs:12}} md={2}>
//                               <TextField
//                                 label="RAG"
//                                 name={`answers[${idx}].rag`}
//                                 type="number"
//                                 value={a.rag}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid size={{xs:12}} md={2}>
//                               <TextField
//                                 label="Next QID"
//                                 name={`answers[${idx}].nextQuestionID`}
//                                 type="number"
//                                 value={a.nextQuestionID}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid size={{xs:12}} md={2}>
//                               <TextField
//                                 select
//                                 label="Alert"
//                                 name={`answers[${idx}].alertID`}
//                                 value={a.alertID}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               >
//                                 <MenuItem value={0}>None</MenuItem>
//                                 {alerts.map(al => (
//                                   <MenuItem key={al.id} value={al.id}>{al.text}</MenuItem>
//                                 ))}
//                               </TextField>
//                             </Grid>
//                             <Grid size={{xs:12}} md={3}>
//                               <TextField
//                                 select
//                                 label="Instruction"
//                                 name={`answers[${idx}].instructionID`}
//                                 value={a.instructionID}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               >
//                                 <MenuItem value={0}>None</MenuItem>
//                                 {instructions.map(ins => (
//                                   <MenuItem key={ins.id} value={ins.id}>{ins.instructionText}</MenuItem>
//                                 ))}
//                               </TextField>
//                             </Grid>
//                             <Grid size={{xs:12}} md={1} display="flex" alignItems="center" justifyContent="flex-end">
//                               <Button
//                                 onClick={() => arrayHelpers.remove(idx)}
//                                 size="small"
//                                 color="error"
//                                 variant="outlined"
//                                 sx={{ minWidth: 0, p: "4px 8px", mt: 1 }}
//                                 disabled={formik.values.answers.length === 1}
//                               >Delete</Button>
//                             </Grid>
//                           </Grid>
//                         ))}
//                         <Button
//                           onClick={() => arrayHelpers.push({
//                             id: 0, text: "", rag: 1, nextQuestionID: 0, alertID: 0, instructionID: 0,
//                             instruction: { id: 0, instructionText: "" },
//                             alert: { id: 0, text: "", contactInfo: "" }
//                           })}
//                           color="primary"
//                           variant="outlined"
//                           sx={{ mt: 1 }}
//                           size="small"
//                         >Add Answer</Button>
//                       </>
//                     )}
//                   />
//                 </Grid>
//                 <Grid size={{xs:12}} textAlign="right">
//                   <Button onClick={() => setModalOpen(false)} sx={{ mr: 1 }} disabled={saving}>
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={saving}
//                     startIcon={saving && <CircularProgress size={18} color="inherit" />}
//                     sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
//                   >
//                     {editQuestion ? "Update" : "Create"}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           </FormikProvider>
//         </Box>
//       </Modal>

//       {/* Question Detail Dialog */}
//       <Dialog open={detailDialog.open} onClose={closeDetails} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Question Details
//         </DialogTitle>
//         <DialogContent>
//           {detailDialog.question && <QuestionDetails question={detailDialog.question} />}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDetails} variant="contained">Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }


















// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Typography, Modal, Grid, TextField, IconButton, Table, TableContainer,
//   TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Tooltip, MenuItem, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Divider
// } from "@mui/material";
// import { Add, Edit, Delete, InfoOutlined } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useFormik, FieldArray, FormikProvider } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";
// import ClipLoader from "react-spinners/ClipLoader";
// import { seeGreen } from "@/components/utils/Colors";

// // --- API URLs ---
// const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
// const API_QUESTION = `${API_BASE}/Question`;
// const API_ALERT = `${API_BASE}/Alert`;
// const API_INSTRUCTION = `${API_BASE}/Instruction`;
// const API_QUESTIONNAIRE = `${API_BASE}/Questionnaire`;

// const QUESTION_TYPES = [
//   { value: 1, label: "Single Choice" },
//   { value: 2, label: "Multi Choice" },
//   { value: 3, label: "Text" }
// ];

// const initialQuestion = {
//   id: null,
//   text: "",
//   sequence: 0,
//   isAlwaysShown: false,
//   nextDefaultQuestionID: null,
//   questionType: 1,
//   answers: [
//     {
//       id: null,
//       text: "",
//       rag: 1,
//       nextQuestionID: null,
//       alertID: null,
//       instructionID: null,
//       instruction: { id: null, instructionText: "" },
//       alert: { id: null, text: "", contactInfo: "" }
//     }
//   ],
//   questionnaireID: null,
// };

// function getToken() {
//   if (typeof window !== "undefined") return localStorage.getItem("token");
//   return "";
// }

// export default function Questions() {
//   // Main state
//   const [questions, setQuestions] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const [instructions, setInstructions] = useState([]);
//   const [questionnaires, setQuestionnaires] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editQuestion, setEditQuestion] = useState(null);
//   const [detailDialog, setDetailDialog] = useState({ open: false, question: null });
//   const [saving, setSaving] = useState(false);

//   // --- Fetch master lists on mount ---
//   useEffect(() => { fetchAll(); }, []);
//   const fetchAll = async () => {
//     setLoading(true);
//     try {
//       const token = getToken();
//       const [
//         qres, ares, ires, qnres
//       ] = await Promise.all([
//         axios.get(API_QUESTION, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_ALERT, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_INSTRUCTION, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_QUESTIONNAIRE, { headers: { Authorization: `Bearer ${token}` } }),
//       ]);
//       setQuestions(Array.isArray(qres.data) ? qres.data : qres.data.data || []);
//       setAlerts(Array.isArray(ares.data) ? ares.data : ares.data.data || []);
//       setInstructions(Array.isArray(ires.data) ? ires.data : ires.data.data || []);
//       setQuestionnaires(Array.isArray(qnres.data) ? qnres.data : qnres.data.data || []);
//     } catch (err) {
//       toast.error("Failed to fetch data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Formik for Add/Edit ---
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: editQuestion ? { ...editQuestion } : initialQuestion,
//     validationSchema: Yup.object({
//       text: Yup.string().required("Question is required"),
//       sequence: Yup.number().min(0).required("Sequence required"),
//       isAlwaysShown: Yup.boolean(),
//       // nextDefaultQuestionID: Yup.number().min(0),
//       questionType: Yup.number().required("Type required"),
//       answers: Yup.array().of(
//         Yup.object().shape({
//           // id: Yup.number(),
//           text: Yup.string().required("Answer text required"),
//           rag: Yup.number().required(),
//           nextQuestionID: Yup.number(),
//           alertID: Yup.number(),
//           instructionID: Yup.number(),
//         })
//       ),
//       // questionnaireID: Yup.number().required("Questionnaire is required"),
//     }),
//     onSubmit: async (values) => {
//       setSaving(true);
//       const token = getToken();
//       try {
//         const cleaned = {
//           ...values,
//           answers: values.answers.map(a => ({
//             ...a,
//             alert: undefined,
//             instruction: undefined,
//           })),
//         };
//         if (editQuestion) {
//           await axios.put(`${API_QUESTION}/${editQuestion.id}`, cleaned, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Question updated!");
//         } else {
//           await axios.post(API_QUESTION, cleaned, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Question created!");
//         }
//         setModalOpen(false);
//         setEditQuestion(null);
//         fetchAll();
//       } catch (err) {
//         toast.error("Save failed.");
//       } finally {
//         setSaving(false);
//       }
//     },
//   });

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Delete Question?",
//       text: "Are you sure you want to delete this question?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d32f2f",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       reverseButtons: true,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const token = getToken();
//         try {
//           await axios.delete(`${API_QUESTION}/${id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Question deleted!");
//           fetchAll();
//         } catch {
//           toast.error("Delete failed.");
//         }
//       }
//     });
//   };

//   // --- Modal controls ---
//   const openEditModal = (q) => { setEditQuestion(q); setModalOpen(true); };
//   const openAddModal = () => { setEditQuestion(null); setModalOpen(true); };
//   const openDetails = (question) => setDetailDialog({ open: true, question });
//   const closeDetails = () => setDetailDialog({ open: false, question: null });

//   // --- Modal style ---
//   const modalStyle = {
//     position: "absolute",
//     top: "50%", left: "50%", transform: "translate(-50%, -50%)",
//     width: "98vw", maxWidth: 940, bgcolor: "background.paper", boxShadow: 24,
//     borderRadius: 3, p: 3, maxHeight: "92vh", overflow: "auto"
//   };

//   // --- Question Detail Dialog ---
//   const QuestionDetails = ({ question }) => (
//     <Box>
//       <Typography fontWeight={700}>Question ID: <span style={{ fontWeight: 400 }}>{question.id}</span></Typography>
//       <Typography fontWeight={700}>Text: <span style={{ fontWeight: 400 }}>{question.text}</span></Typography>
//       <Grid container spacing={2} mt={1} mb={2}>
//         <Grid size={{xs:12,md:6}}><b>Sequence:</b> {question.sequence}</Grid>
//         <Grid size={{xs:12,md:6}}><b>Type:</b> {QUESTION_TYPES.find(t => t.value === question.questionType)?.label || question.questionType}</Grid>
//         <Grid size={{xs:12,md:6}}><b>Always Shown:</b> {question.isAlwaysShown ? "Yes" : "No"}</Grid>
//         <Grid size={{xs:12,md:6}}><b>Next Default QID:</b> {question.nextDefaultQuestionID}</Grid>
//         <Grid size={{xs:12,md:6}}><b>Questionnaire:</b> {questionnaires.find(qn => qn.id === question.questionnaireID)?.title}</Grid>
//       </Grid>
//       <Divider sx={{ my: 2 }} />
//       <Typography variant="subtitle1" fontWeight={700} mb={1}>Answers</Typography>
//       {question.answers?.length === 0 ? <Typography>No answers.</Typography> : (
//         question.answers.map((a, idx) => (
//           <Box key={idx} mb={1} p={1.5} sx={{ border: "1px solid #eee", borderRadius: 2 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={2}><b>ID:</b> {a.id}</Grid>
//               <Grid item xs={12} md={4}><b>Text:</b> {a.text}</Grid>
//               <Grid item xs={12} md={2}><b>RAG:</b> {a.rag}</Grid>
//               <Grid item xs={12} md={2}><b>Next QID:</b> {a.nextQuestionID}</Grid>
//               <Grid item xs={12} md={2}><b>Alert:</b> {alerts.find(al => al.id === a.alertID)?.text}</Grid>
//               <Grid item xs={12} md={2}><b>Instruction:</b> {instructions.find(ins => ins.id === a.instructionID)?.instructionText}</Grid>
//             </Grid>
//           </Box>
//         ))
//       )}
//     </Box>
//   );

//   // --- Main Render ---
//   return (
//     <Box mx={1} mt={2}>
//       <Toaster position="top-right" />
//       <Box
//         component={motion.div}
//         initial={{ opacity: 0, y: -18 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         mb={3}
//         display="flex"
//         alignItems="center"
//         gap={2}
//         justifyContent="space-between"
//       >
//         <Typography variant="h4" fontWeight={600} color={seeGreen} fontSize={"26px"} mt={2}>
//           Questions Management
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           // onClick={openAddModal}
//           href="/admin-add-new-questions"
//           sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600,bgcolor:seeGreen}}
//         >
//           Add Question
//         </Button>
//       </Box>
//       <Paper
//         component={motion.div}
//         initial={{ opacity: 0, scale: 0.97 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         sx={{ boxShadow: 2, borderRadius: 3, overflow: "auto", minHeight: 380, mb: 4 }}
//       >
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" p={7}>
//             <ClipLoader color="#1976d2" size={54} />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ background: "#f8fafd" }}>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Question</TableCell>
//                   <TableCell>Seq</TableCell>
//                   <TableCell>Type</TableCell>
//                   <TableCell>Always?</TableCell>
//                   <TableCell>Answers</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {questions.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center">No records found.</TableCell>
//                   </TableRow>
//                 ) : (
//                   questions.map((q) => (
//                     <TableRow key={q.id}>
//                       <TableCell>{q.id}</TableCell>
//                       <TableCell>{q.text}</TableCell>
//                       <TableCell>{q.sequence}</TableCell>
//                       <TableCell>
//                         <Chip label={QUESTION_TYPES.find(t => t.value === q.questionType)?.label || q.questionType} size="small" />
//                       </TableCell>
//                       <TableCell>
//                         {q.isAlwaysShown ? <Chip label="Yes" color="success" size="small" /> : <Chip label="No" color="default" size="small" />}
//                       </TableCell>
//                       <TableCell>
//                         <Tooltip title="See answers" arrow>
//                           <Box>
//                             {q.answers?.slice(0, 2).map((a, i) =>
//                               <Chip key={i} label={a.text} color="info" size="small" sx={{ mr: 0.5, mb: 0.5 }} />
//                             )}
//                             {q.answers && q.answers.length > 2 && (
//                               <Chip label={`+${q.answers.length - 2}`} size="small" />
//                             )}
//                           </Box>
//                         </Tooltip>
//                       </TableCell>
//                       <TableCell align="center">
//                         <Tooltip title="Details" arrow>
//                           <IconButton onClick={() => openDetails(q)} size="small" color="info">
//                             <InfoOutlined />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Edit" arrow>
//                           <IconButton onClick={() => openEditModal(q)} size="small" color="primary">
//                             <Edit />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete" arrow>
//                           <IconButton
//                             onClick={() => handleDelete(q.id)}
//                             size="small"
//                             color="error"
//                           >
//                             <Delete />
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>

//       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//         <Box sx={modalStyle} component={motion.div}>
//           <Typography variant="h6" mb={2} fontWeight="bold">
//             {editQuestion ? "Edit Question" : "Add Question"}
//           </Typography>
//           <FormikProvider value={formik}>
//             <form onSubmit={formik.handleSubmit}>
//               <Grid container spacing={2}>
//                 {/* Top row */}
//                 <Grid size={{xs:12,md:6}}>
//                   <TextField
//                     label="ID"
//                     name="id"
//                     value={formik.values.id}
//                     InputProps={{ readOnly: true }}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid size={{xs:12,md:6}}>
//                   <TextField
//                     label="Question Text"
//                     name="text"
//                     value={formik.values.text}
//                     onChange={formik.handleChange}
//                     error={formik.touched.text && !!formik.errors.text}
//                     helperText={formik.touched.text && formik.errors.text}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid size={{xs:12,md:6}}>
//                   <TextField
//                     label="Sequence"
//                     name="sequence"
//                     type="number"
//                     value={formik.values.sequence}
//                     onChange={formik.handleChange}
//                     error={formik.touched.sequence && !!formik.errors.sequence}
//                     helperText={formik.touched.sequence && formik.errors.sequence}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid size={{xs:12,md:6}}>
//                   <TextField
//                     select
//                     label="Type"
//                     name="questionType"
//                     value={formik.values.questionType}
//                     onChange={formik.handleChange}
//                     error={formik.touched.questionType && !!formik.errors.questionType}
//                     helperText={formik.touched.questionType && formik.errors.questionType}
//                     fullWidth
//                   >
//                     {QUESTION_TYPES.map(opt => (
//                       <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid size={{xs:12,md:6}}>
//                   <TextField
//                     select
//                     label="Always Shown?"
//                     name="isAlwaysShown"
//                     value={formik.values.isAlwaysShown ? "yes" : "no"}
//                     onChange={e => formik.setFieldValue("isAlwaysShown", e.target.value === "yes")}
//                     fullWidth
//                   >
//                     <MenuItem value="yes">Yes</MenuItem>
//                     <MenuItem value="no">No</MenuItem>
//                   </TextField>
//                 </Grid>
//                 <Grid size={{xs:12,md:6}}>
//                   <TextField
//                     label="Next Default Q ID"
//                     name="nextDefaultQuestionID"
//                     type="number"
//                     value={formik.values.nextDefaultQuestionID}
//                     onChange={formik.handleChange}
//                     error={formik.touched.nextDefaultQuestionID && !!formik.errors.nextDefaultQuestionID}
//                     helperText={formik.touched.nextDefaultQuestionID && formik.errors.nextDefaultQuestionID}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid size={{xs:12,md:6}}>
//                   <TextField
//                     select
//                     label="Questionnaire"
//                     name="questionnaireID"
//                     value={formik.values.questionnaireID}
//                     onChange={formik.handleChange}
//                     error={formik.touched.questionnaireID && !!formik.errors.questionnaireID}
//                     helperText={formik.touched.questionnaireID && formik.errors.questionnaireID}
//                     fullWidth
//                   >
//                     {questionnaires.map((qn) => (
//                       <MenuItem key={qn.id} value={qn.id}>{qn.title}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

//                 {/* Answers Section */}
//                 <Grid size={{xs:12}}>
//                   <Typography fontWeight="bold" mb={1} mt={2}>Answers</Typography>
//                   <FieldArray
//                     name="answers"
//                     render={arrayHelpers => (
//                       <>
//                         {formik.values.answers.map((a, idx) => (
//                           <Grid container spacing={2} key={idx} sx={{ borderBottom: "1px solid #f0f0f0", mb: 1 }}>
//                             <Grid size={{xs:12,md:6}}>
//                               <TextField
//                                 label="ID"
//                                 name={`answers[${idx}].id`}
//                                 value={a.id}
//                                 InputProps={{ readOnly: true }}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid size={{xs:12,md:6}}>
//                               <TextField
//                                 label="Answer Text"
//                                 name={`answers[${idx}].text`}
//                                 value={a.text}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched.answers?.[idx]?.text && !!formik.errors.answers?.[idx]?.text}
//                                 helperText={formik.touched.answers?.[idx]?.text && formik.errors.answers?.[idx]?.text}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid size={{xs:12,md:6}}>
//                               <TextField
//                                 label="RAG"
//                                 name={`answers[${idx}].rag`}
//                                 type="number"
//                                 value={a.rag}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid size={{xs:12,md:6}}>
//                               <TextField
//                                 label="Next QID"
//                                 name={`answers[${idx}].nextQuestionID`}
//                                 type="number"
//                                 value={a.nextQuestionID}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               />
//                             </Grid>
//                             <Grid size={{xs:12,md:6}}>
//                               <TextField
//                                 select
//                                 label="Alert"
//                                 name={`answers[${idx}].alertID`}
//                                 value={a.alertID}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               >
//                                 <MenuItem value={0}>None</MenuItem>
//                                 {alerts.map(al => (
//                                   <MenuItem key={al.id} value={al.id}>{al.text}</MenuItem>
//                                 ))}
//                               </TextField>
//                             </Grid>
//                             <Grid size={{xs:12,md:6}}>
//                               <TextField
//                                 select
//                                 label="Instruction"
//                                 name={`answers[${idx}].instructionID`}
//                                 value={a.instructionID}
//                                 onChange={formik.handleChange}
//                                 fullWidth
//                               >
//                                 <MenuItem value={0}>None</MenuItem>
//                                 {instructions.map(ins => (
//                                   <MenuItem key={ins.id} value={ins.id}>{ins.instructionText}</MenuItem>
//                                 ))}
//                               </TextField>
//                             </Grid>
//                             <Grid item xs={12} display="flex" justifyContent="flex-end" alignItems="center">
//                               <Button
//                                 onClick={() => arrayHelpers.remove(idx)}
//                                 size="small"
//                                 color="error"
//                                 variant="outlined"
//                                 sx={{ minWidth: 0, p: "4px 12px", mt: 1, fontWeight: 700 }}
//                                 disabled={formik.values.answers.length === 1}
//                               >Delete</Button>
//                             </Grid>
//                           </Grid>
//                         ))}
//                         <Button
//                           onClick={() => arrayHelpers.push({
//                             id: 0, text: "", rag: 1, nextQuestionID: 0, alertID: 0, instructionID: 0,
//                             instruction: { id: 0, instructionText: "" },
//                             alert: { id: 0, text: "", contactInfo: "" }
//                           })}
//                           color="primary"
//                           variant="outlined"
//                           sx={{ mt: 2, fontWeight: 700 }}
//                           size="small"
//                         >Add Answer</Button>
//                       </>
//                     )}
//                   />
//                 </Grid>
//                 <Grid size={{xs:12}} textAlign="right">
//                   <Button onClick={() => setModalOpen(false)} sx={{ mr: 1 }} disabled={saving} color="error" variant="outlined">
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={saving}
//                     startIcon={saving && <CircularProgress size={18} color="inherit" />}
//                     sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600,bgcolor:seeGreen  }}
//                   >
//                     {editQuestion ? "Update" : "Create"}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           </FormikProvider>
//         </Box>
//       </Modal>

//       {/* Question Detail Dialog */}
//       <Dialog open={detailDialog.open} onClose={closeDetails} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Question Details
//         </DialogTitle>
//         <DialogContent>
//           {detailDialog.question && <QuestionDetails question={detailDialog.question} />}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDetails} variant="contained">Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }



// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress,
//   Tooltip, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Divider, IconButton, Menu, MenuItem,
//   Grid
// } from "@mui/material";
// import { InfoOutlined, Delete as DeleteIcon, MoreVert as MoreVertIcon, Visibility as VisibilityIcon } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";
// import ClipLoader from "react-spinners/ClipLoader";
// import { seeGreen } from "@/components/utils/Colors";

// // --- API URLs ---
// const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
// const API_QUESTION = `${API_BASE}/Question`;
// const API_ALERT = `${API_BASE}/Alert`;
// const API_INSTRUCTION = `${API_BASE}/Instruction`;
// const API_QUESTIONNAIRE = `${API_BASE}/Questionnaire`;

// const QUESTION_TYPES = [
//   { value: 1, label: "Single Choice" },
//   { value: 2, label: "Multi Choice" },
//   { value: 3, label: "Text" }
// ];

// function getToken() {
//   if (typeof window !== "undefined") return localStorage.getItem("token");
//   return "";
// }

// export default function Questions() {
//   // Main state
//   const [questions, setQuestions] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const [instructions, setInstructions] = useState([]);
//   const [questionnaires, setQuestionnaires] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Dialogs
//   const [detailDialog, setDetailDialog] = useState({ open: false, question: null });
//   const [answersDialog, setAnswersDialog] = useState({ open: false, question: null });

//   // Action menu
//   const [menuAnchorEl, setMenuAnchorEl] = useState(null);
//   const [menuRow, setMenuRow] = useState(null);

//   // --- Fetch master lists on mount ---
//   useEffect(() => { fetchAll(); }, []);
//   const fetchAll = async () => {
//     setLoading(true);
//     try {
//       const token = getToken();
//       const [qres, ares, ires, qnres] = await Promise.all([
//         axios.get(API_QUESTION, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_ALERT, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_INSTRUCTION, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_QUESTIONNAIRE, { headers: { Authorization: `Bearer ${token}` } }),
//       ]);
//       setQuestions(Array.isArray(qres.data) ? qres.data : qres.data.data || []);
//       setAlerts(Array.isArray(ares.data) ? ares.data : ares.data.data || []);
//       setInstructions(Array.isArray(ires.data) ? ires.data : ires.data.data || []);
//       setQuestionnaires(Array.isArray(qnres.data) ? qnres.data : qnres.data.data || []);
//     } catch (err) {
//       toast.error("Failed to fetch data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Delete Question ---
//   const handleDelete = async (question) => {
//     Swal.fire({
//       title: "Delete Question?",
//       text: "Are you sure you want to delete this question?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d32f2f",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       reverseButtons: true,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const token = getToken();
//         try {
//           await axios.delete(`${API_QUESTION}/${question.id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Question deleted!");
//           fetchAll();
//         } catch {
//           toast.error("Delete failed.");
//         }
//       }
//     });
//     handleMenuClose();
//   };

//   // --- Dialog Controls ---
//   const openDetails = (question) => setDetailDialog({ open: true, question });
//   const closeDetails = () => setDetailDialog({ open: false, question: null });

//   const openAnswersDialog = (question) => setAnswersDialog({ open: true, question });
//   const closeAnswersDialog = () => setAnswersDialog({ open: false, question: null });

//   // --- Action Menu ---
//   const handleMenuOpen = (event, row) => {
//     setMenuAnchorEl(event.currentTarget);
//     setMenuRow(row);
//   };
//   const handleMenuClose = () => {
//     setMenuAnchorEl(null);
//     setMenuRow(null);
//   };

//   // --- Helper: Ellipsis text ---
//   function EllipsisText({ children, max = 50 }) {
//     if (!children) return null;
//     const text = String(children);
//     if (text.length <= max) return text;
//     return (
//       <Tooltip title={text} arrow>
//         <span>{text.slice(0, max - 2) + "..."}</span>
//       </Tooltip>
//     );
//   }

//   // --- Question Detail Dialog ---
//   const QuestionDetails = ({ question }) => (
//     <Box>
//       <Typography fontWeight={700} mb={1}>Question ID: <span style={{ fontWeight: 400 }}>{question.id}</span></Typography>
//       <Typography fontWeight={700} mb={1}>Text: <span style={{ fontWeight: 400 }}>{question.text}</span></Typography>
//       <Grid container spacing={2} mt={1} mb={2}>
//         <Grid size={{xs:12,md:6}}><b>Sequence:</b> {question.sequence}</Grid>
//         <Grid size={{xs:12,md:6}}><b>Type:</b> {QUESTION_TYPES.find(t => t.value === question.questionType)?.label || question.questionType}</Grid>
//         <Grid size={{xs:12,md:6}}><b>Always Shown:</b> {question.isAlwaysShown ? "Yes" : "No"}</Grid>
//         <Grid size={{xs:12,md:6}}><b>Next Default QID:</b> {question.nextDefaultQuestionID}</Grid>
//         <Grid size={{xs:12,md:6}}><b>Questionnaire:</b> {questionnaires.find(qn => qn.id === question.questionnaireID)?.title}</Grid>
//       </Grid>
//       <Divider sx={{ my: 2 }} />
//       <Button
//         variant="outlined"
//         color="primary"
//         startIcon={<VisibilityIcon />}
//         onClick={() => openAnswersDialog(question)}
//         sx={{ mb: 1, borderRadius: 2, fontWeight: 600 }}
//       >
//         Show Answers
//       </Button>
//     </Box>
//   );

//   // --- Answers Dialog Only ---
//   const AnswersDialogContent = ({ question }) => (
//     <Box>
//       <Typography variant="h6" fontWeight={700} mb={2}>Answers for Question ID {question?.id}</Typography>
//       {question?.answers?.length === 0 ? <Typography>No answers.</Typography> : (
//         question.answers.map((a, idx) => (
//           <Box key={idx} mb={1.5} p={1.5} sx={{ border: "1px solid #eee", borderRadius: 2, background: "#fcfcfc" }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={2}><b>ID:</b> {a.id}</Grid>
//               <Grid item xs={12} md={4}><b>Text:</b> {a.text}</Grid>
//               <Grid item xs={12} md={2}><b>RAG:</b> {a.rag}</Grid>
//               <Grid item xs={12} md={2}><b>Next QID:</b> {a.nextQuestionID}</Grid>
//               <Grid item xs={12} md={2}><b>Alert:</b> {alerts.find(al => al.id === a.alertID)?.text}</Grid>
//               <Grid item xs={12} md={2}><b>Instruction:</b> {instructions.find(ins => ins.id === a.instructionID)?.instructionText}</Grid>
//             </Grid>
//           </Box>
//         ))
//       )}
//     </Box>
//   );

//   // --- Main Render ---
//   return (
//     <Box mx={1} mt={2}>
//       <Toaster position="top-right" />
//       <Box
//         component={motion.div}
//         initial={{ opacity: 0, y: -18 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         mb={3}
//         display="flex"
//         alignItems="center"
//         gap={2}
//         justifyContent="space-between"
//       >
//         <Typography variant="h4" fontWeight={600} color={seeGreen} fontSize={"26px"} mt={2}>
//           Questions Management
//         </Typography>
//         <Button href="/admin-add-new-questions">New Questions</Button>
//       </Box>
//       <Paper
//         component={motion.div}
//         initial={{ opacity: 0, scale: 0.97 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         sx={{ boxShadow: 2, borderRadius: 3, overflow: "auto", minHeight: 380, mb: 4 }}
//       >
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" p={7}>
//             <ClipLoader color="#1976d2" size={54} />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table >
//               <TableHead>
//                 <TableRow sx={{ background: "#f8fafd" }}>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Question</TableCell>
//                   <TableCell>Seq</TableCell>
//                   <TableCell>Type</TableCell>
//                   <TableCell>Always?</TableCell>
//                   <TableCell align="center">Answers</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {questions.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center">No records found.</TableCell>
//                   </TableRow>
//                 ) : (
//                   questions.map((q) => (
//                     <TableRow key={q.id}>
//                       <TableCell>{q.id}</TableCell>
//                       <TableCell>
//                         <EllipsisText max={50}>{q.text}</EllipsisText>
//                       </TableCell>
//                       <TableCell>{q.sequence}</TableCell>
//                       <TableCell>
//                         <Chip label={QUESTION_TYPES.find(t => t.value === q.questionType)?.label || q.questionType} size="small" />
//                       </TableCell>
//                       <TableCell>
//                         {q.isAlwaysShown ? <Chip label="Yes" color="success" size="small" /> : <Chip label="No" color="default" size="small" />}
//                       </TableCell>
//                       <TableCell align="center">
//                         <Tooltip title="Show Answers" arrow>
//                           <IconButton onClick={() => openAnswersDialog(q)} color="info">
//                             <VisibilityIcon />
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                       <TableCell align="center">
//                         <IconButton
//                           onClick={e => handleMenuOpen(e, q)}
//                           size="small"
//                           aria-label="more"
//                         >
//                           <MoreVertIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>

//       {/* Row Actions Menu */}
//       <Menu
//         anchorEl={menuAnchorEl}
//         open={Boolean(menuAnchorEl)}
//         onClose={handleMenuClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//         transformOrigin={{ vertical: "top", horizontal: "left" }}
//         elevation={3}
//       >
//         <MenuItem
//           onClick={() => {
//             openDetails(menuRow);
//             handleMenuClose();
//           }}
//         >
//           <InfoOutlined fontSize="small" sx={{ mr: 1 }} />
//           Details
//         </MenuItem>
//         <MenuItem
//           onClick={() => handleDelete(menuRow)}
//           sx={{ color: "error.main" }}
//         >
//           <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
//           Delete
//         </MenuItem>
//       </Menu>

//       {/* Question Detail Dialog */}
//       <Dialog open={detailDialog.open} onClose={closeDetails} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Question Details
//         </DialogTitle>
//         <DialogContent>
//           {detailDialog.question && <QuestionDetails question={detailDialog.question} />}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDetails} variant="contained">Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Answers Dialog */}
//       <Dialog open={answersDialog.open} onClose={closeAnswersDialog} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Answers List
//         </DialogTitle>
//         <DialogContent>
//           {answersDialog.question && <AnswersDialogContent question={answersDialog.question} />}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeAnswersDialog} variant="contained">Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }




// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress,
//   Tooltip, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Divider, IconButton, Menu, MenuItem,
//   Grid
// } from "@mui/material";
// import { InfoOutlined, Delete as DeleteIcon, MoreVert as MoreVertIcon, Visibility as VisibilityIcon, Edit as EditIcon } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";
// import ClipLoader from "react-spinners/ClipLoader";
// import { useRouter } from "next/navigation";
// import { seeGreen } from "@/components/utils/Colors";

// // --- API URLs ---
// const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
// const API_QUESTION = `${API_BASE}/Question`;
// const API_ALERT = `${API_BASE}/Alert`;
// const API_INSTRUCTION = `${API_BASE}/Instruction`;
// const API_QUESTIONNAIRE = `${API_BASE}/Questionnaire`;

// const QUESTION_TYPES = [
//   { value: 1, label: "Single Choice" },
//   { value: 2, label: "Multi Choice" },
//   { value: 3, label: "Text" }
// ];

// function getToken() {
//   if (typeof window !== "undefined") return localStorage.getItem("token");
//   return "";
// }

// export default function Questions() {
//   // Main state
//   const [questions, setQuestions] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const [instructions, setInstructions] = useState([]);
//   const [questionnaires, setQuestionnaires] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Dialogs
//   const [detailDialog, setDetailDialog] = useState({ open: false, question: null });
//   const [answersDialog, setAnswersDialog] = useState({ open: false, question: null });

//   // Action menu
//   const [menuAnchorEl, setMenuAnchorEl] = useState(null);
//   const [menuRow, setMenuRow] = useState(null);

//   const router = useRouter();

//   // --- Fetch master lists on mount ---
//   useEffect(() => { fetchAll(); }, []);
//   const fetchAll = async () => {
//     setLoading(true);
//     try {
//       const token = getToken();
//       const [qres, ares, ires, qnres] = await Promise.all([
//         axios.get(API_QUESTION, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_ALERT, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_INSTRUCTION, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_QUESTIONNAIRE, { headers: { Authorization: `Bearer ${token}` } }),
//       ]);
//       setQuestions(Array.isArray(qres.data) ? qres.data : qres.data.data || []);
//       setAlerts(Array.isArray(ares.data) ? ares.data : ares.data.data || []);
//       setInstructions(Array.isArray(ires.data) ? ires.data : ires.data.data || []);
//       setQuestionnaires(Array.isArray(qnres.data) ? qnres.data : qnres.data.data || []);
//     } catch (err) {
//       toast.error("Failed to fetch data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Delete Question ---
//   const handleDelete = async (question) => {
//     const res = await Swal.fire({
//       title: "Delete Question?",
//       text: "Are you sure you want to delete this question?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d32f2f",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       reverseButtons: true,
//       focusCancel: true
//     });
//     if (res.isConfirmed) {
//       try {
//         const token = getToken();
//         await axios.delete(`${API_QUESTION}/${question.id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         toast.success("Question deleted!");
//         fetchAll();
//       } catch {
//         toast.error("Delete failed.");
//       }
//     }
//     handleMenuClose();
//   };

//   // --- Dialog Controls ---
//   const openDetails = (question) => setDetailDialog({ open: true, question });
//   const closeDetails = () => setDetailDialog({ open: false, question: null });

//   const openAnswersDialog = (question) => setAnswersDialog({ open: true, question });
//   const closeAnswersDialog = () => setAnswersDialog({ open: false, question: null });

//   // --- Action Menu ---
//   const handleMenuOpen = (event, row) => {
//     setMenuAnchorEl(event.currentTarget);
//     setMenuRow(row);
//   };
//   const handleMenuClose = () => {
//     setMenuAnchorEl(null);
//     setMenuRow(null);
//   };

//   // --- Helper: Ellipsis text ---
//   function EllipsisText({ children, max = 50 }) {
//     if (!children) return null;
//     const text = String(children);
//     if (text.length <= max) return text;
//     return (
//       <Tooltip title={text} arrow>
//         <span>{text.slice(0, max - 2) + "..."}</span>
//       </Tooltip>
//     );
//   }

//   // --- Question Detail Dialog ---
//   const QuestionDetails = ({ question }) => (
//     <Box>
//       <Typography fontWeight={700} mb={1}>Question ID: <span style={{ fontWeight: 400 }}>{question.id}</span></Typography>
//       <Typography fontWeight={700} mb={1}>Text: <span style={{ fontWeight: 400 }}>{question.text}</span></Typography>
//       <Grid container spacing={2} mt={1} mb={2}>
//         <Grid size={{xs:12,md:6}}><b>Sequence:</b> {question.sequence}</Grid>
//         <Grid size={{xs:12,md:6}}><b>Type:</b> {QUESTION_TYPES.find(t => t.value === question.questionType)?.label || question.questionType}</Grid>
//         <Grid size={{xs:12,md:6}}><b>Always Shown:</b> {question.isAlwaysShown ? "Yes" : "No"}</Grid>
//         <Grid size={{xs:12,md:6}}><b>Next Default QID:</b> {question.nextDefaultQuestionID}</Grid>
//         <Grid size={{xs:12,md:6}}><b>Questionnaire:</b> {questionnaires.find(qn => qn.id === question.questionnaireID)?.title}</Grid>
//       </Grid>
//       <Divider sx={{ my: 2 }} />
//       <Button
//         variant="outlined"
//         color="primary"
//         startIcon={<VisibilityIcon />}
//         onClick={() => openAnswersDialog(question)}
//         sx={{ mb: 1, borderRadius: 2, fontWeight: 600 }}
//       >
//         Show Answers
//       </Button>
//     </Box>
//   );

//   // --- Answers Dialog Only ---
//   const AnswersDialogContent = ({ question }) => (
//     <Box>
//       <Typography variant="h6" fontWeight={700} mb={2}>Answers for Question ID {question?.id}</Typography>
//       {question?.answers?.length === 0 ? <Typography>No answers.</Typography> : (
//         question.answers.map((a, idx) => (
//           <Box key={idx} mb={1.5} p={1.5} sx={{ border: "1px solid #eee", borderRadius: 2, background: "#fcfcfc" }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={2}><b>ID:</b> {a.id}</Grid>
//               <Grid item xs={12} md={4}><b>Text:</b> {a.text}</Grid>
//               <Grid item xs={12} md={2}><b>RAG:</b> {a.rag}</Grid>
//               <Grid item xs={12} md={2}><b>Next QID:</b> {a.nextQuestionID}</Grid>
//               <Grid item xs={12} md={2}><b>Alert:</b> {alerts.find(al => al.id === a.alertID)?.text}</Grid>
//               <Grid item xs={12} md={2}><b>Instruction:</b> {instructions.find(ins => ins.id === a.instructionID)?.instructionText}</Grid>
//             </Grid>
//           </Box>
//         ))
//       )}
//     </Box>
//   );

//   // --- Row click navigation (edit page) ---
//   const handleRowClick = (question) => {
//     router.push(`/admin-edit-question/${question.id}`);
//   };

//   // --- Main Render ---
//   return (
//     <Box mx={1} mt={2}>
//       <Toaster position="top-right" />
//       <Box
//         component={motion.div}
//         initial={{ opacity: 0, y: -18 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         mb={3}
//         display="flex"
//         alignItems="center"
//         gap={2}
//         justifyContent="space-between"
//       >
//         <Typography variant="h4" fontWeight={600} color={seeGreen} fontSize={"26px"} mt={2}>
//           Questions Management
//         </Typography>
//         <Button href="/admin-add-new-questions">New Questions</Button>
//       </Box>
//       <Paper
//         component={motion.div}
//         initial={{ opacity: 0, scale: 0.97 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         sx={{ boxShadow: 2, borderRadius: 3, overflow: "auto", minHeight: 380, mb: 4 }}
//       >
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" p={7}>
//             <ClipLoader color="#1976d2" size={54} />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table >
//               <TableHead>
//                 <TableRow sx={{ background: "#f8fafd" }}>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Question</TableCell>
//                   <TableCell>Seq</TableCell>
//                   <TableCell>Type</TableCell>
//                   <TableCell>Always?</TableCell>
//                   <TableCell align="center">Answers</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {questions.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center">No records found.</TableCell>
//                   </TableRow>
//                 ) : (
//                   questions.map((q) => (
//                     <TableRow
//                       key={q.id}
//                       hover
//                       sx={{ cursor: "pointer" }}
//                       onClick={e => {
//                         // Avoid row click when clicking on action menu/buttons
//                         if (
//                           e.target.closest("button") ||
//                           e.target.closest("svg") ||
//                           e.target.closest("a")
//                         ) return;
//                         handleRowClick(q);
//                       }}
//                     >
//                       <TableCell>{q.id}</TableCell>
//                       <TableCell>
//                         <EllipsisText max={50}>{q.text}</EllipsisText>
//                       </TableCell>
//                       <TableCell>{q.sequence}</TableCell>
//                       <TableCell>
//                         <Chip label={QUESTION_TYPES.find(t => t.value === q.questionType)?.label || q.questionType} size="small" />
//                       </TableCell>
//                       <TableCell>
//                         {q.isAlwaysShown ? <Chip label="Yes" color="success" size="small" /> : <Chip label="No" color="default" size="small" />}
//                       </TableCell>
//                       <TableCell align="center">
//                         <Tooltip title="Show Answers" arrow>
//                           <IconButton onClick={e => { e.stopPropagation(); openAnswersDialog(q); }} color="info">
//                             <VisibilityIcon />
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                       <TableCell align="center">
//                         <IconButton
//                           onClick={e => { e.stopPropagation(); handleMenuOpen(e, q); }}
//                           size="small"
//                           aria-label="more"
//                         >
//                           <MoreVertIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>

//       {/* Row Actions Menu */}
//       <Menu
//         anchorEl={menuAnchorEl}
//         open={Boolean(menuAnchorEl)}
//         onClose={handleMenuClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//         transformOrigin={{ vertical: "top", horizontal: "left" }}
//         elevation={3}
//       >
//         <MenuItem
//           onClick={() => {
//             openDetails(menuRow);
//             handleMenuClose();
//           }}
//         >
//           <InfoOutlined fontSize="small" sx={{ mr: 1 }} />
//           Details
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             router.push(`/admin-edit-question/${menuRow?.id}`);
//             handleMenuClose();
//           }}
//         >
//           <EditIcon fontSize="small" sx={{ mr: 1 }} />
//           Edit
//         </MenuItem>
//         <MenuItem
//           onClick={() => handleDelete(menuRow)}
//           sx={{ color: "error.main" }}
//         >
//           <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
//           Delete
//         </MenuItem>
//       </Menu>

//       {/* Question Detail Dialog */}
//       <Dialog open={detailDialog.open} onClose={closeDetails} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Question Details
//         </DialogTitle>
//         <DialogContent>
//           {detailDialog.question && <QuestionDetails question={detailDialog.question} />}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDetails} variant="contained">Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Answers Dialog */}
//       <Dialog open={answersDialog.open} onClose={closeAnswersDialog} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Answers List
//         </DialogTitle>
//         <DialogContent>
//           {answersDialog.question && <AnswersDialogContent question={answersDialog.question} />}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeAnswersDialog} variant="contained">Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import {
  Box, Button, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress,
  Tooltip, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Divider, IconButton, Menu, MenuItem, Grid, TextField
} from "@mui/material";
import { InfoOutlined, Delete as DeleteIcon, MoreVert as MoreVertIcon, Visibility as VisibilityIcon, Edit as EditIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import { seeGreen } from "@/components/utils/Colors";

// --- API URLs ---
const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
const API_QUESTION = `${API_BASE}/Question`;
const API_ALERT = `${API_BASE}/Alert`;
const API_INSTRUCTION = `${API_BASE}/Instruction`;
const API_QUESTIONNAIRE = `${API_BASE}/Questionnaire`;

const QUESTION_TYPES = [
  { value: 1, label: "Single Choice" },
  { value: 2, label: "Multi Choice" },
  { value: 3, label: "Text" }
];
const RAG_TYPES = [
  { value: 1, label: "Green" },
  { value: 2, label: "Amber" },
  { value: 3, label: "Red" }
];

function getToken() {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return "";
}

export default function Questions() {
  // Main state
  const [questions, setQuestions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialogs
  const [detailDialog, setDetailDialog] = useState({ open: false, question: null });
  const [answersDialog, setAnswersDialog] = useState({ open: false, question: null });

  // Edit dialog state
  const [editDialog, setEditDialog] = useState({ open: false, question: null });

  // Action menu
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuRow, setMenuRow] = useState(null);

  // --- Fetch master lists on mount ---
  useEffect(() => { fetchAll(); }, []);
  const fetchAll = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const [qres, ares, ires, qnres] = await Promise.all([
        axios.get(API_QUESTION, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(API_ALERT, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(API_INSTRUCTION, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(API_QUESTIONNAIRE, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setQuestions(Array.isArray(qres.data) ? qres.data : qres.data.data || []);
      setAlerts(Array.isArray(ares.data) ? ares.data : ares.data.data || []);
      setInstructions(Array.isArray(ires.data) ? ires.data : ires.data.data || []);
      setQuestionnaires(Array.isArray(qnres.data) ? qnres.data : qnres.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  // --- Delete Question ---
  const handleDelete = async (question) => {
    const res = await Swal.fire({
      title: "Delete Question?",
      text: "Are you sure you want to delete this question?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
      focusCancel: true
    });
    if (res.isConfirmed) {
      try {
        const token = getToken();
        await axios.delete(`${API_QUESTION}/${question.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Question deleted!");
        fetchAll();
      } catch {
        toast.error("Delete failed.");
      }
    }
    handleMenuClose();
  };

  // --- Dialog Controls ---
  const openDetails = (question) => setDetailDialog({ open: true, question });
  const closeDetails = () => setDetailDialog({ open: false, question: null });

  const openAnswersDialog = (question) => setAnswersDialog({ open: true, question });
  const closeAnswersDialog = () => setAnswersDialog({ open: false, question: null });

  // --- EDIT DIALOG ---
  const openEditDialog = (question) => setEditDialog({ open: true, question });
  const closeEditDialog = () => setEditDialog({ open: false, question: null });

  // --- Action Menu ---
  const handleMenuOpen = (event, row) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuRow(row);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuRow(null);
  };

  // --- Helper: Ellipsis text ---
  function EllipsisText({ children, max = 50 }) {
    if (!children) return null;
    const text = String(children);
    if (text.length <= max) return text;
    return (
      <Tooltip title={text} arrow>
        <span>{text.slice(0, max - 2) + "..."} </span>
      </Tooltip>
    );
  }

  // --- Question Detail Dialog ---
  const QuestionDetails = ({ question }) => (
    <Box>
      <Typography fontWeight={700} mb={1}>Question ID: <span style={{ fontWeight: 400 }}>{question.id}</span></Typography>
      <Typography fontWeight={700} mb={1}>Text: <span style={{ fontWeight: 400 }}>{question.text}</span></Typography>
      <Grid container spacing={2} mt={1} mb={2}>
        <Grid size={{xs:12,md:6}}><b>Sequence:</b> {question.sequence}</Grid>
        <Grid size={{xs:12,md:6}}><b>Type:</b> {QUESTION_TYPES.find(t => t.value === question.questionType)?.label || question.questionType}</Grid>
        <Grid size={{xs:12,md:6}}><b>Always Shown:</b> {question.isAlwaysShown ? "Yes" : "No"}</Grid>
        <Grid size={{xs:12,md:6}}><b>Next Default QID:</b> {question.nextDefaultQuestionID}</Grid>
        <Grid size={{xs:12,md:6}}><b>Questionnaire:</b> {questionnaires.find(qn => qn.id === question.questionnaireID)?.title}</Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Button
        variant="outlined"
        color="primary"
        startIcon={<VisibilityIcon />}
        onClick={() => openAnswersDialog(question)}
        sx={{ mb: 1, borderRadius: 2, fontWeight: 600 }}
      >
        Show Answers
      </Button>
    </Box>
  );

  // --- Answers Dialog Only ---
  const AnswersDialogContent = ({ question }) => (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2}>Answers for Question ID {question?.id}</Typography>
      {question?.answers?.length === 0 ? <Typography>No answers.</Typography> : (
        question.answers.map((a, idx) => (
          <Box key={idx} mb={1.5} p={1.5} sx={{ border: "1px solid #eee", borderRadius: 2, background: "#fcfcfc" }}>
            <Grid container spacing={2}>
              <Grid size={{xs:12,md:2}}><b>ID:</b> {a.id}</Grid>
              <Grid size={{xs:12,md:4}}><b>Text:</b> {a.text}</Grid>
              <Grid size={{xs:12,md:2}}><b>RAG:</b> {a.rag}</Grid>
              <Grid size={{xs:12,md:2}}><b>Next QID:</b> {a.nextQuestionID}</Grid>
              <Grid size={{xs:12,md:2}}><b>Alert:</b> {alerts.find(al => al.id === a.alertID)?.text}</Grid>
              <Grid size={{xs:12,md:2}}><b>Instruction:</b> {instructions.find(ins => ins.id === a.instructionID)?.instructionText}</Grid>
            </Grid>
          </Box>
        ))
      )}
    </Box>
  );

  // --- EDIT FORM ---
  function EditForm({ question, onClose, onSuccess }) {
    const [saving, setSaving] = useState(false);

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: question || {
        text: "",
        sequence: 0,
        isAlwaysShown: false,
        nextDefaultQuestionID: null,
        questionType: 1,
        answers: [{
          text: "",
          rag: 1,
          nextQuestionID: null,
          alertID: null,
          instructionID: null
        }],
        questionnaireID: ""
      },
      validationSchema: Yup.object({
        text: Yup.string().required("Required"),
        sequence: Yup.number().min(0).required("Required"),
        questionType: Yup.number().required("Required"),
        answers: Yup.array().of(
          Yup.object({
            text: Yup.string().required("Required"),
            rag: Yup.number().required("Required"),
          })
        ).min(1, "At least 1 answer required")
      }),
      onSubmit: async (values) => {
        setSaving(true);
        try {
          const token = getToken();
          const cleaned = {
            ...values,
            answers: values.answers.map((a) => ({
              text: a.text,
              rag: a.rag,
              nextQuestionID: a.nextQuestionID === "" ? null : a.nextQuestionID,
              alertID: a.alertID === "" ? null : a.alertID,
              instructionID: a.instructionID === "" ? null : a.instructionID,
            }))
          };
          await axios.put(`${API_QUESTION}/${question.id}`, cleaned, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toast.success("Question updated!");
          onSuccess();
          onClose();
        } catch {
          toast.error("Failed to update.");
        } finally {
          setSaving(false);
        }
      }
    });

    return (
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Grid container spacing={2} sx={{mt:2}}>
            <Grid size={{xs:12,md:8}}>
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
            <Grid size={{xs:12,md:4}}>
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
            <Grid size={{xs:12,md:6}}>
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
            <Grid size={{xs:12,md:6}}>
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
            <Grid size={{xs:12,md:6}}>
              <TextField
                label="Next Default Question ID"
                name="nextDefaultQuestionID"
                type="number"
                value={formik.values.nextDefaultQuestionID ?? ""}
                onChange={formik.handleChange}
                fullWidth
              />
            </Grid>
            <Grid size={{xs:12,md:6}}>
              <TextField
                select
                label="Questionnaire"
                name="questionnaireID"
                value={formik.values.questionnaireID ?? ""}
                onChange={formik.handleChange}
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
                          <Grid size={{xs:12,md:6}}>
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
                          <Grid size={{xs:12,md:3}}>
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
                          <Grid size={{xs:12,md:3}}>
                            <TextField
                              label="Next QID"
                              name={`answers[${idx}].nextQuestionID`}
                              type="number"
                              value={a.nextQuestionID ?? ""}
                              onChange={formik.handleChange}
                              fullWidth
                            />
                          </Grid>
                          <Grid size={{xs:12,md:3}}>
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
                          <Grid size={{xs:12,md:3}}>
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
                          <Grid size={{xs:12,md:3}}>
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
                        instructionID: null
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
                onClick={onClose}
                variant="outlined"
                color="error"
                sx={{ mr: 2, borderRadius: 2, fontWeight: 600 }}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                startIcon={saving && <CircularProgress size={18} color="inherit" />}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 ,bgcolor:seeGreen}}
              >
                {saving ? "Saving..." : "Update Question"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
    );
  }

  // --- Main Render ---
  return (
    <Box mx={1} mt={2}>
      <Toaster position="top-right" />
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        mb={3}
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="space-between"
      >
        <Typography variant="h4" fontWeight={600} color={seeGreen} fontSize={"26px"} mt={2}>
          Questions Management
        </Typography>
        <Button href="/admin-add-new-questions" variant="contained" sx={{bgcolor:seeGreen,textTransform:"none"}}>New Questions</Button>
      </Box>
      <Paper
        component={motion.div}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        sx={{ boxShadow: 2, borderRadius: 3, overflow: "auto", minHeight: 380, mb: 4 }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={7}>
            <ClipLoader color="#1976d2" size={54} />
          </Box>
        ) : (
          <TableContainer>
            <Table >
              <TableHead>
                <TableRow sx={{ background: "#f8fafd" }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Seq</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Always?</TableCell>
                  <TableCell align="center">Answers</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">No records found.</TableCell>
                  </TableRow>
                ) : (
                  questions.map((q) => (
                    <TableRow
                      key={q.id}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={e => {
                        if (
                          e.target.closest("button") ||
                          e.target.closest("svg") ||
                          e.target.closest("a")
                        ) return;
                        openEditDialog(q); // Open edit dialog on row click
                      }}
                    >
                      <TableCell>{q.id}</TableCell>
                      <TableCell>
                        <EllipsisText max={50}>{q.text}</EllipsisText>
                      </TableCell>
                      <TableCell>{q.sequence}</TableCell>
                      <TableCell>
                        <Chip label={QUESTION_TYPES.find(t => t.value === q.questionType)?.label || q.questionType} size="small" />
                      </TableCell>
                      <TableCell>
                        {q.isAlwaysShown ? <Chip label="Yes" color="success" size="small" /> : <Chip label="No" color="default" size="small" />}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Show Answers" arrow>
                          <IconButton onClick={e => { e.stopPropagation(); openAnswersDialog(q); }} color="info">
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={e => { e.stopPropagation(); handleMenuOpen(e, q); }}
                          size="small"
                          aria-label="more"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Row Actions Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        elevation={3}
      >
        <MenuItem
          onClick={() => {
            openDetails(menuRow);
            handleMenuClose();
          }}
        >
          <InfoOutlined fontSize="small" sx={{ mr: 1 }} />
          Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            openEditDialog(menuRow);
            handleMenuClose();
          }}
        >
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => handleDelete(menuRow)}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Question Detail Dialog */}
      <Dialog open={detailDialog.open} onClose={closeDetails} maxWidth="md" fullWidth>
        <DialogTitle>
          Question Details
        </DialogTitle>
        <DialogContent>
          {detailDialog.question && <QuestionDetails question={detailDialog.question} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetails} variant="contained">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Answers Dialog */}
      <Dialog open={answersDialog.open} onClose={closeAnswersDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Answers List
        </DialogTitle>
        <DialogContent>
          {answersDialog.question && <AnswersDialogContent question={answersDialog.question} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAnswersDialog} variant="contained">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onClose={closeEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          {editDialog.question && (
            <EditForm
              question={editDialog.question}
              onClose={closeEditDialog}
              onSuccess={fetchAll}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
