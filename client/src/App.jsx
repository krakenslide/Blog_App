import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Header from "./components/Header";
import Projects from "./pages/Projects";
import FooterComponent from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import UpdatePost from "./pages/UpdatePosts.jsx";
import PostPage from "./pages/PostPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Search from "./pages/Search.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/updatepost/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postslug" element={<PostPage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}
