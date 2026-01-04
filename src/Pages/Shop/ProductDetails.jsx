import { StarIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";

import LottiHandeler from "../../assets/lottifiles/LottiHandeler";

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {

  const dispatch = useDispatch();
  const { id } = useParams();

  const { items, status , loading} = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const product = items.find((item) => item.id == id);
    const handleAddToCart = (item)=>{
    dispatch(addToCart(item));
    toast.success( `${item.name} added to🛒`);
  }

  
if (!product) {
  return <div className="py-20 text-center">Loading...</div>;
}

  return (
    <div className="bg-white">
      <div className="pt-6">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex space-x-2 px-4 text-sm">
            <li className="text-gray-500">Products/</li>
            <li className="font-medium text-gray-900">{product.cat}/</li>
            <li className="font-medium text-gray-900">{product.brand?.name}/</li>
            <li className="font-medium text-gray-900">{product.name}:</li>
          </ol>
        </nav>

        {/* Images */}
        <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3">
          {/* {product.image?.map((img, index) => (
            <div  key={index} className='group overflow-hidden rounded-lg p-2'> */}
            <img
              src={product.image} className="rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"/>
          {/* </div>
        ))} */}
        </div>

        {/* Info */}
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-2xl">{product.price} EGP</p>
          { (product.sale != 0) &&
          <p className="mt-2 text-2xl">{product.price - ((product.price * product.sale)/100 )} EGP</p>
          }
          {/* Reviews */}
          <div className="mt-4 flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  reviews.average > rating ? 'text-yellow-400' : 'text-gray-200',
                  'h-5 w-5'
                )} />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              ({reviews.totalCount} reviews)
            </span>
          </div>

          {/* Colors */}
          <div className="mt-6">
            <h3 className="font-medium">Colors</h3>
            <div className="mt-2 flex gap-2">
              {product.colors?.map((c, index) => (
                <span key={c.index}
                  className="h-8 w-8 rounded-full border"
                  style={{ backgroundColor: c }}/>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="font-medium">Description</h3>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          <button onClick={() => handleAddToCart(product)}
           className="mt-8 w-full rounded-md bg-gray-600 py-3 text-white hover:bg-gray-700">
            Add to cart
          </button>
        </div>

      </div>
    </div>
  );
}
