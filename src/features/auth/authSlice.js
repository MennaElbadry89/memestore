// store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";



// ======== Helper: format user for Redux ========
const formatUser = (user) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL || null,
  };
};

// ================= REGISTER =================
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ fullName, phone, avatar, email, password , country, role }, { rejectWithValue }) => {
    try {
      //  إنشاء الحساب
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //  تحديث ملف المستخدم
      await updateProfile(res.user, {
        displayName: fullName,
        photoURL: avatar || null,
      });

      //  تسجيل البيانات في Firestore

        await setDoc(doc(db, "users", res.user.uid), {
        fullName,
        email,
        phone,
        role,            // مهم جدًا
        avatar: avatar || null,
        country: country || null,
        isAdmin: role === "admin",  // اختياري لو عايزة تستخدمه
        createdAt: new Date(),
      });

      // إرجاع بيانات المستخدم بشكل منسق
      return formatUser(res.user);
    } catch (error) {
      // لو حصل خطأ في أي خطوة، يرجع الخطأ
      return rejectWithValue(error.message);
    }
  }
);

// ================= LOGIN =================
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return formatUser(res.user);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ================= LOGOUT =================
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  return null;
});

// ================= SLICE =================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

// ================= ON AUTH STATE CHANGE =================
//   in => App.js 
export const listenAuthState = (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(formatUser(user)));
    } else {
      dispatch(setUser(null));
    }
  });
};
