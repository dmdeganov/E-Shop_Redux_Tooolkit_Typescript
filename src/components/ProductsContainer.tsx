import React from "react";
import ProductItem from "./ProductItem";
import { useAppSelector } from "../app/hooks";
import { Product, selectFilteredProducts } from "../slices/productsReducer";

const ProductsContainer = () => {
  const { status, products } = useAppSelector((state) => state.products);
  const filteredProducts = selectFilteredProducts(
    useAppSelector((state) => state)
  );

  if (status === "loading") {
    return <h1>loading...</h1>;
  }
  return (
    <section className='products'>
      <div className='phones'>
        <h2>Products</h2>
        <article>
          {filteredProducts.map((product) => {
            return <ProductItem {...product} key={product.id} />;
          })}
        </article>
      </div>
    </section>
  );
};

export default ProductsContainer;
