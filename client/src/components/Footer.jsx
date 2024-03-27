import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { ImProfile } from "react-icons/im";

export default function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="flex flex-row sm:flex-col-1 w-full max-w-7xl mx-auto">
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            target="\_blank"
            rel="noopener noreferrer"
            href="#"
            by="Ankit Mukhopadhyay"
            year={new Date().getFullYear()}
          />
        </div>
        <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
          <Footer.Icon
            href="https://www.linkedin.com/in/ankitmukhopadhyay/"
            icon={BsLinkedin}
            target="\_blank"
            rel="noopener noreferrer"
          />
          <Footer.Icon
            href="https://github.com/krakenslide"
            icon={BsGithub}
            target="\_blank"
            rel="noopener noreferrer"
          />
          <Footer.Icon
            href="https://ankitmukhopadhyay.netlify.app"
            icon={ImProfile}
            target="\_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
    </Footer>
  );
}
