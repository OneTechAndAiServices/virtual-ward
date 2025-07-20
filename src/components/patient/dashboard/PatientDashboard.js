// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { Box, Typography, Paper } from "@mui/material";
// // import Chart from "react-apexcharts";
// // import PatientLineChart from "./PatientLineChart";

// // // Dummy static data (can later be fetched from API)
// // const staticVitals = {
// //   dates: ["2024-07-01", "2024-07-05", "2024-07-10", "2024-07-15", "2024-07-20"],
// //   pulse: [78, 82, 76, 80, 85],
// //   saO2: [97, 96, 98, 97, 95],
// //   temperature: [36.6, 36.8, 37.0, 36.7, 37.2],
// // };

// // function PatientDashboard() {
// //   const [chartData, setChartData] = useState(null);

// //   useEffect(() => {
// //     // Normally you'd fetch this from API
// //     const data = {
// //       options: {
// //         chart: {
// //           id: "patient-vitals",
// //           toolbar: { show: false },
// //           animations: {
// //             easing: "easeinout",
// //             speed: 800,
// //           },
// //         },
// //         xaxis: {
// //           categories: staticVitals.dates,
// //           title: { text: "Date" },
// //         },
// //         yaxis: {
// //           title: { text: "Vitals" },
// //         },
// //         stroke: { curve: "smooth", width: 2 },
// //         markers: { size: 5 },
// //         tooltip: {
// //           shared: true,
// //           intersect: false,
// //         },
// //         colors: ["#2ecc71", "#3498db", "#e67e22"],
// //         legend: {
// //           position: "top",
// //           horizontalAlign: "right",
// //         },
// //         responsive: [
// //           {
// //             breakpoint: 768,
// //             options: {
// //               chart: { height: 300 },
// //               legend: { position: "bottom" },
// //             },
// //           },
// //         ],
// //       },
// //       series: [
// //         {
// //           name: "Pulse (bpm)",
// //           data: staticVitals.pulse,
// //         },
// //         {
// //           name: "SaO2 (%)",
// //           data: staticVitals.saO2,
// //         },
// //         {
// //           name: "Temperature (°C)",
// //           data: staticVitals.temperature,
// //         },
// //       ],
// //     };
// //     setChartData(data);
// //   }, []);

// //   return (
// //   <>
  
// //     {/* <Box >
// //       <Typography variant="h4" fontWeight={700} mb={3} color="primary">
// //         Patient Vitals Overview
// //       </Typography>

// //       <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
// //         {chartData ? (
// //           <Chart
// //             options={chartData.options}
// //             series={chartData.series}
// //             type="line"
// //             height={400}
// //           />
// //         ) : (
// //           <Typography>Loading chart...</Typography>
// //         )}
// //       </Paper>
// //     </Box> */}
// //     <PatientLineChart/>
// //     </>
// //   );
// // }

// // export default PatientDashboard;



// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { Box, Typography, Paper } from "@mui/material";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// //   CartesianGrid,
// // } from "recharts";

// // // Dummy static data
// // const staticVitals = {
// //   dates: ["2024-07-01", "2024-07-05", "2024-07-10", "2024-07-15", "2024-07-20"],
// //   pulse: [78, 82, 76, 80, 85],
// //   saO2: [97, 96, 98, 97, 95],
// //   temperature: [36.6, 36.8, 37.0, 36.7, 37.2],
// // };

// // function PatientDashboard() {
// //   const [chartData, setChartData] = useState([]);

// //   useEffect(() => {
// //     const transformedData = staticVitals.dates.map((date, index) => ({
// //       date,
// //       Pulse: staticVitals.pulse[index],
// //       SaO2: staticVitals.saO2[index],
// //       Temperature: staticVitals.temperature[index],
// //     }));

// //     setChartData(transformedData);
// //   }, []);

// //   return (
// //     <Box>
// //       <Typography variant="h4" fontWeight={700} mb={3} color="primary">
// //         Patient Vitals Overview
// //       </Typography>

// //       <Paper elevation={3} sx={{ borderRadius: 3, p: 2, minHeight: 420 }}>
// //         {chartData.length > 0 ? (
// //           <ResponsiveContainer width="100%" height={400}>
// //             <LineChart data={chartData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="date" />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Line
// //                 type="monotone"
// //                 dataKey="Pulse"
// //                 stroke="#2ecc71"
// //                 strokeWidth={2}
// //                 dot={{ r: 5 }}
// //               />
// //               <Line
// //                 type="monotone"
// //                 dataKey="SaO2"
// //                 stroke="#3498db"
// //                 strokeWidth={2}
// //                 dot={{ r: 5 }}
// //               />
// //               <Line
// //                 type="monotone"
// //                 dataKey="Temperature"
// //                 stroke="#e67e22"
// //                 strokeWidth={2}
// //                 dot={{ r: 5 }}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         ) : (
// //           <Typography>Loading vitals chart...</Typography>
// //         )}
// //       </Paper>
// //     </Box>
// //   );
// // }

// // export default PatientDashboard;
// "use client";
// import React, { useState, useEffect } from "react";
// import { Box, Typography, Paper, CircularProgress } from "@mui/material";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import dayjs from "dayjs";
// import { seeGreen } from "@/components/utils/Colors";

// // ENV config
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;
// const API_URL = `${API_BASE_URL}/api/${API_VERSION}/Vitals`;

// function getPatientId() {
//   if (typeof window !== "undefined") return localStorage.getItem("patientId");
//   return "";
// }

// function getToken() {
//   if (typeof window !== "undefined") return localStorage.getItem("token");
//   return "";
// }

// export default function PatientDashboard() {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchVitals() {
//       setLoading(true);
//       const patientId = getPatientId();
//       const token = getToken();

//       if (!patientId || !token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch(`${API_URL}?PatientId=${patientId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const vitals = await res.json();
//         // Transform for recharts
//         const transformed = (Array.isArray(vitals) ? vitals : []).map((v) => ({
//           date: dayjs(v.recordedAt).format("DD MMM, HH:mm"),
//           Pulse: v.pulse,
//           SaO2: v.saO2,
//           Temperature: v.temperature,
//           Systolic: v.bloodPressureSystolic,
//           Diastolic: v.bloodPressureDiastolic,
//           RespRate: v.respiratoryRate,
//         }));
//         setChartData(transformed);
//       } catch (err) {
//         setChartData([]);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchVitals();
//   }, []);

//   return (
//     <Box>
//       <Typography variant="h4" fontWeight={600} my={2} color={seeGreen} fontSize={"26px"}>
//         Patient Vitals Overview
//       </Typography>
//       {/* <Typography variant="subtitle2" mb={3} color="text.secondary">
//         Powered by API <b>{API_VERSION}</b> &mdash; <span style={{ color: "#2064df" }}>{API_BASE_URL}</span>
//       </Typography> */}
//       <Paper elevation={3} sx={{ borderRadius: 3, p: 2, minHeight: 420 }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" height={400}>
//             <CircularProgress />
//           </Box>
//         ) : chartData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={400}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="Pulse"
//                 stroke="#2ecc71"
//                 strokeWidth={2}
//                 dot={{ r: 5 }}
//                 name="Pulse"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="SaO2"
//                 stroke="#3498db"
//                 strokeWidth={2}
//                 dot={{ r: 5 }}
//                 name="SaO₂"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="Temperature"
//                 stroke="#e67e22"
//                 strokeWidth={2}
//                 dot={{ r: 5 }}
//                 name="Temperature"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="Systolic"
//                 stroke="#c0392b"
//                 strokeWidth={2}
//                 dot={{ r: 5 }}
//                 name="BP Systolic"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="Diastolic"
//                 stroke="#9b59b6"
//                 strokeWidth={2}
//                 dot={{ r: 5 }}
//                 name="BP Diastolic"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="RespRate"
//                 stroke="#1abc9c"
//                 strokeWidth={2}
//                 dot={{ r: 5 }}
//                 name="Resp. Rate"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         ) : (
//           <Typography textAlign="center" color="text.secondary" pt={10}>
//             No vitals chart data found.
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { seeGreen } from "@/components/utils/Colors";

const API_URL = "http://api.virtual.gpline.ie/api/v0.1/Vitals";

function getPatientId() {
  if (typeof window !== "undefined") return localStorage.getItem("patientId");
  return "";
}
function getToken() {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return "";
}

export default function PatientDashboard() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVitals() {
      const token = getToken();
      const patientId = getPatientId();
      if (!token || !patientId) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}?PatientId=${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const transformed = Array.isArray(data)
          ? data.map((item) => ({
              date: item.recordedAt
                ? new Date(item.recordedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })
                : "",
              Systolic: item.bloodPressureSystolic,
              Diastolic: item.bloodPressureDiastolic,
              Pulse: item.pulse,
              "Resp. Rate": item.respiratoryRate,
              SaO2: item.saO2,
              Temperature: item.temperature,
            }))
          : [];
        setChartData(transformed);
      } catch (e) {
        setChartData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchVitals();
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mx={1} my={3} color={seeGreen} fontSize={"26px"}>
        Patient Vitals Overview
      </Typography>
      <Paper elevation={3} sx={{ borderRadius: 3, p: 2, minHeight: 420 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={350}>
            <CircularProgress color="success" />
          </Box>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Systolic" fill="#1976d2" name="BP Systolic" />
              <Bar dataKey="Diastolic" fill="#d32f2f" name="BP Diastolic" />
              <Bar dataKey="Pulse" fill="#388e3c" name="Pulse" />
              <Bar dataKey="Resp. Rate" fill="#9c27b0" name="Resp. Rate" />
              <Bar dataKey="SaO2" fill="#00bcd4" name="SaO₂" />
              <Bar dataKey="Temperature" fill="#ff9800" name="Temperature (°C)" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Typography>Loading vitals chart...</Typography>
        )}
      </Paper>
    </Box>
  );
}
