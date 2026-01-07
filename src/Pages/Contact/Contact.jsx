import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, resetContactState } from "../../features/contact/contactSlice";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "./contactSchema";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../features/auth/firebase";

export default function Contact() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setValue("name", user.displayName || "");
        setValue("email", user.email || "");
        setValue("phone", docSnap.data().phone || "");
      }
    };

    fetchData();
  }, [user, setValue]);

  const onSubmit = (data) => {
    dispatch(sendMessage(data));
  };

  useEffect(() => {
    if (success) {
      toast.success("Message sent successfully");
      reset();
      dispatch(resetContactState());
    }
  }, [success, reset, dispatch]);


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
    <form  onSubmit={handleSubmit(onSubmit)} 
    className="mx-auto mt-5 max-w-lg space-y-4 rounded-2xl border border-gray-200 p-5 shadow-2xl">
      <input 
          type="text"
          name="name"
          placeholder="Your name"
          {...register("name")}
          className="w-full rounded border border-gray-200 p-2"/>
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}

        <input
          type="email"
          name= "email"
          placeholder="Your email"
          {...register("email")}
          className="w-full rounded border border-gray-200 p-2"/>
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}

        <input
        type="text"
          name= "phone"
          placeholder="Phone"
          {...register("phone")}
          className="w-full rounded border border-gray-200 p-2"/>
        {errors.phone && (
          <p className="text-sm text-red-600">{errors.phone.message}</p>
        )}

        <textarea
        type="text"
          name= "message"
          rows="4"
          placeholder="Your message"
          {...register("message")}
          className="w-full rounded border border-gray-200 p-2"/>
        {errors.message && (
          <p className="text-sm text-red-600">{errors.message.message}</p>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded bg-gray-600 py-2 text-white disabled:opacity-50">
          {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white"/>: "Send Message"}
        </button>
    </form>
    </div>
  ); 
}

