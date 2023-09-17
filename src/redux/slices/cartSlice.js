import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://course-api.com/react-useReducer-cart-project';
const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: false,
  errMsg: '',
};

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    /*  console.log(name);
    console.log(thunkAPI);
    console.log(thunkAPI.getState());
    thunkAPI.dispatch(showModal()); */

    try {
      const { data } = await axios(url);

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeCart: (state, action) => {
      const id = action.payload;

      state.cartItems = state.cartItems.filter((cart) => cart.id !== id);
    },
    increaseCart: (state, action) => {
      state.cartItems = state.cartItems.map((cart) => {
        if (cart.id === action.payload) cart.amount = cart.amount + 1;

        return cart;
      });
    },
    decreaseCart: (state, action) => {
      state.cartItems = state.cartItems.map((cart) => {
        if (cart.id === action.payload) cart.amount = cart.amount - 1;

        return cart;
      });
    },
    calculateCart: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((cart) => {
        amount = amount + cart.amount;
        total = total + cart.amount * cart.price;
      });

      state.amount = amount;
      state.total = total.toFixed(2);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.isLoading = false;
      state.errMsg = action.payload;
    });
  },
});

export const {
  clearCart,
  removeCart,
  increaseCart,
  decreaseCart,
  calculateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
