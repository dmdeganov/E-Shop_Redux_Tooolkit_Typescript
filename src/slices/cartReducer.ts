import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productsReducer";
export interface ProductInCart extends Product {
  quantityInCart: number;
  itemTotalPrice: number;
}
interface Cart {
  items: ProductInCart[];
  totalPrice: number;
  totalQuantity: number;
}
const initialState: Cart = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};
const cartSlice = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    itemAdded(state, action: PayloadAction<ProductInCart>) {
      action.payload.quantityInCart = 1;
      state.items.push(action.payload);
      state.totalPrice += action.payload.price;
      state.totalQuantity += 1;
    },
    quantityIncreased(state, action: PayloadAction<{ id: number }>) {
      let price = 0;
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.quantityInCart += 1;
          price = item.price;
          item.itemTotalPrice += price;
          return item;
        }
        return item;
      });
      state.totalPrice += price;
      state.totalQuantity += 1;
    },
    quantityDecreased(state, action: PayloadAction<{ id: number }>) {
      let price = 0;
      state.items = state.items
        .map((item) => {
          if (item.id === action.payload.id) {
            item.quantityInCart -= 1;
            price = item.price;
            item.itemTotalPrice -= price;
            return item;
          }
          return item;
        })
        .filter((item) => item.quantityInCart !== 0);
      state.totalPrice -= price;
      state.totalQuantity -= 1;
    },
    itemDeleted(state, action: PayloadAction<{ id: number }>) {
      const { itemTotalPrice, quantityInCart } = state.items.find(
        (item) => item.id === action.payload.id
      ) as ProductInCart;
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalPrice -= itemTotalPrice;
      state.totalQuantity -= quantityInCart;
    },
    cartCleared(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});
export default cartSlice.reducer;
export const {
  itemAdded,
  cartCleared,
  quantityIncreased,
  itemDeleted,
  quantityDecreased,
} = cartSlice.actions;
