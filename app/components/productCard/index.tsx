import React from 'react';
import { TCartItem, useCart } from '../../contexts/CartContext';
export type TProduct = {
  id: string;
  title: string;
  images: string[];
  price: string;
};

export const ProductCard = ({ product }: { product: TProduct }) => {
  const { dispatch } = useCart();
  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: any
  ) => {
    event.stopPropagation();
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: 1,
        image: item.images[0],
      },
    });
  };
  return (
    <div
      className="rounded md:border p-2 flex md:block justify-between items-center"
      key={product.id}
    >
      <div className="flex md:block gap-2 md:gap-0">
        <img
          className="w-24 md:w-auto"
          src={product.images[0]}
          alt={product.title}
        />
        <div className="">
          <h2 className="mb-4 text-sm md:my-1">{product.title}</h2>
          <p className={'text-sm my-1'}>${product.price}</p>
        </div>
      </div>
      <button
        className="w-42 shrink-0 md:w-full px-4 text-xs md:text-md py-2 bg-black hover:bg-black/90 text-white uppercase"
        onClick={(event) => handleAddToCart(event, product)}
      >
        Add to Cart
      </button>
    </div>
  );
};
