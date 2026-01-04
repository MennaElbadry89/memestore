import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from '../features/auth/authSlice'
import ordersReducer from '../features/order/orderSlice'
import contactReducer from '../features/contact/contactSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer,
    contact: contactReducer,

  },
});
