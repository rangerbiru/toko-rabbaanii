import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Produk from "./Admin/Produk";
import AddProduk from "./Admin/AddProduk";
import DetailProduk from "./Admin/DetailProduk";
import EditProduk from "./Admin/EditProduk";
import Home from "./Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import User from "./User";
import AuthRoute from "./Auth/AuthRoute";
import AuthAdmin from "./Auth/AuthAdmin";

const App = () => {
  return (
    <>
      <Routes>
        {/* Pengunjung */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* User */}
        <Route element={<AuthRoute />}>
          <Route path="/profile" element={<User />} />
        </Route>

        {/* Admin */}
        <Route element={<AuthAdmin />}>
          <Route path="/admin" element={<Produk />} />
          <Route path="/tambah-produk" element={<AddProduk />} />
          <Route path="/detail/:id" element={<DetailProduk />} />
          <Route path="/edit/:id" element={<EditProduk />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
