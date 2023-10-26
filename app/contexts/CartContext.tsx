import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from 'react';

export type TCartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type CartState = {
  items: TCartItem[];
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: TCartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } };

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};

type CartProviderProps = {
  children: React.ReactNode;
};

const CartContext = createContext<CartContextType>({
  state: { items: [] },
  dispatch: () => {}, 
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingCartItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingCartItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
    
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const safelyGetItemFromLocalStorage = (key: string, defaultValue: string) => {
    if (typeof window === 'undefined' || !window.localStorage) {
      return JSON.parse(defaultValue);
    }
    return JSON.parse(localStorage.getItem(key) || defaultValue);
  };

  const initialState = {
    items: safelyGetItemFromLocalStorage('cartItems', '[]'),
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    }
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  return useContext(CartContext);
};
