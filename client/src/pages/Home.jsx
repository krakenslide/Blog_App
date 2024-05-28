import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction.jsx";
import PostCard from "../components/PostCard.jsx";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 1.5]);
  const { theme } = useSelector((state) => state.theme);
  const heroImageDark =
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnkxMmI4NGtmNzZzaW1nYXY5N2llbG90bGpydjV6M2V1anZobjZ0ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/h1eM0TJLW1r81cQ2F4/giphy.gif";
  const heroImageLight =
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzV6d3M1Y2ZnN2ozMXBreXFzcjZxc3BuZHFweG80YnU5dzJ0Mnc3YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5FM34bwCph7q4lnuhZ/giphy.gif";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://blog-app-8j8t.onrender.com/api/posts/getposts?limit=9`,
        );
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Welcome Section with Background */}
      <motion.div
        className="bg-cover bg-center h-screen flex items-center justify-center text-black dark:text-white relative"
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6">Welcome to my Blog</h1>
          <p className="text-lg">Discover amazing stories and insights.</p>
          <Link
            to="/search"
            className="text-sm text-teal-500 font-bold hover:underline mt-4"
          >
            Explore More
          </Link>
        </motion.div>
      </motion.div>

      {/* CallToAction Section */}
      <div className="flex-grow px-8 md:px-10 py-10">
        <CallToAction />
      </div>

      {/* Recent Posts Section */}
      <div className=" flex items-center justify-center px-8 md:px-9 py-7">
        {posts && posts.length > 0 ? (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Recent Posts
            </h2>
            <div className="flex flex-wrap items-start justify-center gap-6">
              {/*flex-wrap items-start*/}
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 p-3 hover:underline text-center block"
            >
              View all Posts
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md"
          >
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
            <p className="text-lg font-medium text-gray-700 text-center">
              Please wait. The posts take around 2 mins to load the first time.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
