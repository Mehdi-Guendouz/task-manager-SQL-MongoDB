import { axiosInstance } from "@/api/config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/hooks/user-store";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // state management for the user

  const userStore = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");

    // Check if the user is already authenticated
    if (tokenLocalStorage) {
      userStore.setToken(tokenLocalStorage);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenLocalStorage}`;

      // Redirect the user only if the current location is the login page
      if (location.pathname === "/register") {
        navigate("/");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axiosInstance
      .post("/user/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.data));
        setEmail("");
        setPassword("");
        setError("");
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Toaster richColors />
      <Card className="mx-auto max-w-sm  shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?
            <Link to={"/register"} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
