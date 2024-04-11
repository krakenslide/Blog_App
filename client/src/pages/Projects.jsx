import React from "react";
import { Button } from "flowbite-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const heroImage =
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExazkza3F0cHBwdHFucnM5amI5czdhNXNsOWs1dGd6OXFwdm4xOHNyZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qgQUggAC3Pfv687qPC/giphy.gif";

export default function Projects() {
  return (
    <div className="p-3 flex flex-col items-center justify-center max-w-full min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl mx-auto"
      >
        <div className="flex flex-col items-center justify-center text-teal-500 lg:w-1/2 p-10 bg-gray-800 rounded-lg shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-4">Projects</h1>
            <h2 className="text-2xl mb-8">Coming soon!</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl mb-4">Check out Ankit's GitHub</h2>
            <Button
              as="a"
              href="https://github.com/ankitjain28may"
              target="_blank"
              className="text-lg px-6 py-3 bg-teal-500 hover:bg-teal-600 transition-colors"
            >
              <FaGithub className="mr-2" />
              Visit GitHub
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col lg:w-1/2 items-center justify-center"
        >
          <img
            src={heroImage}
            alt="Hero Image"
            className="rounded-lg shadow-lg w-full max-h-96 object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
