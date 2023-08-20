import { React } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MyContextProvider } from "./Components/GlobalContextFolder/myContext";
import { MyThemeContextProvider } from "./Components/GlobalContextFolder/MyThemeContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <MyThemeContextProvider>
    <MyContextProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </MyContextProvider>
  </MyThemeContextProvider>,
  document.getElementById("root")
);
