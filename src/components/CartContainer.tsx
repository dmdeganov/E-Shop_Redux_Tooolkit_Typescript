import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { formatPrice } from "../helpers";
import { cartCleared } from "../slices/cartReducer";
import CartItem from "./CartItem";
const CartContainer = () => {
  const { items, totalPrice, totalQuantity } = useAppSelector(
    (state) => state.cart
  );
  console.log(totalPrice);

  const dispatch = useAppDispatch();
  if (items.length === 0) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your cart</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className='cart'>
      <header>
        <h2>your cart</h2>
      </header>
      <article>
        {items.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </article>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>{formatPrice(totalPrice)}</span>
          </h4>
        </div>
        <button
          className='btn clear-btn'
          onClick={() => dispatch(cartCleared())}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
