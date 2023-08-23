import { createContext, useContext, useState } from "react";

const myContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [testTime, setTestTime] = useState(15);

  const values = {
    testTime: testTime,
    setTestTime: setTestTime,
  };

  return <myContext.Provider value={values}>{children}</myContext.Provider>;
};

export const useGlobalContext = function () {
  return useContext(myContext);
};
