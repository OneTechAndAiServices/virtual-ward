"use client";
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

// Static dummy data
const vitalsData = [
  { date: "Jul 1", pulse: 78, temp: 36.5, saO2: 97 },
  { date: "Jul 5", pulse: 82, temp: 36.8, saO2: 96 },
  { date: "Jul 10", pulse: 76, temp: 37.0, saO2: 98 },
  { date: "Jul 15", pulse: 80, temp: 36.7, saO2: 97 },
  { date: "Jul 20", pulse: 85, temp: 37.1, saO2: 95 },
  { date: "Jul 25", pulse: 88, temp: 36.9, saO2: 96 },
];

const latest = vitalsData[vitalsData.length - 1];

const radialData = [
  { name: "Pulse", value: latest.pulse, fill: "#2ecc71" },
  { name: "Temperature", value: latest.temp, fill: "#3498db" },
  { name: "SaO2", value: latest.saO2, fill: "#e67e22" },
];

export default function PatientLineChart() {
  return (
    <Box mt={3} mx={1}>
      {/* <Typography variant="h5" fontWeight={700} mb={3} color="primary">
        Patient Vitals Dashboard
      </Typography> */}

      <Grid container spacing={3}>
        <Grid size={{xs:12,}}>
          <Box  boxShadow={ "0 2px 16px 0 rgba(0,0,0,0.1)"} sx={{ p: 2, borderRadius: 3 , py:4 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Vitals Line Chart
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={vitalsData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pulse"
                  stroke="#2ecc71"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#3498db"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="saO2"
                  stroke="#e67e22"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        <Grid size={{xs:12,}}>
          <Box boxShadow={ "0 2px 16px 0 rgba(0,0,0,0.1)"} sx={{ p: 2, borderRadius: 3 ,py:4}}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Vitals Bar Chart
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vitalsData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pulse" fill="#2ecc71" />
                <Bar dataKey="temp" fill="#3498db" />
                <Bar dataKey="saO2" fill="#e67e22" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        <Grid size={{xs:12,}}>
          <Box boxShadow={ "0 2px 16px 0 rgba(0,0,0,0.1)"} sx={{ p: 2, borderRadius: 3,py:4 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Latest Snapshot (Radial)
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <RadialBarChart
                innerRadius="30%"
                outerRadius="90%"
                data={radialData}
                startAngle={180}
                endAngle={0}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={10}
                  label={{ position: "insideStart", fill: "#fff", fontSize: 12 }}
                />
                <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" />
              </RadialBarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
