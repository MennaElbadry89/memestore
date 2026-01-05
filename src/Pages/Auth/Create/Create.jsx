import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../features/auth/authSlice"; 
import { useNavigate } from "react-router-dom";
import {getCountries} from "../../../services/countriesApi"
import CountrySelect from "./CountrySelect";

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
    avatar: "" // رابط الصورة بعد الرفع
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
   const file = e.target.files[0];
   if (!file) return;
   setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "memestore");
   try {
     const res = await fetch(
      "https://api.cloudinary.com/v1_1/dc1wzrv1q/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const result = await res.json();
    console.log("Cloudinary result:", result);
    if (result.secure_url) {
      setFormData((prev) => ({
        ...prev,
        avatar: result.secure_url,
      }));
    }
  } catch (err) {
    console.error("Upload failed:", err);
  } finally {
    setUploading(false);
  }
};

const [selectedCountry, setSelectedCountry] = useState(null);
const [countries, setCountries] = useState([]);

useEffect(() => {
  getCountries().then(setCountries);
  console.log(countries )
}, []);

const handleSubmit = (e) => {
  e.preventDefault();
   if (!selectedCountry) {
    alert("Please select a country");
    return;
   }
  dispatch( registerUser({
      ...formData,
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
      <form onSubmit={handleSubmit} className="md:w-124 mx-5 space-y-4 rounded-xl bg-white p-10 shadow-xl">
        
        <input type="text" placeholder="fullName" required
          className="w-full rounded border border-gray-200 p-2"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
          
        <input type="phone" placeholder="Phone" required
          className="w-full rounded border border-gray-200 p-2"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}  />
       
        <input type="email" placeholder="Email" required
          className="w-full rounded border border-gray-200 p-2"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          
        <input type="password" placeholder="Password" required
          className="w-full rounded border border-gray-200 p-2"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
        
        <select value={formData.role} className="w-full rounded border border-gray-200 p-2"
         onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
           <option value="user">User</option>
           <option value="admin">Admin</option>
        </select>  
          <div>
             {/* <button type="button"  onClick={() => setIsOpen(!isOpen)}
              className="flex w-full items-center justify-between rounded border p-2">
              {selectedCountry ? (
                <div className="flex items-center gap-2">
                  <span>{selectedCountry.name}</span>
                  <img  src={selectedCountry.flag} alt={selectedCountry.name} className="h-4 w-6"  />
                </div>) : ( <span className="text-gray-400">Select your country</span>  )}
            </button>
             {isOpen && (  <div className="mt-1 rounded border bg-white">
                       
              <input  type="text"  placeholder="Search country..."
                value={search}   onChange={(e) => setSearch(e.target.value)}
                className="w-full border-b p-2 outline-none"  />
                      
              <ul className="max-h-60 overflow-y-auto">
                {countries .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) )
                  .map((c) => ( <li  key={c.name} onClick={() => {
                        setSelectedCountry(c);
                        setIsOpen(false);
                        setSearch(""); 
            }}
            className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"  >
            <img src={c.flag} alt={c.name} className="h-4 w-6" />
            <span>{c.name}</span>
          </li>
        ))}
    </ul>
  </div>
             )} */}
             
           <CountrySelect  countries={countries}
             value={selectedCountry}  onChange={setSelectedCountry} />
          </div>
          
        <div>
          <label className="mb-1 block">Image</label>
          <input  type="file"  accept="image/*"
           onChange={handleImageUpload} className="w-full rounded border border-gray-200 p-2"/>
          {uploading && <div className="h-3 w-3 animate-spin rounded-full border"></div>}   
        </div>
        <button
          type="submit"
          className="w-full rounded bg-gray-500 p-2 text-white hover:bg-gray-600" >
          Create
        </button>
      </form>
    </div>
  );
}
