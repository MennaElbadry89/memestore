
import { useSelector, useDispatch } from "react-redux";
import {  removeFromWishlist, clearWishlist } from "../../features/cart/wishlistSlice";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  
    const [open , setOpen] = useState(false)
    const [openn , setOpenn] = useState(false)
    const [selected , setSelected] = useState(null)
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist); 
  const { products} = useSelector((state) => state.wishlist);

const openModal = (id) => {
  setSelected(id);
  setOpenn(true);
};

const handleRemove = (id) => {
   dispatch(removeFromWishlist(id));
   setOpenn(false);
};


  console.log('Cart component state:', wishlist);
  
  return (
    <div className="mx-auto flex w-full flex-col justify-center">
      <h2 className="my-2 text-center text-4xl text-gray-800">your Wishlist</h2>
      
      {products.length !=0 ?(
      <div  className="rounded-md bg-white p-2 text-sm font-semibold text-gray-900">
              <div className="m-4 max-w-6xl">
                      <div className="flex flex-col">
                        <ul className="">
                          {products.map((product) => (
                            <li key={product.id} className="mx-2 flex items-center justify-around p-2 shadow-lg md:mx-10">
                              <div className="size-18 shrink-0 overflow-hidden rounded-full border border-gray-200">
                                <img alt={product.cat} src={product.image} className="size-full rounded-full object-cover" />
                              </div>                            
                                  <div className="text-md flex justify-around font-medium text-gray-900">
                                    <p className="ml-1">product: {product.name}</p>
                                    <p className="ml-2">price: {product.price}</p>
                                    <p className="ml-2">Stock: {product.quantity}</p>
                                  </div>

                                <div className="flex">
                                    <button type="button" onClick={()=>openModal(product.id)}
                                     className="rounded-xl bg-red-600 p-2 font-medium text-white hover:bg-red-500">
                                      Remove
                                    </button>
                                                 {/* remove modal */}                                    
                            { openn &&  <div className="fixed inset-0 flex items-center justify-center bg-black/30">
                              <div className="absolute flex h-1/3 w-3/4 flex-col items-center justify-center bg-white p-2 md:h-1/4 md:w-1/3">
                                <p className="md:text-md my-2 text-center text-sm">Are you sure to remove selected item?!</p>
                                <div className="flex items-center justify-center gap-1">
                                  <button   className="rounded-md bg-gray-500 p-2 text-sm text-white" onClick={()=>setOpenn(false)}>Cancel</button>
                                  <button   className="rounded-md bg-red-500 p-2 text-sm text-white" onClick={()=>handleRemove(selected)}>Remove</button>
                                </div>
                              </div>
                             </div>}
                              </div>
                            </li>  
                          ))}                       
                        </ul>
                        
                           <div className="mx-2 my-6 flex items-center justify-between px-5 py-4 shadow-lg md:mx-10">
                            <div className="mx-auto flex items-center justify-center gap-2 max-md:flex-col md:flex-row">
                           <button type="button" onClick={()=>setOpen(!open)}
                              className="rounded-xl bg-red-600 p-2 font-medium text-white hover:bg-red-500">
                              clearWishlist  
                           </button>
                          <button type="button" onClick={()=>navigate('/shop')}
                              className="rounded-xl bg-gray-600 p-2 font-medium text-white hover:bg-red-500">
                              shop now 
                           </button>
                           
                                {/* clearWishlist modal */}                            
                           { open &&  <div className="fixed inset-0 flex items-center justify-center bg-black/30">
                              <div className="absolute flex h-1/4 w-2/3 flex-col items-center justify-center bg-white p-2 md:w-1/3">
                                <p className="md:text-md my-2 text-center text-sm">Are you sure to clear Wishlist?!</p>
                                <div className="flex items-center justify-center gap-1">
                                  <button   className="rounded-md bg-gray-500 p-2 text-sm text-white" onClick={()=>setOpen(false)}>Cancel</button>
                                  <button   className="rounded-md bg-red-500 p-2 text-sm text-white" onClick={()=>dispatch(clearWishlist())}>clear</button>
                                </div>
                              </div>
                             </div>}
                            </div>
                           
                          </div>
                      </div>
                    </div>   
      </div>
      ) : (<p className="my-5 text-center"> your wishlist is empty, <a href="/shop" className="animate-pulse rounded-md bg-gray-600 p-2 text-sm text-white">Shop now</a> </p>)}
    
    </div>
  )
}

