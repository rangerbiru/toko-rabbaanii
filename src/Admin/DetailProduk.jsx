import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toRupiah from "@develoka/angka-rupiah-js";
import Loading from "./components/Loading";
import supabase from "../database/SupaClient";

const DetailProduk = () => {
  const { id } = useParams();
  const [produkId, setProdukId] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDataById = async () => {
    try {
      const { data } = await supabase.from("produk").select("*").eq("id", id);
      setProdukId(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataById();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container p-10">
          <h2 className="text-center text-2xl font-bold">
            Halaman Detail Produk
          </h2>
          {produkId.map((produk) => (
            <div key={produk.id}>
              <div className="produk">
                <h2 className="font-semibold">Nama Produk</h2>
                <p>{produk.nama_produk}</p>
              </div>

              <div className="produk">
                <h2 className="font-semibold">Jenis Produk</h2>
                <p>{produk.jenis_produk}</p>
              </div>

              <div className="produk">
                <h2 className="font-semibold">Jumlah Produk</h2>
                <p>{produk.jumlah_produk}</p>
              </div>

              <div className="produk">
                <h2 className="font-semibold">Harga Produk</h2>
                <p>{toRupiah(produk.harga, { formal: false })}</p>
              </div>

              <div className="produk">
                <h2 className="font-semibold">Deskripsi Produk</h2>
                <p>{produk.deskripsi}</p>
              </div>
            </div>
          ))}

          <Link
            to={"/admin"}
            className="btn btn-error bg-red-700 text-white mt-5"
          >
            Kembali
          </Link>
        </div>
      )}
    </>
  );
};

export default DetailProduk;
