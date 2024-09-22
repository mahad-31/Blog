// src/components/EditPostForm.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authContext";

const EditPostForm = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:5000/posts/${id}`);
      setPost(response.data);
      setTitle(response.data.title);
      setContent(response.data.content);
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.role !== "admin") return; // Restrict access to admins only

    try {
      await axios.put(
        `http://localhost:5000/posts/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Redirect or show success message
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-5">
      <h2 className="text-2xl mb-4">Edit Post</h2>
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
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPostForm;
