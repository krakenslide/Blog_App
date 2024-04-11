import React from "react";
import { Footer } from "flowbite-react";
import { motion } from "framer-motion";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { ImProfile } from "react-icons/im";

export default function FooterComponent() {
  const iconVariants = {
    hover: {
      scale: 1.2,
    },
  };

  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="flex flex-row sm:flex-col-1 w-full max-w-7xl mx-auto">
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            target="_blank"
            rel="noopener noreferrer"
            href="#"
            by="Ankit Mukhopadhyay"
            year={new Date().getFullYear()}
          />
        </div>
        <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
          <motion.a
            href="https://www.linkedin.com/in/ankitmukhopadhyay/"
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariants}
            whileHover="hover"
          >
            <BsLinkedin />
          </motion.a>
          <motion.a
            href="https://github.com/krakenslide"
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariants}
            whileHover="hover"
          >
            <BsGithub />
          </motion.a>
          <motion.a
            href="https://ankitmukhopadhyay.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariants}
            whileHover="hover"
          >
            <ImProfile />
          </motion.a>
        </div>
      </div>
    </Footer>
  );
}
