// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Typography, Modal, Grid, TextField, IconButton, Table, TableContainer,
//   TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Tooltip, MenuItem, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Divider
// } from "@mui/material";
// import { Add, Edit, Delete, InfoOutlined } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";
// import ClipLoader from "react-spinners/ClipLoader";

// const API_BASE = "http://api.virtual.gpline.ie/api/v0.1/Patient";

// const GENDER = [
//   { value: 1, label: "Male" },
//   { value: 2, label: "Female" },
//   { value: 3, label: "Other" }
// ];
// const STATUS = [
//   { value: 1, label: "Active", color: "success" },
//   { value: 2, label: "Inactive", color: "warning" },
//   { value: 3, label: "Pending", color: "info" },
//   { value: 4, label: "Suspended", color: "error" }
// ];

// const initialPatient = {
//   id: 0,
//   firstName: "",
//   lastName: "",
//   userName: "",
//   email: "",
//   password: "",
//   phoneNumber: "",
//   medicalHistory: "",
//   emergencyContact: "",
//   status: 1,
//   gender: 1,
//   address: "",
//   notes: "",
//   mrn: "",
//   admitTime: "",
//   dischargeTime: "",
//   surgeryType: "",
//   reviewBy: 0,
// };

// export default function Patients() {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editPatient, setEditPatient] = useState(null);
//   const [detailDialog, setDetailDialog] = useState({ open: false, patient: null });
//   const [saving, setSaving] = useState(false);

//   // GET all patients
//   useEffect(() => { fetchPatients(); }, []);
//   const fetchPatients = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(API_BASE);
//       setPatients(data.data || []);
//     } catch (err) {
//       toast.error("Failed to fetch patients.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // DELETE
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Delete Patient?",
//       text: "Are you sure you want to delete this patient?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d32f2f",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       reverseButtons: true,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${API_BASE}/${id}`);
//           toast.success("Patient deleted!");
//           fetchPatients();
//         } catch (err) {
//           toast.error("Delete failed.");
//         }
//       }
//     });
//   };

//   // CREATE/EDIT (POST/PUT)
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: editPatient ? {
//       ...editPatient,
//       admitTime: editPatient.admitTime ? editPatient.admitTime.substring(0, 16) : "",
//       dischargeTime: editPatient.dischargeTime ? editPatient.dischargeTime.substring(0, 16) : "",
//       password: "",
//       userName: editPatient.user?.userName ?? editPatient.userName ?? "",
//       email: editPatient.user?.email ?? editPatient.email ?? "",
//       phoneNumber: editPatient.user?.phoneNumber ?? editPatient.phoneNumber ?? "",
//     } : initialPatient,
//     validationSchema: Yup.object({
//       firstName: Yup.string().required("First name required"),
//       lastName: Yup.string().required("Last name required"),
//       userName: Yup.string().required("Username required"),
//       email: Yup.string().email().required("Email required"),
//       phoneNumber: Yup.string().required("Phone number required"),
//       status: Yup.number().required(),
//       gender: Yup.number().required(),
//       mrn: Yup.string(),
//       admitTime: Yup.string(),
//       dischargeTime: Yup.string(),
//       surgeryType: Yup.string(),
//       reviewBy: Yup.number(),
//       medicalHistory: Yup.string(),
//       emergencyContact: Yup.string(),
//       address: Yup.string(),
//       notes: Yup.string(),
//       password: Yup.string().when("id", {
//         is: (id) => !id,
//         then: schema => schema.required("Password required"),
//         otherwise: schema => schema
//       }),
//     }),
//     onSubmit: async (values) => {
//       setSaving(true);
//       try {
//         const cleaned = {
//           ...values,
//           admitTime: values.admitTime ? new Date(values.admitTime).toISOString() : null,
//           dischargeTime: values.dischargeTime ? new Date(values.dischargeTime).toISOString() : null,
//         };
//         if (editPatient) {
//           await axios.put(`${API_BASE}/${editPatient.id}`, cleaned);
//           toast.success("Patient updated!");
//         } else {
//           await axios.post(API_BASE, cleaned);
//           toast.success("Patient created!");
//         }
//         setModalOpen(false);
//         setEditPatient(null);
//         fetchPatients();
//       } catch (err) {
//         toast.error("Save failed.");
//       } finally {
//         setSaving(false);
//       }
//     },
//   });

//   const openEditModal = (p) => { setEditPatient(p); setModalOpen(true); };
//   const openAddModal = () => { setEditPatient(null); setModalOpen(true); };
//   const openDetails = (patient) => setDetailDialog({ open: true, patient });
//   const closeDetails = () => setDetailDialog({ open: false, patient: null });

//   const modalStyle = {
//     position: "absolute",
//     top: "50%", left: "50%", transform: "translate(-50%, -50%)",
//     width: "99vw", maxWidth: 820, bgcolor: "#f9fafc", boxShadow: 24,
//     borderRadius: 4, p: 3, maxHeight: "92vh", overflow: "auto"
//   };

//   const PatientDetails = ({ patient }) => (
//     <Box>
//       <Typography fontWeight={700}>MRN: <span style={{ fontWeight: 400 }}>{patient.mrn}</span></Typography>
//       <Typography fontWeight={700}>Name: <span style={{ fontWeight: 400 }}>{patient.firstName} {patient.lastName}</span></Typography>
//       <Grid container spacing={2} mt={1} mb={2}>
//         <Grid item xs={12} md={6}><b>Username:</b> {patient.user?.userName ?? patient.userName}</Grid>
//         <Grid item xs={12} md={6}><b>Email:</b> {patient.user?.email ?? patient.email}</Grid>
//         <Grid item xs={12} md={6}><b>Phone:</b> {patient.user?.phoneNumber ?? patient.phoneNumber}</Grid>
//         <Grid item xs={12} md={6}><b>Status:</b> {STATUS.find(s => s.value === patient.status)?.label}</Grid>
//         <Grid item xs={12} md={6}><b>Gender:</b> {GENDER.find(g => g.value === patient.gender)?.label}</Grid>
//         <Grid item xs={12} md={6}><b>Surgery:</b> {patient.surgeryType}</Grid>
//         <Grid item xs={12} md={6}><b>Admit Time:</b> {patient.admitTime ? new Date(patient.admitTime).toLocaleString() : ""}</Grid>
//         <Grid item xs={12} md={6}><b>Discharge Time:</b> {patient.dischargeTime ? new Date(patient.dischargeTime).toLocaleString() : ""}</Grid>
//       </Grid>
//       <Divider sx={{ my: 2 }} />
//       <Typography variant="subtitle1" fontWeight={700} mb={1}>Medical History</Typography>
//       <Typography>{patient.medicalHistory}</Typography>
//       <Typography variant="subtitle1" fontWeight={700} mt={2}>Emergency Contact</Typography>
//       <Typography>{patient.emergencyContact}</Typography>
//       <Typography variant="subtitle1" fontWeight={700} mt={2}>Address</Typography>
//       <Typography>{patient.address}</Typography>
//       <Typography variant="subtitle1" fontWeight={700} mt={2}>Notes</Typography>
//       <Typography>{patient.notes}</Typography>
//     </Box>
//   );

//   return (
//     <Box sx={{ background: "#eef2f7", minHeight: "100vh", pb: 7 }}>
//       <Toaster position="top-right" />
//       <Box
//         component={motion.div}
//         initial={{ opacity: 0, y: -18 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         p={{ xs: 1, md: 3 }}
//         sx={{ width: "100%", maxWidth: 1160, mx: "auto" }}
//       >
//         <Box display="flex" alignItems="center" gap={2} justifyContent="space-between" mb={3}>
//           <Typography variant="h4" fontWeight={900} color="primary.dark" sx={{ letterSpacing: 1.5 }}>
//             Patient Management
//           </Typography>
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={openAddModal}
//             sx={{
//               borderRadius: 3, textTransform: "none", fontWeight: 700,
//               fontSize: 18, px: 3, py: 1.2
//             }}
//           >
//             Add Patient
//           </Button>
//         </Box>
//         <Paper
//           component={motion.div}
//           initial={{ opacity: 0, scale: 0.97 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           sx={{
//             boxShadow: 2, borderRadius: 5, overflow: "auto", minHeight: 400,
//             border: "1.5px solid #e1e6ef", background: "#fff"
//           }}
//         >
//           {loading ? (
//             <Box display="flex" justifyContent="center" alignItems="center" p={7}>
//               <ClipLoader color="#1976d2" size={54} />
//             </Box>
//           ) : (
//             <TableContainer>
//               <Table size="small">
//                 <TableHead>
//                   <TableRow sx={{ background: "#f5f8fb" }}>
//                     <TableCell>ID</TableCell>
//                     <TableCell>Name</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Gender</TableCell>
//                     <TableCell>Email</TableCell>
//                     <TableCell>Phone</TableCell>
//                     <TableCell>MRN</TableCell>
//                     <TableCell align="center">Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {patients.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={8} align="center">No records found.</TableCell>
//                     </TableRow>
//                   ) : (
//                     patients.map((p) => (
//                       <TableRow
//                         key={p.id}
//                         hover
//                         sx={{
//                           transition: "background .15s",
//                           "&:hover": { background: "#f4f6fc" }
//                         }}
//                       >
//                         <TableCell>{p.id}</TableCell>
//                         <TableCell>
//                           <Typography fontWeight={600} fontSize={15}>{p.firstName} {p.lastName}</Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Chip
//                             label={STATUS.find(s => s.value === p.status)?.label || p.status}
//                             color={STATUS.find(s => s.value === p.status)?.color || "default"}
//                             size="small"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Chip
//                             label={GENDER.find(g => g.value === p.gender)?.label || p.gender}
//                             size="small"
//                           />
//                         </TableCell>
//                         <TableCell>{p.user?.email ?? p.email}</TableCell>
//                         <TableCell>{p.user?.phoneNumber ?? p.phoneNumber}</TableCell>
//                         <TableCell>{p.mrn}</TableCell>
//                         <TableCell align="center">
//                           <Tooltip title="Details" arrow>
//                             <IconButton onClick={() => openDetails(p)} size="small" color="info">
//                               <InfoOutlined />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Edit" arrow>
//                             <IconButton onClick={() => openEditModal(p)} size="small" color="primary">
//                               <Edit />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Delete" arrow>
//                             <IconButton
//                               onClick={() => handleDelete(p.id)}
//                               size="small"
//                               color="error"
//                             >
//                               <Delete />
//                             </IconButton>
//                           </Tooltip>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Paper>

//         {/* Add/Edit Modal */}
//         <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//           <Box sx={modalStyle} component={motion.div}>
//             <Typography variant="h5" mb={2.5} fontWeight={900} color="primary.dark">
//               {editPatient ? "Edit Patient" : "Add Patient"}
//             </Typography>
//             <form onSubmit={formik.handleSubmit}>
//               <Grid container spacing={2}>
//                 {/* Two column layout */}
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="First Name"
//                     name="firstName"
//                     value={formik.values.firstName}
//                     onChange={formik.handleChange}
//                     error={formik.touched.firstName && !!formik.errors.firstName}
//                     helperText={formik.touched.firstName && formik.errors.firstName}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Last Name"
//                     name="lastName"
//                     value={formik.values.lastName}
//                     onChange={formik.handleChange}
//                     error={formik.touched.lastName && !!formik.errors.lastName}
//                     helperText={formik.touched.lastName && formik.errors.lastName}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Username"
//                     name="userName"
//                     value={formik.values.userName}
//                     onChange={formik.handleChange}
//                     error={formik.touched.userName && !!formik.errors.userName}
//                     helperText={formik.touched.userName && formik.errors.userName}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Email"
//                     name="email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     error={formik.touched.email && !!formik.errors.email}
//                     helperText={formik.touched.email && formik.errors.email}
//                     fullWidth
//                   />
//                 </Grid>
//                 {!editPatient && (
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       label="Password"
//                       name="password"
//                       type="password"
//                       value={formik.values.password}
//                       onChange={formik.handleChange}
//                       error={formik.touched.password && !!formik.errors.password}
//                       helperText={formik.touched.password && formik.errors.password}
//                       fullWidth
//                     />
//                   </Grid>
//                 )}
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Phone Number"
//                     name="phoneNumber"
//                     value={formik.values.phoneNumber}
//                     onChange={formik.handleChange}
//                     error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
//                     helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     select
//                     label="Status"
//                     name="status"
//                     value={formik.values.status}
//                     onChange={formik.handleChange}
//                     fullWidth
//                   >
//                     {STATUS.map(opt => (
//                       <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     select
//                     label="Gender"
//                     name="gender"
//                     value={formik.values.gender}
//                     onChange={formik.handleChange}
//                     fullWidth
//                   >
//                     {GENDER.map(opt => (
//                       <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="MRN"
//                     name="mrn"
//                     value={formik.values.mrn}
//                     onChange={formik.handleChange}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Surgery Type"
//                     name="surgeryType"
//                     value={formik.values.surgeryType}
//                     onChange={formik.handleChange}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Admit Time"
//                     name="admitTime"
//                     type="datetime-local"
//                     value={formik.values.admitTime}
//                     onChange={formik.handleChange}
//                     fullWidth
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Discharge Time"
//                     name="dischargeTime"
//                     type="datetime-local"
//                     value={formik.values.dischargeTime}
//                     onChange={formik.handleChange}
//                     fullWidth
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Medical History"
//                     name="medicalHistory"
//                     value={formik.values.medicalHistory}
//                     onChange={formik.handleChange}
//                     multiline
//                     rows={2}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Emergency Contact"
//                     name="emergencyContact"
//                     value={formik.values.emergencyContact}
//                     onChange={formik.handleChange}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Address"
//                     name="address"
//                     value={formik.values.address}
//                     onChange={formik.handleChange}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Notes"
//                     name="notes"
//                     value={formik.values.notes}
//                     onChange={formik.handleChange}
//                     multiline
//                     rows={2}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} textAlign="right">
//                   <Button onClick={() => setModalOpen(false)} sx={{ mr: 1 }} disabled={saving}>
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={saving}
//                     startIcon={saving && <CircularProgress size={18} color="inherit" />}
//                     sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, px: 4, py: 1.3, fontSize: 18 }}
//                   >
//                     {editPatient ? "Update" : "Create"}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           </Box>
//         </Modal>

//         {/* Patient Detail Dialog */}
//         <Dialog open={detailDialog.open} onClose={closeDetails} maxWidth="md" fullWidth>
//           <DialogTitle>
//             <Typography fontWeight={800} color="primary.dark" fontSize={20}>Patient Details</Typography>
//           </DialogTitle>
//           <DialogContent>
//             {detailDialog.patient && <PatientDetails patient={detailDialog.patient} />}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={closeDetails} variant="contained">Close</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// }



"use client";
import React, { useState, useEffect } from "react";
import {
  Box, Button, Typography, Modal, Grid, TextField, IconButton, Table, TableContainer,
  TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Tooltip, MenuItem, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Divider
} from "@mui/material";
import { Add, Edit, Delete, InfoOutlined } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import { seeGreen } from "@/components/utils/Colors";

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Patient`;

const GENDER = [
  { value: 1, label: "Male" },
  { value: 2, label: "Female" },
  { value: 3, label: "Other" }
];
const STATUS = [
  { value: 1, label: "Active", color: "success" },
  { value: 2, label: "Inactive", color: "warning" },
  { value: 3, label: "Pending", color: "info" },
  { value: 4, label: "Suspended", color: "error" }
];

const initialPatient = {
  id: null,
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  phoneNumber: "",
  medicalHistory: "",
  emergencyContact: "",
  status: 1,
  gender: 1,
  address: "",
  notes: "",
  mrn: "",
  admitTime: "",
  dischargeTime: "",
  surgeryType: "",
  reviewBy: 1,
};

function getToken() {
  if (typeof window !== "undefined") return localStorage.getItem("token") || "";
  return "";
}

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPatient, setEditPatient] = useState(null);
  const [detailDialog, setDetailDialog] = useState({ open: false, patient: null });
  const [saving, setSaving] = useState(false);

  // GET all patients
  useEffect(() => { fetchPatients(); }, []);
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const { data } = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(data.data || []);
    } catch (err) {
      toast.error("Failed to fetch patients.");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Patient?",
      text: "Are you sure you want to delete this patient?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = getToken();
          await axios.delete(`${API_BASE}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toast.success("Patient deleted!");
          fetchPatients();
        } catch (err) {
          toast.error("Delete failed.");
        }
      }
    });
  };

  // CREATE/EDIT (POST/PUT)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editPatient ? {
      ...editPatient,
      admitTime: editPatient.admitTime ? editPatient.admitTime.substring(0, 16) : "",
      dischargeTime: editPatient.dischargeTime ? editPatient.dischargeTime.substring(0, 16) : "",
      password: "",
      userName: editPatient.user?.userName ?? editPatient.userName ?? "",
      email: editPatient.user?.email ?? editPatient.email ?? "",
      phoneNumber: editPatient.user?.phoneNumber ?? editPatient.phoneNumber ?? "",
    } : initialPatient,
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name required"),
      lastName: Yup.string().required("Last name required"),
      userName: Yup.string().required("Username required"),
      email: Yup.string().email().required("Email required"),
      phoneNumber: Yup.string().required("Phone number required"),
      status: Yup.number().required(),
      gender: Yup.number().required(),
      mrn: Yup.string(),
      admitTime: Yup.string(),
      dischargeTime: Yup.string(),
      surgeryType: Yup.string(),
      reviewBy: Yup.number(),
      medicalHistory: Yup.string(),
      emergencyContact: Yup.string(),
      address: Yup.string(),
      notes: Yup.string(),
      password: Yup.string().when("id", {
        is: (id) => !id,
        then: schema => schema.required("Password required"),
        otherwise: schema => schema
      }),
    }),
    // onSubmit: async (values) => {
    //   setSaving(true);
    //   try {
    //     const cleaned = {
    //       ...values,
    //       admitTime: values.admitTime ? new Date(values.admitTime).toISOString() : null,
    //       dischargeTime: values.dischargeTime ? new Date(values.dischargeTime).toISOString() : null,
    //     };
    //     const token = getToken();
    //     if (editPatient) {
    //       await axios.put(`${API_BASE}/${editPatient.id}`, cleaned, {
    //         headers: { Authorization: `Bearer ${token}` }
    //       });
    //       toast.success("Patient updated!");
    //     } else {
    //       await axios.post(API_BASE, cleaned, {
    //         headers: { Authorization: `Bearer ${token}` }
    //       });
    //       toast.success("Patient created!");
    //     }
    //     setModalOpen(false);
    //     setEditPatient(null);
    //     fetchPatients();
    //   } catch (err) {
    //     toast.error(
    //       err?.response?.status === 401 ? "Unauthorized! Please login." : "Save failed."
    //     );
    //   } finally {
    //     setSaving(false);
    //   }
    // },
    onSubmit: async (values) => {
  setSaving(true);
  try {
    const cleaned = {
      ...values,
      admitTime: values.admitTime ? new Date(values.admitTime).toISOString() : null,
      dischargeTime: values.dischargeTime ? new Date(values.dischargeTime).toISOString() : null,
    };
    const token = getToken();
    if (editPatient) {
      await axios.put(`${API_BASE}/${editPatient.id}`, cleaned, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Patient updated!");
    } else {
      await axios.post(API_BASE, cleaned, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Patient created!");
    }
    setModalOpen(false);
    setEditPatient(null);
    fetchPatients();
  } catch (err) {
    // ----------- This block handles any server error and displays it topmost -----------
    let errorMsg = "Save failed.";
    if (err?.response?.data?.message) {
      errorMsg = err.response.data.message;
    } else if (err?.response?.data?.Message) {
      errorMsg = err.response.data.Message;
    } else if (err?.message) {
      errorMsg = err.message;
    }
    toast.error(errorMsg, {
      style: { zIndex: 99999 }
    });
  } finally {
    setSaving(false);
  }
},

  });

  const openEditModal = (p) => { setEditPatient(p); setModalOpen(true); };
  const openAddModal = () => { setEditPatient(null); setModalOpen(true); };
  const openDetails = (patient) => setDetailDialog({ open: true, patient });
  const closeDetails = () => setDetailDialog({ open: false, patient: null });

  const modalStyle = {
    position: "absolute",
    top: "50%", left: "50%", transform: "translate(-50%, -50%)",
    width: "99vw", maxWidth: 840, bgcolor: "#f9fafc", boxShadow: 24,
    borderRadius: 4, p: 3, maxHeight: "92vh", overflow: "auto"
  };

  const PatientDetails = ({ patient }) => (
    <Box>
      <Typography fontWeight={700}>MRN: <span style={{ fontWeight: 400 }}>{patient.mrn}</span></Typography>
      <Typography fontWeight={700}>Name: <span style={{ fontWeight: 400 }}>{patient.firstName} {patient.lastName}</span></Typography>
      <Grid container spacing={2} mt={1} mb={2}>
        <Grid item size={{ xs: 12, md: 6 }}><b>Username:</b> {patient.user?.userName ?? patient.userName}</Grid>
        <Grid item size={{ xs: 12, md: 6 }}><b>Email:</b> {patient.user?.email ?? patient.email}</Grid>
        <Grid item size={{ xs: 12, md: 6 }}><b>Phone:</b> {patient.user?.phoneNumber ?? patient.phoneNumber}</Grid>
        <Grid item size={{ xs: 12, md: 6 }}><b>Status:</b> {STATUS.find(s => s.value === patient.status)?.label}</Grid>
        <Grid item size={{ xs: 12, md: 6 }}><b>Gender:</b> {GENDER.find(g => g.value === patient.gender)?.label}</Grid>
        <Grid item size={{ xs: 12, md: 6 }}><b>Surgery:</b> {patient.surgeryType}</Grid>
        <Grid item size={{ xs: 12, md: 6 }}><b>Admit Time:</b> {patient.admitTime ? new Date(patient.admitTime).toLocaleString() : ""}</Grid>
        <Grid item size={{ xs: 12, md: 6 }}><b>Discharge Time:</b> {patient.dischargeTime ? new Date(patient.dischargeTime).toLocaleString() : ""}</Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={700} mb={1}>Medical History</Typography>
      <Typography>{patient.medicalHistory}</Typography>
      <Typography variant="subtitle1" fontWeight={700} mt={2}>Emergency Contact</Typography>
      <Typography>{patient.emergencyContact}</Typography>
      <Typography variant="subtitle1" fontWeight={700} mt={2}>Address</Typography>
      <Typography>{patient.address}</Typography>
      <Typography variant="subtitle1" fontWeight={700} mt={2}>Notes</Typography>
      <Typography>{patient.notes}</Typography>
    </Box>
  );

  return (
    <Box sx={{  minHeight: "100vh" }} mt={2} mx={1}>
      {/* <Toaster position="top-right" /> */}
      <Toaster position="top-center" toastOptions={{ style: { zIndex: 99999 } }} />

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        // p={{ xs: 1, md: 3 }}
        sx={{ width: "100%", mx: "auto" }}
      >
        <Box display="flex" alignItems="center" gap={2} justifyContent="space-between" mb={3}>
          <Typography
            variant="h4"
                   fontWeight={600}
                   
                   color={seeGreen}
               
                   mb={3}
                   fontSize={"26px"}
                   letterSpacing={1}>
            Patient Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={openAddModal}
            sx={{
              borderRadius: 2, textTransform:"none",
              fontSize: "16px", 
            }}
          >
            Add Patient
          </Button>
        </Box>
        <Paper
          component={motion.div}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          sx={{
              boxShadow: "0 2px 16px 0 rgba(0,0,0,0.1)", borderRadius: 3  , overflow: "auto",
            border: "1.5px solid #e1e6ef", background: "#fff"
          }}
        >
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
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>MRN</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">No records found.</TableCell>
                    </TableRow>
                  ) : (
                    patients.map((p) => (
                      <TableRow
                        key={p.id}
                        hover
                        sx={{
                          transition: "background .15s",
                          "&:hover": { background: "#f4f6fc" }
                        }}
                      >
                        <TableCell>{p.id}</TableCell>
                        <TableCell>
                          <Typography fontWeight={600} fontSize={15}>{p.firstName} {p.lastName}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={STATUS.find(s => s.value === p.status)?.label || p.status}
                            color={STATUS.find(s => s.value === p.status)?.color || "default"}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={GENDER.find(g => g.value === p.gender)?.label || p.gender}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{p.user?.email ?? p.email}</TableCell>
                        <TableCell>{p.user?.phoneNumber ?? p.phoneNumber}</TableCell>
                        <TableCell>{p.mrn}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="Details" arrow>
                            <IconButton onClick={() => openDetails(p)} size="small" color="info">
                              <InfoOutlined />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit" arrow>
                            <IconButton onClick={() => openEditModal(p)} size="small" color="primary">
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete" arrow>
                            <IconButton
                              onClick={() => handleDelete(p.id)}
                              size="small"
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Add/Edit Modal */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box sx={modalStyle} component={motion.div}>
            <Typography variant="h5" mb={2.5} fontWeight={900} color="primary.dark">
              {editPatient ? "Edit Patient" : "Add Patient"}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && !!formik.errors.firstName}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    fullWidth
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && !!formik.errors.lastName}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    fullWidth
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Username"
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    error={formik.touched.userName && !!formik.errors.userName}
                    helperText={formik.touched.userName && formik.errors.userName}
                    fullWidth
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                  />
                </Grid>
                {!editPatient && (
                  <Grid item size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && !!formik.errors.password}
                      helperText={formik.touched.password && formik.errors.password}
                      fullWidth
                    />
                  </Grid>
                )}
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    fullWidth
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    label="Status"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    fullWidth
                  >
                    {STATUS.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    label="Gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    fullWidth
                  >
                    {GENDER.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="MRN"
                    name="mrn"
                    value={formik.values.mrn}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Surgery Type"
                    name="surgeryType"
                    value={formik.values.surgeryType}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Admit Time"
                    name="admitTime"
                    type="datetime-local"
                    value={formik.values.admitTime || ""}
                    onChange={formik.handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Discharge Time"
                    name="dischargeTime"
                    type="datetime-local"
                    value={formik.values.dischargeTime || ""}
                    onChange={formik.handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Medical History"
                    name="medicalHistory"
                    value={formik.values.medicalHistory}
                    onChange={formik.handleChange}
                    multiline
                    rows={2}
                    fullWidth
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Emergency Contact"
                    name="emergencyContact"
                    value={formik.values.emergencyContact}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item size={{ xs: 12 }}>
                  <TextField
                    label="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item size={{ xs: 12 }}>
                  <TextField
                    label="Notes"
                    name="notes"
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                    multiline
                    rows={2}
                    fullWidth
                  />
                </Grid>
                <Grid item size={{ xs: 12 }} textAlign="right">
                  <Button onClick={() => setModalOpen(false)} sx={{ mr: 1 }} disabled={saving}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={saving}
                    startIcon={saving && <CircularProgress size={18} color="inherit" />}
                    sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, px: 4, py: 1.3, fontSize: 18 }}
                  >
                    {editPatient ? "Update" : "Create"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>

        {/* Patient Detail Dialog */}
        <Dialog open={detailDialog.open} onClose={closeDetails} maxWidth="md" fullWidth>
          <DialogTitle>
            <Typography fontWeight={800} color="primary.dark" fontSize={20}>Patient Details</Typography>
          </DialogTitle>
          <DialogContent>
            {detailDialog.patient && <PatientDetails patient={detailDialog.patient} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDetails} variant="contained">Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
