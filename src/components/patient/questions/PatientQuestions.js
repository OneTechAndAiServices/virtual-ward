// // "use client";
// // import React, { useEffect, useState } from "react";
// // import {
// //   Box, Typography, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
// //   Checkbox, Button, CircularProgress, FormGroup
// // } from "@mui/material";
// // import toast, { Toaster } from "react-hot-toast";
// // import axios from "axios";

// // // --- Config ---
// // const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Question`;
// // const RESPONSE_URL = `${API_URL}/response`;

// // function getPatientId() {
// //   return localStorage.getItem("patientId");
// // }
// // function getToken() {
// //   return localStorage.getItem("token");
// // }

// // export default function PatientQuestions() {
// //   const [questions, setQuestions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [answers, setAnswers] = useState({});
// //   const [submitting, setSubmitting] = useState(false);

// //   // Fetch questions with token
// //   useEffect(() => {
// //     async function fetchQuestions() {
// //       setLoading(true);
// //       try {
// //         const token = getToken();
// //         const { data } = await axios.get(API_URL, {
// //           headers: { Authorization: `Bearer ${token}` }
// //         });
// //         setQuestions(Array.isArray(data) ? data : data.data || []);
// //       } catch (err) {
// //         if (err?.response?.status === 401) {
// //           toast.error("Session expired or unauthorized! Please login again.");
// //         } else {
// //           toast.error("Failed to load questions.");
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetchQuestions();
// //   }, []);

// //   // Single choice handler
// //   const handleChange = (qid, value) => {
// //     setAnswers(prev => ({ ...prev, [qid]: value }));
// //   };

// //   // Multi choice handler
// //   const handleMultiChange = (qid, aid) => {
// //     setAnswers(prev => {
// //       const prevArr = prev[qid] || [];
// //       if (prevArr.includes(aid)) {
// //         return { ...prev, [qid]: prevArr.filter(x => x !== aid) };
// //       } else {
// //         return { ...prev, [qid]: [...prevArr, aid] };
// //       }
// //     });
// //   };

// //   // Submit
// //   const handleSubmit = async () => {
// //     setSubmitting(true);
// //     const patientID = getPatientId();
// //     const token = getToken();
// //     if (!patientID) {
// //       toast.error("Patient ID not found in localStorage!");
// //       setSubmitting(false);
// //       return;
// //     }
// //     if (!token) {
// //       toast.error("Auth token missing. Please login.");
// //       setSubmitting(false);
// //       return;
// //     }
// //     try {
// //       let anySubmitted = false;
// //       for (const q of questions) {
// //         if (!answers[q.id] || (Array.isArray(answers[q.id]) && answers[q.id].length === 0)) continue;
// //         if (q.questionType === 2) {
// //           for (let aid of answers[q.id]) {
// //             await axios.post(RESPONSE_URL, {
// //               patientID: Number(patientID),
// //               questionID: q.id,
// //               answerID: aid,
// //               questionnaireID: q.questionnaireID,
// //             }, { headers: { Authorization: `Bearer ${token}` } });
// //             anySubmitted = true;
// //           }
// //         } else {
// //           await axios.post(RESPONSE_URL, {
// //             patientID: Number(patientID),
// //             questionID: q.id,
// //             answerID: answers[q.id],
// //             questionnaireID: q.questionnaireID,
// //           }, { headers: { Authorization: `Bearer ${token}` } });
// //           anySubmitted = true;
// //         }
// //       }
// //       if (anySubmitted) toast.success("Answers submitted!");
// //       else toast("No answers selected.");
// //     } catch (err) {
// //       if (err?.response?.status === 401) {
// //         toast.error("Session expired or unauthorized! Please login again.");
// //       } else {
// //         toast.error("Submission failed.");
// //       }
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <Box p={2} sx={{ maxWidth: 700, mx: "auto" }}>
// //       <Toaster position="top-right" />
// //       <Typography variant="h5" fontWeight="bold" mb={3} color="primary">Patient Questions</Typography>
// //       <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
// //         {loading ? (
// //           <Box display="flex" justifyContent="center" p={6}><CircularProgress /></Box>
// //         ) : (
// //           questions.length === 0
// //             ? <Typography>No questions available.</Typography>
// //             : questions.map((q, idx) => (
// //                 <Box key={q.id} mb={4}>
// //                   <FormControl component="fieldset" fullWidth>
// //                     <FormLabel component="legend" sx={{ fontWeight: 600 }}>
// //                       {idx + 1}. {q.text}
// //                     </FormLabel>
// //                     {q.questionType === 2 ? (
// //                       // Multi Choice: Checkboxes
// //                       <FormGroup>
// //                         {q.answers.map(a => (
// //                           <FormControlLabel
// //                             key={a.id}
// //                             control={
// //                               <Checkbox
// //                                 checked={answers[q.id]?.includes(a.id) || false}
// //                                 onChange={() => handleMultiChange(q.id, a.id)}
// //                               />
// //                             }
// //                             label={a.text}
// //                           />
// //                         ))}
// //                       </FormGroup>
// //                     ) : (
// //                       // Single Choice: Radios
// //                       <RadioGroup
// //                         value={answers[q.id] ?? ""}
// //                         onChange={e => handleChange(q.id, Number(e.target.value))}
// //                       >
// //                         {q.answers.map(a => (
// //                           <FormControlLabel
// //                             key={a.id}
// //                             value={a.id}
// //                             control={<Radio />}
// //                             label={a.text}
// //                           />
// //                         ))}
// //                       </RadioGroup>
// //                     )}
// //                   </FormControl>
// //                 </Box>
// //               ))
// //         )}
// //         <Box textAlign="right">
// //           <Button
// //             onClick={handleSubmit}
// //             disabled={submitting || loading}
// //             variant="contained"
// //             size="large"
// //             sx={{ borderRadius: 2, mt: 2, fontWeight: 600, minWidth: 130 }}
// //           >
// //             {submitting ? <CircularProgress size={22} color="inherit" /> : "Submit Answers"}
// //           </Button>
// //         </Box>
// //       </Paper>
// //     </Box>
// //   );
// // }



// // "use client";
// // import React, { useEffect, useState } from "react";
// // import {
// //   Box, Typography, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
// //   Checkbox, Button, CircularProgress, FormGroup
// // } from "@mui/material";
// // import toast, { Toaster } from "react-hot-toast";
// // import axios from "axios";

// // const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Question`;
// // const RESPONSE_URL = `${API_URL}/response`;

// // function getPatientId() {
// //   return localStorage.getItem("patientId");
// // }
// // function getToken() {
// //   return localStorage.getItem("token");
// // }

// // export default function PatientQuestions() {
// //   const [questions, setQuestions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [step, setStep] = useState(0); // current question index
// //   const [answer, setAnswer] = useState([]); // selected answer(s) for current question
// //   const [submitting, setSubmitting] = useState(false);
// //   const [done, setDone] = useState(false);

// //   // Fetch all questions (with token)
// //   useEffect(() => {
// //     async function fetchQuestions() {
// //       setLoading(true);
// //       try {
// //         const token = getToken();
// //         const { data } = await axios.get(API_URL, {
// //           headers: { Authorization: `Bearer ${token}` }
// //         });
// //         setQuestions(Array.isArray(data) ? data : data.data || []);
// //       } catch (err) {
// //         if (err?.response?.status === 401) {
// //           toast.error("Session expired or unauthorized! Please login again.");
// //         } else {
// //           toast.error("Failed to load questions.");
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetchQuestions();
// //   }, []);

// //   // Reset answer on step change
// //   useEffect(() => {
// //     if (!questions[step]) return setAnswer([]);
// //     // Multi-choice = [], single-choice = "", but always [] for simplicity
// //     setAnswer([]);
// //   }, [step, questions]);

// //   if (loading) {
// //     return (
// //       <Box p={4} display="flex" justifyContent="center"><CircularProgress /></Box>
// //     );
// //   }
// //   if (done) {
// //     return (
// //       <Box p={4} maxWidth={500} mx="auto" textAlign="center">
// //         <Typography variant="h5" fontWeight={700} color="primary" mb={2}>
// //           Thank you for submitting your answers!
// //         </Typography>
// //         <Typography>We appreciate your feedback. You may now close this window.</Typography>
// //       </Box>
// //     );
// //   }
// //   if (!questions.length) {
// //     return (
// //       <Box p={4} maxWidth={600} mx="auto">
// //         <Typography>No questions available.</Typography>
// //       </Box>
// //     );
// //   }

// //   const q = questions[step];

// //   // Handle user selection
// //   const handleRadio = (val) => setAnswer([val]);
// //   const handleCheckbox = (aid) => {
// //     setAnswer((prev) =>
// //       prev.includes(aid)
// //         ? prev.filter((x) => x !== aid)
// //         : [...prev, aid]
// //     );
// //   };

// //   // Submit this answer and go to next
// //   const handleNext = async () => {
// //     setSubmitting(true);
// //     const patientID = getPatientId();
// //     const token = getToken();
// //     if (!patientID) {
// //       toast.error("Patient ID not found!");
// //       setSubmitting(false);
// //       return;
// //     }
// //     if (!token) {
// //       toast.error("Login session expired!");
// //       setSubmitting(false);
// //       return;
// //     }
// //     if (!answer.length) {
// //       toast.error("Please select an answer.");
// //       setSubmitting(false);
// //       return;
// //     }
// //     try {
// //       // For multi-choice, submit each answerID; for single, just one
// //       if (q.questionType === 2) {
// //         await Promise.all(
// //           answer.map((aid) =>
// //             axios.post(
// //               RESPONSE_URL,
// //               {
// //                 patientID: Number(patientID),
// //                 questionID: q.id,
// //                 answerID: aid,
// //                 questionnaireID: q.questionnaireID,
// //               },
// //               { headers: { Authorization: `Bearer ${token}` } }
// //             )
// //           )
// //         );
// //       } else {
// //         await axios.post(
// //           RESPONSE_URL,
// //           {
// //             patientID: Number(patientID),
// //             questionID: q.id,
// //             answerID: answer[0],
// //             questionnaireID: q.questionnaireID,
// //           },
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         );
// //       }
// //       toast.success("Answer submitted!");
// //       // Go to next, or finish
// //       if (step < questions.length - 1) {
// //         setStep((prev) => prev + 1);
// //       } else {
// //         setDone(true);
// //       }
// //     } catch (err) {
// //       if (err?.response?.status === 401) {
// //         toast.error("Session expired! Please login again.");
// //       } else {
// //         toast.error("Failed to submit answer.");
// //       }
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <Box p={2} sx={{ maxWidth: 600, mx: "auto" }}>
// //       <Toaster position="top-right" />
// //       <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2, minHeight: 230 }}>
// //         <Typography variant="h6" fontWeight={600} color="primary" mb={2}>
// //           Question {step + 1} of {questions.length}
// //         </Typography>
// //         <Typography fontWeight={600} mb={2}>
// //           {q.text}
// //         </Typography>
// //         <FormControl component="fieldset" fullWidth>
// //           {q.questionType === 2 ? (
// //             // Multi-choice: Checkbox
// //             <FormGroup>
// //               {q.answers.map((a) => (
// //                 <FormControlLabel
// //                   key={a.id}
// //                   control={
// //                     <Checkbox
// //                       checked={answer.includes(a.id)}
// //                       onChange={() => handleCheckbox(a.id)}
// //                       disabled={submitting}
// //                     />
// //                   }
// //                   label={a.text}
// //                 />
// //               ))}
// //             </FormGroup>
// //           ) : (
// //             // Single-choice: Radio
// //             <RadioGroup
// //               value={answer[0] || ""}
// //               onChange={(e) => handleRadio(Number(e.target.value))}
// //             >
// //               {q.answers.map((a) => (
// //                 <FormControlLabel
// //                   key={a.id}
// //                   value={a.id}
// //                   control={<Radio disabled={submitting} />}
// //                   label={a.text}
// //                 />
// //               ))}
// //             </RadioGroup>
// //           )}
// //         </FormControl>
// //         <Box textAlign="right" mt={3}>
// //           <Button
// //             onClick={handleNext}
// //             disabled={submitting}
// //             variant="contained"
// //             sx={{ minWidth: 120, borderRadius: 2, fontWeight: 600 }}
// //           >
// //             {submitting ? <CircularProgress size={22} color="inherit" /> : step < questions.length - 1 ? "Next" : "Finish"}
// //           </Button>
// //         </Box>
// //       </Paper>
// //     </Box>
// //   );
// // }



// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Box, Typography, Paper, Radio, RadioGroup, FormControlLabel, FormControl,
//   Checkbox, Button, CircularProgress, FormGroup, IconButton
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";
// import ClipLoader from "react-spinners/ClipLoader";
// import axios from "axios";
// import { seeGreen } from "@/components/utils/Colors";

// const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Question`;
// const RESPONSE_URL = `${API_URL}/response`;

// function getPatientId() {
//   return localStorage.getItem("patientId");
// }
// function getToken() {
//   return localStorage.getItem("token");
// }

// export default function PatientQuestions() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [step, setStep] = useState(0);
//   const [answer, setAnswer] = useState([]);
//   const [submitting, setSubmitting] = useState(false);
//   const [done, setDone] = useState(false);

//   useEffect(() => {
//     async function fetchQuestions() {
//       setLoading(true);
//       try {
//         const token = getToken();
//         const { data } = await axios.get(API_URL, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setQuestions(Array.isArray(data) ? data : data.data || []);
//       } catch (err) {
//         toast.error("Failed to load questions. Please login again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     if (!questions[step]) return setAnswer([]);
//     setAnswer([]);
//   }, [step, questions]);

//   const q = questions[step];

//   const handleRadio = (val) => setAnswer([val]);
//   const handleCheckbox = (aid) => {
//     setAnswer((prev) =>
//       prev.includes(aid) ? prev.filter((x) => x !== aid) : [...prev, aid]
//     );
//   };

//   const handleBack = () => {
//     if (step > 0) setStep((prev) => prev - 1);
//   };

//   const handleNext = async () => {
//     setSubmitting(true);
//     const patientID = getPatientId();
//     const token = getToken();

//     if (!patientID || !token) {
//       toast.error("Missing credentials. Please login again.");
//       setSubmitting(false);
//       return;
//     }

//     if (!answer.length) {
//       toast.error("Please select an answer.");
//       setSubmitting(false);
//       return;
//     }

//     try {
//       const showInstructionOrAlert = (item) => {
//         if (item?.instruction || item?.alert) {
//           Swal.fire({
//             title: "Important Info",
//             html: `
//               ${item?.instruction ? `<b>Instruction:</b><br>${item.instruction}` : ""}
//               ${item?.alert ? `<br><b>Alert:</b><br>${item.alert}` : ""}
//             `,
//             icon: "info",
//             confirmButtonColor: seeGreen,
//           });
//         }
//       };

//       if (q.questionType === 2) {
//         await Promise.all(
//           answer.map(async (aid) => {
//             const selected = q.answers.find((a) => a.id === aid);
//             showInstructionOrAlert(selected);
//             return axios.post(
//               RESPONSE_URL,
//               {
//                 patientID: Number(patientID),
//                 questionID: q.id,
//                 answerID: aid,
//                 questionnaireID: q.questionnaireID,
//               },
//               { headers: { Authorization: `Bearer ${token}` } }
//             );
//           })
//         );
//       } else {
//         const selected = q.answers.find((a) => a.id === answer[0]);
//         showInstructionOrAlert(selected);
//         await axios.post(
//           RESPONSE_URL,
//           {
//             patientID: Number(patientID),
//             questionID: q.id,
//             answerID: answer[0],
//             questionnaireID: q.questionnaireID,
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       }

//       toast.success("Answer submitted!");

//       if (step < questions.length - 1) {
//         setStep((prev) => prev + 1);
//       } else {
//         setDone(true);
//       }
//     } catch (err) {
//       toast.error("Error submitting answer.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         position="fixed"
//         top={0}
//         left={0}
//         width="100vw"
//         height="100vh"
//         bgcolor="rgba(0,0,0,0.1)"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         zIndex={9999}
//       >
//         <ClipLoader size={80} color={seeGreen} />
//       </Box>
//     );
//   }

//   if (done) {
//     return (
//       <Box p={4} maxWidth={500} mx="auto" textAlign="center">
//         <Typography variant="h5" fontWeight={700} color="primary" mb={2}>
//           Thank you for submitting your answers!
//         </Typography>
//         <Typography>You may now close this window.</Typography>
//       </Box>
//     );
//   }

//   if (!questions.length) {
//     return (
//       <Box p={4} maxWidth={600} mx="auto">
//         <Typography>No questions available.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={2} sx={{ maxWidth: 600, mx: "auto" }}>
//       <Toaster position="top-right" />

//       <Box display="flex" alignItems="center" mb={1}>
//         <IconButton
//           onClick={handleBack}
//           disabled={step === 0 || submitting}
//           sx={{ mr: 1}}
//         >
//           <ArrowBackIcon  sx={{ bgcolor:seeGreen,color:"white",borderRadius:100,p:0.5,fontSize:30 }} />
//         </IconButton>
//         <Typography variant="subtitle2">
//           Question {step + 1} of {questions.length}
//         </Typography>
//       </Box>

//       <Box sx={{ p: 3, borderRadius: 3, boxShadow: "0 2px 16px 0 rgba(0,0,0,0.1)", minHeight: 260 }}>
//         <Typography fontWeight={600} mb={2}>
//           {q.text}
//         </Typography>

//         <FormControl fullWidth>
//           {q.questionType === 2 ? (
//             <FormGroup>
//               {q.answers.map((a) => (
//                 <FormControlLabel
//                   key={a.id}
//                   control={
//                     <Checkbox
//                       checked={answer.includes(a.id)}
//                       onChange={() => handleCheckbox(a.id)}
//                       disabled={submitting}
//                     />
//                   }
//                   label={a.text}
//                 />
//               ))}
//             </FormGroup>
//           ) : (
//             <RadioGroup
//               value={answer[0] || ""}
//               onChange={(e) => handleRadio(Number(e.target.value))}
//             >
//               {q.answers.map((a) => (
//                 <FormControlLabel
//                   key={a.id}
//                   value={a.id}
//                   control={<Radio disabled={submitting} />}
//                   label={a.text}
//                 />
//               ))}
//             </RadioGroup>
//           )}
//         </FormControl>

//         {/* Submit Button */}
//         <Box textAlign="right" mt={3}>
//           <Button
//             onClick={handleNext}
//             disabled={submitting}
//             variant="contained"
//             sx={{ minWidth: 120, borderRadius: 2, fontWeight: 600 ,bgcolor:seeGreen}}
//           >
//             {submitting ? (
//               <CircularProgress size={22} color="inherit" />
//             ) : step < questions.length - 1 ? (
//               "Next"
//             ) : (
//               "Finish"
//             )}
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }



// "use client"
// import React, { useEffect, useState } from "react";
// import {
//   Box, Typography, Paper, Radio, RadioGroup, FormControlLabel, FormControl,
//   Checkbox, Button, CircularProgress, FormGroup, IconButton
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";
// import ClipLoader from "react-spinners/ClipLoader";
// import axios from "axios";
// import { seeGreen } from "@/components/utils/Colors";

// const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Question`;
// const RESPONSE_URL = `${API_URL}/response`;

// function getPatientId() {
//   return localStorage.getItem("patientId");
// }
// function getToken() {
//   return localStorage.getItem("token");
// }

// export default function PatientQuestions({ questionnaireId }) {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [step, setStep] = useState(0);
//   const [answer, setAnswer] = useState([]);
//   const [submitting, setSubmitting] = useState(false);
//   const [done, setDone] = useState(false);

//   useEffect(() => {
//     async function fetchQuestions() {
//       setLoading(true);
//       try {
//         const token = getToken();
//         const { data } = await axios.get(API_URL, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // Only show questions for this questionnaire
//         const filtered = Array.isArray(data) ? data.filter(q => q.questionnaireID === questionnaireId) : [];
//         setQuestions(filtered);
//         setStep(0);
//         setDone(false);
//       } catch (err) {
//         toast.error("Failed to load questions. Please login again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (questionnaireId) fetchQuestions();
//   }, [questionnaireId]);

//   useEffect(() => {
//     if (!questions[step]) return setAnswer([]);
//     setAnswer([]);
//   }, [step, questions]);

//   const q = questions[step];

//   const handleRadio = (val) => setAnswer([val]);
//   const handleCheckbox = (aid) => {
//     setAnswer((prev) =>
//       prev.includes(aid) ? prev.filter((x) => x !== aid) : [...prev, aid]
//     );
//   };

//   const handleBack = () => {
//     if (step > 0) setStep((prev) => prev - 1);
//   };

//   const handleNext = async () => {
//     setSubmitting(true);
//     const patientID = getPatientId();
//     const token = getToken();

//     if (!patientID || !token) {
//       toast.error("Missing credentials. Please login again.");
//       setSubmitting(false);
//       return;
//     }

//     if (!answer.length) {
//       toast.error("Please select an answer.");
//       setSubmitting(false);
//       return;
//     }

//     try {
//       const showInstructionOrAlert = (item) => {
//         if (item?.instruction || item?.alert) {
//           Swal.fire({
//             title: "Important Info",
//             html: `
//               ${item?.instruction ? `<b>Instruction:</b><br>${item.instruction}` : ""}
//               ${item?.alert ? `<br><b>Alert:</b><br>${item.alert}` : ""}
//             `,
//             icon: "info",
//             confirmButtonColor: seeGreen,
//           });
//         }
//       };

//       if (q.questionType === 2) {
//         await Promise.all(
//           answer.map(async (aid) => {
//             const selected = q.answers.find((a) => a.id === aid);
//             showInstructionOrAlert(selected);
//             return axios.post(
//               RESPONSE_URL,
//               {
//                 patientID: Number(patientID),
//                 questionID: q.id,
//                 answerID: aid,
//                 questionnaireID: q.questionnaireID,
//               },
//               { headers: { Authorization: `Bearer ${token}` } }
//             );
//           })
//         );
//       } else {
//         const selected = q.answers.find((a) => a.id === answer[0]);
//         showInstructionOrAlert(selected);
//         await axios.post(
//           RESPONSE_URL,
//           {
//             patientID: Number(patientID),
//             questionID: q.id,
//             answerID: answer[0],
//             questionnaireID: q.questionnaireID,
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       }

//       toast.success("Answer submitted!");

//       if (step < questions.length - 1) {
//         setStep((prev) => prev + 1);
//       } else {
//         setDone(true);
//       }
//     } catch (err) {
//       toast.error("Error submitting answer.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         position="fixed"
//         top={0}
//         left={0}
//         width="100vw"
//         height="100vh"
//         bgcolor="rgba(0,0,0,0.1)"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         zIndex={9999}
//       >
//         <ClipLoader size={80} color={seeGreen} />
//       </Box>
//     );
//   }

//   if (done) {
//     return (
//       <Box p={4} maxWidth={500} mx="auto" textAlign="center">
//         <Typography variant="h5" fontWeight={700} color="primary" mb={2}>
//           Thank you for submitting your answers!
//         </Typography>
//         <Typography>You may now close this window.</Typography>
//       </Box>
//     );
//   }

//   if (!questions.length) {
//     return (
//       <Box p={4} maxWidth={600} mx="auto">
//         <Typography>No questions available.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={2} sx={{ maxWidth: 600, mx: "auto" }}>
//       <Toaster position="top-right" />
//       <Box display="flex" alignItems="center" mb={1}>
//         <Typography variant="subtitle2">
//           Question {step + 1} of {questions.length}
//         </Typography>
//       </Box>

//       <Box sx={{ p: 3, borderRadius: 3, boxShadow: "0 2px 16px 0 rgba(0,0,0,0.1)", minHeight: 260 }}>
//         <Typography fontWeight={600} mb={2}>
//           {q.text}
//         </Typography>

//         <FormControl fullWidth>
//           {q.questionType === 2 ? (
//             <FormGroup>
//               {q.answers.map((a) => (
//                 <FormControlLabel
//                   key={a.id}
//                   control={
//                     <Checkbox
//                       checked={answer.includes(a.id)}
//                       onChange={() => handleCheckbox(a.id)}
//                       disabled={submitting}
//                     />
//                   }
//                   label={a.text}
//                 />
//               ))}
//             </FormGroup>
//           ) : (
//             <RadioGroup
//               value={answer[0] || ""}
//               onChange={(e) => handleRadio(Number(e.target.value))}
//             >
//               {q.answers.map((a) => (
//                 <FormControlLabel
//                   key={a.id}
//                   value={a.id}
//                   control={<Radio disabled={submitting} />}
//                   label={a.text}
//                 />
//               ))}
//             </RadioGroup>
//           )}
//         </FormControl>

//         {/* Submit Button */}
//         <Box textAlign="right" mt={3}>
//           <Button
//             onClick={handleNext}
//             disabled={submitting}
//             variant="contained"
//             sx={{ minWidth: 120, borderRadius: 2, fontWeight: 600 ,bgcolor:seeGreen}}
//           >
//             {submitting ? (
//               <CircularProgress size={22} color="inherit" />
//             ) : step < questions.length - 1 ? (
//               "Next"
//             ) : (
//               "Finish"
//             )}
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }
"use client"
import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Radio, RadioGroup, FormControlLabel, FormControl,
  Checkbox, Button, CircularProgress, FormGroup, Dialog, DialogTitle,
  DialogContent, DialogActions, Alert, Slide
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { seeGreen } from "@/components/utils/Colors";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/Question`;

function getPatientId() {
  return localStorage.getItem("patientId");
}
function getToken() {
  return localStorage.getItem("token");
}

export default function PatientQuestions({ questionnaireId }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // --- Dialog for alert/instruction ---
  const [pendingDialogs, setPendingDialogs] = useState([]);
  const [activeDialog, setActiveDialog] = useState(null);
  const [pendingNext, setPendingNext] = useState(false); // to know if "next" is waiting for dialog

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      try {
        const token = getToken();
        const { data } = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const filtered = Array.isArray(data) ? data.filter(q => q.questionnaireID === questionnaireId) : [];
        setQuestions(filtered);
        setStep(0);
        setDone(false);
      } catch (err) {
        toast.error("Failed to load questions. Please login again.");
      } finally {
        setLoading(false);
      }
    }
    if (questionnaireId) fetchQuestions();
  }, [questionnaireId]);

  useEffect(() => {
    if (!questions[step]) return setAnswer([]);
    setAnswer([]);
  }, [step, questions]);

  const q = questions[step];

  // --- Radio/Checkbox handlers ---
  const handleRadio = (val) => setAnswer([val]);
  const handleCheckbox = (aid) => {
    setAnswer((prev) =>
      prev.includes(aid) ? prev.filter((x) => x !== aid) : [...prev, aid]
    );
  };

  // --- Dialog navigation ---
  const handleDialogClose = async () => {
    if (pendingDialogs.length <= 1) {
      setPendingDialogs([]);
      setActiveDialog(null);
      // After last dialog, proceed with submit if next was pressed
      if (pendingNext) {
        await reallyHandleNext();
        setPendingNext(false);
      }
    } else {
      const newQueue = pendingDialogs.slice(1);
      setPendingDialogs(newQueue);
      setActiveDialog(newQueue[0]);
    }
  };

  // --- Next/Finish logic ---
  const handleNext = async () => {
    // 1. Find any alerts/instructions in selected answers
    let dialogs = [];
    (Array.isArray(answer) ? answer : [answer]).forEach(aid => {
      const a = q.answers.find(x => x.id === aid);
      if (!a) return;
      if (a.alert && (a.alert.text || a.alert.contactInfo)) {
        dialogs.push({ type: "alert", text: a.alert.text, contactInfo: a.alert.contactInfo });
      }
      if (a.instruction && a.instruction.instructionText) {
        dialogs.push({ type: "instruction", text: a.instruction.instructionText });
      }
    });

    if (dialogs.length) {
      setPendingDialogs(dialogs);
      setActiveDialog(dialogs[0]);
      setPendingNext(true); // flag to submit after dialogs
      return;
    }

    await reallyHandleNext();
  };

  // --- Actually do submit/move next ---
  const reallyHandleNext = async () => {
    setSubmitting(true);
    const patientID = getPatientId();
    const token = getToken();

    if (!patientID || !token) {
      toast.error("Missing credentials. Please login again.");
      setSubmitting(false);
      return;
    }

    if (!answer.length) {
      toast.error("Please select an answer.");
      setSubmitting(false);
      return;
    }

    try {
      // Submit all selected answers
      if (q.questionType === 2) {
        await Promise.all(
          answer.map((aid) =>
            axios.post(
              `${API_URL}/response`,
              {
                patientID: Number(patientID),
                questionID: q.id,
                answerID: aid,
                questionnaireID: q.questionnaireID,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            )
          )
        );
      } else {
        await axios.post(
          `${API_URL}/response`,
          {
            patientID: Number(patientID),
            questionID: q.id,
            answerID: answer[0],
            questionnaireID: q.questionnaireID,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      toast.success("Answer submitted!");

      if (step < questions.length - 1) {
        setStep(prev => prev + 1);
      } else {
        setDone(true);
      }
    } catch (err) {
      toast.error("Error submitting answer.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- UI: Loading state ---
  if (loading) {
    return (
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
    );
  }

  if (done) {
    return (
      <Box p={4} maxWidth={500} mx="auto" textAlign="center">
        <Typography variant="h5" fontWeight={700} color="primary" mb={2}>
          Thank you for submitting your answers!
        </Typography>
        <Typography>You may now close this window.</Typography>
      </Box>
    );
  }

  if (!questions.length) {
    return (
      <Box p={4} maxWidth={600} mx="auto">
        <Typography>No questions available.</Typography>
      </Box>
    );
  }


  return (
    <Box p={2} sx={{ maxWidth: 600, mx: "auto" }}>
      <Toaster position="top-right" />
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="subtitle2">
          Question {step + 1} of {questions.length}
        </Typography>
      </Box>
      <Box sx={{ bgcolor:"white",p: 3, borderRadius: 3, boxShadow: "0 2px 16px 0 rgba(0,0,0,0.1)", minHeight: 260 }}>
        <Typography fontWeight={600} mb={2}>
          {q.text}
        </Typography>

        <FormControl fullWidth>
          {q.questionType === 2 ? (
            <FormGroup>
              {q.answers.map((a) => (
                <FormControlLabel
                  key={a.id}
                  control={
                    <Checkbox
                      checked={answer.includes(a.id)}
                      onChange={() => handleCheckbox(a.id)}
                      disabled={submitting}
                    />
                  }
                  label={a.text}
                />
              ))}
            </FormGroup>
          ) : (
            <RadioGroup
              value={answer[0] || ""}
              onChange={(e) => handleRadio(Number(e.target.value))}
            >
              {q.answers.map((a) => (
                <FormControlLabel
                  key={a.id}
                  value={a.id}
                  control={<Radio disabled={submitting} />}
                  label={a.text}
                />
              ))}
            </RadioGroup>
          )}
        </FormControl>

        <Box display="flex" gap={2} mt={3}>
          <Button
          color="inherit"
            onClick={() => setStep(prev => Math.max(prev - 1, 0))}
            disabled={step === 0 || submitting}
            variant="outlined"
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={submitting || !answer.length || !!activeDialog}
            variant="contained"
            sx={{ minWidth: 120,borderRadius: 2, fontWeight: 600 , bgcolor: seeGreen }}
          >
            {submitting ? (
              <CircularProgress size={22} color="inherit" />
            ) : step < questions.length - 1 ? "Next" : "Finish"}
          </Button>
        </Box>
      </Box>

     
      <Dialog
        open={!!activeDialog}
        onClose={handleDialogClose}
        TransitionComponent={Slide}
        maxWidth="xs"
        fullWidth
        keepMounted
        aria-labelledby="alert-dialog-title"
      >
        {activeDialog?.type === "alert" ? (
          <>
            <DialogTitle sx={{ bgcolor: "#fcd7d7ff",fontSize: 21 }}>
             <Typography fontWeight={600} fontSize={"26px"} color="red">
              Emergency Alert!
             </Typography>
            </DialogTitle>
            <DialogContent sx={{ bgcolor: "#fff6f6" }}>
              <Alert severity="error" sx={{ mb: 2, fontWeight: 600, fontSize: 17 }}>
                {activeDialog.text || "Alert!"}
              </Alert>
              <Typography variant="body2" color="red" fontWeight={700}>
                {activeDialog.contactInfo && `Contact: ${activeDialog.contactInfo}`}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ bgcolor: "#fff6f6" }}>
              <Button onClick={handleDialogClose} variant="contained" color="error" sx={{ fontWeight: 700 }}>Close</Button>
            </DialogActions>
          </>
        ) : activeDialog?.type === "instruction" ? (
          <>
            <DialogTitle sx={{ bgcolor: "#fff5d4ff", color: "#ad8506", fontWeight: 800, fontSize: 21 }}>
           <Typography fontWeight={600} fontSize={"26px"} color="warning">
               Important Instruction
           </Typography>
            </DialogTitle>
            <DialogContent sx={{ bgcolor: "#fffbe6" }}>
              <Alert severity="warning" sx={{ mb: 2, fontWeight: 600, fontSize: 17, bgcolor: "#fffde7" }}>
                {activeDialog.text || "Please follow the instructions provided."}
              </Alert>
            </DialogContent>
            <DialogActions sx={{ bgcolor: "#fffbe6" }}>
              <Button onClick={handleDialogClose} variant="contained" color="warning" sx={{ fontWeight: 700 }}>Close</Button>
            </DialogActions>
          </>
        ) : null}
      </Dialog>
    </Box>
  );
}
