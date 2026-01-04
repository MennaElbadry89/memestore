import { FaSmileBeam } from "react-icons/fa";
import { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
      const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  
  useEffect(() => {
      if (user) {
        navigate("/shop");
      }
    }, [user, navigate]);
  

  return (
    <>
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           <img  alt="" src="/image/melogo.jpg" className="mx-auto h-20 w-20 rounded-full"/>
           <div className="flex items-center justify-center gap-1">
           <h2 className="my-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Welcome back frind</h2>
           <FaSmileBeam className="text-2xl text-gray-400"/>
           </div>
         </div>
      <form
        onSubmit={handleSubmit}
        className="w-124 space-y-4 rounded-xl bg-white p-10 shadow-xl" >
        {/* <h2 className="text-center text-2xl font-bold">Login</h2> */}

        <input  type="email"  placeholder="Email"
          className="w-full rounded-lg border border-gray-300 p-2"
          onChange={(e) => setEmail(e.target.value)}  />

        <input type="password"  placeholder="Password"
          className="w-full rounded-lg border border-gray-300 p-2"
          onChange={(e) => setPassword(e.target.value)}   />

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-gray-600 p-2 text-white"
          disabled={loading} >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
           <h2 className="my-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Don't have account <a href="/create" className="animate-ping text-blue-500 hover:animate-none"> create one</a></h2>
      
    </div>

</>
)}

