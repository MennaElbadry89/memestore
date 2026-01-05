import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem('wishlistProducts')) || [],
  totalCount: JSON.parse(localStorage.getItem('wishlistTotalCount')) || 0,
};

const saveWishlistToLocalStorage = (state) => {
  localStorage.setItem('wishlistProducts', JSON.stringify(state.products));
  localStorage.setItem('wishlistTotalCount', JSON.stringify(state.totalCount));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload || {};
      console.log('WishlistSlice.addToWishlist received payload:', product);

      const id = product.id ?? product._id;
      const price = Number(product.price) || 0;

      const existingProduct = state.products.find((p) => p.id === id);

      if (!existingProduct) {      
        state.products.push({
          id,
          name: product.name || '',
          image: product.image,
          cat: product.cat || '',
          Brand: product.brand?.name ||  '',
          price: product.price || '',
          quantity: product.count || "outOfStok",
          colors: product.colors?.map(c => c.color) || [],
        });
      }
      state.totalCount += 1;
      
        saveWishlistToLocalStorage(state);
    },
    
 
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      const existingProduct = state.products.find((product) => product.id === id);

      if (existingProduct) {
        state.products = state.products.filter((product) => product.id !== id);
        state.totalCount -= 1;
        
          saveWishlistToLocalStorage(state);
      }
    },

    clearWishlist: (state) => {
      state.products = [];
      state.totalCount = 0;
      
        saveWishlistToLocalStorage(state);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
