import { RootState } from "../app/store";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useAppSelector } from "../app/hooks";
import { Filters } from "./filtersReducer";
export interface Product {
  id: number;
  title: string;
  price: number;
  img: string;
  brand: string;
  category: string;
}
export type Products = Array<Product>;
export interface ProductsState {
  status: string;
  products: Products;
  error: string;
}

const initialState: ProductsState = {
  status: "loading",
  products: [],
  error: "",
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Products>) => {
          state.status = "idle";
          state.products = action.payload;
        }
      );
  },
});

export const selectFilteredProducts = createSelector(
  // First input selector: all todos
  (state: RootState) => state.products.products,
  (state: RootState) => state.filters,
  // Second input selector: all filter values
  // Output selector: receives both values
  (products: Products, filters: Filters) => {
    let filteredProducts;
    const { deviceType, price, maxPrice, brand } = filters;
    if (deviceType === "all") {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(
        (product) => product.category === deviceType
      );
    }
    if (price < maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= price
      );
    }
    if (brand !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand === brand
      );
    }
    return filteredProducts;
  }
);

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetch(
    "https://61d9997bce86530017e3cb94.mockapi.io/api/v1/gadgets"
  ).then<{ products: Products }>((res) => res.json());

  return response.products;
});

export default productsSlice.reducer;
