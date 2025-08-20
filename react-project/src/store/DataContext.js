import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [cartData, setCartData] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  return (
    <DataContext.Provider
      value={{ cartData, checkoutData, setCartData, setCheckoutData }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
