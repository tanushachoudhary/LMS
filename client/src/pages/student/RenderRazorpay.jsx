import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const RenderRazorpay = ({ orderId, amount, currency, courseId }) => {
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const displayRazorpay = async () => {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Check your connection.");
        return;
      }

      // Get the JWT token from localStorage or state
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        alert("You are not logged in. Please log in to proceed.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_g3QeTedZmzH4aJ",
        amount: amount * 100,
        currency,
        name: "Edemy",
        order_id: orderId,
        handler: async (response) => {
          console.log("Razorpay Payment Response:", response); // ✅ Debugging log

          try {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: courseId,
            };

            console.log("Sending Payment Data:", paymentData); // ✅ Debugging log

            await axios.post(
              "http://localhost:5000/api/payment/paymentVerification",
              paymentData,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );

            alert("Payment Successful! You are now enrolled.");
            navigate("/"); // Navigate to the home page or other page after success
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Tanusha",
          email: "abc@example.com",
          contact: "92233972199",
        },
        theme: { color: "#0066ff" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };

    displayRazorpay();
  }, [orderId, amount, currency, courseId, navigate]);

  return null;
};

export default RenderRazorpay;
