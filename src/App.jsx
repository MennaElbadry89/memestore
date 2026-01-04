import { lazy , Suspense } from 'react';
import LottiHandeler from "./assets/lottifiles/LottiHandeler";
import toast, { Toaster } from 'react-hot-toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
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
const Modal = lazy(()=> import('./Pages/Shop/Modal'))
const Company = lazy(()=> import('./Pages/Company/Company'))
const Contact = lazy(()=> import('./Pages/Contact/Contact'))
const Team = lazy(()=> import('./Pages/Team/Team'))
const Search = lazy(()=> import('./Pages/Search/Search'))
const Cart = lazy(()=> import('./Pages/Cart/Cart'))
const CartFlying = lazy(()=> import('./Pages/Cart/CartFlying'))
const Checkout = lazy(()=> import('./Pages/Cart/Checkout'))
const Orders = lazy(()=> import('./Pages/Orders/Orders'))
const Create = lazy(()=> import('./Pages/Auth/Create/Create'))
const SignIn = lazy(()=> import('./pages/Auth/SignIn/SignIn'))
const Profile = lazy(()=> import('./Pages/Profile/Profile'))
const Messages = lazy(()=> import('./Pages/Messages/Messages'))
const AdminLayout = lazy(()=> import('./Layout/AdminLayout'))



export default function App(){
    const dispatch = useDispatch();

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
      {path: 'modal' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Modal/></Suspense> },
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
                <Suspense fallback={<LottiHandeler status= 'page' />}> <SignIn/></Suspense> },
      {path: 'profile' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Profile/></Suspense> },
     {path: 'messages' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <Messages/></Suspense> },
     {path: 'adminLayout' , element :
                <Suspense fallback={<LottiHandeler status= 'page' />}> <AdminLayout/></Suspense> }
    ],
    errorElement : <LottiHandeler status= 'Err' />
  }
])
    return  <>
     <RouterProvider router={router}/>
      <ToastContainer position="top-center" />
      <Toaster position="top-center" />;
     </>

}