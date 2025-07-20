"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Dashboard,
  LocalHospital,
  Quiz,
  FormatListBulleted,
  WarningAmber,
  Info,
} from "@mui/icons-material";
import { lightGreen, seeGreen } from "@/components/utils/Colors";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const sidebarItems = [
  { label: "Dashboard", path: "/admin-dashboard", icon: <Dashboard /> },
  { label: "Doctor", path: "/admin-manage-doctor", icon: <LocalHospital /> },
  { label: "Questions Management", path: "/admin-questions-management", icon: <Quiz /> },
  { label: "Questionnaire", path: "/admin-questionaiore", icon: <FormatListBulleted /> },
  { label: "Alerts", path: "/admin-alerts", icon: <WarningAmber /> },
  { label: "Instructions", path: "/admin-instructions", icon: <Info /> },
];

function Sidebar() {
  const pathname = usePathname();
    const router = useRouter();
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
  return (
 <>
    <Box display="flex" flexDirection="column">
    <Typography textAlign={"center"} fontWeight={600} fontSize={"26px"} mt={2} color={seeGreen}>Admin</Typography>
      {sidebarItems.map((item, index) => {
        const isActive = pathname === item.path;

        return (
       <>

   <Box
            key={index}
            my={0.5}
            mx={1}
            maxWidth={220}
            px={2}
            py={1.5}
            display="flex"
            alignItems="center"
            borderRadius={2}
            sx={{
              backgroundColor: isActive ? seeGreen : "transparent",
              color: isActive ? "#fff" : "#000",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: lightGreen,
                color:"black",
                transform: "translateY(-2px)",
              },
            }}
          >
            {/* <Box mr={1} sx={{ color: isActive ? "#fff" : seeGreen }}>
              {item.icon}
            </Box> */}
            <Link
              href={item.path}
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              {item.label}
            </Link>
          </Box>
       </>
        );
      })}
       <Box textAlign="center" display={"flex"} flexDirection={"column"} justifyContent={"center"} mx={1} mt={3}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          fullWidth
          sx={{ fontWeight: "bold", mt: 2 }}
        >
          Logout
        </Button>
          <Typography fontSize={12} color="text.secondary" mt={2}>
            © {new Date().getFullYear()} OneTechAndAI UK Corporation
          </Typography>
      </Box>
    </Box>
 </>
  );
}

export default Sidebar;
