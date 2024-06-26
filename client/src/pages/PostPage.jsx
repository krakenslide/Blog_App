import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import "highlight.js/styles/dark.css";
import CallToAction from "../components/CallToAction.jsx";
import { useSelector } from "react-redux";
import CommentSection from "../components/CommentSection.jsx";
import PostCard from "../components/PostCard.jsx";
import { motion } from "framer-motion";

function PostPage() {
  const { postslug } = useParams();
  let { currentUser } = useSelector((state) => state.user);
  if (currentUser?.findOne) {
    currentUser = currentUser.findOne;
  }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recentPosts, setRecentPosts] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://blog-app-8j8t.onrender.com/api/posts/getposts?slug=${postslug}`,
        );
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postslug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(
          `https://blog-app-8j8t.onrender.com/api/posts/getposts?limit=3`,
        );
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-sans-Helvetica max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button gradientDuoTone="cyanToBlue" pill size="xs" outline>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] mx-auto object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)}mins to read
        </span>
      </div>
      <div className="ql-snow">
        <div
          className="p-3 max-w-2xl mx-auto w-full post-content"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>
      </div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post?._id} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center items-center mb-5"
      >
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className="flex flex-col md:flex-row gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </motion.div>
    </main>
  );
}

export default PostPage;
