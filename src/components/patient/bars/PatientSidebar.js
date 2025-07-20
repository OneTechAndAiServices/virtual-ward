"use client";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { seeGreen } from "@/components/utils/Colors";
import Swal from "sweetalert2";

const navLinks = [
  { label: "Dashboard", path: "/patient-dashboard" },
  // { label: "Questions", path: "/patient-questions" },
  { label: "Vitals", path: "/patient-vitals" },
  {label:"Assigned questions",path:"/patient-assigned-questionaiore"}
];

function PatientSidebar() {
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
    setTimeout(() => setLoading(false), 1000); // fallback in case no transition event
  };

  return (
    <Box
      height="100vh"
      p={2}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      position="fixed"
      sx={{  minWidth: "240px" }}
    >
  {loading && (
  <Box
    position="fixed"
    top={0}
    left={0}
    width="100vw"
    height="100vh"
    bgcolor="rgba(255, 255, 255, 0.9)" // ✅ updated for tint
    display="flex"
    alignItems="center"
    justifyContent="center"
    zIndex={10000000}
  >
    <ClipLoader color={seeGreen} loading={true} size={80} />
  </Box>
)}


      <Toaster position="top-right" />

      <Box display="flex" flexDirection="column" gap={1}>
        <Typography my={1} fontWeight={600} fontSize={22}>
          Patient
        </Typography>
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
         <Box textAlign="center" mt={3} display={"flex"} flexDirection={"column"}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                fullWidth
                sx={{ fontWeight: "bold", mt: 2 }}
              >
                Logout
              </Button>
                <Typography fontSize={12} mt={2} color="text.secondary">
                  © {new Date().getFullYear()} OneTechAndAI UK Corporation
                </Typography>
            </Box>
    </Box>
  );
}

export default PatientSidebar;
