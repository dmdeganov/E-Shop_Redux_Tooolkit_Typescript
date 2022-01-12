import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { itemAdded } from "../slices/cartReducer";
import { Product } from "../slices/productsReducer";

const ProductItem = (product: Product) => {
  const { img, price, id, title } = product;
  const isAdded = useAppSelector((state) =>
    state.cart.items.some((item) => item.id === id)
  );

  const dispatch = useAppDispatch();
  return (
    <div className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        {!isAdded ? (
          <button
            className='add-btn'
            onClick={() => {
              dispatch(
                itemAdded({
                  ...product,
                  quantityInCart: 0,
                  itemTotalPrice: price,
                })
              );
            }}
          >
            add
          </button>
        ) : (
          <div className='in-cart'>in Cart</div>
        )}
      </div>
    </div>
  );
};
export default ProductItem;
