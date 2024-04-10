import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

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
          `/api/posts/getposts?userId=${currentUser._id}`,
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
        `/api/posts/getposts?userId=${currentUser._id}&startIndex=${startIndex}`,
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
      const res = await fetch(`/api/posts/deletepost/${postIdToDelete}`, {
        method: "DELETE",
      });

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
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className="divide-y" key={post._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
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
                  <Table.Cell>
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
    </div>
  );
}

export default DashPosts;
