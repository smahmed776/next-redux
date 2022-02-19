import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {AppState} from "../../app/store";

const initialState = [];
const item = {
  id: 1,
  title: "Product one",
  price: 120.5,
  quantity: 1,
  discountCode: {
    HalfDiscount: 50,
    fullDiscount: 100,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action:PayloadAction<object>) => {
        state.push(action.payload);
        return state;
    },
    removeItem: (state, action:PayloadAction<number>) => {
        state.filter(item => item.id !== action.payload);
        return state;
    },
    increamentQuantity: (state, action:PayloadAction<number>) => {
      state[state.findIndex(item => item.id === action.payload)].quantity++;
      return state;
    },
    decreamentQuantity: (state, action: PayloadAction<number>) => {
        const findItem = state[state.findIndex(item => item.id === action.payload)];
        if(findItem.quantity > 1) findItem.quantity--;
        return state;
    },
  },
});

export const { addItem, removeItem, increamentQuantity, decreamentQuantity} = cartSlice.actions;

export const selectCart = (state: AppState) => state.cart.length;

export default cartSlice.reducer;
