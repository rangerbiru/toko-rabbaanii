import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./components/Loading";
import supabase from "../database/SupaClient";
import { v4 as uuidv4 } from "uuid";

const EditProduk = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [produk, setProduk] = useState({
    nama_produk: "",
    jenis_produk: "",
    jumlah_produk: 0,
    harga: 0,
    deskripsi: "",
    images: "",
  });

  const [imageUpload, setImageUpload] = useState([]);

  const getDataById = async () => {
    try {
      const { data } = await supabase.from("produk").select("*").eq("id", id);
      setProduk(data[0]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataById();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduk((prevProduk) => ({
      ...prevProduk,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageUpload(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const filename = `${uuidv4(imageUpload.name)}`;

      const { data: deleteImage } = await supabase.storage
        .from("image_produk")
        .remove([`image/${produk.images}`]);

      if (deleteImage) {
        const { data: updateData } = await supabase.storage
          .from("image_produk")
          .upload(`image/${filename}`, imageUpload, {
            cacheControl: "3600",
            upsert: false,
          });

        if (updateData) {
          const { error } = await supabase
            .from("produk")
            .update({
              nama_produk: produk.nama_produk,
              jenis_produk: produk.jenis_produk,
              jumlah_produk: produk.jumlah_produk,
              harga: produk.harga,
              deskripsi: produk.deskripsi,
              images: filename,
            })
            .eq("id", id);

          if (!error) {
            alert("Update Produk Berhasil");
            navigate("/admin");
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container p-14">
          <h2 className="text-2xl font-bold text-center underline">
            Edit Produk
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col my-2">
              <label htmlFor="Nama Produk">Nama Produk</label>
              <input
                type="text"
                name="nama_produk"
                value={produk.nama_produk}
                onChange={handleInputChange}
                placeholder="Masukkan Nama Produk"
                className="input input-bordered w-full mt-1 input-md"
              />
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="Jenis Produk">Jenis Produk</label>
              <select
                name="jenis_produk"
                value={produk.jenis_produk}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option disabled value="">
                  Pilih Jenis Produk
                </option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
              </select>
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="Jumlah Produk">Jumlah Produk</label>
              <input
                type="number"
                name="jumlah_produk"
                value={produk.jumlah_produk}
                onChange={handleInputChange}
                placeholder="Masukkan Jumlah Produk"
                className="input input-bordered w-full mt-1 input-md"
              />
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="Harga">Harga</label>
              <input
                type="number"
                name="harga"
                value={produk.harga}
                onChange={handleInputChange}
                placeholder="Masukkan Jumlah Harga"
                className="input input-bordered w-full mt-1 input-md"
              />
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="Deskripsi">Deskripsi</label>
              <textarea
                name="deskripsi"
                value={produk.deskripsi}
                onChange={handleInputChange}
                className="textarea textarea-bordered resize-none"
                placeholder="Masukkan Deskripsi Produk"
                rows={5}
              ></textarea>
            </div>

            <div className="flex flex-col my-2 mb-5">
              <label htmlFor="Upload Produk">Upload Produk</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full cursor-pointer"
                onChange={handleImage}
                name="images"
              />
            </div>

            <img
              src={`https://bizsemnsdyashsoywdxt.supabase.co/storage/v1/object/public/image_produk/image/${produk.images}`}
              alt=""
              width={200}
              className="my-5"
            />

            <div className="flex gap-2">
              <Link
                to={"/admin"}
                className="btn btn-error text-white bg-red-700"
              >
                Kembali
              </Link>
              <button type="submit" className="btn btn-primary text-white">
                Simpan Data
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditProduk;
