import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart,  increaseQuantity, decreaseQuantity,  } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import {useState} from "react"



export default function CartFlying() {
  const [open , setOpen] = useState(false)
  const [openn , setOpenn] = useState(false)
  const [selected , setSelected] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); 
  const { products, totalQuantity, totalPrice,} = useSelector((state) => state.cart);

const openModal = (id) => {
  setSelected(id);
  setOpenn(true);
};

const handleRemove = (id) => {
   dispatch(removeFromCart(id));
   setOpenn(false);
};

const handleInc =(id)=>{
   dispatch(increaseQuantity(id))
}

const handleDec =(id)=>{
   dispatch(decreaseQuantity(id))
}

  console.log('Cart component state:', cart);
  
  return (
    <div className="bg-white">
      <h2 className="my-2 text-center text-2xl text-gray-800">your cart</h2>
      
      {products.length !=0 ?(
      <div 
        className="rounded-md bg-white p-2 text-sm font-semibold text-gray-900">
              <div className="m-2 max-w-4xl">
                      <div className="flex flex-col bg-white">
                        <ul className="bg-white">
                          {products.map((product) => (
                            <li key={product.id} className="mx-1 flex items-center justify-around p-2 shadow-lg">
                              <div className="size-12 shrink-0 overflow-hidden rounded-full border border-gray-200">
                                <img alt={product.cat} src={product.image} className="size-full rounded-full object-cover" />
                              </div>                            
                                  <div className="flex justify-between text-sm font-medium text-gray-900">
                                    <p className="ml-4">product:{product.name}</p>
                                    <p className="ml-4">price: {product.price}</p>
                                  </div>
                                                                            
                                 <div className="flex items-center justify-center gap-1">
                                      <button className="rounded-md bg-gray-600 p-1 text-sm text-white hover:bg-gray-500"
                                        onClick={() => handleInc(product.id)}> + 
                                      </button>
                                      <p className="text-center">{product.quantity || 1}</p>
                                      <button
                                        className="rounded-md bg-gray-600 p-1 text-sm text-white hover:bg-gray-500"
                                          onClick={() => handleDec(product.id)}> -  
                                      </button>
                                </div>
                                <div className="flex">
                                    <button type="button" onClick={()=>openModal(product.id)}
                                     className="rounded-md bg-red-600 p-1 text-sm font-medium text-white hover:bg-red-500">
                                      Remove
                                    </button>
                                    {/* remove modal */}
                                    
                            { openn &&  <div className="fixed inset-0 flex items-center justify-center bg-black/30">
                              <div className="absolute flex h-1/4 w-2/3 flex-col items-center justify-center bg-white p-2 md:w-1/3">
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
                        
                          <div className="mx-5 my-6 flex items-center justify-between px-5 py-4 shadow-lg">
                            <p>TotalPrice: <strong className="text-red-500">{totalPrice}</strong></p>
                            <div className="flex items-center justify-center gap-2">
                             <button type="button" onClick={()=>navigate('/checkout')}
                               className="rounded-md bg-gray-600 p-1 text-sm font-medium text-white hover:bg-gray-500">
                                Checkout
                             </button>  
                             <button type="button" onClick={()=>setOpen(!open)}
                              className="rounded-md bg-red-600 p-1 text-sm font-medium text-white hover:bg-red-500">
                              { (totalQuantity)?  'clearCart' :  <a href="/shop">shop now</a> }
                             </button>
                             
                             {/* clearcart modal */}
                             
                           { open &&  <div className="fixed inset-0 flex items-center justify-center bg-black/30">
                              <div className="absolute flex h-1/4 w-2/3 flex-col items-center justify-center bg-white p-2 md:w-1/3">
                                <p className="md:text-md my-2 text-center text-sm">Are you sure to clear cart?!</p>
                                <div className="flex items-center justify-center gap-1">
                                  <button   className="rounded-md bg-gray-500 p-2 text-sm text-white" onClick={()=>setOpen(open)}>Cancel</button>
                                  <button   className="rounded-md bg-red-500 p-2 text-sm text-white" onClick={()=>dispatch(clearCart())}>Clear</button>
                                </div>
                              </div>
                             </div>}
                            </div>                           
                          </div>
                      </div>
                    </div>
              </div>
      ) : (<div className="my-5 flex w-[200px] flex-col items-center justify-center"> 
            <p className="w-full text-center">your cart is empty,</p>  
            <a href="/shop" className="animate-pulse rounded-md bg-gray-600 p-2 text-sm text-white">Shop now</a> </div>)} 
    </div>
  )
}
