import { useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import LottiHandeler from "../../assets/lottifiles/LottiHandeler";
import { addToCart } from "../../features/cart/cartSlice";
import {Link}  from 'react-router-dom'
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2' 
import { addToWishlist } from "../../features/cart/wishlistSlice";
import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";

export default function Shoes() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
       const { user } = useSelector((state) => state.auth);

  const navigate =useNavigate()
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
  const filtered = items.filter((e) => e.cat === 'Shoes');
  
   const handleAddToCart = (product) => {
       if (!user) {
         Swal.fire({
           icon: "warning",
           title: "Login required",
           text: "you must login to see cart ",
           confirmButtonText: "login",
           showCancelButton: true,
           }).then((result) => {
              if (result.isConfirmed) {
                 navigate("/login");
               }
           });
         return;
       }
       dispatch(addToCart(product));
       Swal.fire({
         icon: "success",
         title: "addedToCart",
         text: `${product.name} is add successfully`,
         timer: 1500,
         showConfirmButton: false,
       });
     };
    
     const cartProducts = useSelector((state) => state.cart.products);
        
    const handleAddToWishlist = (product) => {
      if (!user) {
        Swal.fire({
          icon: "warning",
          title: "Login required",
          text: "You must login to access your wishlist",
          confirmButtonText: "Login",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
        return;
      }
      const isInCart = cartProducts.some((item) => item.id === product.id);
      if (isInCart) {
        Swal.fire({
          icon: "info",
          title: "Already in cart",
          text: "This product is already in your cart",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }
      dispatch(addToWishlist(product));
      Swal.fire({
        icon: "success",
        title: "Added to Wishlist",
        text: `${product.name} was added successfully`,
        timer: 1000,
        showConfirmButton: false,
      });
    };

  if (loading) return <LottiHandeler status={'page'} />;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-gray-900">All shoes</h2>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
          spaceBetween={20}
          slidesPerView={3}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {filtered.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="group">
                <Link  to={`/product/${item.id}`}>
                <img src={ item.image}
                  className="xl:aspect-7/8 aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"/>
                </Link>
                <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.cat}</p>
                <p className="mt-1 text-sm text-gray-500">{item.brand?.name}</p>
                <p className="mt-1 text-sm text-gray-500">{item.description?.name}</p>

                {item.colors.length > 0 && (
                  <div className="mt-1 flex gap-1">
                    {item.colors.map((c, index) => (
                      <span key={c.index} className="h-4 w-4 rounded-full border" style={{ backgroundColor: c }}  title={c} />
                    ))}
                  </div>
                )}

                <div className="mt-1 flex items-center gap-2">
                  <p className="text-lg font-medium text-gray-900">${item.price}</p>
                  {item.sale > 0 && ( <p className="text-lg font-medium text-red-500"> <del>{item.sale}%</del> </p>
                  )}
                </div>

                <div className="my-1 flex text-lg font-medium text-yellow-500">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
                </div>

                <div className='mt-8 flex items-center justify-between rounded-md bg-gray-600 p-1 text-2xl'>
                  <button onClick={() => handleAddToCart(item)}
                   className="flex w-auto cursor-pointer items-center justify-center gap-1 rounded-md bg-gray-600 p-3 text-white hover:bg-gray-700">
                    <BsCart4/>
                  </button>
                            
                  <button onClick={() => handleAddToWishlist(item)}
                   className="flex w-auto cursor-pointer items-center justify-center gap-1 rounded-md bg-gray-600 p-3 text-white hover:bg-gray-700">
                    <FaRegHeart/>
                  </button> 
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

