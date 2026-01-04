import './Orders.css'
import { useDispatch, useSelector  } from 'react-redux';
import { useEffect } from 'react';
import {fetchUserOrders } from '../../features/order/orderSlice'
import LottiHandeler from '../../assets/lottifiles/LottiHandeler';


export default function Orders() {
 
  const dispatch = useDispatch();
const { orders, loading } = useSelector((state) => state.orders);
const { user } = useSelector((state) => state.auth);

useEffect(() => {
  dispatch(fetchUserOrders(user.uid));
}, [dispatch, user.uid]);

if (loading) return <LottiHandeler/>;

return (
  <div className='justify-ceneter mx-auto my-10 flex w-full flex-col items-center p-5'>
    <h2 className='text-center md:text-4xl'>My Orders</h2>

     {orders.length != 0? ( <table className="my-10 w-full table-fixed rounded-2xl border border-gray-300">
         <thead className='w-full text-center'>
           <tr  className='bg-blue-200'>
            <th className='p-2'>order.id</th>
            <th className='p-2'>TotalPrice</th>
            <th className='p-2'>status</th>
            <th className='p-2'>details</th>
           </tr>
          </thead>
        <tbody className='w-full text-center'>
         {orders.map((order) => (
          <tr key={order.id}   className='rounded-2xl border-b border-gray-300 bg-gray-200'>
           <td className='p-2'>{order.id}</td>
           <td className='p-2'>{order.totalPrice} EGP</td>
           <td className='p-2'>{order.status}</td>
           <td className="p-2">
                {order.items.map((item) => (
                  <div key={item.id} className="mb-1 flex gap-2">
                    <img  src={item.image}  alt={item.name}
                      className="h-8 w-8 object-cover" />
                    <div>
                      <p className="text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × {item.price} EGP
                      </p>
                    </div>
                  </div>
                ))}
              </td>
         </tr>
        ))}
      </tbody>
    </table>) : (<div className='justify-ceneter my-10 flex items-center gap-2'> 
      <p className='text-center md:text-4xl'> No orders found !</p>
    <a href="/shop" className='animate-pulse rounded-lg bg-gray-600 p-2 text-sm text-white'>Shop Now</a>
    </div> )}
  </div>
);

}

