import { useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import LottiHandeler from "../../assets/lottifiles/LottiHandeler";
import { addToCart } from "../../features/cart/cartSlice";
import  {Link} from 'react-router-dom'
import { toast } from "react-toastify";


export default function CustomersPurchase() {

     const dispatch = useDispatch();
      // navigate = useNavigate();
   
     const { items, loading } = useSelector((state) => state.products);
  
    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);
  
    const filtered = items.filter((e)=> e.price <= 300);
    
      const handleAddToCart = (item)=>{
        dispatch(addToCart(item));
        toast.success( `${item.name} added to🛒`);
      }
    
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
              <button onClick={() =>{ handleAddToCart(product) }} 
               className="w-full cursor-pointer rounded-2xl bg-gray-900 p-2 text-center text-white opacity-0 group-hover:opacity-100">Add to cart</button>
            </div>
            
          ))}
        </div>

      </div>
    </div>
  )
}
