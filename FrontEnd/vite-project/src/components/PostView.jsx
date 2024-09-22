// src/components/PostView.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:5000/posts/${id}`);
      setPost(response.data);
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default PostView;
