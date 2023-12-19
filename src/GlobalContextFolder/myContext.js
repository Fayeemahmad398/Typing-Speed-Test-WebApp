import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { updateCurrentUserData } from "../CommonFunc/updateCurrentUserData";

const myContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [testTime, setTestTime] = useState(15);

  const [totalTest, setTotalTests] = useState(0);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {

    if (user) {
      updateCurrentUserData(setCurrentUserData, setTotalTests);
      console.log(values, "context");
    }
  }, [loading, user, totalTest]);

  const values = {
    testTime: testTime,
    setTestTime: setTestTime,
    totalTest: totalTest,
    setTotalTests: setTotalTests,
    currentUserData: currentUserData,
    setCurrentUserData: setCurrentUserData,
  };
  console.log(values, "context");

  return <myContext.Provider value={values}>{children}</myContext.Provider>;

};

export const useGlobalContext = function () {
  return useContext(myContext);
};
