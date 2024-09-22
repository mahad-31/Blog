// src/components/Login.js
import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/authContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        username,
        password,
      });
      login(response.data.token);
      // Redirect to posts or show success message
      console.log("Login successful");
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <>
   
    <div className="max-w-md mx-auto p-5">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
    </>
  );
};

export default Login;
