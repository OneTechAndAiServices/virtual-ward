// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Box, Typography, Paper, Table, TableHead, TableBody, TableCell, TableRow,
//   TableContainer, Chip, CircularProgress, Avatar, Grid, Tooltip, useTheme
// } from "@mui/material";
// import { blueGrey } from "@mui/material/colors";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { motion } from "framer-motion";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

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

// export default function QuestionHistory() {
//   const theme = useTheme();
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
//       minHeight="100vh"
//       sx={{
//         background: `linear-gradient(140deg, #e3f2fd 40%, #f0f7fa 100%)`,
//         py: { xs: 2, md: 8 }
//       }}
//     >
//       <Toaster position="top-right" />
//       <Box sx={{ maxWidth: 950, mx: "auto" }}>
//         <Typography
//           variant="h3"
//           fontWeight={800}
//           color="primary"
//           textAlign="center"
//           mb={3}
//           letterSpacing={2}
//           sx={{
//             textShadow: "0 2px 12px #e3f2fd",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 1,
//           }}
//         >
//           <LocalHospitalIcon sx={{ fontSize: 42, color: "#1976d2" }} />
//           Hospital Patient Indicator History
//         </Typography>
//         <Paper
//           component={motion.div}
//           initial={{ opacity: 0, scale: 0.97 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           sx={{
//             p: 0,
//             borderRadius: 5,
//             boxShadow: "0 8px 36px 0 rgba(25,118,210,0.09)",
//             background: theme.palette.mode === "dark"
//               ? "linear-gradient(120deg, #232526 40%, #1c92d2 100%)"
//               : "rgba(255,255,255,0.96)",
//             border: "1.5px solid #e3f2fd",
//             backdropFilter: "blur(8px)",
//             overflow: "hidden"
//           }}
//         >
//           {loading ? (
//             <Box display="flex" justifyContent="center" alignItems="center" p={7}>
//               <CircularProgress color="primary" size={56} />
//             </Box>
//           ) : rows.length === 0 ? (
//             <Box p={5} textAlign="center">
//               <Typography>No patient indicators found.</Typography>
//             </Box>
//           ) : (
//             <TableContainer>
//               <Table size="medium" sx={{
//                 "& th": { background: "#f0f7fa", fontWeight: 700, fontSize: 17, color: "#1976d2", letterSpacing: 1.2, borderBottom: "2px solid #e3e3e3" },
//                 "& td, & th": { borderBottom: "1.3px solid #e3e3e3", py: 2 },
//                 "& tr:last-child td": { borderBottom: 0 }
//               }}>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="center">Patient</TableCell>
//                     <TableCell align="center">Hospital Type</TableCell>
//                     <TableCell>Surgery Detail</TableCell>
//                     <TableCell>Discharge Date</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Response Date</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {rows.map((row, idx) => (
//                     <TableRow
//                       key={idx}
//                       sx={{
//                         background: idx % 2 ? "#f5fafd" : "transparent",
//                         transition: "background 0.2s"
//                       }}
//                     >
//                       <TableCell align="center" sx={{ minWidth: 160 }}>
//                         <Grid container alignItems="center" spacing={1} wrap="nowrap">
//                           <Grid item>
//                             <Avatar
//                               sx={{
//                                 bgcolor: blueGrey[100],
//                                 color: "#1976d2",
//                                 border: "2.5px solid #1976d2",
//                                 boxShadow: "0 2px 6px rgba(25,118,210,0.10)"
//                               }}
//                             >
//                               {row.firstName?.[0]?.toUpperCase() || "P"}
//                             </Avatar>
//                           </Grid>
//                           <Grid item>
//                             <Tooltip title={row.firstName + " " + row.lastName}>
//                               <Typography fontWeight={700} fontSize={17} color="text.primary">
//                                 {row.firstName} <span style={{ fontWeight: 500, color: "#1976d2" }}>{row.lastName}</span>
//                               </Typography>
//                             </Tooltip>
//                           </Grid>
//                         </Grid>
//                       </TableCell>
//                       <TableCell align="center">
//                         <Chip
//                           icon={<LocalHospitalIcon />}
//                           label="Hospital"
//                           color="primary"
//                           sx={{
//                             background: "#e3f2fd",
//                             color: "#1976d2",
//                             fontWeight: 700,
//                             letterSpacing: 1.2,
//                             fontSize: 16,
//                             px: 2
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Chip
//                           label={row.surgeryDetail ? row.surgeryDetail : "N/A"}
//                           color="info"
//                           variant="outlined"
//                           sx={{ fontWeight: 500, fontSize: 15 }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         {row.dischargeDate ? (
//                           <Chip
//                             label={new Date(row.dischargeDate).toLocaleDateString()}
//                             color="success"
//                             variant="outlined"
//                             sx={{ fontWeight: 600 }}
//                           />
//                         ) : (
//                           <Chip label="Not discharged" color="warning" variant="outlined" sx={{ fontWeight: 600 }} />
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         <Chip
//                           label={row.indicatorStatus}
//                           color={statusColor(row.indicatorStatus)}
//                           size="medium"
//                           sx={{
//                             fontWeight: 700,
//                             fontSize: 15,
//                             letterSpacing: 1,
//                             border: "1.2px solid #1976d2"
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Typography fontWeight={600} fontSize={15} color="#1976d2">
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
//         </Paper>
//       </Box>
//     </Box>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableBody, TableCell, TableRow,
  TableContainer, Chip, CircularProgress, Avatar, Grid, Tooltip
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { seeGreen } from "@/components/utils/Colors";
import { ClipLoader } from "react-spinners";

// --- CONFIG ---
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Question/GetPatientIndicators`;

function getToken() {
  return localStorage.getItem("token");
}

const statusColor = (status) => {
  if (!status) return "default";
  if (status.toLowerCase().includes("stable")) return "success";
  if (status.toLowerCase().includes("critical")) return "error";
  if (status.toLowerCase().includes("improve")) return "info";
  return "warning";
};

export default function QuestionHistory() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIndicators() {
      setLoading(true);
      try {
        const token = getToken();
        const { data } = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRows(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        if (err?.response?.status === 401) toast.error("Session expired! Please login.");
        else toast.error("Failed to load patient history.");
      } finally {
        setLoading(false);
      }
    }
    fetchIndicators();
  }, []);

  return (
    <Box
      minHeight="100vh"
      mt={2}
      mx={1}
     
    >
      <Toaster position="top-right" />
      <Box sx={{ mx: "auto" }}>
        <Typography
          variant="h4"
          fontWeight={600}
          
          color={seeGreen}
      
          mb={3}
          fontSize={"26px"}
          letterSpacing={1}
        >
          Patient Indicator History
        </Typography>
        <Box
          sx={{
            borderRadius: 4,
            p: 0,
            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.1)",
            // border: "1.5px solid #e3e6e8"
          }}
        >
          {loading ? (
           <Box display="flex" justifyContent="center" alignItems="center" p={7}>
              <ClipLoader color={seeGreen} size={54} />
            </Box>
          ) : rows.length === 0 ? (
            <Box p={5} textAlign="center">
              <Typography>No patient indicators found.</Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table size="small" sx={{
                "& th": {
                  fontWeight: 700,
                  fontSize: 15,
                  // bgcolor: "#f4f8fb",
                  // color: "#1565c0",
                  letterSpacing: 0.5,
                  borderBottom: "2px solid #e3e6e8"
                },
                "& td, & th": {
                  borderBottom: "1px solid #e3e6e8",
                  py: 2
                },
                "& tr:nth-of-type(even)": {
                  // backgroundColor: "#fafcff"
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell align="center">
                        <Grid container alignItems="center" spacing={1} wrap="nowrap">
                          {/* <Grid item>
                            <Avatar sx={{
                              bgcolor: "#e3e6e8",
                              color: "#1976d2",
                              fontWeight: 700,
                              width: 38, height: 38
                            }}>
                              {row.firstName?.[0]?.toUpperCase() || "P"}
                            </Avatar>
                          </Grid> */}
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
                            ? new Date(row.responseDate).toLocaleString()
                            : "-"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
}
