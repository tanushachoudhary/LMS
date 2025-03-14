import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { jwtDecode } from "jwt-decode"; // Correct import for decoding JWT

const Navbar = () => {
  const { user, setUser, isEducator, setIsEducator, backendUrl, getToken } =
    useContext(AppContext);
  const navigate = useNavigate();
  const isCourseListPage = location.pathname.includes("/course-list");

  // Function to become an educator
  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }

      const token = getToken();
      if (!token) {
        toast.error("You need to log in first.");
        return;
      }

      const { data } = await axios.get(
        `${backendUrl}/api/educator/update-role`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear JWT token from storage

    setUser(null); // Reset user context
    navigate("/"); // Redirect to login page
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    setIsEducator(user?.role === "educator"); // ✅ Update `isEducator` when user changes
  }, [user]);

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 z-100 py-3 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="hidden md:flex items-center gap-5">
          {user && (
            <>
              <button onClick={() => navigate(isEducator ? "/educator" : "/")}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              &nbsp;|&nbsp;
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>

        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user?.profile?.profilePhoto || assets.user_icon}
                  alt="Profile"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="flex items-center gap-4 p-4">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || assets.user_icon}
                    alt="Profile"
                  />
                </Avatar>
                <div>
                  <h4 className="font-medium">{user?.fullname}</h4>
                  <p className="text-sm text-muted-foreground">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>
              <div className="border-t p-4">
                {user.role === "student" && (
                  <Link to="/profile" className="flex items-center -ml-1 gap-3">
                    <User2 />
                    <span>View Profile</span>
                  </Link>
                )}
                <div className="flex items-center gap-2 cursor-pointer">
                  <LogOut />
                  <span onClick={handleLogout} className="cursor-pointer">
                    Logout
                  </span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button onClick={becomeEducator}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              &nbsp;&nbsp;|&nbsp;
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user?.profile?.profilePhoto || assets.user_icon}
                  alt="Profile"
                />
              </Avatar>
            </PopoverTrigger>
          </Popover>
        ) : (
          <Link to="/login">
            <img src={assets.user_icon} alt="Login" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
