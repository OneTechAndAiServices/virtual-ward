
// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Box, Typography, Paper, Table, TableHead, TableBody, TableCell, TableRow,
//   TableContainer, Chip, CircularProgress, Avatar, Grid, Tooltip
// } from "@mui/material";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { seeGreen } from "@/components/utils/Colors";
// import { ClipLoader } from "react-spinners";

// // --- CONFIG ---
// const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Question/GetPatientIndicators`;

// function getToken() {
//   return localStorage.getItem("token");
// }

// const statusColor = (status) => {
//   if (!status) return "default";
//   if (status.toLowerCase().includes("stable")) return "success";
//   if (status.toLowerCase().includes("critical")) return "error";
//   if (status.toLowerCase().includes("improve")) return "info";
//   return "warning";
// };

// export default function PatientHistoryAll() {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchIndicators() {
//       setLoading(true);
//       try {
//         const token = getToken();
//         const { data } = await axios.get(API_URL, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setRows(Array.isArray(data) ? data : data.data || []);
//       } catch (err) {
//         if (err?.response?.status === 401) toast.error("Session expired! Please login.");
//         else toast.error("Failed to load patient history.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchIndicators();
//   }, []);

//   return (
//     <Box
//       mt={4} mb={3}
   
     
//     >
//       <Toaster position="top-right" />
//       <Box sx={{ mx: "auto" }}>
//         <Typography
//           variant="h4"
//           fontWeight={600}
          
//           color={seeGreen}
      
//           mb={3}
//           fontSize={"26px"}
//           letterSpacing={1}
//         >
//           Patient Questionnaire History
//         </Typography>
//         <Box
//           sx={{
//             borderRadius: 4,
//             p: 0,
//             boxShadow: "0 2px 16px 0 rgba(0,0,0,0.1)",
//             // border: "1.5px solid #e3e6e8"
//           }}
//         >
//           {loading ? (
//            <Box display="flex" justifyContent="center" alignItems="center" p={7}>
//               <ClipLoader color={seeGreen} size={54} />
//             </Box>
//           ) : rows.length === 0 ? (
//             <Box p={5} textAlign="center">
//               <Typography>No patient indicators found.</Typography>
//             </Box>
//           ) : (
//             <TableContainer>
//               <Table size="small" sx={{
//                 "& th": {
//                   fontWeight: 700,
//                   fontSize: 15,
//                   // bgcolor: "#f4f8fb",
//                   // color: "#1565c0",
//                   letterSpacing: 0.5,
//                   borderBottom: "2px solid #e3e6e8"
//                 },
//                 "& td, & th": {
//                   borderBottom: "1px solid #e3e6e8",
//                   py: 2
//                 },
//                 "& tr:nth-of-type(even)": {
//                   // backgroundColor: "#fafcff"
//                 }
//               }}>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="center">Patient</TableCell>
//                     <TableCell align="center">Type</TableCell>
//                     <TableCell>Surgery Detail</TableCell>
//                     <TableCell>Discharge Date</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Response Date</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {rows.map((row, idx) => (
//                     <TableRow key={idx}>
//                       <TableCell align="center">
//                         <Grid container alignItems="center" spacing={1} wrap="nowrap">
//                           {/* <Grid item>
//                             <Avatar sx={{
//                               bgcolor: "#e3e6e8",
//                               color: "#1976d2",
//                               fontWeight: 700,
//                               width: 38, height: 38
//                             }}>
//                               {row.firstName?.[0]?.toUpperCase() || "P"}
//                             </Avatar>
//                           </Grid> */}
//                           <Grid item>
//                             <Tooltip title={row.firstName + " " + row.lastName}>
//                               <Typography fontWeight={600} fontSize={15} color="text.primary">
//                                 {row.firstName} <span style={{ fontWeight: 400, color: "#1976d2" }}>{row.lastName}</span>
//                               </Typography>
//                             </Tooltip>
//                           </Grid>
//                         </Grid>
//                       </TableCell>
//                       <TableCell align="center">
//                         <Chip
//                           label="Hospital"
//                           size="small"
//                           sx={{
//                             background: "#f4f8fb",
//                             color: "#1565c0",
//                             fontWeight: 600,
//                             letterSpacing: 0.5,
//                             px: 1.8
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Typography fontWeight={500} fontSize={14}>
//                           {row.surgeryDetail ? row.surgeryDetail : "-"}
//                         </Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Typography fontSize={14}>
//                           {row.dischargeDate
//                             ? new Date(row.dischargeDate).toLocaleDateString()
//                             : <span style={{ color: "#aaa" }}>Not discharged</span>}
//                         </Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Chip
//                           label={row.indicatorStatus}
//                           color={statusColor(row.indicatorStatus)}
//                           size="small"
//                           sx={{
//                             fontWeight: 600,
//                             fontSize: 13,
//                             letterSpacing: 0.5
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Typography fontSize={14}>
//                           {row.responseDate
//                             ? new Date(row.responseDate).toLocaleString()
//                             : "-"}
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }
 "use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableBody, TableCell, TableRow,
  TableContainer, Chip, Grid, Tooltip,
  TablePagination, FormControl, Select, MenuItem, InputLabel, Stack, IconButton
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { seeGreen } from "@/components/utils/Colors";
import dayjs from "dayjs";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";

// --- CONFIG ---
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Question/GetPatientIndicators`;

function getToken() {
  return localStorage.getItem("token");
}

const INDICATOR_STATUS = [
  "All",
  "Stable",
  "Critical",
  "Urgent",
  "Moderate",
  "Improving",
];

const statusColor = (status) => {
  if (!status) return "default";
  const s = status.toLowerCase();
  if (s.includes("stable")) return "success";
  if (s.includes("critical")) return "error";
  if (s.includes("urgent")) return "warning";
  if (s.includes("moderate")) return "info";
  if (s.includes("improv")) return "info";
  return "default";
};

export default function PatientHistoryAll() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dateFilter, setDateFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const router = useRouter();

  // Fetch data
  useEffect(() => {
    async function fetchIndicators() {
      setLoading(true);
      try {
        const token = getToken();
        const { data } = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // IMPORTANT: Use .reverse() to show latest data at the top
        setRows(Array.isArray(data) ? data.reverse() : (data.data || []).reverse());
      } catch (err) {
        if (err?.response?.status === 401) toast.error("Session expired! Please login.");
        else toast.error("Failed to load patient history.");
      } finally {
        setLoading(false);
      }
    }
    fetchIndicators();
  }, []);

  // Filtered and paginated data
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      // Date filter
      if (dateFilter === "Today") {
        const respDate = row.responseDate ? dayjs(row.responseDate) : null;
        if (!respDate || !respDate.isSame(dayjs(), 'day')) return false;
      }
      // Status filter
      if (statusFilter !== "All" && row.indicatorStatus?.toLowerCase() !== statusFilter.toLowerCase())
        return false;
      return true;
    });
  }, [rows, dateFilter, statusFilter]);

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredRows.slice(start, start + rowsPerPage);
  }, [filteredRows, page, rowsPerPage]);

  // Handlers
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  const handleDateFilter = (e) => {
    setDateFilter(e.target.value);
    setPage(0);
  };
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setPage(0);
  };
  const handleClearFilters = () => {
    setDateFilter("All");
    setStatusFilter("All");
    setPage(0);
    toast.success("Filters cleared!", { position: "top-center" });
  };

  // Action: navigate to patient detail page
  const handleShowVitals = (row) => {
    if (!row.patientId) {
      toast.error("Patient ID not found!", { position: "top-center" });
      return;
    }
    router.push(`/patients/${row.patientId}`);
  };

  return (
    <Box mt={4} mb={3}>
      <Toaster position="top-center" /> {/* Toasts in center */}
      <Box sx={{ mx: "auto" }}>
        <Typography
          variant="h4"
          fontWeight={600}
          color={seeGreen}
          mb={3}
          fontSize="26px"
          letterSpacing={1}
        >
          Patient Questionnaire History
        </Typography>

        {/* FILTERS + CLEAR ICON */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Date Filter</InputLabel>
            <Select value={dateFilter} label="Date Filter" onChange={handleDateFilter}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Today">Today</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status Filter</InputLabel>
            <Select value={statusFilter} label="Status Filter" onChange={handleStatusFilter}>
              {INDICATOR_STATUS.map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Tooltip title="Clear Filters">
            <IconButton color="error" onClick={handleClearFilters} sx={{ ml: 1 }}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Box
          sx={{
            borderRadius: 4,
            p: 0,
            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.1)",
            minHeight: 200,
            transition: "box-shadow .2s",
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" p={7}>
              <ClipLoader color={seeGreen} size={54} />
            </Box>
          ) : filteredRows.length === 0 ? (
            <Box p={5} textAlign="center">
              <Typography>No patient indicators found.</Typography>
            </Box>
          ) : (
            <>
              <TableContainer component={Paper} elevation={0}>
                <Table size="small" sx={{
                  "& th": {
                    fontWeight: 700,
                    fontSize: 15,
                    letterSpacing: 0.5,
                    borderBottom: "2px solid #e3e6e8"
                  },
                  "& td, & th": {
                    borderBottom: "1px solid #e3e6e8",
                    py: 2
                  }
                }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Patient</TableCell>
                      <TableCell align="center">Type</TableCell>
                      <TableCell>Surgery Detail</TableCell>
                      <TableCell>Discharge Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Response Date</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedRows.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell align="center">
                          <Grid container alignItems="center" spacing={1} wrap="nowrap">
                            <Grid item>
                              <Tooltip title={row.firstName + " " + row.lastName}>
                                <Typography fontWeight={600} fontSize={15} color="text.primary">
                                  {row.firstName} <span style={{ fontWeight: 400, color: "#1976d2" }}>{row.lastName}</span>
                                </Typography>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label="Hospital"
                            size="small"
                            sx={{
                              background: "#f4f8fb",
                              color: "#1565c0",
                              fontWeight: 600,
                              letterSpacing: 0.5,
                              px: 1.8
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight={500} fontSize={14}>
                            {row.surgeryDetail ? row.surgeryDetail : "-"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontSize={14}>
                            {row.dischargeDate
                              ? new Date(row.dischargeDate).toLocaleDateString()
                              : <span style={{ color: "#aaa" }}>Not discharged</span>}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.indicatorStatus}
                            color={statusColor(row.indicatorStatus)}
                            size="small"
                            sx={{
                              fontWeight: 600,
                              fontSize: 13,
                              letterSpacing: 0.5
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography fontSize={14}>
                            {row.responseDate
                              ? dayjs(row.responseDate).format("YYYY-MM-DD HH:mm")
                              : "-"}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Show Vitals">
                            <IconButton
                              color="primary"
                              onClick={() => handleShowVitals(row)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={filteredRows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
