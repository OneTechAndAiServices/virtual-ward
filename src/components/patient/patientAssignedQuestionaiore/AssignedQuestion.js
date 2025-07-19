// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Box, Grid, Card, CardContent, Typography, CircularProgress, Tooltip, Paper
// } from "@mui/material";
// import toast, { Toaster } from "react-hot-toast";
// import { seeGreen } from "@/components/utils/Colors"; // Import your color
// import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

// function getToken() {
//   if (typeof window !== "undefined") return localStorage.getItem("token");
//   return "";
// }

// function getPatientId() {
//   if (typeof window !== "undefined") return localStorage.getItem("patientId");
//   return "";
// }

// const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
// const API_PATIENT_QUERYSET = `${API_BASE}/PatientQuerySet`;

// export default function AssignedQuestion() {
//   const [data, setData] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Load on mount
//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       try {
//         const token = getToken();
//         if (!token) throw new Error("No token found");
//         const res = await fetch(API_PATIENT_QUERYSET, {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "accept": "application/json"
//           }
//         });
//         if (!res.ok) throw new Error("Failed to fetch");
//         const body = await res.json();
//         setData(body || []);
//       } catch (err) {
//         toast.error("Failed to load assigned questions");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   // Filter when data changes
//   useEffect(() => {
//     const pid = Number(getPatientId());
//     if (!pid) return setFiltered([]);
//     setFiltered(data.filter(q => q.patientId === pid));
//   }, [data]);

//   return (
//     <Box sx={{ p: { xs: 1, md: 3 }, minHeight: "90vh", bgcolor: "#f6f8f9" }}>
//       <Toaster position="top-right" />
//       <Typography
//         variant="h4"
//         fontWeight={700}
//         color={seeGreen}
//         mb={3}
//         mt={2}
//         sx={{ textAlign: "center", letterSpacing: 1 }}
//       >
//         Assigned Patient Queries
//       </Typography>
//       {loading ? (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
//           <CircularProgress size={44} color="success" />
//         </Box>
//       ) : filtered.length === 0 ? (
//         <Paper sx={{ p: 5, textAlign: "center", mt: 5, borderRadius: 3, color: seeGreen, fontWeight: 600 }}>
//           <AssignmentIndIcon sx={{ fontSize: 56, color: seeGreen, mb: 2 }} />
//           <Typography variant="h6">No assigned questions for this patient.</Typography>
//         </Paper>
//       ) : (
//         <Grid container spacing={3} justifyContent="center">
//           {filtered.map((item) => (
//             <Grid  size={{xs:11,sm:6,md:3,}} key={item.id}>
//               <Card
//                 sx={{
//                   borderRadius: 4,
//                   boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
//                   transition: "0.2s",
//                   ":hover": { boxShadow: "0 6px 24px rgba(40,160,100,0.15)", transform: "translateY(-2px) scale(1.025)" },
//                   bgcolor: "#fff",
//                   border: `2px solid ${seeGreen}22`
//                 }}
//               >
//                 <CardContent>
//                   <Box display="flex" alignItems="center" gap={1} mb={1}>
//                     <AssignmentIndIcon sx={{ color: seeGreen, fontSize: 30 }} />
//                     <Typography variant="h6" fontWeight={700} color={seeGreen}>
//                       Query #{item.id}
//                     </Typography>
//                   </Box>
//                   <Tooltip title={item.description} arrow>
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         mb: 2,
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         display: "-webkit-box",
//                         WebkitBoxOrient: "vertical",
//                         WebkitLineClamp: 3,
//                         minHeight: "72px"
//                       }}
//                     >
//                       {item.description}
//                     </Typography>
//                   </Tooltip>
//                   <Box mt={2}>
//                     <Typography fontWeight={600} fontSize={15} color="#99A">
//                       Questionnaire ID:
//                       <span style={{ color: seeGreen, fontWeight: 700, marginLeft: 6 }}>
//                         {item.questionnaireId}
//                       </span>
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// }



"use client";
import React, { useEffect, useState } from "react";
import {
  Box, Grid, Card, CardContent, Typography, CircularProgress, Tooltip, Paper, IconButton
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { seeGreen } from "@/components/utils/Colors";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PatientQuestions from "../questions/PatientQuestions";
// import PatientQuestions from "./PatientQuestions"; // import the stepper component

function getToken() {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return "";
}

function getPatientId() {
  if (typeof window !== "undefined") return localStorage.getItem("patientId");
  return "";
}

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
const API_PATIENT_QUERYSET = `${API_BASE}/PatientQuerySet`;

export default function AssignedQuestion() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showStepper, setShowStepper] = useState(false);
  const [activeQuestionnaireId, setActiveQuestionnaireId] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  // Load assigned queries on mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const token = getToken();
        if (!token) throw new Error("No token found");
        const res = await fetch(API_PATIENT_QUERYSET, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "accept": "application/json"
          }
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const body = await res.json();
        setData(body || []);
      } catch (err) {
        toast.error("Failed to load assigned questions");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter queries by patientId
  useEffect(() => {
    const pid = Number(getPatientId());
    if (!pid) return setFiltered([]);
    setFiltered(data.filter(q => q.patientId === pid));
  }, [data]);

  // On card click, show the stepper for that questionnaireId
  const handleCardClick = (item) => {
    setActiveQuestionnaireId(item.questionnaireId);
    setActiveCard(item);
    setShowStepper(true);
  };

  // Back to grid
  const handleBackToGrid = () => {
    setShowStepper(false);
    setActiveQuestionnaireId(null);
    setActiveCard(null);
  };

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, minHeight: "90vh", bgcolor: "#f6f8f9",borderRadius:2,mx:1 }}>
      <Toaster position="top-right" />
      {!showStepper ? (
        <>
          <Typography
            variant="h4"
            fontWeight={700}
            color={seeGreen}
            mb={3}
            mt={2}
            sx={{ textAlign: "center", letterSpacing: 1 }}
          >
            Assigned Patient Queries
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
              <CircularProgress size={44} color="success" />
            </Box>
          ) : filtered.length === 0 ? (
            <Paper sx={{ p: 5, textAlign: "center", mt: 5, borderRadius: 3, color: seeGreen, fontWeight: 600 }}>
              <AssignmentIndIcon sx={{ fontSize: 56, color: seeGreen, mb: 2 }} />
              <Typography variant="h6">No assigned questions for this patient.</Typography>
            </Paper>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {filtered.map((item) => (
                <Grid size={{xs:5}} key={item.id}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                      transition: "0.2s",
                      ":hover": {
                        boxShadow: "0 6px 24px rgba(40,160,100,0.15)",
                        transform: "translateY(-2px) scale(1.025)",
                        borderColor: seeGreen
                      },
                      bgcolor: "#fff",
                      border: `2px solid ${seeGreen}22`,
                      cursor: "pointer"
                    }}
                    onClick={() => handleCardClick(item)}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <AssignmentIndIcon sx={{ color: seeGreen, fontSize: 30 }} />
                        <Typography variant="h6" fontWeight={700} color={seeGreen}>
                          Query #{item.id}
                        </Typography>
                      </Box>
                      <Tooltip title={item.description} arrow>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                            minHeight: "72px"
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Tooltip>
                      <Box mt={2}>
                        <Typography fontWeight={600} fontSize={15} color="#99A">
                          Questionnaire ID:
                          <span style={{ color: seeGreen, fontWeight: 700, marginLeft: 6 }}>
                            {item.questionnaireId}
                          </span>
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      ) : (
        // Show PatientQuestions stepper for selected questionnaireId
        <Box maxWidth={650} mx="auto">
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton onClick={handleBackToGrid} sx={{ bgcolor: seeGreen, color: "white", borderRadius: 100, mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" fontWeight={700} color={seeGreen}>
              Questionnaire #{activeQuestionnaireId}
            </Typography>
          </Box>
          <PatientQuestions questionnaireId={activeQuestionnaireId} />
        </Box>
      )}
    </Box>
  );
}
