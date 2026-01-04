import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import Pagination from "./Pagination";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import LottiHandeler from "../../assets/lottifiles/LottiHandeler";
import { addToCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


export default function Shop() {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage  = 8;
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

   const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <LottiHandeler status={'page'}/>;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = items.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const handleAddToCart = (item)=>{
    dispatch(addToCart(item));
    toast.success( `${item.name} added to🛒`);
  }
  
  
  return (

    <>
    <div className="bg-white">
        <h2 className="mt-10 text-center text-4xl">All Products</h2>

      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {currentItems.map((item) => (  <div key={item.id}  className="group">
           <Link   to={`/product/${item.id}`}>
            <img src={item.image} alt=""
             className="xl:aspect-7/8 aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"/>
           </Link>
            <h3 className="mt-4 text-sm text-gray-700"> {item.name}</h3>
            <p className="mt-1 text-sm text-gray-500"> {item.cat}</p>
            <p className="mt-1 text-sm text-gray-500"> {item.brand?.name}</p>
            <p className="mt-1 text-sm text-gray-500"> {item.description?.name}</p>
            {item.colors.length > 0 && ( 
              <div className="mt-1 flex gap-1">
                 {item.colors.map((c, index) => (
                      <span key={c.index} className="h-4 w-4 rounded-full border"
                      style={{ backgroundColor: c }} title={c} />))}
              </div> )}
             <div className="mt-1 flex items-center gap-2">
                <p className="text-lg font-medium text-gray-900"> ${item.price}</p>
                {item.sale > 0 && (
                <p className="text-lg font-medium text-red-500"><del>{item.sale}%</del></p>)}
            </div>
              <div className="my-1 flex text-lg font-medium text-yellow-500">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
              </div>
             <button  onClick={() => handleAddToCart(item)}
                 className="mt-2 cursor-pointer rounded-2xl bg-gray-900 p-2 text-center text-white hover:bg-black">
                   Add to cart
             </button>
         </div>
       ))}

          
          
        </div>
      </div>
      {/* <Cart/> */}
    </div>


           <Pagination currentPage={currentPage}  totalPages={totalPages}  
             onPageChange={(page) => setCurrentPage(page)}/>
  
    </>

  )
}
