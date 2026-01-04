import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem('cartProducts')) || [],
  totalQuantity: JSON.parse(localStorage.getItem('cartTotalQuantity')) || 0,
  totalPrice: JSON.parse(localStorage.getItem('cartTotalPrice')) || 0,
};

const saveCartToLocalStorage = (state) => {
  localStorage.setItem('cartProducts', JSON.stringify(state.products));
  localStorage.setItem('cartTotalQuantity', JSON.stringify(state.totalQuantity));
  localStorage.setItem('cartTotalPrice', JSON.stringify(state.totalPrice));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload || {};
      console.log('cartSlice.addToCart received payload:', product);

      const id = product.id ?? product._id;
      const price = Number(product.price) || 0;

      const existingProduct = state.products.find((p) => p.id === id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({
          id,
          name: product.name || '',
          image: product.image,
          cat: product.cat || '',
          Brand: product.brand?.name ||  '',
          price,
          quantity: 1,
          colors: product.colors?.map(c => c.color) || [],
        });
      }

      state.totalQuantity += 1;
      state.totalPrice += price;
        saveCartToLocalStorage(state);
    },
    increaseQuantity: (state, action) => {
    const product = state.products.find(p => p.id === action.payload);
    if(product) {
      product.quantity += 1;
      state.totalQuantity += 1;
      state.totalPrice += product.price;
        saveCartToLocalStorage(state);
    }
  },
  decreaseQuantity: (state, action) => {
    const product = state.products.find(p => p.id === action.payload);
    if(product && product.quantity > 1) {
      product.quantity -= 1;
      state.totalQuantity -= 1;
      state.totalPrice -= product.price;
        saveCartToLocalStorage(state);
    }
  },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingProduct = state.products.find((product) => product.id === id);

      if (existingProduct) {
        state.totalQuantity -= existingProduct.quantity;
        state.totalPrice -= existingProduct.price * existingProduct.quantity;
        state.products = state.products.filter((product) => product.id !== id);
          saveCartToLocalStorage(state);
      }
    },

    clearCart: (state) => {
      state.products = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
        saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
