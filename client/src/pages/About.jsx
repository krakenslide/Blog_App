import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";

import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiTypescript,
  SiAngular,
  SiDotnet,
  SiMicrosoftsqlserver,
  SiExpress,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

export default function About() {
  const { theme } = useSelector((state) => state.theme);
  const heroImageDark =
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXZmMTl6ZnJmeXc1bmdhdWFzdGpxeHN6aDVyZ280Nzlkc2wyb20yZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hWXNXXSXNcJ5l2ocZ3/giphy.gif";

  const heroImageLight =
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExemMzYndjZ3hhdXhhOWR0YWN2dXZmYm41ZnE2ejNwcHo2YnE4OWVwbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/chESHINZYVFWfm2rdT/giphy.gif";

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 1.5]);

  return (
    <div
      className={
        "font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-200 overflow-x-hidden"
      }
    >
      {/* Parallax Section */}
      <motion.div
        className="bg-cover bg-center h-screen flex flex-col items-center justify-center text-white relative"
        style={{
          backgroundImage:
            theme === "dark"
              ? `url(${heroImageDark})`
              : `url(${heroImageLight})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          transform: `scale(${scale})`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6">About Me</h1>
          <p className="text-lg">
            I'm Ankit, a passionate developer on a journey to explore and master
            various technologies.
          </p>
        </motion.div>
      </motion.div>

      {/* Tech Stack Section */}
      <div className="container mx-auto py-16">
        <h2
          className={
            "text-4xl font-bold mb-8 text-center text-gray-600 dark:text-gray-200"
          }
        >
          Technologies worked with
        </h2>
        <div className="grid grid-cols-5 gap-8 justify-items-center">
          <TechStack
            icon={<SiReact className="text-6xl text-blue-500 mb-2" />}
            name="React"
            shadow="shadow-blue-500"
            theme={theme}
          />
          <TechStack
            icon={<SiExpress className="text-6xl text-black-500 mb-2" />}
            name="Express"
            shadow={theme === "dark" ? "shadow-white" : "shadow-black"}
            theme={theme}
          />
          <TechStack
            icon={<SiNodedotjs className="text-6xl text-green-500 mb-2" />}
            name="Node.js"
            shadow="shadow-green-500"
            theme={theme}
          />
          <TechStack
            icon={<SiMongodb className="text-6xl text-green-500 mb-2" />}
            name="MongoDB"
            shadow="shadow-green-500"
            theme={theme}
          />
          <TechStack
            icon={<SiJavascript className="text-6xl text-yellow-400 mb-2" />}
            name="JavaScript"
            shadow="shadow-yellow-400"
            theme={theme}
          />
          <TechStack
            icon={<SiTypescript className="text-6xl text-blue-500 mb-2" />}
            name="TypeScript"
            shadow="shadow-blue-500"
            theme={theme}
          />
          <TechStack
            icon={<SiAngular className="text-6xl text-red-500 mb-2" />}
            name="Angular"
            shadow="shadow-red-500"
            theme={theme}
          />
          <TechStack
            icon={
              <SiMicrosoftsqlserver className="text-6xl text-green-500 mb-2" />
            }
            name="SQL Server"
            shadow="shadow-green-500"
            theme={theme}
          />
          <TechStack
            icon={<SiDotnet className="text-6xl text-purple-500 mb-2" />}
            name=".NET Core"
            shadow="shadow-purple-500"
            theme={theme}
          />
          <TechStack
            icon={<TbBrandCSharp className="text-6xl text-purple-500 mb-2" />}
            name="C#"
            shadow="shadow-purple-500"
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}

const TechStack = ({ icon, name, shadow, theme }) => (
  <motion.div
    className={`rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-6 flex flex-col items-center justify-center w-full h-full ${shadow} ${
      theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    <p className="text-xl font-semibold mt-4">{name}</p>
  </motion.div>
);
