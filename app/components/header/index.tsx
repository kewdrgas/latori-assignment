import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { CartItem } from '../cartItem/index';
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state } = useCart();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-black text-white px-4 md:px-0 py-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="ml-2">Product List</h1>
        <div>
          <button onClick={openModal} className=" text-white ">
            Open Cart
          </button>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div
            onClick={closeModal}
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          ></div>

          <div className="fixed top-14 left-1/2 transform -translate-x-1/2  w-11/12 md:w-1/2 h-3/4 bg-white p-6 overflow-y-auto z-20 rounded-lg shadow-xl text-black">
            <button onClick={closeModal} className="float-right p-3">
              X
            </button>
            <h2 className="text-xl font-bold mb-4 mt-2">Cart</h2>
            <hr className="mb-4 border-black" />
            {state.items.length === 0 ? (
              <div className="text-center my-4">
                <p className="mb-2">Your cart is empty!</p>
                <p>Start adding some products to see them here.</p>
              </div>
            ) : (
              <ul>
                {state.items.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
