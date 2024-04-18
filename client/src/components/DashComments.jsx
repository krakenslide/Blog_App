import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { motion } from "framer-motion";
import { BiSolidCommentMinus } from "react-icons/bi";

function DashComments() {
  let { currentUser } = useSelector((state) => state.user);
  if (currentUser.findUser) {
    currentUser = currentUser.findUser;
  }
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await fetch(
          `https://blog-app-f85t.onrender.com/api/comment/getcommentsdash`,
        );

        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComment();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `https://blog-app-f85t.onrender.com/api/comment/getcommentsdash?startIndex=${startIndex}`,
      );
      if (res.ok) {
        const data = await res.json(); // Parse response data
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `https://blog-app-f85t.onrender.com/api/comment/deletecomment/${commentIdToDelete}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete),
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      setShowModal(false);
      throw error;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>No. of Likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className="divide-y" key={comment._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 cursor-pointer"
                    >
                      <BiSolidCommentMinus className="text-xl ml-3" />
                    </span>
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
        <p>You have no comments yet...</p>
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
              Are you sure you want to delete this comment ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="flex-1 flex-grow my-3 mx-4 bg-red-500 shadow-lg shadow-red-500/50"
                color="failure"
                onClick={handleDeleteComment}
              >
                Yes, Delete this comment
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

export default DashComments;
