"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import {
  LineChart,
  BarChart,
  PieChart,
  Pie,
  Cell,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import dayjs from "dayjs";
import axios from "axios";
import { seeGreen } from "@/components/utils/Colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const API_URL = "http://api.virtual.gpline.ie/api/v0.1/Vitals";

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return "";
}

function getPatientId() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("patientId");
  }
  return "";
}

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#d32f2f"];

function PatientVitalCharts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVitals = async () => {
      const token = getToken();
      const patientId = getPatientId();

      if (!token || !patientId) {
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

        if (Array.isArray(response.data)) {
          const transformed = response.data.map((item) => ({
            ...item,
            recordedAt: dayjs(item.recordedAt).format("DD MMM HH:mm"),
          }));
          setData(transformed);
        }
      } catch (err) {
        console.error("Failed to fetch vitals", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVitals();
  }, []);

  const renderLineChart = (dataKey, color, label) => (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
      <Typography variant="h6" mb={2} fontWeight={600}>
        {label} - Line Chart
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="recordedAt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );

  const renderBarChart = (dataKey, color, label) => (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
      <Typography variant="h6" mb={2} fontWeight={600}>
        {label} - Bar Chart
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="recordedAt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );

  const renderPieChart = () => {
    const last = data[data.length - 1];
    if (!last) return null;

    const vitalsPie = [
      { name: "Pulse", value: last.pulse },
      { name: "Temperature", value: last.temperature },
      { name: "SaO2", value: last.saO2 },
      { name: "Respiratory Rate", value: last.respiratoryRate },
    ];

    return (
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        <Typography variant="h6" mb={2} fontWeight={600}>
          Latest Vitals Distribution - Pie Chart
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={vitalsPie}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {vitalsPie.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    );
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box p={2}>
           <Box display={"flex"} alignItems={"center"} mb={2}>
              <IconButton
                  sx={{ mr: 1}}
                  href="/patient-vitals"
                >
                  <ArrowBackIcon  sx={{ bgcolor:seeGreen,color:"white",borderRadius:100,p:0.5,fontSize:30 }} />
                </IconButton>
      <Typography variant="h4" fontWeight={600} color={seeGreen} fontSize={"26px"} >
        Patient Vitals Charts
      </Typography>

           </Box>

      <Grid container spacing={3}>
        <Grid size={{xs:12,md:6}}>
          {renderLineChart("pulse", seeGreen, "Pulse (bpm)")}
        </Grid>
        <Grid size={{xs:12,md:6}}>
          {renderBarChart("temperature", "#ff9800", "Temperature (°C)")}
        </Grid>
        <Grid size={{xs:12,md:6}}>
          {renderLineChart("saO2", "#2196f3", "Oxygen (SaO2 %)")}
        </Grid>
        <Grid size={{xs:12,md:6}}>
          {renderBarChart("respiratoryRate", "#9c27b0", "Respiratory Rate")}
        </Grid>
        <Grid size={{xs:12}}>
          {renderPieChart()}
        </Grid>
      </Grid>
    </Box>
  );
}

export default PatientVitalCharts;
