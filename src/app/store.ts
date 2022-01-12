import {
  configureStore,
  ThunkAction,
  Action,
  createSlice,
} from "@reduxjs/toolkit";
import cartReducer from "../slices/cartReducer";
import filtersReducer from "../slices/filtersReducer";
import productsReducer from "../slices/productsReducer";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
