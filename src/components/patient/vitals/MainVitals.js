// "use client";
// import React, { useState } from "react";
// import { Box, Grid, Paper, Typography } from "@mui/material";
// import { useRouter } from "next/navigation";
// import ClipLoader from "react-spinners/ClipLoader";
// import { seeGreen } from "@/components/utils/Colors";

// const actions = [
//   { title: "Submit Vitals", description: "Add new vital signs for a patient", path: "/patient-submit-new-vital" },
//   { title: "View Vitals History", description: "See all recorded vitals over time", path: "/vitals-history" },
//   { title: "Vitals Charts", description: "Visualize patient vitals in charts", path: "/vitals-charts" },
//   { title: "Vitals Alerts", description: "Check abnormal readings and alerts", path: "/vitals-alerts" },
// ];

// function MainVitals() {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleClick = (path) => {
//     setLoading(true);
//     router.push(path);
//     setTimeout(() => setLoading(false), 1000); 
//   };

//   return (
//     <Box p={3} position="relative">

//       {loading && (
//         <Box
//           position="fixed"
//           top={0}
//           left={0}
//           width="100vw"
//           height="100vh"
//           bgcolor="rgba(0,0,0,0.1)"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           zIndex={9999}
//         >
//           <ClipLoader size={80} color={seeGreen} />
//         </Box>
//       )}

//       <Typography variant="h4" fontWeight={700} mb={3} color="primary">
//         Vitals Management
//       </Typography>

//       <Grid container spacing={3} justifyContent={"center"}>
//         {actions.map((action, index) => (
//           <Grid  size={{xs:12,md:5}}  key={index}>
//             <Paper
//               elevation={3}
//               onClick={() => handleClick(action.path)}
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 bgcolor: seeGreen,
//                 color: "#fff",
//                 cursor: "pointer",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   bgcolor: "#a2f0c3",
//                   transform: "translateY(-5px)",
//                 },
//               }}
//             >
//               <Typography variant="h6" fontWeight={600}>
//                 {action.title}
//               </Typography>
//               <Typography mt={1} fontSize="14px">
//                 {action.description}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

// export default MainVitals;
"use client";
import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { lightGreen, seeGreen } from "@/components/utils/Colors";

// Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const actions = [
  {
    title: "Submit Vitals",
    description: "Add new vital signs for a patient",
    path: "/patient-submit-new-vital",
    icon: <FavoriteIcon fontSize="large" sx={{ color: "#fff" }} />,
  },
  {
    title: "View Vitals History",
    description: "See all recorded vitals over time",
    path: "/patient-vitals-history",
    icon: <HistoryEduIcon fontSize="large" sx={{ color: "#fff" }} />,
  },
  {
    title: "Vitals Charts",
    description: "Visualize patient vitals in charts",
    path: "/patient-vitals-charts",
    icon: <ShowChartIcon fontSize="large" sx={{ color: "#fff" }} />,
  },
  // {
  //   title: "Vitals Alerts",
  //   description: "Check abnormal readings and alerts",
  //   path: "/vitals-alerts",
  //   icon: <WarningAmberIcon fontSize="large" sx={{ color: "#fff" }} />,
  // },
];

function MainVitals() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = (path) => {
    setLoading(true);
    router.push(path);
    setTimeout(() => setLoading(false), 1000); // Fallback
  };

  return (
    <Box mx={1} mt={2} position="relative" minHeight={"60vh"}>
      {/* Full-page loader */}
      {loading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bgcolor="rgba(0,0,0,0.1)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={9999}
        >
          <ClipLoader size={80} color={seeGreen} />
        </Box>
      )}

      <Typography variant="h4" fontWeight={600} mb={3}  fontSize={"26px"} color={seeGreen}>
        Vitals Management
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{mt:6}}>
        {actions.map((action, index) => (
          <Grid size={{xs:12,md:5}} key={index}>
            <Box
              onClick={() => handleClick(action.path)}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: seeGreen,
                color: "#fff",
                cursor: "pointer",
                boxShadow: "0 2px 16px 0 rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                //   bgcolor: lightGreen,
                //   color:"black",
                  transform: "translateY(-5px)",
                      boxShadow: "0 2px 16px 0 rgba(0,0,0,0.5)",
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Box>{action.icon}</Box>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {action.title}
                  </Typography>
                  <Typography mt={0.5} fontSize="14px">
                    {action.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MainVitals;
