import Navbar from "@/components/admin/bars/Navbar";
import Sidebar from "@/components/admin/bars/Sidebar";
import { Box } from "@mui/material";

export default function AdminLayout({ children }) {
  return (

<>
       <Box display={"flex"} maxWidth={"1900px"} mx={"auto"}>
        <Box  width={["0%","0%","20%"]} position={"fixed"} display={["none","none","flex"]}>
            <Sidebar/>
        </Box>
        <Box  width={"100%"} ml={["0%","0%","20%"]}>
            <Navbar/>
             {children}
        </Box>
       </Box>
</>
   
  );
}
