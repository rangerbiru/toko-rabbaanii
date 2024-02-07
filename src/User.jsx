import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth/AuthProvider";
import { Link } from "react-router-dom";

const User = () => {
  const { user, logout, userName, role } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await logout();
      if (!error) {
        alert("Logout Berhasil");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {role === "admin" ? (
        <>
          <h2>{userName}</h2>
          <div className="flex gap-2">
            <Link
              className="btn btn-primary text-white min-h-0 h-10"
              to={"/admin"}
            >
              Pergi Ke Halaman Admin
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-error bg-red-700 text-white min-h-0 h-10"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>Selamat Datang, {user.email}</h2>
          <button
            onClick={handleLogout}
            className="btn btn-error bg-red-700 text-white min-h-0 h-10"
          >
            Logout
          </button>
        </>
      )}
    </>
  );
};

export default User;
