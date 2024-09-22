import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/authContext";
import {jwtDecode} from "jwt-decode"; // Ensure you have this package

const PostForm = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.role !== "admin") return; // Restrict access to admins only

    // Decode the token to get the user ID
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token); // Decode the token
    const authorId = decodedToken.id; // Assuming the user ID is stored in the token as "id"

    try {
      await axios.post(
        "http://localhost:5000/posts",
        {title, content, author: authorId }, // Use the extracted user ID
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Post created successfully by ${authorId}`);
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error
    }
  };

  return (
    <div className="max-w-md mx-auto p-5">
      <h2 className="text-2xl mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
