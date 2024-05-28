import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice.js";
import { motion } from "framer-motion";
import { GiKrakenTentacle } from "react-icons/gi";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  let { currentUser } = useSelector((state) => state.user);
  if (currentUser?.findUser) {
    currentUser = currentUser.findUser;
  }

  const { theme } = useSelector((state) => state.theme);
  const handleSignOut = async () => {
    try {
      const res = await fetch(
        `https://blog-app-8j8t.onrender.com/api/auth/signout`,
        {
          credentials: "include",
          method: "POST",
        },
      );

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="!dark:bg-black border-b-2 border-teal-500">
      <Link to="/" className="flex items-center self-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
              backgroundColor: ["#FF6B6B", "#FFA500", "#FFD700"],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white p-0.5 rounded-full mr-1"
          >
            <GiKrakenTentacle className="text-lg sm:text-xl md:text-2xl lg:text-3xl" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold dark:text-white"
          >
            Standard Kraken Blog
          </motion.span>
        </motion.div>
      </Link>
      <form className="cursor-pointer" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></TextInput>
      </form>
      <Button
        type="submit"
        className="w-12 h-10 lg:hidden"
        color="gray"
        pill
        onClick={handleSubmit}
      >
        <AiOutlineSearch />
      </Button>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex gap-2 md:order-2"
      >
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </motion.div>
      <Navbar.Collapse>
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/about");
          }}
        >
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/projects");
          }}
        >
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
