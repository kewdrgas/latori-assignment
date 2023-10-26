import React from 'react';
import { TCartItem, useCart } from '../../contexts/CartContext';

export const CartItem = ({ id, name, price, image, quantity }: TCartItem) => {
  const { dispatch } = useCart();
  const handleRemove = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  return (
    <div className="flex justify-between items-center w-full mb-2 ">
      <div className="flex gap-2 justify-between">
        <img className="w-24" src={image} />
        <div className="flex justify-between flex-col">
          <p>{name}</p>
          <p>${price}</p>
          <p>Qty: {quantity}</p>
        </div>
      </div>
      <button onClick={handleRemove} className="bg-black py-1 px-5 text-white">
        Remove
      </button>
    </div>
  );
};
