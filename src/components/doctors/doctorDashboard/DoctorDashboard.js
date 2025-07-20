// "use client";
// import React, { useEffect, useState } from "react";
// import { Box, Grid, Paper, Typography, CircularProgress } from "@mui/material";
// import { seeGreen } from "@/components/utils/Colors";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// import PeopleIcon from "@mui/icons-material/People";
// import WarningIcon from "@mui/icons-material/Warning";
// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
// import AdminGraphs from "./AdminGraphs";

// // API endpoints (adjust as needed)
// const API_DOCTORS = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Doctor`;
// const API_PATIENTS = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Patient`;

// function getToken() {
//   if (typeof window !== "undefined") return localStorage.getItem("token");
//   return "";
// }

// const metricBoxes = [
//   {
//     label: "Total Doctors",
//     icon: <LocalHospitalIcon sx={{ fontSize: 38, color: "#fff" }} />,
//     color: "linear-gradient(90deg, #29e78a 0%, #12bc7b 100%)",
//     apiKey: "doctors"
//   },
//   {
//     label: "Total Patients",
//     icon: <PeopleIcon sx={{ fontSize: 38, color: "#fff" }} />,
//     color: "linear-gradient(90deg, #29e7c4 0%, #12bcaa 100%)",
//     apiKey: "patients"
//   },
//   {
//     label: "Patients in Alert",
//     icon: <WarningIcon sx={{ fontSize: 38, color: "#fff" }} />,
//     color: "linear-gradient(90deg, #f17d7d 0%, #ea5454 100%)",
//     apiKey: "alert"
//   },
//   {
//     label: "Stable Patients",
//     icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 38, color: "white" }} />,
//     color: "linear-gradient(90deg, #29b6f6 0%, #0288d1 100%)",
//     apiKey: "stable"
//   },
// ];

// export default function AdminDashboard() {
//   const [counts, setCounts] = useState({
//     doctors: null,
//     patients: null,
//     alert: null,
//     stable: null
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCounts() {
//       setLoading(true);
//       const token = getToken();
//       try {
//         // Doctors API
//         const doctorsRes = await fetch(API_DOCTORS, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const doctorsJson = await doctorsRes.json();
//         // Expect { data: [...], totalCount: n }
//         const doctorCount = typeof doctorsJson.totalCount === "number"
//           ? doctorsJson.totalCount
//           : Array.isArray(doctorsJson.data) ? doctorsJson.data.length : 0;

//         // Patients API
//         const patientsRes = await fetch(API_PATIENTS, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const patientsJson = await patientsRes.json();
//         const patientCount = typeof patientsJson.totalCount === "number"
//           ? patientsJson.totalCount
//           : Array.isArray(patientsJson.data) ? patientsJson.data.length : 0;

//         // ALERT and STABLE calculation
//         // status === 3 -> alert (change this code as per your logic, if needed)
//         const alertPatients = Array.isArray(patientsJson.data)
//           ? patientsJson.data.filter((p) => p.status === 3)
//           : [];
//         const alertCount = alertPatients.length;
//         const stableCount = Math.max(patientCount - alertCount, 0);

//         setCounts({
//           doctors: doctorCount,
//           patients: patientCount,
//           alert: alertCount,
//           stable: stableCount,
//         });
//       } catch (err) {
//         setCounts({
//           doctors: 0,
//           patients: 0,
//           alert: 0,
//           stable: 0,
//         });
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCounts();
//   }, []);

//   return (
//     <Box mx={1} mt={2}>
//       <Typography variant="h4" fontWeight={600} fontSize={"26px"} color={seeGreen} mb={3} mt={2}>
//         Admin Dashboard
//       </Typography>
//       <Grid container spacing={3}>
//         {metricBoxes.map((box,index) => (
//           <Grid  size={{xs:12,sm:6,md:3}} key={index.label}>
//             <Box

//               sx={{
//                 borderRadius: 4,
//                 p: 3,
//                 background: box.color,
//                 minHeight: 144,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "flex-start",
//                 justifyContent: "center",
//                 boxShadow: "0 4px 32px rgba(44,190,130,0.09)",
//                 position: "relative",
//                 overflow: "hidden",
//                 transition:"0.3s",
//                 ":hover":{
//                   transform:"translateY(-5px)",
//                   transition:"0.3s",
//                   boxShadow:"0 4px 32px rgba(0, 0, 0, 0.2)",
//                   cursor:"pointer"
//                 }
//               }}
//             >
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: 24,
//                   right: 24,
//                   opacity: 0.12,
//                   fontSize: 110,
//                   zIndex: 0,
//                   color:"white"
//                 }}
//               >
//                 {box.icon}
//               </Box>
//               <Box sx={{ zIndex: 1 }}>
//                 <Typography fontWeight={600} fontSize={22} color="#fff" mb={0.5}>
//                   {box.label}
//                 </Typography>
//                 <Typography
//                   fontWeight={600}
//                   color="#fff"
//                   fontSize={38}
//                   sx={{
//                     letterSpacing: 2,
//                     textShadow: "0 2px 18px rgba(0,0,0,0.18)"
//                   }}
//                 >
//                   {loading || counts[box.apiKey] === null ? (
//                     <CircularProgress size={34} sx={{ color: "#fff" }} />
//                   ) : (
//                     counts[box.apiKey]
//                   )}
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//       <AdminGraphs/>
//     </Box>
//   );
// }


// "use client";
// import React, { useEffect, useState } from "react";
// import { Box, Grid, Typography, CircularProgress } from "@mui/material";
// import { seeGreen } from "@/components/utils/Colors";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// import PeopleIcon from "@mui/icons-material/People";
// import WarningIcon from "@mui/icons-material/Warning";
// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
// import AdminGraphs from "./AdminGraphs";

// const API_DOCTORS = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Doctor`;
// const API_PATIENTS = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Patient`;
// const API_INDICATORS = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Question/GetPatientIndicators`;

// function getToken() {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("token");
//   }
//   return "";
// }


// // Metric boxes setup, now referencing custom apiKeys for indicator data
// const metricBoxes = [
//   {
//     label: "Total Doctors",
//     icon: <LocalHospitalIcon sx={{ fontSize: 38, color: "#fff" }} />,
//     color: "linear-gradient(90deg, #29e78a 0%, #12bc7b 100%)",
//     apiKey: "doctors"
//   },
//   {
//     label: "Total Patients",
//     icon: <PeopleIcon sx={{ fontSize: 38, color: "#fff" }} />,
//     color: "linear-gradient(90deg, #29e7c4 0%, #12bcaa 100%)",
//     apiKey: "patients"
//   },
//   {
//     label: "Patients in Alert",
//     icon: <WarningIcon sx={{ fontSize: 38, color: "#fff" }} />,
//     color: "linear-gradient(90deg, #f17d7d 0%, #ea5454 100%)",
//     apiKey: "alert"
//   },
//   {
//     label: "Stable Patients",
//     icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 38, color: "white" }} />,
//     color: "linear-gradient(90deg, #29b6f6 0%, #0288d1 100%)",
//     apiKey: "stable"
//   },
// ];

// export default function AdminDashboard() {
//   const [counts, setCounts] = useState({
//     doctors: null,
//     patients: null,
//     alert: null,
//     stable: null
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCounts() {
//       setLoading(true);
//       const token = getToken();

//       try {
//         // 1. Doctors
//         const doctorsRes = await fetch(API_DOCTORS, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const doctorsJson = await doctorsRes.json();
//         const doctorCount =
//           typeof doctorsJson.totalCount === "number"
//             ? doctorsJson.totalCount
//             : Array.isArray(doctorsJson.data)
//             ? doctorsJson.data.length
//             : 0;

//         // 2. Patients
//         const patientsRes = await fetch(API_PATIENTS, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const patientsJson = await patientsRes.json();
//         const patientCount =
//           typeof patientsJson.totalCount === "number"
//             ? patientsJson.totalCount
//             : Array.isArray(patientsJson.data)
//             ? patientsJson.data.length
//             : 0;

//         // 3. LIVE: Indicators API for Stable/Alert
//         const indicatorsRes = await fetch(API_INDICATORS, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const indicatorsJson = await indicatorsRes.json();

//         // Count stable/alert (you can add more if your API returns "Urgent" etc)
//         let stableCount = 0, alertCount = 0;
//         indicatorsJson.forEach((item) => {
//           if (
//             String(item.indicatorStatus).toLowerCase() === "stable"
//           )
//             stableCount++;
//           if (
//             ["urgent", "alert"].includes(
//               String(item.indicatorStatus).toLowerCase()
//             )
//           )
//             alertCount++;
//         });

//         setCounts({
//           doctors: doctorCount,
//           patients: patientCount,
//           alert: alertCount,
//           stable: stableCount
//         });
//       } catch (err) {
//         setCounts({
//           doctors: 0,
//           patients: 0,
//           alert: 0,
//           stable: 0,
//         });
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCounts();
//   }, []);

//   return (
//     <Box mx={1} mt={2}>
//       <Typography variant="h4" fontWeight={600} fontSize={"26px"} color={seeGreen} mb={3} mt={2}>
//         Admin Dashboard
//       </Typography>
//       <Grid container spacing={3}>
//         {metricBoxes.map((box, idx) => (
//           <Grid size={{ xs: 12, sm: 6, md: 3 }} key={box.label}>
//             <Box
//               sx={{
//                 borderRadius: 4,
//                 p: 3,
//                 background: box.color,
//                 minHeight: 144,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "flex-start",
//                 justifyContent: "center",
//                 boxShadow: "0 4px 32px rgba(44,190,130,0.09)",
//                 position: "relative",
//                 overflow: "hidden",
//                 transition: "0.3s",
//                 ":hover": {
//                   transform: "translateY(-5px)",
//                   transition: "0.3s",
//                   boxShadow: "0 4px 32px rgba(0, 0, 0, 0.2)",
//                   cursor: "pointer"
//                 }
//               }}
//             >
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: 24,
//                   right: 24,
//                   opacity: 0.12,
//                   fontSize: 110,
//                   zIndex: 0,
//                   color: "white"
//                 }}
//               >
//                 {box.icon}
//               </Box>
//               <Box sx={{ zIndex: 1 }}>
//                 <Typography fontWeight={600} fontSize={22} color="#fff" mb={0.5}>
//                   {box.label}
//                 </Typography>
//                 <Typography
//                   fontWeight={600}
//                   color="#fff"
//                   fontSize={38}
//                   sx={{
//                     letterSpacing: 2,
//                     textShadow: "0 2px 18px rgba(0,0,0,0.18)"
//                   }}
//                 >
//                   {loading || counts[box.apiKey] === null ? (
//                     <CircularProgress size={34} sx={{ color: "#fff" }} />
//                   ) : (
//                     counts[box.apiKey]
//                   )}
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//       <AdminGraphs />
//     </Box>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PeopleIcon from "@mui/icons-material/People";
import WarningIcon from "@mui/icons-material/Warning";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { seeGreen } from "@/components/utils/Colors";
import DoctorGraph from "./DoctorGraph";
import PatientHistoryAll from "../allData/PatientHistoryAll";
// import AdminGraphs from "./AdminGraphs";

const API_DOCTORS = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Doctor`;
const API_PATIENTS = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Patient`;
const API_INDICATORS = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Question/GetPatientIndicators`;

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return "";
}

// Metric boxes for dashboard
const metricBoxes = [
  // {
  //   label: "Total Doctors",
  //   icon: <LocalHospitalIcon sx={{ fontSize: 38, color: "#fff" }} />,
  //   color: "linear-gradient(90deg, #29e78a 0%, #12bc7b 100%)",
  //   apiKey: "doctors"
  // },
  {
    label: "Total Patients",
    icon: <PeopleIcon sx={{ fontSize: 38, color: "#fff" }} />,
    color: "linear-gradient(90deg, #29e7c4 0%, #12bcaa 100%)",
    apiKey: "patients"
  },
  {
    label: "Patients in Alert",
    icon: <WarningIcon sx={{ fontSize: 38, color: "#fff" }} />,
    color: "linear-gradient(90deg, #f17d7d 0%, #ea5454 100%)",
    apiKey: "alert"
  },
  {
    label: "Stable Patients",
    icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 38, color: "#fff" }} />,
    color: "linear-gradient(90deg, #29b6f6 0%, #0288d1 100%)",
    apiKey: "stable"
  },
];

export default function DoctorDashboard() {
  const [counts, setCounts] = useState({
    doctors: null,
    patients: null,
    alert: null,
    stable: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      setLoading(true);
      const token = getToken();
      try {
        // Doctors
        const doctorsRes = await fetch(API_DOCTORS, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!doctorsRes.ok) throw new Error("Doctors API error");
        const doctorsJson = await doctorsRes.json();
        const doctorCount =
          typeof doctorsJson.totalCount === "number"
            ? doctorsJson.totalCount
            : Array.isArray(doctorsJson.data)
            ? doctorsJson.data.length
            : 0;

        // Patients
        const patientsRes = await fetch(API_PATIENTS, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!patientsRes.ok) throw new Error("Patients API error");
        const patientsJson = await patientsRes.json();
        const patientCount =
          typeof patientsJson.totalCount === "number"
            ? patientsJson.totalCount
            : Array.isArray(patientsJson.data)
            ? patientsJson.data.length
            : 0;

        // LIVE: Indicators for Stable/Alert/Urgent patients
        const indicatorsRes = await fetch(API_INDICATORS, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!indicatorsRes.ok) throw new Error("Indicators API error");
        const indicatorsJson = await indicatorsRes.json();

        let stableCount = 0, alertCount = 0;
        indicatorsJson.forEach((item) => {
          const status = String(item.indicatorStatus).toLowerCase();
          if (status === "stable") stableCount++;
          if (["urgent", "alert"].includes(status)) alertCount++;
        });

        setCounts({
          doctors: doctorCount,
          patients: patientCount,
          alert: alertCount,
          stable: stableCount
        });
      } catch (err) {
        setCounts({
          doctors: 0,
          patients: 0,
          alert: 0,
          stable: 0,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  return (
    <Box mx={1} mt={3}>
      {/* <Typography variant="h4" fontWeight={600} fontSize="26px" color={seeGreen} mb={3} mt={2}>
        Admin Dashboard
      </Typography> */}
      <Grid container spacing={3}>
        {metricBoxes.map((box, idx) => (
          <Grid key={box.label}  size={{xs:12,sm:6,md:4}}>
            <Box
              sx={{
                borderRadius: 4,
                p: 3,
                background: box.color,
                minHeight: 144,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                boxShadow: "0 4px 32px rgba(44,190,130,0.09)",
                position: "relative",
                overflow: "hidden",
                transition: "0.3s",
                ":hover": {
                  transform: "translateY(-5px)",
                  transition: "0.3s",
                  boxShadow: "0 4px 32px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer"
                }
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  opacity: 0.12,
                  fontSize: 110,
                  zIndex: 0,
                  color: "white"
                }}
              >
                {box.icon}
              </Box>
              <Box sx={{ zIndex: 1 }}>
                <Typography fontWeight={600} fontSize={22} color="#fff" mb={0.5}>
                  {box.label}
                </Typography>
                <Typography
                  fontWeight={600}
                  color="#fff"
                  fontSize={38}
                  sx={{
                    letterSpacing: 2,
                    textShadow: "0 2px 18px rgba(0,0,0,0.18)"
                  }}
                >
                  {loading || counts[box.apiKey] === null ? (
                    <CircularProgress size={34} sx={{ color: "#fff" }} />
                  ) : (
                    counts[box.apiKey]
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* <AdminGraphs /> */}
      <PatientHistoryAll/>
      <DoctorGraph/>
    </Box>
  );
}
 