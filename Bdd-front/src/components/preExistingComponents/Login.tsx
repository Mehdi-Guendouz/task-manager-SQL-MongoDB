// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { axiosInstance } from "@/api/config";
// import { useState } from "react";

// export function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     axiosInstance
//       .post("/login", { email, password })
//       .then((res) => {
//         localStorage.setItem("token", JSON.stringify(res.data));
//         setEmail("");
//         setPassword("");
//         setError("");
//         navigate("/");
//       })
//       .catch((err) => {
//         setError(err.response.data.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };
//   return (
//     <Card className="mx-auto max-w-sm">
//       <CardHeader>
//         <CardTitle className="text-2xl">Login</CardTitle>
//         <CardDescription>
//           Enter your email below to login to your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="grid gap-4">
//           <div className="grid gap-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="m@example.com"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={loading}
//             />
//           </div>
//           <div className="grid gap-2">
//             <div className="flex items-center">
//               <Label htmlFor="password">Password</Label>
//               <Link to="#" className="ml-auto inline-block text-sm underline">
//                 Forgot your password?
//               </Link>
//             </div>
//             <Input
//               id="password"
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <Button type="submit" className="w-full">
//             Login
//           </Button>
//           {error && (
//             <div className="text-red-500 text-sm text-center">{error}</div>
//           )}
//         </form>
//         <div className="mt-4 text-center text-sm">
//           Don&apos;t have an account?{" "}
//           <Link to="#" className="underline">
//             Sign up
//           </Link>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
