import React, { useRef, useState } from "react";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const {
        data: { user, session },
        error,
      } = await login(emailRef.current.value, passwordRef.current.value);

      if (error) {
        alert("Login Gagal!");
      }

      if (user && session) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="container p-20 flex flex-col items-center">
      <h2 className="text-center font-bold text-2xl">Login Akun</h2>
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

        <button
          type="submit"
          className="btn btn-primary min-h-0 h-12 mt-5 text-white w-full"
        >
          {loading ? <>Loading...</> : <>Masuk Akun</>}
        </button>
      </form>
    </div>
  );
};

export default Login;
