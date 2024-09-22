import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons from react-icons

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:5000/posts");
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  // Delete post function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(`${user.role} has deleted post with id: ${id}`);
      window.location.reload();
      // Remove the deleted post from the posts state
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("There was an error deleting the post!", error);
    }
  };

  return (
    <div className="m-10">
      <h2 className="text-2xl mb-4">Blog Posts</h2>

      {user && user.role === "admin" && (
        <Link
          to="/posts/new"
          className="bg-blue-500 text-white p-2 rounded mb-4 inline-block"
        >
          Create New Post
        </Link>
      )}

      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 mb-4 rounded relative">
            <h3 className="text-xl font-bold">
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
            </h3>
            <p>{post.content.substring(0, 100)}...</p>
            <Link to={`/posts/${post._id}`} className="text-blue-500">
              Read more
            </Link>

            {user && user.role === "admin" && (
              <div className="absolute top-2 right-2 flex space-x-2">
                {/* Edit Icon */}
                <Link to={`/posts/edit/${post._id}`} className="text-blue-500">
                  <FaEdit className="hover:text-green-500" size={20} />
                </Link>

                {/* Delete Icon */}
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-500"
                >
                  <FaTrashAlt className="hover:text-red-700" size={20} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
