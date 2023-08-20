import { createContext, useContext, useState } from "react";

const myContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [testTime, setTestTime] = useState(5);
  const values = {
    testTime: testTime,
    setTestTime: setTestTime,
  };

  return <myContext.Provider value={values}>{children}</myContext.Provider>;
};

export const useGlobalContext = () => useContext(myContext);
