"use client";
import React, { useEffect, useState } from "react";
import {
  Box, Button, Typography, Paper, Grid, TextField, IconButton, Table, TableContainer,
  TableHead, TableRow, TableCell, TableBody, Tooltip, Dialog, DialogTitle, DialogContent,
  DialogActions, CircularProgress
} from "@mui/material";
import { Add, Edit, Delete, Refresh } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";
import { motion } from "framer-motion";
import { seeGreen } from "@/components/utils/Colors";

// --- CONFIG ---
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Alert`;

function getToken() {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return "";
}

const initialForm = { text: "", contactInfo: "" };

export default function Alerts() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  // Fetch all alerts
  const fetchAll = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const { data } = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setList(Array.isArray(data) ? data : data.data || []);
    } catch {
      toast.error("Failed to load alerts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // Open Add or Edit Dialog
  const handleOpenDialog = (item = null) => {
    setEditId(item ? item.id : null);
    setForm(item ? { text: item.text, contactInfo: item.contactInfo } : initialForm);
    setOpenDialog(true);
  };

  // Handle form change
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add/Edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = getToken();
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, { ...form, id: editId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Alert updated!");
      } else {
        await axios.post(API_URL, { ...form, id: 0 }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Alert created!");
      }
      setOpenDialog(false);
      fetchAll();
    } catch {
      toast.error("Save failed!");
    } finally {
      setSaving(false);
    }
  };

  // Delete alert
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Alert?",
      text: "Are you sure you want to delete this alert?",
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
          await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toast.success("Deleted!");
          fetchAll();
        } catch {
          toast.error("Delete failed!");
        }
      }
    });
  };

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
          Alerts Management
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{ borderRadius:1, textTransform: "none",  mr: 2,bgcolor:seeGreen }}
          >
            Add Alert
          </Button>
          <IconButton onClick={fetchAll}  title="Refresh"><Refresh sx={{color:seeGreen}} /></IconButton>
        </Box>
      </Box>
      <Paper
        component={motion.div}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        sx={{ boxShadow: 2, borderRadius: 3, overflow: "auto" }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={5}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Alert Text</TableCell>
                  <TableCell>Contact Info</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No records found.</TableCell>
                  </TableRow>
                ) : (
                  list.map((item, idx) => (
                    <TableRow key={item.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>
                        <Typography sx={{ maxWidth: 280, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                          {item.text}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ maxWidth: 220, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                          {item.contactInfo}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit" arrow>
                          <IconButton onClick={() => handleOpenDialog(item)} color="primary" size="small"><Edit /></IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton onClick={() => handleDelete(item.id)} color="error" size="small"><Delete /></IconButton>
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

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editId ? "Edit Alert" : "Add Alert"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid  size={{xs:12,md:6}}>
                <TextField
                  label="Alert Text"
                  name="text"
                  value={form.text}
                  onChange={handleFormChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid  size={{xs:12,md:6}}>
                <TextField
                  label="Contact Info"
                  name="contactInfo"
                  value={form.contactInfo}
                  onChange={handleFormChange}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ pr: 3, pb: 2 }}>
            <Button onClick={() => setOpenDialog(false)} disabled={saving} color="error" variant="outlined">Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              startIcon={saving && <CircularProgress size={18} color="inherit" />}
              sx={{ bgcolor:seeGreen, textTransform: "none", fontWeight: 600 }}
            >
              {editId ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
