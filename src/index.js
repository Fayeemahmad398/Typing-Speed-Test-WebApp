import { React } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MyContextProvider } from "./GlobalContextFolder/myContext";
import { MyThemeContextProvider } from "./GlobalContextFolder/MyThemeContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  //providing global context to access global obj theme to whole application
  <MyThemeContextProvider>
    {/* providing global context to access global obj variables */}
    <MyContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyContextProvider>
  </MyThemeContextProvider>,
  document.getElementById("root")
);
