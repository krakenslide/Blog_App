import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiTypescript,
  SiAngular,
  SiDotnet,
  SiExpress,
  SiLevelsdotfyi,
  SiSpring,
  SiSpringboot,
  SiApachemaven,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { IoSchool } from "react-icons/io5";
import { MdWork } from "react-icons/md";
import { RiMentalHealthFill } from "react-icons/ri";
import { FaGitAlt, FaJava } from "react-icons/fa";

export default function About() {
  const { theme } = useSelector((state) => state.theme);
  const heroImageDark =
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXpkeXkycHkzcm81dnA0Y2NncmVyZW5ncGxqeTNjYm1yM2VtdHZ3bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3osxYzuMvUJJcqzND2/giphy.gif";
  const heroImageLight =
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzV5cnR2ZW9hcDgzYnlpNDZ6NTYzdzJwd2JnNDAwemZyMDgwdG84bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vReTmBHnPsC4oHS/giphy.gif";

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
          className="text-center p-3"
        >
          <h1 className="text-5xl font-bold mb-6 text-gray-200 dark:text-gray-500">
            About Me
          </h1>
          <p className="text-lg text-gray-200 dark:text-gray-500">
            I'm Ankit, a passionate developer on a journey to explore and master
            various technologies.
          </p>
        </motion.div>
      </motion.div>
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
          className="text-center max-w-3xl"
        >
          <h1 className="text-5xl font-bold mb-6 text-gray-200 dark:text-gray-500">
            Description
          </h1>
          <p className="text-md m-5 p-5 text-gray-200 dark:text-gray-500">
            Much like the iconic DVD logo bouncing around the screen, I'm
            navigating the diverse corners of technology, never settling in one
            place for too long. Here today, exploring tomorrow - a perpetual
            journey through the digital landscape. With a background in .NET,
            C#, Angular, and TypeScript, I've embarked on a journey to
            specialize in the MERN stack (MongoDB, Express.js, React, Node.js).
            I've honed my skills as a full stack developer, crafting robust and
            scalable web applications while staying adaptable to the
            ever-changing landscape of web development.
          </p>
        </motion.div>
      </motion.div>

      {/* Tech Stack Section */}
      <motion.div
        className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center text-white relative"
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
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="container min-h-screen mx-auto py-16">
          <h2
            className={
              "text-4xl font-bold mb-8 text-center text-gray-200 dark:text-gray-500"
            }
          >
            Technologies worked with
          </h2>
          <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
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
            <TechStack
              icon={<FaGitAlt className="text-6xl text-orange-600 mb-2" />}
              name="Git"
              shadow="shadow-orange-600"
              theme={theme}
            />
          </div>
        </div>
      </motion.div>
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
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="container mx-auto py-16">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-200 dark:text-gray-500">
            Technologies currently learning
          </h2>
          <div className="p-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            <TechStack
              icon={<FaJava className="text-6xl text-red-500 mb-2" />}
              name="Java"
              shadow="shadow-red-500"
              theme={theme}
            />
            <TechStack
              icon={<SiSpring className="text-6xl text-green-500 mb-2" />}
              name="Spring"
              shadow="shadow-green-500"
              theme={theme}
            />
            <TechStack
              icon={<SiSpringboot className="text-6xl text-green-500 mb-2" />}
              name="Spring Boot"
              shadow="shadow-green-500"
              theme={theme}
            />
            <TechStack
              icon={<SiApachemaven className="text-6xl text-orange-500 mb-2" />}
              name="Maven"
              shadow="shadow-orange-500"
              theme={theme}
            />
          </div>
        </div>
      </motion.div>
      <div
        className={
          "font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-200 overflow-x-hidden"
        }
      >
        <div className="flex items-center justify-center pt-10">
          <h2
            className={
              "text-4xl font-bold mb-8 text-center text-gray-700 dark:text-gray-500"
            }
          >
            Professional Timeline
          </h2>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 m-10 p-7 rounded-lg shadow-lg">
          <VerticalTimeline
            className={`${theme === "dark" ? "dark:text-white" : "text-gray-800"}`}
            lineColor={theme === "dark" ? "rgb(20, 184, 166)" : "#fff"}
          >
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{
                background:
                  theme === "dark" ? "rgb(45, 55, 72)" : "rgb(255, 165, 0)",
                color: theme === "dark" ? "#fff" : "#fff",
              }}
              contentArrowStyle={{
                borderRight: `7px solid ${
                  theme === "dark" ? "rgb(20, 184, 166)" : "rgb(255, 165, 0)"
                }`,
              }}
              date={
                <span
                  style={{
                    color: theme === "dark" ? "#fff" : "rgb(255, 165, 0)",
                  }}
                >
                  2023 - Present
                </span>
              }
              iconStyle={{
                background:
                  theme === "dark" ? "rgb(45, 55, 72)" : "rgb(255, 165, 0)",
                color: "#fff",
              }}
              icon={<SiLevelsdotfyi />}
            >
              <h3 className="vertical-timeline-element-title font-bold">
                Continuous Learning and Growth
              </h3>
              <p>
                &bull; Spent dedicated time enhancing skills and exploring new
                opportunities in the ever-evolving landscape of technology and
                business.
                <br />
                &bull; Learning by building projects
                <br />
                &bull; On a look out for new opportunities
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{
                background:
                  theme === "dark" ? "rgb(45, 55, 72)" : "rgb(255, 107, 107)",
                color: theme === "dark" ? "#fff" : "#fff",
              }}
              contentArrowStyle={{
                borderRight: `7px solid ${
                  theme === "dark" ? "rgb(20, 184, 166)" : "rgb(255, 107, 107)"
                }`,
              }}
              date={
                <span
                  style={{
                    color: theme === "dark" ? "#fff" : "rgb(255, 107, 107)",
                  }}
                >
                  June 2023 - Aug 2023
                </span>
              }
              iconStyle={{
                background:
                  theme === "dark" ? "rgb(45, 55, 72)" : "rgb(255, 107, 107)",
                color: "#fff",
              }}
              icon={<RiMentalHealthFill />}
            >
              <h3 className="vertical-timeline-element-title font-bold">
                Health break
              </h3>
              <p>
                Hiatus to address personal health and attend to pertinent
                personal matters.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{
                background:
                  theme === "dark" ? "rgb(45, 55, 72)" : "rgb(15, 57, 143)",
                color: theme === "dark" ? "#fff" : "#fff",
              }}
              contentArrowStyle={{
                borderRight: `7px solid ${
                  theme === "dark" ? "rgb(20, 184, 166)" : "rgb(15, 57, 143)"
                }`,
              }}
              date={
                <span
                  style={{
                    color: theme === "dark" ? "#fff" : "rgb(15, 57, 143)",
                  }}
                >
                  2022-2023
                </span>
              }
              iconStyle={{
                background:
                  theme === "dark" ? "rgb(45, 55, 72)" : "rgb(15, 57, 143)",
                color: "#fff",
              }}
              icon={<MdWork />}
            >
              <h3 className="vertical-timeline-element-title font-bold">
                Associate Software Engineer
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                GEP Worldwide
              </h4>
              <p>
                &bull; Worked on product which helps reduce user's time in data
                manipulation with drag and drop features
                <br />
                &bull; Developed and maintained a complex enterprise application
                using Angular, TypeScrip, .NET 4.5/6 and C#.
                <br />
                &bull; Collaborated with cross-functional teams to translate
                business requirements into functional features.
                <br />
                &bull; Implemented automated testing, improving software quality
                and maintaining code coverage over 90%.
              </p>
              <p className="dark:text-teal-400">
                Tech stack: .NET 4.5/6, C#, Angular, Typescript, Jira, Git
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              contentStyle={{
                background:
                  theme === "dark" ? "rgb(45, 55, 72)" : "rgb(17, 24, 38)",
                color: theme === "dark" ? "#fff" : "#fff",
              }}
              contentArrowStyle={{
                borderRight: `7px solid ${
                  theme === "dark" ? "rgb(20, 184, 166)" : "rgb(17, 24, 38)"
                }`,
              }}
              date={
                <span
                  style={{
                    color: theme === "dark" ? "#fff" : "rgb(17, 24, 38)",
                  }}
                >
                  2018-2022
                </span>
              }
              iconStyle={{
                background:
                  theme === "dark" ? "rgb(45, 55, 72)" : "rgb(17, 24, 38)",
                color: "#fff",
              }}
              icon={<IoSchool />}
            >
              <h3 className="vertical-timeline-element-title font-bold">
                Bachelor of Technology
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                Computer Science and Engineering
              </h4>
              <p>
                &bull; Graduated with a strong foundation in Machine learning,
                Computer science principles, algorithms, and programming.
                <br />
                &bull; Actively participated in coding competitions, hackathons,
                and student organizations to enhance my technical skills.
                <br />
                &bull; Completed several projects, including a capstone project
                that showcased my ability to solve real-world problems.
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>
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
