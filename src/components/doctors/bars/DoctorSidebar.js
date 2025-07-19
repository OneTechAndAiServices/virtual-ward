// import { seeGreen } from '@/components/utils/Colors'
// import { Box } from '@mui/material'
// import Link from 'next/link'
// import React from 'react'

// function DoctorSidebar() {
//   return (
//     <Box >
//           <Box display={"flex"} flexDirection={"column"}>
//             <Link href={"/doctor-dashboard"}>Dahboard</Link>
//               <Link href={"/doctor-patient-questions-history"}>Patient History</Link>
//               <Box my={2}>
//                         <Link href={"/doctor-patient-management"}>Patient Management</Link>
//               </Box>
//               <Box my={2}>
//                         <Link href={"/doctor-assign-question-patient"}>Patient Query assign set</Link>
//               </Box>
//                 <Box my={2}>
//                         <Link href={"/doctor-patient-notes"}>doctor-patient-notes</Link>
//               </Box>
    
//           </Box>
//     </Box>
//   )
// }

// export default DoctorSidebar 


"use client";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { seeGreen } from "@/components/utils/Colors";

const navLinks = [
  { label: "Dashboard", path: "/doctor-dashboard" },
  { label: "Patient History", path: "/doctor-patient-questions-history" },
  { label: "Patient Management", path: "/doctor-patient-management" },
  { label: "Assign Patient Query", path: "/doctor-assign-question-patient" },
  { label: "Patient Notes", path: "/doctor-patient-notes" },
];

function DoctorSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2ecc71",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        toast.success("Logged out successfully");
        setLoading(true);
        setTimeout(() => {
          router.push("/");
          setLoading(false);
        }, 1000);
      }
    });
  };

  const handleLinkClick = (path) => {
    if (pathname === path) {
      toast.success("You're already on this page");
      return;
    }
    setLoading(true);
    router.push(path);
    setTimeout(() => {
      setLoading(false); // fallback in case no route event
    }, 1000);
  };

  return (
    <Box
      height="100vh"
      p={2}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{ maxWidth: "240px",  }}
    >
      {loading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bgcolor="rgba(255,255,255,0.6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1000}
        >
          <ClipLoader color={seeGreen} loading={true} size={80} />
        </Box>
      )}

      <Toaster position="top-right" />

      {/* Nav Links */}
      <Box display="flex" flexDirection="column" gap={1}>
        {navLinks.map(({ label, path }) => {
          const isActive = pathname === path;
          return (
            <Box
              key={path}
              onClick={() => handleLinkClick(path)}
              sx={{
                px: 2,
                py: 1.5,
                cursor: "pointer",
                borderRadius: "10px",
                bgcolor: isActive ? seeGreen : "transparent",
                color: isActive ? "white" : "black",
                transition: "0.3s",
                "&:hover": {
                  bgcolor: "#e0f2f1",
                  color: "black",
                },
                fontWeight: 500,
              }}
            >
              {label}
            </Box>
          );
        })}
      </Box>

      {/* Logout */}
      <Box textAlign="center" mt={3}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          fullWidth
          sx={{ fontWeight: "bold", mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default DoctorSidebar;
