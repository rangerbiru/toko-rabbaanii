import React, { useEffect, useState } from "react";
import toRupiah from "@develoka/angka-rupiah-js";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import supabase from "../database/SupaClient";

const Produk = () => {
  const [getData, setGetData] = useState([]);

  const [imageProduk, setImageProduk] = useState("");
  const [loading, setLoading] = useState(true);

  const getDataSupabase = async () => {
    try {
      const { data } = await supabase
        .from("produk")
        .select("*")
        .order("id", { ascending: true });
      setGetData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Truncate Deskripsi
  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  const deleteProdukById = async (id) => {
    try {
      const { data: getProdukImageById } = await supabase
        .from("produk")
        .select("images")
        .eq("id", id);

      const { data: getImage } = await supabase.storage
        .from("image_produk")
        .remove([`image/${getProdukImageById[0].images}`]);

      const { error } = await supabase.from("produk").delete().eq("id", id);
      if (!error && getImage) {
        alert("Delete Produk Berhasil");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataSupabase();
  }, []);

  return (
    <>
      <Header />
      <div className="overflow-x-auto p-20">
        <h2 className="text-2xl font-bold">Data Produk Rabbaanii Market</h2>

        <div className="flex justify-between">
          <Link
            to={"/"}
            className="btn btn-error my-2 rounded-md py-0 bg-red-700 text-white"
          >
            Dashboard
          </Link>

          <Link
            to={"/tambah-produk"}
            className="btn btn-primary my-2 rounded-md py-0 text-white"
          >
            Tambah Produk
          </Link>
        </div>

        {loading ? (
          <>
            <div className="flex flex-col gap-4 w-full">
              <div className="skeleton rounded-sm h-14 w-full"></div>
              <div className="skeleton rounded-sm h-8 w-28"></div>
              <div className="skeleton rounded-sm h-8 w-full"></div>
              <div className="skeleton rounded-sm h-8 w-full"></div>
            </div>
          </>
        ) : (
          <>
            <table className="table border">
              {/* head */}
              <thead>
                <tr className="text-center">
                  <th>No</th>
                  <th>Gambar Produk</th>
                  <th>Nama Produk</th>
                  <th>Jenis Produk</th>
                  <th>Jumlah Produk</th>
                  <th>Harga</th>
                  <th>Deskripsi</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {getData.map((produk, index) => (
                  <tr key={produk.id} className="text-center">
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`https://bizsemnsdyashsoywdxt.supabase.co/storage/v1/object/public/image_produk/image/${produk.images}`}
                        alt={`${produk.nama_produk}`}
                        width={50}
                        className="rounded-full object-cover"
                      />
                    </td>
                    <td>{produk.nama_produk}</td>
                    <td>{produk.jenis_produk}</td>
                    <td>{produk.jumlah_produk}</td>
                    <td>{toRupiah(produk.harga, { formal: false })}</td>
                    <td>{truncateString(produk.deskripsi, 50)}</td>
                    <td className="flex gap-2 justify-center">
                      <Link
                        to={`/detail/${produk.id}`}
                        className="btn btn-info"
                      >
                        Detail
                      </Link>
                      <Link
                        to={`/edit/${produk.id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-error bg-red-700 text-white"
                        onClick={() => deleteProdukById(produk.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Produk;
