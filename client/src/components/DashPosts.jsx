import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function DashPosts() {
  let { currentUser } = useSelector((state) => state.user);
  if (currentUser.findUser) {
    currentUser = currentUser.findUser;
  }
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://blog-app-f85t.onrender.com/api/posts/getposts?userId=${currentUser._id}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `https://blog-app-f85t.onrender.com/api/posts/getposts?userId=${currentUser._id}&startIndex=${startIndex}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.ok) {
        const data = await res.json(); // Parse response data
        setUserPosts((prev) => [...prev, ...data.posts]); // Update userPosts with the new fetched posts
        if (data.posts.length < 9) {
          setShowMore(false); // Hide the "Show More" button if there are no more posts to fetch
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `https://blog-app-f85t.onrender.com/api/posts/deletepost/${postIdToDelete}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1 overflow-x-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell className="w-24">Date updated</Table.HeadCell>
              <Table.HeadCell className="w-24">Post image</Table.HeadCell>
              <Table.HeadCell className="w-48">Post title</Table.HeadCell>
              <Table.HeadCell className="w-24">Category</Table.HeadCell>
              <Table.HeadCell className="w-16">Delete</Table.HeadCell>
              <Table.HeadCell className="w-16">
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className="divide-y" key={post._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="w-24">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="w-24">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="w-48">
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell className="w-24">{post.category}</Table.Cell>
                  <Table.Cell className="w-16">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      <FaTrashAlt className="text-xl ml-3 hover:text-red-600" />
                    </span>
                  </Table.Cell>
                  <Table.Cell className="w-16">
                    <Link
                      className="text-teal-500"
                      to={`/updatepost/${post._id}`}
                    >
                      <span className="font-medium text-teal-300 hover:underline cursor-pointer">
                        <FaEdit className="text-xl ml-1" />
                      </span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show More...
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet...</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header className="dark:bg-gray-900 border-t border-r border-l border-teal-500 rounded-t-lg" />
        <Modal.Body className="dark:bg-gray-900 border-b border-r border-l border-teal-500 rounded-b-lg">
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-teal-500 dark:text-teal-500 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">
              Are you sure you want to delete this post ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="flex-1 flex-grow my-3 mx-4 bg-red-500 shadow-lg shadow-red-500/50"
                color="failure"
                onClick={handleDeletePost}
              >
                Yes, Delete this Post
              </Button>
              <Button
                className="flex-1 flex-grow my-3 mx-4 bg-cyan-500 shadow-lg shadow-cyan-500/50"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </motion.div>
  );
}

export default DashPosts;
