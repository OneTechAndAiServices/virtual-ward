// // "use client";
// // import React, { useEffect, useState } from "react";
// // import {
// //   Box, Button, Grid, Typography, Modal, TextField, MenuItem, IconButton, CircularProgress
// // } from "@mui/material";
// // import { DataGrid } from "@mui/x-data-grid";
// // import AddIcon from "@mui/icons-material/Add";
// // import EditIcon from "@mui/icons-material/Edit";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import toast, { Toaster } from "react-hot-toast";
// // import Swal from "sweetalert2";
// // import withReactContent from "sweetalert2-react-content";
// // import { ClipLoader } from "react-spinners";
// // import axios from "axios";

// // const MySwal = withReactContent(Swal);

// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// // const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

// // // ---- Gender/Status options ----
// // const genderOptions = [
// //   { value: 1, label: "Male" },
// //   { value: 2, label: "Female" },
// //   { value: 3, label: "Other" },
// // ];
// // const statusOptions = [
// //   { value: 1, label: "Active" },
// //   { value: 2, label: "Inactive" },
// //   { value: 3, label: "Suspended" },
// //   { value: 4, label: "Retired" },
// // ];

// // // ---- Initial Doctor Object ----
// // const emptyDoctor = {
// //   FirstName: "",
// //   LastName: "",
// //   Specialization: "",
// //   Experience: "",
// //   License: "",
// //   UserName: "",
// //   Email: "",
// //   Password: "",
// //   PhoneNumber: "",
// //   Status: 1,
// //   Gender: 1,
// // };

// // export default function DoctorsManagement() {
// //   const [doctors, setDoctors] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [isEdit, setIsEdit] = useState(false);
// //   const [selectedDoctor, setSelectedDoctor] = useState(emptyDoctor);
// //   const [editDoctorId, setEditDoctorId] = useState(null);
// //   const [formLoading, setFormLoading] = useState(false);

// //   // Fetch doctors
// //   const fetchDoctors = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(
// //         `${API_BASE_URL}/api/${API_VERSION}/Doctor`
// //       );
// //       setDoctors(res.data || []);
// //     } catch (error) {
// //       toast.error("Failed to fetch doctors.");
// //     }
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     fetchDoctors();
// //   }, []);

// //   // ---- Modal open/close logic ----
// //   const handleOpenModal = (edit = false, doctor = emptyDoctor) => {
// //     setIsEdit(edit);
// //     setSelectedDoctor(doctor);
// //     setEditDoctorId(edit ? doctor.id || doctor.doctorId : null);
// //     setModalOpen(true);
// //   };
// //   const handleCloseModal = () => {
// //     setModalOpen(false);
// //     setSelectedDoctor(emptyDoctor);
// //     setEditDoctorId(null);
// //   };

// //   // ---- Add/Edit Doctor ----
// //   const handleFormChange = (e) => {
// //     setSelectedDoctor({ ...selectedDoctor, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setFormLoading(true);

// //     const formData = new FormData();
// //     Object.entries(selectedDoctor).forEach(([key, value]) => {
// //       formData.append(key, value);
// //     });

// //     try {
// //       if (isEdit && editDoctorId) {
// //         // EDIT
// //         await axios.put(
// //           `${API_BASE_URL}/api/${API_VERSION}/Doctor/${editDoctorId}`,
// //           formData
// //         );
// //         toast.success("Doctor updated!");
// //       } else {
// //         // ADD
// //         await axios.post(
// //           `${API_BASE_URL}/api/${API_VERSION}/Doctor`,
// //           formData
// //         );
// //         toast.success("Doctor added!");
// //       }
// //       handleCloseModal();
// //       fetchDoctors();
// //     } catch (error) {
// //       toast.error(
// //         error?.response?.data?.message ||
// //           "Error saving doctor. Please check all fields."
// //       );
// //     } finally {
// //       setFormLoading(false);
// //     }
// //   };

// //   // ---- Delete Doctor ----
// //   const handleDelete = async (doctorId) => {
// //     const confirm = await MySwal.fire({
// //       title: "Delete Doctor?",
// //       text: "Are you sure? This cannot be undone.",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonText: "Delete",
// //       confirmButtonColor: "#d32f2f",
// //     });
// //     if (!confirm.isConfirmed) return;

// //     try {
// //       await axios.delete(
// //         `${API_BASE_URL}/api/${API_VERSION}/Doctor/${doctorId}`
// //       );
// //       toast.success("Doctor deleted!");
// //       fetchDoctors();
// //     } catch (error) {
// //       toast.error("Failed to delete doctor.");
// //     }
// //   };

// //   // ---- DataGrid columns ----
// //   const columns = [
// //     { field: "id", headerName: "ID", width: 70 },
// //     { field: "FirstName", headerName: "First Name", flex: 1, minWidth: 120 },
// //     { field: "LastName", headerName: "Last Name", flex: 1, minWidth: 120 },
// //     { field: "Specialization", headerName: "Specialization", flex: 1, minWidth: 140 },
// //     { field: "Experience", headerName: "Experience (yrs)", width: 120 },
// //     { field: "License", headerName: "License", width: 120 },
// //     { field: "UserName", headerName: "Username", width: 120 },
// //     { field: "Email", headerName: "Email", flex: 1, minWidth: 180 },
// //     { field: "PhoneNumber", headerName: "Phone", width: 130 },
// //     {
// //       field: "Status",
// //       headerName: "Status",
// //       width: 110,
// //       valueFormatter: ({ value }) =>
// //         statusOptions.find((s) => s.value === Number(value))?.label || value,
// //     },
// //     {
// //       field: "Gender",
// //       headerName: "Gender",
// //       width: 100,
// //       valueFormatter: ({ value }) =>
// //         genderOptions.find((g) => g.value === Number(value))?.label || value,
// //     },
// //     {
// //       field: "actions",
// //       headerName: "Actions",
// //       width: 110,
// //       sortable: false,
// //       renderCell: (params) => (
// //         <Box>
// //           <IconButton
// //             onClick={() => handleOpenModal(true, params.row)}
// //             color="primary"
// //           >
// //             <EditIcon />
// //           </IconButton>
// //           <IconButton
// //             onClick={() => handleDelete(params.row.id || params.row.doctorId)}
// //             color="error"
// //           >
// //             <DeleteIcon />
// //           </IconButton>
// //         </Box>
// //       ),
// //     },
// //   ];

// //   // ---- MUI DataGrid needs a unique 'id' field ----
// //   const doctorRows = doctors.map((doc, idx) => ({
// //     ...doc,
// //     id: doc.id || doc.doctorId || idx + 1, // fallback
// //   }));

// //   return (
// //     <Box maxWidth="1400px" mx="auto" p={3}>
// //       <Toaster position="top-center" />
// //       <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
// //         <Grid item>
// //           <Typography variant="h4" fontWeight="bold" color="primary">
// //             Doctors Management
// //           </Typography>
// //         </Grid>
// //         <Grid item>
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             startIcon={<AddIcon />}
// //             onClick={() => handleOpenModal(false)}
// //           >
// //             Add Doctor
// //           </Button>
// //         </Grid>
// //       </Grid>
// //       <Box sx={{ height: 540, bgcolor: "white", borderRadius: 3, boxShadow: 1 }}>
// //         {loading ? (
// //           <Box display="flex" justifyContent="center" alignItems="center" height={540}>
// //             <ClipLoader size={50} />
// //           </Box>
// //         ) : (
// //           <DataGrid
// //             rows={doctorRows}
// //             columns={columns}
// //             pageSize={8}
// //             rowsPerPageOptions={[8, 16, 32]}
// //             autoHeight
// //             disableSelectionOnClick
// //           />
// //         )}
// //       </Box>

// //       {/* ---- Add/Edit Modal ---- */}
// //       <Modal
// //         open={modalOpen}
// //         onClose={handleCloseModal}
// //         aria-labelledby="add-edit-doctor"
// //         disableAutoFocus
// //       >
// //         <Box
// //           component="form"
// //           onSubmit={handleSubmit}
// //           sx={{
// //             position: "absolute",
// //             top: "50%",
// //             left: "50%",
// //             transform: "translate(-50%, -50%)",
// //             width: { xs: 340, sm: 470 },
// //             bgcolor: "background.paper",
// //             borderRadius: 2,
// //             boxShadow: 6,
// //             p: 4,
// //           }}
// //         >
// //           <Typography variant="h6" fontWeight={600} mb={2}>
// //             {isEdit ? "Edit Doctor" : "Add Doctor"}
// //           </Typography>
// //           <Grid container spacing={2}>
// //             {[
// //               ["FirstName", "First Name"],
// //               ["LastName", "Last Name"],
// //               ["Specialization", "Specialization"],
// //               ["Experience", "Experience", "number"],
// //               ["License", "License"],
// //               ["UserName", "Username"],
// //               ["Email", "Email", "email"],
// //               ...(isEdit
// //                 ? [
// //                     ["PhoneNumber", "Phone Number"],
// //                     ["Status", "Status", "select", statusOptions],
// //                     ["Gender", "Gender", "select", genderOptions],
// //                   ]
// //                 : [
// //                     ["Password", "Password", "password"],
// //                     ["PhoneNumber", "Phone Number"],
// //                     ["Status", "Status", "select", statusOptions],
// //                     ["Gender", "Gender", "select", genderOptions],
// //                   ]),
// //             ].map(([name, label, type = "text", options]) =>
// //               options ? (
// //                 <Grid item xs={12} sm={6} key={name}>
// //                   <TextField
// //                     select
// //                     name={name}
// //                     label={label}
// //                     fullWidth
// //                     required
// //                     value={selectedDoctor[name]}
// //                     onChange={handleFormChange}
// //                   >
// //                     {options.map((opt) => (
// //                       <MenuItem key={opt.value} value={opt.value}>
// //                         {opt.label}
// //                       </MenuItem>
// //                     ))}
// //                   </TextField>
// //                 </Grid>
// //               ) : (
// //                 <Grid item xs={12} sm={6} key={name}>
// //                   <TextField
// //                     name={name}
// //                     label={label}
// //                     type={type}
// //                     fullWidth
// //                     required={name !== "License"} // License is optional
// //                     value={selectedDoctor[name]}
// //                     onChange={handleFormChange}
// //                   />
// //                 </Grid>
// //               )
// //             )}
// //           </Grid>
// //           <Box display="flex" justifyContent="flex-end" mt={3}>
// //             <Button onClick={handleCloseModal} sx={{ mr: 2 }}>
// //               Cancel
// //             </Button>
// //             <Button
// //               type="submit"
// //               variant="contained"
// //               color="primary"
// //               disabled={formLoading}
// //               startIcon={formLoading ? <CircularProgress size={18} /> : null}
// //             >
// //               {isEdit ? "Update" : "Add"}
// //             </Button>
// //           </Box>
// //         </Box>
// //       </Modal>
// //     </Box>
// //   );
// // }




// // "use client";
// // import React, { useEffect, useState } from "react";
// // import {
// //   Box, Button, Grid, Typography, Modal, TextField, MenuItem,
// //   IconButton, CircularProgress, Paper, Table, TableHead, TableBody, 
// //   TableCell, TableContainer, TableRow, TablePagination
// // } from "@mui/material";
// // import AddIcon from "@mui/icons-material/Add";
// // import EditIcon from "@mui/icons-material/Edit";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import toast, { Toaster } from "react-hot-toast";
// // import Swal from "sweetalert2";
// // import withReactContent from "sweetalert2-react-content";
// // import { ClipLoader } from "react-spinners";
// // import axiosWithAuth from "@/components/utils/axiosWithAuth";
// // import { motion } from "framer-motion";
// // import { Formik, Form } from "formik";
// // import * as Yup from "yup";

// // const MySwal = withReactContent(Swal);

// // // Constants based on API documentation
// // const statusOptions = [
// //   { value: 1, label: "Active" },
// //   { value: 2, label: "Suspended" },
// //   { value: 3, label: "Retired" },
// //   { value: 4, label: "Inactive" },
// // ];

// // const genderOptions = [
// //   { value: 1, label: "Male" },
// //   { value: 2, label: "Female" },
// //   { value: 3, label: "Other" },
// // ];

// // const emptyDoctor = {
// //   firstName: "",
// //   lastName: "",
// //   specialization: "",
// //   experience: "",
// //   license: "",
// //   status: 1, // Default to Active
// //   gender: 1, // Default to Male
// //   userName: "",
// //   email: "",
// //   phoneNumber: "",
// //   password: "",
// // };

// // const DoctorSchema = Yup.object().shape({
// //   firstName: Yup.string().required("First Name is required"),
// //   lastName: Yup.string().required("Last Name is required"),
// //   specialization: Yup.string().required("Specialization is required"),
// //   experience: Yup.number()
// //     .typeError("Experience must be a number")
// //     .required("Experience is required")
// //     .min(0, "Experience cannot be negative"),
// //   license: Yup.string().required("License is required"),
// //   userName: Yup.string().required("Username is required"),
// //   email: Yup.string().email("Invalid email").required("Email is required"),
// //   phoneNumber: Yup.string().required("Phone Number is required"),
// //   password: Yup.string().when("isEdit", {
// //     is: false,
// //     then: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
// //     otherwise: Yup.string(),
// //   }),
// //   status: Yup.number().required("Status is required"),
// //   gender: Yup.number().required("Gender is required"),
// // });

// // export default function DoctorManagementPage() {
// //   const [doctors, setDoctors] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [isEdit, setIsEdit] = useState(false);
// //   const [selectedDoctor, setSelectedDoctor] = useState(emptyDoctor);
// //   const [editDoctorId, setEditDoctorId] = useState(null);
// //   const [formLoading, setFormLoading] = useState(false);
// //   const [pagination, setPagination] = useState({
// //     pageNumber: 1,
// //     pageSize: 10,
// //     totalCount: 0,
// //   });
// //   const [filters, setFilters] = useState({
// //     firstName: "",
// //     lastName: "",
// //     specialization: "",
// //     email: "",
// //     experience: "",
// //     status: "",
// //     gender: ""
// //   });

// //   // Map API doctor data to form format
// //   const mapApiDoctorToForm = (apiDoctor) => ({
// //     firstName: apiDoctor.firstName || "",
// //     lastName: apiDoctor.lastName || "",
// //     specialization: apiDoctor.specialization || "",
// //     experience: apiDoctor.experience || "",
// //     license: apiDoctor.license || "",
// //     status: apiDoctor.status || 1,
// //     gender: apiDoctor.gender || 1,
// //     userName: apiDoctor.userName || "",
// //     email: apiDoctor.email || "",
// //     phoneNumber: apiDoctor.phoneNumber || "",
// //     password: "",
// //     user: apiDoctor.user || null,
// //     id: apiDoctor.id || null
// //   });

// //   // Map form data to API format
// //   const mapFormToApiDoctor = (formData, isEdit = false) => {
// //     const doctorData = {
// //       FirstName: formData.firstName,
// //       LastName: formData.lastName,
// //       Specialization: formData.specialization,
// //       Experience: parseInt(formData.experience),
// //       License: formData.license,
// //       Status: parseInt(formData.status),
// //       Gender: parseInt(formData.gender),
// //       UserName: formData.userName,
// //       Email: formData.email,
// //       PhoneNumber: formData.phoneNumber,
// //     };

// //     if (!isEdit) {
// //       doctorData.Password = formData.password;
// //     }

// //     return doctorData;
// //   };

// //   // Fetch doctors with pagination and filters
// //   const fetchDoctors = async () => {
// //     setLoading(true);
// //     try {
// //       const params = {
// //         PageNumber: pagination.pageNumber,
// //         PageSize: pagination.pageSize,
// //         ...Object.fromEntries(
// //           Object.entries(filters).filter(([_, value]) => value !== "")
// //         ),
// //       };

// //       const res = await axiosWithAuth.get("/Doctor", { params });
// //       setDoctors(res.data?.data || []);
// //       setPagination(prev => ({
// //         ...prev,
// //         totalCount: res.data?.totalCount || 0,
// //       }));
// //     } catch (error) {
// //       handleApiError(error, "Failed to fetch doctors");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleApiError = (error, defaultMessage) => {
// //     if (error?.response?.status === 401) {
// //       toast.error("Session expired, please log in again.");
// //       localStorage.clear();
// //       window.location.href = "/login";
// //     } else {
// //       toast.error(error?.response?.data?.message || defaultMessage);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDoctors();
// //   }, [pagination.pageNumber, pagination.pageSize, filters]);

// //   // Modal handlers
// //   const handleOpenModal = (edit = false, doctor = null) => {
// //     setIsEdit(edit);
// //     if (edit && doctor) {
// //       setSelectedDoctor(mapApiDoctorToForm(doctor));
// //       setEditDoctorId(doctor.id);
// //     } else {
// //       setSelectedDoctor(emptyDoctor);
// //       setEditDoctorId(null);
// //     }
// //     setModalOpen(true);
// //   };

// //   const handleCloseModal = () => {
// //     setModalOpen(false);
// //     setSelectedDoctor(emptyDoctor);
// //     setEditDoctorId(null);
// //   };

// //   // CRUD Operations
// //   const handleCreateDoctor = async (formData) => {
// //     setFormLoading(true);
// //     try {
// //       const doctorData = mapFormToApiDoctor(formData, false);
// //       const formDataToSend = new FormData();

// //       Object.entries(doctorData).forEach(([key, value]) => {
// //         formDataToSend.append(key, value);
// //       });

// //       await axiosWithAuth.post("/Doctor", formDataToSend, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       toast.success("Doctor created successfully!");
// //       fetchDoctors();
// //       handleCloseModal();
// //     } catch (error) {
// //       handleApiError(error, "Failed to create doctor");
// //     } finally {
// //       setFormLoading(false);
// //     }
// //   };

// //   const handleUpdateDoctor = async (formData) => {
// //     setFormLoading(true);
// //     try {
// //       const doctorData = mapFormToApiDoctor(formData, true);
// //       const formDataToSend = new FormData();

// //       Object.entries(doctorData).forEach(([key, value]) => {
// //         formDataToSend.append(key, value);
// //       });

// //       // For update, include User and id fields
// //       if (formData.user) {
// //         formDataToSend.append("User.UserName", formData.userName);
// //         formDataToSend.append("User.Email", formData.email);
// //         formDataToSend.append("User.PhoneNumber", formData.phoneNumber);
// //         formDataToSend.append("User.id", formData.user.id);
// //       }
// //       formDataToSend.append("id", editDoctorId);

// //       await axiosWithAuth.put(`/Doctor/${editDoctorId}`, formDataToSend, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       toast.success("Doctor updated successfully!");
// //       fetchDoctors();
// //       handleCloseModal();
// //     } catch (error) {
// //       handleApiError(error, "Failed to update doctor");
// //     } finally {
// //       setFormLoading(false);
// //     }
// //   };

// //   const handleDeleteDoctor = async (doctorId) => {
// //     const confirm = await MySwal.fire({
// //       title: "Delete Doctor?",
// //       text: "Are you sure? This cannot be undone.",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonText: "Delete",
// //       confirmButtonColor: "#d32f2f",
// //     });
    
// //     if (!confirm.isConfirmed) return;
    
// //     try {
// //       await axiosWithAuth.delete(`/Doctor/${doctorId}`);
// //       toast.success("Doctor deleted successfully!");
// //       fetchDoctors();
// //     } catch (error) {
// //       handleApiError(error, "Failed to delete doctor");
// //     }
// //   };

// //   const handleFormSubmit = async (values, { setSubmitting }) => {
// //     if (isEdit) {
// //       await handleUpdateDoctor(values);
// //     } else {
// //       await handleCreateDoctor(values);
// //     }
// //     setSubmitting(false);
// //   };

// //   // Handle pagination changes
// //   const handlePageChange = (event, newPage) => {
// //     setPagination(prev => ({ ...prev, pageNumber: newPage + 1 }));
// //   };

// //   const handleRowsPerPageChange = (event) => {
// //     setPagination(prev => ({
// //       ...prev,
// //       pageSize: parseInt(event.target.value, 10),
// //       pageNumber: 1
// //     }));
// //   };

// //   // Handle filter changes
// //   const handleFilterChange = (e) => {
// //     const { name, value } = e.target;
// //     setFilters(prev => ({ ...prev, [name]: value }));
// //   };

// //   // Table columns configuration
// //   const tableColumns = [
// //     { key: "id", label: "ID" },
// //     { key: "firstName", label: "First Name" },
// //     { key: "lastName", label: "Last Name" },
// //     { key: "specialization", label: "Specialization" },
// //     { key: "experience", label: "Experience (years)" },
// //     { key: "license", label: "License" },
// //     { key: "userName", label: "Username" },
// //     { key: "email", label: "Email" },
// //     { key: "phoneNumber", label: "Phone" },
// //     {
// //       key: "status",
// //       label: "Status",
// //       format: (value) => statusOptions.find(opt => opt.value === value)?.label || value,
// //     },
// //     {
// //       key: "gender",
// //       label: "Gender",
// //       format: (value) => genderOptions.find(opt => opt.value === value)?.label || value,
// //     },
// //   ];

// //   return (
// //     <Box minHeight="100vh" sx={{ background: "linear-gradient(120deg,#071952 35%,#088395 100%)", py: 6 }}>
// //       <Toaster position="top-center" />
// //       <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: "spring" }}>
// //         <Paper elevation={7} sx={{ maxWidth: 1300, mx: "auto", p: 4, borderRadius: 4, mb: 4, background: "rgba(255,255,255,0.97)", boxShadow: "0 12px 34px 0 rgba(7,25,82,0.14)", overflow: "auto" }}>
// //           <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
// //             <Grid item>
// //               <Typography variant="h4" fontWeight={700} color="primary" sx={{ letterSpacing: 1 }}>
// //                 Doctors Management
// //               </Typography>
// //             </Grid>
// //             <Grid item>
// //               <Button 
// //                 variant="contained" 
// //                 color="primary" 
// //                 startIcon={<AddIcon />} 
// //                 onClick={() => handleOpenModal(false)} 
// //                 sx={{ fontWeight: 700, borderRadius: 2, px: 3 }}
// //               >
// //                 Add Doctor
// //               </Button>
// //             </Grid>
// //           </Grid>

// //           {/* Search and Filter Controls */}
// //           <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
// //             <Grid container spacing={2}>
// //               <Grid item xs={12} sm={6} md={3}>
// //                 <TextField
// //                   fullWidth
// //                   label="First Name"
// //                   name="firstName"
// //                   value={filters.firstName}
// //                   onChange={handleFilterChange}
// //                   size="small"
// //                 />
// //               </Grid>
// //               <Grid item xs={12} sm={6} md={3}>
// //                 <TextField
// //                   fullWidth
// //                   label="Last Name"
// //                   name="lastName"
// //                   value={filters.lastName}
// //                   onChange={handleFilterChange}
// //                   size="small"
// //                 />
// //               </Grid>
// //               <Grid item xs={12} sm={6} md={3}>
// //                 <TextField
// //                   fullWidth
// //                   label="Specialization"
// //                   name="specialization"
// //                   value={filters.specialization}
// //                   onChange={handleFilterChange}
// //                   size="small"
// //                 />
// //               </Grid>
// //               <Grid item xs={12} sm={6} md={3}>
// //                 <TextField
// //                   fullWidth
// //                   label="Email"
// //                   name="email"
// //                   value={filters.email}
// //                   onChange={handleFilterChange}
// //                   size="small"
// //                 />
// //               </Grid>
// //               <Grid item xs={12} sm={6} md={3}>
// //                 <TextField
// //                   fullWidth
// //                   label="Experience"
// //                   name="experience"
// //                   type="number"
// //                   value={filters.experience}
// //                   onChange={handleFilterChange}
// //                   size="small"
// //                 />
// //               </Grid>
// //               <Grid item xs={12} sm={6} md={3}>
// //                 <TextField
// //                   select
// //                   fullWidth
// //                   label="Status"
// //                   name="status"
// //                   value={filters.status}
// //                   onChange={handleFilterChange}
// //                   size="small"
// //                 >
// //                   <MenuItem value="">All</MenuItem>
// //                   {statusOptions.map(option => (
// //                     <MenuItem key={option.value} value={option.value}>
// //                       {option.label}
// //                     </MenuItem>
// //                   ))}
// //                 </TextField>
// //               </Grid>
// //               <Grid item xs={12} sm={6} md={3}>
// //                 <TextField
// //                   select
// //                   fullWidth
// //                   label="Gender"
// //                   name="gender"
// //                   value={filters.gender}
// //                   onChange={handleFilterChange}
// //                   size="small"
// //                 >
// //                   <MenuItem value="">All</MenuItem>
// //                   {genderOptions.map(option => (
// //                     <MenuItem key={option.value} value={option.value}>
// //                       {option.label}
// //                     </MenuItem>
// //                   ))}
// //                 </TextField>
// //               </Grid>
// //               <Grid item xs={12} sm={6} md={3}>
// //                 <Button 
// //                   variant="contained" 
// //                   color="primary" 
// //                   onClick={fetchDoctors}
// //                   fullWidth
// //                   sx={{ height: '40px' }}
// //                 >
// //                   Apply Filters
// //                 </Button>
// //               </Grid>
// //             </Grid>
// //           </Box>

// //           <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 3 }}>
// //             {loading ? (
// //               <Box display="flex" justifyContent="center" alignItems="center" height={300}>
// //                 <ClipLoader size={50} />
// //               </Box>
// //             ) : (
// //               <>
// //                 <Table>
// //                   <TableHead>
// //                     <TableRow>
// //                       {tableColumns.map(col => (
// //                         <TableCell key={col.key}>{col.label}</TableCell>
// //                       ))}
// //                       <TableCell>Actions</TableCell>
// //                     </TableRow>
// //                   </TableHead>
// //                   <TableBody>
// //                     {doctors.map((row) => (
// //                       <TableRow key={row.id}>
// //                         {tableColumns.map(col => (
// //                           <TableCell key={col.key}>
// //                             {col.format ? col.format(row[col.key]) : row[col.key]}
// //                           </TableCell>
// //                         ))}
// //                         <TableCell>
// //                           <IconButton 
// //                             onClick={() => handleOpenModal(true, row)} 
// //                             color="primary"
// //                             aria-label="edit"
// //                           >
// //                             <EditIcon />
// //                           </IconButton>
// //                           <IconButton 
// //                             onClick={() => handleDeleteDoctor(row.id)} 
// //                             color="error"
// //                             aria-label="delete"
// //                           >
// //                             <DeleteIcon />
// //                           </IconButton>
// //                         </TableCell>
// //                       </TableRow>
// //                     ))}
// //                   </TableBody>
// //                 </Table>
// //                 <TablePagination
// //                   rowsPerPageOptions={[5, 10, 25]}
// //                   component="div"
// //                   count={pagination.totalCount}
// //                   rowsPerPage={pagination.pageSize}
// //                   page={pagination.pageNumber - 1}
// //                   onPageChange={handlePageChange}
// //                   onRowsPerPageChange={handleRowsPerPageChange}
// //                 />
// //               </>
// //             )}
// //           </TableContainer>
// //         </Paper>
// //       </motion.div>

// //       {/* Add/Edit Doctor Modal */}
// //       <Modal open={modalOpen} onClose={handleCloseModal} aria-labelledby="add-edit-doctor">
// //         <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, type: "spring" }}>
// //           <Box sx={{ 
// //             position: "absolute", 
// //             top: "50%", 
// //             left: "50%", 
// //             transform: "translate(-50%, -50%)", 
// //             width: { xs: '90%', sm: '80%', md: '60%' }, 
// //             maxWidth: 800,
// //             maxHeight: '90vh',
// //             overflowY: 'auto',
// //             bgcolor: "background.paper", 
// //             borderRadius: 3, 
// //             boxShadow: 7, 
// //             p: 4 
// //           }}>
// //             <Typography variant="h6" fontWeight={700} mb={2}>
// //               {isEdit ? "Edit Doctor" : "Add Doctor"}
// //             </Typography>
// //             <Formik
// //               initialValues={{ ...selectedDoctor, isEdit }}
// //               validationSchema={DoctorSchema}
// //               enableReinitialize
// //               onSubmit={handleFormSubmit}
// //             >
// //               {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
// //                 <Form>
// //                   <Grid container spacing={2}>
// //                     {[
// //                       ["firstName", "First Name", "text"],
// //                       ["lastName", "Last Name", "text"],
// //                       ["specialization", "Specialization", "text"],
// //                       ["experience", "Experience (years)", "number"],
// //                       ["license", "License", "text"],
// //                       ["userName", "Username", "text"],
// //                       ["email", "Email", "email"],
// //                       ["phoneNumber", "Phone Number", "text"],
// //                       !isEdit && ["password", "Password", "password"],
// //                       ["status", "Status", "select", statusOptions],
// //                       ["gender", "Gender", "select", genderOptions],
// //                     ].filter(Boolean).map(([name, label, type = "text", options]) => (
// //                       <Grid item xs={12} sm={6} key={name}>
// //                         {options ? (
// //                           <TextField
// //                             select
// //                             name={name}
// //                             label={label}
// //                             fullWidth
// //                             required
// //                             value={values[name]}
// //                             onChange={handleChange}
// //                             onBlur={handleBlur}
// //                             error={touched[name] && Boolean(errors[name])}
// //                             helperText={touched[name] && errors[name]}
// //                           >
// //                             {options.map((opt) => (
// //                               <MenuItem key={opt.value} value={opt.value}>
// //                                 {opt.label}
// //                               </MenuItem>
// //                             ))}
// //                           </TextField>
// //                         ) : (
// //                           <TextField
// //                             name={name}
// //                             label={label}
// //                             type={type}
// //                             fullWidth
// //                             required
// //                             value={values[name]}
// //                             onChange={handleChange}
// //                             onBlur={handleBlur}
// //                             error={touched[name] && Boolean(errors[name])}
// //                             helperText={touched[name] && errors[name]}
// //                           />
// //                         )}
// //                       </Grid>
// //                     ))}
// //                   </Grid>
// //                   <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
// //                     <Button 
// //                       variant="outlined" 
// //                       onClick={handleCloseModal}
// //                       sx={{ borderRadius: 2 }}
// //                     >
// //                       Cancel
// //                     </Button>
// //                     <Button 
// //                       type="submit" 
// //                       variant="contained" 
// //                       color="primary" 
// //                       disabled={isSubmitting || formLoading} 
// //                       startIcon={formLoading ? <CircularProgress size={20} /> : null}
// //                       sx={{ fontWeight: 700, borderRadius: 2 }}
// //                     >
// //                       {isEdit ? "Update Doctor" : "Add Doctor"}
// //                     </Button>
// //                   </Box>
// //                 </Form>
// //               )}
// //             </Formik>
// //           </Box>
// //         </motion.div>
// //       </Modal>
// //     </Box>
// //   );
  
// // } 




// // "use client";
// // import React, { useState, useEffect } from "react";
// // import {
// //   Box, Button, Typography, Modal, Grid, TextField, IconButton, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, MenuItem, Tooltip
// // } from "@mui/material";
// // import { Add, Edit, Delete, PersonAddAlt1 } from "@mui/icons-material";
// // import { motion } from "framer-motion";
// // import { useFormik } from "formik";
// // import * as Yup from "yup";
// // import axios from "axios";
// // import toast, { Toaster } from "react-hot-toast";
// // import Swal from "sweetalert2";
// // import ClipLoader from "react-spinners/ClipLoader";

// // const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Doctor`;

// // const statusOptions = [
// //   { value: 0, label: "Inactive" },
// //   { value: 1, label: "Active" },
// //   { value: 2, label: "On Leave" },
// //   { value: 3, label: "Suspended" },
// //   { value: 4, label: "Retired" },
// // ];

// // const genderOptions = [
// //   { value: 0, label: "Male" },
// //   { value: 1, label: "Female" },
// //   { value: 2, label: "Other" },
// // ];

// // const initialDoctor = {
// //   firstName: "",
// //   lastName: "",
// //   specialization: "",
// //   experience: "",
// //   license: "",
// //   userName: "",
// //   email: "",
// //   password: "",
// //   phoneNumber: "",
// //   status: 1,
// //   gender: 0,
// // };

// // export default function DoctorsManagement() {
// //   const [doctors, setDoctors] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [editDoctor, setEditDoctor] = useState(null);
// //   const [saving, setSaving] = useState(false);

// //   // Get token from localStorage (always fresh!)
// //   const getToken = () => localStorage.getItem("token");

// //   // Fetch Doctors
// //   const fetchDoctors = async () => {
// //     setLoading(true);
// //     try {
// //       const token = getToken();
// //       const { data } = await axios.get(API_URL, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       setDoctors(data.data || []);
// //     } catch (err) {
// //       if (err?.response?.status === 401) {
// //         toast.error("Session expired. Please login again.");
// //         // Optionally redirect: window.location.href = "/login";
// //       } else {
// //         toast.error("Failed to fetch doctors.");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDoctors();
// //   }, []);

// //   // Formik + Yup Schema
// //   const formik = useFormik({
// //     enableReinitialize: true,
// //     initialValues: editDoctor
// //       ? {
// //           ...editDoctor,
// //           userName: editDoctor.user?.userName || "",
// //           email: editDoctor.user?.email || "",
// //           phoneNumber: editDoctor.user?.phoneNumber || "",
// //           password: "", // leave blank on edit
// //         }
// //       : initialDoctor,
// //     validationSchema: Yup.object({
// //       firstName: Yup.string().required("Required"),
// //       lastName: Yup.string().required("Required"),
// //       specialization: Yup.string().required("Required"),
// //       experience: Yup.number().min(0, "Invalid").required("Required"),
// //       license: Yup.string().required("Required"),
// //       userName: Yup.string().required("Required"),
// //       email: Yup.string().email().required("Required"),
// //       password: !editDoctor ? Yup.string().min(6).required("Required") : Yup.string(),
// //       status: Yup.number().required("Required"),
// //       gender: Yup.number().required("Required"),
// //     }),
// //     onSubmit: async (values) => {
// //       setSaving(true);
// //       const token = getToken();
// //       try {
// //         if (editDoctor) {
// //           // UPDATE
// //           const formData = new FormData();
// //           Object.entries(values).forEach(([key, val]) => {
// //             if (key === "password" && !val) return;
// //             formData.append(key, val);
// //           });
// //           formData.append("User.UserName", values.userName);
// //           formData.append("User.Email", values.email);
// //           formData.append("User.PhoneNumber", values.phoneNumber);
// //           await axios.put(`${API_URL}/${editDoctor.id}`, formData, {
// //             headers: {
// //               "Content-Type": "multipart/form-data",
// //               Authorization: `Bearer ${token}`,
// //             },
// //           });
// //           toast.success("Doctor updated!");
// //         } else {
// //           // CREATE
// //           const formData = new FormData();
// //           Object.entries(values).forEach(([key, val]) => formData.append(key, val));
// //           await axios.post(API_URL, formData, {
// //             headers: {
// //               "Content-Type": "multipart/form-data",
// //               Authorization: `Bearer ${token}`,
// //             },
// //           });
// //           toast.success("Doctor created!");
// //         }
// //         setModalOpen(false);
// //         setEditDoctor(null);
// //         fetchDoctors();
// //       } catch (err) {
// //         if (err?.response?.status === 401) {
// //           toast.error("Session expired. Please login again.");
// //         } else {
// //           toast.error("Something went wrong.");
// //         }
// //       } finally {
// //         setSaving(false);
// //       }
// //     },
// //   });

// //   // Delete Doctor
// //   const handleDelete = (id) => {
// //     Swal.fire({
// //       title: "Delete Doctor?",
// //       text: "Are you sure you want to delete this doctor?",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonColor: "#d32f2f",
// //       cancelButtonColor: "#3085d6",
// //       confirmButtonText: "Yes, delete it!",
// //       reverseButtons: true,
// //     }).then(async (result) => {
// //       if (result.isConfirmed) {
// //         const token = getToken();
// //         try {
// //           await axios.delete(`${API_URL}/${id}`, {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           });
// //           toast.success("Doctor deleted!");
// //           fetchDoctors();
// //         } catch (err) {
// //           if (err?.response?.status === 401) {
// //             toast.error("Session expired. Please login again.");
// //           } else {
// //             toast.error("Failed to delete.");
// //           }
// //         }
// //       }
// //     });
// //   };

// //   // Open Modal
// //   const openEditModal = (doc) => {
// //     setEditDoctor(doc);
// //     setModalOpen(true);
// //   };
// //   const openAddModal = () => {
// //     setEditDoctor(null);
// //     setModalOpen(true);
// //   };

// //   // MUI Modal Style
// //   const modalStyle = {
// //     position: "absolute",
// //     top: "50%", left: "50%", transform: "translate(-50%, -50%)",
// //     width: "95%", maxWidth: 550, bgcolor: "background.paper", boxShadow: 24,
// //     borderRadius: 3, p: 3,
// //   };

// //   return (
// //     <Box p={{ xs: 1, md: 4 }}>
// //       <Toaster position="top-right" />
// //       <Box
// //         component={motion.div}
// //         initial={{ opacity: 0, y: -18 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.4 }}
// //         mb={3}
// //         display="flex"
// //         alignItems="center"
// //         gap={2}
// //         justifyContent="space-between"
// //       >
// //         <Typography variant="h4" fontWeight="bold" color="primary">
// //           Doctors Management
// //         </Typography>
// //         <Button
// //           variant="contained"
// //           startIcon={<PersonAddAlt1 />}
// //           onClick={openAddModal}
// //           sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
// //         >
// //           Add Doctor
// //         </Button>
// //       </Box>
// //       <Paper
// //         component={motion.div}
// //         initial={{ opacity: 0, scale: 0.97 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ duration: 0.6 }}
// //         sx={{ boxShadow: 2, borderRadius: 3, overflow: "auto" }}
// //       >
// //         {loading ? (
// //           <Box display="flex" justifyContent="center" alignItems="center" p={6}>
// //             <ClipLoader color="#1976d2" size={50} />
// //           </Box>
// //         ) : (
// //           <TableContainer>
// //             <Table size="small">
// //               <TableHead>
// //                 <TableRow>
// //                   <TableCell>#</TableCell>
// //                   <TableCell>First Name</TableCell>
// //                   <TableCell>Last Name</TableCell>
// //                   <TableCell>Specialization</TableCell>
// //                   <TableCell>Experience</TableCell>
// //                   <TableCell>Status</TableCell>
// //                   <TableCell>Gender</TableCell>
// //                   <TableCell>Email</TableCell>
// //                   <TableCell>UserName</TableCell>
// //                   <TableCell align="center">Actions</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {doctors.length === 0 ? (
// //                   <TableRow>
// //                     <TableCell colSpan={10} align="center">No records found.</TableCell>
// //                   </TableRow>
// //                 ) : (
// //                   doctors.map((d, idx) => (
// //                     <TableRow key={d.id}>
// //                       <TableCell>{idx + 1}</TableCell>
// //                       <TableCell>{d.firstName}</TableCell>
// //                       <TableCell>{d.lastName}</TableCell>
// //                       <TableCell>{d.specialization}</TableCell>
// //                       <TableCell>{d.experience}</TableCell>
// //                       <TableCell>
// //                         {statusOptions.find(opt => opt.value === d.status)?.label || d.status}
// //                       </TableCell>
// //                       <TableCell>
// //                         {genderOptions.find(opt => opt.value === d.gender)?.label || d.gender}
// //                       </TableCell>
// //                       <TableCell>{d.user?.email}</TableCell>
// //                       <TableCell>{d.user?.userName}</TableCell>
// //                       <TableCell align="center">
// //                         <Tooltip title="Edit" arrow>
// //                           <IconButton onClick={() => openEditModal(d)} size="small" color="primary">
// //                             <Edit />
// //                           </IconButton>
// //                         </Tooltip>
// //                         <Tooltip title="Delete" arrow>
// //                           <IconButton
// //                             onClick={() => handleDelete(d.id)}
// //                             size="small"
// //                             color="error"
// //                           >
// //                             <Delete />
// //                           </IconButton>
// //                         </Tooltip>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
// //         )}
// //       </Paper>
// //       {/* Add/Edit Modal */}
// //       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
// //         <Box sx={modalStyle} component={motion.div}
// //           initial={{ scale: 0.95, opacity: 0 }}
// //           animate={{ scale: 1, opacity: 1 }}
// //         >
// //           <Typography variant="h6" mb={2} fontWeight="bold">
// //             {editDoctor ? "Edit Doctor" : "Add Doctor"}
// //           </Typography>
// //           <form onSubmit={formik.handleSubmit}>
// //             <Grid container spacing={2}>
// //               {/* FIRST COLUMN */}
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="First Name"
// //                   name="firstName"
// //                   value={formik.values.firstName}
// //                   onChange={formik.handleChange}
// //                   error={formik.touched.firstName && !!formik.errors.firstName}
// //                   helperText={formik.touched.firstName && formik.errors.firstName}
// //                   fullWidth size="small" />
// //               </Grid>
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="Last Name"
// //                   name="lastName"
// //                   value={formik.values.lastName}
// //                   onChange={formik.handleChange}
// //                   error={formik.touched.lastName && !!formik.errors.lastName}
// //                   helperText={formik.touched.lastName && formik.errors.lastName}
// //                   fullWidth size="small" />
// //               </Grid>
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="Specialization"
// //                   name="specialization"
// //                   value={formik.values.specialization}
// //                   onChange={formik.handleChange}
// //                   error={formik.touched.specialization && !!formik.errors.specialization}
// //                   helperText={formik.touched.specialization && formik.errors.specialization}
// //                   fullWidth size="small" />
// //               </Grid>
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="Experience"
// //                   name="experience"
// //                   type="number"
// //                   value={formik.values.experience}
// //                   onChange={formik.handleChange}
// //                   error={formik.touched.experience && !!formik.errors.experience}
// //                   helperText={formik.touched.experience && formik.errors.experience}
// //                   fullWidth size="small" />
// //               </Grid>
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="License"
// //                   name="license"
// //                   value={formik.values.license}
// //                   onChange={formik.handleChange}
// //                   error={formik.touched.license && !!formik.errors.license}
// //                   helperText={formik.touched.license && formik.errors.license}
// //                   fullWidth size="small" />
// //               </Grid>
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="Phone Number"
// //                   name="phoneNumber"
// //                   value={formik.values.phoneNumber}
// //                   onChange={formik.handleChange}
// //                   error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
// //                   helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
// //                   fullWidth size="small" />
// //               </Grid>
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   select label="Status"
// //                   name="status"
// //                   value={formik.values.status}
// //                   onChange={formik.handleChange}
// //                   error={formik.touched.status && !!formik.errors.status}
// //                   helperText={formik.touched.status && formik.errors.status}
// //                   fullWidth size="small"
// //                 >
// //                   {statusOptions.map(opt => (
// //                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
// //                   ))}
// //                 </TextField>
// //               </Grid>
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   select label="Gender"
// //                   name="gender"
// //                   value={formik.values.gender}
// //                   onChange={formik.handleChange}
// //                   error={formik.touched.gender && !!formik.errors.gender}
// //                   helperText={formik.touched.gender && formik.errors.gender}
// //                   fullWidth size="small"
// //                 >
// //                   {genderOptions.map(opt => (
// //                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
// //                   ))}
// //                 </TextField>
// //               </Grid>
// //               {/* UserName/Email/Password */}
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="User Name"
// //                   name="userName"
// //                   value={formik.values.userName}
// //                   onChange={formik.handleChange}
// //                   error={formik.touched.userName && !!formik.errors.userName}
// //                   helperText={formik.touched.userName && formik.errors.userName}
// //                   fullWidth size="small" />
// //               </Grid>
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="Email"
// //                   name="email"
// //                   value={formik.values.email}
// //                   onChange={formik.handleChange}
// //                   error={formik.touched.email && !!formik.errors.email}
// //                   helperText={formik.touched.email && formik.errors.email}
// //                   fullWidth size="small" />
// //               </Grid>
// //               {!editDoctor && (
// //                 <Grid item xs={12}>
// //                   <TextField
// //                     label="Password"
// //                     name="password"
// //                     type="password"
// //                     value={formik.values.password}
// //                     onChange={formik.handleChange}
// //                     error={formik.touched.password && !!formik.errors.password}
// //                     helperText={formik.touched.password && formik.errors.password}
// //                     fullWidth size="small" />
// //                 </Grid>
// //               )}
// //               <Grid item xs={12} textAlign="right">
// //                 <Button onClick={() => setModalOpen(false)} sx={{ mr: 1 }} disabled={saving}>
// //                   Cancel
// //                 </Button>
// //                 <Button
// //                   type="submit"
// //                   variant="contained"
// //                   disabled={saving}
// //                   startIcon={saving && <CircularProgress size={18} color="inherit" />}
// //                   sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
// //                 >
// //                   {editDoctor ? "Update" : "Create"}
// //                 </Button>
// //               </Grid>
// //             </Grid>
// //           </form>
// //         </Box>
// //       </Modal>
// //     </Box>
// //   );
// // }

// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Typography, Modal, Grid, TextField, IconButton, Table, TableContainer,
//   TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, MenuItem,
//   Tooltip, TablePagination, Chip, Avatar, LinearProgress, Alert, Snackbar
// } from "@mui/material";
// import { Add, Edit, Delete, PersonAddAlt1, Search, Refresh } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { seeGreen } from "@/components/utils/Colors";

// const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Doctor`;

// const statusOptions = [
//   { value: 1, label: "Active", color: "success" },
//   { value: 0, label: "Inactive", color: "error" },
//   { value: 2, label: "On Leave", color: "warning" },
//   { value: 3, label: "Suspended", color: "error" },
//   { value: 4, label: "Retired", color: "info" },
// ];

// const genderOptions = [
//   { value: 0, label: "Male", icon: "♂" },
//   { value: 1, label: "Female", icon: "♀" },
//   { value: 2, label: "Other", icon: "⚥" },
// ];

// const initialDoctor = {
//   firstName: "",
//   lastName: "",
//   specialization: "",
//   experience: "",
//   license: "",
//   userName: "",
//   email: "",
//   password: "",
//   phoneNumber: "",
//   status: 1,
//   gender: 0,
// };

// export default function DoctorsManagement() {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editDoctor, setEditDoctor] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const getToken = () => localStorage.getItem("token");

//   const handleError = (err) => {
//     let errorMessage = "An error occurred";
//     if (err?.response) {
//       errorMessage = err.response.data?.message || err.response.statusText;
//       if (err.response.status === 401) {
//         errorMessage = "Session expired. Please login again.";
//       }
//     } else if (err?.message) {
//       errorMessage = err.message;
//     }
//     setError(errorMessage);
//     return errorMessage;
//   };

//   const handleSuccess = (message) => {
//     setSuccess(message);
//     setTimeout(() => setSuccess(null), 5000);
//   };

//   // Fetch
//   const fetchDoctors = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = getToken();
//       const { data } = await axios.get(API_URL, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setDoctors(data.data || []);
//     } catch (err) {
//       handleError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   // Filter doctors based on search term
//   const filteredDoctors = doctors.filter(doctor => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       doctor.firstName?.toLowerCase().includes(searchLower) ||
//       doctor.lastName?.toLowerCase().includes(searchLower) ||
//       doctor.specialization?.toLowerCase().includes(searchLower) ||
//       (doctor.user?.email && doctor.user.email.toLowerCase().includes(searchLower)) ||
//       (doctor.user?.userName && doctor.user.userName.toLowerCase().includes(searchLower))
//     );
//   });

//   // Pagination
//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Modal handlers
//   const openEditModal = (doc) => {
//     setEditDoctor(doc);
//     setModalOpen(true);
//   };
//   const openAddModal = () => {
//     setEditDoctor(null);
//     setModalOpen(true);
//   };

//   // Formik Schema
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: editDoctor
//       ? {
//           ...initialDoctor,
//           ...editDoctor,
//           userName: editDoctor.user?.userName || "",
//           email: editDoctor.user?.email || "",
//           phoneNumber: editDoctor.user?.phoneNumber || "",
//           password: "", // not required for edit
//         }
//       : initialDoctor,
//     validationSchema: Yup.object({
//       firstName: Yup.string().required("First name is required"),
//       lastName: Yup.string().required("Last name is required"),
//       specialization: Yup.string().required("Specialization is required"),
//       experience: Yup.number()
//         .min(0, "Must be 0 or more")
//         .max(50, "Must be 50 or less")
//         .required("Experience is required"),
//       license: Yup.string().required("License number is required"),
//       userName: Yup.string().required("Username is required"),
//       email: Yup.string().email("Invalid email").required("Email is required"),
//       password: !editDoctor
//         ? Yup.string().min(6, "Must be at least 6 characters").required("Password is required")
//         : Yup.string().nullable(),
//       phoneNumber: Yup.string().matches(/^[0-9]{10}$/, "10 digits required").required("Phone is required"),
//       status: Yup.number().required("Status is required"),
//       gender: Yup.number().required("Gender is required"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       setSaving(true);
//       setError(null);
//       const token = getToken();
//       try {
//         const formData = new FormData();
//         formData.append("FirstName", values.firstName);
//         formData.append("LastName", values.lastName);
//         formData.append("Specialization", values.specialization);
//         formData.append("Experience", values.experience);
//         formData.append("License", values.license);
//         formData.append("UserName", values.userName);
//         formData.append("Email", values.email);
//         formData.append("PhoneNumber", values.phoneNumber);
//         formData.append("Status", values.status);
//         formData.append("Gender", values.gender);

//         // Only send password on create, not on edit
//         if (!editDoctor) formData.append("Password", values.password);

//         if (editDoctor) {
//           await axios.put(`${API_URL}/${editDoctor.id}`, formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           handleSuccess("Doctor updated successfully!");
//         } else {
//           await axios.post(API_URL, formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           handleSuccess("Doctor created successfully!");
//         }
//         setModalOpen(false);
//         setEditDoctor(null);
//         fetchDoctors();
//         resetForm();
//       } catch (err) {
//         handleError(err);
//       } finally {
//         setSaving(false);
//       }
//     },
//   });

//   // Delete Doctor with confirmation
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Delete Doctor?",
//       text: "This action cannot be undone!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d32f2f",
//       cancelButtonColor: "#757575",
//       confirmButtonText: "Delete",
//       cancelButtonText: "Cancel",
//       reverseButtons: true,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const token = getToken();
//         try {
//           await axios.delete(`${API_URL}/${id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           handleSuccess("Doctor deleted successfully!");
//           fetchDoctors();
//         } catch (err) {
//           handleError(err);
//         }
//       }
//     });
//   };

//   // Modal style
//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "98%",
//     maxWidth: 600,
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     borderRadius: 2,
//     p: 3,
//     maxHeight: "98vh",
//     overflowY: "auto",
//   };

//   return (
//     <Box mx={1} mt={2}>
//       {/* Success/Error Snackbars */}
//       <Snackbar
//         open={!!success}
//         autoHideDuration={6000}
//         onClose={() => setSuccess(null)}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: "100%" }}>
//           {success}
//         </Alert>
//       </Snackbar>
//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
//           {error}
//         </Alert>
//       </Snackbar>

//       {/* Header Section */}
//       <Box
//         component={motion.div}
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         mb={3}
//         display="flex"
//         flexDirection={{ xs: "column", sm: "row" }}
//         alignItems={{ xs: "flex-start", sm: "center" }}
//         justifyContent="space-between"
//         gap={2}
//       >
//         <Typography variant="h4" fontWeight={600} color={seeGreen} fontSize={"26px"}>
//           Doctors Management
//         </Typography>
//         <Box display="flex" gap={2} width={{ xs: "100%", sm: "auto" }}>
//           <TextField
//             size="small"
//             placeholder="Search doctors..."
//             variant="outlined"
//             InputProps={{
//               startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
//             }}
//             sx={{
//               flexGrow: { xs: 1, sm: 0 },
//               minWidth: 250,
//               "& .MuiOutlinedInput-root": { borderRadius: 2 }
//             }}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Button
//             variant="contained"
//             startIcon={<Refresh />}
//             onClick={fetchDoctors}
//             sx={{
//               borderRadius: 2,
//               textTransform: "none",
//               fontWeight: 600,
//               bgcolor: seeGreen,
//               display: { xs: "none", sm: "flex" }
//             }}
//           >
//             Refresh
//           </Button>
//           <Button
//             variant="contained"
//             startIcon={<PersonAddAlt1 />}
//             onClick={openAddModal}
//             sx={{
//               borderRadius: 2,
//               textTransform: "none",
//               fontWeight: 600,
//               bgcolor: seeGreen
//             }}
//           >
//             Add Doctor
//           </Button>
//         </Box>
//       </Box>

//       {/* Main Table */}
//       <Paper
//         component={motion.div}
//         initial={{ opacity: 0, scale: 0.98 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4 }}
//         sx={{
//           boxShadow: 3,
//           borderRadius: 2,
//           overflow: "hidden",
//           position: "relative"
//         }}
//       >
//         {loading && <LinearProgress color="primary" sx={{ position: "absolute", top: 0, left: 0, right: 0 }} />}
//         <TableContainer sx={{ maxHeight: "calc(100vh - 200px)" }}>
//           <Table stickyHeader size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell>#</TableCell>
//                 <TableCell>Doctor</TableCell>
//                 <TableCell>Specialization</TableCell>
//                 <TableCell>Experience</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Contact</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredDoctors.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                     {loading ? (
//                       <CircularProgress size={24} />
//                     ) : (
//                       <Typography variant="body2" color="text.secondary">
//                         {searchTerm ? "No matching doctors found" : "No doctors available"}
//                       </Typography>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredDoctors
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((doctor, idx) => (
//                     <TableRow key={doctor.id} hover>
//                       <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
//                       <TableCell>
//                         <Box display="flex" alignItems="center" gap={2}>
//                           <Avatar sx={{ bgcolor: "primary.main" }}>
//                             {doctor.firstName?.[0]}{doctor.lastName?.[0]}
//                           </Avatar>
//                           <Box>
//                             <Typography fontWeight="medium">
//                               {doctor.firstName} {doctor.lastName}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               @{doctor.user?.userName}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </TableCell>
//                       <TableCell>{doctor.specialization}</TableCell>
//                       <TableCell>
//                         <Chip
//                           label={`${doctor.experience} yrs`}
//                           size="small"
//                           color="info"
//                           variant="outlined"
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Chip
//                           label={statusOptions.find(opt => opt.value === doctor.status)?.label}
//                           color={statusOptions.find(opt => opt.value === doctor.status)?.color}
//                           size="small"
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Box>
//                           <Typography variant="body2">{doctor.user?.email}</Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             {doctor.user?.phoneNumber || doctor.phoneNumber || "No phone"}
//                           </Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell align="center">
//                         <Box display="flex" gap={1} justifyContent="center">
//                           <Tooltip title="Edit" arrow>
//                             <IconButton
//                               onClick={() => openEditModal(doctor)}
//                               size="small"
//                               color="primary"
//                               sx={{
//                                 bgcolor: "primary.light",
//                                 "&:hover": { bgcolor: "primary.main", color: "white" }
//                               }}
//                             >
//                               <Edit fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Delete" arrow>
//                             <IconButton
//                               onClick={() => handleDelete(doctor.id)}
//                               size="small"
//                               color="error"
//                               sx={{
//                                 bgcolor: "error.light",
//                                 "&:hover": { bgcolor: "error.main", color: "white" }
//                               }}
//                             >
//                               <Delete fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredDoctors.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
//         />
//       </Paper>

//       {/* Add/Edit Modal */}
//       <Modal
//         open={modalOpen}
//         onClose={() => !saving && setModalOpen(false)}
//       >
//         <Box sx={modalStyle} component={motion.div}>
//           <Typography variant="h5" mb={3} fontWeight="bold" color={seeGreen}>
//             {editDoctor ? "Edit Doctor" : "Add New Doctor"}
//           </Typography>
//           <form onSubmit={formik.handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="First Name *"
//                   name="firstName"
//                   value={formik.values.firstName}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.firstName && Boolean(formik.errors.firstName)}
//                   helperText={formik.touched.firstName && formik.errors.firstName}
//                   fullWidth
//                   size="small"
//                   variant="outlined"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Last Name *"
//                   name="lastName"
//                   value={formik.values.lastName}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
//                   helperText={formik.touched.lastName && formik.errors.lastName}
//                   fullWidth
//                   size="small"
//                   variant="outlined"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Specialization *"
//                   name="specialization"
//                   value={formik.values.specialization}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.specialization && Boolean(formik.errors.specialization)}
//                   helperText={formik.touched.specialization && formik.errors.specialization}
//                   fullWidth
//                   size="small"
//                   variant="outlined"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Experience *"
//                   name="experience"
//                   type="number"
//                   value={formik.values.experience}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.experience && Boolean(formik.errors.experience)}
//                   helperText={formik.touched.experience && formik.errors.experience}
//                   fullWidth
//                   size="small"
//                   variant="outlined"
//                   InputProps={{ inputProps: { min: 0, max: 50 } }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="License Number *"
//                   name="license"
//                   value={formik.values.license}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.license && Boolean(formik.errors.license)}
//                   helperText={formik.touched.license && formik.errors.license}
//                   fullWidth
//                   size="small"
//                   variant="outlined"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   label="Status *"
//                   name="status"
//                   value={formik.values.status}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.status && Boolean(formik.errors.status)}
//                   helperText={formik.touched.status && formik.errors.status}
//                   fullWidth
//                   size="small"
//                   variant="outlined"
//                 >
//                   {statusOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>
//                       {opt.label}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   label="Gender *"
//                   name="gender"
//                   value={formik.values.gender}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.gender && Boolean(formik.errors.gender)}
//                   helperText={formik.touched.gender && formik.errors.gender}
//                   fullWidth
//                   size="small"
//                   variant="outlined"
//                 >
//                   {genderOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>
//                       {opt.icon} {opt.label}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Username *"
//                   name="userName"
//                   value={formik.values.userName}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.userName && Boolean(formik.errors.userName)}
//                   helperText={formik.touched.userName && formik.errors.userName}
//                   fullWidth
//                   size="small"
//                   variant="outlined"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Phone Number *"
//                   name="phoneNumber"
//                   value={formik.values.phoneNumber}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
//                   helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
//                   fullWidth
//                   size="small"
//                   variant="outlined"
//                   placeholder="10 digits only"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Email *"
//                   name="email"
//                   type="email"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.email && Boolean(formik.errors.email)}
//                   helperText={formik.touched.email && formik.errors.email}
//                   fullWidth
//                   size="small"
//                   variant="outlined"
//                 />
//               </Grid>
//               {!editDoctor && (
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Password *"
//                     name="password"
//                     type="password"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.password && Boolean(formik.errors.password)}
//                     helperText={formik.touched.password && formik.errors.password}
//                     fullWidth
//                     size="small"
//                     variant="outlined"
//                   />
//                 </Grid>
//               )}
//               <Grid item xs={12} mt={2}>
//                 <Box display="flex" justifyContent="flex-end" gap={2}>
//                   <Button
//                     onClick={() => setModalOpen(false)}
//                     variant="outlined"
//                     color="error"
//                     disabled={saving}
//                     sx={{
//                       textTransform: "none",
//                       px: 3
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={saving || !formik.isValid}
//                     startIcon={saving && <CircularProgress size={18} color="inherit" />}
//                     sx={{
//                       bgcolor: seeGreen,
//                       textTransform: "none",
//                       fontWeight: 600,
//                       px: 3
//                     }}
//                   >
//                     {editDoctor ? "Update Doctor" : "Create Doctor"}
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </form>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api.virtual.gpline.ie";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "v0.1";

// Gender and Status values
const GENDER_OPTIONS = [
  { value: 1, label: "Male" },
  { value: 2, label: "Female" },
  { value: 3, label: "Other" },
  { value: 0, label: "Unknown" }, // support your backend's default "0"
];

const STATUS_OPTIONS = [
  { value: 1, label: "Active" },
  { value: 2, label: "Inactive" },
  { value: 3, label: "Pending" },
  { value: 4, label: "Suspended" },
  { value: 0, label: "Unknown" }, // support your backend's default "0"
];

const initialForm = {
  FirstName: "",
  LastName: "",
  Specialization: "",
  Experience: "",
  License: "",
  UserName: "",
  Email: "",
  Password: "",
  PhoneNumber: "",
  Status: 1,
  Gender: 1,
};

// Utility: get token from localStorage
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

function DoctorsManagement() {
  // State
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);

  // Fetch doctors (CORRECTED for backend data structure)
  const fetchDoctors = async () => {
    setTableLoading(true);
    try {
      const token = getToken();
      const res = await axios.get(
        `${API_BASE}/api/${API_VERSION}/Doctor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoctors(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      toast.error("Failed to fetch doctors");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle Form Change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Open Add/Edit Dialog (corrected to pull from doctor.user)
  const handleDialogOpen = (doctor = null) => {
    if (doctor) {
      setForm({
        FirstName: doctor.firstName ?? "",
        LastName: doctor.lastName ?? "",
        Specialization: doctor.specialization ?? "",
        Experience: doctor.experience ?? "",
        License: doctor.license ?? "",
        UserName: doctor.user?.userName ?? "",
        Email: doctor.user?.email ?? "",
        Password: "",
        PhoneNumber: doctor.user?.phoneNumber ?? "",
        Status: doctor.status ?? 1,
        Gender: doctor.gender ?? 1,
      });
      setEditId(doctor.id);
    } else {
      setForm(initialForm);
      setEditId(null);
    }
    setDialogOpen(true);
  };

  // Close Dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setForm(initialForm);
    setEditId(null);
  };

  // Add or Edit Doctor
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const token = getToken();
    // Prepare data for multipart/form-data
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, val);
    });

    try {
      if (editId) {
        // PUT (Update)
        await axios.put(
          `${API_BASE}/api/${API_VERSION}/Doctor/${editId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Doctor updated");
      } else {
        // POST (Create)
        await axios.post(
          `${API_BASE}/api/${API_VERSION}/Doctor`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Doctor added");
      }
      handleDialogClose();
      fetchDoctors();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Operation failed"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  // Delete Doctor
  const handleDelete = async (doctorId) => {
    const result = await Swal.fire({
      title: "Delete Doctor?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const token = getToken();
        await axios.delete(
          `${API_BASE}/api/${API_VERSION}/Doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Doctor deleted");
        fetchDoctors();
      } catch (err) {
        toast.error("Failed to delete");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box  mt={2} mx={1}>
      <Toaster />
      {/* <motion.div
        initial={{ opacity: 0, y: -32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      > */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            overflowX:"scroll"
          }}
        >
          <Typography variant="h4" fontWeight={700} color="primary">
            Doctors Management
          </Typography>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => handleDialogOpen()}
          >
            Add Doctor
          </Button>
        </Box>
      {/* </motion.div> */}
    
      <Box
        sx={{
          // width: "100%",
          overflow: "scroll",
          // maxWidth:"90%",
          minHeight: 320,
        }}
        // component={motion.div}
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ duration: 0.7 }}
      >
        {tableLoading ? (
          <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
            <ClipLoader size={44} color="#1976d2" />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Specialization</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>License</TableCell>
                  <TableCell>UserName</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  {/* <TableCell>Status</TableCell>
                  <TableCell>Gender</TableCell> */}
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      No doctors found.
                    </TableCell>
                  </TableRow>
                ) : (
                  doctors.map((doctor, idx) => (
                    <TableRow key={doctor.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{doctor.firstName}</TableCell>
                      <TableCell>{doctor.lastName}</TableCell>
                      <TableCell>{doctor.specialization}</TableCell>
                      <TableCell>{doctor.experience}</TableCell>
                      <TableCell>{doctor.license}</TableCell>
                      <TableCell>{doctor.user?.userName}</TableCell>
                      <TableCell>{doctor.user?.email}</TableCell>
                      <TableCell>{doctor.user?.phoneNumber || "-"}</TableCell>
                      {/* <TableCell>
                        {
                          STATUS_OPTIONS.find(
                            (s) => s.value === doctor.status
                          )?.label || doctor.status
                        }
                      </TableCell>
                      <TableCell>
                        {
                          GENDER_OPTIONS.find(
                            (g) => g.value === doctor.gender
                          )?.label || doctor.gender
                        }
                      </TableCell> */}
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => handleDialogOpen(doctor)}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(doctor.id)}
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
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleFormSubmit}>
          <DialogTitle>
            {editId ? "Edit Doctor" : "Add Doctor"}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  name="FirstName"
                  label="First Name"
                  value={form.FirstName}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  name="LastName"
                  label="Last Name"
                  value={form.LastName}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  name="Specialization"
                  label="Specialization"
                  value={form.Specialization}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  name="Experience"
                  label="Experience (years)"
                  value={form.Experience}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                  required
                  size="small"
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  name="License"
                  label="License"
                  value={form.License}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  name="UserName"
                  label="User Name"
                  value={form.UserName}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  name="Email"
                  label="Email"
                  value={form.Email}
                  onChange={handleChange}
                  type="email"
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  name="PhoneNumber"
                  label="Phone Number"
                  value={form.PhoneNumber}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              {!editId && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    name="Password"
                    label="Password"
                    value={form.Password}
                    onChange={handleChange}
                    type="password"
                    fullWidth
                    required
                    size="small"
                  />
                </Grid>
              )}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  name="Status"
                  label="Status"
                  value={form.Status}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  name="Gender"
                  label="Gender"
                  value={form.Gender}
                  onChange={handleChange}
                  fullWidth
                  required
                  size="small"
                >
                  {GENDER_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitLoading}
              color="primary"
              startIcon={
                submitLoading ? (
                  <CircularProgress color="inherit" size={18} />
                ) : null
              }
            >
              {editId ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default DoctorsManagement;
