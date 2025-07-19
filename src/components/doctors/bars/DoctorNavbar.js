"use client";
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";
import { seeGreen } from "@/components/utils/Colors";

function DoctorNavbar() {
  const [name, setName] = useState("Doctor");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  return (
    <Box  bgcolor={"#F1F4F7"} m={1} borderRadius={"8px"}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={500} >
          Doctor Dashboard
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Box textAlign="right">
            <Typography variant="subtitle1" fontWeight={500}  fontSize={"15px"}>
              {name}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              {email}
            </Typography> */}
          </Box>
          <Avatar sx={{ bgcolor: seeGreen }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
      </Toolbar>
    </Box>
  );
}

export default DoctorNavbar;
