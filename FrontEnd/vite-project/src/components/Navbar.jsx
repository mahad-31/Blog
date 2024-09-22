import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/authContext"; // Correct import for AuthContext

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between h-20 items-center shadow-sm p-5 pb-2 border-black border-b">
      <h2 className="text-xl font-bold items-center">
        <Link to="/">BlogWay</Link>
      </h2>

      <div>
        <ul className="hidden md:flex text-xl text-center gap-16">
          <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
            <Link to="/posts/new">New Blog</Link>
          </li>
          <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
            <Link to="/posts/list">Blogs</Link>
          </li>
          <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
            <Link to="/posts/edit">Edit Blog</Link>
          </li>
        </ul>
      </div>

      {user ? (
        <button
          onClick={handleLogout}
          className="text-white px-4 py-2 bg-black rounded-md hover:scale-110 transition-all"
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="text-white px-4 py-2 bg-black rounded-md hover:scale-110 transition-all">
            Login
          </button>
        </Link>
      )}
    </div>
  );
}

export default Header;
