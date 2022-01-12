import { createSlice } from "@reduxjs/toolkit";

export const deviceType = {
  All: "all",
  Phones: "phones",
  Laptops: "laptops",
};

export interface Filters {
  deviceType: string;
  brands: string[];
  maxPrice: number;
  price: number;
  brand: string;
}
const initialState: Filters = {
  deviceType: deviceType.All,
  brands: ["samsung", "google", "xiaomi", "apple", "honor", "dell", "hp"],
  maxPrice: 3000,
  price: 3000,
  brand: "all",
};
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    deviceFilterChanged(state, action) {
      state.deviceType = action.payload;
    },
    brandFilterChanged(state, action) {
      state.brand = action.payload;
    },
    priceFilterChanged(state, action) {
      state.price = action.payload;
    },
  },
});
export const { deviceFilterChanged, brandFilterChanged, priceFilterChanged } =
  filtersSlice.actions;
export default filtersSlice.reducer;
