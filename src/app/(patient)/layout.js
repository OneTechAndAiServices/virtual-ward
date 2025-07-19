
import PatientNavbar from "@/components/patient/bars/PatientNavbar";
import PatientSidebar from "@/components/patient/bars/PatientSidebar";
import { Box } from "@mui/material";

export default function PatientLayout({ children }) {
  return (

<>
       <Box display={"flex"}>
        <Box width={["0%","0%","20%"]} position={"fixed"} display={["none","none","flex"]}>
            <PatientSidebar/>
        </Box>
        <Box width={"100%"} ml={["0%","0%","20%"]}>
            <PatientNavbar/>
             {children}
        </Box>
       </Box>
</>
   
  );
}
