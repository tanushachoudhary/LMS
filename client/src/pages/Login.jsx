import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Correct import for decoding JWT

const Login = () => {
  const backendUrl = "http://localhost:5000"; // ✅ Dynamic backend URL
  const initialValues = {
    email: "",
    password: "",
    role: "",
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { setUser, setIsEducator } = useContext(AppContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRoleChange = (e) => {
    setFormValues({ ...formValues, role: e.target.value }); // Update the role based on radio button selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/login`,
        formValues,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data.success) {
        localStorage.setItem("token", data.token); // ✅ Store token
        setUser(data.user);
        setIsEducator(data.user.role === "educator");

        toast.success(data.message);
        navigate(data.user.role === "educator" ? "/educator" : "/");
      }
    } catch (error) {
      console.log(error);
      
      toast.error("Login failed.");
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.role) {
      errors.role = "Role selection is required!";
    }
    return errors;
  };
  return (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center mb-4">Log In</h1>
            <div className="mb-6">
              <label className="block text-base font-semibold">Email</label>
              <input
                type="text"
                name="email"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
              <p className="text-red-500 text-base mt-1">{formErrors.email}</p>
            </div>
            <div className="mb-6">
              <label className="block text-base font-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
              <p className="text-red-500 text-base mt-1">
                {formErrors.password}
              </p>
            </div>

            {/* Role Selection */}
            <div className="flex items-center gap-2 my-8">
              <input
                type="radio"
                name="role"
                value="student"
                id="r1"
                checked={formValues.role === "student"}
                onChange={handleRoleChange}
              />
              <span className="block text-base font-semibold cursor-pointer">
                Student
              </span>
              <input
                type="radio"
                name="role"
                value="educator"
                id="r2"
                checked={formValues.role === "educator"}
                onChange={handleRoleChange}
              />
              <span className="block text-base font-semibold cursor-pointer">
                Educator
              </span>
            </div>
            <p className="text-red-500 text-base mt-1">{formErrors.role}</p>

            <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-base">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
