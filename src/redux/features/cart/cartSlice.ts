import { RootState } from '@/redux/store';
import { Extra, Size } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  name: string;
  id: string;
  image: string;
  basePrice: number;
  quantity?: number;
  size?: Size;
  extras?: Extra[];
};

type CartState = {
  items: CartItem[];
};
const initialCartItems = localStorage.getItem('cartItems');

const initialState: CartState = {
  items: initialCartItems ? JSON.parse(initialCartItems) : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        existingItem.size = action.payload.size;
        existingItem.extras = action.payload.extras;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          item.quantity! -= 1;
        }
      }
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addCartItem, removeCartItem, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
