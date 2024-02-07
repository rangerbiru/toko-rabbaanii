import React, { useRef, useState } from "react";
import supabase from "../database/SupaClient";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Password Tidak Sama");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (error) {
      alert("Gagal Mendaftar");
    } else {
      alert("Sukses Mendaftar, Silahkan Cek Email Anda Untuk Verifikasi");
    }

    setLoading(false);
  };

  return (
    <div className="container p-20 flex flex-col items-center">
      <h2 className="text-center font-bold text-2xl">Daftar Akun</h2>
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            className="input input-bordered"
            ref={emailRef}
            required
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <label>Password</label>
          <input
            type="password"
            className="input input-bordered"
            ref={passwordRef}
            required
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="input input-bordered"
            ref={confirmPasswordRef}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary min-h-0 h-12 mt-5 text-white w-full"
        >
          {loading ? <>Loading...</> : <>Daftar Sekarang</>}
        </button>
      </form>
    </div>
  );
};

export default Register;
