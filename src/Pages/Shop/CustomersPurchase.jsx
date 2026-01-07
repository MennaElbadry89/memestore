import { useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import LottiHandeler from "../../assets/lottifiles/LottiHandeler";
import { addToCart } from "../../features/cart/cartSlice";
import  {Link} from 'react-router-dom'
import { addToWishlist } from "../../features/cart/wishlistSlice";
import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";


export default function CustomersPurchase() {

     const dispatch = useDispatch();
     const navigate = useNavigate();
   
     const { items, loading } = useSelector((state) => state.products);
       const { user } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);
  
    const filtered = items.filter((e)=> e.price <= 300);
    
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
     
    if (loading) return <LottiHandeler status={'page'}/>;
  return (
    <div className="bg-white" id="customers">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
           {filtered.map((product) => (
            <div key={product.id} href={'/product'} className="group relative">
              <div className="w-15 absolute right-0 top-0 flex h-10 items-center justify-center bg-gray-800 text-white">sale</div>
                  <Link  to={`/product/${product.id}`}>           
                  <img src={ product.image}
                  className="xl:aspect-7/8 aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"/>
                  </Link>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.cat}</p>
                <p className="mt-1 text-sm text-gray-500">{product.brand?.name}</p>
                <p className="mt-1 text-sm text-gray-500">{product.description?.name}</p>

                {product.colors.length > 0 && (
                  <div className="mt-1 flex gap-1">
                    {product.colors.map((c, index) => (
                      <span key={c.index} className="h-4 w-4 rounded-full border" style={{ backgroundColor: c }}  title={c} />
                    ))}
                  </div>
                )}

                <div className="mt-1 flex items-center gap-2">
                  <p className="text-lg font-medium text-gray-900">${product.price}</p>
                  {product.sale > 0 && ( <p className="text-lg font-medium text-red-500"> <del>{product.sale}%</del> </p>
                  )}
                </div>

                <div className="my-1 flex text-lg font-medium text-yellow-500">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
                </div>
                <div className='mt-8 flex items-center justify-between rounded-md bg-gray-600 p-1 text-2xl'>
                  <button onClick={() => handleAddToCart(product)}
                   className="flex w-auto cursor-pointer items-center justify-center gap-1 rounded-md bg-gray-600 p-3 text-white hover:bg-gray-700">
                    <BsCart4/>
                  </button>
                            
                  <button onClick={() => handleAddToWishlist(product)}
                   className="flex w-auto cursor-pointer items-center justify-center gap-1 rounded-md bg-gray-600 p-3 text-white hover:bg-gray-700">
                    <FaRegHeart/>
                  </button> 
                </div>
            </div>
            
          ))}
        </div>

      </div>
    </div>
  )
}
