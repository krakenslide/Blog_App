import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";

function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const currentuser = currentUser?.findUser;
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentuser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
      }
    } catch (error) {
      setComment("");
      setCommentError("");
    }
  };
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentuser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentuser.profilePicture}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-500 hover:underline"
          >
            @ {currentuser.username}
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
      {currentuser && (
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
    </div>
  );
}

export default CommentSection;
