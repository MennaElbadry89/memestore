import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import LottiHandeler from "../../assets/lottifiles/LottiHandeler";
import { clearCart } from "../../features/cart/cartSlice";
import { createOrder } from "../../features/order/orderSlice";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../features/auth/firebase";

export default function Checkout() {
  const { products, totalPrice,} = useSelector((state) => state.cart);
  const { user} = useSelector((state) => state.auth);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState({}); 
  const[open , setOpen] = useState(false) 
 
  const dispatch  = useDispatch()
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "card",
  });
  
   useEffect(() => {
      if (user) {
        const fetchData = async () => {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPhone(docSnap.data().phone);
            setCountry(docSnap.data().country);
          }
        };
       fetchData();
      }
    }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const cleanProducts = products.map((product) => ({
  ...product,
  colors: product.colors?.filter(Boolean) || [], // يشيل undefined
}));
 const handleCheckout = async () => {
    console.log("Checkout clicked");
  try {
    await dispatch(
      createOrder({
        items: cleanProducts,
        totalPrice,
        userId: user.uid,
      })
    ).unwrap(); 
    console.log("Order created successfully");
    dispatch(clearCart());   
    navigate("/orders");     
  } catch (error) {
    console.error("Checkout failed:", error);
  }
};


  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col rounded-2xl p-6 shadow-lg md:col-span-2">
        <h2 className="my-4 text-center text-2xl font-bold">Checkout</h2>
        <div className="mb-5">
             <ul className="">
                {products.map((product) => (
                  <li key={product.id} className="mx-2 flex items-center justify-around p-2 shadow-lg md:mx-5">
                    <div className="size-18 shrink-0 overflow-hidden rounded-full border border-gray-200">
                      <img alt={product.cat} src={product.image} className="size-full rounded-full object-cover" />
                    </div>                            
                    <div className="text-md flex justify-between font-medium text-gray-900">
                            <p className="ml-1">product: {product.name}</p>
                            <p className="ml-2">{product.price} * <strong className="text-red-600">{product.quantity || 1}</strong> </p>  
                    </div>
                           <p className="ml-2"> {(product.price*product.quantity) || product.price}</p>                                                           
                  </li>  
                ))}                       
            </ul>
            <div className="mx-2 flex items-center justify-center p-2 shadow-lg md:mx-5">
              <p className="my-2 font-bold">TotalPrice:<strong className="text-red-600">${totalPrice}</strong></p>
            </div>
        </div>
                             {/*  Checkout Form */}
        
        <form onSubmit={(e)=>e.preventDefault()} className="space-y-4">
          
          <input  name="name"  placeholder="Full Name"
            value={user.displayName ||form.name} onChange={handleChange}
            className="w-full rounded-2xl border border-gray-300 p-3"  />
            
          <input  name="email" type="email"
            placeholder="Email"   value={user.email || form.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-gray-300 p-3" />
            
          <input  name="phone" placeholder="Phone Number"
            value={phone || form.phone}  onChange={handleChange}
            className="w-full rounded-2xl border border-gray-300 p-3" />
            
          <textarea  name="address"  placeholder="Address"
            value={country.name || form.address}  onChange={handleChange}
            className="w-full rounded-2xl border border-gray-300 p-3"   />

          {/* Payment Method */}
          <div className="mt-4">
            <h3 className="mb-2 font-semibold">Payment Method</h3>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input  type="radio"  name="payment"  value="card"
                  checked={form.payment === "card"}  onChange={handleChange}  />
                <span>Credit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input  type="radio"  name="payment"  value="cash"
                  checked={form.payment === "cash"}   onChange={handleChange}  />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          <button onClick={()=>setOpen(true)} className="mt-4 w-full rounded-2xl bg-gray-600 p-3 text-white">
            Place Order
          </button>
        </form>
                             {/* checkout modal */}                                    
    {open && (
     <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
      <div  className="z-50 flex h-1/4 w-2/3 flex-col items-center justify-center bg-white p-4 md:w-1/3"
            onClick={(e) => e.stopPropagation()} >  
        <p className="md:text-md my-2 text-center text-sm">Are you sure to confirm order?! </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => setOpen(false)} 
            className="rounded-md bg-gray-500 p-2 text-sm text-white"> Cancel</button>

          <button type="button" onClick={handleCheckout}
            className="rounded-md bg-red-500 p-2 text-sm text-white"> Checkout</button>
        </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
