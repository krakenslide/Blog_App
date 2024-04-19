import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TbUsersGroup } from "react-icons/tb";
import { HiArrowUp } from "react-icons/hi";
import { LiaCommentsSolid } from "react-icons/lia";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  let { currentUser } = useSelector((state) => state.user);
  if (currentUser?.findUser) {
    currentUser = currentUser.findUser;
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser.isAdmin) {
        try {
          const res = await fetch(
            `https://blog-app-8j8t.onrender.com/api/user/getusers?limit=5`,
            {
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
            },
          );
          const data = await res.json();
          if (res.ok) {
            setUsers(data.users);
            setTotalUsers(data.totalUsers);
            setLastMonthUsers(data.lastMonthUsers);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    const fetchPosts = async () => {
      if (currentUser.isAdmin) {
        try {
          const res = await fetch(
            `https://blog-app-8j8t.onrender.com/api/posts/getposts?limit=5`,
            {
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
            },
          );
          const data = await res.json();
          if (res.ok) {
            setPosts(data.posts);
            setTotalPosts(data.totalPosts);
            setLastMonthPosts(data.lastMonthPosts);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    const fetchComments = async () => {
      if (currentUser.isAdmin) {
        try {
          const res = await fetch(
            `https://blog-app-8j8t.onrender.com/api/comment/getcommentsdash?limit=5`,
            {
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
            },
          );
          const data = await res.json();
          const userPromises = data.comments.map(async (comment) => {
            const userRes = await fetch(
              `https://blog-app-f85t.onrender.com/api/user/getuserpublicroute/${comment.userId}`,
            );
            if (userRes.ok) {
              const userData = await userRes.json();
              return userData;
            }
          });
          const userData = await Promise.all(userPromises);
          const commentsWithUserData = data.comments.map((comment, index) => ({
            ...comment,
            user: userData[index],
          }));
          if (res.ok) {
            setComments(commentsWithUserData);
            setTotalComments(data.totalComments);
            setLastMonthComments(data.lastMonthComments);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    if (currentUser.isAdmin) {
      fetchUser();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        {/* Statistics cards */}
        <motion.div
          className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <TbUsersGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiOutlineClipboardDocument className="bg-purple-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <LiaCommentsSolid className="bg-pink-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </motion.div>
      </div>

      {/* Tables section */}
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <motion.div
          className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button outline gradientDuoTone="cyanToBlue">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>UserName</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </motion.div>

        <motion.div
          className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Button outline gradientDuoTone="cyanToBlue">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt="user"
                        className="w-14 h-10 rounded-md bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{post.title}</Table.Cell>
                    <Table.Cell className="w-5">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </motion.div>

        <motion.div
          className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button outline gradientDuoTone="cyanToBlue">
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Updated at</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    <Table.Cell>{comment.user.username}</Table.Cell>
                    <Table.Cell>
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </motion.div>
      </div>
    </div>
  );
}

export default DashboardComp;
