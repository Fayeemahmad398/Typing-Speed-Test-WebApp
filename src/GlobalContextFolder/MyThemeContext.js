import { createContext, useContext, useState } from "react";
import { themeOptions } from "../../Utils/themeOptions";
const MyThemeContext = createContext();

export const MyThemeContextProvider = ({ children }) => {
  //Wrapper Components having App as a child of it
  // Receiving JSX of app as children inside to  it
  // console.log(children);
  const defaultValue =
    JSON.parse(localStorage.getItem("theme")) || themeOptions[2].value;

  const [theme, setTheme] = useState(defaultValue);

  const value = {
    theme,
    setTheme,
  };

  return (
    <MyThemeContext.Provider value={value}>{children}</MyThemeContext.Provider>
  );
};

export const UseThemes = () => {
  return useContext(MyThemeContext);
};
