import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../database/SupaClient";
import { v4 as uuidv4 } from "uuid";

const AddProduk = () => {
  const namaProduk = useRef(null);
  const jenisProduk = useRef(null);
  const jumlahProduk = useRef(null);
  const harga = useRef(null);
  const deskripsi = useRef(null);

  const [imageUpload, setImageUpload] = useState([]);

  const navigate = useNavigate();

  const insertDataProduk = async (e) => {
    e.preventDefault();

    const filename = `${uuidv4(imageUpload.name)}`;

    try {
      const { data } = await supabase.storage
        .from("image_produk")
        .upload(`image/${filename}`, imageUpload, {
          cacheControl: "3600",
          upsert: true,
        });
      if (data) {
        console.log("image sukses upload");
      }
    } catch (error) {
      console.error(error);
    }

    const { error } = await supabase.from("produk").insert({
      nama_produk: namaProduk.current.value,
      jenis_produk: jenisProduk.current.value,
      jumlah_produk: jumlahProduk.current.value,
      harga: harga.current.value,
      deskripsi: deskripsi.current.value,
      images: filename,
    });

    if (!error) {
      alert("Data Sukses Terkirim");
      navigate("/admin");
    }
  };

  const handleImage = (e) => {
    setImageUpload(e.target.files[0]);
  };

  return (
    <div className="container p-14">
      <h2 className="text-2xl font-bold text-center underline">
        Tambah Produk
      </h2>

      <form onSubmit={insertDataProduk}>
        <div className="flex flex-col my-2">
          <label htmlFor="Nama Produk">Nama Produk</label>
          <input
            type="text"
            placeholder="Masukkan Nama Produk"
            className="input input-bordered w-full mt-1 input-md"
            ref={namaProduk}
          />
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="Jenis Produk">Jenis Produk</label>
          <select className="select select-bordered w-full" ref={jenisProduk}>
            <option disabled selected>
              Pilih Jenis Produk
            </option>
            <option value={"Makanan"}>Makanan</option>
            <option value={"Minuman"}>Minuman</option>
          </select>
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="Jumlah Produk">Jumlah Produk</label>
          <input
            type="number"
            placeholder="Masukkan Jumlah Produk"
            className="input input-bordered w-full mt-1 input-md"
            ref={jumlahProduk}
          />
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="Harga">Harga</label>
          <input
            type="number"
            placeholder="Masukkan Jumlah Harga"
            className="input input-bordered w-full mt-1 input-md"
            ref={harga}
          />
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="Deskripsi">Deskripsi</label>
          <textarea
            className="textarea textarea-bordered resize-none"
            placeholder="Masukkan Deskripsi Produk"
            rows={5}
            ref={deskripsi}
          ></textarea>
        </div>

        <div className="flex flex-col my-2 mb-5">
          <label htmlFor="Upload Produk">Upload Produk</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full cursor-pointer"
            onChange={handleImage}
          />
        </div>

        <div className="flex gap-2">
          <Link to={"/admin"} className="btn btn-error text-white bg-red-700">
            Kembali
          </Link>
          <button type="submit" className="btn btn-primary text-white">
            Simpan Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduk;
