import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { auth } from "./utils/firebase/firebase.utils";
import { signOut } from "firebase/auth";
import Navbar from "./routes/navbar/navbar.component";
import Background from "./components/background/background.component";
import Home from "./routes/home/home.component";
import Details from "./routes/details/details.component";
import AddEditBlog from "./routes/add-edit-blog/add-edit-blog.component";
import Auth from "./routes/auth/auth.component";
import NotFound from "./routes/not-found/not-found.component";
import CategoryBlogs from "./routes/category-blogs/category-blogs.component";
import TagBlogs from "./routes/tag-blogs/tag-blogs.component";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate("/auth");
    });
  };

  return (
    <div className="App">
      <Navbar user={user} handleLogout={handleLogout} />
      <Background />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/search" element={<Home user={user} />} />
        <Route path="/detail/:id" element={<Details user={user} />} />
        <Route
          path="/create"
          element={
            user ? (
              user.uid === "EDinudbR4ZWcKjb2IxP4g47CGeV2" ? (
                <AddEditBlog user={user} />
              ) : (
                <span
                  style={{
                    margin: "50px 0",
                    letterSpacing: "1px",
                    lineHeight: "1.3",
                    fontSize: "32px",
                  }}
                >
                  You're NOT allowed to add posts to this blog but you can post
                  comments to any post you want
                </span>
              )
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/update/:id"
          element={
            user && user.uid === "EDinudbR4ZWcKjb2IxP4g47CGeV2" ? (
              <AddEditBlog user={user} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path="/tag/:tag" element={<TagBlogs />} />
        <Route path="/category/:category" element={<CategoryBlogs />} />
        <Route
          path="/auth"
          element={
            user && user.uid === "EDinudbR4ZWcKjb2IxP4g47CGeV2" ? (
              <Navigate to="/create" />
            ) : (
              <Auth user={user} />
            )
          }
        />
        <Route path="*" element={<NotFound user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
