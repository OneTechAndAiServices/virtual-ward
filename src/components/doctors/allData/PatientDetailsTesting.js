"use client";
import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableBody, TableCell,
  TableRow, TableContainer, FormControl, MenuItem, Select, InputLabel, Stack
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { usePathname } from "next/navigation";
import { ClipLoader } from "react-spinners";
import PatientNotesSection from "./PatientNotesSection";
import { seeGreen } from "@/components/utils/Colors";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api.virtual.gpline.ie";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "v0.1";

// Helper: get token from localStorage
const getToken = () => {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return null;
};

export default function PatientDetailsTesting() {
  const pathname = usePathname();
  const patientId = pathname ? pathname.split("/").pop() : undefined;

  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCount, setShowCount] = useState(1); // default show latest 1

  useEffect(() => {
    if (!patientId) return;
    async function fetchVitals() {
      setLoading(true);
      try {
        const token = getToken();
        const res = await axios.get(
          `${API_BASE}/api/${API_VERSION}/Vitals`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { PatientId: patientId }
          }
        );
        let data = Array.isArray(res.data) ? res.data : [];
        // Sort by latest first
        data.sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));
        setVitals(data);
      } catch (err) {
        toast.error("Failed to fetch patient vitals.");
      } finally {
        setLoading(false);
      }
    }
    fetchVitals();
  }, [patientId]);

  // Only show "showCount" latest vitals
  const displayedVitals = vitals.slice(0, showCount);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Toaster />
      <Typography variant="h4" fontWeight={600} color={seeGreen} fontSize={"26px"} mb={3}>
        Patient Vitals Details (ID: {patientId})
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
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
        <Typography fontSize={14} color="text.secondary">
          Showing {displayedVitals.length} of {vitals.length} records
        </Typography>
      </Stack>

      <Paper elevation={3} sx={{ borderRadius: 4, p: 3 }}>
        {loading ? (
          <Stack alignItems="center" py={6}>
            <ClipLoader color="#1976d2" size={46} />
            <Typography mt={2}>Loading patient vitals...</Typography>
          </Stack>
        ) : vitals.length === 0 ? (
          <Box p={3} textAlign="center">
            <Typography>No vitals found for this patient.</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Date & Time</b></TableCell>
                  <TableCell align="center"><b>BP Systolic</b></TableCell>
                  <TableCell align="center"><b>BP Diastolic</b></TableCell>
                  <TableCell align="center"><b>Temperature (°C)</b></TableCell>
                  <TableCell align="center"><b>SaO₂ (%)</b></TableCell>
                  <TableCell align="center"><b>Pulse</b></TableCell>
                  <TableCell align="center"><b>Resp. Rate</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedVitals.map((row, idx) => (
                  <TableRow key={row.id || idx}>
                    <TableCell>
                      {row.recordedAt ? new Date(row.recordedAt).toLocaleString() : "-"}
                    </TableCell>
                    <TableCell align="center">{row.bloodPressureSystolic}</TableCell>
                    <TableCell align="center">{row.bloodPressureDiastolic}</TableCell>
                    <TableCell align="center">{row.temperature}</TableCell>
                    <TableCell align="center">{row.saO2}</TableCell>
                    <TableCell align="center">{row.pulse}</TableCell>
                    <TableCell align="center">{row.respiratoryRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <PatientNotesSection patientId={patientId}  />

    </Box>
  );
}
