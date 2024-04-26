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
import { toast, Toaster } from "sonner";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userStore = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    const data = JSON.parse(tokenLocalStorage || "{}");

    // Check if the user is already authenticated
    if (data.token) {
      userStore.setToken(data.token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;

      // Redirect the user only if the current location is the login page
      if (location.pathname === "/register") {
        navigate("/");
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ fullName, email, password });

    // check the password length
    if (password.length < 6) {
      setError("Password should be at least 6 characters long");
      return;
    }
    setLoading(true);
    axiosInstance
      .post("/user/register", { name: fullName, email, password })
      .then((res) => {
        console.log(res.data);
        setEmail("");
        setFullName("");
        setPassword("");
        toast.success("Account created successfully");
        const tokenObject = {
          token: res.data.data.token,
          user: res.data.data.user,
        };
        localStorage.setItem("token", JSON.stringify(tokenObject));
        userStore.setToken(res.data.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });

    // Call the API to create a new user
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Toaster richColors />
      <Card className="mx-auto max-w-sm w-full shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="full-name">full name</Label>
              <Input
                id="full-name"
                placeholder="Mehdi"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm capitalize">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
