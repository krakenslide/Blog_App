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
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CreatePost() {
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [publishError, setPublishError] = useState(null);
  const [isNewCategory, setIsNewCategory] = useState(false);

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
      const res = await fetch(
        "https://blog-app-8j8t.onrender.com/api/posts/create",
        {
          method: "POST",
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

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        "https://blog-app-8j8t.onrender.com/api/posts/categories",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const categories = await res.json();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-3 max-w-3xl mx-auto min-h-screen"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center text-3xl my-7 font-semibold"
      >
        Create a post
      </motion.h1>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-4 sm:flex-row justify-between"
        >
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) => {
              const value = e.target.value;
              setFormData({ ...formData, category: value });
              setIsNewCategory(value === "new_category");
            }}
            defaultValue="uncategorized"
          >
            <option value="uncategorized">Select category</option>
            {categories &&
              categories.length > 0 &&
              categories.map((category, index) => (
                <option key={index} value={category.category}>
                  {category.category}
                </option>
              ))}
            <option value="new_category">New Category</option>
          </Select>

          {isNewCategory && (
            <TextInput
              type="text"
              placeholder="Enter new category"
              required
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3"
        >
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
        </motion.div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ReactQuill
            theme="snow"
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
        </motion.div>
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
            Publish
          </Button>
        </motion.div>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </motion.form>
    </motion.div>
  );
}

export default CreatePost;
