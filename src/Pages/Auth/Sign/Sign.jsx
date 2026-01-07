import { FaSmileBeam } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./login";

export default function Sign() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data)); // { email, password }
  };

  useEffect(() => {
    if (user) {
      navigate("/shop");
    }
  }, [user, navigate]);

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img  alt="" src="/image/melogo.jpg"
          className="mx-auto h-20 w-20 rounded-full"/>
          
        <div className="flex items-center justify-center gap-1">
          <h2 className="my-5 text-center font-bold tracking-tight text-gray-900 md:text-2xl/9">
            Welcome back friend
          </h2>
          <FaSmileBeam className="text-2xl text-gray-400" />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-124 mx-5 space-y-4 rounded-xl bg-white p-10 shadow-xl">
          
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full rounded-lg border border-gray-200 p-2"/>
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full rounded-lg border border-gray-200 p-2"/>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-gray-600 p-2 text-white"
          disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <h2 className="my-5 text-center font-bold tracking-tight text-gray-900 md:text-2xl/9">
        Don't have account{" "}
        <a href="/create"
          className="animate-ping text-blue-500 hover:animate-none">
          create one
        </a>
      </h2>
    </div>
  );
}
