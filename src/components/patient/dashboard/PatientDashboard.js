// "use client";
// import React, { useState, useEffect } from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import Chart from "react-apexcharts";
// import PatientLineChart from "./PatientLineChart";

// // Dummy static data (can later be fetched from API)
// const staticVitals = {
//   dates: ["2024-07-01", "2024-07-05", "2024-07-10", "2024-07-15", "2024-07-20"],
//   pulse: [78, 82, 76, 80, 85],
//   saO2: [97, 96, 98, 97, 95],
//   temperature: [36.6, 36.8, 37.0, 36.7, 37.2],
// };

// function PatientDashboard() {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     // Normally you'd fetch this from API
//     const data = {
//       options: {
//         chart: {
//           id: "patient-vitals",
//           toolbar: { show: false },
//           animations: {
//             easing: "easeinout",
//             speed: 800,
//           },
//         },
//         xaxis: {
//           categories: staticVitals.dates,
//           title: { text: "Date" },
//         },
//         yaxis: {
//           title: { text: "Vitals" },
//         },
//         stroke: { curve: "smooth", width: 2 },
//         markers: { size: 5 },
//         tooltip: {
//           shared: true,
//           intersect: false,
//         },
//         colors: ["#2ecc71", "#3498db", "#e67e22"],
//         legend: {
//           position: "top",
//           horizontalAlign: "right",
//         },
//         responsive: [
//           {
//             breakpoint: 768,
//             options: {
//               chart: { height: 300 },
//               legend: { position: "bottom" },
//             },
//           },
//         ],
//       },
//       series: [
//         {
//           name: "Pulse (bpm)",
//           data: staticVitals.pulse,
//         },
//         {
//           name: "SaO2 (%)",
//           data: staticVitals.saO2,
//         },
//         {
//           name: "Temperature (°C)",
//           data: staticVitals.temperature,
//         },
//       ],
//     };
//     setChartData(data);
//   }, []);

//   return (
//   <>
  
//     {/* <Box >
//       <Typography variant="h4" fontWeight={700} mb={3} color="primary">
//         Patient Vitals Overview
//       </Typography>

//       <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
//         {chartData ? (
//           <Chart
//             options={chartData.options}
//             series={chartData.series}
//             type="line"
//             height={400}
//           />
//         ) : (
//           <Typography>Loading chart...</Typography>
//         )}
//       </Paper>
//     </Box> */}
//     <PatientLineChart/>
//     </>
//   );
// }

// export default PatientDashboard;
"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Dummy static data
const staticVitals = {
  dates: ["2024-07-01", "2024-07-05", "2024-07-10", "2024-07-15", "2024-07-20"],
  pulse: [78, 82, 76, 80, 85],
  saO2: [97, 96, 98, 97, 95],
  temperature: [36.6, 36.8, 37.0, 36.7, 37.2],
};

function PatientDashboard() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const transformedData = staticVitals.dates.map((date, index) => ({
      date,
      Pulse: staticVitals.pulse[index],
      SaO2: staticVitals.saO2[index],
      Temperature: staticVitals.temperature[index],
    }));

    setChartData(transformedData);
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3} color="primary">
        Patient Vitals Overview
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 3, p: 2, minHeight: 420 }}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Pulse"
                stroke="#2ecc71"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="SaO2"
                stroke="#3498db"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="Temperature"
                stroke="#e67e22"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Typography>Loading vitals chart...</Typography>
        )}
      </Paper>
    </Box>
  );
}

export default PatientDashboard;
