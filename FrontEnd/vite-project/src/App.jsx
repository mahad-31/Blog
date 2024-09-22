// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import EditPostForm from "./components/EditPostForm";
import { AuthProvider } from "./context/authContext";
import Header from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      {/* Only one BrowserRouter is needed to wrap the entire routing logic */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/list" element={<PostList />} />
          <Route path="/posts/edit/:id" element={<EditPostForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
