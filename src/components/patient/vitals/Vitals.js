
// "use client";
// import React, { useState } from "react";
// import {
//   Box, Typography, Paper, Grid, TextField, Button, CircularProgress
// } from "@mui/material";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import dayjs from "dayjs";

// // --- CONFIG ---
// const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Vitals`;

// function getToken() {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("token");
//   }
//   return "";
// }
// function getPatientId() {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("patientId");
//   }
//   return "";
// }

// const initialVitals = {
//   bloodPressureSystolic: "",
//   bloodPressureDiastolic: "",
//   temperature: "",
//   saO2: "",
//   pulse: "",
//   respiratoryRate: "",
//   recordedAt: dayjs().format("YYYY-MM-DDTHH:mm"), // For datetime-local
// };

// export default function Vitals() {
//   const [vitals, setVitals] = useState(initialVitals);
//   const [saving, setSaving] = useState(false);

//   // Handle field change
//   const handleChange = (e) => {
//     setVitals({ ...vitals, [e.target.name]: e.target.value });
//   };

//   // Submit Vitals (POST)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     const token = getToken();
//     const patientId = getPatientId();
//     if (!patientId) {
//       toast.error("Patient ID missing!");
//       setSaving(false);
//       return;
//     }
//     const payload = {
//       ...vitals,
//       patientId: Number(patientId),
//       recordedAt: vitals.recordedAt ? new Date(vitals.recordedAt).toISOString() : new Date().toISOString(),
//       id: 0,
//     };
//     try {
//       await axios.post(API_URL, payload, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       toast.success("Vitals submitted!");
//       setVitals(initialVitals);
//     } catch (err) {
//       toast.error("Failed to submit vitals.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 550, mx: "auto", p: { xs: 1, md: 4 } }}>
//       <Toaster position="top-right" />
//       <Typography variant="h4" fontWeight={700} mb={2} color="primary" textAlign="center">
//         Submit Your Vitals
//       </Typography>
//       <Paper sx={{ borderRadius: 3, p: { xs: 2, md: 4 }, boxShadow: 1 }}>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid  size={{xs:12,md:6}}>
//               <TextField
//                 name="bloodPressureSystolic"
//                 label="Blood Pressure Systolic"
//                 type="number"
//                 value={vitals.bloodPressureSystolic}
//                 onChange={handleChange}
//                 fullWidth required
//               />
//             </Grid>
//             <Grid  size={{xs:12,md:6}}>
//               <TextField
//                 name="bloodPressureDiastolic"
//                 label="Blood Pressure Diastolic"
//                 type="number"
//                 value={vitals.bloodPressureDiastolic}
//                 onChange={handleChange}
//                 fullWidth required
//               />
//             </Grid>
//             <Grid  size={{xs:12,md:6}}>
//               <TextField
//                 name="temperature"
//                 label="Temperature (°C)"
//                 type="number"
//                 value={vitals.temperature}
//                 onChange={handleChange}
//                 fullWidth required
//               />
//             </Grid>
//             <Grid  size={{xs:12,md:6}}>
//               <TextField
//                 name="saO2"
//                 label="SaO2 (%)"
//                 type="number"
//                 value={vitals.saO2}
//                 onChange={handleChange}
//                 fullWidth required
//               />
//             </Grid>
//             <Grid  size={{xs:12,md:6}}>
//               <TextField
//                 name="pulse"
//                 label="Pulse (bpm)"
//                 type="number"
//                 value={vitals.pulse}
//                 onChange={handleChange}
//                 fullWidth required
//               />
//             </Grid>
//             <Grid  size={{xs:12,md:6}}>
//               <TextField
//                 name="respiratoryRate"
//                 label="Respiratory Rate"
//                 type="number"
//                 value={vitals.respiratoryRate}
//                 onChange={handleChange}
//                 fullWidth required
//               />
//             </Grid>
//             <Grid  size={{xs:12}}>
//               <TextField
//                 name="recordedAt"
//                 label="Recorded At"
//                 type="datetime-local"
//                 value={vitals.recordedAt}
//                 onChange={handleChange}
//                 fullWidth required
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>
//             <Grid  size={{xs:12}} display="flex" justifyContent="center">
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 sx={{ borderRadius: 2, px: 4, fontWeight: 600, minWidth: 120 }}
//                 disabled={saving}
//               >
//                 {saving ? <CircularProgress size={22} color="inherit" /> : "Submit"}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Box>
//   );
// }



"use client";
import React, { useState } from "react";
import {
  Box, Typography, Paper, Grid, TextField, Button,
  CircularProgress, InputAdornment,
  IconButton
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import dayjs from "dayjs";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AirIcon from "@mui/icons-material/Air";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { seeGreen } from "@/components/utils/Colors";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Vitals`;

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

const initialVitals = {
  bloodPressureSystolic: "",
  bloodPressureDiastolic: "",
  temperature: "",
  saO2: "",
  pulse: "",
  respiratoryRate: "",
  recordedAt: dayjs().format("YYYY-MM-DDTHH:mm"),
};

export default function Vitals() {
  const [vitals, setVitals] = useState(initialVitals);
  const [saving, setSaving] = useState(false);
 const router = useRouter(); 
  const handleChange = (e) => {
    setVitals({ ...vitals, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = getToken();
    const patientId = getPatientId();

    if (!patientId) {
      toast.error("Patient ID missing!");
      setSaving(false);
      return;
    }

    const payload = {
      ...vitals,
      patientId: Number(patientId),
      recordedAt: vitals.recordedAt
        ? new Date(vitals.recordedAt).toISOString()
        : new Date().toISOString(),
      id: 0,
    };

    try {
      await axios.post(API_URL, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Vitals submitted!");
      
      setVitals(initialVitals);
        setTimeout(() => {
        router.push("/patient-vitals-history");
      }, 1000);
    } 
    // catch (err) {
    //   toast.error("Failed to submit vitals.");
    // }
    catch (err) {
  if (err.response && err.response.data && err.response.data.errors) {
    const errorObj = err.response.data.errors;
    const errorMessages = Object.values(errorObj).flat().join("\n");
    toast.error(errorMessages);
  } else {
    toast.error("Failed to submit vitals.");
  }
}
     finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Toaster position="top-right" />
       <Box display={"flex"} alignItems={"center"} mb={2}>
          <IconButton
                  sx={{ mr: 1}}
                  href="/patient-vitals"
                >
                  <ArrowBackIcon  sx={{ bgcolor:seeGreen,color:"white",borderRadius:100,p:0.5,fontSize:30 }} />
                </IconButton>
    <Typography
        variant="h4"
        fontWeight={600}
     
        fontSize={"26px"}
        color={seeGreen}
        // textAlign="center"
      >
        Submit Your Vitals
      </Typography>
       </Box>
    
      <Box
        sx={{
          borderRadius: 3,
          p: { xs: 2, md: 4 },
          boxShadow:  "0 2px 16px 0 rgba(0,0,0,0.1)",
          // backgroundColor: "#f9f9f9",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{xs:12,md:6}}>
              <TextField
                name="bloodPressureSystolic"
                label="Systolic (mmHg)"
                type="number"
                value={vitals.bloodPressureSystolic}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FavoriteIcon color="error" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <TextField
                name="bloodPressureDiastolic"
                label="Diastolic (mmHg)"
                type="number"
                value={vitals.bloodPressureDiastolic}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FavoriteIcon color="error" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <TextField
                name="temperature"
                label="Temperature (°C)"
                type="number"
                value={vitals.temperature}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ThermostatIcon color="warning" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <TextField
                name="saO2"
                label="Oxygen (SaO2 %)"
                type="number"
                value={vitals.saO2}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <OpacityIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <TextField
                name="pulse"
                label="Pulse (bpm)"
                type="number"
                value={vitals.pulse}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MonitorHeartIcon sx={{ color: seeGreen }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{xs:12,md:6}}>
              <TextField
                name="respiratoryRate"
                label="Respiratory Rate"
                type="number"
                value={vitals.respiratoryRate}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AirIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* <Grid size={{xs:12}}> */}
              {/* <TextField
                name="recordedAt"
                label="Recorded At"
                type="datetime-local"
                value={vitals.recordedAt}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthIcon color="disabled" />
                    </InputAdornment>
                  ),
                }}
              /> */}
  <Grid size={{xs:12}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateTimePicker
      label="Recorded At"
      value={dayjs(vitals.recordedAt)}
      onChange={(newValue) =>
        setVitals({ ...vitals, recordedAt: newValue.toISOString() })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          required
          
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon color="disabled" />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
</LocalizationProvider>
  </Grid>

            {/* </Grid> */}

            <Grid size={{xs:12}} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: seeGreen,
                  "&:hover": { bgcolor: "#27ae60" },
                  borderRadius: 2,
                  px: 4,
                  fontWeight: 600,
                  minWidth: 130,
                }}
                disabled={saving}
              >
                {saving ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
