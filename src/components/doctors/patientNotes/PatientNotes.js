"use client";
import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, CircularProgress, TextField, Grid, Tooltip, MenuItem, InputAdornment, Chip
} from "@mui/material";
import { Add, Edit, Delete, Notes as NotesIcon, Search } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { seeGreen } from "@/components/utils/Colors";

const API_BASE = "http://api.virtual.gpline.ie/api/v0.1/PatientNotes";
const API_VERSION = "0.1"; // Adjust if needed

const initialNote = {
  id: null,
  description: "",
  doctorId: null,
  patientId: null,
};

function getToken() {
  if (typeof window !== "undefined") return localStorage.getItem("token") || "";
  return "";
}

function PatientNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // Fetch all notes on mount
  useEffect(() => {
    fetchNotes();
    fetchPatients();
    fetchDoctors();
  }, []);

  // Fetch Notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const token = getToken();
      // To get all notes, leave PatientId param blank. To get per patient, add ?PatientId=xxx
      const { data } = await axios.get(`${API_BASE.replace("api/v0.1", `api/v${API_VERSION}`)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(data);
    } catch (err) {
      toast.error("Failed to fetch notes.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all patients (for dropdown)
  const fetchPatients = async () => {
    try {
      const token = getToken();
      const { data } = await axios.get("http://api.virtual.gpline.ie/api/v0.1/Patient", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(data.data || []);
    } catch (err) {
      setPatients([]);
    }
  };

  // Fetch all doctors (for dropdown)
  const fetchDoctors = async () => {
    try {
      const token = getToken();
      const { data } = await axios.get("http://api.virtual.gpline.ie/api/v0.1/Doctor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(data.data || []);
    } catch (err) {
      setDoctors([]);
    }
  };

  // Delete note
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Note?",
      text: "Are you sure you want to delete this note?",
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
          await axios.delete(`${API_BASE.replace("api/v0.1", `api/v${API_VERSION}`)}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toast.success("Note deleted!");
          fetchNotes();
        } catch (err) {
          toast.error("Delete failed.");
        }
      }
    });
  };

  // Handle Add/Edit Modal
  const openAddModal = () => { setEditNote(null); setModalOpen(true); };
  const openEditModal = (note) => { setEditNote(note); setModalOpen(true); };

  // Handle Add/Edit Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.target);
    let note = {
      id: editNote ? editNote.id : null,
      description: form.get("description"),
      doctorId: form.get("doctorId") ? Number(form.get("doctorId")) : null,
      patientId: form.get("patientId") ? Number(form.get("patientId")) : null,
    };

    // Fix id=0 to null
    if (!note.id || Number(note.id) === 0) note.id = null;

    // Validate
    if (!note.description || !note.doctorId || !note.patientId) {
      toast.error("All fields required.", { style: { zIndex: 99999 } });
      setSaving(false);
      return;
    }

    const token = getToken();
    try {
      if (editNote) {
        await axios.put(`${API_BASE.replace("api/v0.1", `api/v${API_VERSION}`)}/${note.id}`, note, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Note updated!");
      } else {
        await axios.post(`${API_BASE.replace("api/v0.1", `api/v${API_VERSION}`)}`, note, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Note added!");
      }
      setModalOpen(false);
      setEditNote(null);
      fetchNotes();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Save failed.",
        { style: { zIndex: 99999 } }
      );
    } finally {
      setSaving(false);
    }
  };

  // Filter notes by search (description or patient)
  const filteredNotes = notes.filter(n =>
    (!search?.trim() ||
      n.description?.toLowerCase().includes(search.toLowerCase()) ||
      patients.find(p => p.id === n.patientId)?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      patients.find(p => p.id === n.patientId)?.lastName?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const modalStyle = {
    position: "absolute",
    top: "50%", left: "50%", transform: "translate(-50%, -50%)",
    width: "96vw", maxWidth: 500, bgcolor: "#f9fafc", boxShadow: 24,
    borderRadius: 4, p: 3, maxHeight: "92vh", overflow: "auto"
  };

  return (
    <Box  mx={1} mt={2}  minHeight={"60vh"}>
      <Toaster position="top-center" toastOptions={{ style: { zIndex: 99999 } }} />
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        
      
      >
        <Box display="flex" alignItems="center" gap={2} justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h4" fontWeight={600} fontSize={"26px"} color={seeGreen} sx={{ letterSpacing: 1.5 }}>
              Patient Note
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={openAddModal}
            sx={{borderRadius:1, textTransform: "none", bgcolor:seeGreen}}
          >
            Add Note
          </Button>
        </Box>

        <Box sx={{
          boxShadow: 2, borderRadius: 2, overflow: "auto",
          border: "1.5px solid #e1e6ef", background: "#fff", p: 1.5
        }}>
          <Box mb={2} mt={1} display="flex" alignItems="center" gap={2}>
            <TextField
              label="Search notes or patient"
              size="small"
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{ minWidth: 260 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Chip label={`Total: ${filteredNotes.length}`} color="primary" size="small" />
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" p={7}>
              <ClipLoader color="#1976d2" size={54} />
            </Box>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ background: "#f5f8fb" }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Doctor</TableCell>
                    <TableCell>Patient</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredNotes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">No notes found.</TableCell>
                    </TableRow>
                  ) : (
                    filteredNotes.map((n) => (
                      <TableRow
                        key={n.id}
                        hover
                        sx={{
                          transition: "background .15s",
                          "&:hover": { background: "#f3f6fd" }
                        }}
                      >
                        <TableCell>{n.id}</TableCell>
                        <TableCell>
                          <Typography fontWeight={500} fontSize={15}>{n.description}</Typography>
                        </TableCell>
                        <TableCell>
                          {doctors.find(d => d.id === n.doctorId)
                            ? `${doctors.find(d => d.id === n.doctorId).firstName} ${doctors.find(d => d.id === n.doctorId).lastName}`
                            : n.doctorId
                          }
                        </TableCell>
                        <TableCell>
                          {patients.find(p => p.id === n.patientId)
                            ? `${patients.find(p => p.id === n.patientId).firstName} ${patients.find(p => p.id === n.patientId).lastName}`
                            : n.patientId
                          }
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit" arrow>
                            <IconButton onClick={() => openEditModal(n)} size="small" color="primary">
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete" arrow>
                            <IconButton onClick={() => handleDelete(n.id)} size="small" color="error">
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

        {/* Add/Edit Modal */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box sx={modalStyle} component={motion.div}>
            <Typography variant="h5" mb={2.5} fontWeight={600} color={seeGreen}>
              {editNote ? "Edit Note" : "Add Note"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={{xs:12}}>
                  <TextField
                    label="Description"
                    name="description"
                    required
                    defaultValue={editNote?.description || ""}
                    multiline
                    rows={3}
                    fullWidth
                  />
                </Grid>
                <Grid size={{xs:12}}>
                  <TextField
                    select
                    label="Doctor"
                    name="doctorId"
                    required
                    defaultValue={editNote?.doctorId || ""}
                    fullWidth
                  >
                    <MenuItem value="" disabled>Select Doctor</MenuItem>
                    {doctors.map(opt => (
                      <MenuItem key={opt.id} value={opt.id}>
                        {opt.firstName} {opt.lastName} ({opt.email})
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{xs:12}}>
                  <TextField
                    select
                    label="Patient"
                    name="patientId"
                    required
                    defaultValue={editNote?.patientId || ""}
                    fullWidth
                  >
                    <MenuItem value="" disabled>Select Patient</MenuItem>
                    {patients.map(opt => (
                      <MenuItem key={opt.id} value={opt.id}>
                        {opt.firstName} {opt.lastName} ({opt.email})
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} textAlign="right">
                  <Button variant="outlined" color="error" onClick={() => setModalOpen(false)} sx={{ mr: 1 }} disabled={saving}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={saving}
                    startIcon={saving && <CircularProgress size={18} color="inherit" />}
                    sx={{ textTransform: "none",bgcolor:seeGreen}}
                  >
                    {editNote ? "Update" : "Create"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default PatientNotes;
