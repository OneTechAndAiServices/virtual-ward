
"use client";
import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Grid, CircularProgress } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area } from "recharts";
import { seeGreen } from "@/components/utils/Colors";

const API_INDICATORS = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Question/GetPatientIndicators`;

function getToken() {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return "";
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }); // e.g. 19 Jul
}

export default function DoctorGraph() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIndicators() {
      setLoading(true);
      try {
        const token = getToken();
        if (!token) throw new Error("No token found. Please login again.");

        const res = await fetch(API_INDICATORS, {
          headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch indicator data. Unauthorized or server error.");
        const indicators = await res.json();

        // Group by date and count stable/alert
        const dateMap = {};
        indicators.forEach((item) => {
          const date = formatDate(item.responseDate);
          if (!date) return;
          if (!dateMap[date]) dateMap[date] = { date, stable: 0, alert: 0 };
          if (String(item.indicatorStatus).toLowerCase() === "stable") dateMap[date].stable += 1;
          if (["urgent", "alert"].includes(String(item.indicatorStatus).toLowerCase())) dateMap[date].alert += 1;
        });

        // Sort by date ascending
        const finalData = Object.values(dateMap).sort(
          (a, b) => {
            const da = new Date(a.date.split(" ").reverse().join(" "));
            const db = new Date(b.date.split(" ").reverse().join(" "));
            return da - db;
          }
        );

        setData(finalData);
      } catch (err) {
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchIndicators();
  }, []);

  return (
    <Box sx={{ minHeight: 350,mt:3 }}>
      {/* <Typography variant="h4" fontWeight={700} color={seeGreen} mb={3}>
        Patients Trend Overview
      </Typography> */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={280}>
          <CircularProgress color="success" />
        </Box>
      ) : data.length === 0 ? (
        <Paper sx={{ p: 4, borderRadius: 4, textAlign: "center", color: "#888" }}>
          <Typography>No indicator data available.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid size={{xs:12}}>
            <Paper sx={{ px: 1,py:3, borderRadius: 4, minHeight: 330, boxShadow: 3 }}>
              <Typography fontWeight={600} mb={1.5} color={seeGreen}>
                Stable vs Urgent Patients Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data}>
                  <defs>
                    <linearGradient id="stableGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#29e78a" stopOpacity={0.7}/>
                      <stop offset="100%" stopColor="#12bc7b" stopOpacity={0.13}/>
                    </linearGradient>
                    <linearGradient id="alertRed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f17d7d" stopOpacity={0.7}/>
                      <stop offset="100%" stopColor="#ea5454" stopOpacity={0.08}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis allowDecimals={false} fontSize={13} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="stable"
                    name="Stable"
                    stroke="#12bc7b"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="stable"
                    fill="url(#stableGreen)"
                    stroke="none"
                  />
                  <Line
                    type="monotone"
                    dataKey="alert"
                    name="Urgent"
                    stroke="#ea5454"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="alert"
                    fill="url(#alertRed)"
                    stroke="none"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
 