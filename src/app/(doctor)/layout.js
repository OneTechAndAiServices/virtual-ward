import Navbar from "@/components/admin/bars/Navbar";
import Sidebar from "@/components/admin/bars/Sidebar";
import DoctorNavbar from "@/components/doctors/bars/DoctorNavbar";
import DoctorSidebar from "@/components/doctors/bars/DoctorSidebar";
import { seeGreen } from "@/components/utils/Colors";
import { Box } from "@mui/material";

export default function AdminLayout({ children }) {
  return (

<>
       <Box display={"flex"} maxWidth={"1900px"} mx={"auto"}>
        <Box width={["0%","0%","20%"]} position={"fixed"} display={["none","none","flex"]}>
            <DoctorSidebar/>
        </Box>
        <Box width={"100%"} ml={["0%","0%","20%"]}>
            <DoctorNavbar/>
             {children}
        </Box>
       </Box>
</>
   
  );
}
