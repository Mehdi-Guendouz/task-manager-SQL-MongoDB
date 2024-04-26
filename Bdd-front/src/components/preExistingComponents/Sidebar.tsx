import { History, Home } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

export function SideBar() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const data = JSON.parse(token || "{}");
  const user = data.user;
  const navigate = useNavigate();

  // Define a function to determine if a link should be styled as active/hovered

  const isActiveLink = (path: string) => {
    return location.pathname.split("/")[1] === path;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="hidden border-r bg-muted/40 md:flex flex-col">
      {/* logo */}
      <div>
        <Link to="/" className="flex items-center  p-4">
          <h1 className="text-2xl font-semibold text-primary">GDone</h1>
        </Link>
      </div>
      <Separator />
      <div className="flex h-full flex-col gap-2 py-4">
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
            <Link
              to={"/"}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:bg-black hover:text-white duration-300 ",
                isActiveLink("") &&
                  "bg-black text-white hover:bg-gray-900 hover:text-white"
              )}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              to={"/history"}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:bg-black hover:text-white duration-300 ",
                isActiveLink("history") &&
                  "bg-black text-white hover:bg-gray-700 hover:text-white"
              )}
            >
              <History className="h-4 w-4" />
              History
            </Link>
          </nav>
        </div>
      </div>
      {/* <Separator /> */}
      <div className="flex items-center justify-start  gap-2 px-4 py-8">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="bg-black text-white capitalize">
            {user?.name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-sm font-semibold text-muted-foreground">
            {user?.name || "mehdi"}
          </h1>
          <p className="text-xs text-muted-foreground">
            {user?.email || "mehdi@gmail.com"}
          </p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div
          onClick={handleLogout}
          className="flex text-base items-center gap-3 px-3 py-3 rounded-lg font-bold transition-all hover:bg-red-500 bg-red-700 text-white hover:text-white duration-300 cursor-pointer"
        >
          Log Out
        </div>
      </div>
    </div>
  );
}
