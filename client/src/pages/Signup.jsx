import axios from "axios";
import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const backendUrl = "http://localhost:5000"; // ✅ Dynamic backend URL
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    // profilePhoto: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // ✅ Handle Radio Button Change (Student / Educator)
  const handleRoleChange = (e) => {
    setInput({ ...input, role: e.target.value });
  };

  // ✅ Handle File Upload
  const handleFileChange = (e) => {
    setInput({ ...input, profilePhoto: e.target.files[0] });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(input);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);

    // if (input.profilePhoto) {
    //   formData.append("profilePhoto", input.profilePhoto);
    // }

    try {
      const res = await axios.post(
        `${backendUrl}/api/user/register`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  //  finally {
  //   setIsSubmitting(false); // ✅ Hide loading state
  // }

  // ✅ Validate Form Fields
  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name.trim()) {
      errors.name = "Full name is required!";
    }
    if (!values.email.trim()) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed 10 characters!";
    }
    if (!values.role) {
      errors.role = "Please select a role!";
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
        <div className="w-full max-w-lg p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
          {Object.keys(formErrors).length === 0 && isSubmitting && (
            <div className="text-green-500 mb-4">Signing up...</div>
          )}

          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>

            {/* Full Name Input */}
            <div className="mb-6">
              <label className="block text-base font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Full name"
                value={input.name}
                onChange={handleChange}
              />
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-base font-semibold">Email</label>
              <input
                type="text"
                name="email"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={input.email}
                onChange={handleChange}
              />
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-base font-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={input.password}
                onChange={handleChange}
              />
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            </div>

            {/* Role Selection */}
            <div className="flex gap-4">
              <input
                type="radio"
                name="role"
                value="student"
                onChange={handleRoleChange}
              />
              <span>Student</span>
              <input
                type="radio"
                name="role"
                value="educator"
                onChange={handleRoleChange}
              />
              <span>Educator</span>
            </div>

            {/* Profile Photo Upload */}
            {/*<input type="file" accept="image/*" onChange={handleFileChange} />*/}

            <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 mt-4">
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
