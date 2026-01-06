import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import { addDoc, collection, serverTimestamp , getDocs, query, where } from "firebase/firestore";
import { db  } from "../auth/firebase";


export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ items, totalPrice, userId }, thunkAPI) => {
    try {
      if (!userId) throw new Error("User ID is missing");
      if (!items || items.length === 0) throw new Error("Cart is empty");
console.log(items)
      const cleanedItems = items.map(p => ({
        id: p.id || "",
        name: p.name || "Product",
        price: p.price || 0,
        quantity: p.quantity || 1,
        image: p.image || "",
        cat: p.cat || "",
        colors: p.colors || [],
        brand: p.brand || "",
      }));

      const order = {
        userId,
        items: cleanedItems,
        totalPrice: totalPrice || 0,
        status: "pending",
        createdAt: serverTimestamp(), 
      };

      const docRef = await addDoc(collection(db, "orders"), order);
      return { id: docRef.id, ...order };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (userId, thunkAPI) => {
    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", userId)
      );

      const snapshot = await getDocs(q);
      let orders = [];

      snapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          ...doc.data(),
        createdAt: serverTimestamp(), 
        });
      });

      return orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
////////////// {ordersSlice}  ///////////////////

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH USER ORDERS
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
