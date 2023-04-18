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
        <Route path="/detail/:id" element={<Details user={user} />} />
        <Route
          path="/create"
          element={
            user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/update/:id"
          element={
            user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/auth" />
          }
        />
        <Route path="/auth" element={<Auth user={user} />} />
        <Route path="*" element={<NotFound user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
