import { GlobalStyles } from "./styles/globalStyle";

import { ThemeProvider } from "styled-components";
import { UseThemes } from "./GlobalContextFolder/MyThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router";
import Homepage from "./Pages/Homepage";
import Userpage from "./Pages/Userpage";

const App = () => {
  const { theme } = UseThemes();
  return (
    // Theme are used as a props inside the create global style function of styled components
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/userpage" element={<Userpage />} />
      </Routes>
    </ThemeProvider>
  );
};
export default App;
