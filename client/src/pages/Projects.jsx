import React from "react";
import { Button } from "flowbite-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function Projects() {
  const sideImage =
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExazkza3F0cHBwdHFucnM5amI5czdhNXNsOWs1dGd6OXFwdm4xOHNyZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qgQUggAC3Pfv687qPC/giphy.gif";

  const heroImageDark =
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDR6NHN5ZnVzZHFxZHBnNDBhenkyb2V6NjU4YXR6aWMyZjV3ZGp2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3osxY9kuM2NGUfvThe/giphy.gif";

  const heroImageLight =
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGd1YmY5OGV6cjkzeDY4b3A1OGV0Zmd6d2x0aHBzMXpmb2Fibm50MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2QE2buzULWxfb9qo/giphy.gif";

  const { theme } = useSelector((state) => state.theme);
  const backgroundStyle = {
    backgroundImage:
      theme === "dark" ? `url(${heroImageDark})` : `url(${heroImageLight})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="p-3 flex flex-col items-center justify-center max-w-full min-h-screen text-white"
      style={backgroundStyle}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl mx-auto"
      >
        <div className="flex flex-col items-center justify-center text-teal-500 lg:w-1/2 p-10 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-4">Projects Coming Soon</h1>
            <h2 className="text-2xl mb-8">Stay tuned for exciting updates!</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl mb-4">Check out Ankit's GitHub</h2>
            <motion.a
              as="a"
              href="https://github.com/ankitjain28may"
              target="_blank"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 hover:bg-teal-600 transition-colors duration-300 rounded-md text-white text-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="mr-2" />
              Visit GitHub
            </motion.a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col lg:w-1/2 items-center justify-center"
        >
          <img
            src={sideImage}
            alt="Hero Image"
            className="rounded-lg shadow-lg w-full max-h-96 object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
