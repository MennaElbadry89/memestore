import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../features/auth/authSlice"; 
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./register";

import {getCountries} from "../../../services/countriesApi"
import CountrySelect from "./CountrySelect";

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);

const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "user",
    },
  });

  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "memestore");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dc1wzrv1q/image/upload",
      { method: "POST", body: data }
    );

    const result = await res.json();
    if (result.secure_url) {
      setValue("avatar", result.secure_url);
    }
    setUploading(false);
  };

  const onSubmit = (data) => {
    if (!selectedCountry) {
      alert("Please select a country");
      return;
    }

    dispatch(
      registerUser({
        ...data,
        country: {
          name: selectedCountry.name,
          flag: selectedCountry.flag,
        },
      })
    );

    navigate("/");
  };


  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center rounded-2xl bg-gray-100 p-6 py-10 shadow-2xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           <img  alt="" src="/image/melogo.jpg" className="mx-auto h-20 w-20 rounded-full"/>
           <h2 className="my-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create New Account</h2>
          </div>
      <form  onSubmit={handleSubmit(onSubmit)}
         className="md:w-124 mx-5 space-y-4 rounded-xl bg-white p-10 shadow-xl">
  
  <input
    placeholder="Full Name"
    {...register("fullName")}
    className="w-full rounded border border-gray-200 p-2" />
  {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}

  <input
    placeholder="Phone"
    {...register("phone")}
    className="w-full rounded border border-gray-200 p-2" />
  {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

  <input
    placeholder="Email"
    {...register("email")}
    className="w-full rounded border border-gray-200 p-2" />
  {errors.email && <p className="text-red-500">{errors.email.message}</p>}

  <input
    type="password"
    placeholder="Password"
    {...register("password")}
    className="w-full rounded border border-gray-200 p-2" />
  {errors.password && (
    <p className="text-red-500">{errors.password.message}</p>
  )}
  
  <input
     type="password"
     placeholder="Confirm Password"
     {...register("confirmPassword")}
     className="w-full rounded border border-gray-200 p-2"/>
  {errors.confirmPassword && (
     <p className="text-red-500">{errors.confirmPassword.message}</p>
  )}


  <select {...register("role")} className="w-full rounded border border-gray-200 p-2">
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>

  <CountrySelect
    countries={countries}
    value={selectedCountry}
    onChange={setSelectedCountry} />

  <input type="file" accept="image/*" onChange={handleImageUpload} 
   className="w-full rounded border border-gray-200 p-2"/>
  {uploading && <p>Uploading...</p>}

  <button className="flex w-full rounded bg-gray-500 p-2 text-white"> Create </button>
</form>

    </div>
  );
}