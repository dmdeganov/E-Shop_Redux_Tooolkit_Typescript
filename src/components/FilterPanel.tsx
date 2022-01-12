import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  deviceFilterChanged,
  brandFilterChanged,
  priceFilterChanged,
} from "../slices/filtersReducer";
import { formatPrice } from "../helpers";
const FilterPanel = () => {
  const { price, brand, deviceType } = useAppSelector((state) => state.filters);

  const [filterPrice, setFilterPrice] = useState(price);
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.filters.brands);

  return (
    <div className='filter-container'>
      <select
        name='devices'
        onChange={(event) => {
          dispatch(deviceFilterChanged(event.target.value));
        }}
        value={deviceType}
      >
        <option value='all'>All Devices</option>
        <option value='phones'>Phones</option>
        <option value='laptops'>Laptops</option>
      </select>
      <select
        name='brand'
        value={brand}
        onChange={(event) => dispatch(brandFilterChanged(event.target.value))}
      >
        <option value='all'>All Brands</option>
        {brands.map((brand, i) => (
          <option value={brand} key={i}>
            {brand.slice(0, 1).toUpperCase() + brand.slice(1)}
          </option>
        ))}
      </select>
      <div className='form-control'>
        <h5>Price</h5>
        <p className='price'>{formatPrice(filterPrice)}</p>
        <input
          type='range'
          name='price'
          min={600}
          max={3000}
          value={filterPrice}
          onChange={(e) => {
            setFilterPrice(+e.target.value);
            dispatch(priceFilterChanged(+e.target.value));
          }}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
