
// "use client";
// import React, { useState } from "react";
// import {
//   Box, Typography, TextField, Button, InputAdornment, IconButton, Paper
// } from "@mui/material";
// import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { ClipLoader } from "react-spinners";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation"; 

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

// // Validation schema
// const LoginSchema = Yup.object({
//   email: Yup.string().email("Enter a valid email").required("Email required"),
//   password: Yup.string().required("Password required"),
// });

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   // Framer Motion variants
//   const cardVariants = {
//     hidden: { opacity: 0, y: -60, scale: 0.95 },
//     visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, type: "spring", bounce: 0.4 } },
//     exit: { opacity: 0, y: 40, scale: 0.9, transition: { duration: 0.4 } },
//   };
//   const btnVariants = {
//     rest: { scale: 1, boxShadow: "0px 2px 8px rgba(25,118,210,0.08)" },
//     hover: { scale: 1.04, boxShadow: "0px 8px 24px rgba(25,118,210,0.19)" },
//     tap: { scale: 0.97 },
//   };

//   // Save all required user info in localStorage
//   function saveUserData({ token, roles, email, name, patientId }) {
//     localStorage.setItem("token", token);
//     localStorage.setItem("roles", JSON.stringify(roles));
//     localStorage.setItem("email", email);
//     localStorage.setItem("name", name);
//     if (patientId !== null && patientId !== undefined)
//       localStorage.setItem("patientId", patientId);
//     else
//       localStorage.removeItem("patientId");
//   }

//   // Redirect based on role
//   function redirectToDashboard(roles = []) {
//     if (roles.includes("Admin")) router.replace("/admin-dashboard");
//     else if (roles.includes("Doctor")) router.replace("/doctor-dashboard");
//     else if (roles.includes("Patient")) router.replace("/patient-dashboard");
//     else router.replace("/"); // fallback
//   }

//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `${API_BASE_URL}/api/${API_VERSION}/Auth/login`,
//         {
//           email: values.email,
//           password: values.password,
//         }
//       );
//       // Save user info to localStorage
//       saveUserData(res.data);

//       toast.success("Login successful! 🎉");

//       // Animation delay before redirect
//       setTimeout(() => {
//         redirectToDashboard(res.data.roles || []);
//       }, 800);

//       resetForm();
//     } catch (err) {
//       toast.error(
//         err?.response?.data?.message || "Invalid email or password."
//       );
//     } finally {
//       setLoading(false);
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Box
//       minHeight="100vh"
//       sx={{
//         background: `linear-gradient(120deg, #05007a 0%, #4e98f8 55%, #87e0fd 100%)`,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Toaster position="top-center" />
//       <AnimatePresence>
//         <motion.div
//           variants={cardVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           style={{ width: "100%" }}
//         >
//           <Paper
//             elevation={6}
//             sx={{
//               p: { xs: 3, sm: 5 },
//               borderRadius: 5,
//               maxWidth: 480,
//               margin: "auto",
//               background: "rgba(255,255,255,0.97)",
//               boxShadow: "0 8px 36px 0 rgba(25,118,210,0.22)",
//               position: "relative",
//               overflow: "hidden",
//             }}
//           >
//             <Box mb={2} textAlign="center">
//               <motion.div
//                 // animate={{ rotate: [0, 360, 0], scale: [1, 1.22, 1] }}
//                 // transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
//                 // style={{ display: "inline-block" }}
//               >
//                 <Lock sx={{ fontSize: 54, color: "#1976d2" }} />
//               </motion.div>
//                  <Typography variant="h4" fontWeight={700} color="primary" mb={1} letterSpacing={1.2}>
//                 Virtual Ward
//               </Typography>
//               <Typography variant="h4" fontSize={"24px"} fontWeight={700} color="primary" mb={1} letterSpacing={1.2}>
//                 Welcome Back
//               </Typography>
//               <Typography color="text.secondary" fontSize={18} fontWeight={500}>
//                 Sign in to your account
//               </Typography>
//             </Box>

//             <Formik
//               initialValues={{ email: "", password: "" }}
//               validationSchema={LoginSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ errors, touched, isSubmitting }) => (
//                 <Form>
//                   <Field
//                     as={TextField}
//                     name="email"
//                     label="Email Address"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     required
//                     error={Boolean(errors.email && touched.email)}
//                     helperText={touched.email && errors.email}
//                     autoComplete="email"
//                     sx={{ mb: 2 }}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <svg width={22} height={22} fill="none" style={{ marginRight: 2 }}>
//                             <circle cx={11} cy={11} r={10} fill="#e3f2fd" />
//                             <path d="M4 8l7 5 7-5" stroke="#1976d2" strokeWidth={1.5} />
//                           </svg>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />

//                   <Field
//                     as={TextField}
//                     name="password"
//                     label="Password"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     required
//                     type={showPassword ? "text" : "password"}
//                     error={Boolean(errors.password && touched.password)}
//                     helperText={touched.password && errors.password}
//                     autoComplete="current-password"
//                     sx={{ mb: 2 }}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Lock sx={{ color: "#1976d2" }} />
//                         </InputAdornment>
//                       ),
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton
//                             onClick={() => setShowPassword((s) => !s)}
//                             edge="end"
//                           >
//                             {showPassword ? <Visibility /> : <VisibilityOff />}
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />

//                   <motion.div
//                     variants={btnVariants}
//                     initial="rest"
//                     whileHover="hover"
//                     whileTap="tap"
//                     style={{ marginTop: 26 }}
//                   >
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       color="primary"
//                       size="large"
//                       fullWidth
//                       sx={{
//                         fontWeight: 700,
//                         fontSize: 18,
//                         py: 1.5,
//                         borderRadius: 2.5,
//                         boxShadow: "0 4px 16px rgba(25,118,210,0.14)",
//                         position: "relative",
//                         letterSpacing: 1,
//                         transition: "all 0.23s cubic-bezier(.4,2,.6,1)",
//                       }}
//                       disabled={isSubmitting || loading}
//                       startIcon={
//                         loading ? (
//                           <ClipLoader color="#fff" size={22} />
//                         ) : null
//                       }
//                     >
//                       {loading ? "Logging in..." : "Sign In"}
//                     </Button>
//                   </motion.div>
//                 </Form>
//               )}
//             </Formik>
//           </Paper>
//         </motion.div>
//       </AnimatePresence>
//     </Box>
//   );
// }
"use client";
import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, InputAdornment, IconButton, Paper
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

// Validation schema
const LoginSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email required"),
  password: Yup.string().required("Password required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Framer Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: -60, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, type: "spring", bounce: 0.4 } },
    exit: { opacity: 0, y: 40, scale: 0.9, transition: { duration: 0.4 } },
  };
  const btnVariants = {
    rest: { scale: 1, boxShadow: "0px 2px 8px rgba(25,118,210,0.08)" },
    hover: { scale: 1.04, boxShadow: "0px 8px 24px rgba(25,118,210,0.19)" },
    tap: { scale: 0.97 },
  };

  // Save all required user info in localStorage
  function saveUserData({ token, roles, email, name, patientId }) {
    localStorage.setItem("token", token);
    localStorage.setItem("roles", JSON.stringify(roles));
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    if (patientId !== null && patientId !== undefined)
      localStorage.setItem("patientId", patientId);
    else
      localStorage.removeItem("patientId");
  }

  // Redirect based on role
  function redirectToDashboard(roles = []) {
    if (roles.includes("Admin")) router.replace("/admin-dashboard");
    else if (roles.includes("Doctor")) router.replace("/doctor-dashboard");
    else if (roles.includes("Patient")) router.replace("/patient-dashboard");
    else router.replace("/"); // fallback
  }

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/${API_VERSION}/Auth/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      // Save user info to localStorage
      saveUserData(res.data);

      toast.success("Login successful! 🎉");

      // Animation delay before redirect
      setTimeout(() => {
        redirectToDashboard(res.data.roles || []);
      }, 800);

      resetForm();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      position="relative"
      sx={{
        display: "flex",
        
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      {/* ----- ANIMATED GRADIENT BACKGROUND ----- */}
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity
        }}
        style={{
          position: "absolute",
          top: 0, left: 0, width: "100vw", height: "100vh",
          zIndex: 0,
          // padding:"20px",
          background: "linear-gradient(120deg, #05007a 0%, #4e98f8 55%, #87e0fd 100%)",
          backgroundSize: "200% 200%",
          // Uncomment for glassy look: filter: "blur(6px)",
        }}
      />
<Box px={2}>
  
      <Toaster position="top-center" />

      <AnimatePresence>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ width: "100%", zIndex: 2, position: "relative" }}
        >
          <Paper
            elevation={6}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 5,
              maxWidth: 480,
              // mx:12,
              margin: "auto",
              background: "rgba(255,255,255,0.97)",
              boxShadow: "0 8px 36px 0 rgba(25,118,210,0.22)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box mb={2} textAlign="center">
              <motion.div>
                <Lock sx={{ fontSize: 54, color: "#1976d2" }} />
              </motion.div>
              <Typography variant="h4" fontWeight={700} color="primary" mb={1} letterSpacing={1.2}>
                Virtual Ward
              </Typography>
              <Typography variant="h4" fontSize={"24px"} fontWeight={700} color="primary" mb={1} letterSpacing={1.2}>
                Welcome Back
              </Typography>
              <Typography color="text.secondary" fontSize={18} fontWeight={500}>
                Sign in to your account
              </Typography>
            </Box>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    error={Boolean(errors.email && touched.email)}
                    helperText={touched.email && errors.email}
                    autoComplete="email"
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <svg width={22} height={22} fill="none" style={{ marginRight: 2 }}>
                            <circle cx={11} cy={11} r={10} fill="#e3f2fd" />
                            <path d="M4 8l7 5 7-5" stroke="#1976d2" strokeWidth={1.5} />
                          </svg>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    type={showPassword ? "text" : "password"}
                    error={Boolean(errors.password && touched.password)}
                    helperText={touched.password && errors.password}
                    autoComplete="current-password"
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#1976d2" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((s) => !s)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <motion.div
                    variants={btnVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    style={{ marginTop: 26 }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{
                        fontWeight: 700,
                        fontSize: 18,
                        py: 1.5,
                        borderRadius: 2.5,
                        boxShadow: "0 4px 16px rgba(25,118,210,0.14)",
                        position: "relative",
                        letterSpacing: 1,
                        transition: "all 0.23s cubic-bezier(.4,2,.6,1)",
                      }}
                      disabled={isSubmitting || loading}
                      startIcon={
                        loading ? (
                          <ClipLoader color="#fff" size={22} />
                        ) : null
                      }
                    >
                      {loading ? "Logging in..." : "Sign In"}
                    </Button>
                  </motion.div>
                </Form>
              )}
            </Formik>
          </Paper>
        </motion.div>
      </AnimatePresence>
</Box>
    </Box>
  );
}
