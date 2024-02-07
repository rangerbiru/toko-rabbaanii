import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await logout();
      if (!error) {
        alert("Logout Berhasil");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="navbar bg-base-100 shadow-lg px-10 py-3">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          Rabbaanii Market
        </Link>
      </div>
      <div className="flex-none gap-4">
        {user ? (
          <>
            <h2>Selamat Datang, {user.email}</h2>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={"/profile"}>Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            {" "}
            <Link to={"/register"}>Daftar Akun</Link>
            <Link to={"/login"} className="btn btn-warning min-h-0 h-10">
              Masuk
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
