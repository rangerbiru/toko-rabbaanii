import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="navbar bg-base-100 shadow-lg px-10 py-3">
      <div className="flex-1">
        <Link to={"/admin"} className="btn btn-ghost text-xl">
          Rabbaanii Market
        </Link>
      </div>
      <div className="flex-none gap-2">
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
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
