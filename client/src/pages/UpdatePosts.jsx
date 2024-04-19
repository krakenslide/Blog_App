import React, { useEffect, useState } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function UpdatePost() {
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [formImage, setFormImage] = useState("");
  const { postId } = useParams();

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await fetch(
          `https://blog-app-f85t.onrender.com/api/posts/getposts?postId=${postId}`,
          { credentials: "include" },
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
          setFormImage(data.posts[0].image);
        }
      };
      fetchPosts();
    } catch (error) {
      setPublishError(error.message);
      console.log(error.message);
    }
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!files) {
        setImageUploadError("Please select an Image");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + files.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, files);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
            setFormImage(downloadURL);
          });
        },
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      throw new Error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch the existing post data from the server
      const existingPostRes = await fetch(
        `https://blog-app-f85t.onrender.com/api/posts/getposts?postId=${postId}`,
        { credentials: "include" },
      );
      const existingPostData = await existingPostRes.json();

      if (
        formData.title === existingPostData.posts[0].title &&
        formData.category === existingPostData.posts[0].category &&
        formData.content === existingPostData.posts[0].content &&
        formData.image === existingPostData.posts[0].image
      ) {
        setPublishError("No changes made to the post.");

        return;
      }

      const res = await fetch(
        `https://blog-app-f85t.onrender.com/api/posts/updatepost/${postId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <motion.div
      className="p-3 max-w-3xl mx-auto min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-center text-3xl my-7 font-semibold">Update a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">ReactJS</option>
            <option value="nodejs">NodeJS</option>
            <option value="expressjs">ExpressJS</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFiles(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="greenToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0} %`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formImage && (
          <img
            src={formImage}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Write something here..."
          className="h-72 mb-12"
          required
          modules={{
            syntax: true,
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline"],
              ["code-block"],
              [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [
                {
                  color: [
                    "black",
                    "red",
                    "green",
                    "blue",
                    "yellow",
                    "orange",
                    "purple",
                    "white",
                  ],
                },
                {
                  background: [
                    "black",
                    "red",
                    "green",
                    "blue",
                    "yellow",
                    "orange",
                    "purple",
                    "white",
                  ],
                },
              ],
              [{ align: ["", "left", "center", "right", "justify"] }],

              ["clean"],
            ],
          }}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="pt-5"
        >
          <Button
            type="submit"
            gradientDuoTone="greenToBlue"
            outline
            className="w-full"
          >
            Update post
          </Button>
        </motion.div>

        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </motion.div>
  );
}

export default UpdatePost;
