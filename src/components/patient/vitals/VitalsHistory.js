// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import { seeGreen } from "@/components/utils/Colors";
// import dayjs from "dayjs";

// const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v0.1/Vitals`;

// function VitalsHistory() {
//   const [vitals, setVitals] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getPatientId = () => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("patientId");
//     }
//     return null;
//   };

//   useEffect(() => {
//     const fetchVitals = async () => {
//       const patientId = getPatientId();
//       if (!patientId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.post(API_URL, {
//           PatientId: Number(patientId),
//         });

//         if (Array.isArray(response.data)) {
//           setVitals(response.data);
//         } else {
//           setVitals([]);
//         }
//       } catch (error) {
//         console.error("❌ Error fetching vitals:", error);
//         setVitals([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVitals();
//   }, []);

//   return (
//     <Box p={3}>
//       <Typography variant="h4" fontWeight={700} color="primary" mb={3}>
//         Vitals History
//       </Typography>

//       <Paper sx={{ borderRadius: 3, boxShadow: 2, overflowX: "auto" }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" p={5}>
//             <CircularProgress color="success" />
//           </Box>
//         ) : vitals.length === 0 ? (
//           <Typography p={3} textAlign="center">
//             No vitals records found.
//           </Typography>
//         ) : (
//           <TableContainer>
//             <Table>
//               <TableHead sx={{ bgcolor: seeGreen }}>
//                 <TableRow>
//                   <TableCell sx={{ color: "#fff" }}>#</TableCell>
//                   <TableCell sx={{ color: "#fff" }}>Date</TableCell>
//                   <TableCell sx={{ color: "#fff" }}>Pulse (bpm)</TableCell>
//                   <TableCell sx={{ color: "#fff" }}>Temperature (°C)</TableCell>
//                   <TableCell sx={{ color: "#fff" }}>SaO2 (%)</TableCell>
//                   <TableCell sx={{ color: "#fff" }}>Resp. Rate</TableCell>
//                   <TableCell sx={{ color: "#fff" }}>Systolic</TableCell>
//                   <TableCell sx={{ color: "#fff" }}>Diastolic</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {vitals.map((row, index) => (
//                   <TableRow key={row.id || index}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>
//                       {dayjs(row.recordedAt).format("DD MMM YYYY, HH:mm")}
//                     </TableCell>
//                     <TableCell>{row.pulse}</TableCell>
//                     <TableCell>{row.temperature}</TableCell>
//                     <TableCell>{row.saO2}</TableCell>
//                     <TableCell>{row.respiratoryRate}</TableCell>
//                     <TableCell>{row.bloodPressureSystolic}</TableCell>
//                     <TableCell>{row.bloodPressureDiastolic}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// export default VitalsHistory;
// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   TablePagination,
//   Grid,
//   TextField,
// } from "@mui/material";
// import dayjs from "dayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import axios from "axios";
// import { seeGreen } from "@/components/utils/Colors";

// const API_URL = "http://api.virtual.gpline.ie/api/v0.1/Vitals";

// function VitalsHistory() {
//   const [vitals, setVitals] = useState([]);
//   const [filteredVitals, setFilteredVitals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const getToken = () =>
//     typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   const getPatientId = () =>
//     typeof window !== "undefined" ? localStorage.getItem("patientId") : "";

//   useEffect(() => {
//     const fetchVitals = async () => {
//       const token = getToken();
//       const patientId = getPatientId();

//       if (!token || !patientId) {
//         console.warn("Missing token or patientId");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(API_URL, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             PatientId: Number(patientId),
//           },
//         });

//         if (Array.isArray(response.data)) {
//           setVitals(response.data);
//           setFilteredVitals(response.data);
//         } else {
//           setVitals([]);
//           setFilteredVitals([]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch vitals:", error);
//         setVitals([]);
//         setFilteredVitals([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVitals();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleDateFilter = (date) => {
//     setSelectedDate(date);
//     if (!date) {
//       setFilteredVitals(vitals);
//     } else {
//       const filtered = vitals.filter((vital) =>
//         dayjs(vital.recordedAt).isSame(dayjs(date), "day")
//       );
//       setFilteredVitals(filtered);
//     }
//   };

//   return (
//     <Box p={2}>
//       <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
//         Vitals History
//       </Typography>

//       <Grid container spacing={2} alignItems="center" mb={2}>
//         <Grid item xs={12} sm={6}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="Filter by Date"
//               value={selectedDate}
//               onChange={handleDateFilter}
//               slotProps={{ textField: { fullWidth: true, size: "small" } }}
//             />
//           </LocalizationProvider>
//         </Grid>
//       </Grid>

//       <Paper sx={{ borderRadius: 2, overflowX: "auto" }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" p={5}>
//             <CircularProgress color="success" />
//           </Box>
//         ) : filteredVitals.length === 0 ? (
//           <Typography p={3} textAlign="center">
//             No vitals records found.
//           </Typography>
//         ) : (
//           <>
//             <TableContainer>
//               <Table size="small">
//                 <TableHead sx={{ bgcolor: seeGreen }}>
//                   <TableRow>
//                     <TableCell sx={{ color: "#fff" }}>#</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Date</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Pulse</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Temp (°C)</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>SaO2 (%)</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Resp. Rate</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Systolic</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>Diastolic</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredVitals
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((row, index) => (
//                       <TableRow key={row.id || index}>
//                         <TableCell>{index + 1}</TableCell>
//                         <TableCell>
//                           {dayjs(row.recordedAt).format("DD MMM YYYY, HH:mm")}
//                         </TableCell>
//                         <TableCell>{row.pulse}</TableCell>
//                         <TableCell>{row.temperature}</TableCell>
//                         <TableCell>{row.saO2}</TableCell>
//                         <TableCell>{row.respiratoryRate}</TableCell>
//                         <TableCell>{row.bloodPressureSystolic}</TableCell>
//                         <TableCell>{row.bloodPressureDiastolic}</TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={filteredVitals.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// export default VitalsHistory;



"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  TablePagination,
  Grid,
  IconButton,
  InputAdornment,
  Tooltip
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import { seeGreen } from "@/components/utils/Colors";
import ClearIcon from "@mui/icons-material/Clear";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const API_URL = "http://api.virtual.gpline.ie/api/v0.1/Vitals";

function VitalsHistory() {
  const [vitals, setVitals] = useState([]);
  const [filteredVitals, setFilteredVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const getPatientId = () =>
    typeof window !== "undefined" ? localStorage.getItem("patientId") : "";

  const fetchVitals = async () => {
    setLoading(true);
    const token = getToken();
    const patientId = getPatientId();

    if (!token || !patientId) {
      console.warn("Missing token or patientId");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          PatientId: Number(patientId),
        },
      });

      const data = Array.isArray(response.data) ? response.data : [];
      setVitals(data);
      setFilteredVitals(data);
    } catch (err) {
      console.error("Error fetching vitals:", err);
      setVitals([]);
      setFilteredVitals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVitals();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (!date) {
      setFilteredVitals(vitals);
      return;
    }
    const filtered = vitals.filter((v) =>
      dayjs(v.recordedAt).isSame(dayjs(date), "day")
    );
    setFilteredVitals(filtered);
    setPage(0);
  };

  const handleClearDate = () => {
    setSelectedDate(null);
    setFilteredVitals(vitals);
    setPage(0);
  };

  const handleRefresh = () => {
    fetchVitals();
    setSelectedDate(null);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={2}>
          <Box display={"flex"} alignItems={"center"} mb={2}>
               <IconButton
                  sx={{ mr: 1}}
                  href="/patient-vitals"
                >
                  <ArrowBackIcon  sx={{ bgcolor:seeGreen,color:"white",borderRadius:100,p:0.5,fontSize:30 }} />
                </IconButton>
      <Typography variant="h4" fontWeight={600} fontSize={"26px"} color={seeGreen} >
        Vitals History
      </Typography>
          </Box>

      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid  size={{xs:10,md:6}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Filter by Date"
              value={selectedDate}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        {selectedDate && (
                          <IconButton onClick={handleClearDate}>
                            <ClearIcon />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid >
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh}>
              <RefreshIcon color={seeGreen} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <Box sx={{ borderRadius: 2, overflowX: "auto" }}>
        {loading ? (
          <Box display="flex" justifyContent="center" p={5}>
            <CircularProgress color="success" />
          </Box>
        ) : filteredVitals.length === 0 ? (
          <Typography p={3} textAlign="center">
            No vitals records found.
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table >
                <TableHead sx={{ bgcolor: seeGreen }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>#</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Pulse</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Temp (°C)</TableCell>
                    <TableCell sx={{ color: "#fff" }}>SaO2 (%)</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Resp. Rate</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Systolic</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Diastolic</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredVitals
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).reverse()
                    .map((v, i) => (
                      <TableRow key={v.id || i}>
                        <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                        <TableCell>
                          {dayjs(v.recordedAt).format("DD MMM YYYY, HH:mm")}
                        </TableCell>
                        <TableCell>{v.pulse}</TableCell>
                        <TableCell>{v.temperature}</TableCell>
                        <TableCell>{v.saO2}</TableCell>
                        <TableCell>{v.respiratoryRate}</TableCell>
                        <TableCell>{v.bloodPressureSystolic}</TableCell>
                        <TableCell>{v.bloodPressureDiastolic}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredVitals.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Box>
    </Box>
  );
}

export default VitalsHistory;
