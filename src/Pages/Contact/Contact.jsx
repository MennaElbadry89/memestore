import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, resetContactState } from "../../features/contact/contactSlice";
import toast from 'react-hot-toast';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../features/auth/firebase";

export default function Contact() {
  const [phone, setPhone] = useState("");
    
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user ? user.displayName : "",
    email: user ? user.email : "",
    phone: user ? phone : "",
    message: "",
  });
  
  useEffect(() => {
        if (user) {
          const fetchData = async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setPhone(docSnap.data().phone);
            }
          };
         fetchData();
        }
      }, [user]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage(formData));
  };

  useEffect(() => {
    if (success) {
    toast.success( "Message sent successfully");
            setFormData({ name: "", email: "", phone: "", message: "" });
      dispatch(resetContactState());
    }
  }, [success, dispatch]);

  return (
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">      
       <div  aria-hidden="true"  
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div  
        style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-1155/678 w-144.5 rotate-30 bg-linear-to-tr sm:w-288.75 relative left-1/2 -z-10 max-w-none -translate-x-1/2 from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)]" />       </div>
      <div className="mx-auto mb-5 max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Contact sales</h2>        
         <p className="mt-2 text-lg/8 text-gray-600">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>       
      </div>
    <form onSubmit={handleSubmit} className="mx-auto mt-5 max-w-lg space-y-4">
      <input
        name="name"
        placeholder="Your name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full rounded border p-2" />

      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
        value={formData.email}
        onChange={handleChange}
        className="w-full rounded border p-2"/>

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full rounded border p-2"/>

      <textarea
        name="message"
        placeholder="Your message"
        required
        rows="4"
        value={formData.message}
        onChange={handleChange}
        className="w-full rounded border p-2" />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-indigo-600 py-2 text-white disabled:opacity-50" >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
    </div>
  );
}

