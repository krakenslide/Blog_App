import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { motion } from "framer-motion";
import { GiKrakenTentacle } from "react-icons/gi";

const heroImageDark =
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzIzOGpka2RscXVjOWk0YWh4bmJwejU5dHI5ZG56bjdyZDRzZDR3MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d2Z6aAm3Z2GdLrHi/giphy.gif";
const heroImageLight =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnBxMzE3cXE3c3A4cmZjaHFhOWttZmx6bmw5ZnE5MTV3Z3cyZXcwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TlK63EChAGgxq7kTcFW/giphy.gif";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const cookieTest = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://blog-app-8j8t.onrender.com/api/auth/cookietest`,
      {
        credentials: "include",
        method: "POST",
      },
    );
    const data = await res.json();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (data.success === true) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundImage:
          theme === "dark" ? `url(${heroImageDark})` : `url(${heroImageLight})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl p-8 w-full max-w-md mx-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-center mb-8">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              backgroundColor: ["#FF6B6B", "#FFA500", "#FFD700"],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white p-2 rounded-full mr-2"
          >
            <GiKrakenTentacle className="text-4xl" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold dark:text-white"
          >
            Kraken Blog
          </motion.span>
        </div>
        <motion.form
          className="space-y-4"
          onSubmit={handleSubmit}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div>
            <Label
              value="Your Email"
              className="text-gray-700 dark:text-gray-300"
            />
            <TextInput
              type="email"
              placeholder="name@company.com"
              id="email"
              className="dark:bg-gray-800 dark:text-gray-300"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label
              value="Your Password"
              className="text-gray-700 dark:text-gray-300"
            />
            <TextInput
              type="password"
              placeholder="********"
              id="password"
              className="dark:bg-gray-800 dark:text-gray-300"
              onChange={handleChange}
            />
          </div>
          <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <OAuth />
        </motion.form>
        <Button onClick={cookieTest}>Cookie Test</Button>
        <motion.div
          className="flex justify-between items-center text-gray-700 dark:text-gray-300 mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <span>Don&apos;t have an account?</span>
          <Link
            to="/signup"
            className="text-[#7b1fa2] dark:text-[#1769aa] font-medium"
          >
            Sign Up
          </Link>
        </motion.div>
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </motion.div>
    </motion.div>
  );
}
