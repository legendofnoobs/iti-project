import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [cartData, setCartData] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [selectedProduct,setSelectedProduct] = useState(null)
  return (
    <DataContext.Provider
      value={{ selectedProduct, cartData, checkoutData, setSelectedProduct,setCartData, setCheckoutData }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
