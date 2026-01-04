import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice";


export default function Search() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [items, dispatch]);

  const q = query.trim().toLowerCase();
  
  const filteredProducts = (items || []).filter((item) => {
    if (!q) return true;
    const fields = [item.name, item.cat,  item.brand.name, item.colors, item.id?.toString(), item.price?.toString()];
    return fields.some((f) => f && f.toString().toLowerCase().includes(q));
  });

  return (
    <>
    <div className="mx-auto my-20 w-full max-w-md">
      <input type="text"  value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by category, color, id, or price..."
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />

      {loading ? (
        <p className="mt-2 animate-pulse text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="mt-2 text-red-500">{error}</p>
      ) : query&& (
        <ul className="mt-2 max-h-72 overflow-auto rounded-md border border-gray-300">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <li  key={item.id} onClick={()=>navigate(`/product/${item.id}`)}
                className="flex items-center gap-3 border-b border-gray-300 p-2 hover:bg-gray-50">
                <img src={item.image} alt=""  className="h-12 w-12 rounded object-cover" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.cat}: {item.name}</p>
                  <p className="text-gray-500">Price: {item.price}</p>
                </div>
                <p className="text-xs text-gray-400">ID: {item.id}</p>
              </li>
            ))) : (  <li className="p-2 text-gray-500">No products found.</li>
          )}
        </ul>
      )}
    </div>

      {filteredProducts? query && (
       <div className="m-20 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((item) => (
            <div key={item.id} className="group">
              <img  alt="" src={item.image}
                className="xl:aspect-7/8 aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75" />
              <h3 className="mt-4 text-sm text-gray-700">{item.cat}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${item.price}</p>
              <p className="my-1 text-lg font-medium text-red-500"><del>{item.sale}%</del> </p>
              <div className="my-1 flex text-lg font-medium text-yellow-500"><FaStar/><FaStar/><FaStar/><FaStar/><FaRegStar/></div>
              
              <button onClick={() => { console.log('adding', item); 
                                       dispatch(addToCart(item)); 
                                      }}  
               className="animate-pulse cursor-pointer rounded-2xl bg-gray-900 p-2 text-center text-white">Add to cart</button>
            </div>
         ))}
      </div>   ): ""}
       
    
    </>
  );
}
