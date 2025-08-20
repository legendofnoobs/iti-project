import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState({});
  const cartData = (data) => {
    setData((preValue) => {
      return { ...preValue, cardData: data };
    });
  };
  const checkoutData = (data) => {
    setData((preValue) => {
      return { ...preValue, checkoutData: data };
    });
  };
  return (
    <DataContext.Provider value={(data, cartData, checkoutData)}>
      {children}
    </DataContext.Provider>
  );
};

export const useData =()=>useContext(DataContext);