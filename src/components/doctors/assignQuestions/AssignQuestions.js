// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Box, Button, Typography, Modal, Grid, TextField, IconButton, Table, TableContainer,
//   TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Tooltip, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions
// } from "@mui/material";
// import { Add, Edit, Delete, InfoOutlined } from "@mui/icons-material";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";
// import ClipLoader from "react-spinners/ClipLoader";

// const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
// const API_PATIENT_QUERY_SET = `${API_BASE}/PatientQuerySet`;
// const API_PATIENT = `${API_BASE}/Patient`;
// const API_QUESTIONNAIRE = `${API_BASE}/Questionnaire`;

// function getToken() {
//   if (typeof window !== "undefined") return localStorage.getItem("token");
//   return "";
// }

// const initialSet = {
//   id: 0,
//   patientId: "",
//   questionnaireId: "",
//   description: "",
// };

// export default function AssignQuestions() {
//   const [sets, setSets] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [questionnaires, setQuestionnaires] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editSet, setEditSet] = useState(null);
//   const [infoDialog, setInfoDialog] = useState({ open: false, set: null });

//   // --- GET All ---
//   const fetchAll = async () => {
//     setLoading(true);
//     try {
//       const token = getToken();
//       const [
//         qSetRes,
//         patRes,
//         qnrRes
//       ] = await Promise.all([
//         axios.get(API_PATIENT_QUERY_SET, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_PATIENT, { headers: { Authorization: `Bearer ${token}` } }),
//         axios.get(API_QUESTIONNAIRE, { headers: { Authorization: `Bearer ${token}` } }),
//       ]);
//       setSets(Array.isArray(qSetRes.data) ? qSetRes.data : qSetRes.data.data || []);
//       setPatients(Array.isArray(patRes.data) ? patRes.data : patRes.data.data || []);
//       setQuestionnaires(Array.isArray(qnrRes.data) ? qnrRes.data : qnrRes.data.data || []);
//     } catch (err) {
//       toast.error("Failed to load data.", { style: { zIndex: 99999 } });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchAll(); }, []);

//   // --- Add/Edit Form ---
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: editSet ? { ...editSet } : initialSet,
//     validationSchema: Yup.object({
//       patientId: Yup.number().required("Select patient"),
//       questionnaireId: Yup.number().required("Select questionnaire"),
//       description: Yup.string().required("Description required"),
//     }),
//     onSubmit: async (values) => {
//       setSaving(true);
//       try {
//         const cleaned = {
//           ...values,
//           patientId: Number(values.patientId),
//           questionnaireId: Number(values.questionnaireId),
//         };
//         const token = getToken();
//         if (editSet) {
//           await axios.put(`${API_PATIENT_QUERY_SET}/${editSet.id}`, cleaned, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Assigned questions updated!", { style: { zIndex: 99999 } });
//         } else {
//           await axios.post(API_PATIENT_QUERY_SET, cleaned, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Questions assigned!", { style: { zIndex: 99999 } });
//         }
//         setModalOpen(false);
//         setEditSet(null);
//         fetchAll();
//       } catch (err) {
//         let errorMsg = "Save failed.";
//         if (err?.response?.data?.message) errorMsg = err.response.data.message;
//         toast.error(errorMsg, { style: { zIndex: 99999 } });
//       } finally {
//         setSaving(false);
//       }
//     },
//   });

//   // --- Delete ---
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Delete Assignment?",
//       text: "Are you sure you want to remove this assignment?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d32f2f",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete!",
//       reverseButtons: true,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const token = getToken();
//           await axios.delete(`${API_PATIENT_QUERY_SET}/${id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Assignment deleted!", { style: { zIndex: 99999 } });
//           fetchAll();
//         } catch (err) {
//           let errorMsg = "Delete failed.";
//           if (err?.response?.data?.message) errorMsg = err.response.data.message;
//           toast.error(errorMsg, { style: { zIndex: 99999 } });
//         }
//       }
//     });
//   };

//   // --- Modal / Info ---
//   const openEdit = (s) => { setEditSet(s); setModalOpen(true); };
//   const openAdd = () => { setEditSet(null); setModalOpen(true); };
//   const openInfo = (s) => setInfoDialog({ open: true, set: s });
//   const closeInfo = () => setInfoDialog({ open: false, set: null });

//   // --- Modal Style ---
//   const modalStyle = {
//     position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
//     width: "96vw", maxWidth: 640, bgcolor: "background.paper", boxShadow: 24,
//     borderRadius: 3, p: 3, maxHeight: "92vh", overflow: "auto"
//   };

//   // --- Info Dialog ---
//   const InfoDetails = ({ set }) => (
//     <Box>
//       <Typography variant="h6" fontWeight={700} mb={2}>Assignment Detail</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}><b>Patient:</b> {patients.find(p => p.id === set.patientId)?.firstName} {patients.find(p => p.id === set.patientId)?.lastName}</Grid>
//         <Grid item xs={12} md={6}><b>Questionnaire:</b> {questionnaires.find(qn => qn.id === set.questionnaireId)?.title}</Grid>
//         <Grid item xs={12}><b>Description:</b> {set.description}</Grid>
//       </Grid>
//     </Box>
//   );

//   // --- Render ---
//   return (
//     <Box p={{ xs: 1, md: 3 }} sx={{ width: "100%", maxWidth: 900, mx: "auto" }}>
//       <Toaster position="top-center" toastOptions={{ style: { zIndex: 99999 } }} />
//       <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
//         <Typography variant="h4" fontWeight="bold" color="primary">
//           Assign Questions to Patient
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={openAdd}
//           sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600, px: 3, py: 1.3, fontSize: 18 }}
//         >
//           Assign
//         </Button>
//       </Box>
//       <Paper sx={{
//         boxShadow: 2, borderRadius: 3, overflow: "auto", minHeight: 340, mb: 4,
//         background: "#fcfcfc"
//       }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" p={7}>
//             <ClipLoader color="#1976d2" size={46} />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ background: "#f8fafd" }}>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Patient</TableCell>
//                   <TableCell>Questionnaire</TableCell>
//                   <TableCell>Description</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {sets.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">No assignments found.</TableCell>
//                   </TableRow>
//                 ) : (
//                   sets.map((s) => (
//                     <TableRow key={s.id}>
//                       <TableCell>{s.id}</TableCell>
//                       <TableCell>
//                         {patients.find(p => p.id === s.patientId)
//                           ? `${patients.find(p => p.id === s.patientId)?.firstName} ${patients.find(p => p.id === s.patientId)?.lastName}`
//                           : s.patientId}
//                       </TableCell>
//                       <TableCell>
//                         {questionnaires.find(qn => qn.id === s.questionnaireId)?.title || s.questionnaireId}
//                       </TableCell>
//                       <TableCell>{s.description}</TableCell>
//                       <TableCell>
//                         <Tooltip title="Info"><IconButton onClick={() => openInfo(s)}><InfoOutlined /></IconButton></Tooltip>
//                         <Tooltip title="Edit"><IconButton onClick={() => openEdit(s)} color="primary"><Edit /></IconButton></Tooltip>
//                         <Tooltip title="Delete"><IconButton onClick={() => handleDelete(s.id)} color="error"><Delete /></IconButton></Tooltip>
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
//         <Box sx={modalStyle}>
//           <Typography variant="h6" mb={2} fontWeight="bold">
//             {editSet ? "Edit Assignment" : "Assign Questions"}
//           </Typography>
//           <form onSubmit={formik.handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   select
//                   label="Patient"
//                   name="patientId"
//                   value={formik.values.patientId || ""}
//                   onChange={formik.handleChange}
//                   error={formik.touched.patientId && !!formik.errors.patientId}
//                   helperText={formik.touched.patientId && formik.errors.patientId}
//                   fullWidth
//                   required
//                 >
//                   <MenuItem value="">Select Patient</MenuItem>
//                   {patients.map((p) => (
//                     <MenuItem key={p.id} value={p.id}>{p.firstName} {p.lastName}</MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   select
//                   label="Questionnaire"
//                   name="questionnaireId"
//                   value={formik.values.questionnaireId || ""}
//                   onChange={formik.handleChange}
//                   error={formik.touched.questionnaireId && !!formik.errors.questionnaireId}
//                   helperText={formik.touched.questionnaireId && formik.errors.questionnaireId}
//                   fullWidth
//                   required
//                 >
//                   <MenuItem value="">Select Questionnaire</MenuItem>
//                   {questionnaires.map((q) => (
//                     <MenuItem key={q.id} value={q.id}>{q.title}</MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Description"
//                   name="description"
//                   value={formik.values.description}
//                   onChange={formik.handleChange}
//                   error={formik.touched.description && !!formik.errors.description}
//                   helperText={formik.touched.description && formik.errors.description}
//                   fullWidth
//                   multiline
//                   rows={3}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} textAlign="right">
//                 <Button onClick={() => setModalOpen(false)} sx={{ mr: 1 }} disabled={saving}>
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={saving}
//                   startIcon={saving && <CircularProgress size={18} color="inherit" />}
//                   sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, px: 4, py: 1.3, fontSize: 17 }}
//                 >
//                   {editSet ? "Update" : "Assign"}
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </Box>
//       </Modal>

//       {/* Info Dialog */}
//       <Dialog open={infoDialog.open} onClose={closeInfo} maxWidth="sm" fullWidth>
//         <DialogTitle>Assignment Info</DialogTitle>
//         <DialogContent>
//           {infoDialog.set && <InfoDetails set={infoDialog.set} />}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeInfo} variant="contained">Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import {
  Box, Button, Typography, Modal, Grid, TextField, IconButton, Table, TableContainer,
  TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Tooltip, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { Add, Edit, Delete, InfoOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import { seeGreen } from "@/components/utils/Colors";

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
const API_PATIENT_QUERY_SET = `${API_BASE}/PatientQuerySet`;
const API_PATIENT = `${API_BASE}/Patient`;
const API_QUESTIONNAIRE = `${API_BASE}/Questionnaire`;

function getToken() {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return "";
}

const initialSet = {
  id: 0,
  patientId: "",
  questionnaireId: "",
  description: "",
};

export default function AssignQuestions() {
  const [sets, setSets] = useState([]);
  const [patients, setPatients] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editSet, setEditSet] = useState(null);
  const [infoDialog, setInfoDialog] = useState({ open: false, set: null });

  // --- GET All ---
  const fetchAll = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const [
        qSetRes,
        patRes,
        qnrRes
      ] = await Promise.all([
        axios.get(API_PATIENT_QUERY_SET, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(API_PATIENT, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(API_QUESTIONNAIRE, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setSets(Array.isArray(qSetRes.data) ? qSetRes.data : qSetRes.data.data || []);
      setPatients(Array.isArray(patRes.data) ? patRes.data : patRes.data.data || []);
      setQuestionnaires(Array.isArray(qnrRes.data) ? qnrRes.data : qnrRes.data.data || []);
    } catch (err) {
      toast.error("Failed to load data.", { style: { zIndex: 99999 } });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // --- Add/Edit Form ---
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editSet ? { ...editSet } : initialSet,
    validationSchema: Yup.object({
      patientId: Yup.number().required("Select patient"),
      questionnaireId: Yup.number().required("Select questionnaire"),
      description: Yup.string().required("Description required"),
    }),
    onSubmit: async (values) => {
      setSaving(true);
      try {
        const cleaned = {
          ...values,
          patientId: Number(values.patientId),
          questionnaireId: Number(values.questionnaireId),
        };
        const token = getToken();
        if (editSet) {
          await axios.put(`${API_PATIENT_QUERY_SET}/${editSet.id}`, cleaned, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toast.success("Assignment updated!", { style: { zIndex: 99999 } });
        } else {
          await axios.post(API_PATIENT_QUERY_SET, cleaned, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toast.success("Assignment created!", { style: { zIndex: 99999 } });
        }
        setModalOpen(false);
        setEditSet(null);
        fetchAll();
      } catch (err) {
        let errorMsg = "Save failed.";
        if (err?.response?.data?.message) errorMsg = err.response.data.message;
        toast.error(errorMsg, { style: { zIndex: 99999 } });
      } finally {
        setSaving(false);
      }
    },
  });

  // --- Delete ---
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Delete Assignment?",
//       text: "Are you sure you want to remove this assignment?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d32f2f",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete!",
//       reverseButtons: true,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const token = getToken();
//           // --- DELETE endpoint with id as path param ---
//           await axios.delete(`${API_PATIENT_QUERY_SET}/${id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           toast.success("Assignment deleted!", { style: { zIndex: 99999 } });
//           fetchAll();
//         } catch (err) {
//           let errorMsg = "Delete failed.";
//           if (err?.response?.data?.message) errorMsg = err.response.data.message;
//           toast.error(errorMsg, { style: { zIndex: 99999 } });
//         }
//       }
//     });
//   };
// Correct delete call
const handleDelete = async (id) => {
  try {
    const token = getToken();
    await axios.delete(`${API_PATIENT_QUERY_SET}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.success("Assignment deleted!", { style: { zIndex: 99999 } });
    fetchAll();
  } catch (err) {
    toast.error("Delete failed.", { style: { zIndex: 99999 } });
  }
};

  // --- Modal / Info ---
  const openEdit = (s) => { setEditSet(s); setModalOpen(true); };
  const openAdd = () => { setEditSet(null); setModalOpen(true); };
  const openInfo = (s) => setInfoDialog({ open: true, set: s });
  const closeInfo = () => setInfoDialog({ open: false, set: null });

  // --- Modal Style ---
  const modalStyle = {
    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
    width: "96vw", maxWidth: 640, bgcolor: "background.paper", boxShadow: 24,
    borderRadius: 3, p: 3, maxHeight: "92vh", overflow: "auto"
  };

  // --- Info Dialog ---
  const InfoDetails = ({ set }) => (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2}>Assignment Detail</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}><b>Patient:</b> {patients.find(p => p.id === set.patientId)?.firstName} {patients.find(p => p.id === set.patientId)?.lastName}</Grid>
        <Grid item xs={12} md={6}><b>Questionnaire:</b> {questionnaires.find(qn => qn.id === set.questionnaireId)?.title}</Grid>
        <Grid item xs={12}><b>Description:</b> {set.description}</Grid>
      </Grid>
    </Box>
  );

  // --- Render ---
  return (
    <Box mx={1} mt={2} >
      <Toaster position="top-center" toastOptions={{ style: { zIndex: 99999 } }} />
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography    variant="h4"
          fontWeight={600}
          
          color={seeGreen}
      
          mb={3}
          fontSize={"26px"}
          letterSpacing={1}>
          Assign Questions to Patient
        </Typography>
        <Button
        variant="contained"
                   startIcon={<Add />}
                   onClick={openAdd}
                   sx={{
                     borderRadius: 2, textTransform:"none",
                     fontSize: "16px", 
                     bgcolor:seeGreen
                   }}
        >
          Assign
        </Button>
      </Box>
      <Box sx={{
          boxShadow: "0 2px 16px 0 rgba(0,0,0,0.1)", borderRadius: 3, overflow: "auto", mb: 4,
        // background: "#fcfcfc"
      }}>
        {loading ? (
           <Box display="flex" justifyContent="center" alignItems="center" p={7}>
              <ClipLoader color={seeGreen} size={54} />
            </Box>
        ) : (
          <TableContainer>
            <Table >
              <TableHead>
                <TableRow >
                  <TableCell>ID</TableCell>
                  <TableCell>Patient</TableCell>
                  <TableCell>Questionnaire</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No assignments found.</TableCell>
                  </TableRow>
                ) : (
                  sets.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.id}</TableCell>
                      <TableCell>
                        {patients.find(p => p.id === s.patientId)
                          ? `${patients.find(p => p.id === s.patientId)?.firstName} ${patients.find(p => p.id === s.patientId)?.lastName}`
                          : s.patientId}
                      </TableCell>
                      <TableCell>
                        {questionnaires.find(qn => qn.id === s.questionnaireId)?.title || s.questionnaireId}
                      </TableCell>
                      <TableCell>{s.description}</TableCell>
                      <TableCell>
                        <Tooltip title="Info"><IconButton onClick={() => openInfo(s)}><InfoOutlined /></IconButton></Tooltip>
                        <Tooltip title="Edit"><IconButton onClick={() => openEdit(s)} color="primary"><Edit /></IconButton></Tooltip>
                        {/* DELETE -- id as path param */}
                        <Tooltip title="Delete"><IconButton onClick={() => handleDelete(s.id)} color="error"><Delete /></IconButton></Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2} fontWeight="bold">
            {editSet ? "Edit Assignment" : "Assign Questions"}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid  size={{xs:12,md:6}}>
                <TextField
                  select
                  label="Patient"
                  name="patientId"
                  value={formik.values.patientId || ""}
                  onChange={formik.handleChange}
                  error={formik.touched.patientId && !!formik.errors.patientId}
                  helperText={formik.touched.patientId && formik.errors.patientId}
                  fullWidth
                  required
                >
                  <MenuItem value="">Select Patient</MenuItem>
                  {patients.map((p) => (
                    <MenuItem key={p.id} value={p.id}>{p.firstName} {p.lastName}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{xs:12,md:6}}>
                <TextField
                  select
                  label="Questionnaire"
                  name="questionnaireId"
                  value={formik.values.questionnaireId || ""}
                  onChange={formik.handleChange}
                  error={formik.touched.questionnaireId && !!formik.errors.questionnaireId}
                  helperText={formik.touched.questionnaireId && formik.errors.questionnaireId}
                  fullWidth
                  required
                >
                  <MenuItem value="">Select Questionnaire</MenuItem>
                  {questionnaires.map((q) => (
                    <MenuItem key={q.id} value={q.id}>{q.title}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{xs:12}}>
                <TextField
                  label="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && !!formik.errors.description}
                  helperText={formik.touched.description && formik.errors.description}
                  fullWidth
                  multiline
                  rows={3}
                  required
                />
              </Grid>
              <Grid size={{xs:12}} textAlign="right" >
              <Box display={"flex"} justifyContent={"flex-end"}>
  <Button color="error" variant="outlined" onClick={() => setModalOpen(false)} sx={{ mr: 1 }} disabled={saving}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                  size="medium"
                  startIcon={saving && <CircularProgress size={18} color="inherit" />}
                  sx={{  textTransform: "none",bgcolor:seeGreen }}
                >
                  {editSet ? "Update" : "Assign"}
                </Button>
              </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      {/* Info Dialog */}
      <Dialog open={infoDialog.open} onClose={closeInfo} maxWidth="sm" fullWidth>
        <DialogTitle>Assignment Info</DialogTitle>
        <DialogContent>
          {infoDialog.set && <InfoDetails set={infoDialog.set} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeInfo} variant="contained">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
