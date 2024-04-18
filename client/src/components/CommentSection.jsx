import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Modal, Textarea } from "flowbite-react";
import Comment from "./Comment.jsx";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function CommentSection({ postId }) {
  let { currentUser } = useSelector((state) => state.user);
  if (currentUser?.findUser) {
    currentUser = currentUser.findUser;
  }
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState("");
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch(
        "https://blog-app-f85t.onrender.com/api/comment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: comment,
            postId,
            userId: currentUser._id,
          }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setComment("");
      setCommentError("");
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(
          `https://blog-app-f85t.onrender.com/api/comment/getcomments/${postId}`,
        );
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }
      const res = await fetch(
        `https://blog-app-f85t.onrender.com/api/comment/likecomment/${commentId}`,
        {
          method: "PUT",
        },
      );
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c,
      ),
    );
  };

  const handleDelete = async (commentId, event) => {
    event.preventDefault();
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }
      const res = await fetch(
        `https://blog-app-f85t.onrender.com/api/comment/deletecomment/${commentId}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-500 hover:underline"
          >
            @ {currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-gray-400 flex gap-1">
          You must be signed in to comment.
          <Link to={"/signin"} className="text-teal-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-xl p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex items-center justify-between mt-5">
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="cyanToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && <Alert color={"failure"}>{commentError}</Alert>}
        </form>
      )}
      {comments.length === 9 ? (
        <p className="text-sm my-5">No comments yet !</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
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
                onClick={() => handleDelete(commentToDelete, event)}
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

export default CommentSection;
