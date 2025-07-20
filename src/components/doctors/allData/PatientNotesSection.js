// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box, Typography, Paper, Table, TableHead, TableBody, TableCell,
//   TableRow, TableContainer, Stack, Button, Dialog, DialogTitle,
//   DialogContent, DialogActions, TextField, IconButton, Tooltip, MenuItem, Select, FormControl, InputLabel
// } from "@mui/material";
// import { ClipLoader } from "react-spinners";
// import { Add, Edit, Delete } from "@mui/icons-material";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";
// import dayjs from "dayjs";
// import { seeGreen } from "@/components/utils/Colors";

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api.virtual.gpline.ie";
// const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "v0.1";

// // Helper: get token from localStorage
// const getToken = () => {
//   if (typeof window !== "undefined") return localStorage.getItem("token");
//   return null;
// };

// export default function PatientNotesSection({ patientId, doctorId }) {
//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCount, setShowCount] = useState(5);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [editNote, setEditNote] = useState(null);
//   const [noteText, setNoteText] = useState("");
//   const [saving, setSaving] = useState(false);

//   // Fetch notes
//   const fetchNotes = async () => {
//     setLoading(true);
//     try {
//       const token = getToken();
//       const res = await fetch(
//         `${API_BASE}/api/${API_VERSION}/PatientNotes?PatientId=${patientId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await res.json();
//       let notesArr = Array.isArray(data) ? data : [];
//       // Sort latest on top
//       notesArr.sort((a, b) => b.id - a.id);
//       setNotes(notesArr);
//     } catch {
//       toast.error("Failed to load patient notes.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, [patientId]);

//   const openDialog = (note = null) => {
//     setEditNote(note);
//     setNoteText(note ? note.description : "");
//     setDialogOpen(true);
//   };
//   const closeDialog = () => {
//     setDialogOpen(false);
//     setEditNote(null);
//     setNoteText("");
//   };

//   // Add or edit note
//   const handleSave = async () => {
//     if (!noteText.trim()) {
//       toast.error("Note cannot be empty");
//       return;
//     }
//     setSaving(true);
//     const token = getToken();
//     const url = editNote
//       ? `${API_BASE}/api/${API_VERSION}/PatientNotes/${editNote.id}`
//       : `${API_BASE}/api/${API_VERSION}/PatientNotes`;
//     const method = editNote ? "PUT" : "POST";
//     const payload = {
//       id: editNote ? editNote.id : 0,
//       description: noteText,
//       doctorId: doctorId,
//       patientId: patientId,
//     };
//     try {
//       await fetch(url, {
//         method,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
//       toast.success(editNote ? "Note updated" : "Note added");
//       closeDialog();
//       fetchNotes();
//     } catch {
//       toast.error("Failed to save note");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Delete note
//   const handleDelete = async (noteId) => {
//     const confirm = await Swal.fire({
//       title: "Delete Note?",
//       text: "Are you sure to delete this note?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d32f2f",
//       confirmButtonText: "Delete",
//     });
//     if (!confirm.isConfirmed) return;
//     setSaving(true);
//     const token = getToken();
//     try {
//       await fetch(
//         `${API_BASE}/api/${API_VERSION}/PatientNotes/${noteId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("Note deleted");
//       fetchNotes();
//     } catch {
//       toast.error("Failed to delete note");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Show top 'showCount' notes
//   const displayedNotes = notes.slice(0, showCount);

//   return (
//     <Box mt={5}>
//       <Typography variant="h5" fontWeight={600} color={seeGreen} fontSize={"26px"} mb={3}>
//         Patient Notes
//       </Typography>

//       <Stack direction="row" alignItems="center" spacing={2} mb={2}>
//         <FormControl size="small" sx={{ minWidth: 130 }}>
//           <InputLabel>Show Latest</InputLabel>
//           <Select
//             value={showCount}
//             label="Show Latest"
//             onChange={e => setShowCount(Number(e.target.value))}
//           >
//             {[1,2,3,4,5].map(val => (
//               <MenuItem key={val} value={val}>{val}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Button
//           startIcon={<Add />}
//           variant="contained"
//           onClick={() => openDialog(null)}
//         >
//           Add Note
//         </Button>
//       </Stack>

//       <Paper elevation={2} sx={{ borderRadius: 4 }}>
//         {loading ? (
//           <Stack alignItems="center" py={6}>
//             <ClipLoader color="#1976d2" size={40} />
//             <Typography mt={2}>Loading notes...</Typography>
//           </Stack>
//         ) : notes.length === 0 ? (
//           <Box p={3} textAlign="center">
//             <Typography>No notes found for this patient.</Typography>
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell><b>Description</b></TableCell>
//                   <TableCell><b>Doctor ID</b></TableCell>
//                   <TableCell><b>Patient ID</b></TableCell>
//                   <TableCell><b>Note ID</b></TableCell>
//                   <TableCell align="right"><b>Actions</b></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {displayedNotes.map((note) => (
//                   <TableRow key={note.id}>
//                     <TableCell>{note.description}</TableCell>
//                     <TableCell>{note.doctorId}</TableCell>
//                     <TableCell>{note.patientId}</TableCell>
//                     <TableCell>{note.id}</TableCell>
//                     <TableCell align="right">
//                       <Tooltip title="Edit">
//                         <IconButton color="primary" onClick={() => openDialog(note)}>
//                           <Edit />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete">
//                         <IconButton color="error" onClick={() => handleDelete(note.id)}>
//                           <Delete />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>

//       {/* Add/Edit Dialog */}
//       <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="xs" fullWidth>
//         <DialogTitle>{editNote ? "Edit Note" : "Add Note"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Description"
//             value={noteText}
//             onChange={e => setNoteText(e.target.value)}
//             multiline
//             rows={3}
//             fullWidth
//             autoFocus
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDialog} color="inherit">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSave}
//             variant="contained"
//             disabled={saving}
//             color="primary"
//           >
//             {saving ? <ClipLoader color="#fff" size={18} /> : (editNote ? "Update" : "Add")}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableBody, TableCell,
  TableRow, TableContainer, Stack, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, IconButton, Tooltip, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { Add, Edit, Delete } from "@mui/icons-material";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { seeGreen } from "@/components/utils/Colors";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api.virtual.gpline.ie";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "v0.1";

// Helper: get token and doctorId from localStorage
const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);
const getDoctorId = () => (typeof window !== "undefined" ? Number(localStorage.getItem("doctorId")) : null);

export default function PatientNotesSection({ patientId }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCount, setShowCount] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(
        `${API_BASE}/api/${API_VERSION}/PatientNotes?PatientId=${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      let notesArr = Array.isArray(data) ? data : [];
      // Sort latest on top
      notesArr.sort((a, b) => b.id - a.id);
      setNotes(notesArr);
    } catch {
      toast.error("Failed to load patient notes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [patientId]);

  const openDialog = (note = null) => {
    setEditNote(note);
    setNoteText(note ? note.description : "");
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
    setEditNote(null);
    setNoteText("");
  };

  // Add or edit note (doctorId always from localStorage)
  const handleSave = async () => {
    if (!noteText.trim()) {
      toast.error("Note cannot be empty");
      return;
    }
    setSaving(true);
    const token = getToken();
    const doctorId = getDoctorId();
    if (!doctorId) {
      toast.error("Doctor ID not found in local storage!");
      setSaving(false);
      return;
    }
    const url = editNote
      ? `${API_BASE}/api/${API_VERSION}/PatientNotes/${editNote.id}`
      : `${API_BASE}/api/${API_VERSION}/PatientNotes`;
    const method = editNote ? "PUT" : "POST";
    const payload = {
      id: editNote ? editNote.id : 0,
      description: noteText,
      doctorId: doctorId,
      patientId: patientId,
    };
    try {
      await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      toast.success(editNote ? "Note updated" : "Note added");
      closeDialog();
      fetchNotes();
    } catch {
      toast.error("Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  // Delete note
  const handleDelete = async (noteId) => {
    const confirm = await Swal.fire({
      title: "Delete Note?",
      text: "Are you sure to delete this note?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      confirmButtonText: "Delete",
    });
    if (!confirm.isConfirmed) return;
    setSaving(true);
    const token = getToken();
    try {
      await fetch(
        `${API_BASE}/api/${API_VERSION}/PatientNotes/${noteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Note deleted");
      fetchNotes();
    } catch {
      toast.error("Failed to delete note");
    } finally {
      setSaving(false);
    }
  };

  // Show top 'showCount' notes
  const displayedNotes = notes.slice(0, showCount);

  return (
    <Box mt={5}>
      <Typography variant="h5" fontWeight={600} color={seeGreen} fontSize={"26px"} mb={3}>
        Patient Notes
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel>Show Latest</InputLabel>
          <Select
            value={showCount}
            label="Show Latest"
            onChange={e => setShowCount(Number(e.target.value))}
          >
            {[1,2,3,4,5].map(val => (
              <MenuItem key={val} value={val}>{val}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => openDialog(null)}
          sx={{bgcolor:seeGreen}}
        >
          Add Note
        </Button>
      </Stack>

      <Paper elevation={2} sx={{ borderRadius: 4 }}>
        {loading ? (
          <Stack alignItems="center" py={6}>
            <ClipLoader color="#1976d2" size={40} />
            <Typography mt={2}>Loading notes...</Typography>
          </Stack>
        ) : notes.length === 0 ? (
          <Box p={3} textAlign="center">
            <Typography>No notes found for this patient.</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Description</b></TableCell>
                  <TableCell><b>Doctor ID</b></TableCell>
                  <TableCell><b>Patient ID</b></TableCell>
                  <TableCell><b>Note ID</b></TableCell>
                  <TableCell align="right"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedNotes.map((note) => (
                  <TableRow key={note.id}>
                    <TableCell>{note.description}</TableCell>
                    <TableCell>{note.doctorId}</TableCell>
                    <TableCell>{note.patientId}</TableCell>
                    <TableCell>{note.id}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => openDialog(note)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(note.id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="xs" fullWidth>
        <DialogTitle>{editNote ? "Edit Note" : "Add Note"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Description"
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            multiline
            rows={3}
            fullWidth
            autoFocus
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={saving}
            color="primary"
          >
            {saving ? <ClipLoader color="#fff" size={18} /> : (editNote ? "Update" : "Add")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
