import { useState, useEffect, lazy, Suspense } from "react";
import LottiHandeler from "./assets/lottifiles/LottiHandeler";
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./features/auth/firebase";
import { useDispatch } from "react-redux";
import { setUser } from './features/auth/authSlice';
import { listenAuthState } from "./features/auth/authSlice";


import { createBrowserRouter , RouterProvider} from  'react-router-dom'
const Layout = lazy(()=> import('./Layout/Layout'))
const Home = lazy(()=> import('./Pages/Home/Home'))
const Shop = lazy(()=> import('./Pages/Shop/Shop'))
const Clothes = lazy(()=> import('./Pages/Shop/Clothes'))
const Shoes = lazy(()=> import('./Pages/Shop/Shoes'))
const Bags = lazy(()=> import('./Pages/Shop/Bags'))
const ProductDetails = lazy(()=> import('./Pages/Shop/ProductDetails'))
const Deals = lazy(()=> import('./Pages/Shop/Deals'))
const Company = lazy(()=> import('./Pages/Company/Company'))
const Contact = lazy(()=> import('./Pages/Contact/Contact'))
const Team = lazy(()=> import('./Pages/Team/Team'))
const Search = lazy(()=> import('./Pages/Search/Search'))
const Wishlist = lazy(()=> import('./Pages/Wishlist/Wishlist'))
const Cart = lazy(()=> import('./Pages/Cart/Cart'))
const CartFlying = lazy(()=> import('./Pages/Cart/CartFlying'))
const Checkout = lazy(()=> import('./Pages/Cart/Checkout'))
const Orders = lazy(()=> import('./Pages/Orders/Orders'))
const Create = lazy(()=> import('./Pages/Auth/Create/Create'))
const Sign = lazy(()=> import('./Pages/Auth/Sign/Sign.jsx'))
const Profile = lazy(()=> import('./Pages/Profile/Profile'))
const Messages = lazy(()=> import('./Pages/Messages/Messages'))



export default function App(){
    const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
 
  useEffect(() => {
  const seen = localStorage.getItem("welcomeMessage");
  if (!seen) {
    setShowModal(true);
    localStorage.setItem("welcomeMessage", "true");
  }
}, []);

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     dispatch(setUser(user ?? null));
  //   });
  //   return () => unsub();
  // }, [dispatch]);
  
   useEffect(() => {
    listenAuthState(dispatch);
  }, [dispatch]);


const router = createBrowserRouter([
    {
      path : '/',
        element : <Suspense fallback={<LottiHandeler status= 'main' />}><Layout/></Suspense>,
    children : [
      {index: true , element :
                <Suspense fallback={<LottiHandeler status= 'main' />}> <Home/></Suspense> },
      {path: 'product/:id' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <ProductDetails/></Suspense> },
      {path: 'deals' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Deals/></Suspense> },
      {path: 'shop' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Shop/></Suspense> },
      {path: 'shoes' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Shoes/></Suspense> },
      {path: 'bags' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Bags/></Suspense> },  
      {path: 'clothes' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Clothes/></Suspense> },                    
      {path: 'about' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Company/></Suspense> },
      {path: 'team' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Team/></Suspense> },
      {path: 'contact' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Contact/></Suspense>},
      {path: 'search' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Search/></Suspense>},
      {path: 'wishlist' , element :
                <Suspense fallback={<LottiHandeler status= 'cart' />}> <Wishlist/></Suspense> },
      {path: 'cart' , element :
                <Suspense fallback={<LottiHandeler status= 'cart' />}> <Cart/></Suspense> },
      {path: 'cartFlying' , element :
                <Suspense fallback={<LottiHandeler status= 'cart' />}> <CartFlying/></Suspense> },
      {path: 'orders' , element :
                <Suspense fallback={<LottiHandeler status= 'cart' />}> <Orders/></Suspense> },
      {path: 'checkout' , element :
                <Suspense fallback={<LottiHandeler status= 'cart' />}> <Checkout/></Suspense> },
      {path: 'register' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Create/></Suspense> },
      {path: 'login' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Sign/></Suspense> },
      {path: 'profile' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Profile/></Suspense> },
     {path: 'messages' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Messages/></Suspense> },
   ],
    errorElement : <LottiHandeler status= 'Err' />
  }
])
    return  <>
     {showModal && (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60">
        <div className="w-4/5 rounded-xl bg-white p-6 text-center md:w-1/4">
          <h2 className="mb-3 font-bold text-blue-500 md:text-2xl">welcome frind </h2>
          <div className="mb-4 flex flex-col items-start text-left text-sm md:text-base">
           <p>To be able to see and deal with products and other APIs, you need to:-</p>
           <span>1-  download code in your pc, </span> 
           <span>2-  npm start (to run db.json server) </span> 
           <span>3-  npm run dev (to run app) </span> 
            <br />
          </div>
          <button onClick={() => setShowModal(false)}
            className="animate-pulse rounded bg-gray-600 p-2 text-white" >enjoy</button>
        </div>
      </div>
    )}

     <RouterProvider router={router}/>
      <ToastContainer position="top-center" />
      <Toaster position="top-center" />;
     </>

}